/* 
Table of Contents

> OBJECT LITERALS
> SQUARE BRACKET NOTATION
> SETTING OBJECT MEMBERS
> CONSTRUCTOR
> CLASS
> OBJECT.CREATE METHOD
> PROPERTY EXISTENCE TEST, 'IN' OPERATOR
> PROPERTY ORDER IN OBJECTS
*/



// JavaScript is designed on an object-based paradigm. 

// An object is a collection of properties, and a property is an association between a name (or key) and a value. 

const thisObject = {
    key1: "Key One",
    key2: 2,
    key3: { innerKey: "Key Three" }
}

// +++++ Example

const favouriteCup = {
    colour: "blue",
    volumeML: 200,
    drink: { 
        drinkBase: "black tea",
        drinkAddition: "milk"
    }
}

// A property's value can be a function, in which case the property is known as a method.

const favouriteDrink = {

    temperature: "hot",
    
    drink: { 
        drinkBase: "black tea",
        drinkAddition: "milk"
    },

    drinkMethod: function(name) {
        console.log(`${name}'s favourite ${this.temperature} drink is ${this.drink.drinkBase} with ${this.drink.drinkAddition}.`);
    }

}

favouriteDrink.drinkMethod("Francine"); // Francine's favourite hot drink is black tea with milk.



// ----------------------------- > OBJECT LITERALS -----------------------------

// You can create an object using an object initializer. Object initializers are also called object literals.

let personExample = {
    // eg key: value,
    // eg key: method,
}

// +++++ Example

let bird = {
    breed: "Large-tailed Nightjar",
    hobby: "being unbothered",
    colour: ['brown', 'black'],

    // Methods are functions stored as object properties
    // demonstrating 2 different ways to write methods

    colouration() { // simpler syntax
        console.log(`My feathers are ${this.colour[0]} and ${this.colour[1]}.`)
    },

    intro: function () {
        console.log(`My hobby is ${this.hobby}.`)
    },
}

// access the object's properties and methods using dot notation - objectName.keyName

console.log(bird.breed); // Large-tailed Nightjar

bird.colouration(); // My feathers are brown and black.
bird.intro(); // My hobby is being unbothered.



// +++++ Create an empty object

let emptyUser = {};  // "object literal" syntax. Usually, the figure brackets {...} are used. 
console.log(emptyUser); // {}



// +++++ Put properties into objects as 'key: value' pairs within curly brackets:

emptyUser = {     // an object
    name: "John",  // by key "name" store value "John"
    age: 30        // by key "age" store value 30
};

console.log(emptyUser); // { name: 'John', age: 30 }



// +++++ delete - to remove a property

let userName = {
    name: "John",
    age: 30,
};

delete userName.age;
console.log(userName); // { name: 'John' }



// +++++ We can also use multiword property names, but then they must be quoted

let birder = {
    name: "John",
    age: 30,
    "likes birds": true  // multiword property name must be quoted
};

// property is accessed using square bracket notation, which you will learn more about below
console.log(birder["likes birds"]); // true



// +++++ The last property in the list may end with a comma

let userComma = {
    name: "John",
    age: 30,
}

// That is called a 'trailing' or 'hanging' comma. 
// Makes it easier to add/remove/move around properties, because all lines become alike.



// +++++ when using existing variables as values for property names, there's a special property value shorthand to make it shorter

let name = "John";

let genericUser = {
    name, // same as name:name
    age: 30
};

console.log(genericUser); // { name: 'John', age: 30 }



// +++++ You can also create an object without assigning it to a variable
// If you do not need to refer to this object elsewhere, you do not need to assign it to a variable. 

function oneTimeUse ({ name, age }) {
    console.log(`This function will return ${name} and ${age} only once.`);
}

oneTimeUse({ name: "John Doe", age: 30 }); // This function will return John Doe and 30 only once.

// Note that you may need to wrap the object literal in parentheses if the object appears where a statement is expected, 
// so as not to have the literal be confused with a block statement.

const genUser = () => ({ name: "John Doe", age: 30 }); // parentheses needed, otherwise the object will be interpreted as code within curly brackets
// const jankyUser = () => { name: "John Doe", age: 30 }; // SyntaxError: Unexpected token ':'

