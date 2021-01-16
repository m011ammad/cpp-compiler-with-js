"use strict";

/*
! Grammer 

stmt => id=expr;
    | defineFunc
    | ifElseFunc
    | while(expr) stmt;
    | do stmt while (expr);
    | for(optepr; optepr; optepr) stmt
    | {stmts}
stmts => stmts | stmt

expr => term exprPrim
exprPrim => + term exprPrim | - term exprPrim | E
expr => term andPrime
andPrime => &&expr andPrime | ||expr andPrime | E

*/

// test for input
let lexed = [
    {token: 'id', value: 'test2', line: 0},
    {token: '=', value: '', line: 0},
    {token: 'number', value: 'test', line: 0},
    {token: '+', value: '', line: 1},
    {token: 'number', value: '', line: 1},
    {token: '&&', value: '', line: 1},
    {token: 'number', value: '', line: 1},
    {token: '+', value: '', line: 1},
    {token: 'number', value: '', line: 1},
    {token: ';', value: '', line: 1}
];

let syntaxAnalysis = () => {
    let lookHead = 0;
    let iSave = 0;
    
    let stmt = () => {

        while(lookHead < lexed.length){
            // console.log(lexed.length);
            
            if(
                !(
                // defineFunc() ||
                commentFunc()||
                assignFunc() 
                // ifElseFunc() ||
                // whileFunc() ||
                // doWhileFunc() ||
                // forFunc() ||
                // stmtsFunc() ||
                
            )){
                return false;
            }

        }
        return true;
    }

    let commentFunc = () => {
        let backSlashLine = lexed[lookHead].line;
        if(lexed[lookHead].token == '//'){
            lookHead ++;
            while(lexed[lookHead].line == backSlashLine){
                console.log(lexed[lookHead]);
                lookHead ++;
            }
        }
    }
        
    let expr = () => {
        if(term()){
            if(exprPrime()){
                return true;
            }else{
                console.log('exprPrime and andPrime not found');
                return false;
            }
        }else{
            console.log('term does not matched!');
            return false;
        }
    }
    let exprPrime = () => {
        if(lexed[lookHead].token == '+' || lexed[lookHead].token == '-'){
            iSave = lookHead;
            lookHead ++;
            if(term()){
                if(exprPrime()){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else if(lexed[lookHead].token == '&&' || lexed[lookHead].token == '||'){
            iSave = lookHead;
            lookHead ++;
            if(expr()){
                if(exprPrime()){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    
    let term = () => {
        if(factor()){
            if(termPrime()){
                return true;
            }else{
                console.log('termPrime does not matched!');
                return false;
            }
        }else{
            console.log('factor does not matched!');
            return false;
        }
    }
    let termPrime = () => {
        if(lexed[lookHead].token == '*' || lexed[lookHead].token == '/'){
            iSave = lookHead;
            lookHead ++;
            if(factor()){
                if(termPrime()){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            return true;
        }
    }

    let factor  = () => {
        if(lexed[lookHead].token == 'number'){
            lookHead ++;
            return true;
        }else if(lexed[lookHead].token == '('){
            iSave = lookHead;
            lookHead ++;
            if(expr()){
                if(lexed[lookHead].token == ')'){
                    lookHead ++;
                    return true;
                }else{
                    console.log(') not matched;');
                    iSave = lookHead;
                    return false;
                }
            }else{
                console.log('expr not matched');
                lookHead = iSave;
                return false;
            }
        }else if(lexed[lookHead].token == 'id'){
            lookHead ++;
            return true;
        }else{
            console.log('factorFunc does not matched!');
            return false;
        }
    }

    let operators  = () => {
        return true;
    }

    let optexpr  = () => {
        return true;
    }

    let defineFunc = () => {
        if(type() == false){
            console.log('type is false');
            return false;
        } else{
            if(lexed[lookHead].token == 'space'){
                console.log('space matched!');
                lookHead ++;
            }else{
                console.log('space does not matched!');
                return false;
            }
            if(lexed[lookHead].token == 'id'){
                console.log('id matched!');
                console.log(lexed[lookHead].value);
                lookHead ++;
            }else{
                console.log('id does not matched!');
                return false;
            }
            if(numPrime()){
            } else{
                return false;
            }
            if(lexed[lookHead].token == ';'){
                console.log('semiColon matched!');
                lookHead ++;
            } else{
                console.log('semiColon does not matched!');
                return false;
            }
        }
        return true;
    }
    let type = () => {
        if(
        lexed[lookHead].token == 'int' | 
        lexed[lookHead].token == 'float' |
        lexed[lookHead].token == 'string' |
        lexed[lookHead].token == 'bool' |
        lexed[lookHead].token == 'char' |
        lexed[lookHead].token == 'double'
        ){
            console.log('type(int, float , ...) matched!');
            lookHead ++;
            return true;
        }else{
            return false;
        }
    }
    let numPrime = () => {
        if(lexed[lookHead].token == '='){
            console.log('equal sign matched!');
            iSave = lookHead;
            lookHead ++;
            if(lexed[lookHead].token == 'number'){
                console.log('number matched!');
                lookHead ++;
                return true;
            } else {
                console.log('number does not matched!');
                lookHead = iSave;
                return false;
            }
        } else {
            console.log('equal sign does not matched!');
            return true;
        }
    }

    let assignFunc = () => {
        if(lexed[lookHead].token == 'id'){
            iSave = lookHead;
            console.log('id matched!');
            lookHead ++;
            if(lexed[lookHead].token == '='){
                console.log('= sign matched!');
                lookHead ++;
                if(expr()){
                    console.log('exprFunc matched');
                    if(lexed[lookHead].token == ';'){
                        console.log('semiColon matched!');
                        lookHead ++;
                    } else{
                        console.log(lookHead);
                        lookHead = iSave;
                        console.log('semiColon does not match!');
                        return false;
                    }
                } else {
                    lookHead = iSave;
                    console.log('exprFunc does not matched!');
                    return false;
                }
            } else{
                lookHead = iSave;
                console.log('= sign does not match!');
                return false;
            }
        }else {
            console.log('id does not matched!');
            return false;
        }
        return true;
    }

    console.log(stmt());

    let ifElseFunc = () => {
        // if(!matchStatment()){
        //     return false;
        // }else {

        // }
    }

    let whileFunc = () => {
        if(lexed[lookHead].token == 'while'){
            iSave = lookHead;
            console.log('while matched!');
            lookHead ++;
            if(lexed[lookHead].token == '('){
                console.log('( sign matched!');
                lookHead ++;
                if(expr()){
                    console.log('expr Function in while matched!');
                    lookHead ++;
                    if(lexed[lookHead].token == ')'){
                        console.log(') sign in while matched!');
                        lookHead ++;
                        if(stmt()){
                            console.log('stmt Function in while matched!');
                            lookHead ++;
                            return true;
                        }else{
                            console.log('stmt Function does not matched!');
                            lookHead = iSave;
                            return false;
                        }
                    }else{
                        console.log(') sign does not matched!');
                        lookHead = iSave;
                        return false;
                    }
                }else{
                    console.log('expr Function does not matched!');
                    lookHead = iSave;
                    return false;
                }
            }else{
                console.log('( sign does not matched!');
                lookHead = iSave;
                return false;
            }
        }else{
            console.log('while does not matched!');
            lookHead = iSave;
            return false;
        }
    }

    // console.log(whileFunc());

    let doWhileFunc = () => {
        return true;
    }

    let forFunc = () => {
        return true;
    }

    let stmtsFunc = () => {
        return true;
    }

}

console.log(syntaxAnalysis());