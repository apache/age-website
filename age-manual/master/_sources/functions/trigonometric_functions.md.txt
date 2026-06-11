# Trigonometric Functions


## degrees

`degrees()` converts radians to degrees.

Syntax: `degrees(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `degrees(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN degrees(3.14159)
$$) as (deg agtype);
```


The number of degrees in something close to pi is returned.

Results:


<table>
  <tr>
   <td>deg
   </td>
  </tr>
  <tr>
   <td>179.99984796050427
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## radians

`radians()` converts degrees to radians.

Syntax: `radians(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in degrees.
   </td>
  </tr>
</table>


Considerations:



* `radians(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN radians(180)
$$) as (rad agtype);
```


The number of degrees in something close to pi is returned.

Results:


<table>
  <tr>
   <td>rad
   </td>
  </tr>
  <tr>
   <td>3.14159265358979
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## pi

`pi()` returns the mathematical constant pi.

Syntax: `pi()`

Returns:


```
An agtype float.
```


Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN pi()
$$) as (p agtype);
```


The constant pi is returned.

Result:


<table>
  <tr>
   <td>pi
   </td>
  </tr>
  <tr>
   <td>3.141592653589793
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## sin

`sin()` returns the sine of a number.

Syntax: `sin(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `sin(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN sin(0.5)
$$) as (s agtype);
```


The sine of 0.5 is returned.

Results:


<table>
  <tr>
   <td>s
   </td>
  </tr>
  <tr>
   <td>0.479425538604203
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## cos

`cos()` returns the cosine of a number.

Syntax: `cos(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `cos(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN cos(0.5)
$$) as (c agtype);
```


The cosine of 0.5 is returned.

Results:


<table>
  <tr>
   <td>c
   </td>
  </tr>
  <tr>
   <td>0.8775825618903728
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## tan

`tan()` returns the tangent of a number.

Syntax: `tan(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `tan(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN tan(0.5)
$$) as (t agtype);
```


The tangent of 0.5 is returned.

Results:


<table>
  <tr>
   <td>t
   </td>
  </tr>
  <tr>
   <td>0.5463024898437905
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## Cot

`cot()` returns the cotangent of a number.

Syntax: `cot(expression)`

Returns:


```
A float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `cot(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN cot(0.5)
$$) as (t agtype);
```


The cotangent of 0.5 is returned.

Results:


<table>
  <tr>
   <td>t
   </td>
  </tr>
  <tr>
   <td>1.830487721712452
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## asin

`asin()` returns the arcsine of a number.

Syntax: `asin(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `asin(null)` returns `null`.
* If (expression &lt; -1) or (expression > 1), then `asin(expression)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN asin(0.5)
$$) as (arc_s agtype);
```


The arcsine of 0.5 is returned.

Results:


<table>
  <tr>
   <td>arc_s
   </td>
  </tr>
  <tr>
   <td>0.523598775598299
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## acos

`acos()` returns the arccosine of a number.

Syntax: `acos(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `acos(null)` returns `null`.
* If (expression &lt; -1) or (expression > 1), then `acos(expression)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN acos(0.5)
$$) as (arc_c agtype);
```


The arccosine of 0.5 is returned.

Results:


<table>
  <tr>
   <td>arc_c
   </td>
  </tr>
  <tr>
   <td>1.0471975511965979
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## atan

`atan()` returns the arctangent of a number.

Syntax:`atan(expression)`

Returns:


```
An agtype float.
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
   <td>An agtype number expression that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `atan(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN atan(0.5)
$$) as (arc_t agtype);
```


The arctangent of 0.5 is returned.

Results:


<table>
  <tr>
   <td>arc_t
   </td>
  </tr>
  <tr>
   <td>0.463647609000806
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## atan2

`atan2()` returns the arctangent2 of a set of coordinates in radians.

Syntax: `atan2(expression1, expression2)`

Returns:


```
An agtype float.
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
   <td>expression1
   </td>
   <td>An agtype number expression for y that represents the angle in radians.
   </td>
  </tr>
  <tr>
   <td>expression2
   </td>
   <td>An agtype number expression for x that represents the angle in radians.
   </td>
  </tr>
</table>


Considerations:



* `atan2(null, null)`, `atan2(null, expression2)` and `atan(expression1, null)` all return null.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN atan2(0.5, 0.6)
$$) as (arc_t2 agtype);
```


The arctangent2 of 0.5 and 0.6 is returned.

Results:


<table>
  <tr>
   <td>arc_t2
   </td>
  </tr>
  <tr>
   <td>0.694738276196703
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>

