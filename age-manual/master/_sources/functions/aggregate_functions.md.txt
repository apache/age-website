# Aggregation Functions

Functions that activate [auto aggregation](../intro/aggregation.md).

## Data Setup
```postgresql
LOAD 'age';
SET search_path TO ag_catalog;

SELECT create_graph('graph_name');

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

## min

`min()` returns the minimum value in a set of values.


Syntax: `min(expression)`

Returns:


```
A property type, or a list, depending on the values returned by expression.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression returning a set containing any combination of property types and lists thereof.
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* In a mixed set, any string value is always considered to be lower than any numeric value, and any list is always considered to be lower than any string.
* Lists are compared in dictionary order, i.e. list elements are compared pairwise in ascending order from the start of the list to the end.
* `min(null)` returns null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (v:Person)
    RETURN min(v.age)
$$) as (min_age agtype);
```
The lowest of all the values in the property age is returned.

Result:


<table>
  <tr>
   <td>min_age
   </td>
  </tr>
  <tr>
   <td>13
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



### Using `min()` with Lists

Data Setup:

To clarify the following example, assume the next three commands are run first:


```postgresql
SELECT * FROM cypher('graph_name', $$ 
    CREATE (:min_test {val:'d'})
$$) as (result agtype);

SELECT * FROM cypher('graph_name', $$
    CREATE (:min_test {val:['a', 'b', 23]})
$$) as (result agtype);

SELECT * FROM cypher('graph_name', $$ 
    CREATE (:min_test {val:[1, 'b', 23]})
$$) as (result agtype);
```


Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (v:min_test)
    RETURN min(v.val)
$$) as (min_val agtype);
```


The lowest of all the values in the set—in this case, the list ['a', 'b', 23]—is returned, as (i) the two lists are considered to be lower values than the string "d", and (ii) the string "a" is considered to be a lower value than the numerical value 1.

Result:


<table>
  <tr>
   <td>min_age
   </td>
  </tr>
  <tr>
   <td>["a", "b", 23]
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## max

`max()` returns the maximum value in a set of values.

Syntax: `max(expression)`

Returns:


```
A property type, or a list, depending on the values returned by expression.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression returning a set containing any combination of property types and lists thereof.
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* In a mixed set, any numeric value is always considered to be higher than any string value, and any string value is always considered to be higher than any list.
* Lists are compared in dictionary order, i.e. list elements are compared pairwise in ascending order from the start of the list to the end.
* `max(null)` returns null.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n:Person)
    RETURN max(n.age)
$$) as (max_age agtype);
```


The highest of all the values in the property age is returned.

Result:


<table>
  <tr>
   <td>min_age
   </td>
  </tr>
  <tr>
   <td>44
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## stDev

`stDev()` returns the standard deviation for the given value over a group. It uses a standard two-pass method, with N - 1 as the denominator, and should be used when taking a sample of the population for an unbiased estimate. When the standard deviation of the entire population is being calculated, `stDevP` should be used.

Syntax: `stDev(expression)`

Returns: 


```
An agtype float.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `stDev(null)` returns 0.0 (zero).

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
   MATCH (n:Person)
   RETURN stDev(n.age)
$$) as (stdev_age agtype);
```


The standard deviation of the values in the property age is returned.

Result:


<table>
  <tr>
   <td>stdev_age
   </td>
  </tr>
  <tr>
   <td>15.716233645501712
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## stDevP

`stDevP()` returns the standard deviation for the given value over a group. It uses a standard two-pass method, with N as the denominator, and should be used when calculating the standard deviation for an entire population. When the standard deviation of only a sample of the population is being calculated, `stDev` should be used.

Syntax: `stDevP(expression)`

Returns:


```
An agtype float.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `stDevP(null)` returns 0.0 (zero).

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n:Person)
    RETURN stDevP(n.age)
$$) as (stdevp_age agtype);
```


The population standard deviation of the values in the property age is returned. 

Result:


<table>
  <tr>
   <td>stdevp_age
   </td>
  </tr>
  <tr>
   <td>12.832251036613439
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## percentileCont

`percentileCont()` returns the percentile of the given value over a group, with a percentile from 0.0 to 1.0. It uses a linear interpolation method, calculating a weighted average between two values if the desired percentile lies between them. For nearest values using a rounding method, see `percentileDisc`.

Syntax: `percentileCont(expression, percentile)`

Returns:


```
An agtype float.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An agtype number expression
   </td>
  </tr>
  <tr>
   <td>percentile
   </td>
   <td>An agtype number value between 0.0 and 1.0
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `percentileCont(null, percentile)` returns null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n:Person)
    RETURN percentileCont(n.age, 0.4)
$$) as (percentile_cont_age agtype);
```


The 40th percentile of the values in the property age is returned, calculated with a weighted average. In this case, 0.4 is the median, or 40th percentile.

Result:


