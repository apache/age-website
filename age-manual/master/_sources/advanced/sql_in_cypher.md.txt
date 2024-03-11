# SQL In Cypher

AGE does not support SQL being directly written in Cypher. However with [user defined functions](../functions/user_functions.md) you can write SQL queries and call them in a cypher command.


```
Developer's Note:

Void and Scalar-Value functions only. Set returning functions are not currently supported.
```


## Create Function
```postgresql
CREATE OR REPLACE FUNCTION public.get_event_year(name agtype) RETURNS agtype AS $$
	SELECT year::agtype
	FROM history AS h
	WHERE h.event_name = name::text
	LIMIT 1;
$$ LANGUAGE sql;
```

## Query
```postgresql
SELECT * FROM cypher('graph_name', $$
	MATCH (e:event)
	WHERE e.year < public.get_event_year(e.name)
	RETURN e.name
$$) as (n agtype);

```

Results
<table>
  <tr>
   <td><strong>name</strong>
   </td>
  </tr>
  <tr>
   <td>"Apache Con 2021"
   </td>
  </tr>
  <tr>
   <td colspan="1" >1 row
   </td>
  </tr>
</table>

