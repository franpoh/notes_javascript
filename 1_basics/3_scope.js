/* 
Table of Contents

> SCOPE
> LET / CONST
> VAR
> UNDECLARED VARIABLES 
> CLOSURE
*/


// ----------------------------- > SCOPE -----------------------------

// Scope determines the accessibility of variables, objects, and functions from different parts of the code.

// Global Scope:    All scripts and functions on a web page can access it. 
// Local Scope:     Variables declared within a JavaScript function, become local to the function.
// Function Scope:  JavaScript has function scope: Each function creates a new scope.
// Block Scope:     a chunk of code bounded by { }, curly braces. 

// Variables defined inside a function are not accessible(visible) from outside the function.
// Variables declared with var, let and const are quite similar when declared inside a function.

// objects and functions are also variables.



// ----------------------------- > LET / CONST -----------------------------

// respects block-scoping 
{ let x = 2 }
// x can NOT be used here, outside of the curly brackets



// ----------------------------- > VAR -----------------------------

// globally scoped 
// function/locally scoped
// does not have block scope
// this can become an issue if a variable is defined in two different places

{ var x = 2; }
// x CAN be used here, outside the curly brackets



// ----------------------------- > UNDECLARED VARIABLES -----------------------------

// If you assign a value to a variable that has not been declared, it will automatically become a global variable, even if the value is assigned inside a function.

function myFunction() {
    a = 'Not declared';
    let b = 'Declared';
}

// no declaration keyword (let, const, var) means that a will always be accessible globally
myFunction();
console.log(a); // Not declared
console.log(b); // ReferenceError: b is not defined



// ----------------------------- > CLOSURE -----------------------------

// a function having access to the parent scope, even after the parent function has closed



// ----- Example 1

const add = (function () { // add is assigned to the return value of a self-invoking function
    let counter = 0;
    return function () {
        counter += 1;
        console.log(counter)
    }
})(); // self-invoking function only runs once, sets counter to zero (0), returns a function expression.
// this way, add becomes a function

add(); // 1
add(); // 2
add(); // 3

// add becomes a function that can access the counter in the parent scope. 
// This is called a closure. It makes it possible for a function to have "private" variables. 
// The counter is protected by the scope of the anonymous function, and can only be changed using the add function.



// ----- Example 2

function outer() {
    let animal = "Tiger";
    function inner() {
        animal = "Rabbit";
        return animal;
    }

    return inner;
}

console.log(inner()); // Error: inner not defined 

let returnedFunc = outer();
console.log(returnedFunc); // [Function: inner]

const result = returnedFunc();
console.log(`result = ${result}`); // Rabbit

const result1 = outer()();
console.log(`result1 = ${result1}`); // Rabbit



// ----- Example 3

function outerFunc(a) {
    function innerFunc(b) {
        return a + b
    }
    return innerFunc;
}

console.log(outerFunc()); // [Function: innerFunc]

const output1 = outerFunc(1);
console.log(output1); // [Function: innerFunc]

const output2 = outerFunc(1)(2);
console.log(output2); // 3