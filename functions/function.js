/* 
Table of Contents

> RETURN
> FUNCTION DECLARATION
> FUNCTION EXPRESSION
>> IIFE (Immediately Invoked Function Expression)
>> Names
> CALLBACK
>> How to pass arguments properly with callbacks
>> Inserting callback functions in functions with predefined arguments
>> Getting ‘This’ Right When Passing Functions
> PURE FUNCTION
> ARGUMENTS OBJECT
*/

function name(parameter1, parameter2) {
    // statements
}

// name - The function name.
// Parameter - The name of an argument to be passed to the function.
// Statements - The statements comprising the body of the function.



// Functions are reusable blocks of code that you can write once and run again and again, saving the need to keep repeating code all the time

function checkGuess() {
    alert('I am a placeholder');
}

// define a function by using the keyword function, followed by a name, with parentheses put after it. 
// After that we put two curly braces ({ }). Inside the curly braces goes all the code that we want to run whenever we call the function

// When we want to run the code, we type the name of the function followed by the parentheses.

// Functions that are part of objects are called methods



<button>Press me</button>

const button = document.querySelector('button');

button.onclick = function () {
    let name = prompt('What is your name?');
    alert('Hello ' + name + ', nice to see you!');
}

// window.prompt() function - creates a pop-up dialog box to ask the user to answer a question, then stores the text they enter inside a given variable

// window.alert() function - display another popup containing a string we've assembled from two string literals and the name variable, via concatenation.



// ----------------------------- > RETURN -----------------------------

// To return a value other than the default, a function must have a return statement that specifies the value to return
// A function without a return statement will return a default value.
// When a return statement is used in a function body, the execution of the function is stopped.



// Parameter Assigned a Value

function multiple(a, b = 5) {
    return a * b;
}

console.log(multiple(2, 3)); // 6
console.log(multiple(2)); // 10
console.log(multiple()); // NaN



// Passing by Value

let a = 2;
let b = 3;

function multiple(a, b) { // ‘a’ and ‘b’ in here is declared but not defined
    return a * b;
} // outside of this function, ‘a = 2’ and ‘b = 3’

console.log(a * b); // 6
console.log(multiple(a, b)); // 6 
console.log(multiple(4, 5)); // 20



// Passing by Value, continuation

a = 2;
b = 3;

function multiple() { // no parameters 
    return a * b;
}

console.log(a * b); // 6
console.log(multiple(a, b)); // 6
console.log(multiple(4, 5)); // 6
console.log(multiple()); // 6



// ----------------------------- > FUNCTION DECLARATION -----------------------------

// The function declaration defines a function with the specified parameters. 
// A function created with a function declaration is a Function object and has all the properties, methods and behaviour of Function objects.

function calcRectArea(width, height) {
    return width * height;
}

console.log(calcRectArea(5, 6)); // 30



// Functions can be conditionally declared, that is, a function statement can be nested within an if statement, 
// however the results are inconsistent across implementations and therefore this pattern should not be used in production code. 
// For conditional function creation, use function expressions instead.



// Function declarations in JavaScript are hoisted to the top of the enclosing function or global scope. 
// You can use the function before you declared it:

hoisted(); // foo

function hoisted() {
    console.log('foo');
}



// ----------------------------- > FUNCTION EXPRESSION -----------------------------

// Statements involving functions which do not start with 'function' are function expressions.
// The function keyword can be used to define a function inside an expression.
// The main difference between a function expression and a function declaration is the function name, which can be omitted in function expressions to create anonymous functions.
// A function expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined.



const getRectArea = function (width, height) {
    return width * height;
};

console.log(getRectArea(3, 4)); // 12



// Function expressions in JavaScript are not hoisted, unlike function declarations.
// even though the variable name is hoisted, the definition isn't. so it's undefined.

notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function () {
    console.log('bar');
};



// If you want to refer to the current function inside the function body, you need to create a named function expression. 
// This name is then local only to the function body (scope).

