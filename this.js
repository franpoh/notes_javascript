/* 
Table of Contents

> THE VALUE OF THIS
>> Method Context
> FUNCTION
>> Typical Function
>> The value of this 
>> Strict / Non-strict
> CALLBACKS
> ARROW FUNCTIONS
> CONSTRUCTORS
>> Super
> CLASS
>> Derived Classes
>> Bound Methods In Classes
> GLOBAL CONTEXT
> OBJECT CONVERSION
> BIND
> CALL
> APPLY 
> WITH GETTER OR SETTER
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



// At the top level of a script, 'this' refers to 'globalThis' whether in strict mode or not. This is generally the same as the global object

// NOTE: However, global variables can work differently depending on whether it is declared with var, let or const
// See Cheatsheet\global_scope.js



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



// ----- Let's look at another way of using 'this', where we show how the value of 'this' is the object that the function is accessed on

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

// ----- Strict Mode
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



// ----- Default Non-Strict

// In a JavaScript function, the owner of the function is the default binding for this.
// In non-strict mode, a special process called this substitution ensures that the value of this is always an object.

function getThis() {
    return this;
}

// If a function is called with this set to undefined or null, this gets substituted with globalThis.

console.log(getThis() === globalThis); // true

// If the function is called with this set to a primitive value, this gets substituted with the primitive value's *wrapper object.
// * wrapper object: See 9_object\object_wrapper.js

const primitiveZeven = 7;

// NOTE: Using call() to assign an arbitrary value as 'this' when calling an existing function, without first attaching the function to the object as a property. 
// You will see more in > CALL later.

// using call() to set primitiveZeven as the value of 'this' in 'getThis'
console.log(getThis.call(primitiveZeven)); // [Number: 7]
console.log(typeof getThis.call(primitiveZeven)); // object



// ----------------------------- > CALLBACKS -----------------------------

// When a function is passed as a callback, the value of this depends on how the callback is called, which is determined by the implementor of the API. 

// Callbacks are typically called with a this value of undefined (calling it directly without attaching it to any object), 
// which means if the function is non–strict, the value of this is the global object (globalThis). 
// This is the case for iterative array methods, the Promise() constructor, etc.

function logThis() {
    "use strict";
    console.log(this);
}

[1, 2, 3].forEach(logThis); // undefined, undefined, undefined



// Some APIs allow you to set a this value for invocations of the callback. 
// For example, all iterative array methods and related ones like Set.prototype.forEach() accept an optional *thisArg parameter.

// *thisArg — An object to which the this keyword can refer in the callbackfn function. 
// If thisArg is omitted, undefined is used as the this value.

function logThis() {
    "use strict";
    console.log(this);
}

[1, 2, 3].forEach(logThis, "This"); // This, This, This



// ----------------------------- > ARROW FUNCTIONS -----------------------------

// arrow function expressions are best suited for non-method functions.

// Arrow functions do not have their own this

// value is set to what it was when it was created



// In arrow functions, this retains the value of the enclosing lexical context's this. 
// In other words, when evaluating an arrow function's body, the language does not create a new this binding.

// For example, in global code, this is always globalThis regardless of strictness, because of the global context binding:

const globalObject = this;
const foo = () => this;
console.log(foo() === globalObject); // true



// arrow functions create a closure over the 'this' value of its surrounding scope, which means arrow functions behave as if they are "auto-bound" — 
// no matter how it's invoked, 'this' is set to what it was when the function was created (in the example above, the global object). 
// in short, the value of 'this' is set to what it was when it was created and will not change

// The same applies to arrow functions created inside other functions: their 'this' remains that of the enclosing lexical context.



// Furthermore, when invoking arrow functions using call(), bind(), or apply(), the thisArg parameter is ignored. 
// You can still pass other arguments using these methods, though.

const obje = { name: "obje" };

// Attempt to set this using call
console.log(foo.call(obje) === globalObject); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obje);
console.log(boundFoo() === globalObject); // true



// ----- NOTE: Example

const obj = {
    getThisGetter() {
        const getter = () => this; // this is permanently bound to the 'this' of its enclosing function
        return getter;
    },
};

// The value of 'this' inside getThisGetter can be set in the call, which in turn sets the return value of the returned function.



// call getThisGetter as a method of obj, which sets 'this' inside the body to obj
// returned function is assigned to a variable fn
const fn = obj.getThisGetter(); // already being called from inside obj, with return value assigned to fn

// Now, when calling fn, the value of 'this' returned is still the one set by the call to getThisGetter, which is obj
console.log(fn() === obj); // true



// But be careful if you unbind the method of obj without calling it, because getThisGetter is still a method that has a varying 'this' value. 
// Calling fn2()() in the following example returns globalThis, 
// because it follows the 'this' from fn2, which is globalThis since it's called without being attached to any object.
const fn2 = obj.getThisGetter; // assigning the getThisGetter function to fn2 only, is now not associated with obj
console.log(fn2()() === globalThis); // true



// The above behavior is very useful when defining callbacks. 
// Usually, each function expression creates its own 'this' binding, which shadows the 'this' value of the upper scope. 

// Now, you can define functions as arrow functions if you don't care about the 'this' value, 
// and only create 'this' bindings where you do (e.g. in class methods). See example with setTimeout().



// ----------------------------- > CONSTRUCTORS -----------------------------

// this is referring to the instantiated object

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

let myCar1 = new Car("Ford", 2014); // object instantiation 



// When a function is used as a constructor (with the new keyword), 
// its this is bound to the new object being constructed, no matter which object the constructor function is accessed on

function C() {
    this.a = 37;
}

var o = new C();
console.log(o.a); // 37

function C2() {
    this.a = 37;
    return { a: 38 };
}

o = new C2();
console.log(o.a); // 38

// In the last example (C2), because an object was returned during construction, the new object that this was bound to gets discarded. 
// This essentially makes the statement "this.a = 37;" dead code. 
// It's not exactly dead because it gets executed, but it can be eliminated with no outside effects.



// ----------------------------- > CONSTRUCTORS >> Super

// When a function is invoked in the super.method() form, 
// the this inside the method function is the same value as the this value around the super.method() call, 
// and is generally not equal to the object that super refers to. 

// This is because super.method is not an object member access like the ones above — 
// it's a special syntax with different binding rules. For examples, see the super reference.



// When calling super.prop as a function, the this value inside the prop function is the current this, not the object that super points to. 
// For example, the super.getName() call logs "Extended", despite the code looking like it's equivalent to Base.getName().

class Base {
    static getName() {
        console.log(this.name);
    }
}

class Extended extends Base {
    static getName() {
        super.getName();
    }
}

Extended.getName(); // Logs "Extended"  



// ----------------------------- > CLASS -----------------------------

// A class can be split into two contexts: static and instance. 

// Constructors, methods, and instance field initializers (public or private) belong to the instance context. 
// Static methods, static field initializers, and static initialization blocks belong to the static context. The this value is different in each context.



// The behavior of this in classes and functions is similar, since classes are functions under the hood. But there are some differences and caveats.

// Within a class constructor, this is a regular object. 
// All non-static methods within the class are added to the prototype of this

// Static methods are not properties of this. They are properties of the class itself.

class Example {
    constructor() {
        const proto = Object.getPrototypeOf(this);
        console.log(Object.getOwnPropertyNames(proto));
    }
    first() { }
    second() { }
    static third() { }
}

new Example(); // ['constructor', 'first', 'second']



// Field initializers are also evaluated in the context of the class. 
// Instance fields are evaluated with this set to the instance being constructed. 
// Static fields are evaluated with this set to the current class. 
// This is why arrow functions in field initializers are bound to the class.

class C {
    instanceField = this;
    static staticField = this;
}

const c = new C();
console.log(c.instanceField === c); // true
console.log(C.staticField === C); // true



// ----------------------------- > CLASS >> Derived Classes

// Unlike base class constructors, derived constructors have no initial this binding. 
// Calling super() creates a this binding within the constructor and essentially has the effect of evaluating the following line of code, where Base is the base class:

this = new Base();



// Warning: Referring to this before calling super() will throw an error.

// Derived classes must not return before calling super(), 
// unless the constructor returns an object (so the this value is overridden) or the class has no constructor at all.

class Base { }

class Good extends Base { }

class AlsoGood extends Base {
    constructor() {
        return { a: 5 };
    }
}

class Bad extends Base {
    constructor() { }
}

new Good(); // No constructor, therefore good
new AlsoGood(); // returns an object, overriding the 'this' value, therefore good
new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor



// ----------------------------- > CLASS >> Bound Methods In Classes

// Just like with regular functions, the value of this within methods depends on how they are called. 
// Sometimes it is useful to override this behavior so that this within classes always refers to the class instance. 
// To achieve this, bind the class methods in the constructor:

class Cat {

    constructor() {
        this.sayBye = this.sayBye.bind(this); // Bind sayBye but not sayHi to show the difference
    }

    sayHi() {
        console.log(`Hello from ${this.name}`);
    }

    sayBye() {
        console.log(`Bye from ${this.name}`);
    }

    get name() {
        return "Cat";
    }
}

class Bird {
    get name() {
        return "Bird";
    }
}

const cat = new Cat();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
cat.sayHi(); // Hello from Cat
bird.sayHi = cat.sayHi;
bird.sayHi(); // Hello from Bird

// For bound methods, 'this' doesn't depend on the caller
cat.sayBye(); // Bye from Cat
bird.sayBye = cat.sayBye;
bird.sayBye(); // Bye from Cat

class Tiger extends Cat {
    constructor() {
        super();
    }

    get name() {
        return "Tiger";
    }
}

class Dog {
    get name() {
        return "Dog";
    }
}

const tiger = new Tiger();
const dog = new Dog();

// But as you can see, in derived classes bound 'this' is now bound to the derived class that it's in, in this case 'Tiger'
tiger.sayHi(); // Hello from Tiger
tiger.sayBye(); // Bye from Tiger

dog.sayHi = tiger.sayHi;
dog.sayHi(); // Hello from Dog
dog.sayBye = tiger.sayBye;
dog.sayBye(); // Bye from Tiger



// Note: Classes are always in strict mode. Calling methods with an undefined this will throw an error if the method tries to access properties on this.



// Note, however, that auto-bound methods suffer from the same problem as using arrow functions for class properties: 
// each instance of the class will have its own copy of the method, which increases memory usage. 
// Only use it where absolutely necessary. 

// You can also mimic the implementation of Intl.NumberFormat.prototype.format(): 
// define the property as a getter that returns a bound function when accessed and saves it, so that the function is only created once and only created when necessary.



// ----------------------------- > GLOBAL CONTEXT -----------------------------

// In the global execution context 
// (outside of any functions or classes; may be inside blocks or arrow functions defined in the global scope), 
// the this value depends on what execution context the script runs in. 
// Like callbacks, the this value is determined by the runtime environment (the caller).

// At the top level of a script, this refers to globalThis whether in strict mode or not. 
// This is generally the same as the global object — 
// for example, if the source is put inside an HTML <script> element and executed as a script, this === window.



// used alone, the owner is the Global object, so this refers to the Global object.

let x = this;
console.log(x); // {}



// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b) // "MDN"
console.log(b) // "MDN"



// If the source is loaded as a module (for HTML, this means adding type="module" to the <script> tag), this is always undefined at the top level.



// Note that some source code, while looking like the global scope, is actually wrapped in a function when executed. 
// For example, Node.js CommonJS modules are wrapped in a function and executed with the this value set to module.exports. 
// Event handler attributes are executed with this set to the element they are attached to.



// Object literals don't create a this scope — only functions (methods) defined within the object do. 
// Using this in an object literal inherits the value from the surrounding scope.

const obj1 = {
    a: this,
};

console.log(obj1.a === window); // true



// ----------------------------- > OBJECT CONVERSION -----------------------------

// In non–strict mode, if a function is called with a this value that's not an object, the this value is substituted with an object. 
// null and undefined become globalThis. 
// Primitives like 7 or 'foo' are converted to an object using the related constructor, 
// so the primitive number 7 is converted to a Number wrapper class and the string 'foo' to a String wrapper class.

function bar() {
    console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]
bar.call("foo"); // [object String]
bar.call(undefined); // [object Window]



// ----------------------------- > BIND -----------------------------

// Calling f.bind(someObject) creates a new function with the same body and scope as f, 
// but the value of this is permanently bound to the first argument of bind, regardless of how the function is being called.



// ----- Example

function greeting() {
    return this.a;
}

const hello = greeting.bind({ a: "bye" });
console.log(hello()); // bye

const hoi = hello.bind({ a: "doei" }); // bind() only works once
console.log(hoi()); // bye

const hi = { a: 37, greeting, hello, hoi };
console.log(hi.a, hi.greeting(), hi.hello(), hi.hoi()); // 37, 37, bye, bye



// ----- Example

const burger = {
    filling: "beef patty",

    getFilling: function () {
        return this.filling;
    }
}

const sandwich = {
    filling: "bacon"
}

console.log(burger.getFilling()); // beef patty

const unboundGetFilling = burger.getFilling;

// The function gets invoked at the global scope
console.log(unboundGetFilling()); // undefined 

const boundGetFilling = unboundGetFilling.bind(sandwich);

console.log(boundGetFilling()); // bacon



// ----------------------------- > CALL -----------------------------

// The call() method is a predefined JavaScript method.
// It can be used to invoke (call) a method with an owner object as an argument (parameter).
// With call(), an object can use a method belonging to another object.

// call() provides a new value of this to the function/method. 
// With call(), you can write a method once and then inherit it in another object, without having to rewrite the method for the new object.

// Note: While the syntax of this function is almost identical to that of apply(), 
// the fundamental difference is that call() accepts an argument list, 
// while apply() accepts a single array of arguments.



// ----- Example

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



// ----- Example

function add(c, d) {
    return this.a + this.b + c + d;
}

var someNumbers = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// subsequent parameters are passed as arguments in the function call
console.log(add.call(someNumbers, 5, 7)); // 16



// ----- Example

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

const gouda = new Food('cheese', 5);

console.log(gouda); // Food { name: 'cheese', price: 5, category: 'food' }
console.log(gouda.name); // cheese
console.log(gouda.price); // 5
console.log(gouda.category); // food



// ----------------------------- > APPLY -----------------------------

// The apply() method calls the specified function with a given this value, and arguments provided as an array (or an array-like object).



// ----- Example

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max); // 7

const min = Math.min.apply(null, numbers);

console.log(min); // 2



// ----- Example

function add(c, d) {
    return this.a + this.b + c + d;
}

var someNumbers = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// the second is an array whose members are used as the arguments in the function call
console.log(add.apply(someNumbers, [10, 20])); // 34



// ----------------------------- > WITH GETTER OR SETTER -----------------------------

// this in getters and setters is based on which object the property is accessed on, not which object the property is defined on. 
// A function used as getter or setter has its this bound to the object from which the property is being set or gotten.

const person = {
    firstName: 'John',
    lastName: 'Doe',

    get getName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set setName(value) {
        const [first, last] = value.split(' ');
        this.firstName = first;
        this.lastName = last;
    }
}

// Access the getter and setter on person object
console.log(person.getName); // Output: "John Doe"
person.setName = 'Jane Smith';
console.log(person.getName); // Output: "Jane Smith"

// Define another object that inherits from person
const student = Object.create(person);
student.firstName = 'Alice';
student.lastName = 'Brown';

// Access the getter and setter on student object
console.log(student.getName); // Output: "Alice Brown"
student.setName = 'Bob Johnson';
console.log(student.getName); // Output: "Bob Johnson"



// ----------------------------- > DOM EVENT HANDLER -----------------------------

// When a function is used as an event handler, its this is set to the element on which the listener is placed 
// (some browsers do not follow this convention for listeners added dynamically with methods other than addEventListener()).

// When called as a listener, turns the related element blue
function bluify(e) {
    console.log(this === e.currentTarget); // Always true

    console.log(this === e.target); // true when currentTarget and target are the same object

    this.style.backgroundColor = "#A5D9F3";
}

// Get a list of every element in the document
const elements = document.getElementsByTagName("*");

// Add bluify as a click listener so when the
// element is clicked on, it turns blue
for (const element of elements) {
    element.addEventListener("click", bluify, false);
}



// ----------------------------- > INLINE EVENT HANDLER -----------------------------

// When the code is called from an inline event handler attribute, its this is set to the DOM element on which the listener is placed:

{/* <button onclick="alert(this.tagName.toLowerCase());">Show this</button> */ }

// The above alert shows button. Note, however, that only the outer code has its this set this way:

{/* 
<button onclick="alert((function () { return this; })());">
  Show inner this
</button> 
*/}

// In this case, the inner function's this isn't set, so it returns the global/window object (i.e. the default object in non–strict mode where this isn't set by the call).