const str = '([])[](((()))){{}}()';

function checkBrackets(str){
    const brackets = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    const stack = [];

    for (char of str){
        if(Object.values(brackets).includes(char)){
            stack.push(char);
        }
        else if(stack.at(-1) === brackets[char]){
            stack.pop();
        }
        else {
            return false;
        }
    }

    return stack.length === 0;
}

console.log(checkBrackets(str))