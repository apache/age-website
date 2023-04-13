# User defined functions

Users may add custom functions to the AGE. When using the Cypher function, all function calls with a Cypher query use the default namespace of: ag_catalog. However if a user want to use a function outside this namespace, they may do so by adding the namespace before the function name.

Syntax: `namespace_name.function_name`

Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
RETURN sqrt(25)
$$) as (result agtype);
```


Result:


<table>
  <tr>
   <td>result
   </td>
  </tr>
  <tr>
   <td>25
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>


