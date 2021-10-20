# WITH

Introduction

Using WITH, you can manipulate the output before it is passed on to the following query parts. The manipulations can be of the shape and/or number of entries in the result set.

WITH can also, like RETURN, alias expressions that are introduced into the results using the aliases as the binding name.

WITH is also used to separate the reading of the graph from updating of the graph. Every part of a query must be either read-only or write-only. When going from a writing part to a reading part, the switch can be done with an optional WITH clause.


## Filter on results

Results passed through a WITH clause can be filtered on.

Query


```
SELECT *
FROM cypher('graph_name', $$
MATCH (david {name: 'David'})-[:FRIEND]-(otherPerson)
WITH otherPerson.name as name, otherPerson.age as age, otherPerson.freetonight as free_tonight
WHERE age > 21 and free_tonight = TRUE
RETURN name
$$) as (name agtype);
```


The name of the person connected to 'David' with the at least more than one outgoing relationship will be returned by the query.

Result


<table>
  <tr>
   <td>name
   </td>
  </tr>
  <tr>
   <td>"Anders"
   </td>
  </tr>
  <tr>
   <td>1 row
   </td>
  </tr>
</table>



