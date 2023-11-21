# Predicate Functions

Predicates are boolean functions that return true or false for a given set of input. They are most commonly used to filter out subgraphs in the WHERE part of a query.


## Exists(Property)

`exists()` returns `true` if the specified property exists in the node, relationship or map. This is different from the `EXISTS` clause.

Syntax: `exists(property)`

Returns:

An agtype boolean

Arguments:


<table>
  <tr>
   <td>Name
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>property
   </td>
   <td>A property from a vertex or edge
   </td>
  </tr>
</table>


Query


```postgresql
SELECT *
FROM cypher('graph_name', $$
     MATCH (n)
     WHERE exists(n.surname)
     RETURN n.first_name, n.last_name
$$) as (first_name agtype, last_name agtype);
```


Results:


<table>
  <tr>
   <td>first_name
   </td>
   <td>last_name
   </td>
  </tr>
  <tr>
   <td>‘John
   </td>
   <td>‘Smith’
   </td>
  </tr>
  <tr>
   <td>‘Patty’
   </td>
   <td>‘Patterson’
   </td>
  </tr>
  <tr>
   <td colspan="2" >2 row(s) returned
   </td>
  </tr>
</table>


## Exists(Path)

`EXISTS(path)` returns `true` if for the given path, there already exists the given path.

```postgresql
SELECT *
FROM cypher('graph_name', $$
     MATCH (n)
     WHERE exists((n)-[]-({name: 'Willem Defoe'}))
     RETURN n.full_name
$$) as (full_name agtype);
```

Results:
<table>
  <tr>
   <td>full_name
   </td>
  </tr>
  <tr>
   <td>‘Toby Maguire'
   </td>
  </tr>
  <tr>
   <td>‘Tom Holland’
   </td>
  </tr>
  <tr>
   <td colspan="2" >2 row(s) returned
   </td>
  </tr>
</table>

