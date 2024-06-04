/* 
Table of Contents

> WHAT IS A FUNCTION
> VARIABLES IN FUNCTIONS
> PARAMETERS IN FUNCTIONS
> FUNCTION DECLARATION
> FUNCTION EXPRESSION
>> IIFE (Immediately Invoked Function Expression)
>> Names
> ARROW FUNCTION EXPRESSION
>> Concise Body / Block Body
>> Cannot be Used as Methods
>> Examples
> CLOSURES
> CALLBACK
>> How to pass arguments properly with callbacks
>> Inserting callback functions in functions with predefined arguments
>> Getting 'This' Right When Passing Functions
> PURE FUNCTION
> ARGUMENTS OBJECT
*/



// ----------------------------- > WHAT IS A FUNCTION -----------------------------

// ----- Structure Of A Function

// To repeat what we learn in the basics:
// A JavaScript function is a reusable block of code that performs a specific task or set of operations, and can optionally accept inputs (called parameters or arguments) and return a value.



// Define a function by using the keyword 'function', followed by a name, with parentheses ( ) put after it. 
// After that we put two curly braces { }. Inside the curly braces goes all the code that we want to run whenever we call the function

let myName = 'Francine'; // an argument that we can use in the function

function myFunction(parameter) {
    // statement
    console.log(`I am ${parameter}`);
}

// Run the function by using the function name, followed by ()
myFunction(myName); // Note myName being passed into the function

// myFunction - The function name. Can be anything, but mostly follow variable naming conventions. 
// parameter - The name of an argument to be passed to the function. Parameters are optional.
// statement - The statements comprising the body of the function.



// ----- Return Statement

// There is also the 'return' statement, which specifies the value returned by the function
// If omitted, undefined is returned.

function myFunction() {
    return 'Francine'; // 'Francine' is the return value
}

// Run the function inside the console log function
console.log(myFunction()); // Francine

// When I use console.log inside functions to demonstrate the workings of a function, we are in fact not returning any value that can be used outside of that function
// return statements are needed for a function to output a value that can be used in other places other than within the function itself



// When a return statement is used in a function body, the execution of the function is stopped.

function myFunction(number) {
    if (number > 5) {
        return 'The number is larger than 5';
    } else if (number < 5) {
        return 'The number is smaller than 5';
    } else {
        return 'The number is 5';
    }
}

// The function stopped at the first return statement
console.log(myFunction(7)); // The number is larger than 5

// The function stopped at the second return statement
console.log(myFunction(3)); // The number is smaller than 5

// The function stopped at the third return statement
console.log(myFunction(5)); // The number is 5



// ----- Methods 

// Functions that are part of objects are called methods

// This is an object
let objectThing = {

    thisThing: 'I am a thing',

    // And within the object, this is a method
    thisMethod: function () {
        console.log(this.thisThing);
    }
}

objectThing.thisMethod(); // I am a thing



// ----------------------------- > VARIABLES IN FUNCTIONS -----------------------------

// Variables that are available in global scope are also available for use in functions

let hello = 'hello there';

// NOTE: there are no parameters for this function, this will become important later
function greeting() {
    console.log(hello);
}

// Function is pointing to the variable 'hello' defined within the global scope
greeting(); // hello there

// Logging the variable 'hello' defined within the global scope
console.log(hello); // hello there



// However, if you define a variable with the same name in the function, it will point to the function-scoped variable instead

let hi = 'hi there';

function greeting() { 
    let hi = 'hey there'; // variable defined, with the same name
    console.log(hi);
}

// Function is pointing to the variable 'hi' defined within the function scope
greeting(); // hey there

// Logging the variable 'hi' defined within the global scope
console.log(hi); // hi there



// Remember when I mentioned to note the lack of parameters earlier? Here is the same function as the first, except with a parameter

let hoi = 'hoi there';

function greeting(hoi) {
    console.log(hoi);
}

// Function is not pointing at the variable 'hoi' defined within the global scope
// It is pointing to the parameter 'hoi', and we did not pass any argument into the function, hence the return value is undefined
greeting(); // undefined

// When we pass an argument into the function:
greeting('Salutations'); // Salutations
greeting(777); // 777
greeting(hoi); // hoi there


// Logging the variable 'hoi' defined within the global scope
console.log(hoi); // hoi there



// ----------------------------- > PARAMETERS IN FUNCTIONS -----------------------------

// ----- Passing by Value, without Parameters

