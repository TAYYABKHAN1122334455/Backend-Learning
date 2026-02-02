function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}


module.exports = {
    add,
    subtract,
    divide,
    multiply
};


/*
1. Why this is used in real projects

Real problems it solves

Code becomes too big in one file

Files start depending on hidden things

Same logic copied in many places

Hard to change one thing safely

If we don’t use modules

Globals clash and break things

Order of files matters → random bugs

Refactor becomes scary

Team work becomes painful

Modules = control who can use what

2. How to think about it (mental model)

Think one file = one box.

Flow

App starts

JS finds all import first

Needed files load once

Code inside module runs

Exports are shared

Important

Import runs before your logic

A module runs only one time

Data is shared, not copied

3. Where it is used in a project

Frontend

components

utils

api files

state / store

Backend

routes

controllers

services

config files

DevOps / Tools

build config

env loaders

If project has folders → it has modules.

4. How developers usually use it

Normal pattern

One job per file

Import at top

Export only what is needed

Input

Functions

Config

Data objects

Output / effect

Reusable logic

Shared state

Side effects (danger zone)

Rule:
If importing a file changes app behavior, be careful.

5. Common mistakes (VERY IMPORTANT)

Beginner mistakes

Mixing require and import

Wrong file path

Forgetting file extension (Node)

Silent bugs

Circular imports

undefined export

Mutating shared object

Security / performance

Heavy logic at file top

Secrets loaded on import

DB calls inside module load

Top-level code runs even if you don’t use it.

6. Debugging checklist

Check first

Is the file loaded?

Is export undefined?

Is code running too early?

Log

Top of module

Imported value shape

Execution order

How seniors debug

Remove side effects

Break circular imports

Isolate module

Mock the import

Random bug = usually load order or circular import

7. When NOT to use it

Overkill

Small script

One-time task

Tiny demo

Better options

Same file function

Simple object

Direct config

Don’t create files just to feel “clean”.

8. Memory anchors (1-page recall)

Modules run once

Imports run first

Exports are shared

Circular imports are dangerous

Top-level code is risky

*/