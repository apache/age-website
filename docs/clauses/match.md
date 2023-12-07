# MATCH

The `MATCH` clause allows you to specify the patterns a query will search for in the database. This is the primary way of retrieving data for use in a query.

 A `WHERE` clause often follows a `MATCH` clause to add user-defined restrictions to the matched patterns to manipulate the set of data returned. The predicates are part of the pattern description, and should not be considered a filter applied only after the matching is done. This means that `WHERE` should always be put together with the `MATCH` clause it belongs to.

MATCH can occur at the beginning of the query or later, possibly after a `WITH`. If it is the first clause, nothing will have been bound yet, and Cypher will design a search to find the results matching the clause and any associated predicates specified in any `WHERE` clause. Vertices and edges found by this search are available as bound pattern elements, and can be used for pattern matching of sub-graphs. They can also be used in any future clauses, where Cypher will use the known elements, and from there find further unknown elements.

Cypher is a declarative language, and so typically the query itself does not specify the algorithm to use to perform the search. Predicates in `WHERE` parts can be evaluated before pattern matching, during pattern matching, or after the match is found.


## Basic vertex finding


### Get all Vertices

By specifying a pattern with a single vertex and no labels, all vertices in the graph will be returned.

Query

```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (v)
RETURN v
$$) as (v agtype);
```


Returns all vertices in the database.


