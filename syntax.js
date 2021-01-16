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
exprPrim => + term exprPrim | - term exprPrim | &&term exprPrime | ||term exprPrime | E
term => factor termPrime
termPrime => *factor termPrime | /factor termPrime | E
factor => number | (expr) | id

*/

// test for input
let lexed = [
    {token: 'do', value: '3', line: 0},
    {token: 'id', value: '3', line: 0},
    {token: '=', value: '3', line: 0},
    {token: 'number', value: '3', line: 0},
    {token: ';', value: '3', line: 0},
    {token: 'while', value: '3', line: 0},
    {token: '(', value: '3', line: 0},
    {token: 'number', value: '3', line: 0},
    {token: '+', value: '3', line: 0},
    {token: 'number', value: '3', line: 0},
    // {token: ';', value: '3', line: 0},
    {token: ')', value: 'test', line: 0},
    {token: ';', value: 'test', line: 0},
];

let syntaxAnalysis = () => {
    let lookHead = 0;
    let iSave = 0;
    
    let stmt = () => {

        while(lookHead < lexed.length){
            // console.log(lexed.length);
            
            if(
                (
                assignFunc() ||
                // console.log(222)||
                // defineFunc() || 
                // commentFunc()
                // ifElseFunc() ||
                // whileFunc() ||
                doWhileFunc()
                // forFunc() ||
                // stmtsFunc() ||
                
            )){
                return true;
            }
            
        }
        console.log('nothing matched! ERROR!');
        return false;
    }

    let commentFunc = () => {
        let backSlashLine = lexed[lookHead].line;
        if(lexed[lookHead].token == '//'){
            lookHead ++;
            while(lexed[lookHead].line == backSlashLine){
                console.log(lexed[lookHead]);
                lookHead ++;
            }
            return true;
        }
    }

    let expr = () => {
        if(term()){
            if(exprPrime()){
                console.log('exprPrime matched!');
                return true;
            }else{
                console.log('exprPrime and andPrime not found');
                // return false;
            }
        
        }else{
            console.log('term does not matched!');
            return false;
        }
    }
    let exprPrime = () => {
        if(lexed[lookHead].token == '&&' || lexed[lookHead].token == '||'){
            iSave = lookHead;
            lookHead ++;
            console.log('+ or - matched!');
            if(term()){
                console.log('term matched!');
                if(exprPrime()){
                    console.log('exprPrime matched!');
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else if(lexed[lookHead].token == '+' || lexed[lookHead].token == '-'){
            iSave = lookHead;
            lookHead ++;
            if(expr()){
                if(exprPrime()){
                    console.log('run');
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        else{
            console.log('&& || + - not found!');
            return true;
        }
    }
    let term = () => {
        if(factor()){
            // iSave = lookHead;
            if(termPrime()){
                console.log('run2');
                return true;
            }else{
                console.log('termPrime does not matched!');
                // lookHead = iSave;
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
                    console.log('run');
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }else{
            console.log('run1');
            return true;
        }
    }
    let factor  = () => {
        if(lexed[lookHead].token == 'number'){
            console.log(lexed[lookHead].token);
            lookHead ++;
            return true;
        }else if(lexed[lookHead].token == '('){
            iSave = lookHead;
            lookHead ++;
            if(expr()){
                if(lexed[lookHead].token == ')'){
                    lookHead ++;
                    console.log(1111);
                    return true;
                }else{
                    console.log(') not matched;');
                    iSave = lookHead;
                    console.log(1111);
                    return false;
                }
            }else{
                console.log('expr not matched');
                lookHead = iSave;
                console.log(1111);
                return false;
            }
        }else if(lexed[lookHead].token == 'id'){
            lookHead ++;
            console.log(1111);
            return true;
        }else{
            console.log('factorFunc does not matched!');
            console.log(lexed[lookHead].token);
            return false;
        }
    }

    // console.log(expr());

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
            if(lexed[lookHead].token == 'id'){
                console.log('id matched!');
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
                        return true;
                    } else{
                        // console.log(lexed[lookHead].token);
                        lookHead = iSave;
                        console.log('assignFunc does not matched!');
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
    }

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
                        console.log(lexed[lookHead].token);
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
            return false;
        }
    }

    // console.log(whileFunc());

    let doWhileFunc = () => {
        if(lexed[lookHead].token == 'do'){
            iSave = lookHead;
            console.log('do matched!');
            lookHead ++;
            if(stmt()){
                console.log('stmt matched!');
                if(lexed[lookHead].token == 'while'){
                    console.log('while matched!');
                    lookHead ++;
                    if(lexed[lookHead].token == '('){
                        console.log('( sign in while matched!');
                        lookHead ++;
                        if(expr()){
                            console.log('expr Function in while matched!');
                            if(lexed[lookHead].token == ')'){
                                console.log(') sign matched!');
                                lookHead ++;
                                if(lexed[lookHead].token == ';'){                                    
                                    console.log('; sign matched!');
                                    lookHead ++;
                                    return true;
                                }else{
                                    console.log('; sign does not matched!');
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
                        console.log(lexed[lookHead].token);
                        lookHead = iSave;
                        return false;
                    }
                }else{
                    console.log('while does not matched!');
                    lookHead = iSave;
                    return false;
                }
            }else{
                console.log('stmt does not matched!');
                lookHead = iSave;
                return false;
            }
        }else{
            console.log('do does not matched!');
            return false;
        }
    }

    let forFunc = () => {
        return true;
    }

    let stmtsFunc = () => {
        return true;
    }

    console.log(stmt());
    console.log("syntaxAnalysis Function finished!");

}

console.log(syntaxAnalysis());