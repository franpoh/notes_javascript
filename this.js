/* 
Table of Contents
*/



const test = {
    prop: 42,
    func: function() {
      return this.prop;
    },
  };
  
  console.log(test.func()); // 42


  
// this keyword refers to the current object the code is being written inside — so in this case this is equivalent to person. 
// it always ensures that the correct values are used when a member's context changes (for example, two different person object instances may have different names, but we want to use their own name when saying their greeting).
// really useful when dynamically generating objects (for example using constructors)

// It has different values depending on where it is used:
// In a method, this refers to the owner object.
// Alone, this refers to the global object.
// In a function, this refers to the global object.
// In a function, in strict mode, this is undefined.
// In an event, this refers to the element that received the event.
// Methods like call(), and apply() can refer this to any object.

const person1 = { // owner object
    name: 'Chris',
    greeting: function () {
        alert('Hi! I\'m ' + this.name + '.');
    }
}

const person2 = {
    name: 'Deepti',
    greeting: function () {
        alert('Hi! I\'m ' + this.name + '.');
    }
}

// constructor example

// this is referring to the instantiated object

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

let myCar1 = new Car("Ford", 2014); // object instantiation 

// Global 

// used alone, the owner is the Global object, so this refers to the Global object.

let x = this; // [object Window]

// example

// In web browsers, the window object is also the global object:
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b) // "MDN"
console.log(b) // "MDN"

// Function context

// Default - In a JavaScript function, the owner of the function is the default binding for this.
// So, in a function, this refers to the Global object [object Window]

function myFunction() {
    return this;
} // [object Window]

// Strict Mode - JavaScript strict mode does not allow default binding.
// So, when used in a function, in strict mode, this is undefined

"use strict";
function myFunction() {
    return this;
} // undefined

// Class context

// The behavior of this in classes and functions is similar, since classes are functions under the hood. But there are some differences and caveats.
// Within a class constructor, this is a regular object. All non-static methods within the class are added to the prototype of this
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

// Derived classes

// Unlike base class constructors, derived constructors have no initial this binding. Calling super() creates a this binding within the constructor

// this in function contexts

// An object can be passed as the first argument to call or apply and this will be bound to it.

var obj = { a: 'Custom' };

// We declare a variable and the variable is assigned to the global window as its property.

var a = 'Global';

function whatsThis() {
    return this.a; // The value of this is dependent on how the function is called
}

whatsThis(); // 'Global' as this in the function isn't set, so it defaults to the global/window object
whatsThis.call(obj); // 'Custom' as this in the function is set to obj
whatsThis.apply(obj); // 'Custom' as this in the function is set to obj

// this and object conversion

function add(c, d) {
    return this.a + this.b + c + d;
}

var o = { a: 1, b: 3 };

// The first parameter is the object to use as 'this'
// subsequent parameters are passed as arguments in the function call
add.call(o, 5, 7); // 16

// The first parameter is the object to use as 'this'
// the second is an array whose members are used as the arguments in the function call
add.apply(o, [10, 20]); // 34

// Explicit function binding - call and apply

// They can both be used to call an object method with another object as argument.

const person3 = {
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
}
const person4 = {
    firstName: "John",
    lastName: "Doe",
}
person3.fullName.call(person4);  // Will return "John Doe"

// The bind method

// Calling f.bind(someObject) creates a new function with the same body and scope as f, but where this occurs in the original function, in the new function it is permanently bound to the first argument of bind, regardless of how the function is being used.

function f() {
    return this.a;
}

var g = f.bind({ a: 'azerty' });
console.log(g()); // azerty

var h = g.bind({ a: 'yoo' }); // bind only works once!
console.log(h()); // azerty

var o = { a: 37, f: f, g: g, h: h };
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty

// Arrow functions

// In arrow functions, this retains the value of the enclosing lexical context's this. In global code, it will be set to the global object

// arrow function expressions are best suited for non-method functions.

// Arrow functions do not have their own this

// value is set to what it was when it was created

// As an object method

// When a function is called as a method of an object, its this is set to the object the method is called on.

var o = {
    prop: 37,
    f: function () {
        return this.prop;
    }
};

console.log(o.f()); // 37

// another example

var o = { prop: 37 };

function independent() {
    return this.prop;
}

o.f = independent;

console.log(o.f()); // 37

// it matters only that the function was invoked from the f member of o

// As a function used as a constructor

// When a function is used as a constructor (with the new keyword), its this is bound to the new object being constructed.

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
// This essentially makes the statement "this.a = 37;" dead code. It's not exactly dead because it gets executed, but it can be eliminated with no outside effects.

// Event Handlers

// In HTML event handlers, this refers to the HTML element that received the event:

<button onclick="this.style.display='none'">
    Click to Remove Me!
</button>