let apple = 2;
let banana = 3;

function multiple() { // no parameters 
    return apple * banana;
}

// global-scoped variables 'apple' and 'banana' being used in the function
console.log(apple * banana); // 6

// global-scoped variables 'apple' and 'banana' being passed into the function as arguments
console.log(multiple(apple, banana)); // 6

// numerical values passed into the function as arguments
console.log(multiple(4, 5)); // 6

// global-scoped variables 'apple' and 'banana' being pointed to and used in the function
console.log(multiple()); // 6



// ----- Passing by Value, with Parameters

// Parameters are essentially passed to functions by value — 
// so if the code within the body of a function assigns a completely new value to a parameter that was passed to the function, 
// the change is not reflected globally or in the code which called that function.

// See pass_reference_value.js

let annie = 2;
let britta = 3;

function multiple(annie, britta) { // 'a' and 'b' in here are parameters 
    return annie * britta;
} 

// outside of this function, 'a = 2' and 'b = 3'
console.log(annie * britta); // 6

// global-scoped 'a' and 'b' variables passed into the function as arguments
console.log(multiple(annie, britta)); // 6 

// numerical values passed into the function as arguments
console.log(multiple(4, 5)); // 20

// Function is not pointing at the variables 'a' and 'b' defined within the global scope
// It is pointing to the parameters 'a' and 'b', and we did not pass any arguments into the function, hence the return value is NaN
console.log(multiple()); // NaN



// ----- Parameter Assigned a Value

// the parameter 'britain' is assigned the default value of 5
function multiple(africa, britain = 5) {
    return africa * britain;
}

// numerical values passed into the function as arguments. The second argument overrides the parameter's default value
console.log(multiple(2, 3)); // 6

// numerical values passed into the function as arguments. There is no second argument and therefore the parameter's default value is used. 
console.log(multiple(2)); // 10

// No arguments is passed into the function, and therefore is is no value for the parameter 'africa', even if 'britain' has its default value
console.log(multiple()); // NaN



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

// The main difference between a function expression and a function declaration is the function name, 
// which can be omitted in function expressions to create anonymous functions.

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

let greeter = {
    greeting: function(name) {
        console.log(`Hello ${name}!`);
    }
}

greeter.greeting('Francine'); // Hello Francine!



// The same, but as an unnamed function

let farewell = function(name) {
    console.log(`Bye ${name}!`);
}

farewell('Werner'); // Bye Werner!



// ----------------------------- > FUNCTION EXPRESSION >> IIFE (Immediately Invoked Function Expression) 

// A function expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined.

// When used only once, are invoked as soon as the function is declared.
// useful because they don't pollute the global object, and they are a simple way to isolate variables declarations



// Syntax

(() => {
    // statement
});



// Those wrapping parentheses are actually what make our function, internally, be considered an expression. 
// Otherwise, the function declaration would be invalid, because we didn't specify any name.

(function () {
    // statement
});

(function () { })(); // add brackets at end to invoke function
; (function () { })(); // starting with a semicolon prevents issues when blindly concatenating two JavaScript files



// Named IIFE

(function doSomething() {
    // statement
})();



// ----------------------------- > FUNCTION EXPRESSION >> Names

// The variable the function expression is assigned to will have a name property. 
// The name doesn't change if it's assigned to a different variable. 

// If function name is omitted, it will be the variable name (implicit name). 
// If function name is present, it will be the function name (explicit name). 

let foo = function () { };
console.log(foo.name); // foo

let foo2 = foo;
console.log(foo2.name); // foo

let bar = function baz() { };
console.log(bar.name); // baz

console.log(foo === foo2); // true
console.log(typeof baz); // undefined
console.log(bar === baz); // false (errors because baz == undefined)



// ----------------------------- > ARROW FUNCTION EXPRESSION -----------------------------

// An arrow function expression is a compact alternative to a traditional function expression, 
// with some semantic differences and deliberate limitations in usage: 

// Arrow functions cannot use yield within their body and cannot be created as generator functions.

() => { statements }



// If the arrow function contains one expression, and you omit the function's curly braces, then the expression is implicitly returned. 

() => expression;



// Rest parameters, default parameters, and destructuring within params are supported, and always require parentheses:

(a, b, ...r) => expression;

(a = 400, b = 20, c) => expression;

([a, b] = [10, 20]) => expression;

({ a, b } = { a: 10, b: 20 }) => expression;



