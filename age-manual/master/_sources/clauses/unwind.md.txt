# UNWIND

## Introduction

The `UNWIND` clause in Cypher is used to expand a list into a sequence of individual elements. It transforms a list value into rows. For each element in the list, `UNWIND` creates a new row with the variable bound to that list element. If the expression evaluates to `null`, or an empty list, `UNWIND` will produce a single row with a null value for the variable, or no rows at all, respectively, depending on the specific database implementation. In AGE, `UNWIND` will produce a single row with a null value for the variable when the expression is `null`, and no rows when the list is empty.

`UNWIND` is particularly useful when dealing with list properties of nodes or relationships, or when you need to iterate over a collection of values within your query.

## Examples

### Data Setup

For some of these examples, we will be using this reference data:

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    CREATE (n {name: 'node1', a: [1, 2, 3]}),
           (m {name: 'node2', a: [4, 5, 6]}),
           (o {name: 'node3', a: [7, 8, 9]}),
           (n)-[:KNOWS]->(m),
           (m)-[:KNOWS]->(o)
$$) as (i agtype);
```

### Basic UNWIND with a List of Integers

This example demonstrates the most basic use of UNWIND, where a literal list of integers is expanded into individual rows.

#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    UNWIND [1, 2, 3] AS i
    RETURN i
$$) as (i agtype);
```

#### Output

```text
i
---
1
2
3
(3 rows)
```

### UNWIND with Node Properties

This example shows how to use UNWIND to process list properties of nodes and uses the reference data.

#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    MATCH (n)
    WITH n.a AS a
    UNWIND a AS i
    RETURN *
$$) as (i agtype, j agtype);
```

#### Output

```text
i | j
-----------+---
[1, 2, 3] | 1
[1, 2, 3] | 2
[1, 2, 3] | 3
[4, 5, 6] | 4
[4, 5, 6] | 5
[4, 5, 6] | 6
[7, 8, 9] | 7
[7, 8, 9] | 8
[7, 8, 9] | 9
(9 rows)
```

### Nested UNWIND

UNWIND can be nested to flatten nested lists.

#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    WITH [[1, 2], [3, 4], 5] AS nested
    UNWIND nested AS x
    UNWIND x AS y
    RETURN y
$$) as (i agtype);
```

#### Output

```text
i
---
1
2
3
4
5
(5 rows)
```

### UNWIND with Path Functions: `nodes()`

UNWIND can be used with path functions like `nodes()` to process vertices in a path.


#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    MATCH p=(n)-[:KNOWS]->(m)
    UNWIND nodes(p) as node
    RETURN node
$$) as (i agtype);
```

#### Output

```text
i
-----------------------------------------------------------------------------------------------
{"id": 281474976710657, "label": "", "properties": {"a": [1, 2, 3], "name": "node1"}}::vertex
{"id": 281474976710658, "label": "", "properties": {"a": [4, 5, 6], "name": "node2"}}::vertex
{"id": 281474976710658, "label": "", "properties": {"a": [4, 5, 6], "name": "node2"}}::vertex
{"id": 281474976710659, "label": "", "properties": {"a": [7, 8, 9], "name": "node3"}}::vertex
(4 rows)
```

### UNWIND with Path Functions: `relationships()`

Similarly, UNWIND can be used with `relationships()` to process relationships in a path.


#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    MATCH p=(n)-[:KNOWS]->(m)
    UNWIND relationships(p) as relation
    RETURN relation
$$) as (i agtype);
```

#### Output

```text
i
---------------------------------------------------------------------------------------------------------------------------
{"id": 844424930131969, "label": "KNOWS", "end_id": 281474976710658, "start_id": 281474976710657, "properties": {}}::edge
{"id": 844424930131970, "label": "KNOWS", "end_id": 281474976710659, "start_id": 281474976710658, "properties": {}}::edge
(2 rows)
```

### UNWIND with Path Functions: `relationships()` and `paths`

This example demonstrates unwinding relationships from paths, where the path itself is also unwound.

#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    MATCH p=({name:'node1'})-[e:KNOWS*]->({name:'node3'})
    UNWIND [p] as path
    UNWIND relationships(path) as edge
    RETURN edge
$$) as (i agtype);
```

#### Output

```text
i
---------------------------------------------------------------------------------------------------------------------------
 {"id": 844424930131969, "label": "KNOWS", "end_id": 281474976710658, "start_id": 281474976710657, "properties": {}}::edge
 {"id": 844424930131970, "label": "KNOWS", "end_id": 281474976710659, "start_id": 281474976710658, "properties": {}}::edge
(2 rows)
```

### UNWIND in SET Clause

UNWIND can be combined with the SET clause to update properties based on unwound values.


#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    MATCH p=(n)-[:KNOWS]->(m)
    UNWIND nodes(p) as node
    SET node.type = 'vertex'
$$) as (i agtype);
```

#### Output

```text
i
---
(0 rows)
```

### UNWIND with NULL

This example shows how UNWIND handles a NULL value. This behavior is important to understand when dealing with optional list properties or situations where the expression might evaluate to NULL.


#### SQL Query

```postgresql
SELECT * FROM cypher('cypher_unwind', $$
    UNWIND NULL as i
    RETURN i
$$) as (i agtype);
```

#### Output

```text
i
---

(1 row)
```
