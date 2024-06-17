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



|     |
| --- |
|     |



#### Setup



To use the "age" library, you will need to install it, so, in the same directory, there's a setup.py file. Execute it with



|     |
| --- |
|     |



Now we're ready to use Apache AGE in Python!

#### Starting the server



But first, be sure to put your postgres server to run. I prefer using Docker, so issue this command:



|     |
| --- |
|     |



#### Writing the Python Code



Here is a sample Python script to connect to the PostgreSQL database, create a graph, and perform basic operations using Apache AGE.



|     |
| --- |
|     |



#### Step 4: Running the Script



* Save the code to a file, for example, age_integration.py.
* Run the script:



|     |
| --- |
|     |



It should output something close to this:



|     |
| --- |
|     |



#### Conclusion



Integrating Apache AGE with Python allows you to utilize powerful graph database features within your Python applications. By following this guide, you can set up the integration, run queries, and manage graph data efficiently. This integration opens up new possibilities for handling complex relationships and structures in your data.

If you run into any problems, don't hesitate to reach out.



<!--EndFragment-->