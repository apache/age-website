# Prepared Statements

Cypher can run a read query within a Prepared Statement. When using parameters with stored procedures, An SQL Parameter must be placed in the cypher function call. See The [AGE Query Format](../intro/cypher.md#the-age-cypher-query-format) for details.

## Cypher Parameter Format

A cypher parameter is in the format of a `'$'` followed by an identifier. Unlike Postgres parameters, Cypher parameters start with a letter, followed by an alphanumeric string of arbitrary length.

Example: `$parameter_name`


## Prepared Statements Preparation

Preparing Prepared Statements in cypher is an extension of Postgres' stored procedure system. Use the `PREPARE` clause to create a query with the Cypher Function call in it. Do not place Postgres style parameters in the cypher query call, instead place Cypher parameters in the query and place a Postgres parameter as the third argument in the Cypher function call.


```postgresql
PREPARE cypher_stored_procedure(agtype) AS
SELECT *
FROM cypher('expr', $$
    MATCH (v:Person) 
    WHERE v.name = $name //Cypher parameter
    RETURN v
$$, $1) //An SQL Parameter must be placed in the cypher function call
AS (v agtype);
```

## Prepared Statements Execution

When executing the prepared statement, place an agtype map with the parameter values where the Postgres Parameter in the Cypher function call is. The value must be an agtype map or an error will be thrown. Exclude the `'$'` for parameter names.


```postgresql
EXECUTE cypher_prepared_statement('{"name": "Tobias"}');
```

