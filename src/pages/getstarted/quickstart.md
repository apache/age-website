---
templateKey: docs-template
path: /Get Started/Quickstart
title: Quick Start
---

<div class="DeveloperGuidelines">

## Pre-Installation
Install the following essential libraries according to each OS. Building AGE from the source depends on the following Linux libraries (Ubuntu package names shown below):

- CentOS
```
yum install gcc glibc glib-common readline readline-devel zlib zlib-devel flex bison
```
- Fedora
```
dnf install gcc glibc bison flex readline readline-devel zlib zlib-devel
```

- Ubuntu
```
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison
```

## Installation
Apache AGE is intended to be simple to install and run. It can be installed with Docker and other traditional ways.

- Install PostgreSQL
You will need to install an AGE compatible version of Postgres, for now AGE supports Postgres 11, 12, 13, 14, 15 & 16. Supporting the latest versions is on AGE roadmap.

- Installation via Package Manager
You can use a [package management](https://www.postgresql.org/download/) that your OS provides to download AGE.
```
sudo apt install postgresql
```

- Installation From Source Code
You can [download the Postgres](https://www.postgresql.org/ftp/source/) source code and install your own instance of Postgres. You can read instructions on how to install from source code for different versions on the [official Postgres Website](https://www.postgresql.org/docs/16/installation.html).

-  Install AGE on Linux and MacOS
Clone the [github repository](https://github.com/apache/age) or download the download an [official release](https://github.com/apache/age/releases). Run the pg_config utility and check the version of PostgreSQL. Currently, only PostgreSQL versions 11, 12, 13, 14, 15 & 16 are supported. If you have any other version of Postgres, you will need to install PostgreSQL version 11, 12, 13, 14, 15, or 16.
```
pg_config
```

Run the following command in the source code directory of Apache AGE to build and install the extension.
```
make install
```

If the path to your Postgres installation is not in the PATH variable, add the path in the arguments:
```
make PG_CONFIG=/path/to/postgres/bin/pg_config install
```

- Run using Docker
Get the docker image
```
docker pull apache/age
```
Create AGE docker container
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
Enter PostgreSQL's psql:
```
docker exec -it age psql -d postgresDB -U postgresUser
```

## Post Installation
For every connection of AGE you start, you will need to load the AGE extension.
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
To create a graph, use the create_graph function located in the ag_catalog namespace.
```
SELECT create_graph('graph_name');
```
To create a single vertex, use the CREATE clause.
```
SELECT * 
FROM cypher('graph_name', $$
    CREATE (n)
$$) as (v agtype);
```
To create a single vertex with the label, use the CREATE clause.
```
SELECT * 
FROM cypher('graph_name', $$
    CREATE (:label)
$$) as (v agtype);
```
To query the graph, you can use the MATCH clause.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (v)
    RETURN v
$$) as (v agtype);
```
You can use the following to create an edge, for example, between two nodes.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:label), (b:label)
    WHERE a.property = 'Node A' AND b.property = 'Node B'
    CREATE (a)-[e:RELTYPE]->(b)
    RETURN e
$$) as (e agtype);
```
To create an edge and set properties.
```
SELECT * 
FROM cypher('graph_name', $$
    MATCH (a:label), (b:label)
    WHERE a.property = 'Node A' AND b.property = 'Node B'
    CREATE (a)-[e:RELTYPE {property:a.property + '<->' + b.property}]->(b)
    RETURN e
$$) as (e agtype);
```
Example
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
