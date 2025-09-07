# Logarithmic Functions


## e

`e()` returns the base of the natural logarithm, e.

Syntax: `e()`

Returns:


```
An agtype float.
```


Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN e()
$$) as (e agtype);
```


Results


<table>
  <tr>
   <td>e
   </td>
  </tr>
  <tr>
   <td> 2.71828182845905
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## sqrt

`sqrt()` returns the square root of a number.

Syntax: `sqrt(expression)`

Returns:


```
An agtype float.
```


Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN sqrt(144)
$$) as (results agtype);
```


Results


<table>
  <tr>
   <td>results
   </td>
  </tr>
  <tr>
   <td>12
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## exp

`exp()` returns e^n, where e is the base of the natural logarithm, and n is the value of the argument expression.

Syntax: `exp(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* `exp(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN exp(2)
$$) as (e agtype);
```


e to the power of 2 is returned.

Result:


<table>
  <tr>
   <td>e
   </td>
  </tr>
  <tr>
   <td>7.38905609893065
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## log

`log()` returns the natural logarithm of a number.

Syntax: `log(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* `log(null)` returns `null`.
* `log(0)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN log(27)
$$) as (natural_logarithm agtype);
```


The natural logarithm of 27 is returned.

Result:


<table>
  <tr>
   <td>natural_logarithm
   </td>
  </tr>
  <tr>
   <td>3.295836866004329
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## log10

`log10()` returns the common logarithm (base 10) of a number.

Syntax: `log10(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* `log10(null)` returns `null`.
* `log10(0)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN log10(27)
$$) as (common_logarithm agtype);
```


The common logarithm of 27 is returned.

Result:


<table>
  <tr>
   <td>common_logarithm
   </td>
  </tr>
  <tr>
   <td>1.4313637641589874
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>

