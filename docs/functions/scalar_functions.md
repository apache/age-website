# Scalar Functions 


## id

`id()` returns the id of a vertex or edge.

Syntax: `id(expression)`

Returns:


```
An agtype integer
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
   <td>expression
   </td>
   <td>An expression that returns a vertex or edge.
   </td>
  </tr>
</table>


Considerations:

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (a)
    RETURN id(a)
$$) as (id agtype);
```


Results


<table>
  <tr>
   <td>id
   </td>
  </tr>
  <tr>
   <td>0
   </td>
  </tr>
  <tr>
   <td>1
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>3
   </td>
  </tr>
  <tr>
   <td>4 row(s) returned
   </td>
  </tr>
</table>



## start_id

`start_id()` returns the id of the vertex that is the starting vertex for the edge.

Syntax: `start_id(expression)`

Returns:


```
An agtype integer
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
   <td>expression
   </td>
   <td>An expression that evaluates to an edge.
   </td>
  </tr>
</table>


Considerations:

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH ()-[e]->()
    RETURN start_id(e)
$$) as (start_id agtype);
```


Results


<table>
  <tr>
   <td>start_id
   </td>
  </tr>
  <tr>
   <td>0
   </td>
  </tr>
  <tr>
   <td>1
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>3
   </td>
  </tr>
  <tr>
   <td>4 row(s) returned
   </td>
  </tr>
</table>



## end_id

`end_id()` returns the id of the vertex that is the ending vertex for the edge.

Syntax: `end_id(expression)`

Returns:


```
An agtype integer
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
   <td>expression
   </td>
   <td>An expression that evaluates to an edge.
   </td>
  </tr>
</table>


Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH ()-[e]->()
    RETURN end_id(e)
$$) as (end_id agtype);
```


Results


<table>
  <tr>
   <td>end_id
   </td>
  </tr>
  <tr>
   <td>4
   </td>
  </tr>
  <tr>
   <td>5
   </td>
  </tr>
  <tr>
   <td>6
   </td>
  </tr>
  <tr>
   <td>7
   </td>
  </tr>
  <tr>
   <td>4 row(s) returned
   </td>
  </tr>
</table>



## type

`type()` returns the string representation of the edge type.

Syntax: `type(edge)`

Returns:


```
An agtype string
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
   <td>edge
   </td>
   <td>An expression that evaluates to an edge.
   </td>
  </tr>
</table>


Considerations:

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH ()-[e]->()
    RETURN type(e)
$$) as (type agtype);
```


Results


<table>
  <tr>
   <td>type
   </td>
  </tr>
  <tr>
   <td>“KNOWS”
   </td>
  </tr>
  <tr>
   <td>“KNOWS”
   </td>
  </tr>
  <tr>
   <td>2 row(s) returned
   </td>
  </tr>
</table>



## properties

Returns an agtype map containing all the properties of a vertex or edge. If the argument is already a map, it is returned unchanged.

Syntax: `properties(expression)`

Returns:


```
An agtype map.
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
      <td>Expression
      </td>
      <td>An expression that returns a vertex, an edge, or an agtype map.
      </td>
   </tr>
</table>

Considerations: 

* `properties(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    CREATE (p:Person {name: 'Stefan', city: 'Berlin'})
    RETURN properties(p)
$$) as (type agtype);
```


Results:


<table>
  <tr>
   <td><strong>properties</strong>
   </td>
  </tr>
  <tr>
   <td>{name: "Stefan"; city: "Berlin"}
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## head

returns the first element in an agtype list.

Syntax: `head(list)`

Returns:


```
The type of the value returned will be that of the first element of the list.
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
   <td>List
   </td>
   <td>An expression that returns a list
   </td>
  </tr>
</table>


Considerations:



* `head(null)` returns `null`.
* If the first element in the list is `null`, `head(list)` will return `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
   MATCH (a)
   WHERE a.name = 'Eskil'
   RETURN a.array, head(a.array)
$$) as (lst agtype, lst_head agtype);
```


The first element in the list is returned.

Result:


<table>
  <tr>
   <td>lst
   </td>
   <td>lst_head
   </td>
  </tr>
  <tr>
   <td>["one","two","three"]
   </td>
   <td>"one"
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## last

returns the last element in an agtype list.

Syntax: `last(list)`

Returns:


```
The type of the value returned will be that of the last element of the list.
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
   <td>List
   </td>
   <td>An expression that returns a list
   </td>
  </tr>
</table>


Considerations:



* `tail(null)` returns `null`.
* If the last element in the list is `null`, `last(list)` will return `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
MATCH (a)
WHERE a.name = 'Eskil'
RETURN a.array, last(a.array)
$$) as (lst agtype, lst_tail agtype);
```


The first element in the list is returned.

Result:


<table>
  <tr>
   <td>lst
   </td>
   <td>lst_tail
   </td>
  </tr>
  <tr>
   <td>["one","two","three"]
   </td>
   <td>"three"
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## length

`length()` returns the length of a path.

Syntax: `length(path)`

Returns:


```
An agtype integer.
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
   <td>An expression that returns a path.
   </td>
  </tr>
</table>


Considerations: `length(null)` returns `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
   MATCH p = (a)-[]->(b)-[]->(c)
   WHERE a.name = 'Alice'
   RETURN length(p)
$$) as (length_of_path agtype);
```


The length of the path `p` is returned.

Results:


<table>
  <tr>
   <td>length_of_path
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>3 row(s) returned
   </td>
  </tr>
</table>



## size

`size()` returns the length of a list.

Syntax: `size(list)`

Returns:


