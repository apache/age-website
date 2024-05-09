# SET

The `SET` clause is used to update labels and properties on vertices and edges


## Terminal SET clauses

A `SET` clause that is not followed by another clause is a terminal clause. When a cypher query ends with a terminal clause, no results will be returned from the cypher function call. However, the cypher function call still requires a column list definition. When cypher ends with a terminal node, define a single value in the column list definition: no data will be returned in this variable.


## Set a property

To set a property on a node or relationship, use `SET`.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
   MATCH (v {name: 'Andres'})
   SET v.surname = 'Taylor'
$$) as (v agtype);
```


The newly changed node is returned by the query.

Result


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



## Return created vertex

Creating a single vertex is done with the following query:

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    MATCH (v {name: 'Andres'})
    SET v.surname = 'Taylor'
    RETURN v
$$) as (v agtype);
```


The newly changed vertex is returned by the query.

Result


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 3; label: ‘Person’; properties: {surname:"Taylor", name:"Andres", age:36, hungry:true}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Remove a property

Normally a property can be removed by using `REMOVE`, but users can also remove properties using the `SET` command. One example is if the property comes from a parameter.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    MATCH (v {name: 'Andres'})
    SET v.name = NULL
    RETURN v
$$) as (v agtype);
```


The node is returned by the query, and the name property is now missing.

Result


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 3; label: ‘Person’; properties: {surname:"Taylor", age:36, hungry:true}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>


## Set multiple properties using one SET clause

If you want to set multiple properties in one query, you can separate them with a comma.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
MATCH (v {name: 'Andres'})
SET v.position = 'Developer', v.surname = 'Taylor'
RETURN v
$$) as (v agtype);
```


Result

<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td> {"id": 281474976710661, "label": "", "properties": {"name": "Andres", "surname": "Taylor", "position": "Developer"}}:
:vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



