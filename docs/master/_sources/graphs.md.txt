# Graphs

A graph consists of a set of vertices and edges, where each individual node and edge possesses a map of properties. A vertex is the basic object of a graph, that can exist independently of everything else in the graph. An edge creates a directed connection between two vertices.

## Create a Graph

To create a graph, use the create_graph function, located in the ag_catalog namespace.

### create_graph

#### Syntax

```text
create_graph(graph_name)
```

#### Returns

```text
void
```

#### Arguments

| Name        | Description                     |
| ----------- | ------------------------------- |
| graph_name  | Name of the graph to be created |

#### Considerations

* This function will not return any results. However if there is not an error message the graph will be created.
* Tables needed to set up the graph are automatically created.

#### Example

```postgresql
SELECT * FROM ag_catalog.create_graph('graph_name');
```

## Delete a Graph

To delete a graph, use the drop_graph function, located in the ag_catalog namespace.

### drop_graph

#### Syntax

```text
drop_graph(graph_name, cascade)
```

#### Returns

```text
void
```

#### Arguments

| Name        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| graph_name  | Name of the graph to be deleted                                          |
| cascade     | A boolean that will not drop the graph if any data remains in the graph. |

#### Considerations

* This function will not return any results. However if there is not an error message the graph will be deleted.
* It is recommended to set the cascade option to true, otherwise everything in the graph must be manually dropped with SQL DDL commands.

#### Example

```postgresql
SELECT * FROM ag_catalog.drop_graph('graph_name', true);
```
