/* 
Table of Contents

> OBJECT LITERALS
> SQUARE BRACKET NOTATION
> HANDLING OBJECT MEMBERS
>> Setting
>> Enumerating
>> Deleting
> OBJECT CREATION 
>> Constructor
>> Factory Function
>> Class
>> Object.create
>> Usage Scenarios
> INHERITANCE
> PROPERTY EXISTENCE TEST, 'IN' OPERATOR
> PROPERTY ORDER IN OBJECTS
> A BRIEF ABOUT OBJECT LITERALS
*/



// A JavaScript object is a collection of properties, and a property is an association between a name (or key) and a value
// Object properties are basically the same as variables, except that they are associated with objects, not scopes. 
// The properties of an object define the characteristics of the object

// NOTE: Tangentially related to our current topic - JavaScript is designed on an object-based paradigm.  

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

    drinkMethod: function (name) {
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

function oneTimeUse({ name, age }) {
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



// +++++ An Example using a function utilising square bracket notation

let thatUser = {
    name: "John",
    age: 30,
};

function logProperty(obj, propName) {
    console.log(obj[propName]);
}

logProperty(thatUser, "name"); // John
logProperty(thatUser, "age"); // 30

// This can be very useful for creating/changing properties, using a variety of property names, with a single versatile function

function setProperty(obj, propName, propValue) {
    obj[propName] = propValue;
}

setProperty(thatUser, "location", "singapore");
setProperty(thatUser, "family-members", {
    wife: "Jane",
    son: "James",
    daughter: "Janet"
});
setProperty(thatUser, 10, "Ten");
setProperty(thatUser, "age", "40");

console.log(thatUser);
// {
//   '10': 'Ten',
//   name: 'John',
//   age: '40',
//   location: 'singapore',
//   'family-members': { wife: 'Jane', son: 'James', daughter: 'Janet' }
// }



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



// +++++ This notation is also very useful when property names are to be dynamically determined, i.e., not determinable until runtime. 

// NOTE: However, beware of using square brackets to access properties whose names are given by external input. 
// This may make your code susceptible to object injection attacks. 

// +++++ Very Basic Example

const userProfile = {
    name: "Alex",
    role: "user",
    _internalApiKey: "secret_123" // Internal/private property
};

const userInput = "_internalApiKey";

// DANGEROUS: Exposes internal state directly
console.log(userProfile[userInput]); // "secret_123"

// The most direct fix here is going to be to avoid the use of user input in property name fields. 

// Another option is to create a allowlist of allowed property names, and filter each user input through a helper function to check before allowing it to be used. 
// This is a great option in situations where you know specifically what property names to allow.

// In cases where you don't have a strictly defined data model, then using the same method as above, but with a denylist of disallowed properties instead is a valid choice.

// NOTE: You also have the option of using ECMAScript 6 *Proxy, which wraps around a target object and intercepts operations — like reading a property via get. 
// It acts as a gatekeeper that inspects what key the user is trying to read before deciding whether to grant access.

// * Proxy: See proxy.js 

// +++++ Basic Example of how proxies will work

const privateProfile = {
    name: "Alex",
    role: "user",
    _internalApiKey: "secret_123"
};

// Define the public "allowed" subset
const allowedFields = ["name", "role"];

// Create the Proxy gatekeeper
const publicProfile = new Proxy(privateProfile, {
    get(target, property) {

        // Only allow access if the property is explicitly in our whitelist
        if (allowedFields.includes(property)) {
            return target[property];
        }

        // Return undefined or throw an error for anything else
        return undefined;
    }
}
);

// SAFE: Dynamic bracket access through the Proxy
console.log(publicProfile["name"]);            // "Alex" (Allowed)
console.log(publicProfile["_internalApiKey"]); // undefined (Blocked!)



// ----------------------------- > HANDLING OBJECT MEMBERS -----------------------------

// This this section, we will talk about: 
//      Setting
//      Enumerating
//      Deleting



// ----------------------------- > HANDLING OBJECT MEMBERS >> Setting

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



// ----------------------------- > HANDLING OBJECT MEMBERS >> Enumerating

// There are three native ways to list/traverse object properties:

// +++++ for...in loops. 
// This method traverses all of the enumerable string properties of an object as well as its prototype chain.

const myDog = {
    name: "Pancake",
    age: 7,
    owner: "John",
}

function showPropsOne(obj, objName) {

    let result = "";

    for (const item in obj) {

        // Object.hasOwn() is used to exclude properties from the object's prototype chain and only show "own properties" 
        if (Object.hasOwn(obj, item)) {
            result += `${objName}.${item} = ${obj[item]}\n`;
        }
    }

    console.log(result);
}

showPropsOne(myDog, 'myDog');
// myDog.name = Pancake
// myDog.age = 7
// myDog.owner = John



// +++++ Object.keys(). 
// This method returns an array with only the enumerable own string property names ("keys") in the object myObj, but not those in the prototype chain.

const myDuck = {
    name: "Pannenkoek",
    age: 7,
    owner: "Jan",
}

function showPropsTwo(obj, objName) {

    let result = "";

    Object.keys(obj).forEach((item) => {
        result += `${objName}.${item} = ${obj[item]}\n`;
    });

    console.log(result);
}

showPropsTwo(myDuck, 'myDuck');
// myDuck.name = Pannenkoek
// myDuck.age = 7
// myDuck.owner = Jan



// +++++ Object.getOwnPropertyNames(). 
// This method returns an array containing all the own string property names in the object myObj, regardless of if they are enumerable or not.

// There is no native way to list all inherited properties, including non-enumerable ones. 
// However, this can be achieved with the following function:

const myDeer = {
    name: "Pfannkuchen",
    age: 7,
    owner: "Johann",
}

function showAllProps(obj) {

    let objectToInspect = obj; // This variable acts as a moving pointer that traverses upward through the prototype chain step by step.
    let result = []; // empty array to collect and accumulate property names from obj and every object along its prototype chain.

    while (objectToInspect !== null) { // In JavaScript, the root prototype (Object.prototype.__proto__) is null, marking the end of the prototype chain.

        // Object.getOwnPropertyNames(objectToInspect) returns an array of all string-key property names directly owned by the current level of objectToInspect 
        // (including both enumerable and non-enumerable properties, such as built-in methods).
        // .concat(...) merges these names into the result array and assigns the combined array back to result.
        result = result.concat(Object.getOwnPropertyNames(objectToInspect));
        console.log(result);
        // 1. [ 'name', 'age', 'owner' ]
        // 2. See result below

        // Moves one level up the prototype chain by retrieving the parent prototype of objectToInspect 
        // and updating objectToInspect to point to it (or null if the top has been reached).
        objectToInspect = Object.getPrototypeOf(objectToInspect);
        console.log(objectToInspect);
        // 1. [Object: null prototype] {}
        // 2. null
    }

    console.log(result);
}

showAllProps(myDeer);
// [
//   'name',
//   'age',
//   'owner',
//   'constructor',
//   '__defineGetter__',
//   '__defineSetter__',
//   'hasOwnProperty',
//   '__lookupGetter__',
//   '__lookupSetter__',
//   'isPrototypeOf',
//   'propertyIsEnumerable',
//   'toString',
//   'valueOf',
//   '__proto__',
//   'toLocaleString'
// ]



// ----------------------------- > HANDLING OBJECT MEMBERS >> Deleting

// You can remove a non-inherited property using the delete operator. The following code shows how to remove a property.

const myDwarfHamster = {
    name: "Pandekager",
    age: 7,
    owner: "Jens",
}

delete myDwarfHamster.age;
console.log(myDwarfHamster); // { name: 'Pandekager', owner: 'Jens' }



// ----------------------------- > OBJECT CREATION -----------------------------

// There are a number of outwardly similar methods of creating objects, but each comes with its own pros and cons

// The methods are:
// Constructor
// Factory Function
// Class
// Object.create

// Not included in this section is writing it as an object literal, which we have already touched upon above



// ----------------------------- > OBJECT CREATION >> Constructor

// Firstly, we will define the object type by writing a constructor function. 
// To define an object type, create a function for the object type that specifies its name, properties, and methods.

// There is a strong convention, with good reason, to use a capital initial letter.

function CreateUserConstructor(firstName, lastName) {

    let location = "Singapore"; // Private variable

    this.firstName = firstName; // Public property
    this.lastName = lastName;

    this.getLocation = function () { // Re-created per instance
        return `${firstName} ${lastName} lives in ${location}.`;
    };

}

const user1 = new CreateUserConstructor("Francine", "Poh"); // 'new' required for object creation

console.log(user1.getLocation()); // Francine Poh lives in Singapore.
console.log(user1.location); // undefined



// +++++ NOTE: Creating private properties by using the block-scoped const and let and making use of lexical scoping

// following OOP, properties and methods can be made private by using ‘let' instead of ‘this', as you can see in the above let location = "Singapore"
// This works through lexical scope and closures — the exact same mechanism factory functions use to hide private state.

// let creates a local variable, not an object property
// When you call new CreateUserConstructor(...), JavaScript creates a new empty object and binds it to this.
// Anything attached to this (this.firstName, this.getLocation) gets added as a public property on the instance.
// let location = 'Singapore' creates a local variable that lives only inside the CreateUserConstructor function scope. It is never attached to this.

// Why user1.location is undefined
// Because location was never assigned to this, the property users1.location does not exist on the object. 
// When JavaScript tries to read a non-existent property on an object, it returns undefined.

// Why getLocation() can still read location (Closure)
// In JavaScript, functions "remember" the variables in the scope where they were created.
// When this.getLocation is created inside CreateUserConstructor, it forms a closure over location. 
// Even after new CreateUserConstructor() finishes executing, getLocation() keeps a hidden reference back to that location variable.



// ----------------------------- > OBJECT CREATION >> Factory Function

// This operates entirely like a normal function
// The return value of the createUserFactory function is an object

function createUserFactory(firstName, lastName) {

    let location = "Netherlands"; // Private variable

    // Returns an object populated with properties
    return {
        firstName, // Public property
        lastName,
        getLocation() { // Method is re-created per instance - this uses more memory when creating lots of objects
            return `${firstName} ${lastName} lives in ${location}.`;
        }
    };

}

const user2 = createUserFactory("Werner", "Marschall"); // 'new' NOT required for object creation

console.log(user2.getLocation()); // Werner Marschall lives in Netherlands.
console.log(user2.location); // undefined



// ----------------------------- > OBJECT CREATION >> Class

// Now, we will use the class attribute to create a class in JavaScript instead of a function constructor
// and use the new operator to create an instance

class CreateUserClass {

    #location = "Cardboard Box";

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    };

    getLocation() {
        return `${this.firstName} ${this.lastName} lives in ${this.#location}.`;
    };

}

const user3 = new CreateUserClass("Kitty", "Cat"); // 'new' required for object creation

console.log(user3.getLocation()); // Kitty Cat lives in Cardboard Box.
console.log(user3.location); // undefined



// ----------------------------- > OBJECT CREATION >> Object.create

// Create new objects by allowing us to use an existing object as the prototype of a new object we create. 
// This method can be very useful, because it allows you to choose the prototype object for the object you want to create, without having to define a constructor function.
// This pattern is often called OLOO (Objects Linked to Other Objects)

// create a 'customUser' object that has the same properties and methods as 'sausage', just with different values.

const defaultUser = {
    login: 'admin',
    password: 'password',

    getLoginDetails: function () {
        console.log(`User's login: ${this.login} / User's password: ${this.password}`);
    }
}

console.log(defaultUser);
// {
//     login: 'admin',
//     password: 'password',
//     getLoginDetails: [Function: getLoginDetails]
// }

const customUser = Object.create(defaultUser);

// customUser is an empty object
// but we are still able to look up the prototype chain to access the login and password properties on defaultUser
console.log(customUser); // {} - empty object
console.log(customUser.login); // admin
console.log(customUser.password); // password

// We will now set the login and password properties on customUser
customUser.login = 'johndoe';
customUser.password = 'johndoebirthdate';
console.log(customUser); // { login: 'johndoe', password: 'johndoebirthdate' }

// Same with the getLoginDetails function - we are able to call it despite customeUser appearing to be an empty object due to the prototype chain
customUser.getLoginDetails(); // User's login: johndoe / User's password: johndoebirthdate



// ----------------------------- > OBJECT CREATION >> Usage Scenario

// Here is a very brief overview on the differences between all the object creating methods and what are the best scenarios for each



// +++++ Object Literal

// The direct, inline creation of a single key - value object without using blueprints, constructors, or prototype linkages.

// Pros:

// Ultimate Simplicity: Cleanest, fastest syntax for defining structured data and key - value pairs on the fly.
// Zero Overhead: No boilerplate, class definitions, or prototype lookup chains needed.
// JSON Native: Directly mirrors standard data - interchange formats used across web APIs and configuration files.

// Cons:

// No Reusable Blueprint: Cannot easily spawn multiple structured instances without duplicating code.
// No Encapsulation: Every property and method is fully public and mutable by default.
// Duplicated Memory: Adding methods directly inside multiple object literals duplicates function instances in memory.

// Where It Fits Best:

// Singletons, configuration settings, options parameters, state snapshots, and simple data payloads where you only need a single, static object instance.



// +++++ Constructor Function

// Constructor function is the legacy ES5 approach to building objects. 
// They rely on calling a standard function with the new keyword to attach properties and methods directly to this or its prototype.

// Pros:

// Shared Prototype Memory: Achieves efficient method sharing across instances without modern class syntax.
// Universal Compatibility: Supported by ancient JavaScript runtimes and lightweight embedded JS engines (e.g., IoT environments).

// Cons:

// Outdated Syntax: Clunky and verbose compared to modern ES6 classes.
// Error-Prone: Accidentally calling a constructor without new mutates global scope (or throws errors in strict mode).
// Lacks Modern Privacy: Cannot use #private fields; must rely on memory-heavy closures or naming conventions (_property).

// Where It Fits Best:

// Maintaining older ES5 codebases, writing low-level utility libraries, or running code in memory-constrained, embedded JavaScript environments.



// +++++ Factory Function

// A standard function that builds and returns a plain object without requiring the new keyword or this references.
// They rely on lexical closures to maintain private data and variables.

// Pros:

// Context Safety: Eliminates this context-loss bugs completely; methods can be safely passed around as callbacks or event handlers.
// Lexical Privacy: Provides true private state using native JavaScript closures (let/const inside the function scope).
// Simple Composition: Extremely flexible for combining multiple object mixins or behavioral traits without inheritance hierarchies.

// Cons:

// Higher Memory Footprint: Recreates method functions in memory for every instance created rather than sharing them on a prototype.
// Slower JIT Optimization: Slightly harder for V8 engines to optimize into fixed "hidden classes" at massive scale compared to ES6 classes.

// Where It Fits Best:

// Application service modules, API clients, state managers, event listeners, utility toolsets, 
// Any scenario where context safety (this immunity) and clean privacy outweigh raw memory limits.



// +++++ Class

// ES6 classes are the modern standard for object-oriented JavaScript. 
// They use prototype-based inheritance under the hood, allowing all instances to share a single copy of each method in memory.

// Pros:

// Engine Efficiency: Shared prototype methods save RAM, and predictable shapes allow V8 to execute near-native property lookups via Inline Caching.
// Native Private Fields: Supports modern #private fields for strict engine-level property privacy.
// Ecosystem Standard: Fits seamlessly into TypeScript, modern frameworks, and traditional Object-Oriented Design patterns.

// Cons:

// Fragile this Context: Class methods lose their binding easily when passed as unbound callbacks or event handlers.
// Requires new: Forgetting the new keyword throws an immediate runtime TypeError.

// Where It Fits Best:

// High-volume data models (tens of thousands of instances), UI component hierarchies, domain entities, and performance-critical loops where memory efficiency and execution speed are paramount.



// +++++ Object.create()

// JavaScript's pure, direct approach to prototypal inheritance (OLOO - Objects Linked to Other Objects) that creates a new object directly linked to an existing prototype object.

// Pros:

// Direct Prototype Control: Links objects directly without needing constructors, new, or class syntax.
// Memory Efficient: Methods sit on the linked prototype object and are shared across all instances.
// Pure Dictionaries: Creates prototype-less objects via Object.create(null) to eliminate default methods (toString, hasOwnProperty) and prevent prototype pollution.

// Cons:

// Clunky Property Definition: Adding instance properties during creation requires verbose property descriptors ({ value: 10, writable: true }).
// No Native Private State: Cannot use #private fields without wrapping execution inside a factory function or class.
// Fragile this Context: Methods on the prototype still rely on dynamic this binding and are prone to context-loss.

// Where It Fits Best

// Use Object.create(null) for pure key-value lookup maps and dictionary objects. 
// For general object creation in modern applications, ES6 classes or Factory Functions remain much easier to read and maintain.



// ----------------------------- > INHERITANCE -----------------------------

// All objects in JavaScript inherit from at least one other object. 
// The object being inherited from is known as the prototype, and the inherited properties can be found in the prototype object of the constructor.

// You can add a property to all objects created through a certain constructor using the prototype property. 
// This defines a property that is shared by all objects of the specified type, rather than by just one instance of the object. 

const car = {
    type: "sedan",
    colour: "red",

    message() {
        console.log(`The car is a ${this.type} and the colour is ${this.colour}.`);
    }
}

const toyota = Object.create(car);
toyota.message(); // The car is a sedan and the colour is red.

// Changing a property on the parent 'car'
car.colour = "blue";
car.message(); // The car is a sedan and the colour is blue.
toyota.message(); // The car is a sedan and the colour is blue.

// Changing a property on the child 'toyota'
toyota.colour = "green";
car.message(); // The car is a sedan and the colour is blue.
toyota.message(); // The car is a sedan and the colour is green.



// +++++ 'Super' keyword Examples +++++

// NOTE: Accessing the original property on the parent through the child using the keyword 'super'

const truck = {
    colour: "red",
}

const hilux = {
    __proto__: truck, // setting 'truck' as 'hilux's parent
    colour: "green", // setting the 'colour' property on the child object to something different from the parent object

    message() {
        console.log(`My colour is ${this.colour} and not ${super.colour}.`); // note the use of 'this' vs 'super'
    }
}

hilux.message(); // My colour is green and not red.

// In this case, 'this' refers to the object 'hilux'
// 'super' is used to call the constructor of 'hilux's parent class 'truck' to access the parent's properties and methods.

// When another object inherits from 'hilux', 'this' changes dynamically to the caller 'hiluxChamp'
// but 'super' stays statically bound to 'hilux's prototype, 'truck'

const hiluxChamp = {
    __proto__: hilux,
    colour: "yellow",
}

hiluxChamp.message(); // My colour is yellow and not red.



// When you define a method using ES6 concise method shorthand inside an object literal, JavaScript attaches a hidden internal slot to the function called [[HomeObject]]. 
// This slot permanently stores a reference to the enclosing object literal.

// Example of a failure to assign a super call retroactively 

const boat = {
    colour: "red",
}

const yacht = {
    __proto__: boat,
    colour: "yellow",
}

const addingSuperCall = {
    message() {
        console.log(`My colour is ${this.colour} and not ${super.colour}.`);
    }
}

yacht.message = addingSuperCall.message;
yacht.message(); // My colour is yellow and not undefined.

// Process: 
//      Call yacht.message, 'this' set to 'yacht'
//      super resolution: super ignores this completely and checks searchMessage.[[HomeObject]], which is 'addingSuperCall'
//      It retrieves Object.getPrototypeOf(addingSuperCall). 
//      Because 'addingSuperCall' was created as a standard object literal ({}), its prototype is standard Object.prototype.
//      It looks for Object.prototype.colour, finds nothing, and returns undefined.

// Example of how to assign super calls retroactively properly

const catamaran = {
    __proto__: boat,
    colour: "green",
}

// First, we must set 'addingSuperCall's prototype to 'boat'
Object.setPrototypeOf(addingSuperCall, boat); 
// if you want to just ensure it is definitely the prototype of catamaran, just write Object.setPrototypeOf(addingSuperCall, Object.getPrototypeOf(catamaran))

// Next, we assign the method to the child object 'catamaran'
catamaran.message = addingSuperCall.message;
catamaran.message(); // My colour is green and not red.



// ----------------------------- > GETTERS AND SETTERS -----------------------------

// A getter is a function associated with a property that gets the value of a specific property. 
// A setter is a function associated with a property that sets the value of a specific property. 

// Together, they can indirectly represent the value of a property.

// Getters and setters can be either
// defined within object initializers, or
// added later to any existing object.

// Within object initializers, getters and setters are defined like regular methods, but prefixed with the keywords get or set. 
// The getter method must not expect a parameter, while the setter method expects exactly one parameter (the new value to set). 

const myObj = {
    theNumber: 7,

    get gettingTheNumber() {
        return `The number is ${this.theNumber}.`;
    },

    set settingTheNumber(newNumber) {
        this.theNumber = newNumber;
        return;
    },
};

console.log(myObj.theNumber); // 7
console.log(myObj.gettingTheNumber); // The number is 7.
myObj.settingTheNumber = 25; // Calls the set settingTheNumber(newNumber) method
console.log(myObj.theNumber); // 25

// The myObj object's properties are:
// myObj.theNumber — a number
// myObj.gettingTheNumber — a getter that returns a string and theNumber
// myObj.settingTheNumber — a setter that sets the value of myObj.theNumber to a new number



// Getters and setters can also be added to an object at any time after creation using the Object.defineProperties() method. 
// This method's first parameter is the object on which you want to define the getter or setter. 
// The second parameter is an object whose property names are the getter or setter names, and whose property values are objects for defining the getter or setter functions. 

// Here's an example that defines the same getter and setter used in the previous example:

Object.defineProperties(myObj, {

    gettingTheNumber: {
        get() {
            return `This is the new getter, and the number is currently ${this.theNumber}.`
        },
    },

    settingTheNumber: {
        set(newNumber) {
            this.theNumber = this.theNumber * newNumber;
        },
    },
});

console.log(myObj.theNumber); // 25
console.log(myObj.gettingTheNumber); // This is the new getter, and the number is currently 25.
myObj.settingTheNumber = 4; // Calls the set settingTheNumber(newNumber) method, which will multiply theNumber by newNumber
console.log(myObj.theNumber) // 100



// Which of the two forms to choose depends on your programming style and task at hand.

// If you can change the definition of the original object, you will probably define getters and setters through the original initializer. 
// This form is more compact and natural.

// However, if you need to add getters and setters later — maybe because you did not write the particular object — 
// then the second form is the only possible form.

// The second form better represents the dynamic nature of JavaScript, but it can make the code hard to read and understand.



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



// ----------------------------- > A BRIEF ABOUT OBJECT LITERALS -----------------------------

// So, as you can see, object literals support a range of shorthand syntaxes that include 
//      setting the *prototype at construction, 
//      shorthand for property assignments, 
//      defining methods, 
//      making super calls, 
//      and computing property names with expressions.

// Together, these also bring object literals and class declarations closer together, and allow object-based design to benefit from some of the same conveniences.

// * prototype
//      Coding Definition: new objects are produced by cloning existing objects, which are called prototypes
//      See Cheatsheet\coding\prototype.js
//      You will also learn more in 10_object\prototypes.js

const parentObject = {
    parentName: "parentObject"
}

const greeting = "Hello!";

const childObject = {
    
    // setting parentObject as childObject's prototype
    __proto__: parentObject,

    // Shorthand for 'greeting: greeting'
    greeting, 

    // Computed (dynamic) property names
    ["child" + "Name"]: "childObject",

    // Setting the parentName property here to show the difference between calling parentName with 'this' vs 'super'
    parentName: "nonparentalObject",

    // Defining Methods
    message() {
        return `${greeting} I am ${this["childName"]}, and my parent is not ${this.parentName}, it is ${super.parentName}.`; // Super calls
    },

};

console.log(childObject.__proto__); // { parentName: 'parentObject' }
console.log(childObject.parentName); // parentObject
console.log(childObject.greeting); // Hello!
console.log(childObject["child" + "Name"]); // childObject
console.log(childObject.message()); // Hello! I am childObject, and my parent is not nonparentalObject, it is parentObject.