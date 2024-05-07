/* 
Table of Contents

> WHAT IS A FUNCTION
> RETURN
> FUNCTION DECLARATION
> FUNCTION EXPRESSION
>> IIFE (Immediately Invoked Function Expression)
>> Names
> CLOSURES
> ARROW FUNCTION EXPRESSION
>> Concise Body / Block Body
>> Cannot be Used as Methods
>>> Class Methods
>> NO BINDING OF ARGUMENTS 
>> Examples
> CALLBACK
>> How to pass arguments properly with callbacks
>> Inserting callback functions in functions with predefined arguments
>> Getting ‘This’ Right When Passing Functions
> PURE FUNCTION
> ARGUMENTS OBJECT
*/



// ----------------------------- > WHAT IS A FUNCTION -----------------------------

// Define a function by using the keyword 'function', followed by a name, with parentheses ( ) put after it. 
// After that we put two curly braces { }. Inside the curly braces goes all the code that we want to run whenever we call the function

let myName = 'Francine'; // an argument that we can use in the function

function myFunction(parameter) {
    // statement
    console.log(`I am ${parameter}`);
}

// Run the function by using the function name, followed by ()
myFunction(myName); // Note myName being passed into the function

// myFunction - The function name.
// parameter - The name of an argument to be passed to the function.
// statement - The statements comprising the body of the function.

// Functions are reusable blocks of code that you can write once and run again and again, saving the need to keep repeating code all the time



// Functions that are part of objects are called methods

let objectThing = {

    thisThing: 'I am a thing',

    // This is a method
    thisMethod: function () {
        console.log(this.thisThing);
    }
}

objectThing.thisMethod(); // I am a thing



// ----------------------------- > VARIABLES IN FUNCTIONS -----------------------------

let hello = 'hello there';

function greeting() {
    console.log(hello);
}

greeting(); // hello there




// ----------------------------- > RETURN -----------------------------

// To return a value other than the default, a function must have a return statement that specifies the value to return
// A function without a return statement will return a default value.
// When a return statement is used in a function body, the execution of the function is stopped.



// ----- Passing by Value

let a = 2;
let b = 3;

function multiple(a, b) { // ‘a’ and ‘b’ in here is declared but not defined
    return a * b;
} // outside of this function, ‘a = 2’ and ‘b = 3’

console.log(a * b); // 6
console.log(multiple(a, b)); // 6 
console.log(multiple(4, 5)); // 20



// ----- Passing by Value, continuation

let apple = 2;
let banana = 3;

function multiple() { // no parameters 
    return apple * banana;
}

console.log(apple * banana); // 6
console.log(multiple(apple, banana)); // 6
console.log(multiple(4, 5)); // 6
console.log(multiple()); // 6



// ----- Parameter Assigned a Value

function multiple(africa, britain = 5) {
    return africa * britain;
}

console.log(multiple(2, 3)); // 6
console.log(multiple(2)); // 10
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



// Unnamed Function

let farewell = function(name) {
    console.log(`Bye ${name}!`);
}

farewell('Werner'); // Bye Werner!



// Unnamed Function Being Used as a Callback

button.addEventListener('click', function (event) {
    console.log('button is clicked!')
});



// ----------------------------- > FUNCTION EXPRESSION >> IIFE (Immediately Invoked Function Expression) 

// A function expression can be used as an IIFE (Immediately Invoked Function Expression) which runs as soon as it is defined.

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

var foo = function () { };
console.log(foo.name); // foo

var foo2 = foo;
console.log(foo2.name); // foo

var bar = function baz() { };
console.log(bar.name); // baz

console.log(foo === foo2); // true
console.log(typeof baz); // undefined
console.log(bar === baz); // false (errors because baz == undefined)



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



// ----------------------------- > ARROW FUNCTION EXPRESSION -----------------------------

// An arrow function expression is a compact alternative to a traditional function expression, 
// with some semantic differences and deliberate limitations in usage: 

// Arrow functions cannot use yield within their body and cannot be created as generator functions.

() => { statements }



// If the arrow function contains one expression, and you omit the function’s curly braces, then the expression is implicitly returned. 

() => expression;



// Rest parameters, default parameters, and destructuring within params are supported, and always require parentheses:

(a, b, ...r) => expression;

(a = 400, b = 20, c) => expression;

([a, b] = [10, 20]) => expression;

({ a, b } = { a: 10, b: 20 }) => expression;



// Arrow functions can be async by prefixing the expression with the async keyword.

async param => expression;

async (param1, param2, ...paramN) => {
    statements
}



// Arrow functions cannot be used as constructors. 
// Calling them with new throws a TypeError. They also don't have access to the new.target keyword.

const Foo = () => { };
const foo = new Foo(); // TypeError: Foo is not a constructor

// Arrow functions do not have a prototype property.

console.log("prototype" in Foo); // false



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

var func = x => x * x; // concise body syntax, implied "return"

var func = (x, y) => { return x + y; }; // with block body, explicit "return" needed



