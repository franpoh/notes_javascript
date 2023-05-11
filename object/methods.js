/* 
Table of Contents

> OBJECT.KEYS
> OBJECT.DEFINEPROPERTY
> GETTERS AND SETTERS
>> Getter
>> Setter
*/

// ----------------------------- > OBJECT.KEYS -----------------------------

// returns an array of a given object's own enumerable string-keyed property names.

const object1 = {
    a: 'somestring',
    b: 42,
    c: false
};

console.log(Object.keys(object1)); // ["a", "b", "c"]



// ----------------------------- > OBJECT.DEFINEPROPERTY -----------------------------

// The Object.defineProperty() static method defines a new property directly on an object, 
// or modifies an existing property on an object, and returns the object.

const theAnswer = {};

Object.defineProperty(theAnswer, 'property1', {
    value: 42,
    writable: false
}); // object we want to add new property to (theAnswer), name of property (property1), object (value of property1, writability)

theAnswer.property1 = 77; // Throws an error in strict mode

console.log(theAnswer.property1); // 42



// Example with Getter and Setter

function User(firstName, lastName) {
    let location = "Singapore";
    this.firstName = firstName;
    this.lastName = lastName;

    Object.defineProperty(this, 'location', {

        get: function () {
            return location;
        },

        set: function (value) {
            location = value;
        }

    }); // object we want to add new property to (this), name of property (location), object (giving 'location' built-in get and set functions)
}

const userProfile01 = new User("Francine", "Poh");

console.log(userProfile01.location); // Singapore

userProfile01.location = "Netherlands"; // set value

console.log(userProfile01.location); // Netherlands



// ----------------------------- > GETTERS AND SETTERS -----------------------------

class Person {
    #firstName; // set private property

    constructor(firstName) {
        this.#firstName = firstName; // set value of private property
    }

    setfirstName(name) { // method
        this.#firstName = name;
    }

    getfirstName() { // method
        return this.#firstName;
    }

    set setName(name) { // function
        this.#firstName = name;
    }

    get getName() { // function
        return this.#firstName;
    }
}

const newPerson = new Person("Francine");

console.log(newPerson.firstName); // undefined

// methods that get and set
console.log(newPerson.getfirstName()); // Francine
newPerson.setfirstName("Werner");
console.log(newPerson.getfirstName()); // Werner

// get and set functions
console.log(newPerson.getName); // Francine
newPerson.setName = "Werner";
console.log(newPerson.getName); // Werner



// ----------------------------- > GETTERS AND SETTERS >> Getter

// The get syntax binds an object property to a function that will be called when that property is looked up.
// to allow access to a property that returns a dynamically computed value
// reflect the status of an internal variable without requiring the use of explicit method calls.

// It is not possible to simultaneously have a getter bound to a property and have that property actually hold a value, 
// although it is possible to use a getter and a setter in conjunction to create a type of pseudo-property.

const person = {
    firstName: "John",
    lastName: "Doe",
    language: "en",
    get lang() {
        return this.language;
    }
};

// Display data from the object using a getter:
console.log(person.lang); // en



// ----------------------------- > GETTERS AND SETTERS >> Setter

// The set syntax binds an object property to a function to be called when there is an attempt to set that property.

// can be used to execute a function whenever a specified property is attempted to be changed

const personage = {
    firstName: "John",
    lastName: "Doe",
    language: "en",
    set lang(lang) {
        this.language = lang;
    }
};

console.log(personage.language); // en

personage.lang = "de"; // Set an object property using a setter:

console.log(personage.language); // de


