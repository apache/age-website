# String Functions


## replace

`replace()` returns a string in which all occurrences of a specified string in the original string have been replaced by another (specified) string.

Syntax: <code>replace(original, search, replace)</code></strong>

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string.
   </td>
  </tr>
  <tr>
   <td>search
   </td>
   <td>An expression that specifies the string to be replaced in original.
   </td>
  </tr>
  <tr>
   <td>replace
   </td>
   <td>An expression that specifies the replacementstring.
   </td>
  </tr>
</table>


Considerations:



* If any argument is `null`, `null` will be returned.
* If search is not found in `original`, `original` will be returned.

<table>
  <tr>
  </tr>
</table>



Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
	RETURN replace('hello', 'l', 'w')
$$) as (str_array agtype);
```


Result:


<table>
  <tr>
   <td>new_str
   </td>
  </tr>
  <tr>
   <td>“Hewwo”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## split

`split()` returns a list of strings resulting from the splitting of the original string around matches of the given delimiter.

Syntax: `split(original, split_delimiter)`

Returns:


```
An agtype list of agtype strings.
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
   <td>original
   </td>
   <td>An expression that returns a string.
   </td>
  </tr>
  <tr>
   <td>split_delimiter
   </td>
   <td>The string with which to split original.
   </td>
  </tr>
</table>


Considerations:



* `split(null, splitDelimiter)` and `split(original, null)` both return `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN split('one,two', ',')
$$) as (split_list agtype);
```


Result:


<table>
  <tr>
   <td><strong>split_list</strong>
   </td>
  </tr>
  <tr>
   <td>[“one”,”two”]
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## left

`left()` returns a string containing the specified number of leftmost characters of the original string.

Syntax: `left(original, length)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string.
   </td>
  </tr>
  <tr>
   <td>n
   </td>
   <td>An expression that returns a positive integer.
   </td>
  </tr>
</table>


Considerations:



* `left(null, length)` and `left(null, null)` both return `null`
* `left(original, null)` will raise an error.
* If `length` is not a positive integer, an error is raised.
* If `length` exceeds the size of `original`, `original` is returned.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
	RETURN left('Hello', 3)
$$) as (new_str agtype);
```


Result:


<table>
  <tr>
   <td>new_str
   </td>
  </tr>
  <tr>
   <td>“Hel”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## right

`right()` returns a string containing the specified number of rightmost characters of the original string.

Syntax: `right(original, length)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string.
   </td>
  </tr>
  <tr>
   <td>n
   </td>
   <td>An expression that returns a positive integer.
   </td>
  </tr>
</table>


Considerations:



* `right(null, length)` and `right(null, null)` both return `null`
* `right(original, null)` will raise an error.
* If `length` is not a positive integer, an error is raised.
* If `length` exceeds the size of `original`, `original` is returned.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN right('hello', 3)
$$) as (new_str agtype);
```


Result:


<table>
  <tr>
   <td>new_str
   </td>
  </tr>
  <tr>
   <td>“llo”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## substring

`substring()` returns a substring of the original string, beginning with a 0-based index start and length.

Syntax: <code>substring(original, <strong>start</strong> [, <strong>length</strong>])</code>

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string.
   </td>
  </tr>
  <tr>
   <td>start
   </td>
   <td>An expression denoting the position at which the substring will begin.
   </td>
  </tr>
  <tr>
   <td>length
   </td>
   <td>An optional expression that returns a positive integer, denoting how many characters of the original expression will be returned.
   </td>
  </tr>
</table>


Considerations:



* `start` uses a zero-based index.
* If `length` is omitted, the function returns the substring starting at the position given by `start` and extending to the end of `original`.
* If `original` is `null`, `null` is returned.
* If either `start` or `length` is `null` or a negative integer, an error is raised.
* If `start` is 0, the substring will start at the beginning of `original`.
* If `length` is 0, the empty string will be returned.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN substring('hello', 1, 3), substring('hello', 2)
$$) as (sub_str1 agtype, sub_str2 agtype);
```


Result:


<table>
  <tr>
   <td>sub_str1
   </td>
   <td>sub_str2
   </td>
  </tr>
  <tr>
   <td>‘ell’
   </td>
   <td>‘llo’
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>



## rTrim

`rTrim()` returns the original string with trailing whitespace removed.

Syntax: `rTrim(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `rTrim(null)` returns `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN rTrim(' hello ')
$$) as (right_trimmed_str agtype);
```


Result:


<table>
  <tr>
   <td>right_trimmed_str
   </td>
  </tr>
  <tr>
   <td>" hello"
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## lTrim

`lTrim()` returns the original string with leading whitespace removed.

Syntax: `lTrim(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `lTrim(null)` returns `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN lTrim(' hello ')
$$) as (left_trimmed_str agtype);
```


Result:


<table>
  <tr>
   <td>left_trimmed_str
   </td>
  </tr>
  <tr>
   <td>“hello ”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## trim

`trim()` returns the original string with leading and trailing whitespace removed.

Syntax: `trim(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `trim(null)` returns `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN trim(' hello ')
$$) as (trimmed_str agtype);
```


Result:


<table>
  <tr>
   <td>trimmed_str
   </td>
  </tr>
  <tr>
   <td>“hello”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## toLower

`toLower()` returns the original string in lowercase.

Syntax: `toLower(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `toLower(null)` returns `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN toLower('HELLO')
$$) as (lower_str agtype);
```


Result:


<table>
  <tr>
   <td>lower_str
   </td>
  </tr>
  <tr>
   <td>“hello”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## toUpper

`toUpper() `returns the original string in uppercase.

Syntax: `toUpper(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `toUpper(null)` returns `null`

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN toUpper('hello')
$$) as (upper_str agtype);
```


Result:


<table>
  <tr>
   <td><code>upper_str</code>
   </td>
  </tr>
  <tr>
   <td>“HELLO”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## reverse

`reverse()` returns a string in which the order of all characters in the original string have been reversed.

Syntax: `reverse(original)`

Returns:


```
An agtype string.
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
   <td>original
   </td>
   <td>An expression that returns a string
   </td>
  </tr>
</table>


Considerations:



* `reverse(null)` returns `null`.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN reverse("hello")
$$) as (reverse_str agtype);
```


Result:


<table>
  <tr>
   <td>reverse_str
   </td>
  </tr>
  <tr>
   <td>“olleh”
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## toString

`toString()` converts an integer, float or boolean value to a string.

Syntax: `toString(expression)`

Returns:


```
A string.
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
   <td>An expression that returns a number, a boolean, or a string.
   </td>
  </tr>
</table>


Considerations:



* `toString(null)` returns `null`
* If expression is a string, it will be returned unchanged.

Query:


```postgresql
SELECT *
FROM cypher('graph_name', $$
    RETURN toString(11.5),toString('a string'), toString(true)
$$) as (float_to_str agtype, str_to_str agtype, bool_to_string);
```


Result:


<table>
  <tr>
   <td>float_to_str
   </td>
   <td>str_to_str
   </td>
   <td>bool_to_str
   </td>
  </tr>
  <tr>
   <td>"11.5"
   </td>
   <td>"a string"
   </td>
   <td>"true"
   </td>
  </tr>
  <tr>
   <td colspan="3" >1 row(s) returned
   </td>
  </tr>
</table>
