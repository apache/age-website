# WITH

## Introduction

Using `WITH`, you can manipulate the output before it is passed on to the following query parts. The manipulations can be of the shape and/or number of entries in the result set.

`WITH` can also, like `RETURN`, alias expressions that are introduced into the results using the aliases as the binding name.

`WITH` is also used to separate the reading of the graph from updating of the graph. Every part of a query must be either read-only or write-only. When going from a writing clause to a reading clause, an optional `WITH` can be used to do so.


## Filter on aggregate function results

Aggregated results have to pass through a `WITH` clause to be able to filter on.

Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (david {name: 'David'})-[]-(otherPerson)-[]->()
	WITH otherPerson, count(*) AS foaf
	WHERE foaf > 1
	RETURN otherPerson.name
$$) as (name agtype);
```


The name of the person connected to 'David' with the at least more than one outgoing relationship will be returned by the query.

Result
<table>
  <thead>
  <tr>
   <td>name
   </td>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>"Anders"
   </td>
  </tr>
  </tbody>
  <tr>
   <td>1 row
   </td>
  </tr>
</table>



## Sort results before using collect on them

You can sort results before passing them to collect, thus sorting the resulting list.

Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n)WITH n
	ORDER BY n.name DESC LIMIT 3
	RETURN collect(n.name)
$$) as (names agtype);
```


A list of the names of people in reverse order, limited to 3, is returned in a list.

Result
<table>
  <thead>
  <tr>
   <td>names
   </td>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>["Emil","David","Ceasar"]
   </td>
  </tr>
  </tbody>
  <tr>
   <td>1 row
   </td>
  </tr>
</table>

## Limit branching of a path search

You can match paths, limit to a certain number, and then match again using those paths as a base, as well as any number of similar limited searches.

Query

```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n {name: 'Anders'})-[]-(m)WITH m
	ORDER BY m.name DESC LIMIT 1
	MATCH (m)-[]-(o)
	RETURN o.name
$$) as (name agtype);
```


Starting at 'Anders', find all matching nodes, order by name descending and get the top result, then find all the nodes connected to that top result, and return their names.

Result
<table>
  <thead>
  <tr>
   <td>name
   </td>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>"Anders"
   </td>
  </tr>
  <tr>
   <td>"Bossman"
   </td>
  </tr>
  </tbody>
  <tr>
   <td>2 rows
   </td>
  </tr>
</table>