```
An agtype integer.
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
   <td>list
   </td>
   <td>An expression that returns a list.
   </td>
  </tr>
</table>


Considerations:



* `size(null)` returns `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN size(['Alice', 'Bob'])
$$) as (size_of_list agtype);
```


The length of the path `p` is returned.

Results:


<table>
  <tr>
   <td>size_of_list
   </td>
  </tr>
  <tr>
   <td>2
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## startNode

`startNode()` returns the start node of an edge.

Syntax: `startNode(edge)`

Returns:


```
A vertex.
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
   <td>edge
   </td>
   <td>An expression that returns an edge.
   </td>
  </tr>
</table>


Considerations:



* `startNode(null)` returns `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (x:Developer)-[r]-()
    RETURN startNode(r)
$$) as (v agtype);
```


Result


<table>
  <tr>
   <td>v
   </td>
  </tr>
  <tr>
   <td>Node[0]{name:"Alice",age:38,eyes:"brown"}
   </td>
  </tr>
  <tr>
   <td>Node[0]{name:"Alice",age:38,eyes:"brown"}
   </td>
  </tr>
  <tr>
   <td>2 row(s) returned
   </td>
  </tr>
</table>



## endNode

`endNode()` returns the start node of an edge.

Syntax: `endNode(edge)`

Returns:


```
A vertex.
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
   <td>edge
   </td>
   <td>An expression that returns an edge.
   </td>
  </tr>
</table>


Considerations:



* `endNode(null)` returns `null`.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (x:Developer)-[r]-()
    RETURN endNode(r)
$$) as (v agtype);
```


Result


<table>
  <tr>
   <td>v
   </td>
  </tr>
  <tr>
   <td>Node[2]{name:"Charlie",age:53,eyes:"green"}
   </td>
  </tr>
  <tr>
   <td>Node[1]{name:"Bob",age:25,eyes:"blue"}
   </td>
  </tr>
  <tr>
   <td>2 row(s) returned
   </td>
  </tr>
</table>



## timestamp

`timestamp()` returns the difference, measured in milliseconds, between the current time and midnight, January 1, 1970 UTC.

Syntax: `timestamp()`

Returns:


```
An agtype integer.
```


Considerations:



* `timestamp()` will return the same value during one entire query, even for long-running queries.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN timestamp()
$$) as (t agtype);
```


The time in milliseconds is returned.

Results:


<table>
  <tr>
   <td><strong>t</strong>
   </td>
  </tr>
  <tr>
   <td>1613496720760
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## toBoolean

`toBoolean()` converts a string value to a boolean value.

Syntax: `toBoolean(expression)`

Returns:


```
An agtype boolean.
```


Arguments:


<table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression that returns a boolean or string value.
   </td>
  </tr>
</table>


Considerations:



* `toBoolean(null)` returns `null`.
* If expression is a boolean value, it will be returned unchanged.
* If the parsing fails, `null` will be returned.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN toBoolean('TRUE'), toBoolean('not a boolean')
$$) as (a_bool agtype, not_a_bool agtype);
```


Result:


<table>
  <tr>
   <td><strong>a_bool</strong>
   </td>
   <td><strong>not_a_bool</strong>
   </td>
  </tr>
  <tr>
   <td>true
   </td>
   <td>NULL
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## toFloat

`toFloat()` converts an integer or string value to a floating point number.

Syntax: `toFloat(expression)`

Returns:


```
A float.
```


<table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression that returns an agtype number or agtype string value.
   </td>
  </tr>
</table>


Considerations:



* `toFloat(null)` returns `null`.
* If expression is a floating point number, it will be returned unchanged.
* If the parsing fails, `null` will be returned.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN toFloat('11.5'), toFloat('not a number')
$$) as (a_float agtype, not_a_float agtype);
```


Result:


<table>
  <tr>
   <td>a_float
   </td>
   <td>not_a_float
   </td>
  </tr>
  <tr>
   <td>11.5
   </td>
   <td>NULL
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## toInteger

`toInteger()` converts a floating point or string value to an integer value.

Syntax: `toInteger(expression)`

Returns:


```
An agtype integer.
```


Arguments


<table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>expression
   </td>
   <td>An expression that returns an agtype number or agtype string value.
   </td>
  </tr>
</table>


Considerations:



* `toInteger(null)` returns `null`.
* If expression is an integer value, it will be returned unchanged.
* If the parsing fails, `null` will be returned.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
     RETURN toInteger('42'), toInteger('not a number')
$$) as (an_integer agtype, not_an_integer agtype);
```


Result:


<table>
  <tr>
   <td>an_integer
   </td>
   <td>not_an_integer
   </td>
  </tr>
  <tr>
   <td>42
   </td>
   <td>NULL
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## coalesce

`coalesce()` returns the first non-null value in the given list of expressions.

Syntax:`coalesce(expression [, expression]*)`

Returns:


```
The type of the value returned will be that of the first non-null expression.
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
   <td>expression
   </td>
   <td>An expression which may return null.
   </td>
  </tr>
</table>


Considerations:



* `null` will be returned if all the arguments are null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
MATCH (a)
WHERE a.name = 'Alice'
RETURN coalesce(a.hairColor, a.eyes), a.hair_color, a.eyes
$$) as (color agtype, hair_color agtype, eyes agtype);
```

Result


<table>
  <tr>
   <td>color
   </td>
   <td>hair_color
   </td>
   <td>eyes
   </td>
  </tr>
  <tr>
   <td>“brown”
   </td>
   <td>NULL
   </td>
   <td>“Brown”
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row(s) returned
   </td>
  </tr>
</table>


