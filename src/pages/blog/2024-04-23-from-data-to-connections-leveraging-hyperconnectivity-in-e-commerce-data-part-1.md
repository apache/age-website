---
templateKey: blog-post
title: "From Data to Connections: Leveraging Hyperconnectivity in E-commerce
  Data (Part 1.)"
date: 2024-04-23T02:11:47.653Z
description: "From Data to Connections: Leveraging Hyperconnectivity in E-commerce Data (Part 1.)"
featuredpost: true
featuredimage: 
---


<!--StartFragment-->

Hyper-connectivity implies that everything is connected â€” people, data, and things â€” depending on the development of the internet, communication technologies, and more. When individuals generate data from various sources, such as technology or environmental sensors, the resultant connection networks are referred to as the hyper-connected society. With this heightened level of connectivity, there is significant potential to drive innovation and transformation in all aspects of society. In other words, hyper-connectivity is a term that describes the logical and interrelated connection of data throughout all services and devices.

E-commerce is an example of where the data transform into connections among people (customers & sellers), data, and things (products.) It implements the commercial process of buying and selling over the Internet, moreover, oversees the production and consumption process. In this article, we'll build the concept of Hyper-connectivity by taking E-commerce sample data and let you see the data in action!

##### Data Modeling with Relational Database

Below is a table around a hypothetical customer's purchases at shopping mall A modeled in Relational Database, including products, stores, payment information, and the embedding relationships between stores.

![img](../../img/b-028.webp)

Figure 1. RDB Modeling with Payment Sample Data Table

To achieve hyper-connectivity among datasets, it is crucial to understand the relationships between them. This is where the 'JOIN' method comes into play for analyzing tables. An entity-relationship diagram (ERD) visualizes real-world data and facilitates the connections between tables of varying natures. The relational database not only enables to comprehend the flow of data between tables, but also uncovers the relationships among tables.

##### Data Modeling with Graph Database

A graph database is a NoSQL database that stores and manages relationships in the form of visualization using 'nodes' and 'edges'. These databases enable hyperconnectivity by searching the relationships between data.

![img](../../img/b-029.webp)

##### Querying Graph Relationship

A graph database provides a more efficient way to query data connected in a hyperconnected system. For example, Apache AGE provides a hybrid of table and graph data operations, allowing you to write intuitive queries such as Cypher (a graph query) along with SQL. Let's see how to extract and retrieve it using both Cypher and SQL.

##### Querying the Single Relationships

First, we can ask simple questions to find out what products customers buy and what services they use.

![img](../../img/b-030.webp)

Figure 3. Relationship Querying for Graph Relationships in Apache AGE

The above query is a graph query (Cypher) that traverses the graph to extract the relationship in the â€œmatch (a: customer)-\[r]-(b: product)â€ clause and what product the customer buys. The graph query extracts the graph relationships and utilizes the hybrid query, â€œselect\~â€ and â€œfrom\~â€ clauses available in Apache AGE to make the graph output easier to manipulate for users unfamiliar with graph databases.

##### Querying the Complex Relationships

You can also use Apache AGE to query for complex queries. In addition to the customer who bought the example product above, you can query complex relationships such as which product they bought, what product category, which bank they used, and more.

![img](../../img/b-031.webp)

Figure 4. Sophisticated Relationship Querying for Graph Relationships in Apache AGE

In the MATCH clause, you can search the path you want to extract. In the {"(a: customer)-\[r1]-(b: bank {name: 'AGE bank'})"} clause, you can query what bank they used; in the (a)-\[r3]-(d: card) clause, what card they used, and in the (a)-\[r4]-(e: product)-\[r5]-(f:category_3) clause, what products they bought and what product category they belong to. These allow us to explore complex relationships and extract which customers have the same card, bank, and more.

As seen above, graph database queries exhibit hyperconnectivity implementation much more efficiently. Notably, Apache AGE stands out as a database with its hybrid query capability, enabling many including non-experts in graph queries and derive results using SQL. Being a PostgreSQL extension, Apache AGE offers the flexibility to leverage extensions tailored to specific situations and domains, enhancing its practicality and adaptability.

Are you interested in learning more about Apache AGE? [Learn More Now](http://agedb.io/From-Data-to-Connections-Leveraging-Hyperconnectivity-in-E-commerce-Data.jsp#).

<!--EndFragment-->