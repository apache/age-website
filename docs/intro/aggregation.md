# Aggregation

Generally an aggregation aggr(expr) processes all matching rows for each aggregation key found in an incoming record (keys are compared using equivalence).

For a fixed aggregation key and each matching record, expr is evaluated to a value. This yields a listof  candidate  values.  Generally  the  order  of  candidate  values  is  unspecified.  If  the  aggregation happens  in  a  projection  with  an  associated  ORDER  BY  subclause,  the  list  of  candidate  values  isordered  in  the  same  way  as  the  underlying  records  and  as  specified  by  the  associated  ORDER  BY subclause.

In  a  regular  aggregation  (i.e.  of  the  form  aggr(expr)),  the  list  of  aggregated  values  is  the  list  of candidate values with all null values removed from it.In a distinct aggregation (i.e. of the form aggr(DISTINCT expr)), the list of aggregated values is the listof  candidate  values  with  all  null  values  removed  from  it.  Furthermore,  in  a  distinct  aggregation,only  one  of  all  equivalent  candidate  values  is  included  in  the  list  of  aggregated  values,  i.e. duplicates  under  equivalence  are  removed.  However,  if  the  distinct  aggregation  happens  in  aprojection  with  an  associated  ORDER  BY  subclause,  only  one  element  from  each  set  of  equivalentcandidate values is included in the list of aggregated values.

Finally, the remaining aggregated values are processed by the actual aggregation function. If the list of aggregated  values  is  empty,  the  aggregation  function  returns  a  default  value  (null  unlessspecified  otherwise  below).  Aggregating  values  of  different  types  (like  summing  a  number  and  astring) may lead to runtime errors.

See 

aggregation functions for more details.
