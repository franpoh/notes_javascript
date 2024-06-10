/* 
Table of Contents

> THE VALUE OF THIS
> METHOD
> FUNCTION
>> The value of this
>> Strict / Non-strict
> CALLBACKS
> ARROW FUNCTIONS
> BIND()
> CALL()
> APPLY()
> DOM EVENT HANDLER
> INLINE EVENT HANDLER
*/



// The this keyword refers to the context where a piece of code, such as a function's body, is supposed to run. 

const test = {
    prop: 42,
    runTest: function () {
        console.log(this.prop);;
    },
};

test.runTest(); // 42



// Most typically, it is used in object methods, where this refers to the object that the method is attached to, thus allowing the same method to be reused on different objects.

const copyTest = Object.create(test); // create a copy of the test object
copyTest.prop = 'Forty-two'; // change the value of the key 'prop'
copyTest.runTest(); // Forty-two

// This example demonstrates that the context of 'this' in copyTest has changed. It now no longer refers to 'test', it refers to 'copyTest'
// Therefore, you can see how 'this' allows the same method to be reused in different contexts 

// We will look at more examples of this reusability later



// ----------------------------- > THE VALUE OF THIS -----------------------------

// The value of this in JavaScript depends on how a function is invoked (runtime binding), not how it is defined. 

// When a regular function is invoked as a method of an object (obj.method()), this points to that object. 
// When invoked as a standalone function (not attached to an object: func()), this typically refers to the global object (in non-strict mode) or undefined (in strict mode). 
// Event handler attributes are executed with this set to the element they are attached to.

// The Function.prototype.bind() method can create a function whose this binding doesn't change, 
// and methods apply() and call() can also set the this value for a particular call.



// NOTE: Arrow functions differ in their handling of this: they inherit this from the parent scope at the time they are defined. 
// This behavior makes arrow functions particularly useful for callbacks and preserving context. 
// However, arrow functions do not have their own this binding. Therefore, their this value cannot be set by bind(), apply() or call() methods, nor does it point to the current object in object methods.



// +++++ Global 'this' 

// At the top level of a script, 'this' refers to 'globalThis' whether in strict mode or not. This is generally the same as the global object

// NOTE: However, global variables can work differently depending on whether it is declared with var, let or const
// See Cheatsheet\global_scope.js



// Inside a function, 'this' defaults to the global object and therefore returns true

function compare() {
    console.log(this === globalThis)
}

compare(); // true



// Here, we are using 'this' at the top level 

console.log(this === globalThis);
// When executed in a Node environment (as it is in VScode with Code Runner) it is false
// When executed in a browser window environment it is true

console.log(this); // {}
console.log(globalThis); // Object [global] { }

// Note that some source code, while looking like the global scope, is actually wrapped in a function when executed. 
// For example, Node.js CommonJS modules are wrapped in a function and executed with the this value set to module.exports. 



// In web browsers, the window object is also the global object. Run this in browser console:

console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b) // "MDN"
console.log(b) // "MDN"



// Another Example

var a = 'Global';

const obj = {
    a: 'Custom',
}

function whatsThis() {
    return this.a; // The value of this is dependent on how the function is called
}

// This will only return 'Global' in browser, it returns 'undefined' in Node
console.log(whatsThis()); // 'Global'; this in the function isn't set, so it defaults to the global/window object in non–strict mode

obj.whatsThis = whatsThis;

console.log(obj.whatsThis()); // 'Custom'; this in the function is set to obj

// used alone, the owner is the Global object, so this refers to the Global object.



// +++++ 'this' in Objects

// Object literals don't create a this scope — only functions (methods) defined within the object do. 
// Using this in an object literal inherits the value from the surrounding scope.

const globalThingie = this;

const obj = {
    a: this,
};

console.log(obj.a === globalThingie); // true



// ----------------------------- > METHOD -----------------------------

// We have already seen 'this' in methods at the beginning, but let's look at it again with another example

let francine = {
    firstName: 'Francine',
    lastName: 'Poh',
    age: 34,

    introduction: function () {
        console.log(`Hi, my name is ${this.firstName} ${this.lastName}, and I am ${this.age} this year.`);
    }
}

francine.introduction(); // Hi, my name is Francine Poh, and I am 34 this year.



