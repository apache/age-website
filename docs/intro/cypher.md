# The AGE Cypher Query Format

Cypher queries are constructed using a function called cypher in ag_catalog which returns a Postgres SETOF [records](https://www.postgresql.org/docs/11/xfunc-sql.html#XFUNC-SQL-FUNCTIONS-RETURNING-SET).


## Cypher()

Cypher() executes the cypher query passed as an argument.

Syntax `cypher(graph_name, query_string, parameters)`

Returns


```
A SETOF records
```


Arguments:


<table>
  <tr>
   <td>Argument Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>graph_name
   </td>
   <td>The target graph for the Cypher query.
   </td>
  </tr>
  <tr>
   <td>query_string
   </td>
   <td>The Cypher query to be executed.
   </td>
  </tr>
  <tr>
   <td>parameters
   </td>
   <td>An optional map of parameters used for stored procedure. Default is NULL. See 


<a href="#heading=h.8ys790864f8o">Stored Procedures</a> for details 
   </td>
  </tr>
</table>


Considerations:



* If a Cypher query does not return results, a record definition still needs to be defined. 


[Example](#heading=h.vo9azwq6syoh).

Query:


```
SELECT * FROM cypher('graph_name', $$ 
/* Cypher Query Here */ 
$$) AS (result1 agtype, result2 agtype);
```



## Cypher in an Expression

Cypher may not be used as part of an expression, use a subquery instead. See 



[Advanced Cypher Queries](#heading=h.2hqh54e4zcgm) for information about how to use Cypher queries with Expressions


## SELECT Clause

Calling Cypher in the SELECT clause as an independent column is not allowed. However Cypher may be used when it belongs as a conditional. 

Not Allowed:


```
SELECT 
    cypher('graph_name', $$
         MATCH (v:Person)
         RETURN v.name
     $$);
```



```
ERROR:  cypher(...) in expressions is not supported
LINE 3: 	cypher('graph_name', $$
        	^
HINT:  Use subquery instead if possible.
```

