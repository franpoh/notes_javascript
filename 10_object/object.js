/* 
Table of Contents

> OBJECT LITERALS
> OBJECTS AS OBJECT PROPERTIES
> SQUARE BRACKET NOTATION
>> Computed Property Names
> SETTING OBJECT MEMBERS
> CONSTRUCTOR
> CLASS
> OBJECT.CREATE METHOD
> PROPERTY EXISTENCE TEST, 'IN' OPERATOR
> PROPERTY ORDER IN OBJECTS
*/


// An object is a collection of related data and/or functionality 
// which usually consists of several variables and functions — which are called properties and methods when they are inside objects.
// encapsulate related functions and variables into efficient packages and act as handy data containers

// used to store keyed collections of various data and more complex entities.
// Every object has a constructor property, which was used to create that object

// can be created with figure brackets {…} with an optional list of properties. 
// A property is a 'key: value' pair, where key is a string (also called a 'property name'), and value can be anything.

// properties for static values
// methods for dynamic values

// Object is like storage
// Key is like file name
// Value is the file itself



// Do Not Declare Strings, Numbers, and Booleans as Objects

// When a JavaScript variable is declared with the keyword "new", the variable is created as an object:

x = new String(); // Declares x as a String object
y = new Number(); // Declares y as a Number object
z = new Boolean(); // Declares z as a Boolean object

// Avoid String, Number, and Boolean objects. They complicate your code and slow down execution speed.



// ----------------------------- > OBJECT LITERALS -----------------------------

// comma-separated list of key-value pairs wrapped in curly braces.

// It is referred to as an object literal as we've literally written out the object contents as we've come to create it. 

let personExample = {
    // eg key: value,
    // eg key: method,
}

// +++++ Example

let Pet = {
    name: "Cerberus",
    breed: "Hellhound",
    origin: "Hades",
    hobby: "guarding the gates of hell",
    colour: ['black', 'red'],

    // Methods are functions stored as object properties
    // demonstrating 2 different ways to write methods

    about() { // simpler syntax
        console.log(`My name is ${this.name} and I am a ${this.breed}.`)
    },

    intro: function () {
        console.log(`I am from ${this.origin}, my hobby is ${this.hobby}, and today I am wearing a ${this.colour[0]} collar.`)
    },
}

Pet.about(); // My name is Cerberus and I am a Hellhound.
Pet.intro(); // I am from Hades, my hobby is guarding the gates of hell, and today I am wearing a black collar.



// Above, you accessed the object's properties and methods using dot notation. 

// The object name (person) acts as the namespace — it must be entered first to access anything inside the object. 
// Next you write a dot, then the item you want to access

console.log(Pet.name);
console.log(Pet.origin);



// You can create an empty object

let userA = new Object(); // "object constructor" syntax
let userB = {};  // "object literal" syntax. Usually, the figure brackets {...} are used. 

console.log(userA); // {}
console.log(userB); // {}



// put some properties into {...} as 'key: value' pairs:

userB = {     // an object
    name: "John",  // by key "name" store value "John"
    age: 30        // by key "age" store value 30
};

console.log(userB); // { name: 'John', age: 30 }



// NOTE: use 'delete' to remove a property

delete userB.age;
console.log(userB); // { name: 'John' }



// We can also use multiword property names, but then they must be quoted

let userD = {
    name: "John",
    age: 30,
    "likes birds": true  // multiword property name must be quoted
};



// The last property in the list may end with a comma

let userE = {
    name: "John",
    age: 30,
}

// That is called a 'trailing' or 'hanging' comma. 
// Makes it easier to add/remove/move around properties, because all lines become alike.



// when using existing variables as values for property names, there's a special property value shorthand to make it shorter

let name;

let genericUser = {
    name, // same as name:name
    age: 30
};

console.log(genericUser); // { name: undefined, age: 30 }



// ----------------------------- > OBJECTS AS OBJECT PROPERTIES -----------------------------

// An object property can itself be an object.

// Instead of writing this
let person = {
    name: ['Bob', 'Smith']
}

// You can write this 
let personCopy = {
    name: {
        first: 'Bob',
        last: 'Smith'
    },
}

// to access these items you just need to chain the extra step onto the end with another dot. 
console.log(personCopy.name.first)
console.log(personCopy.name.last)



// +++++ Example

let band = {
    name: "The Offspring",
    nationality: "American",
    genre: "Skate Punk",
    members: 5,
    formed: 1984,
    split: false,
    albums: { // sub-namespace
        name: ["Smash", "Ixnay on the Hombre"],
        released: [1994, 1997],
    }
}



// ----------------------------- > SQUARE BRACKET NOTATION -----------------------------

//  Bracket notation provides an alternative way to access object properties. Instead of using dot notation like this:

let werner = {
    age: 56,
    name: {
        first: "Werner",
        last: "Marschall"
    }
};

console.log(werner.age); // 56
console.log(werner.name.first); // Werner

// You can instead use brackets:

console.log(werner["age"]); // 56
console.log(werner["name"]["first"]); // Werner

