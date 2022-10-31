# Postgres Functions

Recommended Reading: <a href='https://www.amazon.com/Linkers-Kaufmann-Software-Engineering-Programming/dp/1558604960'>"Linkers and Loaders" by John R. Levine</a>

This page is mostly intended to assist the reader in understanding the header: src/include/fmgr.h

For extensions, Postgres offers the support to write <a href='https://www.postgresql.org/docs/current/sql-createfunction.html'>functions</a> in C.

To build a C function for an extension, in the age--1.1.0.sql file, include the line `LANGUAGE c` AND `AS 'MODULE_PATHNAME'` to the function declaration.

For Example:

```sql
CREATE FUNCTION ag_catalog.agtype_in(cstring)
RETURNS agtype
LANGUAGE c
STABLE
RETURNS NULL ON NULL INPUT
PARALLEL SAFE
AS 'MODULE_PATHNAME';
```

Then in the src direction add a function with the argument PG_FUNCTION_ARGS, the return type Datum and PG_FUNCTION_INFO_V1 before the function with the name of the function added as an arugment.

```c
PG_FUNCTION_INFO_V1(agtype_in);

Datum agtype_in(PG_FUNCTION_ARGS)
{
    // Function Body
}
```

## PG_FUNCTION_INFO_V1

PG_FUNCTION_INFO_V1 is a macro that will declare your function as an extern function, declare the function with the correct arguements, and prepend 'Pg_finfo_record' to the function declaration.

```c
#define PG_FUNCTION_INFO_V1(funcname) \
extern Datum funcname(PG_FUNCTION_ARGS); \
extern PGDLLEXPORT const Pg_finfo_record * CppConcat(pg_finfo_,funcname)(void); \
const Pg_finfo_record * \
CppConcat(pg_finfo_,funcname) (void) \
{ \
    static const Pg_finfo_record my_finfo = { 1 }; \
    return &my_finfo; \
} \
extern int no_such_variable
```

## PG_FUNCTION_ARGS

PG_FUNCTION_ARGS is a macro wrapped around the type FunctionCallInfo

```c 
#define PG_FUNCTION_ARGS    FunctionCallInfo fcinfo
```

Which itself is a typedef that is a pointer to FunctionCallInfoData

```c 
typedef struct FunctionCallInfoData *FunctionCallInfo;
```

FunctionCallInfoData contains the contextual information that a function needs to execute. 


```c
/*
 * This struct is the data actually passed to an fmgr-called function.
 *
 * The called function is expected to set isnull, and possibly resultinfo or
 * fields in whatever resultinfo points to.  It should not change any other
 * fields.  (In particular, scribbling on the argument arrays is a bad idea,
 * since some callers assume they can re-call with the same arguments.)
 */
typedef struct FunctionCallInfoData
{
    FmgrInfo   *flinfo;         /* ptr to lookup info used for this call */
    fmNodePtr   context;        /* pass info about context of call */
    fmNodePtr   resultinfo;     /* pass or return extra info about result */
    Oid         fncollation;    /* collation for function to use */
#define FIELDNO_FUNCTIONCALLINFODATA_ISNULL 4
    bool        isnull;         /* function must set true if result is NULL */
    short       nargs;          /* # arguments actually passed */
#define FIELDNO_FUNCTIONCALLINFODATA_ARG 6
    Datum       arg[FUNC_MAX_ARGS]; /* Arguments passed to function */
#define FIELDNO_FUNCTIONCALLINFODATA_ARGNULL 7
    bool        argnull[FUNC_MAX_ARGS]; /* T if arg[i] is actually NULL */
} FunctionCallInfoData;
```

