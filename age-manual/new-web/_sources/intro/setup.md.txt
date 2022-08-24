# Setup

## Getting AGE

### Releases

The releases and release notes can be found at <https://github.com/apache/incubator-age/releases>

### Source code

The source code can be found at <https://github.com/apache/incubator-age>

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

The build process will attempt to use the first path in the PATH environment variable when installing AGE. If the pg_config path is located there, run the following command in the source code directory of Apache AGE to build and install the extension.

```console
make install
```

If the path to your Postgres installation is not in the PATH variable, add the path in the arguments:

```console
make PG_CONFIG=/path/to/postgres/bin/pg_config install
```

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
