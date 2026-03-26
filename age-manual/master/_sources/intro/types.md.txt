# Data Types - An Introduction to agtype

AGE uses a custom data type called agtype, which is the only data type returned by AGE. Agtype is a superset of Json and a custom implementation of JsonB.


## Simple Data Types


### Null

In Cypher, `null` is used to represent missing or undefined values. Conceptually, `null` means 'a missing unknown value' and it is treated somewhat differently from other values. For example getting a property from a vertex that does not have said property produces `null`. Most expressions that take `null` as input will produce `null`. This includes boolean expressions that are used as predicates in the `WHERE` clause. In this case, anything that is not true is interpreted as being false. `null` is not equal to `null`. Not knowing two values does not imply that they are the same value. So the expression `null = null` yields `null` and not true.

Input/Output Format

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN NULL
$$) AS (null_result agtype);
```


A null will appear as an empty space.

Result:


<table>
  <tr>
   <td>null_result
   </td>
  </tr>
  <tr>
   <td>
    <br>
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Agtype NULL vs Postgres NULL

The concept of `NULL` in Agtype and Postgres is the same as it is in Cypher.

### Integer

The integer type stores whole numbers, i.e. numbers without fractional components. Integer data type is a 64-bit field that stores values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807. Attempts to store values outside this range will result in an error.

The type integer is the common choice, as it offers the best balance between range, storage size, and performance. The `smallint` type is generally used only if disk space is at a premium. The `bigint` type is designed to be used when the range of the integer type is insufficient.

Input/Output Format

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN 1
$$) AS (int_result agtype);
```


Result:


<table>
  <tr>
   <td>int_result
   </td>
  </tr>
  <tr>
   <td>1
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



### Float

The data type `float` is an inexact, variable-precision numeric type, conforming to the IEEE-754 Standard. 

Inexact means that some values cannot be converted exactly to the internal format and are stored as approximations, so that storing and retrieving a value might show slight discrepancies. Managing these errors and how they propagate through calculations is the subject of an entire branch of mathematics and computer science and will not be discussed here, except for the following points:


* If you require exact storage and calculations (such as for monetary amounts), use the numeric type instead.

* If you want to do complicated calculations with these types for anything important, especially if you rely on certain behavior in boundary cases (infinity, underflow), you should evaluate the implementation carefully.

* Comparing two floating-point values for equality might not always work as expected.


Values that are too large or too small will cause an error. Rounding might take place if the precision of an input number is too high. Numbers too close to zero that are not representable as distinct from zero will cause an underflow error.

In addition to ordinary numeric values, the floating-point types have several special values:
* Infinity
* -Infinity
* NaN

These represent the IEEE 754 special values “infinity”, “negative infinity”, and “not-a-number”, respectively. When writing these values as constants in a Cypher command, you must put quotes around them and typecast them, for example 
```
SET x.float_value = '-Infinity'::float
```
On input, these strings are recognized in a case-insensitive manner.

_Note
IEEE754 specifies that NaN should not compare equal to any other floating-point value (including NaN). However, in order to allow floats to be sorted correctly, AGE evaluates 'NaN'::float = 'NaN'::float to true. See the section Comparability and Equality for more details._

<!-- changed 'NaN':float to Nan::float -->

Input/Output Format:

To use a float, denote a decimal value.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN 1.0
$$) AS (float_result agtype);
```


Result:


<table>
  <tr>
   <td>float_result
   </td>
  </tr>
  <tr>
   <td>1.0
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



### Numeric 

The type `numeric` can store numbers with a very large number of digits. It is especially recommended for storing monetary amounts and other quantities where exactness is required. Calculations with numeric values yield exact results where possible, e.g., addition, subtraction, multiplication. However, calculations on numeric values are very slow compared to the integer types, or to the floating-point type.

We use the following terms below: The _precision_ of a numeric is the total count of significant digits in the whole number, that is, the number of digits to both sides of the decimal point. The _scale_ of a numeric is the count of decimal digits in the fractional part, to the right of the decimal point. So the number 23.5141 has a precision of 6 and a scale of 4. Integers can be considered to have a scale of zero.

Without any precision or scale creates a column in which numeric values of any precision and scale can be stored, up to the implementation limit on precision. <!-- fix above sentence --> A column of this kind will not coerce input values to any particular scale, whereas numeric columns with a declared scale will coerce input values to that scale. (The SQL standard requires a default scale of 0, i.e., coercion to integer precision. We find this a bit useless. If you're concerned about portability, always specify the precision and scale explicitly.)


```
_Note
The maximum allowed precision when explicitly specified in the type declaration is 1000; NUMERIC without a specified precision is subject to the limits described in Table 8.2._