<table>
  <tr>
   <td><strong>v</strong>
   </td>
  </tr>
  <tr>
   <td>{id: 0; label: ‘Person’; properties: {name: ‘Charlie Sheen’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 1; label: ‘Person’; properties: {name: ‘Martin Sheen’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 2; label: ‘Person’; properties: {name: ‘Michael  Douglas’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 3; label: ‘Person’; properties: {name: ‘Oliver Stone’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 4; label: ‘Person’; properties: {name: ‘Rob Reiner’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 5; label: ‘Movie’; properties: {name: ‘Wall Street’}}::vertex
   </td>
  </tr>
  <tr>
   <td>{id: 6; label: ‘Movie’; properties: {title: ‘The American President’}}::vertex
   </td>
  </tr>
  <tr>
   <td>7 row(s) returned
   </td>
  </tr>
</table>



### Get all vertices with a label

Getting all vertices with a label is done with a single node pattern where the vertex has the label specified as follows:

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (movie:Movie)
RETURN movie.title
$$) as (title agtype);
```


Returns all the movies in the database.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
  </tr>
  <tr>
   <td>‘Wall Street’
   </td>
  </tr>
  <tr>
   <td>‘The American President’
   </td>
  </tr>
  <tr>
   <td>2 row(s) returned
   </td>
  </tr>
</table>



### Related Vertices

The symbol `-[]-` specifies an edge, without specifying the type or direction of the edge.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (director {name: 'Oliver Stone'})-[]-(movie)
RETURN movie.title
$$) as (title agtype);
```


Returns all the movies directed by 'Oliver Stone'.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
  </tr>
  <tr>
   <td>‘Wall Street’
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



### Match with labels

To constrain your pattern with labels on vertices, add it to the vertex in the pattern, using the label syntax.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (:Person {name: 'Oliver Stone'})-[]-(movie:Movie)
RETURN movie.title
$$) as (title agtype);
```


Returns any vertices connected with the `Person` 'Oliver' that are labeled `Movie`.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
  </tr>
  <tr>
   <td>‘Wall Street’
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



## Edge basics


### Outgoing Edges

To return directed edges, you may use `->` or `<-` to specify the direction of which the edge points.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (:Person {name: 'Oliver Stone'})-[]->(movie)
RETURN movie.title
$$) as (title agtype);
```


Returns any vertices connected with the `Person` 'Oliver' by an outgoing edge.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
  </tr>
  <tr>
   <td>‘Wall Street’
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



### Directed Edges and variable
 
If a variable is required, either for filtering on properties of the edge, or to return the edge, specify the variable within the edge or vertex you wish to use.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (:Person {name: 'Oliver Stone'})-[r]->(movie)
RETURN type(r)
$$) as (title agtype);
```


Returns the type of each outgoing edge from 'Oliver'.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
  </tr>
  <tr>
   <td>‘DIRECTED’
   </td>
  </tr>
  <tr>
   <td>1 row(s) returned
   </td>
  </tr>
</table>



### Match on edge label

When you know the edge label you want to match on, you can specify it by using a colon together with the edge label.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH (:Movie {title: 'Wall Street'})<-[:ACTED_IN]-(actor)
RETURN actor.name
$$) as (actors_name agtype);
```


Returns all actors that `ACTED_IN` 'Wall Street'.


<table>
  <tr>
   <td><strong>actors_name</strong>
   </td>
  </tr>
  <tr>
   <td>‘Charlie Sheen’
   </td>
  </tr>
  <tr>
   <td>‘Martin Sheen’
   </td>
  </tr>
  <tr>
   <td>‘Michael  Douglas’
   </td>
  </tr>
  <tr>
   <td>3 row(s) returned
   </td>
  </tr>
</table>



### Match on edge label with a variable

If you want to use a variable to hold the edge, and specify the edge label you want, you can do so by specifying them both.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
MATCH ({title: 'Wall Street'})<-[r:ACTED_IN]-(actor)
RETURN r.role
$$) as (role agtype);
```


Returns `ACTED_IN` roles for 'Wall Street'.


<table>
  <tr>
   <td><strong>role</strong>
   </td>
  </tr>
  <tr>
   <td>‘Gordon Gekko’
   </td>
  </tr>
  <tr>
   <td>‘Carl Fox’
   </td>
  </tr>
  <tr>
   <td>‘Bud Fox’
   </td>
  </tr>
  <tr>
   <td>3 row(s) returned
   </td>
  </tr>
</table>



### Multiple Edges

Edges can be strung together to match an infinite number of edges. As long as the base pattern `()-[]-()` is followed, users can chain together edges and vertices to match specific patterns.

Query


```postgresql
SELECT * FROM cypher('graph_name', $$
    MATCH (charlie {name: 'Charlie Sheen'})-[:ACTED_IN]->(movie)<-[:DIRECTED]-(director)
    RETURN movie.title, director.name
$$) as (title agtype, name agtype);
```


Returns the movie 'Charlie Sheen' acted in and its director.


<table>
  <tr>
   <td><strong>title</strong>
   </td>
   <td><strong>name</strong>
   </td>
  </tr>
  <tr>
   <td>‘Wall Street’
   </td>
   <td>‘Oliver Stone’
   </td>
  </tr>
  <tr>
   <td colspan="2" >1 row(s) returned
   </td>
  </tr>
</table>


## Variable Length Edges

When the connection between two vertices is of variable length, the list of edges that form the connection can be returned using the following connection.

### Introduction

Rather than describing a long path using a sequence of many vertex and edge descriptions in a pattern, many edges (and the intermediate vertices) can be described by specifying a length in the edge description of a pattern.

```
(u)-[*2]->(v)
```

Which describes a right directed path of three vertices and two edges can be rewritten to:

```
(u)-[]->()-[]->(v)
```

A range length can also be given:


```
(u)-[*3..5]->(v)
```

Which is equivalent to:

```
(u)-[]->()-[]->()-[]->(v) and
(u)-[]->()-[]->()-[]->()-[]->(v) and
(u)-[]->()-[]->()-[]->()-[]->()-[]->(v)
```

The previous example provided gave the edge both an lower and upper bound for the number of edges (and vertices) between `u` and `v`. Either one or both of these binding values can be excluded.


```
(u)-[*3..]->(v)
```

Returns all paths between `u` and `v` that have three or more edges included.

```
(u)-[*..5]->(v)
```

Returns all paths between `u` and `v` that have 5 or fewer edges included.

```
(u)-[*]->(v)
```

Returns all paths between `u` and `v`.


### Example


Query


```postgresql
SELECT * FROM cypher('graph_name', $$
    MATCH p = (actor {name: 'Willam Dafoe'})-[:ACTED_IN*2]-(co_actor)
    RETURN relationships(p)
$$) as (r agtype);
```


Returns the list of edges, including the one that Willam Dafoe acted in and the two Spiderman actors he worked with.


<table>
  <tr>
   <td><strong>r</strong>
   </td>
  </tr>
  <tr>
   <td>[{id: 0; label:"ACTED_IN"; properties: {role: "Green Goblin"}}::edge, {id: 1; label: "ACTED_IN; properties: {role: "Spiderman", actor: "Toby Maguire}}::edge]
   </td>
  </tr>
  <tr>
   <td>[{id: 0; label:"ACTED_IN"; properties: {role: "Green Goblin"}}::edge, {id: 2; label: "ACTED_IN; properties: {role: "Spiderman", actor: "Andrew Garfield"}}::edge]
   </td>
   </td>
  </tr>
  <tr>
   <td colspan="2" >2 row(s) returned
   </td>
  </tr>
</table>

