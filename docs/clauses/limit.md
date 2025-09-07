# LIMIT

`LIMIT` constrains the number of records in the output.

## Introduction

`LIMIT` accepts any expression that evaluates to a positive integer.


## Return a subset of the rows

To return a subset of the result, starting from the top, use the following syntax:

Query


```postgresql
SELECT * 
FROM cypher('graph_name', $$
	MATCH (n) RETURN n.name
	ORDER BY n.name
	LIMIT 3
$$) as (names agtype);
```


The name property of the matched node `n` is returned, with a limit of 3.

Result


<table>
  <thead>
   <td><strong>names</strong>
   </td>
  <thead>
  <tr>
   <td>"A"
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
  </tr>
  <tr>
   <td>3 rows
   </td>
  </tr>
</table>

## Using an expression with LIMIT to return a subset of the rows

`LIMIT` accepts any expression that evaluates to a positive integer as long as it is not referring to any external variables:

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n)
	RETURN n.name
	ORDER BY n.name
	LIMIT toInteger(3 * rand()) + 1
$$) as (names agtype);

```

Returns one to three top items.

Result


<table>
  <thead>
   <td><strong>names</strong>
   </td>
  <thead>
  <tr>
   <td>"A"
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
  </tr>
  <tr>
   <td>2 rows
   </td>
  </tr>
</table>
