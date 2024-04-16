# Graphs

A graph consists of a set of vertices and edges, where each individual node and edge possesses a map of properties. A vertex is the basic object of a graph, that can exist independently of everything else in the graph. An edge creates a directed connection between two vertices.


## Create a Graph

To create a graph, use the `create_graph` function, located in the `ag_catalog` namespace.


### create_graph()

Syntax: `create_graph(graph_name);`

Returns:

```
void
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
   <td>graph_name
   </td>
   <td>Name of the graph to be created
   </td>
  </tr>
</table>


Considerations



* This function will not return any results. The graph is created if there is no error message.
* Tables needed to set up the graph are automatically created.

Example:

```sql
SELECT * FROM ag_catalog.create_graph('graph_name');
```

## Delete a Graph

To delete a graph, use the `drop_graph` function, located in the `ag_catalog` namespace.


### drop_graph()

Syntax: `drop_graph(graph_name, cascade);`

Returns:

```
void
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
   <td>graph_name
   </td>
   <td>Name of the graph to be deleted
   </td>
  </tr>
  <tr>
   <td>cascade
   </td>
   <td>A boolean that will will delete labels and data that depend on the graph.
   </td>
  </tr>
</table>


Considerations:



* This function will not return any results. If there is no error message the graph has been deleted.
* It is recommended to set the cascade option to true, otherwise everything in the graph must be manually dropped with SQL DDL commands.

Example:

```sql
SELECT * FROM ag_catalog.drop_graph('graph_name', true);
```

## How Graphs Are Stored In Postgres

When creating graphs with AGE, a Postgres namespace will be generated for every individual graph. 
The name and namespace of the created graphs can be seen within the `ag_graph` table from the `ag_catalog` namespace:
```sql
SELECT create_graph('new_graph');

NOTICE:  graph "new_graph" has been created
 create_graph 
--------------

(1 row)

SELECT * FROM ag_catalog.ag_graph;

   name    | namespace 
-----------+-----------
 new_graph | new_graph
(1 row)
```

After creating the graph, two tables are going to be created under the graph's namespace to store vertices and edges: `_ag_label_vertex` and `_ag_label_edge`.
These will be the parent tables of any new vertex or edge label. The query below shows how to retrieve the edge and vertex labels for all the graphs in the database.

```sql
-- Before creating a new vertex label.
SELECT * FROM ag_catalog.ag_label;

       name       | graph | id | kind |          relation          |        seq_name         
------------------+-------+----+------+----------------------------+-------------------------
 _ag_label_vertex | 68484 |  1 | v    | new_graph._ag_label_vertex | _ag_label_vertex_id_seq
 _ag_label_edge   | 68484 |  2 | e    | new_graph._ag_label_edge   | _ag_label_edge_id_seq
(2 rows)

-- Creating a new vertex label.
SELECT create_vlabel('new_graph', 'Person');
NOTICE:  VLabel "Person" has been created
 create_vlabel 
---------------
 
(1 row)

-- After creating a new vertex label.
SELECT * FROM ag_catalog.ag_label;
       name       | graph | id | kind |          relation          |        seq_name         
------------------+-------+----+------+----------------------------+-------------------------
 _ag_label_vertex | 68484 |  1 | v    | new_graph._ag_label_vertex | _ag_label_vertex_id_seq
 _ag_label_edge   | 68484 |  2 | e    | new_graph._ag_label_edge   | _ag_label_edge_id_seq
 Person           | 68484 |  3 | v    | new_graph."Person"         | Person_id_seq
(3 rows)

```

Whenever a vertex label is created with the `create_vlabel()` function, a new table is generated within the `new_graph`'s namespace: `new_graph."<label>"`.
The same works for the `create_elabel()` function for the creation of edge labels. Creating vertices and edges with Cypher will automatically make these tables.

```sql
-- Creating two vertices and one edge.
SELECT * FROM cypher('new_graph', $$
CREATE (:Person {name: 'Daedalus'})-[:FATHER_OF]->(:Person {name: 'Icarus'})
$$) AS (a agtype);
 a 
---
(0 rows)

-- Showing the newly created tables.
SELECT * FROM ag_catalog.ag_label;
       name       | graph | id | kind |          relation          |        seq_name         
------------------+-------+----+------+----------------------------+-------------------------
 _ag_label_vertex | 68484 |  1 | v    | new_graph._ag_label_vertex | _ag_label_vertex_id_seq
 _ag_label_edge   | 68484 |  2 | e    | new_graph._ag_label_edge   | _ag_label_edge_id_seq
 Person           | 68484 |  3 | v    | new_graph."Person"         | Person_id_seq
 FATHER_OF        | 68484 |  4 | e    | new_graph."FATHER_OF"      | FATHER_OF_id_seq
(4 rows)
```

_Note: It is recommended that no DML or DDL commands are executed in the namespace that is reserved for the graph._ 
<!-- Needs clarification. Since search path is set as ag_catalog first in the searh path, all DML and DDL will happen in the ag_catalog namespace. Also should we say schema rather than namespace? 
-->