// Let's look at what happens when you don't use 'this'

francine = {
    firstName: 'Francine',
    lastName: 'Poh',
    age: 34,

    introduction: function () {
        console.log(`Hi, my name is ${firstName} ${lastName}, and I am ${age} this year.`); // this has been removed
    }
}

francine.introduction(); // ReferenceError: firstName is not defined

// Remember what we said earlier: The value of 'this' in JavaScript depends on how a function is invoked (runtime binding), not how it is defined. 

// introduction() might be defined inside of francine, but it is being ran as (more or less) a standalone function in the global scope
// Also, with the omission of the 'this' keyword, the variables in the function are no longer pointing to the variables in the object 'francine'
// Therefore, the variables firstName, lastName, and age are being treated as undefined variable names within the introduction function, instead of properties of the francine object.

// Functionally, it is the same as doing this:

function introduction() {
    console.log(`Hi, my name is ${firstName} ${lastName}, and I am ${age} this year.`);
}

introduction(); // ReferenceError: firstName is not defined



// Let's see what happens when those variables are defined in the global scope


let firstName = 'Werner';
let lastName = 'Marschall';
let age = 57;

francine = {
    firstName: 'Francine',
    lastName: 'Poh',
    age: 34,

    introduction: function () {
        console.log(`Hi, my name is ${firstName} ${lastName}, and I am ${age} this year.`); // this is still removed
    }
}

// the introduction function now has global-scoped variables to point to
francine.introduction(); // Hi, my name is Werner Marschall, and I am 57 this year.



// Always remember to use the 'this' keyword if you want to access your object properties correctly



// ----------------------------- > FUNCTION -----------------------------

// Inside a function, the value of this depends on how the function is called. 

// Think about this as a hidden parameter of a function —
// just like the parameters declared in the function definition, this is a binding that the language creates for you when the function body is evaluated



// In typical function calls, this is implicitly passed like a parameter through the function's prefix *(the part before the dot). 

// * the part before the dot: When you have an object with a method (a function assigned as a property of the object), and you call that method using the dot notation, the part before the dot is the prefix.

const john = {
    name: 'John',
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
}

john.greet(); // Output: Hello, my name is John

// In this case, john is the prefix, and greet is the method being called.

// When you invoke a method using the dot notation like john.greet(), the JavaScript engine implicitly sets the value of this inside the greet function to the object that the method belongs to (john). 
// This is why this.name inside the greet method correctly refers to the name property of the john object.

// However, it's important to note that the value of this can be changed or bound to different values using techniques like call(), apply(), bind(), or arrow functions. 
// The behavior described above is just the default way this is set when calling a method on an object using the dot notation.



// +++++ Let's look at another way of using 'this', where we show how the value of 'this' is the object that the function is accessed on

function getName() {
    return this.name;
}

const lassie = { name: "Lassie the Dog" };
const buddy = { name: "Buddy the Also Dog" };

// Creating and assigning a value to new 'getName' properties in objects
lassie.getName = getName;
buddy.getName = getName;

console.log(lassie.getName()); // Lassie the Dog
console.log(buddy.getName()); // Buddy the Also Dog

// Note how the function is the same, but based on how it's invoked, the value of this is different. 
// This is analogous to how function parameters work.



// ----------------------------- > FUNCTION >> The value of this 

// The value of this is not the object that has the function as an own property, but the object that is used to call the function. 
// You can prove this by calling a method of an object up in the *prototype chain.

// * prototype
//      See Cheatsheet\coding\prototype.js
//      You will also learn more in 9_object\prototypes.js

const mickey = {
    name: "Mickey",
    animal: "Mouse",
    getName() {
        return `${this.name} ${this.animal}`;
    },
}

const donald = {
    __proto__: mickey,
    name: "Donald",
    animal: "Duck",
}

console.log(mickey); // { name: 'Mickey', animal: 'Mouse', getName: [Function: getName] }

// getName method not shown in object as it belongs to donald's prototype, mickey
console.log(donald); // { name: 'Donald', animal: 'Duck' }

// But you can still use the getName method in donald (in accordance with how prototypes work)
console.log(donald.getName()); // Donald Duck

// The value of this always changes based on how a function is called, even when the function was defined on an object at creation



// ----------------------------- > FUNCTION >> Strict / Non-strict

