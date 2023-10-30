# Graphs

A graph consists of a set of vertices and edges, where each individual node and edge possesses a map of properties. A vertex is the basic object of a graph, that can exist independently of everything else in the graph. An edge creates a directed connection between two vertices.


## Create a Graph

To create a graph, use the create_graph function, located in the ag_catalog namespace.


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

```postgresql
SELECT * FROM ag_catalog.create_graph('graph_name');
```

## Delete a Graph

To delete a graph, use the drop_graph function, located in the ag_catalog namespace.


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
   <td>A boolean that will delete labels and data that depend on the graph.
   </td>
  </tr>
</table>


Considerations:



* This function will not return any results. If there is no error message the graph has been deleted.
* It is recommended to set the cascade option to true, otherwise everything in the graph must be manually dropped with SQL DDL commands.

Example:

```postgresql
SELECT * FROM ag_catalog.drop_graph('graph_name', true);
```

## A Cypher Graph vs A Postgres Namespace

Cypher uses a Postgres namespace for every individual graph. It is recommended that no DML or DDL commands are executed in the namespace that is reserved for the graph. 
<!-- Needs clarification. Since search path is set as ag_catalog first in the searh path, all DML and DDL will happen in the ag_catalog namespace. Also should we say schema rather than namespace? 
-->

