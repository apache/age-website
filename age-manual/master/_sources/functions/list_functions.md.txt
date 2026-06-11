# List Functions 

## Data Setup

```postgresql
SELECT * from cypher('graph_name', $$
CREATE (A:Person {name: 'Alice', age: 38, eyes: 'brown'}),
	(B:Person {name: 'Bob', age: 25, eyes: 'blue'}),
	(C:Person {name: 'Charlie', age: 53, eyes: 'green'}),
	(D:Person {name: 'Daniel', age: 54, eyes: 'brown'}),
	(E:Person {name: 'Eskil', age: 41, eyes: 'blue', array: ['one', 'two', 'three']}),
	(A)-[:KNOWS]->(B),
	(A)-[:KNOWS]->(C),
	(B)-[:KNOWS]->(D),
	(C)-[:KNOWS]->(D),
	(B)-[:KNOWS]->(E)
$$) as (result agtype);
```

## keys

`keys()` returns a list containing the string representations for all the property names of a vertex, edge, or map.

Syntax: `keys(expression)`

Returns:
```
An agtype list containing string agtype elements
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
   <td>path
   </td>
   <td>An expression that returns a vertex, edge, or map.
   </td>
  </tr>
</table>

Considerations:
* `keys(null)` returns null.

Query:
```postgresql
SELECT * from cypher('graph_name', $$
	MATCH (a)
	WHERE a.name = 'Alice'
	RETURN keys(a)
$$) as (result agtype);
```

A list containing the names of all the properties on the vertex bound to `a` is returned.

Result:


<table>
  <tr>
   <td>keys
   </td>
  </tr>
  <tr>
   <td>["age", "eyes", "name"]</td>
  </tr>
  <tr>
   <td colspan="1" >1 rows
   </td>
  </tr>
</table>

## range

`range()` returns a list comprising all integer values within a range bounded by a start value **start** and end value **end**, where the difference **step** between any two consecutive values is constant; i.e. an arithmetic progression. The range is  inclusive, and the arithmetic progression will therefore always contain **start** and—depending on the values of **start**, **step** and **end**—**end**.

Syntax: `range(start, end [, step])`

Returns:
```
An agtype list containing integer elements
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
   <td>start
   </td>
   <td>An expression that returns an integer value.
   </td>
  </tr>
  <tr>
   <td>end
   </td>
   <td>An expression that returns an integer value.
   </td>
  </tr>
  <tr>
   <td>step
   </td>
   <td>A numeric expression defining the difference between any two consecutive values, with a default of 1.
   </td>
  </tr>
</table>

Query:
```postgresql
SELECT *
FROM cypher('graph_name', $$
	RETURN range(0, 10), range(2, 18, 3)
$$) as (no_step agtype, step agtype);
```

Two lists of numbers in the given ranges are returned.

Result:
<table>
  <tr>
   <td>no_step
   </td>
   <td>step
   </td>
  </tr>
  <tr>
   <td>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</td>
   <td>[2, 5, 8, 11, 14, 17]</td>
  </tr>
  <tr>
   <td colspan="1" >1 row
   </td>
  </tr>
</table>

## labels

`labels` returns a list containing the string representations for all the labels of a node.

Syntax: `labels(vertex)`

Returns:
```
An agtype list containing string elements
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
   <td>vertex
   </td>
   <td>An expression that returns a single vertex.
   </td>
  </tr>
</table>

Considerations:
* `labels(null)` returns `null`.

Query:
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (a)
	WHERE a.name = 'Alice'
	RETURN labels(a)
$$) as (edges agtype);
```

A list containing all the labels of the node bound to `a` is returned.

Result:
<table>
  <tr>
   <td>edges
   </td>
  </tr>
  <tr>
   <td>["Person"]
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row
   </td>
  </tr>
</table>

## nodes

`nodes` returns a list containing all the vertices in a path.

Syntax: `nodes(path)`

Returns:
```
An agtype list containing vertex entities
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
   <td>path
   </td>
   <td>An expression that returns an agtype path.
   </td>
  </tr>
</table>

Considerations:
* `nodes(null)` returns `null`.

Query:
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH p = (a)-[]->(b)-[]->(c)
	WHERE a.name = 'Alice' AND c.name = 'Eskil'
	RETURN nodes(a)
$$) as (vertices agtype);
```

A list containing all the vertices in the path `p` is returned.

Result:
<table>
  <tr>
   <td>vertices
   </td>
  </tr>
  <tr>
   <td> [{"id": 844424930131969, "label": "Person", "properties": {"age": 38, "eyes": "brown", "name": "Alice"}}::vertex, {"id": 844424930131970, "label": "Person", "properties": {"age": 25, "eyes": "blue", "name": "Bob"}}::vertex, {"id": 844424930131973, "label": "Person", "properties": {"age": 41, "eyes": "blue", "name": "Eskil", "array": ["one", "two", "three"]}}::vertex]
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row
   </td>
  </tr>
</table>

## relationships

`relationships()` returns a list containing all the relationships in a path.

Syntax: `relationships(path)`

Returns:
```
An agtype list containing edge entities
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
   <td>path
   </td>
   <td>An expression that returns an agtype path.
   </td>
  </tr>
</table>

Considerations:
* `relationships(null)` returns `null`.

Query:
```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH p = (a)-[]->(b)-[]->(c)
	WHERE a.name = 'Alice' AND c.name = 'Eskil'
	RETURN relationships(p)
$$) as (edges agtype);
```

A list containing all the edges in the path `p` is returned.

Result:
<table>
  <tr>
   <td>edges
   </td>
  </tr>
  <tr>
   <td>[{"id": 1125899906842640, "label": "KNOWS", "end_id": 844424930131989, "start_id": 844424930131988, "properties": {}}::edge, {"id": 1125899906842644, "label": "KNOWS", "end_id": 844424930131992, "start_id": 844424930131989, "properties": {}}::edge]
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row
   </td>
  </tr>
</table>

## toBooleanList
`toBooleanList()` converts a list of values and returns a list of boolean values. If any values are not convertible to boolean they will be null in the list returned.

Syntax: `toBooleanList(list)`

Returns:
```
An agtype list containing the converted elements; depending on the input value a converted value is either a boolean value or null.
```

Considerations:
* Any null element in list is preserved.
* Any boolean value in list is preserved.
* If the list is null, null will be returned.
* If the list is not a list, an error will be returned.

Query:
```postgresql
SELECT * FROM cypher('expr', $$
    RETURN toBooleanList(["true", "false", "true"])
$$) AS (toBooleanList agtype);
```

Result:
<table>
  <tr>
   <td>tobooleanlist
   </td>
  </tr>
  <tr>
   <td> [true, false, true]
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row
   </td>
  </tr>
</table>