// basically the same as accessing the items in an array
// instead of using an index number to select an item, you are using the name associated with each member's value. 

// objects are sometimes called associative arrays — they map strings to values in the same way that arrays map numbers to values.



// Dot notation is generally preferred over bracket notation because it is more succinct and easier to read. 
// However there are some cases where you have to use brackets. 
// For example, if an object property name is held in a variable, then you can't use dot notation to access the value, but you can access the value using bracket notation. 

// In the example below, the logProperty() function can use person[propertyName] to retrieve the value of the property named in propertyName.

const thatPerson = {
    name: ["Bob", "Smith"],
    age: 32,
};

function logProperty(propertyName) {
    console.log(thatPerson[propertyName]);
}

logProperty("name"); // ["Bob", "Smith"]
logProperty("age"); // 32



// For multiword properties, the dot access doesn't work:
{/* user.likes birds = true */ } // read as ‘user.likes', unexpected error ‘birds'
// There's an alternative 'square bracket notation' that works with any string:

let birdSpotter = {};

birdSpotter["likes birds"] = true;

console.log(birdSpotter); // { 'likes birds': true }
console.log(birdSpotter["likes birds"]); // true



// +++++ Example

birdSpotter = {};
let personality = "likes birds";

// same as user["likes birds"] = true;
birdSpotter[personality] = true;

console.log(birdSpotter); // { 'likes birds': true }



// +++++ Example

birdSpotter = {
    name: "John",
    personality: "likes birds"
};

let askPersonality = "personality";
let askName = "name";

// access by variable
console.log(birdSpotter[askPersonality]); // likes birds

// The dot notation cannot be used in a similar way:
console.log(birdSpotter.askName) // undefined



// ----------------------------- > SQUARE BRACKET NOTATION >> Computed Property Names

// The object initializer syntax also supports computed property names. 
// That allows you to put an expression in brackets [], that will be computed and used as the property name. 

// This is reminiscent of the bracket notation of the property accessor syntax

let bag = ['binoculars,sketchbook,pencil'];

birdSpotter = {
    name: "John",
    personality: "likes birds",
    [bag]: "full",
};

console.log(birdSpotter); // { name: 'John', personality: 'likes birds', 'binoculars,sketchbook,pencil': 'full' }
console.log(birdSpotter[bag]); // full
console.log(birdSpotter['binoculars,sketchbook,pencil']); // full



// ----------------------------- > SETTING OBJECT MEMBERS -----------------------------

// set (update) the value of object members by declaring the member you want to set (using dot or bracket notation)

let francine = {};

francine.age = 33;
francine.name = {}; // This needs to be declared first, going straight to the below lines will result in undefined error
francine['name']['first'] = 'Francine';
francine.name.last = 'Poh'

console.log(francine); // { age: 33, name: { first: 'Francine', last: 'Poh' } }
console.log(francine.age); // 33
console.log(francine['name']['first']); // Francine



// Setting members doesn't just stop at updating the values of existing properties and methods; 
// you can also create completely new members.

francine = {};

francine['eyes'] = 'brown';
francine.farewell = function () { console.log("Bye everybody!"); }

console.log(francine); // { eyes: 'brown', farewell: [Function (anonymous)] }
console.log(francine['eyes']); // brown
francine.farewell(); // Bye everybody!



// One useful aspect of bracket notation is that it can be used to set not only member values dynamically, but member names too. 

francine = {};

let myDataName = 'height';
let myDataValue = '1.69m';
francine[myDataName] = myDataValue; // adding new member name and value to the person object

console.log(francine); // { height: '1.69m' }
console.log(francine.height); // 1.69m

// Adding a property to an object using the method above isn't possible with dot notation, 
// which can only accept a literal member name, not a variable value pointing to a name.



// ----------------------------- > CONSTRUCTOR -----------------------------

// This is a basic function demonstrating a constructor-like process to create a new object

function createPerson(name) {
    const obj = {};
    obj.name = name;
    obj.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`);
    };
    return obj;
}

const salva = createPerson("Salva");
salva.introduceSelf(); // Hi! I'm Salva.



// A constructor is just a function called using the new keyword. When you call a constructor, it will:

// create a new object
// bind this to the new object, so you can refer to this in your constructor code
// run the code in the constructor
// return the new object.



// define an object type without any specific values. Then, we create new object instances and populate each of them with different values.

function Potat(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.getName = function () {
        return `User's name: ${this.firstName} ${this.lastName}`;
    }
}

const potatA = new Potat('Francine', 'Poh');
console.log(potatA); // User { firstName: 'Francine', lastName: 'Poh', getName: [Function (anonymous)] }
console.log(potatA.getName()); // User's name: Francine Poh

const potatB = new Potat('Werner', 'Marschall');
console.log(potatB.getName()); // User's name: Werner Marschall



// NOTE: following OOP, properties and methods can be made private by using ‘let' instead of ‘this'