console.log(genUser()); // { name: 'John Doe', age: 30 }
console.log(`My name is ${genUser().name} and my age is ${genUser().age}.`); // My name is John Doe and my age is 30.



// +++++ Object initializers are expressions
// Each object initializer results in a new object being created whenever the statement in which it appears is executed. 
// Identical object initializers create distinct objects that do not compare to each other as equal.

let originalJohn = {
    name: "John",
    age: 30,
}

let evilJohn = {
    name: "John",
    age: 30,
}

console.log(originalJohn === evilJohn); // false



// +++++ An object property can also be an object - droste droste droste droste

// Instead of writing this:
let person = {
    firstName: "Bob",
    lastName: "Smith",
}

// Or this, in an array:
let personArray = {
    name: ["Bob", "Smith"],
}

// You can write this - an object within an object
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

let pets = {
    household: "Smith", 
    totalPets: 5,
    typesOfPets: {
        cat: ["Pickles", "Kitty"],
        dog: ["Honchen", "Ruffles", "Chips"],
    },
}

console.log(
    `The ${pets.household} family has ${pets.totalPets} pets.
Their cats are named ${pets.typesOfPets.cat[0]} and ${pets.typesOfPets.cat[1]}.
Their dogs are named ${pets.typesOfPets.dog[0]}, ${pets.typesOfPets.dog[1]} and ${pets.typesOfPets.dog[2]}.`
);
// The Smith family has 5 pets.
// Their cats are named Pickles and Kitty.
// Their dogs are named Honchen, Ruffles and Chips.



// ----------------------------- > SQUARE BRACKET NOTATION -----------------------------

//  Bracket notation provides an alternative way to access object properties.

let werner = {
    age: 56,
    name: {
        first: "Werner",
        last: "Marschall"
    }
};

// Instead of using dot notation like this:
console.log(werner.age); // 56
console.log(werner.name.first); // Werner

// You can instead use brackets:
console.log(werner["age"]); // 56
console.log(werner["name"]["first"]); // Werner

// It is basically the same as accessing the items in an array
// instead of using an index number to select an item, you are using the name associated with each member's value. 

// objects are sometimes called associative arrays — they map strings to values in the same way that arrays map numbers to values.



// Dot notation is generally preferred over bracket notation because it is more succinct and easier to read. 

// However there are some cases where you have to use brackets. 
// For example, if an object property name is held in a variable, then you can't use dot notation to access the value, but you can access the value using bracket notation. 

let accessUser = {
    name: "John",
    age: 30,
}

const propName = "name"; // object property name held in a variable

// JavaScript literally searches the accessUser object for a key named "propName". 
// Because no property named "propName" exists on the object, it returns undefined
console.log(accessUser.propName); // undefined

// JavaScript first resolves the variable propName to its string value ("name"). 
// It then evaluates accessUser["name"], successfully retrieving "John".
console.log(accessUser[propName]); // John



// +++++ Another Example using a function

let thatUser = {
    name: "John",
    age: 30,
};

function logProperty (obj, propName) {
    console.log(obj[propName]);
}

logProperty(thatUser, "name"); // John
logProperty(thatUser, "age"); // 30



// +++++ For multiword or numeric properties, the dot access doesn't work, so we use bracket notation instead

// Property names with spaces or hyphens

const user = { 
    "first-name": "Francine", 
    "last name": "Poh",
    5: "What is this number doing here?",
};

console.log(user["first-name"]); // "Francine"
console.log(user["last name"]); // Poh
console.log(user[5]); // What is this number doing here?



// +++++ We can also use bracket notation to iterate over dynamic object keys:

const thatPerson = {
    name: "John",
    age: "30",
    "likes birds": "Especially nightjars",
}

for (let key in thatPerson) {
  console.log(thatPerson[key]); // Evaluates each key dynamically during iteration
}

// John 30 Especially nightjars



// +++++ Computed Property Names

// The object initializer syntax also supports computed property names. 
// That allows you to put an expression in brackets [], that will be computed and used as the property name. 
// Essentially, computed Property Names allow you to use a variable or JavaScript expression directly inside an object literal {} to define a key at creation time. 

let bag = ['binoculars, sketchbook, pencil'];

birdSpotter = {
    name: "John",
    personality: "likes birds",
    [bag]: "full", // We are putting the variable/expression 'bag' in [] to be computed and used as the property name
};

