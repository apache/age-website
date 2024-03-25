# CREATE

The `CREATE` clause is used to create graph vertices and edges. 


## Terminal CREATE clauses

A `CREATE` clause that is not followed by another clause is called a terminal clause. When a cypher query ends with a terminal clause, no results will be returned from the cypher function call. However, the cypher function call still requires a column list definition. When cypher ends with a terminal node, define a single value in the column list definition: no data will be returned in this variable.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE /* Create clause here, no following clause */
$$) as (a agtype);
```



<table>
  <tr>
   <td><strong>a</strong>
   </td>
  </tr>
  <tr>
   <td>0 row(s) returned
   </td>
  </tr>
</table>

## Create single vertex

Creating a single vertex is done by issuing the following query.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE (n)
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



## Create multiple vertices

Creating multiple vertices is done by separating them with a comma.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE (n), (m)
$$) as (v agtype);
```


Result


<table>
  <tr>
   <td><strong>a</strong>
   </td>
  </tr>
  <tr>
   <td>0 row(s) returned
   </td>
  </tr>
</table>



## Create a vertex with a label

To add a label when creating a vertex, use the following syntax:

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE (:Person)
$$) as (v agtype);
```


Nothing is returned from this query.

Result


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>0 row(s) returned
   </td>
  </tr>
</table>



## Create a vertex with labels and properties

You can create a vertex with labels and properties at the same time.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE (:Person {name: 'Andres', title: 'Developer'})
$$) as (n agtype);
```


Nothing is returned from this query.

Result


<table>
  <tr>
   <td><strong>n</strong>
   </td>
  </tr>
  <tr>
   <td>(0 rows)
   </td>
  </tr>
</table>



## Return created node

You can create and return a node within the same query as follows:

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE (a {name: 'Andres'})
    RETURN a
$$) as (a agtype);
```


The newly-created node is returned.

Result


<table>
  <tr>
   <td><strong>a</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 0; label: ‘’; properties: {name: ‘Andres’}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>

## Create an edge between two nodes

To create an edge between two vertices, we first `MATCH` the two vertices. Once the nodes are matched, we create an edge between them.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:Person), (b:Person)
    WHERE a.name = 'Node A' AND b.name = 'Node B'
    CREATE (a)-[e:RELTYPE]->(b)
    RETURN e
$$) as (e agtype);
```


The created edge is returned by the query.

Result


<table>
  <tr>
   <td><strong>e</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 3; startid: 0, endid: 1; label: ‘RELTYPE’; properties: {}}::edge
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Create an edge and set properties

Setting properties on edges is done in a similar manner to setting properties when creating vertices. Note that the values can be any expression.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:Person), (b:Person)
    WHERE a.name = 'Node A' AND b.name = 'Node B'
    CREATE (a)-[e:RELTYPE {name:a.name + '<->' + b.name}]->(b)
    RETURN e
$$) as (e agtype);
```


The newly-created edge is returned by the example query.

Result


<table>
  <tr>
   <td><strong>e</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 3; startid: 0, endid: 1; label: ‘RELTYPE’; properties: {name: ‘Node A&lt;->Node B’}}::edge
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Create a full path
When you use `CREATE` and a pattern, all parts of the patterns that are not already in scope at this time will be created.

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
    CREATE p = (andres {name:'Andres'})-[:WORKS_AT]->(neo)<-[:WORKS_AT]-(michael {name:'Michael'})
    RETURN p
$$) as (p agtype);
```


This query creates three nodes and two relationships simultaneously, assigns the pattern to a path variable, and returns said pattern.

Result
<table>
	<tr>
		<td><strong>p</strong></td>
	</tr>
	<tr>
		<td>
			[{id:0; label: ‘’; properties:{name:’Andres’}}::vertex, <br>{id: 3; startid: 0, endid: 1; label: ‘WORKS_AT’; properties: {}}::edge, <br>{id:1; label: ‘’; properties: {}}::vertex,<br>{id: 3; startid: 2, endid: 1; label: ‘WORKS_AT’; properties: {}}::edge,<br>{id:2; label: ‘’; properties: {name:’Michael’}}::vertex]::path
               </td>
	</tr>
	<tr>
		<td>(1 row)
		</td>
	</tr>
</table>