// +++++ Strict Mode
// JavaScript strict mode does not allow default binding.
// So, when used in a function, in strict mode, this is undefined

"use strict";

function getThis() {
    return this;
}

console.log(getThis());
// undefined; with "use strict"
// Object [global] { ... }; without "use strict"



// If the value that the method is accessed on is a primitive, this will be a primitive value as well — but only if the function is in strict mode.

const primitiveSeven = 7;

// NOTE: Using call() to assign an arbitrary value as 'this' when calling an existing function, without first attaching the function to the object as a property. 
// You will see more in > CALL later.

// using call() to set primitiveSeven as the value of 'this' in 'getThis'
console.log(getThis.call(primitiveSeven)); // 7
console.log(typeof getThis.call(primitiveSeven)); // number



// +++++ Default Non-Strict

// In a JavaScript function, the owner of the function is the default binding for this.
// In non-strict mode, a special process called this substitution ensures that the value of this is always an object.

function getThis() {
    return this;
}

// If a function is called with this set to undefined or null, this gets substituted with globalThis.

console.log(getThis() === globalThis); // true



// +++++ Object Conversion in Non-Strict

// If the function is called with this set to a primitive value, this gets substituted with the primitive value's *wrapper object.
// * wrapper object: See 9_object\object_wrapper.js

const primitiveZeven = 7;

// NOTE: Using call() to assign an arbitrary value as 'this' when calling an existing function, without first attaching the function to the object as a property. 
// You will see more in > CALL later.

// using call() to set primitiveZeven as the value of 'this' in 'getThis'
console.log(getThis.call(primitiveZeven)); // [Number: 7]
console.log(typeof getThis.call(primitiveZeven)); // object



// Another Example

function bar() {
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]
bar.call("foo"); // [object String]
bar.call(undefined); // [object Window]



// ----------------------------- > CALLBACKS -----------------------------

// When a function is passed as a callback, the value of this depends on how the callback is called, which is determined by the implementor of the API. 

// For example, if you use the setTimeout function in JavaScript, which is part of the Web API provided by the browser, 
// the implementor of this API (in this case, the browser vendor) has decided that when the callback function passed to setTimeout is called, 
// the value of this within that callback will be the global object (window in a web browser, or global in Node.js).

let ghost = {
    name: 'Casper',
    sayBoo: function () {
        console.log(`${this.name} says: Boo!`)
    }
}

ghost.sayBoo() // Casper says: Boo!; 'this' refers to our ghost
setTimeout(ghost.sayBoo, 1000) // undefined says: Boo!; 'this' refers to the global object

// See > ARROW FUNCTIONS for a fix!



// Callbacks are typically called with a 'this' value of undefined (calling it directly without attaching it to any object), 
// which means if the function is non–strict, the value of this is the global object (globalThis). 
// This is the case for iterative array methods, the Promise() constructor, etc.

function logThis() {
    "use strict"; // Using strict mode, otherwise the global object will be returned
    console.log(this);
}

[1, 2, 3].forEach(logThis); // undefined, undefined, undefined



// Some APIs allow you to set a this value for invocations of the callback. 
// For example, all iterative array methods and related ones like Set.prototype.forEach() accept an optional *thisArg parameter.

// * thisArg: An object to which the this keyword can refer in the callbackfn function. 
// If thisArg is omitted, undefined is used as the this value.

function logThis() {
    "use strict";
    console.log(this);
}

[1, 2, 3].forEach(logThis, "Hello World!"); // Hello World! Hello World! Hello World!



// Occasionally, a callback is called with a this value other than undefined. 
// For example, the reviver parameter of JSON.parse() and the replacer parameter of JSON.stringify() are both called with this set to the object that the property being parsed/serialized belongs to.



// +++++ Another Example with Explanation

const obj = {

    name: 'Outer',

    outerMethod: function () {

        console.log(this.name); // Outer

        const regularFunction = function () {
            console.log(this.name); // undefined (or Window/global object)
        }

        regularFunction();
    }

}

obj.outerMethod();
// Outer
// undefined



// When a regular function is defined inside an object method, it creates a new execution context with its own this value that is separate from the this value of the enclosing method. 
// This is because the value of this inside a regular function is determined dynamically at runtime based on how the function is called, not where it is defined.

