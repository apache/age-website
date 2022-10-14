# Postgres Query Processing Stages

## Overview

When a query is submitted to Postgres, the server will process the query in 5 stages.

<img src='https://www.interdb.jp/pg/img/fig-3-01.png'>


## Parsing

The first stages is the parser stage. The purpose of this stage in to transform the query given to postgres from a string to adata structure that the rest of the system can understand. 

Commonly known as an <a src='https://en.wikipedia.org/wiki/Abstract_syntax_tree'>abstract syntax tree (AST)</a> this data structed will then be passed to the rest of the system for processing. This stage does no interpretation of the query and only creates the AST and verifies that the user provided a syntatically correct query.

The core of the postgres phase is it's <a src='https://github.com/postgres/postgres/blob/master/src/backend/parser/gram.y'>grammar file.</a>

## Transform/Analyzer

Once the parser stage is complete, the analyze phase will start. The goal of this stage is to interpret what the query is trying to do. What tables are being used, is the query a SELECT, INSERT, UPDATE, or DELETE, what data the user wants returned, etc.

The core of the transform phase is <a src='https://github.com/postgres/postgres/blob/master/src/backend/parser/analyze.c'>src/backend/parser/analyze.c</a>. 

## Optimizer/Planner

The optimizer/planner can be considered two or possibly three phases combined into one.

Once Postgres has figured out what the query wants to do, there is a phase where Postgres tries to optimize the query. 

A given SQL query can be actually executed in a wide variety of different ways, each of which will produce the same set of results. If it is computationally feasible, the query optimizer will examine each of these possible execution plans, ultimately selecting the execution plan that is expected to run the fastest.

The entry point into the optimizer/planner is <a src='https://github.com/postgres/postgres/blob/master/src/backend/optimizer/plan/planner.c#L270'>here.</a>

## Execution

The final stage is when the query is actually executed. Once postgres has created a plan for how to execute the query, this stage will take the query and execute it.

The entry point for the execution phase is <a src='https://github.com/postgres/postgres/blob/master/src/backend/executor/execMain.c'>here.</a>

