# Aggregation


## Introduction 

Generally an aggregation `aggr(expr)` processes all matching rows for each aggregation key found in an incoming record (keys are compared using [equivalence](../intro/comparability.md)).

In a regular aggregation (i.e. of the form `aggr(expr)`), the list of aggregated values is the list of candidate values with all null values removed from it.

## Data Setup

```postgresql
SELECT * FROM cypher('graph_name', $$
	CREATE (a:Person {name: 'A', age: 13}),
	(b:Person {name: 'B', age: 33, eyes: "blue"}),
	(c:Person {name: 'C', age: 44, eyes: "blue"}),
	(d1:Person {name: 'D', eyes: "brown"}),
	(d2:Person {name: 'D'}),
	(a)-[:KNOWS]->(b),
	(a)-[:KNOWS]->(c),
	(a)-[:KNOWS]->(d1),
	(b)-[:KNOWS]->(d2),
	(c)-[:KNOWS]->(d2)
$$) as (a agtype);
```

## Auto Group By
To calculate aggregated data, Cypher offers aggregation, analogous to SQL’s `GROUP BY`.

Aggregating functions take a  set of values and calculate An aggregated value over them. Examples are [`avg()`](../functions/aggregate_functions.md#avg) that calculates the average of multiple numeric values, or [`min()`](../functions/aggregate_functions.md#min) that finds the smallest numeric or string value in a set of values. When we say below that an aggregating function operates on a set of values, we mean these to be the result of the application of the inner expression(such as `n.age`) to all the records within the same aggregation group.

Aggregation can be computed over all the matching subgraphs, or it can be further divided by introducing grouping keys. These are non-aggregate expressions, that are used to group the values going into the aggregate functions.

Assume we have the following return statement:
```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	RETURN v.name, count(*)
$$) as (grouping_key agtype, count agtype);
```

<table>
  <tr>
   <td>count</td>
   <td>key</td>
  </tr>
  <tr>
   <td>"A"</td>
   <td>1</td>
  </tr>
  <tr>
   <td>"B"</td>
   <td>1</td>
  </tr>
  <tr>
   <td>"C"</td>
   <td>1</td>
  </tr>
  <tr>
   <td>"D"</td>
   <td>2</td>
  </tr>
  <tr>
   <td colspan="2">1 row</td>
  </tr>
</table>


We have two return expressions: `grouping_key`, and `count(*)`. The first, `grouping_key`, is not an aggregate function, and so it will  be  the  grouping  key. The latter, `count(*)` is an aggregate expression. The matching subgraphs will be divided into different  buckets, depending on the grouping key. The aggregate function will then be run on these buckets, calculating an aggregate value per bucket. 

## Sorting on aggregate functions

To use aggregations to sort the result set, the aggregation must be included in the `RETURN` to be used in the `ORDER BY`.

```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (me:Person)-[]->(friend:Person)
	RETURN count(friend), me
	ORDER BY count(friend)
$$) as (friends agtype, me agtype);
```

## Distinct aggregation
In a distinct aggregation (i.e. of the form `aggr(DISTINCT expr)`), the list of aggregated values is the list of candidate values with all null values  removed from it. Furthermore, in a distinct aggregation, only one of all equivalent candidate values is included in the list of aggregated values, i.e. duplicates under equivalence are  removed. 


The `DISTINCT` operator works in conjunction with aggregation. It is used to make all values unique before running them  through an aggregate function.

```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (v:Person)
	RETURN count(DISTINCT v.eyes), count(v.eyes)
$$) as (distinct_eyes agtype, eyes agtype);
```

<table>
  <tr>
   <td>distinct_eyes</td>
   <td>eyes</td>
  </tr>
  <tr>
   <td>2</td>
   <td>3</td>
  </tr>
  <tr>
   <td colspan="2">1 row</td>
  </tr>
</table>

## Ambiguous Grouping Statements

This feature of not requiring the user to specify their grouping keys for a query allows for ambiguity on what Cypher should qualify as their grouping keys. For more details [click here.](https://opencypher.org/articles/2017/07/27/ocig1-aggregations-article/)

Data Setup 
```postgresql
SELECT * FROM cypher('graph_name', $$
CREATE (:L {a: 1, b: 2, c: 3}),
       (:L {a: 2, b: 3, c: 1}),
       (:L {a: 3, b: 1, c: 2})
$$) as (a agtype);
```

### Invalid Query in AGE
AGE's solution to this problem is to not allow a `WITH` or `RETURN` column to combine aggregate functions with variables that are not explicitly listed in another column of the same `WITH` or `RETURN` clause.



Query:
```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (x:L)
	RETURN x.a + count(*) + x.b + count(*) + x.c
$$) as (a agtype);
```

Result:
```postgresql
ERROR:  "x" must be either part of an explicitly listed key or used inside an aggregate function
LINE 3: RETURN x.a + count(*) + x.b + count(*) + x.c
```


### Valid Query in AGE
Columns that do not include an aggregate function in AGE are considered to be the grouping keys for that `WITH` or `RETURN` clause. 

For the above query, the user could rewrite the query is several ways that will return results

Query:
```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (x:L)
	RETURN (x.a + x.b + x.c) + count(*) + count(*), x.a + x.b + x.c
$$) as (count agtype, key agtype);
```

`x.a + x.b + x.c` is the grouping key. Grouping keys created like this must include parenthesis.

Results
<table>
  <tr>
   <td>count</td>
   <td>key</td>
  </tr>
  <tr>
   <td>12</td>
   <td>6</td>
  </tr>
  <tr>
   <td colspan="2">1 row</td>
  </tr>
</table>



Query
```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (x:L)
	RETURN x.a + count(*) + x.b + count(*) + x.c, x.a, x.b, x.c
$$) as (count agtype, a agtype, b agtype, c agtype);
```

`x.a`, `x.b`, and `x.c` will be considered different grouping keys

Results:

<table>
  <thead>
  <tr>
   <td>count</td>
   </td>a<td>
   </td>b<td>
   </td>c<td>
  </tr>
  </thead>
  <tr>
   <td>8</td>
   <td>3</td>
   <td>1</td>
   <td>2</td>
  </tr>
  <tr>
   <td>8</td>
   <td>2</td>
   <td>3</td>
   <td>1</td>
  </tr>
  <tr>
   <td>8</td>
   <td>1</td>
   <td>2</td>
   <td>3</td>
  </tr>
  <tr>
   <td colspan="4">3 rows</td>
  </tr>
</table>

### Vertices and edges in ambiguous grouping

Alternatively, the grouping key can be a vertex or edge, and then any properties of the vertex or edge can be specified without being explicitly stated in a `WITH` or `RETURN` column.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (x:L)
	RETURN count(*) + count(*) + x.a + x.b + x.c, x
$$) as (count agtype, key agtype);
```

Results will be grouped on `x`, because it is safe to assume that properties be considered unecessary for grouping to be unambiguous.

Results
<table>
  <thead>
  <tr>
   <td>count</td>
   </td>key<td>
  </tr>
  </thead>
  <tr>
   <td>8</td>
   <td>{"id": 1407374883553283, "label": "L", "properties": {"a": 3, "b": 1, "c": 2}}::vertex</td>
  </tr>
  <tr>
   <td>8</td>
   <td>{"id": 1407374883553281, "label": "L", "properties": {"a": 1, "b": 2, "c": 3}}::vertex</td>
  </tr>
  <tr>
   <td>8</td>
   <td>{"id": 1407374883553282, "label": "L", "properties": {"a": 2, "b": 3, "c": 1}}::vertex</td>
  </tr>
  <tr>
   <td colspan="4">3 rows</td>
  </tr>
</table>


### Hiding unwanted grouping keys

If the grouping key is considered unecessary for the query output, the aggregation can be done in a `WITH` clause then passing information to the `RETURN` clause.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (x:L)
	WITH count(*) + count(*) + x.a + x.b + x.c as column, x
	RETURN column
$$) as (a agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>a</td>
  </tr>
  </thead>
  <tr>
   <td>8</td>
  </tr>
  <tr>
   <td>8</td>
  </tr>
  <tr>
   <td>8</td>
  </tr>
  <tr>
   <td colspan="1">3 rows</td>
  </tr>
</table>




















