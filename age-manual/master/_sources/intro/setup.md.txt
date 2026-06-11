# Setup

## Getting Apache AGE

### Releases

The releases and release notes can be found at [Apache AGE Releases](https://github.com/apache/age/releases).

### Source Code

The source code can be found at [Apache AGE GitHub Repository](https://github.com/apache/age).

## Installing From Source Code

### Pre-Installation

Before building Apache AGE from source, ensure that the following essential libraries are installed based on your operating system:

#### CentOS

```bash
yum install gcc glibc glib-common readline readline-devel zlib zlib-devel flex bison
```

#### Fedora

```bash
dnf install gcc glibc bison flex readline readline-devel zlib zlib-devel
```

#### Ubuntu

```bash
sudo apt-get install build-essential libreadline-dev zlib1g-dev flex bison
```

### Install PostgreSQL

You will need to install a PostgreSQL version compatible with Apache AGE. Apache AGE supports PostgreSQL versions 11, 12, 13, 14, and 15.

#### Install From Source Code

You can download the PostgreSQL source code from [PostgreSQL Downloads](https://www.postgresql.org/download/) and install your own instance of PostgreSQL. Refer to the [official PostgreSQL installation guide](https://www.postgresql.org/docs/15/installation.html) for instructions on installing from source code.

#### Install From a Package Manager

You can use a package manager provided by your operating system to download and install PostgreSQL.

##### Ubuntu

```bash
sudo apt install postgresql-15 postgresql-server-dev-all
```

Replace `15` with the desired PostgreSQL version if different.

### Installation

Clone the [Apache AGE GitHub repository](https://github.com/apache/age) or [download an official release](https://github.com/apache/age/releases).

Navigate to the source code directory of Apache AGE and run the following command to build and install the extension:

```bash
make install
```

If the path to your PostgreSQL installation is not in the PATH variable, specify the path to `pg_config` using the `PG_CONFIG` argument:

```bash
make PG_CONFIG=/path/to/postgres/bin/pg_config install
```

## Installing via Docker Image

### Get the Docker Image

```bash
docker pull apache/age
```

### Run Apache AGE Container

```bash
docker run \
    --name myPostgresDb  \
    -p 5455:5432 \
    -e POSTGRES_USER=postgresUser \
    -e POSTGRES_PASSWORD=postgresPW \
    -e POSTGRES_DB=postgresDB \
    -d \
    apache/age
```

| Docker Variables | Description                                        |
| ---------------- | -------------------------------------------------- |
| `--name `        | Assign a name to the container                     |
| `-p`             | Publish container's port(s) to the host            |
| `-e`             | Set environment variables                          |
| `-d`             | Run container in background and print container ID |

## Post-Installation Setup

### Per Session Instructions

For every connection to Apache AGE, load the AGE extension:

```sql
LOAD 'age';
```

Add `ag_catalog` to the `search_path` to simplify queries:

```sql
SET search_path = ag_catalog, "$user", public;
```

### Allow Non-Superusers to Use Apache AGE

To allow non-superusers to use Apache AGE:

1. Create a symlink to allow non-superusers to load the Apache AGE library:
   
   ```bash
   sudo ln -s /usr/lib/postgresql/15/lib/age.so /usr/lib/postgresql/15/lib/plugins/age.so
   ```

   Replace `/usr/lib/postgresql/15/lib/` with the appropriate path to the PostgreSQL library directory.

2. Grant `USAGE` privileges on the `ag_catalog` schema to the desired user (e.g., `db_user`):

   ```sql
   GRANT USAGE ON SCHEMA ag_catalog TO db_user;
   ```