<table>
  <tr>
   <td>percentile_cont_age
   </td>
  </tr>
  <tr>
   <td>29.0
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## percentileDisc

`percentileDisc()` returns the percentile of the given value over a group, with a percentile from 0.0 to 1.0. It uses a rounding method and calculates the nearest value to the percentile. For interpolated values, see `percentileCont`.

Syntax: `percentileDisc(expression, percentile)`

Returns:


```
An agtype float.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An agtype number expression
   </td>
  </tr>
  <tr>
   <td>percentile
   </td>
   <td>An agtype number value between 0.0 and 1.0
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `percentileDisc(null, percentile)` returns null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n:Person)
    RETURN percentileDisc(n.age, 0.5)
$$) as (percentile_disc_age agtype);
```


The 50th percentile of the values in the property age is returned. 

Result:


<table>
  <tr>
   <td>percentile_cont_age
   </td>
  </tr>
  <tr>
   <td>33.0
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## count

`count()` returns the number of values or records, and appears in two variants:



* `count(*)` returns the number of matching records
* `count(expr)` returns the number of non-null values returned by an expression.

Syntax: `count(expression)`

Returns:


```
An agtype integer.
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression
   </td>
  </tr>
</table>


Considerations:
* `count(*)` includes records returning null.
* `count(expr)` ignores null values.
* `count(null)` returns 0 (zero).
* `count(*)` can be used to return the number of nodes; for example, the number of nodes connected to some node n.


Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'A'})-[]->(x)
    RETURN n.age, count(*)
$$) as (age agtype, number_of_people agtype);
```

The age property of the start node n (with a name value of 'A') and the number of nodes related to n are returned.

Result:
<table>
  <tr>
   <td>age
   </td>
   <td>number_of_people
   </td>
  </tr>
  <tr>
   <td>13
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>


Using `count(*)` can be used to group and count relationship types, returning the number of relationships of each type.

Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'A'})-[r]->()
    RETURN type(r), count(*)
$$) as (label agtype, count agtype);
```


The relationship type and the number of relationships with that type are returned.

Result:


<table>
  <tr>
   <td>label
   </td>
   <td>count
   </td>
  </tr>
  <tr>
   <td>“KNOWS”
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



### Using `count(expression)` to return the number of values

Instead of simply returning the number of records with `count(*)`, it may be more useful to return the actual number of values returned by an expression.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'A'})-[]->(x)
    RETURN count(x)
$$) as (count agtype);
```


The number of nodes connected to the start node n is returned.

Result:


<table>
  <tr>
   <td>count
   </td>
  </tr>
  <tr>
   <td>3
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



### Counting non-null values

`count(expression)` can be used to return the number of non-null values returned by the expression.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n:Person)
    RETURN count(n.age)
$$) as (count agtype);
```


The number of nodes with the label `Person` that have a non-null value for the age property is returned.

Result:


<table>
  <tr>
   <td>count
   </td>
  </tr>
  <tr>
   <td>3
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>


### Counting with and without duplicates

In this example we are trying to find all our friends of friends, and count them:
* The first aggregate function, `count(DISTINCT friend_of_friend)`, will only count a `friend_of_friend` once, as `DISTINCT` removes the duplicates.
* The second aggregate function, `count(friend_of_friend)`, will consider the same `friend_of_friend` multiple times.

Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (me:Person)-[]->(friend:Person)-[]->(friend_of_friend:Person)
	WHERE me.name = 'A'
	RETURN count(DISTINCT friend_of_friend), count(friend_of_friend)
$$) as (friend_of_friends_distinct agtype, friend_of_friends agtype);
```

Both B and C know D and thus D will get counted twice when not using `DISTINCT`.

Result:
<table>
  <tr>
   <td>friend_of_friends_distinct
   </td>
   <td>friend_of_friends
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>2
   </td>
  </tr>
  <tr>
   <td>1 row
   </td>
  </tr>
</table>


## avg

`avg()` returns the average of a set of numeric values.

Syntax: `avg(expression)`

Returns:


```
An agtype integer
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression returning a set of numeric values.
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `avg(null)` returns null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
MATCH (n:Person)
RETURN avg(n.age)
$$) as (avg_age agtype);
```


The average of all the values in the property age is returned. 

Result:


<table>
  <tr>
   <td>avg_age
   </td>
  </tr>
  <tr>
   <td>30.0
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## sum 

`sum()` returns the sum of a set of numeric values.

Syntax: `sum(expression)`

Returns:


```
An agtype float
```


Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression returning a set of numeric values.
   </td>
  </tr>
</table>


Considerations:



* Any null values are excluded from the calculation.
* `sum(null)` returns null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
MATCH (n:Person)
RETURN sum(n.age)
$$) as (total_age agtype);
```


The sum of all the values in the property age is returned.

Result:


<table>
  <tr>
   <td>total_age
   </td>
  </tr>
  <tr>
   <td>90
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>
