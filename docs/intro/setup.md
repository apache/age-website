# Setup

## Getting AGE

### Releases

The releases and release notes can be found at <https://github.com/apache/age/releases>

### Source code

The source code can be found at <https://github.com/apache/age>

## Installing From Source Code

### Pre-Installation

Install the following essential libraries according to each OS.
Building AGE from source depends on the following Linux libraries (Ubuntu package names shown below):

#### CentOS

```console
yum install gcc glibc glib-common readline readline-devel zlib zlib-devel flex bison
```

#### Fedora

```console
dnf install gcc glibc bison flex readline readline-devel zlib zlib-devel
```

#### Ubuntu

```console
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison
```

### Install Postgres

You will need to install a AGE compatible version of Postgres. AGE supports Postgres 11, 12, 13, 14 and 15.

#### Install From Source Code

You can <a href='https://www.postgresql.org/download/'>download the Postgres source code</a> and install your own instance of Postgres. You can read instructions on how to install from <a href='https://www.postgresql.org/docs/15/installation.html'>source code on the offical Postgres Website</a>

#### Install From a Package Manager

You can use a package management that your OS provides to download Postgres.

#### Ubuntu

##### Postgres 15

```
sudo apt install postgresql-15 postgresql-server-dev-all
```

##### Postgres xx
```
sudo apt install postgresql-xx postgresql-server-dev-all
```

### Installation

Clone the <a href='https://github.com/apache/age'>github repository</a> or <a href='https://github.com/apache/age/releases'>download an official release</a>

Run the pg_config utility and check the version of PostgreSQL. Apache AGE supports all the stable versions of postgresql(11, 12, 13, 14 and 15).

The build process will attempt to use the first path in the PATH environment variable when installing AGE. If the pg_config path is located there, run the following command in the source code directory of Apache AGE to build and install the extension.

```console
make install
```

If the path to your Postgres installation is not in the PATH variable, add the path in the arguments:

```console
make PG_CONFIG=/path/to/postgres/bin/pg_config install
```

### Post Installation AGE Setup


After the installation, open a connection to a running instance of your database and run the `CREATE EXTENSION` command to have AGE installed on the server.

```postgresql
CREATE EXTENSION age;
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

### Per Session Instructions

For every connection of AGE you start you will need to load the AGE extension.

```postgresql
LOAD 'age';
```

We recommend adding `ag_catalog` to your `search_path` to simplify your queries. The rest of this document will assume you have done so. If you do not, remember to add 'ag_catalog' to your cypher query function calls.

```postgresql
SET search_path = ag_catalog, "$user", public;
```

### Allow non-superusers to use Apache AGE

* Non-superusers can only apply `LOAD` to library files located in `$libdir/plugins/` (see <https://www.postgresql.org/docs/15/sql-load.html>). A symlink can be created to allow non-superusers to `LOAD` the Apache AGE library:

```console
sudo ln -s /usr/lib/postgresql/15/lib/age.so /usr/lib/postgresql/15/lib/plugins/age.so
```

* In order to use Apache AGE, users need `USAGE` privileges on the `ag_catalog` schema (example for user `db_user`):

```postgresql
GRANT USAGE ON SCHEMA ag_catalog TO db_user;
```