// When 'obj.outerMethod()' is called, 'this' inside 'outerMethod' refers to the 'obj' object, so 'Outer' is logged.
// Inside 'outerMethod', a new regular function 'regularFunction' is defined.
// When 'regularFunction' is called, it creates a new execution context with its own 'this' value.
// Since 'regularFunction' is called as a regular function (not as a method), its 'this' value is set to the global object (window in browsers, global in Node.js) or undefined in strict mode.
// Therefore, 'this.name' inside 'regularFunction' logs 'undefined' (or the value of name on the global object if it exists).

// The key point is that regular functions defined inside methods create their own execution context with a separate this value, 
// which is determined dynamically at call-time based on how the function is invoked.



// Demonstrating 3 fixes, one with call, one with bind, and one with an arrow function

const obj = {

    name: 'Outer',

    outerMethod: function () {

        console.log(this.name); // Outer

        const regularFunction = function () {
            console.log(this.name);
        }

        regularFunction(); // undefined

        // fix with call
        regularFunction.call(obj); // Outer

        // fix with bind
        (regularFunction.bind(obj))(); // Outer

        // fix with arrow function; See more in > ARROW FUNCTIONS to learn about arrow function's autobound feature
        const arrowFunction = () => {
            console.log(this.name);
        }

        arrowFunction(); // Outer

    }

}

obj.outerMethod();
// Outer
// undefined
// Outer
// Outer
// Outer



// ----------------------------- > ARROW FUNCTIONS -----------------------------

// Arrow functions:
//      do not have their own this
//      value is set to what it was when it was created
//      are best suited for non-method functions



// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In other words, when evaluating an arrow function's body, the language does not create a new this binding.

// For example, in global code, this is always globalThis regardless of strictness, because of the global context binding:

const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true



// +++++ Another Example

const chocolate = {
    name: 'chocolate',

    // normal method 
    getName: function () {
        return this.name;
    },

    // method written as arrow function
    getNameAgain: () => {
        return this.name;
    },

    // method enclosing an arrow function within
    getNameWithin: function () {
        const arrowFunc = () => this.name;
        return arrowFunc();
    }
}

console.log(chocolate.getName()); // chocolate
console.log(chocolate.getNameAgain()); // undefined
console.log(chocolate.getNameWithin()); // chocolate

// getNameAgain() didn't work, but getNameWithin() did. How it works is all because of this two statements: 
//      Arrow functions do not have their own 'this'
//      Object literals don't create a 'this' scope — only functions (methods) defined within the object do.

// Therefore, for getNameAgain(), its enclosing lexical scope is the global scope, not the object 'chocolate' itself.
// Calling chocolate.getNameAgain() will return either the global object, or undefined

// For getNameWithin(), we defined an arrow function within called arrowFunc()
// Here, arrowFunc() inherits 'this' from its enclosing scope getNameWithin(), which itself is a regular method function bound to the 'chocolate' object when called as chocolate.getNameWithin()



// So in summary, arrow functions defined directly inside objects do not inherit the object's context because they lexically bind this based on their enclosing scope, 
// which is the global scope when defined as a top-level property of an object literal.

// However, a workaround will be to define the arrow function within an object method, which will then bind its 'this' to the object method's 'this'
// There are other methods involving call() and bind(), which we will look at later



// +++++ Another Example

const getName = function () {
    return this.name;
}

const getNameAgain = () => {
    return this.name;
}

const lassie = { name: "Lassie the Dog" };
const buddy = { name: "Buddy the Also Dog" };

lassie.getName = getName;
buddy.getNameAgain = getNameAgain;

console.log(lassie.getName()); // Lassie the Dog
console.log(buddy.getNameAgain()); // undefined



// arrow functions create a closure over the 'this' value of its surrounding scope, which means arrow functions behave as if they are "auto-bound" — 
// no matter how it's invoked, 'this' is set to what it was when the function was created (in the example above, the global object). 
// in short, the value of 'this' is set to what it was when it was created and will not change

// The same applies to arrow functions created inside other functions: their 'this' remains that of the enclosing lexical context.



// Furthermore, when invoking arrow functions using call(), bind(), or apply(), the thisArg parameter is ignored. 
// You can still pass other arguments using these methods, though.

