# Numeric Functions


## rand

`rand()` returns a random floating point number in the range from 0 (inclusive) to 1 (exclusive); i.e.[0,1). The numbers returned follow an approximate uniform distribution.

Syntax: `rand()`

Returns:


```
A float.
```


Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN rand()
$$) as (random_number agtype);
```


A random number is returned.

Result:


<table>
  <tr>
   <td>random_number
   </td>
  </tr>
  <tr>
   <td>0.3586784748902053
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## abs

`abs()` returns the absolute value of the given number.

Syntax: `abs(expression)`

Returns:


```
The type of the value returned will be that of expression.
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



* `abs(null)` returns null.
* If expression is negative, -(expression) (i.e. the negation of expression) is returned.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (a), (e) WHERE a.name = 'Alice' AND e.name = 'Eskil'
    RETURN a.age, e.age, abs(a.age - e.age)
$$) as (alice_age agtype, eskil_age agtype, difference agtype);
```


The absolute value of the age difference is returned.

Result:


<table>
  <tr>
   <td>alice_age
   </td>
   <td>eskil_age
   </td>
   <td>difference
   </td>
  </tr>
  <tr>
   <td>38
   </td>
   <td>41
   </td>
   <td>3
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row(s) returned
   </td>
  </tr>
</table>



## ceil

`ceil()` returns the smallest floating point number that is greater than or equal to the given number and equal to a mathematical integer.

Syntax: `ceil(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* `ceil(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN ceil(0.1)
$$) as (ceil_value agtype);
```


The ceiling of 0.1 is returned.

Result:


<table>
  <tr>
   <td> ceil_value
   </td>
  </tr>
  <tr>
   <td>1
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## floor

`floor()` returns the greatest floating point number that is less than or equal to the given number and equal to a mathematical integer.

Syntax: `floor(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>


Considerations:



* `floor(null)` returns null.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN floor(0.1)
$$) as (flr agtype);
```


The floor of 0.1 is returned.

Result:


<table>
  <tr>
   <td>flr
   </td>
  </tr>
  <tr>
   <td>0
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## round

`round()` returns the value of the given number rounded to the nearest integer.

Syntax: `round(expression)`

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
   <td>An agtype number expression
   </td>
  </tr>
</table>

Considerations:



* `round(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN round(3.141592)
$$) as (rounded_value agtype);
```


3.0 is returned.

Result:


<table>
  <tr>
   <td>rounded_value
   </td>
  </tr>
  <tr>
   <td>3.0
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## sign

`sign()` returns the signum of the given number: 0 if the number is 0, -1 for any negative number, and 1 for any positive number

Syntax: `sign(expression)`

Returns:

```
An integer.
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



* `sign(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN sign(-17), sign(0.1), sign(0)
$$) as (negative_sign agtype, positive_sign agtype, zero_sign agtype);
```


The signs of -17 and 0.1 are returned.

Result:


<table>
  <tr>
   <td>negative_sign
   </td>
   <td>positive_sign
   </td>
   <td>zero_sign
   </td>
  </tr>
  <tr>
   <td>-1
   </td>
   <td>1
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row(s) returned
   </td>
  </tr>
</table>




