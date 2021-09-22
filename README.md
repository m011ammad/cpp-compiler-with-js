# cpp-compiler-with-js
A JavaScript Program to lexical and syntax analyse C++ program. It Uses various Regular Expressions to create tokens for keywords, identifiers, strings, functions etc.\
Note: a compiler consists of several sections. this project includes lexical analysis and syntax analysis.

## How to use?
open index.html with your browser and then open the console or run it with node or another way.\
now you should see all the results in the console.\
you can see the token table at the top of the console and then logs at the bottom.\
add your input in initial Input at the top of the lexicalAnalyzer.js and then see the logs as results

## how it's work?
in the lexicalAnalyzer, an input convet to a table of tokens.\
then in the syntaxAnalyzer this table entered as input and tries to parse the input by using the defined functions and login of grammers and Finite Automata Construction and etc ...

## Project structure
this project consists of 2 main files. LexicalAnalyzer.js and syntaxAnalyzer.\
grammer.md contains the project grammer that you need to understand the project structure.

## Lexical analyzer
`LexicalAnalyzer.js`\
lexical analysis is the process of converting a sequence of characters (such as in a computer program or web page) into a sequence of tokens. read more: [LexicalAnalyzer](https://en.wikipedia.org/wiki/Lexical_analysis)

## Syntax analyzer
`syntax.js`
Syntax analysis or parsing is the second phase of a compiler.A syntax analyzer or parser takes the input from a lexical analyzer in the form of token streams. The parser analyzes the source code (token stream) against the production rules to detect any errors in the code. The output of this phase is a parse tree. read more: [Syntax Analyzers](https://www.tutorialspoint.com/compiler_design/compiler_design_syntax_analysis.htm)

## Grammer
`grammer.txt`
this file was created to understand the grammer used in syntaxAnalyzer.

# classes
`bufferClass.js` for input buffering\
`lineTrackeClass.js` for tracking the line of the code for saving in the token table\
`tokenClass.js` for creating the tokens\

# functions
`isReserved()` check if the lexeme is not a reserved word\
`isCharacterALetter()` check if the charachter is a letter\
`isCharacterADigit()` check if the charachter is a digit\
etc

# contribute
This project is no longer being developed and coding has stopped.this repository has been coded in a short time. if you see an error or if you can help us improve and develop this project, please contact me via mohammadsjh@gmail.com

## please note that
This is currently very alpha. Only a few basic language features are implemented.
# ToDo
1. [x] if Else
2. [x] While loops
3. [x] do while loops
4. [x] for Loops
5. [x] functions
6. [x] define
7. [x] statments