const globalObj = this;
const baz = () => this;
const obj = { name: "object" };

// Attempt to set this using call
console.log(baz.call(obj) === globalObj); // true

// Attempt to set this using bind
const boundBaz = baz.bind(obj);
console.log(boundBaz() === globalObj); // true



// NOTE: However, the autobound 'this' in arrow functions can be useful.

// Remember this example given at the beginning of the > CALLBACKS section?

ghost = {
    name: 'Casper',
    sayBoo: function () {
        console.log(`${this.name} says: Boo!`)
    }
}

// 'this' works as it should in this function call
ghost.sayBoo() // Casper says: Boo!; 'this' refers to our ghost

// invoking a function with utilising 'this' as a callback from within another function (setTimeout) alters what 'this' refers to normally - reverting to the global object/window.
setTimeout(ghost.sayBoo, 3000) // undefined says: Boo!; 'this' refers to the global object

// Fixing the callback with an arrow function: 
setTimeout(() => ghost.sayBoo(), 3000) // Casper says: Boo!

// NOTE: Increasingly, with newer JavaScript syntax, declaring functions with arrow syntax will help
// they will automatically bind 'this' to the scope in which the function is declared.

// It is functionally the same as using bind()
setTimeout(ghost.sayBoo.bind(ghost), 2000) // Casper says: Boo!



// +++++ Another Example

const obj = {

    name: 'Pancake',

    getThisGetter() {
        const getter = () => this.name; // this is permanently bound to the 'this' of its enclosing function
        return getter;
    },

};



// The value of 'this' inside getThisGetter can be set in the call, which in turn sets the return value of the returned function.

// when you call getThisGetter as a method of obj, it sets 'this' to the context of obj
const fn = obj.getThisGetter();

// the returned function is assigned to the variable fn
console.log(fn); // [Function: getter]

// Now, when calling fn, the value of 'this' returned is still the one set by the call to getThisGetter, which is obj
console.log(fn()); // Pancake



// But be careful if you unbind the method of obj by not calling it, because getThisGetter is still a method that has a varying 'this' value, depending on how it is called 

// Assigning obj's getThisGetter method to fn2 only. It has not been called, and therefore its 'this' is not set to obj
const fn2 = obj.getThisGetter;

// Calling fn2()() in the following example returns globalThis, 
// because it follows the 'this' from fn2, which is globalThis since it's called without being attached to any object.
console.log(fn2()() === globalThis); // true



// The above behavior is very useful when defining callbacks. 
// Usually, each function expression creates its own 'this' binding, which shadows the 'this' value of the upper scope. 

// Now, you can define functions as arrow functions if you don't care about the 'this' value, 
// and only create 'this' bindings where you do (e.g. in class methods). 



// ----------------------------- > BIND() -----------------------------

// bind() is used to create a new function with a specific 'this' value bound to it. 
// In other words, it allows you to set the 'this' value for a function, regardless of how or where the function is called.

// Calling bind() creates a new function with the same body and scope as f, 
// but the value of this is permanently bound to the first argument of bind, regardless of how the function is being called.

function theFunction() { };
let theObject = {};
let newFunction = theFunction.bind(theObject); // newFunction is a new function that has the code of theFunction, with theObject bound permanently as its 'this' value
console.log(newFunction); // [Function: bound theFunction]



// +++++ Example

function say() {
    return this.word;
}

const hello = say.bind({ word: "bye" });
console.log(hello()); // bye

const hoi = hello.bind({ word: "doei" }); // bind() only works once
console.log(hoi()); // bye

const ciao = { word: 'ciao', say, hello, hoi };
console.log(ciao.word, ciao.say(), ciao.hello(), ciao.hoi()); // ciao, ciao, bye, bye



// +++++ Example

function getName() {
    return this.name;
}

const poh = {
    name: 'Francine',
}

console.log((getName.bind(poh))()); // Francine



// +++++ Example

const burger = {
    filling: "beef patty",

    getFilling: function () {
        return this.filling;
    }
}

const sandwich = {
    filling: "bacon",
}

console.log(burger.getFilling()); // beef patty

const unboundGetFilling = burger.getFilling;

// The function gets invoked at the global scope
console.log(unboundGetFilling()); // undefined 

const boundGetFilling = unboundGetFilling.bind(sandwich);

