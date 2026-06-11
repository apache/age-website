# Operators

## String Specific Comparison Operators

### Data Setup

```postgresql
SELECT * FROM cypher('graph_name', $$
CREATE (:Person {name: 'John'}),
       (:Person {name: 'Jeff'}),
       (:Person {name: 'Joan'}),
       (:Person {name: 'Bill'})
$$) AS (result agtype);
```

### Starts With

Performs case-sensitive prefix searching on strings.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name STARTS WITH "J"
	RETURN v.name
$$) AS (names agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td>"Jeff"</td>
  </tr>
  <tr>
   <td>"Joan"</td>
  </tr>
  <tr>
   <td colspan="1">3 rows</td>
  </tr>
</table>

### Contains

Performs case-sensitive inclusion searching in strings.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name CONTAINS "o"
	RETURN v.name
$$) AS (names agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John</td>
  </tr>
  <tr>
   <td>"Joan</td>
  </tr>
  <tr>
   <td colspan="1">2 rows</td>
  </tr>
</table>


### Ends With

Performs case-sensitive suffix searching on strings.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name ENDS WITH "n"
	RETURN v.name
$$) AS (names agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td>"Joan"</td>
  </tr>
  <tr>
   <td colspan="1">2 rows</td>
  </tr>
</table>

### Regular Expressions

AGE supports the use of [POSIX regular expressions](https://www.postgresql.org/docs/11/functions-matching.html#FUNCTIONS-POSIX-REGEXP) using the `=~` operator. By default `=~` is case sensitve.


#### Basic String Matching

The `=~` operator when no special characters are given, act like the `=` operator.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ 'John'
	RETURN v.name
$$) AS (names agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td colspan="1">1 rows</td>
  </tr>
</table>

#### Case insensitive search

Adding `(?i)` at the beginning of the string will make the comparison case insensitive

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ '(?i)JoHn'
	RETURN v.name
$$) AS (names agtype);
```

<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td colspan="1">1 rows</td>
  </tr>
</table>


#### The . Wildcard

The . operator acts as a wildcard to match any single character.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ 'Jo.n'
	RETURN v.name
$$) AS (names agtype);
```

<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td>"Joan"</td>
  </tr>
  <tr>
   <td colspan="1">2 rows</td>
  </tr>
</table>

#### The * Wildcard

The * wildcard after a character will match to 0 or more of the previous character

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ 'Johz*n'
	RETURN v.name
$$) AS (names agtype);
```

<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td colspan="1">1 rows</td>
  </tr>
</table>


#### The + Operator

The + operator matches to 1 or more the previous character.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ 'Bil+'
	RETURN v.name
$$) AS (names agtype);
```

Results
<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"Bill"</td>
  </tr>
  <tr>
   <td colspan="1">1 row</td>
  </tr>
</table>

#### The . and * wildcards together

You can use the . and * wildcards together to represent the rest of a string.

```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (v:Person)
	WHERE v.name =~ 'J.*'
	RETURN v.name
$$) AS (names agtype);
```

<table>
  <thead>
  <tr>
   <td>names</td>
  </tr>
  </thead>
  <tr>
   <td>"John"</td>
  </tr>
  <tr>
   <td>"Jeff"</td>
  </tr>
  <tr>
   <td>"Joan"</td>
  </tr>
  <tr>
   <td colspan="1">2 rows</td>
  </tr>
</table>


## Operator Precedence

Operator precedence in AGE is shown below:


<table>
  <tr>
   <td>Precedence
   </td>
   <td>Operator
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>1
   </td>
   <td>.
   </td>
   <td>Property Access
   </td>
  </tr>
  <tr>
   <td rowspan="2" >2
   </td>
   <td>[]
   </td>
   <td>Map and List Subscripting
   </td>
  </tr>
  <tr>
   <td>()
   </td>
   <td>Function Call
   </td>
  </tr>
  <tr>
   <td rowspan="4" >3
   </td>
   <td>STARTS WITH
   </td>
   <td>Case-sensitive prefix searching on strings
   </td>
  </tr>
  <tr>
   <td>ENDS WITH
   </td>
   <td>Case-sensitive suffix searching on strings
   </td>
  </tr>
  <tr>
   <td>CONTAINS
   </td>
   <td>Case-sensitive inclusion searching on strings
   </td>
  </tr>
  <tr>
   <td>=~
   </td>
   <td>Regular expression string matching
   </td>
  </tr>
  <tr>
   <td>4
   </td>
   <td>-
   </td>
   <td>Unary Minus
   </td>
  </tr>
  <tr>
   <td rowspan="3" >5
   </td>
   <td>IN
   </td>
   <td>Checking if an element exists in a list
   </td>
  </tr>
  <tr>
   <td>IS NULL
   </td>
   <td>Checking a value is NULL
   </td>
  </tr>
  <tr>
   <td>IS NOT NULL
   </td>
   <td>Checking a value is not NULL
   </td>
  </tr>
  <tr>
   <td>6
   </td>
   <td>^
   </td>
   <td>Exponentiation
   </td>
  </tr>
  <tr>
   <td>7
   </td>
   <td>* / %
   </td>
   <td>Multiplication, division and remainder
   </td>
  </tr>
  <tr>
   <td>8
   </td>
   <td>+ -
   </td>
   <td>Addition and Subtraction
   </td>
  </tr>
  <tr>
   <td rowspan="3" >9
   </td>
   <td>= &lt;>
   </td>
   <td>For relational = and ≠ respectively
   </td>
  </tr>
  <tr>
   <td>&lt; &lt;=
   </td>
   <td>For relational &lt; and ≤ respectively
   </td>
  </tr>
  <tr>
   <td>> >=
   </td>
   <td>For relational > and ≥ respectively
   </td>
  </tr>
  <tr>
   <td>10
   </td>
   <td>NOT
   </td>
   <td>Logical NOT
   </td>
  </tr>
  <tr>
   <td>11
   </td>
   <td>AND
   </td>
   <td>Logical AND
   </td>
  </tr>
  <tr>
   <td>12
   </td>
   <td>OR
   </td>
   <td>Logical OR
   </td>
  </tr>
</table>



