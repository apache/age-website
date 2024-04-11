# ORDER BY

`ORDER BY` is a sub-clause following `WITH`. ORDER BY specifies that the output should be sorted and how it will be sorted. 

## Introduction

Note that you cannot sort on nodes or relationships, sorting must be done on properties. `ORDER BY` relies on comparisons to sort the output. See Ordering and comparison of values.

In terms of scope of variables, `ORDER BY` follows special rules, depending on if the projecting `RETURN` or `WITH` clause is either aggregating or `DISTINCT`. If it is an aggregating or `DISTINCT` projection, only the variables available in the projection are available. If the projection does not alter the output cardinality (which aggregation and `DISTINCT` do), variables available from before the projecting clause are also available. When the projection clause shadows already existing variables, only the new variables are available.

Lastly, it is not allowed to use aggregating expressions in the `ORDER BY` sub-clause if they are not also listed in the projecting clause. This last rule is to make sure that `ORDER BY` does not change the results, only the order of them.


## Order nodes by property

`ORDER BY` is used to sort the output.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)
    WITH n.name as name, n.age as age
    ORDER BY n.name
    RETURN name, age
$$) as (name agtype, age agtype);
```


The nodes are returned, sorted by their name.

Result


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>age</strong>
   </td>
  </tr>
  <tr>
   <td>"A"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
   <td>32
   </td>
  </tr>
  <tr>
   <td colspan="2" >(1 row)
   </td>
  </tr>
</table>



## Order nodes by multiple properties

You can order by multiple properties by stating each variable in the `ORDER BY` clause. Cypher will sort the result by the first variable listed, and for equal values, go to the next property in the `ORDER BY` clause, and so on.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)
    WITH n.name as name, n.age as age
    ORDER BY n.age, n.name
    RETURN name, age
$$) as (name agtype, age agtype);
```


This returns the nodes, sorted first by their age, and then by their name.

Result


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>age</strong>
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
   <td>32
   </td>
  </tr>
  <tr>
   <td>"A"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td colspan="2" >(1 row)
   </td>
  </tr>
</table>



## Order nodes in descending order

By adding `DESC[ENDING]` after the variable to sort on, the sort will be done in reverse order.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)
    WITH n.name AS name, n.age AS age
    ORDER BY n.name DESC
    RETURN name, age
$$) as (name agtype, age agtype);
```


The example returns the nodes, sorted by their name in reverse order.

Result


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>age</strong>
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
   <td>32
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td>"A"
   </td>
   <td>34
   </td>
  </tr>
  <tr>
   <td colspan="2" >(3 rows)
   </td>
  </tr>
</table>



## Ordering null

When sorting the result set, `null` will always come at the end of the result set for ascending sorting, and first for descending sorting.

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
    MATCH (n)
    WITH n.name AS name, n.age AS age, n.height
    ORDER BY n.height
    RETURN name, age, height
$$) as (name agtype, age agtype, height agtype);
```


The nodes are returned sorted by the length property, with a node without that property last. 

Result


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td><strong>age</strong>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>"A"
   </td>
   <td>34
   </td>
   <td>170
   </td>
  </tr>
  <tr>
   <td>"C"
   </td>
   <td>32
   </td>
   <td>185
   </td>
  </tr>
  <tr>
   <td>"B"
   </td>
   <td>34
   </td>
   <td>&lt;NULL>
   </td>
  </tr>
  <tr>
   <td colspan="3" >(3 rows)
   </td>
  </tr>
</table>

