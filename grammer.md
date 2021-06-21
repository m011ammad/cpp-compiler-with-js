# Grammer
this file was created to understand the grammer used in syntaxAnalyzer.

```js
// the meaning of E is empty
stmt => id=expr;
    | defineFunc
    | ifElseFunc
    | while(expr) stmt;
    | do stmt while (expr);
    | for(optepr; optepr; optepr) stmt
    | {stmts}
stmts => stmts | stmt

expr => term exprPrim
exprPrim => + term exprPrim | - term exprPrim | &&term exprPrime | ||term exprPrime | E
term => factor termPrime
termPrime => *factor termPrime | /factor termPrime | E
factor => number | (expr) | id
ro => =< | => | == | != | > | <
optexpr => expr | E\

defineFunc => type id numPrime | defineFunc
type => int | float | bool | string | etc
numPrime => num | E

stmtFunc => stmt primeFunc | E
stmtFunc -> stmt stmtPrime | E

if else => matched-stmt | unmatched-stmt

matched-stmt   => if expr then matched-stmt else matched-stmt | stmt
unmatched-stmt => if expr then ifelse | if expr then matched-stmt else unmatched-stmt

```