```

If the scale of a value to be stored is greater than the declared scale of the column, the system will round the value to the specified number of fractional digits. Then, if the number of digits to the left of the decimal point exceeds the declared precision minus the declared scale, an error is raised.

Numeric values are physically stored without any extra leading or trailing zeroes. Thus, the declared precision and scale of a column are maximums, not fixed allocations. (In this sense the numeric type is more akin to `varchar(n)` than to `char(n)`.) The actual storage requirement is two bytes for each group of four decimal digits, plus three to eight bytes overhead.

In addition to ordinary numeric values, the numeric type allows the special value NaN, meaning “not-a-number”. Any operation on NaN yields another NaN. When writing this value as a constant in an SQL command, you must put quotes around it, for example UPDATE table SET x = 'NaN'. 



```
_Note
In most implementations of the "not-a-number" concept, NaN is considered not equal to any other numeric value (including NaN). However, in order to allow floats to be sorted correctly, AGE evaluates 'NaN'::numeric = 'NaN':numeric to true. See the section Comparability and Equality for more details._

```

When rounding values, the numeric type rounds ties away from zero, while (on most machines) the real and double precision types round ties to the nearest even number. For example:

Input/Output Format:

When creating a numeric data type, the `::numeric` data annotation is required.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN 1.0::numeric
$$) AS (numeric_result agtype);
```


Result:


<table>
  <tr>
   <td>numeric_result
   </td>
  </tr>
  <tr>
   <td>1.0::numeric
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Bool 

AGE provides the standard Cypher type boolean. The boolean type can have several states: “true”, “false”, and a third state, “unknown”, which is represented by the Agtype null value.

Boolean constants can be represented in Cypher queries by the keywords `TRUE`, `FALSE`, and `NULL`.

Input/Output Format

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN TRUE
$$) AS (boolean_result agtype);
```


Unlike Postgres, AGE’s boolean outputs as the full word, ie. true and false as opposed to t and f.

Result:


<table>
  <tr>
   <td>boolean_result
   </td>
  </tr>
  <tr>
   <td>true
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



### String

Agtype strings String literals can contain the following escape sequences:


<table>
  <tr>
   <td>Escape Sequence
   </td>
   <td>Character
   </td>
  </tr>
  <tr>
   <td>\t
   </td>
   <td>Tab
   </td>
  </tr>
  <tr>
   <td>\b
   </td>
   <td>Backspace
   </td>
  </tr>
  <tr>
   <td>\n
   </td>
   <td>Newline
   </td>
  </tr>
  <tr>
   <td>\r
   </td>
   <td>Carriage Return
   </td>
  </tr>
  <tr>
   <td>\f
   </td>
   <td>Form Feed
   </td>
  </tr>
  <tr>
   <td>\’
   </td>
   <td>Single Quote
   </td>
  </tr>
  <tr>
   <td>\”
   </td>
   <td>Double Quote
   </td>
  </tr>
  <tr>
   <td>\\
   </td>
   <td>Backslash
   </td>
  </tr>
  <tr>
   <td>\uXXXX
   </td>
   <td>Unicode UTF-16 code point (4 hex digits must follow the \u)
   </td>
  </tr>
</table>


Input/Output Format

Use single (‘) quotes to identify a string. The output will use double (“) quotes.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN 'This is a string'
$$) AS (string_result agtype);
```


Result:


<table>
  <tr>
   <td>string_result
   </td>
  </tr>
  <tr>
   <td>“This is a string”
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Composite Data Types


### List

All examples will use the [`WITH`](../clauses/with.md) clause and [`RETURN`](../clauses/return.md) clause.


#### Lists in general

A literal list is created by using brackets and separating the elements in the list with commas.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst
$$) AS (lst agtype);
```


Result:


<table>
  <tr>
   <td>lst
   </td>
  </tr>
  <tr>
   <td>[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### NULL in a List

A list can hold the value `null`, unlike when a `null` is an independent value, it will appear as the word ‘null’ in a list

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [null] as lst
    RETURN lst
$$) AS (lst agtype);
```


Result:


