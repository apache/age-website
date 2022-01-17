# PL/pgSQL Functions

Cypher commands can be run in [PL/pgSQL](https://www.postgresql.org/docs/11/plpgsql-overview.html) functions without restriction.

```
CREATE FUNCTION get_all_vertices()
RETURNS TABLE(vertex ag_catalog.agtype)
LANGUAGE plpgsql
AS $BODY$
BEGIN
    LOAD 'age';
    SET search_path TO ag_catalog;

    RETURN QUERY 
    SELECT * 
    FROM ag_catalog.cypher('graph_name', $$
        MATCH (v)
        RETURN v
    $$) AS (a ag_catalog.agtype);
END
$BODY$;
```

```
Developer's Note:

It's recommended that the LOAD 'age' command and setting the search_path in the function declaration, to ensure the CREATE FUNCTION command works consistently.
```
