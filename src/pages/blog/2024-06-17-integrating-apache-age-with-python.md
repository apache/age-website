---
templateKey: blog-post
title: Integrating Apache AGE with Python
date: 2024-06-17T07:00:30.672Z
description: Integrating Apache AGE with Python
featuredpost: true
featuredimage: /img/to-be-continued...png
---
<!--StartFragment-->

Apache AGE (A Graph Extension) is a PostgreSQL extension that provides graph database functionality. Integrating Apache AGE with Python allows you to leverage this functionality within your Python applications. This guide will walk you through the process of setting up the integration and running a sample code.

#### Prerequisites

For this task, we will use the Apache AGE Docker image.

So before you begin, ensure you have the following installed:

* Docker;
* Apache AGE image already pulled and executed once (Refer to past tutorials for this);
* Python (version 3.9 or later);

You will need psycopg2 and antlr4-python3 packages to run it. You can install them by executing the requirements.txt file inside the directory age/drivers/python.

To do so, navigate to the said python driver directory, then run

pip install -r requirements.txt

#### Testing

You can test if everything is working by issuing the command at the same directory:

```python
python test_age_py.py \
	-host "127.0.0.1" \
	-db "postgres" \
	-u "postgres" \
	-pass "agens" \
	-port 5432 \
	-gn "test_graph"
```

<!--EndFragment-->

#### Setup

To use the "age" library, you will need to install it, so, in the same directory, there's a setup.py file. Execute it with

```
python setup.py install
```

Now we're ready to use Apache AGE in Python!

#### Starting the server

But first, be sure to put your postgres server to run. I prefer using Docker, so issue this command:

```
docker start age
```

#### Writing the Python Code

Here is a sample Python script to connect to the PostgreSQL database, create a graph, and perform basic operations using Apache AGE.

```
import age

GRAPH_NAME = "test_graph"

""" 
Define the connection parameters (host, port, database name, user, and password).
Here, we use the default Apache AGE Docker container settings
"""
CONFIG = (
    "host=127.0.0.1 \
    port=5455 \
    dbname=postgresDB \
    user=postgresUser \
    password=postgresPW"
)

try:
    # Establish a connection to the PostgreSQL database using the defined parameters.
    connection = age.connect(graph=GRAPH_NAME, dsn=CONFIG)
    
    # The Cypher query `CREATE (n:Person {name: 'Maria'}) RETURN n` creates a node with the label `Person` and a property `name` set to 'Maria'.
    query = "CREATE (n:Person {name: 'Maria'}) RETURN n"

    # The `execCypher` method sends the query to the database.
    cursor = connection.execCypher(query)

    # Print the results
    for row in cursor:
        print("CREATED: ", row[0])

    # Save the changes to the database.
    connection.commit()

except Exception as e:
    print(f"Error: {e}")
    connection.rollback()
finally:
    # Clean up: delete the graph and close the connection
    age.deleteGraph(connection.connection, GRAPH_NAME)
    cursor.close()
    connection.close()
```

#### Step 4: Running the Script

* Save the code to a file, for example, age_integration.py.
* Run the script:

```
python age_integration.py
```

It should output something close to this:

```
CREATED:  {label:Person, id:844424930131969, properties:{name: Maria, }}::VERTEX
```

#### Conclusion

Integrating Apache AGE with Python allows you to utilize powerful graph database features within your Python applications. By following this guide, you can set up the integration, run queries, and manage graph data efficiently. This integration opens up new possibilities for handling complex relationships and structures in your data.

If you run into any problems, don't hesitate to reach out.

<!--EndFragment-->