<table>
  <tr>
   <td>lst
   </td>
  </tr>
  <tr>
   <td>[null]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Access Individual Elements

To access individual elements in the list, we use the square brackets again. This will extract from the start index and up to but not including the end index.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[3]
$$) AS (element agtype);
```


Result:


<table>
  <tr>
   <td>element
   </td>
  </tr>
  <tr>
   <td>3
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Map Elements in Lists

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
   WITH [0, {key: 'key_value'}, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst
$$) AS (map_value agtype);
```


Result:


<table>
  <tr>
   <td>map_value
   </td>
  </tr>
  <tr>
   <td>[0, {"key": "key_value"}, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Accessing Map Elements in Lists

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
   WITH [0, {key: 'key_value'}, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[1].key
$$) AS (map_value agtype);
```


Result:


<table>
  <tr>
   <td>map_value
   </td>
  </tr>
  <tr>
   <td>“key_value”
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Negative Index Access

You can also use negative numbers, to start from the end of the list instead.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[-3]
$$) AS (element agtype);
```


Result:


<table>
  <tr>
   <td>element
   </td>
  </tr>
  <tr>
   <td>8
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Index Ranges

Finally, you can use ranges inside the brackets to return ranges of the list.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[0..3]
$$) AS (element agtype);
```


Result:


<table>
  <tr>
   <td>element
   </td>
  </tr>
  <tr>
   <td>[0, 1, 2]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Negative Index Ranges

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[0..-5]
$$) AS (lst agtype);
```


Result:


<table>
  <tr>
   <td>lst
   </td>
  </tr>
  <tr>
   <td>[0, 1, 2, 3, 4, 5]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Positive Slices

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[..4]
$$) AS (lst agtype);
```


Result:


<table>
  <tr>
   <td>lst
   </td>
  </tr>
  <tr>
   <td>[0, 1, 2, 3]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Negative Slices

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[-5..]
$$) AS (lst agtype);
```


Result:


<table>
  <tr>
   <td>lst
   </td>
  </tr>
  <tr>
   <td>[6, 7, 8, 9, 10]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>


Out-of-bound slices are simply truncated, but out-of-bound single elements return null.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[15]
$$) AS (element agtype);
```


Result:


<table>
  <tr>
   <td>element
   </td>
  </tr>
  <tr>
   <td>
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>


Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as lst
    RETURN lst[5..15]
$$) AS (element agtype);
```


Result:


<table>
  <tr>
   <td>element
   </td>
  </tr>
  <tr>
   <td>[5, 6, 7, 8, 9, 10]
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



### Map

Maps can be constructed using Cypher.


#### Literal Maps with Simple Data Types

You can construct a simple map with simple agtypes

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH {int_key: 1, float_key: 1.0, numeric_key: 1::numeric, bool_key: true, string_key: 'Value'} as m
    RETURN m
$$) AS (m agtype);
```


Result:


<table>
  <tr>
   <td>m
   </td>
  </tr>
  <tr>
   <td>{"int_key": 1, "bool_key": true, "float_key": 1.0, "string_key": "Value", "numeric_key": 1::numeric}
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Literal Maps with Composite Data Types

A map can also contain Composite Data Types, i.e. lists and other maps.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH {listKey: [{inner: 'Map1'}, {inner: 'Map2'}], mapKey: {i: 0}} as m
    RETURN m
$$) AS (m agtype);
```


Result:


<table>
  <tr>
   <td>m
   </td>
  </tr>
  <tr>
   <td>{"mapKey": {"i": 0}, "listKey": [{"inner": "Map1"}, {"inner": "Map2"}]}
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Property Access of a map

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH {int_key: 1, float_key: 1.0, numeric_key: 1::numeric, bool_key: true, string_key: 'Value'} as m
    RETURN m.int_key
$$) AS (int_key agtype);
```


Result:


<table>
  <tr>
   <td>int_key
   </td>
  </tr>
  <tr>
   <td>1
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



#### Accessing List Elements in Maps

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    WITH {listKey: [{inner: 'Map1'}, {inner: 'Map2'}], mapKey: {i: 0}} as m
    RETURN m.listKey[0]
$$) AS (m agtype);
```


Result:


<table>
  <tr>
   <td>m
   </td>
  </tr>
  <tr>
   <td>{"inner": "Map1"}
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Simple Entities

An entity has a unique, comparable identity which defines whether or not two entities are equal.

