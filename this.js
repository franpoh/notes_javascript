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
> BIND METHOD
> CALL METHOD
> APPLY METHOD 
> WITH GETTER OR SETTER
> DOM EVENT HANDLER
> INLINE EVENT HANDLER
*/



const test = {
    prop: 42,
    func: function () {
        return this.prop;
    },
};

console.log(test.func()); // 42



// this keyword refers to the current object the code is being written inside
// it always ensures that the correct values are used when a member's context changes 
// (for example, two different person object instances may have different names, but we want to use their own name when saying their greeting).
// really useful when dynamically generating objects (for example using constructors)



// ----------------------------- > THE VALUE OF THIS -----------------------------

// The value of this depends on in which context it appears: function, class, or global.

// In a method, this refers to the owner object.

// Alone, this refers to the global object.

// In a function, this refers to the global object.
// In a function, in strict mode, this is undefined.

// In an event, this refers to the element that received the event.

// Methods like call(), and apply() can refer this to any object.



// ----------------------------- > THE VALUE OF THIS >> Method Context 

const person1 = { // owner object
    name: 'Chris',
    greeting: function () {
        console.log('Hi! I\'m ' + this.name + '.');
    }
}

person1.greeting(); // Hi! I'm Chris.



// ----------------------------- > FUNCTION -----------------------------

// Inside a function, the value of this depends on how the function is called. 

// Think about this as a hidden parameter of a function — 
// just like the parameters declared in the function definition, 
// this is a binding that the language creates for you when the function body is evaluated



// In typical function calls, this is implicitly passed like a parameter through the function's prefix (the part before the dot). 
// You can also explicitly set the value of this using the Function.prototype.call(), Function.prototype.apply(), or Reflect.apply() methods. 
// NOTE: Using Function.prototype.bind(), you can create a new function with a specific value of this that doesn't change regardless of how the function is called. 
// When using these methods, the this substitution rules above still apply if the function is non-strict.



// ----------------------------- > FUNCTION >> Typical Function

// For a typical function, the value of this is the object that the function is accessed on
// In other words, if the function call is in the form obj.f(), then this refers to obj

function getThis() {
    return this;
}

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

obj1.getThis = getThis;
obj2.getThis = getThis;

console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }

// Note how the function is the same, but based on how it's invoked, the value of this is different. 
// This is analogous to how function parameters work.



// ----------------------------- > FUNCTION >> The value of this 

// The value of this is not the object that has the function as an own property, but the object that is used to call the function. 
// You can prove this by calling a method of an object up in the prototype chain.

const obj3 = {
    __proto__: obj1,
    name: "obj3",
};

console.log(obj3.getThis()); // { name: 'obj3' }

// The value of this always changes based on how a function is called, even when the function was defined on an object at creation:

const obj4 = {
    name: "obj4",
    getThis() {
        return this;
    },
};

const obj5 = { name: "obj5" };

obj5.getThis = obj4.getThis;
console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }



// An object can be passed as the first argument to call
// or apply and this will be bound to it.
const obj = { a: "Custom" };

// Variables declared with var become properties of the global object.
var a = "Global";

function whatsThis() {
    return this.a; // The value of this is dependent on how the function is called
}

whatsThis(); // 'Global'; this in the function isn't set, so it defaults to the global/window object in non–strict mode
obj.whatsThis = whatsThis;
obj.whatsThis(); // 'Custom'; this in the function is set to obj



// ----------------------------- > FUNCTION >> Strict / Non-strict

// Strict Mode
// JavaScript strict mode does not allow default binding.
// So, when used in a function, in strict mode, this is undefined

"use strict";
function myFunction() {
    return this;
}

console.log(myFunction()); // undefined

// If the value that the method is accessed on is a primitive, this will be a primitive value as well — but only if the function is in strict mode.



// Default - Non-Strict - In a JavaScript function, the owner of the function is the default binding for this.
// In non-strict mode, a special process called this substitution ensures that the value of this is always an object.

// If a function is called with this set to undefined or null, this gets substituted with globalThis.
// If the function is called with this set to a primitive value, this gets substituted with the primitive value's wrapper object.

function myFunction() {
    return this;
}

console.log(myFunction()); // Object [global] ...



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

[1, 2, 3].forEach(logThis, { name: "obj" }); // { name: 'obj' }, { name: 'obj' }, { name: 'obj' }



// See functions\function\> CALLBACK >> Getting ‘This’ Right When Passing Functions



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



// arrow functions create a closure over the this value of its surrounding scope, which means arrow functions behave as if they are "auto-bound" — 
// no matter how it's invoked, this is set to what it was when the function was created (in the example above, the global object). 
// in short, the value of this is set to what it was when it was created and will noit change

// The same applies to arrow functions created inside other functions: their this remains that of the enclosing lexical context.



// Furthermore, when invoking arrow functions using call(), bind(), or apply(), the thisArg parameter is ignored. 
// You can still pass other arguments using these methods, though.

const obje = { name: "obje" };

// Attempt to set this using call
console.log(foo.call(obje) === globalObject); // true

// Attempt to set this using bind
const boundFoo = foo.bind(obje);
console.log(boundFoo() === globalObject); // true



// NOTE: Example

const obj = {
    getThisGetter() {
        const getter = () => this; // this is permanently bound to the this of its enclosing function
        return getter;
    },
};

