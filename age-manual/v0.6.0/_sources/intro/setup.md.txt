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
