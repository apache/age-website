---
templateKey: docs-template
path: /contribution/guide
title:
---

<div class="DeveloperGuidelines">

# Developer Guidelines

Table of Contents

- [Code Review Process](#code-review-process)
- [How to Merge a Pull Request](#how-to-merge-pull-request)
- [Coding Style Guide](#code-style-guilde)
- [Creating Documentation](#creating-documentation)

<h2 id="code-review-process">Code Review Process (To be updated)</h2>

- Make a commit (or multiple commits) on your local branch.
- Create .patch file(s) of the commit(s).
  - Use git format-patch command.
- Send the .patch file(s) to the reviewer.
  - The title of the email must be "[Review] [JIRA Ticket Name Here] summary-of-the-issue"
    (e.g. [Review] [JIRA Ticket Name] Support changing graph name)
    - If the commit is not for any issues on JIRA, omit " [JIRA Ticket Name Here]". OR make a IRA ticket
  - The email body will look like this:
    ```
    Commit bef50e5d86d45707806f5733695a229f3e295b1a
    [one blank line]
    Description
    ```
    - The first line is the hash code of the base commit, NOT the commit you've created.
    - This will help reviewers to quickly apply the .patch files.
    - Put proper information to help the reviewer.
  - Attach .patch files.
    - Do NOT rename files. They are named with numbers in order.
    - Do NOT compress them unless the total file size is over 5MB.
- Reply to the last email in the same thread to send a review of it.
  - You can attach some .diff files.
- Reply to the last email in the same thread to send updated patch(es) and opinions.
  - If you rebase commits, state the hash code of the new base commit.
- Repeat 4 and 5.

<h2 id="how-to-merge-pull-request">How to Merge a Pull Request</h2>

### Single Commit for a Single Task

In this case, the commit will be merged into the master branch with the following process.

1. Change the current working branch to the local master branch by running the following command.

```
$ git checkout master
```

2. Make the local master branch up-to-date by running the following command (or any other commands that result the same.)

```
$ git pull
```

3. Change the current working branch to the local task branch that the commit resides in by running the following command.

```
$ git checkout
```

4. Rebase the local task branch by running the following command.

```
$ git rebase master
```

5. Resolve any conflicts that occur during rebase.
6. Change the current working branch to the local master branch by running the following command.

```
$ git checkout master
```

7. Merge the local task branch into the local master branch by running the following command.

```
$ git merge
```

### Multiple Commits for a Single Task

Keeping Commit History

Sometimes, having logically separated, multiple commits for a single task helps developers to grasp the logical process of the work that had been done for the task. If the commits are merged with fast-forward strategy, the commits will not be grouped together. Therefore, to group the commits, create an explicit merge commit.

In this case, the commits will be merged into the master branch with the same process above except the last step (step 7).

For the last step, the local task branch will be merged into the local master branch with an explicit merge commit by running the following command. If you omit --no-ff option, the command will do fast-forward merge instead.

```
$ git merge --no-ff
```

The above process will result, for example, the following commit history. (This is captured from apache/incubator-age.) There is an explicit merge commit, 69f3b32. Each explicit merge commit groups related commits.

```
* 9779a0b Implement property and element access operators
*   69f3b32 Implement + (concatenating strings) operator
|\
| * ab50b5c Support Floating Point Precision in String Operators
| * cceebcd Implement String Operators
|/
* 6c36b80 Fix failed assertion when agtype_build_map() takes agtype as key
* 304bc68 Refactor bool_to_agtype()

```

Note: There is no commit between an explicit merge commit and the parent commit, which is on the master branch, of the explicit merge commit. This is done by doing rebase before merge.

<h2 id="code-style-guilde">Code Style Guide</h2>

For a full list of coding style guidelines, please refer to the style setup in the clang-format.5 in the AGE git repository.

### Indentation

Use 4 spaces per indentation level. (no tab character)

- You can see the same indentation in all environments.
  For switch statement, see below.

```
switch (suffix) {
    case 'G':
    case 'g':
        mem <<= 30;
        break;
    case 'M':
    case 'm':
        mem <<= 20;
        break;
    case 'K':
    case 'k':
        mem <<= 10;
        // fall through
    default:
        break;
}
```

### Breaking long lines and strings

The line length limit is 79 columns, except for strings longer than 79 characters.

### Placing Braces and Spaces

All braces are on their own line solely. See below.

```
int function(int x)
{
    body of function
}

struct s
{
    int a;
    int b;
}

if (x is true)
{
    we do a
}
else if (y is true)
{
    we do b
}
else
{
    we do c
    we do d
}
```

If all the bodies of if/else statement contain a single line, omit braces. See below.

```

if (x is true)
    we do a

if (y is true)
    we do b
else
    we do c

```

One exception is do statement. See the following example.

```
do
{
    body of do-loop
} while (condition);
```

### Naming

Use the underscore name convention for all variables, functions, structs, enums and define macros.

### Typedefs

Use typedef only for struct and enum. It must not be used for pointer types.

### Commenting

For multi-line comments, use C style multi-line comments.
For single-line comments, use C++ style single-line comments.
See below.

```
/*
 * This function
 * does x
 */
void f(void)
{
    // This is to check...
    if (y is true)
        we do b

    /*
     * We need to do this here
     * because of ...
     */
    for (;;)
}

```

### Macros, Enums, and RTL

Don't align bodies of macros.

- If names are changed or new entries are added, it may produces unnecessary diffs and this makes it harder for you to find lines that are actually modified

```

//do this
#define Anum_ag_graph_name 1
#define Anum_ag_graph_namespace 2

//not this
#define Anum_ag_graph_name      1
#define Anum_ag_graph_namespace 2

```

When you write a macro that spans multiple lines, don't align \ character.

- If bodies of macros are modified, it may produce unnecessary diffs and this makes it harder for you to find lines that are actually modified.
- It is harder for you to find lines that are actually modified.

```

// do this
#define f() \
    do \
    { \
        run(); \
    } while (0)

// not this
#define f()     \
    do          \
    {           \
        run();  \
    } while (0)

```

### Newlines
For newlines, only \n is allowed, not \r\n and \r.
### Conditions
If a pointer variable (including List *) is used as a condition, which means that it is evaluated as true/false value, use it AS-IS. Do not perform explicit comparison with NULL (or NIL). For negation, put ! before it.
### Rules for ereport()
An error message that is passed to ```errmsg()``` starts with a lower case letter.
An error detail/hint message that is passed to ```errdetail()/errhint()``` starts with an upper case letter.

<h2 id="creating-documentation">Creating Documentation</h2>

The documentation is maintained at [link](https://github.com/apache/age-website). It includes [more information](https://github.com/apache/incubator-age-website#readme) on how the documentation workflow works.

</div>
