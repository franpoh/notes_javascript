/*
Table of Contents

> EXAMPLE
> EXPLANATION OF PROTOTYPE CHAIN
> SHADOWING PROPERTIES
> CREATING AND MUTATING PROTOTYPE CHAINS
>> Using Object.create
>> Using a Constructor
>> Using Class
> OWN PROPERTIES
*/



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

// In programming, inheritance refers to passing down characteristics from a parent to a child so that a new piece of code can reuse and build upon the features of an existing one. 

// JavaScript implements inheritance by using objects. 
// Each object has an internal link to another object called its prototype. 
// That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. 

// By definition, null has no prototype and acts as the final link in this prototype chain. 

// It is possible to mutate any member of the prototype chain or even swap out the prototype at runtime, so concepts like *static dispatching do not exist in JavaScript.

// * Static dispatching: See Cheatsheet\coding\static_dispatching.js



// Although classes are now widely adopted and have become a new paradigm in JavaScript, classes do not bring a new inheritance pattern. 
// While classes abstract most of the prototypal mechanism away, understanding how prototypes work under the hood is still useful.



// ----- Accessing a property 

// JavaScript objects are dynamic "bags" of properties (referred to as own properties). 
// JavaScript objects have a link to a prototype object. 

// When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on 
// until either a property with a matching name is found or the end of the prototype chain is reached.



const animal = {
    eat: function (name = "Animal") {
        console.log(`${name} is eating.`);
    },
};

const dog = Object.create(animal);

console.log(dog); // {}
/*
if you ran this code in browser console:

Object {  }
    <prototype>: Object { eat: eat(name) }
        eat: function eat(name)
        <prototype>: Object { … } 
*/

dog.eat("Max"); // Max is eating.



// In this example, the dog object doesn't have an eat method defined directly on itself. 
// However, when dog.eat() is called, JavaScript delegates the lookup to dog's prototype, which is the animal object. 
// Since animal has an eat method, it is used as if it were defined on dog.



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



// ----------------------------- > CREATING AND MUTATING PROTOTYPE CHAINS -----------------------------

// There are many ways to create objects and change their prototype chains. Here are some of the basic methods. 



// ----------------------------- > CREATING AND MUTATING PROTOTYPE CHAINS >> Using Object.create

// The Object.create() method creates a new object and allows you to specify an object that will be used as the new object's prototype.

const personPrototype = {
    greet() {
        console.log("hello!");
    },
};

const carl = Object.create(personPrototype);

carl.greet(); // hello!



// ----------------------------- > CREATING AND MUTATING PROTOTYPE CHAINS >> Using a Constructor

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

// We then put the methods defined in personProto onto the Person function's prototype property

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



// ----- Another Example

function Animal() { }

// Put the eat function into the Animal function's prototype property as a method
Animal.prototype.eat = function (name = "Animal") {
    console.log(`${name} is eating.`);
};

const cat = new Animal();

console.log(cat); // Animal {}
/*
if you ran this code in browser console:

Object {  }
    <prototype>: Object { eat: eat(name), … }
        constructor: function Animal()
        eat: function eat(name)
        <prototype>: Object { … }
*/

cat.eat("Cat"); // Cat is eating.



// In this example, the dog object inherits the eat method from the Animal.prototype.
// This behavior is similar to classical inheritance, where objects inherit properties and methods from their parent class or constructor function.



// // ----------------------------- > CREATING AND MUTATING PROTOTYPE CHAINS >> Using Class

class Animal {
    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating.`);
    }
}

console.log(Animal); // [class Animal]
/*
if you ran this code in browser console:

class Animal { constructor(name) }
    length: 1
    name: "Animal"
    prototype: Object { … }
        constructor: class Animal { constructor(name) }
        eat: function eat()
        <prototype>: Object { … }
    <prototype>: function ()
*/

class Dog extends Animal {
    constructor(name) {
        super(name); // Call the parent constructor
    }

    bark() {
        console.log(`${this.name} is barking.`);
    }
}

console.log(Dog); // [class Dog extends Animal]
/*
if you ran this code in browser console:

class Dog { constructor(name) }
    length: 1
    name: "Dog"
    prototype: Object { … }
        bark: function bark()
        constructor: class Dog { constructor(name) }
        <prototype>: Object { … }
    <prototype>: class Animal { constructor(name) }
        length: 1
        name: "Animal"
        prototype: Object { … }
            constructor: class Animal { constructor(name) }
            eat: function eat()
            <prototype>: Object { … }
        <prototype>: function ()
*/

const max = new Dog('Max'); 

console.log(max); // Dog { name: 'Max' }
/*
if you ran this code in browser console:

Object { name: "Max" }
    name: "Max"
    <prototype>: Object { … }
        bark: function bark()
        constructor: class Dog { constructor(name) }
        <prototype>: Object { … }
            constructor: class Animal { constructor(name) }
            eat: function eat()
            <prototype>: Object { … }
*/



max.eat(); // Max is eating.
max.bark(); // Max is barking.



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