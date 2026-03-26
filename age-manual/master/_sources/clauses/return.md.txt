# RETURN  

In the `RETURN` part of your query, you define which parts of the pattern you want to output. Output can include agtype values, nodes, relationships, or properties.


## Return nodes

To return a node, list it in the `RETURN` statement.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'B'})
    RETURN n
$$) as (n agtype);
```


The example will return the node.

Result


<table>
  <tr>
   <td><strong>n</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 0; label: ‘’ properties: {name: ‘B’}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Return edges

To return `n`'s edges, just include it in the `RETURN` list.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)-[r:KNOWS]->()
    WHERE n.name = 'A'
    RETURN r
$$) as (r agtype);
```


The relationship is returned by the example.


<table>
  <tr>
   <td><strong>r</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 2; startid: 0; endid: 1; label: ‘KNOWS’ properties: {}}::edge
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Return property

To return a property, use the dot separator, as follows:

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'A'})
    RETURN n.name
$$) as (name agtype);
```


The value of the property name gets returned.

Result


<table>
  <tr>
   <td><strong>name</strong>
   </td>
  </tr>
  <tr>
   <td>‘A’
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>


## Return all elements

When you want to return all vertices, edges and paths found in a query, you can use the `*` symbol.

Query

```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (a {name: 'A'})-[r]->(b)
	RETURN *
$$) as (a agtype, b agtype, r agtype);
```


This returns the two vertices, and the edge used in the query.

Result
<table>
  <thead>
  <tr>
   <td><strong>a</strong></td>
   <td><strong>b</strong></td>
   <td><strong>r</strong></td>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>{"id": 281474976710659, "label": "", "properties": {"age": 55, "name": "A", "happy": "Yes!"}}::vertex 
   </td>
   <td>
{"id": 1125899906842625, "label": "BLOCKS", "end_id": 281474976710660, "start_id": 281474976710659, "properties": {}}::edge
   </td>
   <td>
{"id": 281474976710660, "label": "", "properties": {"name": "B"}}::vertex
   </td>
  </tr>
  <tr>
   <td>{"id": 281474976710659, "label": "", "properties": {"age": 55, "name": "A", "happy": "Yes!"}}::vertex 
   </td>
   <td>
{"id": 1407374883553281, "label": "KNOWS", "end_id": 281474976710660, "start_id": 281474976710659, "properties": {}}::edge
   </td>
   <td>
{"id": 281474976710660, "label": "", "properties": {"name": "B"}}::vertex
   </td>
  </tr>
  <tbody>
   <td colspan="3">(2 rows)
   </td>
  </tr>
</table>

## Variable with uncommon characters

To introduce a placeholder that is made up of characters that are not contained in the English alphabet, you can use the ` to enclose the variable, like this:

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (`This isn\'t a common variable`)
    WHERE `This isn\'t a common variable`.name = 'A'
    RETURN `This isn\'t a common variable`.happy
$$) as (happy agtype);
```


The node with name "A" is returned.

Result


<table>
  <tr>
   <td><strong>happy</strong>
   </td>
  </tr>
  <tr>
   <td>"Yes!"
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Aliasing a field

If the name of the field should be different from the expression used, you can rename it by changing the name in the column list definition.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n {name: 'A'})
    RETURN n.name
$$) as (objects_name agtype);
```


Returns the age property of a node, but renames the field.

Result


<table>
  <tr>
   <td><strong>objects_name</strong>
   </td>
  </tr>
  <tr>
   <td>‘A’
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Optional properties

If a property might or might not be there, it will be treated as null if it is missing.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)
    RETURN n.age
$$) as (age agtype);
```


This query returns the property if it exists, or null if the property does not exist.

Result


<table>
  <tr>
   <td><strong>age</strong>
   </td>
  </tr>
  <tr>
   <td>55
   </td>
  </tr>
  <tr>
   <td>NULL
   </td>
  </tr>
  <tr>
   <td>(2 rows)
   </td>
  </tr>
</table>



## Other expressions

Any expression can be used as a return item—literals, predicates, properties, functions, and everything else.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (a)
    RETURN a.age > 30, 'I'm a literal', id(a)
$$) as (older_than_30 agtype, literal agtype, id agtype);
```


Returns a predicate, a literal and function call with a pattern expression parameter.

Result


<table>
  <tr>
   <td><strong>older_than_30</strong>
   </td>
   <td><strong>literal</strong>
   </td>
   <td><strong>id</strong>
   </td>
  </tr>
  <tr>
   <td>true
   </td>
   <td>‘I’m a literal’
   </td>
   <td>1
   </td>
  </tr>
  <tr>
   <td colspan="3" >(1 row)
   </td>
  </tr>
</table>



## Unique results

`DISTINCT` retrieves only unique records depending on the fields that have been selected to output.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
MATCH (a {name: 'A'})-[]->(b)
RETURN DISTINCT b
$$) as (b agtype);
```


The node named "B" is returned by the query, but only once.

Result


<table>
  <tr>
   <td><strong>b</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 1; label: ‘’ properties: {name: ‘B’}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>

