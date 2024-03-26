# DELETE

The `DELETE` clause is used to delete graph elements—nodes, relationships orpaths.

## Terminal DELETE clauses

A `DELETE` clause that is not followed by another clause is called a terminal clause. When a cypher query ends with a terminal clause, no results will be returned from the cypher function call. However, the cypher function call still requires a column list definition. When cypher ends with a terminal node, define a single value in the column list definition: no data will be returned in this variable.


## Introduction

For removing properties, see `REMOVE`.

You cannot delete a node without also deleting edges that start or end on said vertex. Either explicitly delete the vertices,or use `DETACH DELETE`.


## Delete isolated vertices

To delete a vertex, use the `DELETE` clause.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
	MATCH (v:Useless)
	DELETE v
$$) as (v agtype);
```


This will delete the vertices (with label Useless) that have no edges. Nothing is returned from this query.


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>(0 rows)
   </td>
  </tr>
</table>

## Delete all vertices and edges associated with them

Running a `MATCH` clause will collect all nodes— use the `DETACH` option to first delete a vertice's edges, then delete the vertex itself.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
	MATCH (v:Useless)
	DETACH DELETE v
$$) as (v agtype);
```


Nothing is returned from this query.


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>(0 rows)
   </td>
  </tr>
</table>

## Delete edges only

To delete an edge, use the `MATCH` clause to find your edges, then add the variable to the `DELETE` clause.

Query
```postgresql
SELECT * 
FROM cypher('graph_name', $$
	MATCH (n {name: 'Andres'})-[r:KNOWS]->()
	DELETE r
$$) as (v agtype);
```


Nothing is returned from this query.


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>(0 rows)
   </td>
  </tr>
</table>

## Return a deleted vertex

You can return vertices that have been deleted with a `RETURN` clause.

Query
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n {name: 'A'})
	DELETE n
	RETURN n
$$) as (a agtype);

```

<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr><td>{"id": 281474976710659, "label": "", "properties": {"name": "A"}}::vertex</td></tr>
  <tr>
   <td>(1 rows)
   </td>
  </tr>
</table>



