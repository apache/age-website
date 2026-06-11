# SKIP

`SKIP` defines from which record to start including the records in the output.

## Introduction

By using `SKIP`, the result set will get trimmed from the top. Please note that no guarantees are made on the order of the returned results unless specified by the `ORDER BY` clause. `SKIP` accepts any expression that evaluates to a positive  integer.

## Skip first three rows

To return a subset of the result, starting from the top, use this syntax:

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n)
	RETURN n.name
	ORDER BY n.name
	SKIP 3
$$) as (names agtype);
```


The node is returned, and no property age exists on it.

Result


<table>
  <thead>
   <td><strong>names</strong>
   </td>
  <thead>
  <tr>
   <td>"D"
   </td>
  </tr>
  <tr>
   <td>"E"
   </td>
  </tr>
  <tr>
   <td>2 rows
   </td>
  </tr>
</table>

## Return middle two rows

To return a subset of the result, starting from somewhere in the middle, use this syntax:

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n)
	RETURN n.name
	ORDER BY n.name
	SKIP 1
	LIMIT 2
$$) as (names agtype);
```

Two vertices from the middle are returned.

Result


<table>
  <thead>
   <td><strong>names</strong>
   </td>
  <thead>
  <tr>
   <td>"B"
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
  </tr>
  <tr>
   <td>2 rows
   </td>
  </tr>
</table>

## Using an expression with SKIP to return a subset of the rows

Using an expression with `SKIP` to return a subset of the rows

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
	MATCH (n)
	RETURN n.name
	ORDER BY n.name
	SKIP (3 * rand())+ 1
$$) as (a agtype);
```

The first two vertices are skipped, and only the last three are returned in the result.

Result


<table>
  <thead>
   <td><strong>names</strong>
   </td>
  <thead>
  <tr>
   <td>"C"
   </td>
  </tr>
  <tr>
   <td>"D"
   </td>
  </tr>
  <tr>
   <td>"E"
   </td>
  </tr>
  <tr>
   <td>3 rows
   </td>
  </tr>
</table>