let math = {
    'factit': function factorial(n) {
        console.log(n)
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
};

math.factit(3) // 3; 2; 1;



// Unnamed Function

var x = function (y) {
    return y * y;
};



// Unnamed Function Being Used as a Callback

button.addEventListener('click', function (event) {
    console.log('button is clicked!')
});



// ----------------------------- > FUNCTION EXPRESSION >> IIFE (Immediately Invoked Function Expression) 

// When used only once, are invoked as soon as the function is declared.
// useful because they don't pollute the global object, and they are a simple way to isolate variables declarations



// Syntax

(() => {
    // statement
});



// Those wrapping parentheses are actually what make our function, internally, be considered an expression. 
// Otherwise, the function declaration would be invalid, because we didn’t specify any name.

(function () {
    // statement
});

(function () { })(); // add brackets at end to invoke function
;(function () { })(); // starting with a semicolon prevents issues when blindly concatenating two JavaScript files



// Named IIFE

(function doSomething() {
    // statement
})();



// ----------------------------- > FUNCTION EXPRESSION >> Names

// The variable the function expression is assigned to will have a name property. 
// The name doesn't change if it's assigned to a different variable. 
// If function name is omitted, it will be the variable name (implicit name). 
// If function name is present, it will be the function name (explicit name). 

var foo = function () { };
console.log(foo.name); // foo

var foo2 = foo;
console.log(foo2.name); // foo

var bar = function baz() { };
console.log(bar.name); // baz

console.log(foo === foo2); // true
console.log(typeof baz); // undefined
console.log(bar === baz); // false (errors because baz == undefined)



// ----------------------------- > CALLBACK -----------------------------

// Functions in JavaScript are ‘first class’, 
// which means they are treated like any other variable — including being passed to or returned from other functions.

// When they’re passed as an argument to another function, they’re known as a ‘callback’ — to be called when the other function is ready for them.

// Pass functions — don’t invoke them
// You can write callback functions entirely inside the function that needs them — 
// but for ease of readability and debugging it often helps to declare or assign them elsewhere and reference them by function or variable name.

// The first thing to watch out for is that you are actually referencing them by name — not invoking them. 
// This is the difference between writing myFunction (returns a function) and myFunction() (executes it).

function sayBoo() {
    console.log('Boo!')
}

// do this - reference the function by its name:
setTimeout(sayBoo, 3000)
// Boo! is logged after three seconds.
// sayBoo() returned a function, and that function is available to setTimeout.

// NOTE: don't do this - invoke the function in place:
setTimeout(sayBoo(), 3000)
// Boo! is logged instantly... nothing happens 3 seconds later.
// we are providing for setTimeout to do whatever sayBoo() returns — in this case, nothing it can execute



function sayBoo() {
    console.log('Boo!')
    return function () {
        console.log('Argh!')
    }
}

setTimeout(sayBoo(), 3000)
// Boo! is logged instantly when line 8 is first evaluated and sayBoo() called.
// Argh! is logged 3 seconds later when setTimeout calls the returned function.



// ----------------------------- > CALLBACK >> How to pass arguments properly with callbacks

function countdown(n) {
    if (n === 0) return;
    console.log(`${n}!`)
    setTimeout(countdown(--n), 1000)
}

countdown(5);
// calls countdown n times instantly
// 1 second later, timeouts expire and do nothing.
// We can’t supply a function name with arguments directly in brackets



// Fix: 

// setTimeout(functionRef, delay, param1);

function countdown(n) {
    if (n === 0) return;
    console.log(`${n}!`)
    setTimeout(countdown, 1000, --n)
}

countdown(5);
// NOTE: give setTimeout both the function and the argument, to be executed after 1 second.



function countdown(n) {
    if (n === 0) return;
    console.log(`${n}!`)
    setTimeout(() => countdown(--n), 1000)
}

countdown(5);
// give setTimeout an anonymous function to be executed after 1 second. 
// This function then calls countdown.



// ----------------------------- > CALLBACK >> Inserting callback functions in functions with predefined arguments

// For functions like forEach, map, and then, which have ready-made arguments to be passed into their callback functions, 
// NOTE: you can specify a function as a callback without naming the arguments to be passed to it
// the calling function will pass whatever values it has available as arguments, for the callback to deal with however it can.

function saySquared(n) {
    console.log(n);
}

let arr = [1, 2, 3, 4]
arr.forEach(saySquared) // 1 2 3 4 

// function saySquared takes one argument, but forEach actually has three to offer
// the current value, the current index, and the original collection

// JavaScript functions don’t complain if you supply them with more arguments than they need, 
// so as long as you know the order in which arguments will be supplied,



// Another Example 

function sayIndexAndValue(value, index) {
    console.log(`Index ${index} contains: ${value}.`)
}

arr = ["cat", 5, "boo", { cheese: 'Cheddar' }, 12]
arr.forEach(sayIndexAndValue)

// Index 0 contains: cat.
// Index 1 contains: 5.
// Index 2 contains: boo.
// Index 3 contains: [object Object].
// Index 4 contains: 12.



// ----------------------------- > CALLBACK >> Getting ‘This’ Right When Passing Functions

// using functions as callbacks changes the context in which they are invoked
// if your function relies on the this keyword to refer to the context in which you originally wrote it, 
// NOTE: you may find that invoking it as a callback from within another function alters what this refers to normally - reverting to the global object/window.

const ghost = {
    name: 'Casper',
    sayBoo: function () {
        console.log(`${this.name} says: Boo!`)
    }
}

ghost.sayBoo() // Casper says: Boo!  -- 'this' refers to our ghost
setTimeout(ghost.sayBoo, 1000) // undefined says: Boo!  -- 'this' refers to the global object

// Fix: 

setTimeout(ghost.sayBoo.bind(ghost), 2000) // Casper says: Boo!
setTimeout(() => ghost.sayBoo(), 3000) // Casper says: Boo!

// NOTE: Increasingly, with newer JavaScript syntax, declaring functions with arrow syntax will help: 
// they will automatically bind ‘this’ to the scope in which the function is declared.



// ----------------------------- > PURE FUNCTION -----------------------------

// The function always returns the same result if the same arguments are passed in. 
// It does not depend on any state, or data, change during a program’s execution. 
// It must only depend on its input arguments.

// The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.
// An observable side effect is any interaction with the outside world from within a function, which is not always a bad thing, but makes it not pure. 
// Calling a pure function is not counted.

// Pure functions are used heavily in Functional Programming.
// libraries such as ReactJS and Redux require the use of pure functions

// One of the major benefits of using pure functions is they are immediately testable. They will always produce the same result if you pass in the same arguments.
// makes maintaining and refactoring code much easier
// When used correctly the use of pure functions produces better quality code. 



// Pure:

function priceAfterTax(productPrice) {
    return (productPrice * 0.20) + productPrice;
}

// Impure:

var tax = 20; // depends on an external tax variable

function calculateTax(productPrice) {
    return (productPrice * (tax / 100)) + productPrice;
}



// ----------------------------- > ARGUMENTS OBJECT -----------------------------

// NOTE: JavaScript functions have a built-in object called the arguments object.
// The argument object contains an array of the arguments used when the function was called (invoked).

// The parameters, in a function call, are the function's arguments.
// JavaScript arguments are passed by value: The function only gets to know the values, not the argument's locations.
// If a function changes an argument's value, it does not change the parameter's original value.

function func1(a, b, c) {
    console.log(arguments[0]);
    // 1

    console.log(arguments[1]);
    // 2

    console.log(arguments[2]);
    // 3
}

func1(1, 2, 3);



// Another Example

function myFunction() {
    console.log(arguments);
}
myFunction('a', 'b'); // [Arguments] { '0': 'a', '1': 'b' }