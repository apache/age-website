---
templateKey: docs-template
path: /Get Started/Quickstart
title: Quick Start
---

<div class="DeveloperGuidelines">

## Run using Windows Installer

The Windows installer is an installation file that contains PostgreSQL 15, Apache AGE 1.4.0, and Graphizer 1.1 

Graphizer is a data modeling tool that allows generating  openCypher graph data with table data in relational databases and CSV files for advanced data analysis and exploration.

| Windows Installer         |
| --------------------- |
<a href="https://agedb.io/downloads/ageplus-pg15-1.4.0-1-windows-x64.zip" onclick="gtag('event', 'click', {'event_category': 'Category', 'event_label': '윈도우인스톨러다운수'});">Download Windows Installer ➚</a>

## Introduce Apache AGE & Graphizer
| Apache AGE         |
| --------------------- |
<iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/CgPPX_PIE9U" frameborder="0" allowfullscreen></iframe>

| Graphizer         |
| --------------------- |
<iframe id="ytplayer" type="text/html" width="720" height="405" src="https://www.youtube.com/embed/asgzHSiKR9U" frameborder="0" allowfullscreen></iframe>

※ The Graphizer video is a Korean. If you need another language, please click the subtitle button on the video to watch.

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
