/* 
Table of Contents


*/

// ----------------------------- > OBJECT.KEYS -----------------------------

// returns an array of a given object's own enumerable string-keyed property names.

const object1 = {
    a: 'somestring',
    b: 42,
    c: false
};

console.log(Object.keys(object1)); // ["a", "b", "c"]



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



// ----------------------------- > SETS -----------------------------

// A JavaScript Set is a collection of unique values.
// Sets are Objects
// Each value can only occur once in a Set.
// A Set can hold any value of any data type.



// -----------------------------

// You can create a JavaScript Set by:
// Passing an Array to new Set()
// Create a new Set and use add() to add values
// Create a new Set and use add() to add variables

const test = new Set(); // Creates a new Set with 'new Set()'
console.log(test); // Set(0) {}

const letters = new Set(["a", "b", "c"]);
console.log(letters); // Set(3) { 'a', 'b', 'c' }
console.log(letters);



// -----------------------------

letters.add("d"); // Adds a new element to the Set with 'add()'
letters.add("e");
letters.add("f"); // If you add equal elements, only the first will be saved:
letters.add("f"); // not added

console.log(letters); // Set(6) { 'a', 'b', 'c', 'd', 'e', 'f' }



// -----------------------------

letters.delete("e"); // Removes an element from a Set
console.log(letters); // Set(5) { 'a', 'b', 'c', 'd', 'f' }



// -----------------------------

console.log(letters.has("a")); // Returns true if a value exists - true
console.log(letters.has("e")); // false



// -----------------------------

letters.clear(); // Removes all elements from a Set
console.log(letters); // Set(0) {}



// -----------------------------

const moreLetters = new Set(["f", "r", "a", "n"]);

let text = "";

moreLetters.forEach(function (value) { // forEach() invokes a callback for each element
    text += value;
})

console.log(text); // fran



// -----------------------------

const names = new Set(["francine", "werner"]);

names.add("poh");
names.add("marschall");

for (const item of names.values()) { // values() method returns a new set iterator object that contains the values for each element in the Set object in insertion order.
    console.log(item); // francine werner poh marschall
}



// ----------------------------- > SETS >> A Set have no Keys

// This particular property of Sets makes Sets compatible with Map

const numbers = new Set([1, 2, 3, 4, 5]);

for (const item of numbers.values()) { // using values here()
    console.log(item); // 1 2 3 4 5
}

// A Set has no keys, therefore while using keys()

for (const item of numbers.keys()) { // keys() returns the same as values(), which makes Sets compatible with Map
    console.log(item); // 1 2 3 4 5 
}

// While using entries()

for (const item of numbers.entries()) { // entries() returns an Iterator with the [value,value] pairs instead of [key,value] pairs from a Set
    console.log(item); // [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ] [ 5, 5 ]
}







// The new Set() Method

// Pass an Array to the new Set() constructor:

// Create a Set
const letterSet = new Set(["a", "b", "c"]);

// Create a Set and add literal values:

// Create a Set
const alphabet = new Set();

// Add Values to the Set
alphabet.add("a");
alphabet.add("b");
alphabet.add("c");

// Create a Set and add variables:

// Create Variables
const a = "a";
const b = "b";
const c = "c";

// Create a Set
const lettering = new Set();

// Add Variables to the Set
lettering.add(a);
lettering.add(b);
lettering.add(c);

// ----------------------------- Maps -----------------------------

// A Map holds key-value pairs where the keys can be any datatype.
// A Map remembers the original insertion order of the keys.
// A Map has a property that represents the size of the map.
// Maps are Objects

new Map() // Creates a new Map object
set() // Sets the value for a key in a Map
get() // Gets the value for a key in a Map

fruits.get("apples"); // Returns 500

clear() // Removes all the elements from a Map

fruits.clear();

delete ("example"); // Removes a Map element specified by a key

fruits.delete("apples");

has() // Returns true if a key exists in a Map

fruits.has("apples"); // true
fruits.delete("apples");
fruits.has("apples"); // false

forEach() // Invokes a callback for each key/value pair in a Map
entries() // Returns an iterator object with the [key, value] pairs in a Map
keys() // Returns an iterator object with the keys in a Map
values() // Returns an iterator object of the values in a Map

// size - Property, Returns the number of Map elements

fruits.size; // 3

// You can create a JavaScript Map by:
// Passing an Array to new Map()
// Create a Map and use Map.set()

new Map()
// You can create a Map by passing an Array to the new Map() constructor:

// Create a Map
const fruitBasket = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

Map.set()
// You can add elements to a Map with the set() method:

// Create a Map
const fruits = new Map();

// Set Map Values
fruits.set("apples", 500);
fruits.set("bananas", 300);
fruits.set("oranges", 200);

// The set() method can also be used to change existing Map values:

fruits.set("apples", 500);