function UserOOP(firstName, lastName) {
    let location = 'Singapore';
    this.firstName = firstName;
    this.lastName = lastName;
    this.getName = function () {
        return `User's name: ${this.firstName} ${this.lastName}`
    };
    this.getLocation = function () {
        return `User's location: ${location}`
    }
}

const privateUser = new UserOOP("Private", "Individual");

console.log(privateUser); // UserOOP { firstName: 'Private', lastName: 'Individual', getName: [Function (anonymous)] }
console.log(privateUser.location); // undefined
console.log(privateUser.getLocation()); // User's location: Singapore



// ----------------------------- > CLASS -----------------------------

// use the class attribute to create a class in JavaScript instead of a function constructor
// and use the new operator to create an instance

class Banaan {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.getName = function () {
            return `User's name: ${this.firstName} ${this.lastName}`
        };
    }
}


const ikBanaan = new Banaan('Francine', 'Poh');
console.log(ikBanaan); // User { firstName: 'Francine', lastName: 'Poh', getName: [Function (anonymous)] }
console.log(ikBanaan.getName()); // User's name: Francine Poh



// ----------------------------- > OBJECT.CREATE METHOD -----------------------------

// create new objects by allowing us to use an existing object literal as the prototype of a new object we create. 



// create a 'wiener' object that has the same properties and methods as 'sausage', just with different values.

const sausage = {
    firstName: 'Francine',
    lastName: 'Poh',
    getName: function () {
        return `User's name: ${this.firstName} ${this.lastName}`;
    }
}

console.log(sausage); // { firstName: 'Francine', lastName: 'Poh', getName: [Function: getName] }

const wiener = Object.create(sausage);

console.log(wiener); // {}

wiener.firstName = 'Werner';
wiener.lastName = 'Marschall';

console.log(wiener); // { firstName: 'Werner', lastName: 'Marschall' }

// getName function didn't appear in the above console.log(wiener) but was able to call it anyway
// It should be because it looked up the prototype chain and got it from sausage
console.log(wiener.getName()); // User's name: Werner Marschall



// We use the Object.create() method to:
// instantiate the new 'wiener' object
// add 'sausage' as an argument of the create() method, as that will be the prototype of the new object. 
// set the values for the two properties (firstName, lastName) using dot notation.



// +++++ Example

let dog = {
    name: "Pillow",
    breed: "Toy Poodle",
}

let cat = Object.create(dog);

cat.name = "Bolster";
cat.breed = "Persian";
cat.location = "Singapore";

for (x in cat) {
    console.log(x);
} // name, breed, location

for (x in dog) {
    console.log(x);
} // name, breed



// ----------------------------- > PROPERTY EXISTENCE TEST, 'IN' OPERATOR -----------------------------

// A notable feature of objects in JavaScript, compared to many other languages, is that it's possible to access any property. 



// There will be no error if the property doesn't exist, reading a non-existing property just returns undefined.

let inUser = {};

console.log(inUser.noSuchProperty === undefined); // true - "no such property"



// There's also a special operator "in" for that.

"key" in object // syntax

inUser = { name: "John", age: 30 };

console.log("age" in inUser); // true
console.log("blabla" in inUser); // false



// Please note that on the left side of in there must be a property name. That's usually a quoted string.
// If we omit quotes, that means a variable, it should contain the actual name to be tested.

inUser = { name: "John", age: 30 };

let key = "age";
console.log(key in inUser); // true



// Most of the time the comparison with undefined works fine. 
// But there's a special case when it fails, but "in" works correctly: when an object property exists, but stores undefined:

let obj = {
    test: undefined
};

console.log(obj.test); // undefined
console.log("test" in obj); // true - the property does exist

// In the code above, the property obj.test technically exists. So the in operator works right.

// Situations like this happen very rarely, because undefined should not be explicitly assigned. 
// We mostly use null for 'unknown' or 'empty' values. 
// So the in operator is an exotic guest in the code.



// ----------------------------- > PROPERTY ORDER IN OBJECTS -----------------------------

// Objects are ordered in a special fashion: 
// integer properties are sorted
// others appear in creation order. 

let countryCodes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA"
};

for (let code in countryCodes) {
    console.log(code); // 1, 41, 44, 49
}

// The object may be used to suggest a list of options to the user.

// But if we run the code, we see a totally different picture. 
// The phone codes go in the ascending sorted order, because they are integers. So we see 1, 41, 44, 49.

// The 'integer property' term here means a string that can be converted to-and-from an integer without a change.
// So, '49' is an integer property name, because when it's transformed to an integer number and back, it's still the same. 
// But '+49' and '1.2' are not:



// if the keys are non-integer, then they are listed in the creation order

let johnAgain = {
    name: "John",
    surname: "Smith"
};

johnAgain.age = 25; 

// non-integer properties are listed in the creation order

for (let prop in johnAgain) {
    console.log(prop); // name, surname, age
}



// So, to fix the issue with the phone codes, we can 'cheat' by making the codes non-integer. 
// Adding a plus "+" sign before each code is enough.

let codes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ..,
    "+1": "USA"
};

for (let code in codes) {
    console.log(+code); // 49, 41, 44, 1
}