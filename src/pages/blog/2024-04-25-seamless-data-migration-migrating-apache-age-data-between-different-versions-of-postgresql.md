---
templateKey: blog-post
title: "Seamless Data Migration: Migrating Apache AGE Data Between Different
  Versions of PostgreSQL"
date: 2024-04-25T08:33:00.464Z
description: >
  Apache AGE serves as an open-source graph database, akin to Neo4j. Although
  they share similar functionalities, they also exhibit significant differences.
  AGE stands out as a PostgreSQL extension which leverages the capabilities of a
  relational database (RDBMS), enabling users to seamlessly integrate both
  relational data (tables) and graph data, which is a key strength setting it
  apart from Neo4j.
featuredpost: true
featuredimage: /img/logo.png
---
<!--StartFragment-->

Apache AGE serves as an open-source graph database, akin to Neo4j. Although they share similar functionalities, they also exhibit significant differences. AGE stands out as a PostgreSQL extension which leverages the capabilities of a relational database (RDBMS), enabling users to seamlessly integrate both relational data (tables) and graph data, which is a key strength setting it apart from Neo4j.



AGE is available in various versions, each compatible with specific PostgreSQL versions. One common challenge users encounter is data migration when transitioning from one AGE version to another. Fortunately, PostgreSQL provides a utility called "pg_dump", which seamlessly functions with AGE for data migration.



Let's exemplify the data migration process by creating a graph with some nodes:



SELECT create_graph('test');



NOTICE:  graph "test" has been created

 create_graph 

\--------------

 

(1 row)



SELECT * FROM cypher('test', $$

    CREATE (:Person {name: "John Doe"})

    CREATE (:Person {name: "Jane Smith"})

$$) AS (res agtype);



 res 

\-----

(0 rows)



SELECT * FROM cypher('test', $$

    MATH (n)

    RETURN n

$$) AS (res agtype);



                                    res                                     

\----------------------------------------------------------------------------

 {"id": 1, "label": "Person", "properties": {"name": "John Doe"}}::vertex

 {"id": 2, "label": "Person", "properties": {"name": "Jane Smith"}}::vertex

(2 rows)



Now, we have a graph called "test" containing two vertices (keeping it simple).



Using pg_dump for Backup:



To create a backup, open a new terminal in your current postgreSQL directory and execute the following command:



bin/pg_dump -d postgres > age_backup.sql



Here, "postgres" represents the name of the database (which might differ in your case), and "age_backup" is the chosen name for this demonstration. The generated "age_backup.sql" file will contain all the necessary queries to restore this backup whenever needed.



Now, if you open “age_backup.sql”, which will be in your PostgreSQL directory, its initial content will resemble this:



\-- PostgreSQL database dump

\-- Dumped from database version 13.9

\-- Dumped by pg_dump version 13.9



Using psql for Migration:



Navigate to the directory containing the desired version of PostgreSQL in your terminal—the one to which you intend to migrate the data. Ensure that you have also installed the desired version of AGE as well.



Execute the following command:



bin/psql -d postgres-f path/to/age_dump.sql



Now, it's time to check whether the data migration has been successfully executed. To do this, enter the following command in the psql terminal:



SELECT * FROM cypher('test', $$

    MATH (n)

    RETURN n

$$) AS (res agtype);



                                    res                                     

\----------------------------------------------------------------------------

 {"id": 1, "label": "Person", "properties": {"name": "John Doe"}}::vertex

 {"id": 2, "label": "Person", "properties": {"name": "Jane Smith"}}::vertex

(2 rows)



As you can see, the data has been successfully migrated to the new version of AGE.



<!--EndFragment-->