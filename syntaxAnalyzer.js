"use strict";

// test for input
// let tokenTable = [
//     {name: 'for', value: '', line: 0},
//     {name: '(', value: '', line: 0},
//     {name: 'id', value: '', line: 0},
//     {name: '=', value: '', line: 0},
//     {name: 'number', value: '', line: 0},
//     {name: ';', value: '', line: 0},
//     {name: 'id', value: '', line: 0},
//     {name: '=>', value: '', line: 0},
//     {name: 'id', value: '', line: 0},
//     {name: ';', value: '', line: 0},
//     {name: 'id', value: '', line: 0},
//     {name: '+', value: '', line: 0},
//     {name: 'number', value: '', line: 0},
//     {name: ')', value: '', line: 0},
//     {name: '{', value: '', line: 0},
//     {name: 'id', value: '', line: 0},
//     {name: '=', value: 'test', line: 0},
//     {name: 'number', value: 'test', line: 0},
//     {name: ';', value: 'test', line: 0},
//     {name: '}', value: 'test', line: 0},
//     {name: 'id', value: 'test', line: 0},
//     {name: '=', value: 'test', line: 0},
//     {name: 'number', value: 'test', line: 0},
// ];

let syntaxAnalysis = () => {
    let lookHead = 0;
    let iSave = 0;
    
    let stmt = () => {

        while(lookHead < tokenTable.length){
            // console.log(tokenTable.length);
            
            if(
                (
                assignFunc() ||
                defineFunc()  ||
                commentFunc() || 
                ifElseFunc() ||
                whileFunc() ||
                doWhileFunc() ||
                forFunc() ||
                functionFunc() ||
                stmtsFunc() 
                
            )){
                return true;
            }else{
                console.log('nothing matched! ERROR!');
                return false;
            }
            
        }
    }

    let commentFunc = () => {
        let backSlashLine = tokenTable[lookHead].line;
        if(tokenTable[lookHead].name == '//'){
            lookHead ++;
            while(tokenTable[lookHead].line == backSlashLine){
                console.log(tokenTable[lookHead]);
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
        if(tokenTable[lookHead].name == '&&' || tokenTable[lookHead].name == '||'
         || tokenTable[lookHead].name == '=' || tokenTable[lookHead].name == '=='
         || tokenTable[lookHead].name == '=<' || tokenTable[lookHead].name == '=>'
         || tokenTable[lookHead].name == '>' || tokenTable[lookHead].name == '<'
         || tokenTable[lookHead].name == '=!'
         ){
            iSave = lookHead;
            lookHead ++;
            console.log('&& or || matched!');
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
        }else if(tokenTable[lookHead].name == '+' || tokenTable[lookHead].name == '-'){
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
            console.log('+ and - not found!');
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
        if(tokenTable[lookHead].name == '*' || tokenTable[lookHead].name == '/'){
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
        if(tokenTable[lookHead].name == 'number'){
            console.log(tokenTable[lookHead].name);
            lookHead ++;
            return true;
        }else if(tokenTable[lookHead].name == '('){
            iSave = lookHead;
            lookHead ++;
            if(expr()){
                if(tokenTable[lookHead].name == ')'){
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
        }else if(tokenTable[lookHead].name == 'id'){
            console.log(tokenTable[lookHead].name);
            lookHead ++;
            return true;
        }else{
            console.log('factorFunc does not matched!');
            console.log(tokenTable[lookHead].name);
            return false;
        }
    }

    // console.log(expr());

    let operators  = () => {
        return true;
    }

    let defineFunc = () => {
        if(type() == false){
            console.log('type is false');
            return false;
        } else{
            if(tokenTable[lookHead].name == 'id'){
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
            if(tokenTable[lookHead].name == ';'){
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
        tokenTable[lookHead].name == 'int' | 
        tokenTable[lookHead].name == 'float' |
        tokenTable[lookHead].name == 'string' |
        tokenTable[lookHead].name == 'bool' |
        tokenTable[lookHead].name == 'char' |
        tokenTable[lookHead].name == 'double'
        ){
            console.log('type(int, float , ...) matched!');
            lookHead ++;
            return true;
        }else{
            return false;
        }
    }
    let numPrime = () => {
        if(tokenTable[lookHead].name == '='){
            console.log('equal sign matched!');
            iSave = lookHead;
            lookHead ++;
            if(tokenTable[lookHead].name == 'number'){
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
        if(tokenTable[lookHead].name == 'id'){
            iSave = lookHead;
            console.log('id matched!');
            lookHead ++;
            if(tokenTable[lookHead].name == '='){
                console.log('= sign matched!');
                lookHead ++;
                if(expr()){
                    console.log('exprFunc matched');
                    if(tokenTable[lookHead].name == ';'){
                        console.log('semiColon matched!');
                        lookHead ++;
                        return true;
                    } else{
                        // console.log(tokenTable[lookHead].name);
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
        if(matchedStmt()){
            console.log('ifElseFunc does  matched!');
            return true;
        }else if(unmatchedStmt()){
            console.log('ifElseFunc does  matched!');
            return true;
        }else{
            console.log('ifElseFunc does not matched!');
            return false;
        }
    }
    let matchedStmt = () => {
        if(tokenTable[lookHead].name == 'if'){
            let iSaveF;
            iSaveF = lookHead;
            lookHead ++;
            console.log('if matched!');
            if(tokenTable[lookHead].name == '('){
                console.log('( sign matched!');
                lookHead ++;
                if(expr()){
                 console.log('expr Function in matchedStmt matched!');
                    if(tokenTable[lookHead].name == ')'){
                        lookHead ++;
                        console.log(') sign matched!');
                            if(matchedStmt()){
                                console.log('matchedStmt Function in matchedStmt matched!');
                                    if(tokenTable[lookHead].name == 'else'){
                                        lookHead ++;
                                        console.log('else sign matched!');
                                            if(matchedStmt()){
                                                console.log('matchedStmt2 Function in matchedStmt matched!'); 
                                                return true;                                         
                                            }else{
                                                console.log('matchedStmt Function in matchedStmt not matched!');  
                                                return false;
                                            }                                         
                                    }else{
                                        lookHead = iSaveF;
                                        console.log('else in matchedStmt not matched!');  
                                        return false;
                                    }                                
                            }else{
                                lookHead = iSave;
                                console.log('matchedStmt Function in matchedStmt not matched!');  
                                return false;
                            } 
                    }else{
                        lookHead = iSave;
                        console.log(') sign in matchedStmt not matched!');  
                        return false;
                    }
                }else{
                    lookHead = iSave;
                    console.log('expr Function in matchedStmt not matched!');  
                    return false;
                }
            }else{
                lookHead = iSave;
                console.log('( sign in matchedStmt not matched!');  
                return false;
            }
        }else if(stmtsFunc()){
            console.log('stmtsFunc Function in matchedStmt matched!');  
            return true;
        }else{
            console.log('nothing got matched in matchedStmt!'); 
            return false;
        }
    }
    let unmatchedStmt = () => {
        if(tokenTable[lookHead].name == 'if'){
            iSave = lookHead;
            lookHead ++;
            console.log('if matched!');
            if(tokenTable[lookHead].name == '('){
                console.log('( sign matched!');
                lookHead ++;
                if(expr()){
                    console.log('expr Function in unmatchedStmt matched!');
                    if(tokenTable[lookHead].name == ')'){
                        lookHead ++;
                        console.log(') sign matched!');
                        if(stmtsFunc()){
                            console.log('ifElseFunc Function in unmatchedStmt matched!');
                            return true;
                        }else{
                            lookHead = iSave;
                            console.log('ifElseFunc Function in unmatchedStmt not matched!'); 
                        }
                    }else{
                        lookHead = iSave;
                        console.log(') sign in unmatchedStmt not matched!');  
                        return false;
                    }
                }else{
                    lookHead = iSave;
                    console.log('expr Function in unmatchedStmt not matched!');  
                    return false;
                }
            }else{
                lookHead = iSave;
                console.log('( sign in unmatchedStmt not matched!');  
                return false;
            }
        }else if(tokenTable[lookHead].name == 'if'){
            iSave = lookHead;
            lookHead ++;
            console.log('if matched!');
            if(tokenTable[lookHead].name == '('){
                console.log('( sign matched!');
                lookHead ++;
                if(expr()){
                 console.log('expr Function in matchedStmt matched!');
                    if(tokenTable[lookHead].name == ')'){
                        lookHead ++;
                        console.log(') sign matched!');
                            if(matchedStmt()){
                                console.log('matchedStmt Function in matchedStmt matched!');
                                    if(tokenTable[lookHead].name == 'else'){
                                        lookHead ++;
                                        console.log('else sign matched!');
                                            if(unmatchedStmt()){
                                                console.log('unmatchedStmt Function in matchedStmt matched!');
                                                return true;                                          
                                            }else{
                                                lookHead = iSave;
                                                console.log('unmatchedStmt Function in unmatchedStmt not matched!');  
                                                return false;
                                            }                                         
                                    }else{
                                        lookHead = iSave;
                                        console.log('else in matchedStmt not matched!');  
                                        return false;
                                    }                                
                            }else{
                                lookHead = iSave;
                                console.log('matchedStmt Function in matchedStmt not matched!');  
                                return false;
                            } 
                    }else{
                        lookHead = iSave;
                        console.log(') sign in matchedStmt not matched!');  
                        return false;
                    }
                }else{
                    lookHead = iSave;
                    console.log('expr Function in matchedStmt not matched!');  
                    return false;
                }
            }else{
                lookHead = iSave;
                console.log('( sign in matchedStmt not matched!');  
                return false;
            }
        }else{
            console.log('nothing got matched in unmatchedStmt!');  
            return false;
        }


    }

    let whileFunc = () => {
        if(tokenTable[lookHead].name == 'while'){
            iSave = lookHead;
            console.log('while matched!');
            lookHead ++;
            if(tokenTable[lookHead].name == '('){
                console.log('( sign matched!');
                lookHead ++;
                if(expr()){
                    console.log('expr Function in while matched!');
                    if(tokenTable[lookHead].name == ')'){
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
                        console.log(tokenTable[lookHead].name);
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
        if(tokenTable[lookHead].name == 'do'){
            iSave = lookHead;
            console.log('do matched!');
            lookHead ++;
            if(stmt()){
                console.log('stmt matched!');
                if(tokenTable[lookHead].name == 'while'){
                    console.log('while matched!');
                    lookHead ++;
                    if(tokenTable[lookHead].name == '('){
                        console.log('( sign in while matched!');
                        lookHead ++;
                        if(expr()){
                            console.log('expr Function in while matched!');
                            if(tokenTable[lookHead].name == ')'){
                                console.log(') sign matched!');
                                lookHead ++;
                                if(tokenTable[lookHead].name == ';'){                                    
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
        if(tokenTable[lookHead].name == 'for'){
            let iSaveFor;
            iSaveFor = lookHead;
            lookHead
            console.log('for matched!');
            lookHead ++;
            if(tokenTable[lookHead].name == '('){
                console.log('( matched!');
                lookHead ++;
                if(optexpr()){
                    console.log('first optexpr got matched!');
                    if(tokenTable[lookHead].name == ';'){
                        console.log('; matched!');
                        lookHead ++;
                        if(optexpr()){
                            console.log('second optexpr got matched!');
                            if(tokenTable[lookHead].name == ';'){
                                console.log('; matched!');
                                lookHead ++;
                                if(optexpr()){
                                    console.log('third optexpr got matched!');
                                    if(tokenTable[lookHead].name == ')'){
                                        console.log(') matched!');
                                        lookHead ++;
                                        if(stmt()){
                                            console.log('stmt in forFunc got matched!');
                                            return true;
                                        }else{
                                            console.log('stmt in forFunc does not matched!');
                                            lookHead = iSaveFor;
                                            return false;
                                        }
                                    }else{
                                        console.log(') in forFunc does not matched!');
                                        lookHead = iSaveFor;
                                        return false;
                                    }
                                }else{
                                    console.log('third optexpr did not match!');
                                    lookHead = iSaveFor;
                                    return false;
                                }
                            }else{
                                console.log('; in forFunc does not matched!');
                                lookHead = iSaveFor;
                                return false;
                            }
                        }else{
                            console.log('second optexpr did not match!');
                            lookHead = iSaveFor;
                            return false;
                        }
                    }else{
                        console.log('; in forFunc does not matched!');
                        lookHead = iSaveFor;
                        return false;
                    }
                }else{
                    console.log('first optexpr did not match!');
                    lookHead = iSaveFor;
                    return false;
                }
            }else{
                console.log('( in forFunc does not matched!');
                lookHead = iSaveFor;
                return false;
            }
        }else{
            console.log('forFunc nothing got matched!');
            return false;
        }
    }
    let optexpr = () => {
        if(expr()){
            console.log('expr in optexpr got matched!');
            return true;
        }else{
            console.log('empty expr in optexpr got matched!');
            return true;
        }
    }
    let functionFunc = () => {
        if(type()){
            console.log('type in functionFunc got matched!');
            if(tokenTable[lookHead].name == 'id'){
                console.log('id in functionFunc got matched!');
                let iSaveF ;
                iSaveF = lookHead;
                lookHead ++;
                if(tokenTable[lookHead].name == '('){
                    console.log('( sign in functionFunc got matched!');
                    lookHead ++;
                    if(expr()){
                        console.log(' expr in functionFunc got matched!');
                        if(tokenTable[lookHead].name == ')'){
                            console.log(') sign in functionFunc got matched!');
                            lookHead ++;
                            if(stmt()){
                                console.log('stmt in functionFunc got matched!');
                                return true;
                            }else{
                                console.log('stmt in functionFunc does not matched!');
                                lookHead = iSaveF;
                                return false;
                            }
                        }else{
                            console.log(') sign in functionFunc does not matched!');
                            lookHead = iSaveF;
                            return false;
                        }
                    }else{
                        console.log('expr in functionFunc does not matched!');
                        lookHead = iSaveF;
                        return false;
                    }
                }else{
                    console.log('( sign in functionFunc does not matched!');
                    lookHead = iSaveF;
                    return false;
                }
            }else{
                console.log('id in functionFunc does not matched!');
                lookHead = iSaveF;
                return false;
            }
        }else{
            console.log('functionFunc nothing matched!');
            return false;
        }
    }
    let stmtsFunc = () => {
        if(tokenTable[lookHead].name == '{'){
            console.log('{ sign matched!');
            iSave = lookHead;
            lookHead ++;
            if(stmtsPrimeFunc()){
                if(tokenTable[lookHead].name == '}'){
                    console.log('} sign matched!');
                    lookHead ++;
                    return true;
                }else{
                    console.log('} does not sign matched!');
                    iSave = lookHead;
                    return false;
                }
            }else{
                console.log('stmtPrimeFunc does not matched!');
                iSave = lookHead;
                return false;
            }
        }else{
            console.log('{ sign does not matched!');
            return false;
        }
    }
    let stmtsPrimeFunc = () => {
        if(stmt()){
            if(stmtsPrimeFunc()){
                return true;
            }else{
                console.log('stmtPrimeFunc does not work!');
                return false;
            }
        }else{
            console.log('stmtPrimeFunc does work!');
            return true;
        }
    }

    console.log(stmt());
    console.log("syntaxAnalysis Function finished!");

}
console.table(tokenTable);
console.log(syntaxAnalysis());