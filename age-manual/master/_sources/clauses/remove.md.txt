# REMOVE

The `REMOVE` clause is used to remove properties from vertex and edges.


## Terminal REMOVE clauses

A `REMOVE` clause that is not followed by another clause is a terminal clause. When a cypher query ends with a terminal clause, no results will be returned from the cypher function call. However, the cypher function call still requires a column list definition. When cypher ends with a terminal node, define a single value in the column list definition: no data will be returned in this variable.


## Remove a property

Cypher does not allow storing `null` in properties. Instead, if no value exists, the property is just not there. So, removing a property value on a node or a relationship is also done with `REMOVE`.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    MATCH (andres {name: 'Andres'})
    REMOVE andres.age
    RETURN andres
$$) as (andres agtype);
```


The node is returned, and no property age exists on it.

Result


<table>
  <tr>
   <td><strong>andres</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 3; label: ‘Person’; properties: {name:"Andres"}}::vertex
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>