console.log(birdSpotter); 
// { 
//     name: 'John', 
//     personality: 'likes birds', 
//     'binoculars,sketchbook,pencil': 'full' 
// }
console.log(birdSpotter[bag]); // full
console.log(birdSpotter['binoculars, sketchbook, pencil']); // full



// ----------------------------- > SETTING OBJECT MEMBERS -----------------------------

// set (update) the value of object members by declaring the member you want to set (using dot or bracket notation)

let thisPerson = {
    name: "John",
    age: "30",
}

console.log(thisPerson); // { name: 'John', age: '30' }

thisPerson.name = "Francine";
thisPerson.age = 36;

console.log(thisPerson); // { name: 'Francine', age: 36 }



// Setting members doesn't just stop at updating the values of existing properties and methods; 
// you can also create completely new members.

let thePerson = {};

console.log(thePerson); // {}

thePerson.age = 33; // creating the new key and value at the same time
thePerson.name = {}; // This needs to be declared first, going straight to the below lines will result in undefined error

// two methods for accomplishing the same thing
thePerson['name']['first'] = 'Francine';
thePerson.name.last = 'Poh'

console.log(thePerson); // { age: 33, name: { first: 'Francine', last: 'Poh' } }



// +++++ One useful aspect of bracket notation is that it can be used to set not only member values dynamically, but member names too. 
// Dot notation (thisObject.exactPropertyName = exactValue) forces you to hardcode the exact property name and/or value you want to update or create. 
// Bracket notation allows the property name itself to be determined by a variable or expression.

let whatPerson = {
    name: "Francine",
};

let myDataName = 'height';
let myDataValue = '1.69m';
whatPerson[myDataName] = myDataValue; // adding new member name and value to the person object

console.log(whatPerson); // { name: 'Francine', height: '1.69m' }
console.log(whatPerson.height); // 1.69m



// The most common use case for this dual-dynamic behavior is handling form inputs in web applications. 
// A single generic function can update any field on an existing state object:

const userForm = {
  username: "Francine",
  theme: "light"
};

function updateFormField(existingObj, fieldName, newValue) {
  existingObj[fieldName] = newValue; // Both the member name (fieldName) AND the member value (newValue) are dynamic
}

// Updating an existing member:
updateFormField(userForm, "theme", "dark");

// Creating a brand new member on the existing object:
updateFormField(userForm, "notificationsEnabled", true);

console.log(userForm);
// {
//   username: 'Francine',
//   theme: 'dark',
//   notificationsEnabled: true
// }



// ----------------------------- > CONSTRUCTOR -----------------------------

// This is a basic function demonstrating a constructor-like process to create a new object

function createPerson (name) {

    const obj = {}; // create empty object

    obj.name = name; // create a key and assign the 'name' parameter as its value

    obj.introduceSelf = function () { // create an object method
        console.log(`Hi! I'm ${this.name}.`); // note the use of 'this' to set context
    };

    return obj;

}

const salva = createPerson("Salva");
salva.introduceSelf(); // Hi! I'm Salva.

// Note the above is 'constructor-like'. We will now proceed to demonstrate using an actual constructor function



// A constructor is just a function called using the new keyword. When you call a constructor, it will:

// create a new object
// bind this to the new object, so you can refer to this in your constructor code
// run the code in the constructor
// return the new object.



// Firstly, we will define the object type by writing a constructor function. 
// There is a strong convention, with good reason, to use a capital initial letter.

// Note that unlike the above method, we have no need to initialise an empty object, populate it with key-value pairs, then return the object
// We are going straight into defining the key-value pairs

function Potat (firstName, lastName) {

    this.firstName = firstName;

    this.lastName = lastName;

    this.getName = function () {
        return `User's name: ${this.firstName} ${this.lastName}`;
    }

}

// Secondly, we will create an instance of the object with new

const poTayTo = new Potat('Francine', 'Poh');
console.log(poTayTo); // User { firstName: 'Francine', lastName: 'Poh', getName: [Function (anonymous)] }
console.log(poTayTo.getName()); // User's name: Francine Poh

const poTahTo = new Potat('Werner', 'Marschall');
console.log(poTahTo.getName()); // User's name: Werner Marschall



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