/*
Table of Contents

> EXAMPLE
> EXPLANATION OF PROTOTYPE CHAIN
>> Delegation / Inheritance
> SHADOWING PROPERTIES
> SETTING A PROTOTYPE
>> Using Object.create
>> Using a Constructor
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

// In JavaScript, a prototype is an object that serves as a blueprint or a base template for creating other objects. 
// It acts as a shared set of properties and methods that can be inherited by objects created from it.

// To understand prototypes, it's essential to know that in JavaScript, almost everything is an object, including functions. 
// When you create a function, JavaScript automatically creates a prototype property for that function, which is an object.

// Therefore, how it works is that each object has a built-in, private property which holds a link to another object called its prototype.

// That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype.
// By definition, null has no prototype, and acts as the final link in this prototype chain.

// With prototyping, each level of the hierarchy is represented by a separate object, and they are linked together via the __proto__ property.

// Prototypes are a powerful and very flexible feature of JavaScript, making it possible to reuse code and combine objects.



// NOTE: In JavaScript, prototypes use a combination of both inheritance and delegation, but the primary mechanism is delegation



// ----------------------------- > EXPLANATION OF PROTOTYPE CHAIN >> Delegation

// When you try to access a property of an object: 

// JavaScript first checks if that property or method exists on the object itself. 
// If not, it looks up the prototype chain and delegates the lookup to the object's prototype. 
// If the property or method is found on the prototype, it is used as if it were on the original object. 
// This delegation mechanism continues up the prototype chain until the property or method is found or the end of the chain is reached.
// if the end of the chain is reached, undefined is returned.

// This is the primary mechanism by which the prototype chain function, which is known as delegation



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



// ----------------------------- > EXPLANATION OF PROTOTYPE CHAIN >> Inheritance

// While delegation is the primary mechanism, prototypes in JavaScript also exhibit behavior similar to classical inheritance. 
// When you create a new object using a constructor function or the class syntax (introduced in ES6), 
// the new object's prototype is set to the prototype property of the constructor function or class. 
// This allows the new object to inherit properties and methods from the prototype.



function Animal() { }

// See > SETTING A PROTOTYPE >> Using a Constructor
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



// ----- Here is another example using the class syntax

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



// In this example, we define a Dog class that inherits from the Animal class using the extends keyword. 
// Even though the syntax looks like classical inheritance, JavaScript's class syntax is just syntactical sugar on top of the prototypal inheritance model.



// ----- Here's how the inheritance mechanism works under the hood:

// When you create a class like Animal, JavaScript creates a function under the hood. 
// The methods defined in the class (e.g., eat()) are added to the prototype property of this function.

// When you create a child class like Dog that extends Animal, JavaScript creates another function for Dog. 
// The Dog function's prototype is set to a new object that has its __proto__ property (the internal prototype) pointing to the Animal.prototype.

// When you create an instance of Dog with new Dog('Max'), JavaScript first calls the Animal constructor using super(name). This sets the name property on the new Dog instance.

// After the Animal constructor is called, the Dog constructor is executed, and the bark() method is added to the Dog.prototype.

// When you call dog.eat(), JavaScript first looks for the eat method on the dog instance itself. 
// Since it's not found, it follows the prototype chain and finds the eat method on the Animal.prototype, which was inherited by Dog.prototype.

// Similarly, when you call dog.bark(), JavaScript finds the bark method on the Dog.prototype.



// So, even though the class syntax makes it look like classical inheritance, the underlying mechanism is still based on prototypes and the prototype chain. 
// The Dog instances inherit properties and methods from Animal.prototype through the prototype chain and delegation.

// This example demonstrates how JavaScript's class syntax is just a syntactical sugar on top of the prototypal inheritance model, and how prototypes are used to achieve inheritance under the hood.



// ----- In Conclusion

// NOTE: It's important to note that JavaScript's inheritance model is still based on prototypal delegation.
// Even when using constructor functions or classes, the inheritance mechanism under the hood is still achieved through the prototype chain and delegation.

// In summary, while prototypes in JavaScript exhibit characteristics of both inheritance and delegation, the primary mechanism is delegation.
// Objects delegate the lookup of properties and methods to their prototypes, creating a prototype chain.
// This delegation mechanism is the foundation of JavaScript's prototypal inheritance model, which differs from the classical inheritance model found in class-based object-oriented programming languages.



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



// ----------------------------- > SETTING A PROTOTYPE >> Using Object.create

// The Object.create() method creates a new object and allows you to specify an object that will be used as the new object's prototype.

const personPrototype = {
    greet() {
        console.log("hello!");
    },
};

const carl = Object.create(personPrototype);

carl.greet(); // hello!



// ----------------------------- > SETTING A PROTOTYPE >> Using a Constructor

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