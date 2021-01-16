let input = "hi this a test for my compiler! and this is a 7!";
let splitedInput = input.split(/\s+/);
let splitedInput = input.split(" ");

function lex (codeForLex){
    return codeForLex.split(/\s+/)
    .filter(function(splited){
        return splited.length > 0;
    }
    )
    .map(function(filtered){
        return isNaN(filtered)
        ? 
        {
        type: 'word',
        value: filtered
        }
        :
        {
        type: 'number',
        value: filtered
        }
    }
    )
}
console.log(lex(input));