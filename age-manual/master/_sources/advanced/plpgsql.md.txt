# PL/pgSQL Functions

Cypher commands can be run in [PL/pgSQL](https://www.postgresql.org/docs/11/plpgsql-overview.html) functions without restriction.

Data Setup
```postgresql
SELECT *
FROM cypher('imdb', $$
	CREATE (toby:actor {name: 'Toby Maguire'}),
		(tom:actor {name: 'Tom Holland'}),
		(willam:actor {name: 'Willam Dafoe'}),
		(robert:actor {name: 'Robert Downey Jr'}),
		(spiderman:movie {title: 'Spiderman'}),
		(no_way_home:movie {title: 'Spiderman: No Way Home'}),
		(homecoming:movie {title: 'Spiderman: Homecoming'}),
		(ironman:movie {title: 'Ironman'}),
		(tropic_thunder:movie {title: 'Tropic Thunder'}),
		(toby)-[:acted_in {role: 'Peter Parker', alter_ego: 'Spiderman'}]->(spiderman),
		(willam)-[:acted_in {role: 'Norman Osborn', alter_ego: 'Green Goblin'}]->(spiderman),
		(toby)-[:acted_in {role: 'Toby Maguire'}]->(tropic_thunder),
		(robert)-[:acted_in {role: 'Kirk Lazarus'}]->(tropic_thunder),
		(robert)-[:acted_in {role: 'Tony Stark', alter_ego: 'Ironman'}]->(homecoming),
		(tom)-[:acted_in {role: 'Peter Parker', alter_ego: 'Spiderman'}]->(homecoming),
		(tom)-[:acted_in {role: 'Peter Parker', alter_ego: 'Spiderman'}]->(no_way_home),
		(toby)-[:acted_in {role: 'Peter Parker', alter_ego: 'Spiderman'}]->(no_way_home),
		(willam)-[:acted_in {role: 'Norman Osborn', alter_ego: 'Green Goblin'}]->(no_way_home)
$$) AS (a agtype);
```

Function Creation
```postgresql
CREATE OR REPLACE FUNCTION get_all_actor_names()
RETURNS TABLE(actor agtype)
LANGUAGE plpgsql
AS $BODY$
BEGIN
    LOAD 'age';
    SET search_path TO ag_catalog;

    RETURN QUERY 
    SELECT * 
    FROM ag_catalog.cypher('imdb', $$
        MATCH (v:actor)
        RETURN v.name
    $$) AS (a agtype);
END
$BODY$;
```

Query:
```postgresql
SELECT * FROM get_all_actor_names();
```

Results
<table>
  <tr>
   <td><strong>actor</strong>
   </td>
  </tr>
  <tr>
   <td>"Toby Maguire"</td>
  </tr>
  <tr>
   <td>"Tom Holland"</td>
  </tr>
  <tr>
   <td>"Willam Dafoe"</td>
  </tr>
  <tr>
   <td>"Robert Downey Jr"</td>
  </tr>
  <tr>
   <td>4 row(s) returned
   </td>
  </tr>
</table>

```
Developer's Note:

It's recommended that users use the LOAD 'age' command and set the search_path in the function declaration, to ensure the CREATE FUNCTION command works consistently.
```

## Dynamic Cypher


```postgresql
CREATE OR REPLACE FUNCTION get_actors_who_played_role(role agtype)
RETURNS TABLE(actor agtype, movie agtype)
LANGUAGE plpgsql
AS $function$
DECLARE sql VARCHAR;
BEGIN
        load 'age';
        SET search_path TO ag_catalog;

        sql := format('
		SELECT *
		FROM cypher(''imdb'', $$
			MATCH (actor)-[:acted_in {role: %s}]->(movie:movie)
			RETURN actor.name, movie.title
		$$) AS (actor agtype, movie agtype);
	', role);

        RETURN QUERY EXECUTE sql;

END
$function$;
```

```postgresql
SELECT * FROM get_actors_who_played_role('"Peter Parker"');
```


Results
<table>
  <tr>
   <td><strong>actor</strong></td>
   <td><strong>movie</strong></td>
  </tr>
  <tr>
   <td>"Toby Maguire"</td>
   <td>"Spiderman"</td>
  </tr>
  <tr>
   <td>"Toby Maguire"</td>
   <td>"Spiderman: No Way Home"</td>
  </tr>
  <tr>
   <td>"Tom Holland"</td>
   <td>"Spiderman: No Way Home"</td>
  </tr>
  <tr>
   <td>"Tom Holland"</td>
   <td>"Spiderman: Homecoming"</td>
  </tr>
  <tr>
   <td>4 row(s) returned
   </td>
  </tr>
</table>