An entity is assigned a set of properties, each of which are uniquely identified in the set by the irrespective property keys.


### GraphId

Simple entities are assigned a unique graphid. A graphid is a unique composition of the entity's label id and a unique sequence assigned to each label. Note that there will be overlap in ids when comparing entities from different graphs.


### Labels

A label is an identifier that classifies vertices and edges into certain categories.



* Edges are required to have a label, but vertices do not. 
* The names of labels between vertices and edges cannot overlap. 

See [CREATE](../clauses/create.md) clause for information about how to make entities with labels.


### Properties

Both vertices and edges may have properties. Properties are attribute values, and each attribute name should be defined only as a string type. 


## Vertex



* A vertex is the basic entity of the graph, with the unique attribute of being able to exist in and ofitself.
* A vertex may be assigned a label.
* A vertex  may have zero or more outgoing edges.
* A vertex may have zero or more incoming edges.

Data Format:


<table>
  <tr>
   <td><strong>Attribute Name</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Id
   </td>
   <td>graphid for this vertex
   </td>
  </tr>
  <tr>
   <td>label
   </td>
   <td>Name of the label this vertex has
   </td>
  </tr>
  <tr>
   <td>properties
   </td>
   <td>Properties associated with this vertex
   </td>
  </tr>
</table>



```
{id:1; label: 'label_name'; properties: {prop1: value1, prop2: value2}}::vertex
```



### Type Casting a Map to a Vertex

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	WITH {id: 0, label: "label_name", properties: {i: 0}}::vertex as v
	RETURN v
$$) AS (v agtype);
```


Result:
<table>
  <tr>
   <td>v
   </td>
  </tr>
  <tr>
   <td>{"id": 0, "label": "label_name", "properties": {"i": 0}}::vertex
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>





## Edge

An edge is an entity that encodes a directed connection between exactly two nodes, the source node and the target node. An outgoing edge is a directed relationship from the point of view of its source node. An incoming edge is a directed relationship from the point of view of its target node. An edge is assigned exactly one edge type.

Data Format


<table>
  <tr>
   <td><strong>Attribute Name</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>graphid for this edge
   </td>
  </tr>
  <tr>
   <td>startid
   </td>
   <td>graphid for the source node
   </td>
  </tr>
  <tr>
   <td>endid
   </td>
   <td>graphid for the target node
   </td>
  </tr>
  <tr>
   <td>label
   </td>
   <td>Name of the label this edge has
   </td>
  </tr>
  <tr>
   <td>properties
   </td>
   <td>Properties associated with this edge 
   </td>
  </tr>
</table>


Output:


```
{id: 3; startid: 1; endid: 2; label: 'edge_label' properties{prop1: value1, prop2: value2}}::edge
```



### Type Casting a Map to an Edge

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	WITH {id: 2, start_id: 0, end_id: 1, label: "label_name", properties: {i: 0}}::edge as e
	RETURN e
$$) AS (e agtype);
```


Result:


<table>
  <tr>
   <td>v
   </td>
  </tr>
  <tr>
   <td>{"id": 2, "label": "label_name", "end_id": 1, "start_id": 0, "properties": {"i": 0}}::edge
   </td>
  </tr>
  <tr>
   <td>(1 row)
   </td>
  </tr>
</table>



## Composite Entities


### Path

A path is a series of alternating vertices and edges. A path must start with a vertex, and have at least one edge.


#### Type Casting a List to a Path

Query

```postgresql
SELECT *
FROM cypher('graph_name', $$
	WITH [{id: 0, label: "label_name_1", properties: {i: 0}}::vertex,
            {id: 2, start_id: 0, end_id: 1, label: "edge_label", properties: {i: 0}}::edge,
           {id: 1, label: "label_name_2", properties: {}}::vertex
           ]::path as p
	RETURN p
$$) AS (p agtype);
```


The result is formatted to improve readability

Result:

<table>
   <tr>
      <td>p
      </td>
   </tr>
   <tr>
      <td>[{"id": 0, "label": "label_name_1", "properties": {"i": 0}}::vertex, {"id": 2, "label": "edge_label", "end_id": 1, "start_id": 0, "properties": {"i": 0}}::edge, <br> {"id": 1, "label": "label_name_2", "properties": {}}::vertex]::path
      </td>
   </tr>
   <tr>
      <td>(1 row)
      </td>
   </tr>
</table>


