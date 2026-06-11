# MERGE

The `MERGE` clause ensures that a pattern exists in the graph. Either the pattern already exists, or it needs to be created.


`MERGE` either matches existing nodes, or creates new data. It’s a combination of `MATCH` and `CREATE`.

For example, you can specify that the graph must contain a node for a user with a certain name. If there isn’t a node with the correct name, a new node will be created and its name property set. When using `MERGE` on full patterns, the behavior is that either the whole pattern matches, or the whole pattern is created. `MERGE` will not partially use existing patterns. If partial matches are needed, this can be accomplished by splitting a pattern up into multiple `MERGE` clauses.

As with `MATCH`, `MERGE` can match multiple occurrences of a pattern. If there are multiple matches, they will all be passed on to later stages of the query.

## Data Setup

```postgresql
SELECT * from cypher('graph_name', $$
CREATE (A:Person {name: "Charlie Sheen", bornIn: "New York"}),
    (B:Person {name: "Michael Douglas", bornIn: "New Jersey"}),
    (C:Person {name: "Rob Reiner", bornIn: "New York"}),
    (D:Person {name: "Oliver Stone", bornIn: "New York"}),
    (E:Person {name: "Martin Sheen", bornIn: "Ohio"})
$$) as (result agtype);
```

## Merge Nodes

### Merge a Node with a Label

By just specifying a pattern with a single vertex and no labels, all vertices in the graph will be returned.

Query

```postgresql
SELECT * FROM cypher('graph_name', $$
MERGE (v:Critic)
RETURN v
$$) as (v agtype);
```

If there exists a vertex with the label 'Critic', that vertex will be returned. Otherwise, the vertex will be created and returned.

<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 0; label: ‘Critic’: properties:{}}::vertex
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>


### Merge Single Vertex with Properties

Merging a vertex node with properties where not all properties match any existing vertex.

Query

```postgresql
SELECT * FROM cypher('graph_name', $$
MERGE (charlie {name: 'Charlie Sheen', age: 10})
RETURN charlie
$$) as (v agtype);
```

If there exists a vertex with the label 'Critic', that vertex will be returned. Otherwise, the vertex will be created and returned.

<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 0; label: ‘Actor’: properties:{name: 'Charlie Sheen', age: 10}}::vertex
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>

If there exists a vertex with all properties, that vertex will be returned. Otherwise, a new vertex with the name 'Charlie Sheen' will be created and returned.


### Merge a Single Vertex Specifying Both Label and Property

Merging a vertex where both label and property constraints match an existing vertex.

Query

```postgresql
SELECT * FROM cypher('graph_name', $$
MERGE (michael:Person {name: 'Michael Douglas'})
RETURN michael.name, michael.bornIn
$$) as (Name agtype, BornIn agtype);
```

'Michael Douglas' will match the existing vertex and the vertex's `name` and `bornIn` properties will be returned.

<table>
  <tr>
   <td><strong>Name</strong></td>
   <td><strong>BornIn</strong></td>
  </tr>
  <tr>
   <td>"Michael Douglas"</td>
   <td>"New Jersey"</td>
  </tr>
  <tr>
   <td>1 row(s) returned</td>
  </tr>
</table>