// NOTE: Precedence of arrow

// Although the arrow in an arrow function is not an operator, 
// arrow functions have special parsing rules that interact differently with operator precedence compared to regular functions.

let callback;

/* 
callback = callback || () => {}; // SyntaxError: invalid arrow-function arguments
*/

// Because => has a lower precedence than most operators, 
// parentheses are necessary to avoid callback || () being parsed as the arguments list of the arrow function.

callback = callback || (() => { });



// ----------------------------- > ARROW FUNCTION EXPRESSION >> Concise Body / Block Body

// Arrow functions can have either a "concise body" or the usual "block body".

// In a concise body, only an expression is specified, which becomes the implicit return value. 
// In a block body, you must use an explicit return statement.

let conciseFunction = () => 'Pancake'; // concise body syntax, implied "return"
console.log(conciseFunction()); // Pancake

let blockFunction = () => { return 'Pancake'; }; // with block body, explicit "return" needed
console.log(blockFunction()); // Pancake



// Returning object literals using the concise body syntax (params) => { object: literal } does not work as expected.

let brokenFunction = () => { foo: 1 }; // Calling func() returns undefined!
console.log(brokenFunction()); // undefined

// This is because JavaScript only sees the arrow function as having a concise body if the token following the arrow is not a left brace, 
// so the code inside braces ({}) is parsed as a sequence of statements, where foo is a label, not a key in an object literal.

// To fix this, wrap the object literal in parentheses:

let workingFunction = () => ({ foo: 1 });
console.log(workingFunction()); // { foo: 1 }



// ----------------------------- > ARROW FUNCTION EXPRESSION >> Cannot be Used as Methods

// Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
// not for call, apply and bind methods, which generally rely on establishing a scope.

const community = {

    jeff: 'winger',
    abed: 'nadir',
    annie: 'edison',

    arrowName: () => console.log(this.jeff),

    expName1() { console.log(this.abed); },

    expName2: function() { console.log(this.annie); },
}

// 'this' does not work with arrow functions
community.arrowName(); // undefined

// but 'this' works with 'normal' function statements
community.expName1(); // nadir
community.expName2(); // edison



// ----------------------------- > ARROW FUNCTION EXPRESSION >> Examples

// Some basic examples: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#examples



// The call(), apply(), and bind() methods work as expected with traditional functions, 
// because we establish the scope for each of the methods:

const objA = {
    num: 100,
};

// Setting "num" on globalThis to show how it is NOT used.
this.num = 42;

// A simple traditional function to operate on "this"
const addA = function (a, b, c) {
    return this.num + a + b + c;
};

console.log(addA.call(objA, 1, 2, 3)); // 106

console.log(addA.apply(objA, [1, 2, 3])); // 106

const boundAddA = addA.bind(objA);
console.log(boundAddA(1, 2, 3)); // 106



// With arrow functions, since our add function is essentially created on the globalThis (global) scope, 
// it will assume this is the globalThis.

// See 2_this_part1.js > ARROW FUNCTIONS

const objB = {
    num: 100,
};

// Setting "num" on globalThis to show how it gets picked up.
this.num = 42;

// Arrow function
const addB = (a, b, c) => this.num + a + b + c;

console.log(addB.call(objB, 1, 2, 3)); // 48

console.log(addB.apply(objB, [1, 2, 3])); // 48

const boundAddB = addB.bind(objB);
console.log(boundAddB(1, 2, 3)); // 48



// ----- DOM Examples

// the greatest benefit of using Arrow functions is with DOM-level methods 
// setTimeout, setInterval, addEventListener
// that usually required some kind of closure, call, apply or bind to ensure the function executed in the proper scope.



// With traditional function expressions, code like this does not work as expected:
// See 2_this_part1.js > CALLBACKS

let objC = {
    count: 10,

    doSomethingLater: function () {

        setTimeout(function () { // the function executes on the window scope
            this.count++;
            console.log(this.count);
        }, 300);
    }
}

objC.doSomethingLater(); // console prints "NaN", because the property "count" is not in the window scope.



// With arrow functions, the this scope is more easily preserved:

let objD = {
    count: 10,

    doSomethingLater() {
        // The method syntax binds "this" to the "obj" context.
        setTimeout(() => {
            // Since the arrow function doesn't have its own binding 
            // and setTimeout (as a function call) doesn't create a binding itself, 
            // the "obj" context of the outer method is used.
            this.count++;
            console.log(this.count);
        }, 300);
    },
};

