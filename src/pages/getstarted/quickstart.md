---
templateKey: docs-template
path: /Get Started/Quickstart
title: Quick Start
---

<div class="DeveloperGuidelines">

## Run using Windows Installer

The Windows installer is an installation file that packages PostgreSQL 15, Apache AGE 1.4.0, and Graphizer 1.1 

Graphizer is a powerful Graph Database software that simplifies loading table data like Relational Database and CSV files into Graph Database for advanced data analysis and exploration.

| Windows Installer         |
| --------------------- |
| [Download Windows Installer ➚](https://agedb.io/downloads/ageplus-pg15-1.4.0-1-windows-x64.exe) |


## Run using Docker
- Get the docker image
```
docker pull apache/age
```
- Create AGE docker container
```
docker run \
--name age  \
-p 5455:5432 \
-e POSTGRES_USER=postgresUser \
-e POSTGRES_PASSWORD=postgresPW \
-e POSTGRES_DB=postgresDB \
-d \
apache/age
```
- Enter PostgreSQL's psql:
```
docker exec -it age psql -d postgresDB -U postgresUser
```
## Post Installation
- For every connection of AGE you start, you will need to load the AGE extension.
```
CREATE EXTENSION age;
```
```
LOAD 'age';
```
```
 SET search_path = ag_catalog, "$user", public;
```

## Quick Start
- To create a graph, use the create_graph function located in the ag_catalog namespace.
```
SELECT create_graph('graph_name');
```
- To create a single vertex, use the CREATE clause.
```
SELECT * 
FROM cypher('graph_name', $$
    CREATE (n)
$$) as (v agtype);
```
- To create a single vertex with the label, use the CREATE clause.
```
SELECT * 
FROM cypher('graph_name', $$
    CREATE (:label)
$$) as (v agtype);
```
- To query the graph, you can use the MATCH clause.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (v)
    RETURN v
$$) as (v agtype);
```
- You can use the following to create an edge, for example, between two nodes.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:label), (b:label)
    WHERE a.property = 'Node A' AND b.property = 'Node B'
    CREATE (a)-[e:RELTYPE]->(b)
    RETURN e
$$) as (e agtype);
```
- To create an edge and set properties.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:label), (b:label)
    WHERE a.property = 'Node A' AND b.property = 'Node B'
    CREATE (a)-[e:RELTYPE {property:a.property + '<->' + b.property}]->(b)
    RETURN e
$$) as (e agtype);
```
- Example
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:Person), (b:Person)
    WHERE a.name = 'Node A' AND b.name = 'Node B'
    CREATE (a)-[e:RELTYPE {name:a.name + '<->' + b.name}]->(b)
    RETURN e
$$) as (e agtype);
```
</div>