# Importing Graph from Files 
You can use the following instructions to create a graph from the files. This document explains 
- information about the current branch that includes the functions to load graphs from files
- explanation of the functions that enable the creation of graphs from files 
- the structure of CSV files that load functions as input, do and do not. 
- A simple source code example to load countries and cities from the files. 


User can load graph in two steps 
- Load Vertices in the first step
- Load Edges in the second step

**User must create graph and labels before loading data from files**

## Load Graph functions 
Following are the details about the functions to create vertices and edges from the file. 

Function `load_labels_from_file` is used to load vertices from the CSV files. 

```postgresql
load_labels_from_file('<graph name>', 
                      '<label name>',
                      '<file path>')
```

By adding the fourth parameter user can exclude the id field. *** Use this when there is no id field in the file***

```postgresql
load_labels_from_file('<graph name>', 
                      '<label name>',
                      '<file path>', 
                      false)
```

Function `load_edges_from_file` can be used to load edges from the CSV file. Please see the file structure in the following. 

Note: make sure that ids in the edge file are identical to ones that are in vertices files. 

```postgresql
load_edges_from_file('<graph name>',
                    '<label name>',
                    '<file path>');
```

## Explanation about the CSV format
Following is the explanation about the structure for CSV files for vertices and edges.

- A CSV file for nodes shall be formatted as following; 

| field name | Field description                                            |
| ---------- | ------------------------------------------------------------ |
| id         | it shall be the first column of the file and all values shall be a positive integer. <br>This is an optional field when `id_field_exists` is ***false***. <br>However, it should be present when `id_field_exists` is ***not*** set to false.  |
| Properties | all other columns contains the properties for the nodes. <br>Header row shall contain the name of property |

- Similarly, a CSV file for edges shall be formatted as follows 

| field name        | Field description                                            |
| ----------------- | ------------------------------------------------------------ |
| start_id          | node id of the node from where the edge is stated. <br>This id shall be present in nodes.csv file. |
| start_vertex_type | class of the node                                            |
| end_id            | end id of the node at which the edge shall be terminated    |
| end_vertex_type   | Class of the node                                            |
| properties        | properties of the edge. the header shall contain the property name |

Example files can be viewed at `regress/age_load/data`

## Example SQL script 

- Load and create graph 
```postgresql
LOAD 'age';

SET search_path TO ag_catalog;
SELECT create_graph('agload_test_graph');
```

- Create label `Country` and load vertices from csv file. *** Note this CSV file has id field ***

```postgresql
SELECT create_vlabel('agload_test_graph','Country');
SELECT load_labels_from_file('agload_test_graph',
                             'Country',
                             'age/regress/age_load/data/countries.csv');
```

- Create label `City` and load vertices from csv file. *** Note this CSV file has id field ***

```postgresql
SELECT create_vlabel('agload_test_graph','City');
SELECT load_labels_from_file('agload_test_graph',
                             'City', 
                             'age/regress/age_load/data/cities.csv');
```

- Create label `has_city` and load edges from csv file.

```postgresql
SELECT create_elabel('agload_test_graph','has_city');
SELECT load_edges_from_file('agload_test_graph', 'has_city',
     'age/regress/age_load/data/edges.csv');
```

- Check if the graph has been loaded properly

```postgresql
SELECT table_catalog, table_schema, table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'agload_test_graph';

SELECT COUNT(*) FROM agload_test_graph."Country";
SELECT COUNT(*) FROM agload_test_graph."City";
SELECT COUNT(*) FROM agload_test_graph."has_city";

SELECT COUNT(*) FROM cypher('agload_test_graph', $$MATCH(n) RETURN n$$) as (n agtype);
SELECT COUNT(*) FROM cypher('agload_test_graph', $$MATCH (a)-[e]->(b) RETURN e$$) as (n agtype);
```

### Creating vertices without id field in the file. 

- Create label `Country2` and load vertices from csv file. *** Note this CSV file has no id field ***

```postgresql
SELECT create_vlabel('agload_test_graph','Country2');
SELECT load_labels_from_file('agload_test_graph',
                             'Country2',
                             'age/regress/age_load/data/countries.csv', 
                             false);
```

- Create label `City2` and load vertices from csv file. *** Note this CSV file has no id field ***
```postgresql
SELECT create_vlabel('agload_test_graph','City2');
SELECT load_labels_from_file('agload_test_graph',
                             'City2',
                             'age/regress/age_load/data/cities.csv', 
                             false);
```
- Check if the graph has been loaded properly and perform difference analysis between ids created automatically and picked from the files.

- Labels `Country` and `City` were created with id field in the file
- Labels `Country2` and `City2` were created with no id field in the file. 
```postgresql
SELECT COUNT(*) FROM agload_test_graph."Country2";
SELECT COUNT(*) FROM agload_test_graph."City2";

SELECT id FROM agload_test_graph."Country" LIMIT 10;
SELECT id FROM agload_test_graph."Country2" LIMIT 10;

SELECT * FROM cypher('agload_test_graph', $$MATCH(n:Country {iso2 : 'BE'})
    RETURN id(n), n.name, n.iso2 $$) as ("id(n)" agtype, "n.name" agtype, "n.iso2" agtype);
SELECT * FROM cypher('agload_test_graph', $$MATCH(n:Country2 {iso2 : 'BE'})
    RETURN id(n), n.name, n.iso2 $$) as ("id(n)" agtype, "n.name" agtype, "n.iso2" agtype);

SELECT * FROM cypher('agload_test_graph', $$MATCH(n:Country {iso2 : 'AT'})
    RETURN id(n), n.name, n.iso2 $$) as ("id(n)" agtype, "n.name" agtype, "n.iso2" agtype);
SELECT * FROM cypher('agload_test_graph', $$MATCH(n:Country2 {iso2 : 'AT'})
    RETURN id(n), n.name, n.iso2 $$) as ("id(n)" agtype, "n.name" agtype, "n.iso2" agtype);

SELECT drop_graph('agload_test_graph', true);
```