objD.doSomethingLater(); // logs 11



// ----------------------------- > CLOSURES -----------------------------

// A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
// In other words, a closure gives you access to an outer function's scope from an inner function. 
// In JavaScript, closures are created every time a function is created, at function creation time.

function init() {

    let name = "Mozilla"; // name is a local variable created by init

    // displayName() is the inner function, that forms the closure
    function displayName() {
        console.log(name); // use variable declared in the parent function
    }

    displayName();
}

init(); // Mozilla

// init() creates a local variable called name and a function called displayName(). 
// The displayName() function is an inner function that is defined inside init() and is available only within the body of the init() function. 
// Note that the displayName() function has no local variables of its own. 
// However, since inner functions have access to the variables of outer functions, displayName() can access the variable name declared in the parent function, init().

// In short, nested functions have access to variables declared in their outer scope, which in this case is the scope of the outer function (the function scope).



// ----- Another Example 

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



// ----------------------------- > CALLBACK -----------------------------

// Functions in JavaScript are 'first class', 
// which means they are treated like any other variable — including being passed to or returned from other functions.

// When they're passed as an argument to another function, they're known as a 'callback' — to be called when the other function is ready for them.

// Pass functions — don't invoke them
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
// We can't supply a function name with arguments directly in brackets



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

// JavaScript functions don't complain if you supply them with more arguments than they need, 
// so as long as you know the order in which arguments will be supplied,



// ----- Another Example 

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



// ----------------------------- > CALLBACK >> Getting 'This' Right When Passing Functions

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

// NOTE: Increasingly, with newer JavaScript syntax, declaring functions with arrow syntax will help: 
// they will automatically bind 'this' to the scope in which the function is declared.

// Arrow syntax fix:

setTimeout(() => ghost.sayBoo(), 3000) // Casper says: Boo!



// ----- Another Example with Explanation

const obj = {
    name: 'Alice',
    sayHello: function () {
        console.log(`Hello, ${this.name}`); // 'Hello, Alice'

        function innerFunc() {
            console.log(`Inside innerFunc, ${this.name}`); // 'Inside innerFunc, undefined'
        }

        innerFunc();
    }
};

obj.sayHello();
// Hello, Alice
// Inside innerFunc, undefined



// The reason why this inside the innerFunc reverts back to the global object (or undefined in strict mode) 
// is because of how JavaScript determines the value of this based on the execution context and scope chain.



// When you call innerFunc() inside the sayHello method, JavaScript creates a new execution context for the innerFunc function. 
// The value of this inside a function is determined by how the function is called, not by the lexical scope where the function is defined.

// In the case of innerFunc(), it is called as a regular function without any context object, so JavaScript looks up the scope chain to find the value of this. 
// Since innerFunc is not an object method and not bound to any context object, 
// it ends up inheriting the value of this from the global scope, which is the global object (or undefined in strict mode).



// Even though innerFunc is defined inside the sayHello method, its execution context is separate from the execution context of sayHello. 
// The sayHello method has its own this value bound to the obj object because it is called with obj.sayHello(). 
// However, this context is not automatically inherited by innerFunc because it is called as a standalone function without any context object.



// ----------------------------- > PURE FUNCTION -----------------------------

// The function always returns the same result if the same arguments are passed in. 
// It does not depend on any state, or data, change during a program's execution. 
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

function myFunction(a, b, c) {
    console.log(arguments[0]); // 1
    console.log(arguments[1]); // 2
    console.log(arguments[2]); // 3
}

myFunction(1, 2, 3);



// ----- Another Example

function myFunction() {
    console.log(arguments);
}
myFunction('a', 'b'); // [Arguments] { '0': 'a', '1': 'b' }



// ----- Arrow Functions

// Arrow functions do not have their own arguments object. 

// Thus, in this example, const arrowFunction does not has its own argument object
// The 'arguments' in arrowFunction is a reference to the argument object of the enclosing scope, which in this case is enclosingFunction

function enclosingFunction(n) {

    const arrowFunction = () => { 
        console.log(`${arguments[0]} + ${n} = ${arguments[0] + n}`) // enclosingFunction's arguments[0] is actually n
    }; 

    return arrowFunction();
}

enclosingFunction(3); // 3 + 3 = 6

// Note: You cannot declare a variable called arguments in strict mode, so the code above would be a syntax error.



// NOTE: In modern code, rest parameters should be preferred.