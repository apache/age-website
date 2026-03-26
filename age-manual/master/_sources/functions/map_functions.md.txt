# Map Functions

In AGE, a map is a data structure that allows you to store a collection of key-value pairs. Each key within a map is unique, and is associated with a corresponding value.
This data structure is similar to dictionaries in Python or objects in JavaScript, providing an efficient way to organize and retrieve data based on keys.
This section focuses on explaining various functions that allow you to generate and manipulate maps effectively.

## vertex_stats()
The `vertex_stats()` function can extract information from a vertex. Upon passing a vertex as an argument to the vertex_stats function, 
you are presented with a structured map, which includes the following key-value pairs:

* id: A unique identifier assigned to the vertex;
* label: The label or type that categorizes the vertex;
* in_degree: The count of incoming edges directed towards the vertex;
* out_degree: The count of outgoing edges originating from the vertex;
* self_loops: The count of self-loop edges associated with the vertex.

Syntax: `vertex_stats(vertex)`

### Setup

```sql
-- Creating the graph.
SELECT create_graph('vertex_stats_graph');

-- Creating vertices and edges.
SELECT * FROM cypher('vertex_stats_graph', $$
CREATE (:Person {name: 'John Donne'})-[:WROTE]->(:Poem {title: 'Holy Sonnet XIV'})
$$) AS (a agtype);
```

### Query

```sql
SELECT * FROM cypher('vertex_stats_graph', $$
MATCH (v:Poem {title: 'Holy Sonnet XIV'})
RETURN vertex_stats(v)
$$) AS (vertex_stats agtype);
```

### Result

<table>
  <tr>
   <td>vertex_stats
   </td>
  </tr>
  <tr>
   <td>{"id": 1407374883553281, "label": "Poem", "in_degree": 1, "out_degree": 0, "self_loops": 0}
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>

### Retrieving Values

It is also possible to retrieve specific values from the generated map using the following syntax: 

`vertex_stats(vertex)["key"]`