// The value of this inside getThisGetter can be set in the call, which in turn sets the return value of the returned function.



// call getThisGetter as a method of obj, which sets this inside the body to obj
// returned function is assigned to a variable fn
const fn = obj.getThisGetter();

// Now, when calling fn, the value of this returned is still the one set by the call to getThisGetter, which is obj
console.log(fn() === obj); // true



// But be careful if you unbind the method of obj without calling it, because getThisGetter is still a method that has a varying this value. 
// Calling fn2()() in the following example returns globalThis, 
// because it follows the this from fn2, which is globalThis since it's called without being attached to any object.
const fn2 = obj.getThisGetter;
console.log(fn2()() === globalThis); // true



// The above behavior is very useful when defining callbacks. 
// Usually, each function expression creates its own this binding, which shadows the this value of the upper scope. 

// Now, you can define functions as arrow functions if you don't care about the this value, 
// and only create this bindings where you do (e.g. in class methods). See example with setTimeout().



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

new Good();
new AlsoGood();
new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor



// ----------------------------- > CLASS >> Bound Methods In Classes

// Just like with regular functions, the value of this within methods depends on how they are called. 
// Sometimes it is useful to override this behavior so that this within classes always refers to the class instance. 
// To achieve this, bind the class methods in the constructor:

class Car {

    constructor() {
        // Bind sayBye but not sayHi to show the difference
        this.sayBye = this.sayBye.bind(this);
    }

    sayHi() {
        console.log(`Hello from ${this.name}`);
    }

    sayBye() {
        console.log(`Bye from ${this.name}`);
    }

    get name() {
        return "Ferrari";
    }
}

class Bird {
    get name() {
        return "Tweety";
    }
}

const car = new Car();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// For bound methods, 'this' doesn't depend on the caller
bird.sayBye = car.sayBye;
bird.sayBye(); // Bye from Ferrari



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



function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// subsequent parameters are passed as arguments in the function call
console.log(add.call(o, 5, 7)); // 16

// The first parameter is the object to use as 'this'
// the second is an array whose members are used as the arguments in the function call
console.log(add.apply(o, [10, 20])); // 34



// ----------------------------- > BIND METHOD -----------------------------

// Calling f.bind(someObject) creates a new function with the same body and scope as f, 
// but the value of this is permanently bound to the first argument of bind, regardless of how the function is being called.



// Example

function f() {
    return this.a;
}

const gg = f.bind({ a: "azerty" });
console.log(gg()); // azerty

const hh = gg.bind({ a: "yoo" }); // bind only works once!
console.log(hh()); // azerty

const o = { a: 37, f, gg, hh };
console.log(o.a, o.f(), o.gg(), o.hh()); // 37,37, azerty, azerty



// Example

const burger = {
    x: 42,
    getX: function () {
        return this.x;
    }
};

console.log(burger.getX()); // 42

const unboundGetX = burger.getX;

// The function gets invoked at the global scope
console.log(unboundGetX()); // undefined 

const boundGetX = unboundGetX.bind(burger);

console.log(boundGetX()); // 42



// ----------------------------- > CALL METHOD -----------------------------

// The call() method calls the function with a given this value and arguments provided individually.

// call() provides a new value of this to the function/method. 
// With call(), you can write a method once and then inherit it in another object, without having to rewrite the method for the new object.

// Note: While the syntax of this function is almost identical to that of apply(), 
// the fundamental difference is that call() accepts an argument list, 
// while apply() accepts a single array of arguments.



// Example

function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Food(name, price) {
    Product.call(this, name, price);
    this.category = 'food';
}

const dutch = new Food('cheese', 5);

console.log(dutch.name); // cheese
console.log(dutch.price); // 5
console.log(dutch.category); // food



// Example

const person3 = {
    fullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}
const person4 = {
    firstName: "John",
    lastName: "Doe",
}
person3.fullName.call(person4);  // John Doe



// Example

function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// subsequent parameters are passed as arguments in the function call
console.log(add.call(o, 5, 7)); // 16



// ----------------------------- > APPLY METHOD -----------------------------

// The apply() method calls the specified function with a given this value, and arguments provided as an array (or an array-like object).



// Example

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max); // 7

const min = Math.min.apply(null, numbers);

console.log(min); // 2



// Example

function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// the second is an array whose members are used as the arguments in the function call
console.log(add.apply(o, [10, 20])); // 34



// ----------------------------- > WITH GETTER OR SETTER -----------------------------

// this in getters and setters is based on which object the property is accessed on, not which object the property is defined on. 
// A function used as getter or setter has its this bound to the object from which the property is being set or gotten.

function sum() {
    return this.a + this.b + this.c;
}

const o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3;
    },
};

// Object.defineProperty() static method defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
Object.defineProperty(o, "sum", {
    get: sum,
    enumerable: true,
    configurable: true,
});

console.log(o.average, o.sum); // 2, 6



// ----------------------------- > DOM EVENT HANDLER -----------------------------

// When a function is used as an event handler, its this is set to the element on which the listener is placed 
// (some browsers do not follow this convention for listeners added dynamically with methods other than addEventListener()).

// When called as a listener, turns the related element blue
function bluify(e) {

    // Always true
    console.log(this === e.currentTarget);

    // true when currentTarget and target are the same object
    console.log(this === e.target);
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