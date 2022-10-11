# Setup

## Getting AGE

### Releases

The releases and release notes can be found at <https://github.com/apache/age/releases>

### Source code

The source code can be found at <https://github.com/apache/age>

## Pre-Installation

Install the following essential libraries according to each OS.
Building AGE from source depends on the following Linux libraries (Ubuntu package names shown below):

### CentOS

```console
yum install gcc glibc glib-common readline readline-devel zlib zlib-devel flex bison
```

### Fedora

```console
dnf install gcc glibc bison flex readline readline-devel zlib zlib-devel
```

### Ubuntu

```console
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison
```

## Installation

Clone the github repo into any directory

Run the pg_config utility and check the version of PostgreSQL, currently only PostgreSQL versions 11 & 12 are supported. If you have any other version of postgres, you will need to install PostgreSQL version 11 & 12. Follow Setting up multiple versions of PostgreSQL
```console
pg_config
```

The build process will attempt to use the first path in the PATH environment variable when installing AGE. If the pg_config path is located there, run the following command in the source code directory of Apache AGE to build and install the extension.

```console
make install
```

If the path to your Postgres installation is not in the PATH variable, add the path in the arguments:

```console
make PG_CONFIG=/path/to/postgres/bin/pg_config install
```

## Setting up multiple versions of PostgreSQL

Install the intended version of PostgreSQL (11 or 12).

Use the pg_config to check if it points to the intended version of PostgreSQL, if it does we will have to PGBINROOT. Open /usr/bin/pg_config in write mode (might require root previllages) and edit the PGBINROOT value

```console
sudo vi /usr/bin/pg_config
```

By default PGBINROOT is set to /usr/lib/postsgresql , the directory which contains all the postgres versions. Change this to /usr/lib/postgresql/[intended version of postgres]

Check the PostgreSQL conf file of your PostgreSQL version to figure out which port its running on.
The conf file is generally located in /etc/postgresql/[intended version of postgres]/main

```console
vi /etc/postgresql/11/main/postgresql.conf
```

Check the PORT the particular version of PostgreSQL runs on by default.

Restart PostgreSQL

```console
sudo service postgresql restart
```
Change user to postgres connect to the PostgreSQL server

```console
sudo su - postgres
psql --port PORT
```



## Installing via docker image

### Get the docker image

```shell
docker pull apache/age
```

### On the terminal

```shell
docker run \
    --name myPostgresDb  \
    -p 5455:5432 \
    -e POSTGRES_USER=postgresUser \
    -e POSTGRES_PASSWORD=postgresPW \
    -e POSTGRES_DB=postgresDB \
    -d \
    apache/age
```



| Docker variables | Description                                        |
| ---------------- | -------------------------------------------------- |
| `--name `        | Assign a name to the container                     |
| `-p`             | Publish a container's port(s) to the host          |
| `-e`             | Set environment variables                          |
| `-d`             | Run container in background and print container ID |



## Post Installation

### Per Installation Instructions

After the installation, run the CREATE EXTENSION command to have AGE be installed on the server.

```postgresql
CREATE EXTENSION age;
```

### Per Session Instructions

```postgresql
LOAD 'age';
```

We recommend adding ag_catalog to your search_path to simplify your queries. The rest of this document will assume you have done so. If you do not, remember to add 'ag_catalog' to your cypher query function calls.

```postgresql
SET search_path = ag_catalog, "$user", public;
```

### Optional: allow non-superusers to use Apache AGE

* Non-superusers can only apply LOAD to library files located in `$libdir/plugins/` (see <https://www.postgresql.org/docs/11/sql-load.html>). A symlink can be created to allow non-superusers to LOAD the Apache AGE library:

```console
sudo ln -s /usr/lib/postgresql/11/lib/age.so /usr/lib/postgresql/11/lib/plugins/age.so
```

* In order to use Apache AGE, users need `USAGE` privileges on the `ag_catalog` schema (example for user `db_user`):

```postgresql
GRANT USAGE ON SCHEMA ag_catalog TO db_user;
```
