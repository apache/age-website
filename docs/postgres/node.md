# Node (The Default Postgres Data Structure)

## Overview

Postgres has a default struct that it uses for throughout most of its query processing engine, <a src='https://github.com/postgres/postgres/blob/master/src/include/nodes/nodes.h#L105'>Node</a>. The Node struct is defined as follows:

```
typedef struct Node
{
    NodeTag type;
} Node;
```

The stuct Node and Postgres as a whole take advantage of pointers and how C allocates memory to implement as pseudo inheritance system similar to high level languages such as C++, Java, etc.

<b>NOTE:</b> This is not a datatype that someone using Postgres needs to be concerned about, only someone working with Postgres Internals. Postgres datatypes and the Datum data type will be discussed later.

## What is a Pointer?                                                            
                                                                                 
Unlike a variable a pointer stores the memory address of a variable. In other words, it tells you where in memory something is located. Its a pretty simple concept, that holds a lot of complexity and power within it.

For a full tutorial of pointers you can <a src ='https://www.youtube.com/watch?v=zuegQmMdy8M&ab_channel=freeCodeCamp.org'>watch this tutorial.</a>

For our purposes, the important thing to note about pointers is. All pointers are the same: a 4 byte integer.

You can denote pointers of different types such as:

```                                                                              
int *int_ptr;
char *string_ptr;
myStruct *struct_ptr;
void *void_ptr;
```    
All of these pointers as far a the hardware and memory is concerned are the same: they are 4 byte integer.

## What is a Struct?

A struct is a composite data type that defines a physically group list of variables in one name in a <b>continous</b> block of memory.

If we have a struct defined as:

```                                                                              
typedef struct myStruct                                                              
{                                                                                
    int var1;
    float var2;
    char var3;                                                                
} myStruct;                                                                          
```     

When we allocate room for that struct, a set amount of bytes for the struct will be found in memory and allocated. In our above example, on most modern systems: 4 bytes for var1, 4 bytes for var2 and 1 byte for var3 resulting in 9 bytes total being allocated for the struct, and they will be allocated in the order that they are defined above.


for a further tutorial of structs please review this <a src='https://www.simplilearn.com/tutorials/c-tutorial/structure-in-c'>tutorial.</a>

## Pointers to Structs

When you create a pointer to a struct, what is contained in the pointer is the address of the first byte of the struct. When accessing an element in a struct with a pointer, such as:

```                                                                              
myStruct *str = malloc(sizeof(myStruct));                                        
str->var2 = 1.0;                                                                 
```     

The address of the pointer is offset by the distance that var2 is from the start of the struct. In this case, is adress of the pointer + 4 bytes, to bypass the int field in the struct.

### Void Pointers and Pointer Casting

One of the more unique features that C offers is the void pointer. This offers programmers the ability to pass around pointers without care for the type.

This pointer knows the address in memory that something is located, but it doesn't know what is located there, so:


```  
void myFunction(void *ptr)
{
    ptr->var1 = 1;
}                                                                            
```  

Will throw an error. However, you can cast the void pointer to the pointer of another type.

```                                                                              
void myFunction(void *ptr)                                                                          {                                                                                
    myStruct *str = (myStruct *)ptr;
    str->var1 = 1;                                                               
}                                                                                
```    

Will work. This opens opportunity for developers to create functions that are more versitile that if the developer needs know exactly what something was pointing to and code for all situations. However, developers need to be careful with this feature because it allows for some very strange behavior if the developer does not use them carefully.

Postgres has designed a way to use the power of void pointers, but with certain precautions that make them safer to use.

## How Postgres Uses Structs and Pointers  

Void pointers assume nothing about what the pointer is referencing. The Node struct on the other hand know about one field the <a src='https://github.com/postgres/postgres/blob/REL_11_17/src/include/nodes/nodes.h#L26'>enum NodeType</a>. Nearly all the postgres data structures used in the query processing engine start with this field.

For example, here is the data structure that represents a fucntion call in the parser phase:

``` 
typedef struct FuncCall
{
	NodeTag		type;
	List	   *funcname;		/* qualified name of function */
	List	   *args;			/* the arguments (list of exprs) */
	List	   *agg_order;		/* ORDER BY (list of SortBy) */
	Node	   *agg_filter;		/* FILTER clause, if any */
	struct WindowDef *over;		/* OVER clause, if any */
	bool		agg_within_group;	/* ORDER BY appeared in WITHIN GROUP */
	bool		agg_star;		/* argument was really '*' */
	bool		agg_distinct;	/* arguments were labeled DISTINCT */
	bool		func_variadic;	/* last argument was labeled VARIADIC */
	CoercionForm funcformat;	/* how to display this node */
	int			location;		/* token location, or -1 if unknown */
} FuncCall;
``` 

and here is the data structure that represents a constant in the parser phase.

``` 
typedef struct A_Const
{
	NodeTag		type;
	union ValUnion val;
	bool		isnull;			/* SQL NULL constant */
	int			location;		/* token location, or -1 if unknown */
} A_Const;
``` 


Given that each other these things a function can appear in a large combination of ways:

```
SELECT 1, function_call();
--OR
SELECT function_call(), 1;
```

Many parts of the code don't need to know the specifics, but since each start with NodeTag, these functions can pass Node to each other and not have to care about the details it isn't concerned with.

For example the transformExpr function, which is what converts nodes such as these from parser nodes to their analyze node couterparts:

```
extern Node *transformExpr(ParseState *pstate, Node *expr, ParseExprKind exprKind);
```

Can be used in a generic way, reducing the number of permutations of a function that needs to be created, when something is similar but not exact.

The at points where the differences do matter, the NodeTag can be checked and the correct logic can be run:

``` 
	switch (nodeTag(node))
	{
		case T_FuncCall:
			result = transformColumnRef(pstate, (FuncCall *) node);
			break;
		case T_A_Const:
			result = (Node *) make_const(pstate, (A_Const *) expr);
			break;
``` 

## Extensible Nodes

Postgres offers a unique node in its system, <a src='https://github.com/postgres/postgres/blob/master/src/include/nodes/extensible.h#L32'>ExtensibleNode</a>. With this node we can add extra nodes to Postgres via extensions that age can pass around in the Postgres system.

AGE's custom nodes that utilize this feature can be found <a src='https://github.com/apache/age/blob/master/src/include/nodes/cypher_nodes.h'>here</a>.