console.log(boundGetFilling()); // bacon



// ----------------------------- > CALL() -----------------------------

// With call(), you can call a function on objects that the function is not a property of
// The call() method of Function instances calls the function with a given 'this' value and arguments provided individually.

// Normally, when calling a function, the value of 'this' inside the function is the object that the function was accessed on. 
// With call(), you can assign an arbitrary value as 'this' when calling an existing function, without first attaching the function to the object as a property. 
// This allows you to use methods of one object as generic utility functions.

theFunction.call(theObject);
theFunction.call(otherObject);
theFunction.call(whateverObject, moreArgs);



// NOTE: While the syntax of this function is almost identical to that of apply(), there is a difference:
//  call() accepts an argument list, while apply() accepts a single array of arguments.



// +++++ Example

const getName = {
    fullName: function () {
        console.log(`${this.firstName} ${this.lastName}`);
    }
}

const thisPerson = {
    firstName: "John",
    lastName: "Doe",
}

getName.fullName.call(thisPerson);  // John Doe



// +++++ Example with moreArgs

function add(c, d) {
    return this.a + this.b + c + d;
}

let someNumbers = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// subsequent parameters are passed as arguments in the function call
console.log(add.call(someNumbers, 5, 7)); // 16



// +++++ Example with moreArgs

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

function Cleaning(name, price, cleaningType) {
    Product.call(this, name, price);
    this.category = 'Cleaning Product';
    this.cleaningType = cleaningType;
}

const gouda = new Food('cheese', 5);
console.log(gouda); // Food { name: 'cheese', price: 5, category: 'food' }
console.log(gouda.name); // cheese
console.log(gouda.price); // 5
console.log(gouda.category); // food

const laundryPowder = new Cleaning('laundry powder', 7, 'clothes');
console.log(laundryPowder); // Cleaning {   name: 'laundry powder', price: 7, category: 'Cleaning Product', cleaningType: 'clothes' }



// ----------------------------- > APPLY() -----------------------------

// apply() works like call(), but with arrays as the argument instead
// The apply() method calls the specified function with a given this value, and arguments provided as an array (or an array-like object).

// Normally, when calling a function, the value of 'this' inside the function is the object that the function was accessed on. 
// With call(), you can assign an arbitrary value as 'this' when calling an existing function, without first attaching the function to the object as a property. 
// This allows you to use methods of one object as generic utility functions.

theFunction.apply(theObject);
theFunction.apply(otherObject);
theFunction.apply(whateverObject, argsArray);



// +++++ Example

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max); // 7

const min = Math.min.apply(null, numbers);

console.log(min); // 2



// +++++ Example

function add(c, d) {
    return this.a + this.b + c + d;
}

someNumbers = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// the second is an array whose members are used as the arguments in the function call
console.log(add.apply(someNumbers, [10, 20])); // 34



// +++++ Example

function getDetails (year, month, date) {
    console.log(`${this.firstName} ${this.lastName} is born on ${date}/${month}/${year}`);
}

const thatPerson = {
    firstName: "John",
    lastName: "Doe",
}

const dob = [1990, 6, 8];

getDetails.apply(thatPerson, dob);  // John Doe is born on 8/6/1990



// ----------------------------- > DOM EVENT HANDLER -----------------------------

// When a function is used as an event handler, its this is set to the element on which the listener is placed 
// (some browsers do not follow this convention for listeners added dynamically with methods other than addEventListener()).



// When called as a listener, turns the related element blue

function bluify(event) {

    console.log(this === event.currentTarget); // Always true
    console.log(this === event.target); // true when currentTarget and target are the same object

    this.style.backgroundColor = "#A5D9F3";

}



// ----------------------------- > INLINE EVENT HANDLER -----------------------------

// When the code is called from an inline event handler attribute, its this is set to the DOM element on which the listener is placed:

{/* <button onclick="alert(this.tagName.toLowerCase());">Show this</button> */ }

// The above alert shows button. Note, however, that only the outer code has its 'this' set this way:

{/* 
<button onclick="alert((function () { return this; })());">
  Show inner this
</button> 
*/}

// In this case, the inner function's 'this' isn't set, so it returns the global/window object (i.e. the default object in non–strict mode where 'this' isn't set by the call).