# Comparability, Equality, Orderability and Equivalence

AGE already has good semantics for equality within the primitive types (booleans, strings,integers, and floats) and maps. Furthermore, Cypher has good semantics for comparability and orderability for integers, floats, and strings, within each of the types. However, working with values of different types deviates from Postgres’ defined logic and the openCypher specification:



* Comparability between values of different types is defined. This deviation is particularly pronounced when it occurs as part of the evaluation of predicates (in WHERE).
* ORDER BY will not fail if the values passed to it have different types.

The underlying conceptual model is complex and sometimes inconsistent. This leads to an unclear relationship between comparison operators, equality, grouping, and ORDER BY:
* Comparability and orderability are aligned with each other consistently, as all types can be ordered and compared.
* The difference between equality and equivalence, as exposed by `IN`, `=`, `DISTINCT`, and grouping, in AGE is limited to testing two instances of the value null to each other
    * In equality, `null = null` is `null`.
    * In equivalence, used by `DISTINCT` and when grouping values, two null values are always treated as being the same value.
    * However, equality treats null values differently if they are an element of a list or a map value.

## Concepts

The openCypher specification features four distinct concepts related to equality and ordering:


### Comparability

Comparability is used by the inequality operators (>, &lt;, >=, &lt;=), and defines the underlying semantics of how to compare two values.


### Equality

Equality is used by the equality operators (=, &lt;>), and the list membership operator (`IN`). It defines the underlying semantics to determine if two values are the same in these contexts. Equality is also used implicitly by literal maps in node and relationship patterns, since such literal maps are merely a shorthand notation for equality predicates.


### Orderability

Orderability is used by the `ORDER BY` clause, and defines the underlying semantics of how to order values.


### Equivalence

Equivalence is used by the `DISTINCT` modifier and by grouping in projection clauses (`WITH`, `RETURN`), and defines the underlying semantics to determine if two values are the same in these contexts.

## Comparability and equality

Comparison operators need to function as one would expect comparison operators to function - equality and comparability. But, at the same time, they need to allow the sorting of column data - equivalence and orderability.

Unfortunately, it may not be possible to implement separate comparison operators for equality and comparison operations, and, equivalence and orderability operations, in PostgreSQL, for the same query. So we prioritize equivalence and orderability over equality and comparability to allow for ordering of output data.


### Comparability

Comparability is defined between any pair of values, as specified below.

* Numbers 
    * Numbers of different types (excluding NaN values and the Infinities) are compared to each other as if both numbers would have been coerced to arbitrary precision big decimals(currently outside the Cypher type system) before comparing them with each other numerically in ascending order.
    * Comparison to any value that is not also Number follows the rules of orderability.
    * Floats don’t have the required precision to represent all of the whole numbers in the range of agtype integer and agtype numeric. When casting an integer or numeric agtype to a float, unexpected results can occur when casting values in the high and low range
    * Integers
        * Integers are compared numerically in ascending order.
    * Floats
        * Floats (excluding NaN values and the Infinities) are compared numerically in ascending order.
        * Positive infinity is of type `FLOAT`, equal to itself and greater than any other number, except NaN values.
        * Negative infinity is of type `FLOAT`, equal to itself and less than any other number.
        * NaN values are comparable to each and greater than any other float value.
    * Numeric
        * Numerics are compared numerically in ascending order.
* Booleans
    * Booleans are compared such that false is less than true.
    * Comparison to any value that is not also a boolean follows the rules of orderability.
* Strings
    * Strings are compared in dictionary order, i.e. characters are compared pairwise in ascending order from the start of the string to the end. Characters missing in a shorter string are considered to be less than any other character. For example, `'a' < 'aa'`.
    * Comparison to any value that is not also a string follows the rules of orderability.
* Lists
    * Lists are compared in sequential order, i.e. list elements are compared pairwise in ascending order from the start of the list to the end. Elements missing in a shorter list are considered to be less than any other value (including null values). For example, `[1] < [1, 0]` but also `[1] < [1, null]`.
    * Comparison to any value that is not also a list follows the rules of orderability.
* Maps
    * The comparison order for maps is unspecified and left to implementations.
    * The comparison order for maps must align with the equality semantics outlined below. In consequence, any map that contains an entry that maps its key to a null value is incomparable. For example, `{a: 1} <= {a: 1, b: null}` evaluates to null.
    * Comparison to any value that is not also a regular map follows the rules of orderability.

Entities
* Vertices
    * The comparison order for vertices is based on the assigned graphid.
* Edges
    * The comparison order for edges is based on the assigned graphid.
* Paths
    * Paths are compared as if they were a list of alternating nodes and relationships of the path from the start node to the end node. For example, given nodes `n1`, `n2`, `n3`, and relationships `r1` and `r2`, and given that `n1 < n2 < n3` and `r1 < r2`, then the path `p1` from `n1` to `n3` via `r1` would be less than the path `p2` to `n1` from `n2` via `r2`. 
    * Expressed in terms of lists: 
```
p1 < p2
<=> [n1, r1, n3] < [n1, r2, n2]
<=> n1 < n1 || (n1 = n1 && [r1, n3] < [r2, n2])
<=> false || (true && [r1, n3] < [r2, n2])<=> [r1, n3] < [r2, n2]
<=> r1 < r2 || (r1 = r2 && n3 < n2)
<=> true || (false && false)
<=> true
```
    * Comparison to any value that is not also a path will return false.
* NULL
    * null is incomparable with any other value (including other null values.)


## Orderability Between different Agtypes

The ordering of different Agtype, when using &lt;, &lt;=, >, >= from smallest value to largest value is: 

1. Path
2. Edge
3. Vertex
4. Object
5. Array
6. String
7. Bool
8. Numeric, Integer, Float
9. NULL

Note: This is subject to change in future releases.