// Returning object literals using the concise body syntax (params) => { object: literal } does not work as expected.

const func = () => { foo: 1 }; // Calling func() returns undefined!

// This is because JavaScript only sees the arrow function as having a concise body if the token following the arrow is not a left brace, 
// so the code inside braces ({}) is parsed as a sequence of statements, where foo is a label, not a key in an object literal.

// To fix this, wrap the object literal in parentheses:

var func = () => ({ foo: 1 });




// ----------------------------- > ARROW FUNCTION EXPRESSION >> Cannot be Used as Methods

// Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
// not for call, apply and bind methods, which generally rely on establishing a scope.

"use strict";

const obje = {

    i: 10,

    b: () => console.log('Arrow Function / ', 'this.i: ', this.i, ' / this: ', this),

    c() {
        console.log('Function Expression / ', 'this.i: ', this.i, ' / this: ', this);
    },

};

obje.b(); // Arrow Function /  this.i:  undefined  / this:  {} (or the global object)
obje.c(); // Function Expression /  this.i:  10  / this:  { i: 10, b: [Function: b], c: [Function: c] }



// ----------------------------- > ARROW FUNCTION EXPRESSION >> Cannot be Used as Methods >>> Class Methods

// Because a class's body has a this context, arrow functions as class fields close over the class's this context, 
// and the this inside the arrow function's body will correctly point to the instance (or the class itself, for static fields). 

// However, because it is a closure, not the function's own binding, the value of this will not change based on the execution context.

class C {

    a = 1;

    autoBoundMethod = () => {
        console.log(this.a);
    };

}

const c = new C();

c.autoBoundMethod(); // 1

const { autoBoundMethod } = c;

autoBoundMethod(); // 1 - If it were a normal method, it should be undefined in this case



// Arrow function properties are often said to be "auto-bound methods", because the equivalent with normal methods is:

class Z {

    a = 1;
    b = 2;

    constructor() {
        this.methodA = this.methodA.bind(this);
    }

    methodA() {
        console.log(this.a);
    }

    methodB() {
        console.log(this.b);
    }

}

const z = new Z();

z.methodA(); // 1
z.methodB(); // 2

const { methodA } = z;
console.log(methodA); // [Function: bound methodA]
methodA(); // 1

const { methodB } = z;
console.log(methodB); // [Function: methodB]
methodB(); // TypeError: Cannot read properties of undefined (reading 'b')



// Note: Class fields are defined on the instance, not on the prototype, 
// so every instance creation would create a new function reference and allocate a new closure, 
// potentially leading to more memory usage than a normal unbound method.



// For similar reasons, the call(), apply(), and bind() methods are not useful when called on arrow functions, 
// because arrow functions establish this based on the scope the arrow function is defined within, 
// and the this value does not change based on how the function is invoked.
// whereas call(), apply() and bind() as were designed to allow methods to execute within different scopes 



// ----------------------------- > ARROW FUNCTION EXPRESSION >> NO BINDING OF ARGUMENTS 

// See > ARGUMENTS OBJECT

// Arrow functions do not have their own arguments object. 
// Thus, in this example, arguments is a reference to the arguments of the enclosing scope:

const arguments = [1, 2, 3];
const arrr = () => arguments[0];

console.log(arrr()); // 1

function foo(n) {

    // 'arguments' in the line below doesn't refer to 'const f = () => {...}' arguments, as it does not have its own arguments object
    // it instead points to 'function foo() {...}' arguments 
    const f = () => { console.log(`${arguments[0]} + ${n} = ${arguments[0] + n}`) }; // foo's implicit arguments binding, arguments[0] is n

    return f();
}

foo(3); // 3 + 3 = 6

// Note: You cannot declare a variable called arguments in strict mode, so the code above would be a syntax error.



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

// See this.js > ARROW FUNCTIONS

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



// -----------------------------

// the greatest benefit of using Arrow functions is with DOM-level methods 
// setTimeout, setInterval, addEventListener
// that usually required some kind of closure, call, apply or bind to ensure the function executed in the proper scope.



// With traditional function expressions, code like this does not work as expected:
// See > CALLBACK >> Getting ‘This’ Right When Passing Functions

var obj = {
    count: 10,

    doSomethingLater: function () {

        setTimeout(function () { // the function executes on the window scope
            this.count++;
            console.log(this.count);
        }, 300);
    }
}

obj.doSomethingLater(); // console prints "NaN", because the property "count" is not in the window scope.



// With arrow functions, the this scope is more easily preserved:

const obj = {
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

obj.doSomethingLater(); // logs 11



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

// NOTE: Increasingly, with newer JavaScript syntax, declaring functions with arrow syntax will help: 
// they will automatically bind ‘this’ to the scope in which the function is declared.

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



// ----- Another Example

function myFunction() {
    console.log(arguments);
}
myFunction('a', 'b'); // [Arguments] { '0': 'a', '1': 'b' }



// NOTE: In modern code, rest parameters should be preferred.