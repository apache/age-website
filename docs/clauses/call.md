# CALL

The CALL clause is used to invoke a built-in or a user-defined function.

## CALL ... YIELD

The basic syntax for the CALL ... YIELD clause is as follows:

```postgresql
CALL functionName(arg1, arg2, ..., argn) YIELD functionName
```

Where `functionName` is the name of the stored or user-defined function to be called.
`arg1`, `arg2`, ..., `argn` are the arguments to be passed to the procedure or function.

Some examples of how to use the CALL clause:

## Call a Built-in Function

```postgresql
SELECT *
FROM cypher('graph_name', $$
    CALL toInteger('1') YIELD toInteger AS int
    RETURN int                        
$$) as (c agtype);
```

<table>
  <tr>
    <td><strong>c</strong></td>
  </tr>
  <tr>
    <td>1</td>
  </tr>
  <tr>
    <td>(1 row)</td>
  </tr>
</table>

This example calls the `toInteger()` built-in function to yield the string as an integer.

## Match then Call a Built-in Function

```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (v)
    CALL label(v) YIELD labels AS l_v
    CALL properties(v) YIELD properties AS p_v
    RETURN l_v, p_v
$$) as (labels agtype, props agtype);
```

<table>
  <tr>
    <td><strong>labels</strong></td>
    <td><strong>props</strong></td>
  </tr>
  <tr>
    <td>"Person"</td>
    <td>{"name": "Wes"}</td>
  </tr>
  <tr>
    <td>"Person"</td>
    <td>{"name": "Doe"}</td>
  </tr>
  <tr>
    <td>"Person"</td>
    <td>{"name": "Cruz"}</td>
  </tr>
  <tr>
    <td>(3 rows)</td>
  </tr>
</table>

This example calls the built-in functions `label()` & `properties()` to retrieve the labels & properties of the matched vertices.

## Calling a User-Defined Function

```postgresql
CALL myFunc("AGE", "Graph Database") YIELD myFunc
```

This example calls a user-defined function named `myFunc` and passes the arguments `"AGE"` and `"GRAPH DATABASE"` to the function.