/*
Table of Contents

> EXAMPLE
> EXPLANATION OF PROTOTYPE CHAIN
>> Inheritance
> SHADOWING PROPERTIES
> SETTING A PROTOTYPE
>> Using Object.create
>> Using a Constructor
> OWN PROPERTIES
*/



// This is copied from the repo Cheatsheet >  1_sheet.js



// ----------------------------- > EXAMPLE -----------------------------

// Create object literal in browser console:

const myObject = {
    city: "Madrid",
    greet() {
        console.log(`Greetings from ${this.city}`);
    },
};

// If you type the object's name followed by a period into the console, like myObject.
// then the console will pop up a list of all the properties available to this object.

/* 
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
city
constructor
greet
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf
*/



// ----------------------------- > EXPLANATION OF PROTOTYPE CHAIN -----------------------------

// Prototypes are a powerful and very flexible feature of JavaScript, making it possible to reuse code and combine objects.

// When it comes to inheritance, JavaScript only has one construct: objects.
// Each object has a built-in, private property which holds a link to another object called its prototype.

// That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.
// By definition, null has no prototype, and acts as the final link in this prototype chain.



// When you try to access a property of an object: 

// if the property can't be found in the object itself, the prototype is searched for the property. 
// If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, 
// or the end of the chain is reached, in which case undefined is returned.



// So when we call myObject.toString(), the browser:

// looks for toString in myObject
// can't find it there, so looks in the prototype object of myObject for toString
// finds it there, and calls it.



// The prototype of myObject is Object

// Note: The property of an object that points to its prototype is not called 'prototype'. 
// Its name is not standard, but in practice all browsers use '__proto__'

// If you look again at the list of all the properties available to this object

// You will see __proto__ in the list
// __proto__ points to Object

// Object has its own __proto__
// and that points to null



// prototype of an object is not always Object.prototype

const theDate = new Date();

// Prototype of theDate is a Date.prototype object
// and the prototype of Date.prototype is Object.prototype



// ----------------------------- > EXPLANATION OF PROTOTYPE CHAIN >> Inheritance

// Prototypes support a version of inheritance. 

// Inheritance is a feature of object-oriented programming languages 
// that lets programmers express the idea that some objects in a system are more specialized versions of other objects.

// Similar objects can inherit the common properties, while adding and redefining those properties which need to differ.



// ----------------------------- > SHADOWING PROPERTIES -----------------------------

// What happens if you define a property in an object, when a property with the same name is defined in the object's prototype? 

const myDate = new Date(1995, 11, 17);

console.log(myDate.getYear()); // 95

myDate.getYear = function () {
    console.log("something else!");
};

myDate.getYear(); // 'something else!'

// When we call getYear() the browser first looks in myDate for a property with that name, 
// and only checks the prototype if myDate does not define it. 
// So when we add getYear() to myDate, then the version in myDate is called.



// ----------------------------- > SETTING A PROTOTYPE -----------------------------



// ----------------------------- SETTING A PROTOTYPE >> Using Object.create

// The Object.create() method creates a new object and allows you to specify an object that will be used as the new object's prototype.

const personPrototype = {
    greet() {
        console.log("hello!");
    },
};

const carl = Object.create(personPrototype);

carl.greet(); // hello!



// ----------------------------- SETTING A PROTOTYPE >> Using a Constructor

// In JavaScript, all functions have a property named prototype. 
// When you call a function as a constructor, this property is set as the prototype of the newly constructed object 

// So if we set the prototype of a constructor, we can ensure that all objects created with that constructor are given that prototype:



// an object personProto, which has a greet() method

const personProto = {
    greet() {
        console.log(`hello, my name is ${this.name}!`);
    },
};

// a Person() constructor function which initializes the name of the person to create.

function Person(name) {
    this.name = name;
}

// We then put the methods defined in personPrototype onto the Person function's prototype property

Object.assign(Person.prototype, personProto);
// or
Person.prototype.greet = personProto.greet;
// or, by omitting the standalone personProto altogether
Person.prototype.greet = function () {
    console.log(`hello, my name is ${this.name}!`);
}

// objects created using Person() will get Person.prototype as their prototype, which automatically contains the greet method

const newPerson = new Person("Francine");

console.log(Person.prototype); // { greet: [Function (anonymous)] }
console.log(Person); // [Function: Person]
console.log(newPerson); // Person { name: 'Francine' }
newPerson.greet(); // hello, my name is Francine!



// This also explains why we said earlier that the prototype of myDate is called Date.prototype: it's the prototype property of the Date constructor.



// ----------------------------- > OWN PROPERTIES -----------------------------

// The objects we create using the Person constructor above have two properties:

// a name property, which is set in the constructor, so it appears directly on Person objects
// a greet() method, which is set in the prototype.

// It's common to see this pattern, in which methods are defined on the prototype, but data properties are defined in the constructor. 
// That's because methods are usually the same for every object we create, 
// while we often want each object to have its own value for its data properties (just as here where every person has a different name).



// Properties that are defined directly in the object, like name here, are called own properties, 
// and you can check whether a property is an own property using the static Object.hasOwn() method:

/*
newPerson1
|- name = 'Francine'
|- prototype (Points to Person.prototype)

newPerson2
|- name = 'Werner'
|- prototype (Points to Person.prototype)

Person.prototype
|- greet() 
*/



// An excellent use for prototype is modifying existing libraries by adding additional properties into the prototype object
// Now the modified object will always have the added property anywhere in your code



// It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like static dispatching do not exist in JavaScript.

// See Static_Dispatching in repo Cheatsheet > 1_sheet.js