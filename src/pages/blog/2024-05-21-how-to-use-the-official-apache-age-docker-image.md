---
templateKey: blog-post
title: How to use the official Apache AGE docker image
date: 2024-05-21T02:02:13.071Z
description: How to use the official Apache AGE docker image
featuredpost: true
featuredimage: /img/banner-landing.jpg
---
<!--StartFragment-->

## Prerequisites



For this guide I'll be using Windows 11 with Arch Linux installed on WSL2, and Docker integrated. Docker Desktop needs to be installed on Windows. 

This may work on anything that runs Docker, though.



- - -



## Getting the image



Make sure Docker daemon is running by starting Docker Desktop.



If you issue \`docker ps\` and it doesn't throw an error, you may be good to go.



Go to the official [Apache AGE Docker Hub page](https://hub.docker.com/r/apache/age) and copy the command:



##### docker pull apache/age



Run it on WSL terminal and it should appear in the list of docker images:



##### docker image ls

##### REPOSITORY          TAG           IMAGE ID       CREATED        SIZE

##### apache/age          latest        dc3b65a4c6fc   44 hours ago   1.34GB



- - -



## Running the container



Now that you have the image, you need to run a container of it, but it needs very specific variables as per user documentation. From WSL terminal paste:



##### docker run \

##### \--name age  \

##### \-p 5455:5432 \

##### \-e POSTGRES_USER=postgresUser \

##### \-e POSTGRES_PASSWORD=postgresPW \

##### \-e POSTGRES_DB=postgresDB \

##### \-d \

#####     apache/age



Let me break down the command:



1. \`docker run\`: This is the basic command to start a new Docker container.

    

2. \`--name age\`: Assigns the name \`age\` to the container. This name can be used to reference the container in other Docker commands.

    

3. \`-p 5455:5432\`: Maps port 5432 inside the Docker container to port 5455 on the host machine (WSL). This is useful for connecting to the PostgreSQL service running inside the container from the host system.

    

4. \`-e POSTGRES_USER=postgresUser\`: Sets an environment variable \`POSTGRES_USER\` inside the container, assigning it the value \`postgresUser\`. This is the username used to connect to the PostgreSQL database.

    

5. \`-e POSTGRES_PASSWORD=postgresPW\`: Sets an environment variable \`POSTGRES_PASSWORD\` inside the container, assigning it the value \`postgresPW\`. This is the password used to connect to the PostgreSQL database.

    

6. \`-e POSTGRES_DB=postgresDB\`: Sets an environment variable \`POSTGRES_DB\` inside the container, assigning it the value \`postgresDB\`. This is the name of the database to which connections will be made by default.

    

7. \`-d\`: Runs the container in detached mode. This means that the container will run in the background, and you won't see its output in the terminal.

    

8. \`apache/age\`: This is the name of the Docker image to be used for the container. It refers to a specific image that has Apache AGE installed and configured.



With that there will be a running container on background:



![](https://lh7-us.googleusercontent.com/f3VyQLDpkXJY06ZWMHScG-rCzSEyxi-MuogZwGhDvaUQGDCMbMGXMkN9qOvn_QrZfNVVlXDfz9Fvq4avTZ-yHHo411fX7-EtWBxOdVshCpVSklIjZeojQ0mjZhVVP5OLtKyjlUL9Ytl9jX_A5t4Hl_k)



- - -



## Using Apache AGE from container



Now on Docker Desktop, click on age, the recently created container.



![](https://lh7-us.googleusercontent.com/t6geQQ1zUNDZmbr-ddtFgjwWhXDTnrbzjhcPjNDzSa1-GfnU94A_C0emGBdXJHWiFRavmSYthj_5d9zsa7yA-OK8P1IXjoGFODy4ckooiLUGB58XKkiR4TWIuU3PwT6CvszZw5SaWei7JWq-V4Fjni0)



Now click "Terminal" and "Open in external terminal"



![](https://lh7-us.googleusercontent.com/a6iy2bzElCbP9MF4vEKYYwgpCkeMvxnSJ8FwSPW6YR0KaPK9YySbiQqYKtmeyLaDT4wkwITVsFAJoRXuvCa1wMfH1z3gjy640SfF-CG9j0hJoNBU5BxHNh5LlfHbbldI51L83dVeqqZDw_Fuj9vpMio)



It will open your default terminal logged in to root.



Now run the command:



##### psql -h 0.0.0.0 -p 5432 -d postgresDB -U postgresUser



Immediately you will be inside psql, logged in to "postgresUser" in the "postgresDB" database, which were created upon the prior docker run command.



##### \# psql -h 0.0.0.0 -p 5432 -d postgresDB -U postgresUser

##### psql (14.8 (Debian 14.8-1.pgdg120+1))

##### Type "help" for help.

##### postgresDB=#



Apache AGE comes already loaded, so you can start using it right away:



##### postgresDB=# SET search_path TO ag_catalog;

##### SET

##### postgresDB=# SELECT * FROM ag_graph;

#####  graphid | name | namespace

##### \---------+------+-----------

#####    16950 | test | test

##### (1 row)

##### postgresDB=# SELECT * FROM ag_label;

#####        name       | graph | id | kind |       relation        |        seq_name

##### \------------------+-------+----+------+-----------------------+-------------------------

#####  _ag_label_vertex | 16950 |  1 | v    | test._ag_label_vertex | _ag_label_vertex_id_seq

#####  _ag_label_edge   | 16950 |  2 | e    | test._ag_label_edge   | _ag_label_edge_id_seq

##### (2 rows)

##### postgresDB=#



And that's a wrap! Have fun!



<!--EndFragment-->