/* 
Table of Contents


*/



// Literals represent values in JavaScript. These are fixed values—not variables—that you literally provide in your script. 

// This section describes the following types of literals:

// Array literals
// Boolean literals
// Numeric literals
// Object literals
// RegExp literals
// String literals



// ----------------------------- > ARRAY LITERAL -----------------------------

// An array literal is a list of zero or more expressions, each of which represents an array element, enclosed in square brackets ([]). 
// When you create an array using an array literal, it is initialized with the specified values as its elements, and its length is set to the number of arguments specified.



// The following example creates the coffees array with three elements and a length of three:

const coffees = ["French Roast", "Colombian", "Kona"];



// An array literal creates a new array object every time the literal is evaluated. 
// For example, an array defined with a literal in the global scope is created once when the script loads. 
// However, if the array literal is inside a function, a new array is instantiated every time that function is called.



// NOTE: Array literals create Array objects. See Javascript\array for more information.



// ----------------------------- > ARRAY LITERAL >> Extra Commas In Array Literals

// If you put two commas in a row in an array literal, the array leaves an empty slot for the unspecified element. 



// The following example creates the fish array:

const fish = ["Lion", , "Angel"];

// When you log this array, you will see:

console.log(fish); // [ 'Lion', , 'Angel' ]



// Note that the second item is "empty", which is not exactly the same as the actual undefined value. 
// When using array-traversing methods like Array.prototype.map, empty slots are skipped. However, index-accessing fish[1] still returns undefined.



// If you include a trailing comma at the end of the list of elements, the comma is ignored.



// In the following example, the length of the array is three. There is no myList[3]. All other commas in the list indicate a new element.

var myList = ["home", , "school"];

// In the following example, the length of the array is four, and myList[0] and myList[2] are missing.

var myList = [, "home", , "school"];

// In the following example, the length of the array is four, and myList[1] and myList[3] are missing. Only the last comma is ignored.

var myList = ["home", , "school", ,];



// Understanding the behavior of extra commas is important to understanding JavaScript as a language.



// However, when writing your own code, you should explicitly declare the missing elements as undefined, or at least insert a comment to highlight its absence. 
// Doing this increases your code's clarity and maintainability.

const myList = ["home", /* empty */, "school", /* empty */,];



// ----------------------------- > BOOLEAN LITERALS -----------------------------

// The Boolean type has two literal values: true and false.

// NOTE: Do not confuse the primitive Boolean values true and false with the true and false values of the Boolean object.
// The Boolean object is a wrapper around the primitive Boolean data type.



// ----------------------------- > NUMERIC LITERALS -----------------------------

// JavaScript numeric literals include *integer literals in different bases as well as *floating-point literals in base-10.

// Note that the language specification requires numeric literals to be unsigned.
// Nevertheless, code fragments like -123.4 are fine, being interpreted as a *unary-operator applied to the numeric literal 123.4.



// *integer: a whole number (not a fractional number) that can be positive, negative, or zero
// *floating-point: a positive or negative whole number with a decimal point
// *unary-operator: See JAVASCRIPT\math\operator.js\> UNARY OPERATORS



// For more information on numeric literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals



// ----------------------------- > OBJECT LITERALS -----------------------------

// An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}).

// Warning: Do not use an object literal at the beginning of a statement!
// This will lead to an error (or not behave as you expect), because the { will be interpreted as the beginning of a block.



// The following is an example of an object literal. 
// The first element of the car object defines a property, myCar, and assigns to it a new string, 
// "Saturn"; the second element, the getCar property, is immediately assigned the result of invoking the function (carTypes("Honda")); 
// the third element, the special property, uses an existing variable (sales).

var sales = "Toyota";

function carTypes(name) {
    return name === "Honda" ? name : `Sorry, we don't sell ${name}.`;
}

var car = {
    myCar: "Saturn",
    getCar: carTypes("Honda"),
    special: sales
};

console.log(car.myCar); // Saturn
console.log(car.getCar); // Honda
console.log(car.special); // Toyota



// Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another. 

// The following example uses these options.

var car = {
    manyCars: {
        a: "Saab",
        b: "Jeep"
    },
    7: "Mazda"
};

console.log(car.manyCars.b); // Jeep
console.log(car[7]); // Mazda



// Object property names can be any string, including the empty string. 
// If the property name would not be a valid JavaScript identifier or number, it must be enclosed in quotes.

// Property names that are not valid identifiers cannot be accessed as a dot (.) property.

const unusualPropertyNames = {
    '': 'An empty string',
    '!': 'Bang!',
}

/* 
console.log(unusualPropertyNames.''); // SyntaxError: Unexpected string
console.log(unusualPropertyNames.!); // SyntaxError: Unexpected token !
*/

// Instead, they must be accessed with the bracket notation ([]).

console.log(unusualPropertyNames[""]); // An empty string
console.log(unusualPropertyNames["!"]); // Bang!



// ----------------------------- > OBJECT LITERALS >> Enhanced Object Literals

// Object literals support a range of shorthand syntaxes that include 

//      setting the prototype at construction, 
//      shorthand for foo: foo assignments, 
//      defining methods, 
//      making super calls, 
//      and computing property names with expressions.



// Together, these also bring object literals and class declarations closer together, and allow object-based design to benefit from some of the same conveniences.

const originalObj = {
    bar() {
        return 'bar';
    }
}

const handler = 'foo';

const obj = {
    __proto__: originalObj, // __proto__

    handler, // Shorthand for 'handler: handler'

    // Methods
    womboCombo() {
        return `${handler} ${super.bar()}`; // Super calls
    },

    ["prop_" + (() => 42)()]: 42, // Computed (dynamic) property names
};

console.log(obj.__proto__); // Object { bar: bar() }
console.log(obj.handler); // foo
console.log(obj.womboCombo()); // foo bar
console.log(obj["prop_" + (() => 42)()]); // 42
console.log(obj['prop_42']); // 42



// ----------------------------- > RegExp literals -----------------------------

// A regex literal is a pattern enclosed between slashes. 

// The following is an example of a regex literal.

const re = /ab+c/;

// See FIXME:



// ----------------------------- > String literals -----------------------------

// A string literal is zero or more characters enclosed in double (") or single (') quotation marks. 
// A string must be delimited by quotation marks of the same type (that is, either both single quotation marks, or both double quotation marks).



// The following are examples of string literals:

'foo'
"bar"
'1234'
'one line \n another line'
"Joyo's cat"



// You should use string literals unless you specifically need to use a String object.



// You can call any of the String object's methods on a string literal value. 
// JavaScript automatically converts the string literal to a temporary String object, calls the method, then discards the temporary String object. 
// You can also use the length property with a string literal:

// Will print the number of symbols in the string including whitespace.
console.log("Joyo's cat".length); // 10



// Template literals are also available. 
// Template literals are enclosed by the back-tick (`) (grave accent) character instead of double or single quotes.

// Template literals provide syntactic sugar for constructing strings. (This is similar to string interpolation features in Perl, Python, and more.)



// Basic literal string creation
console.log(`In JavaScript '\n' is a line-feed.`);

// Multiline strings
console.log(`In JavaScript, template strings can run
over multiple lines, but double and single
quoted strings cannot.`);

/* 
console.log('For example this line 
with single quotes will not run across multiple 
lines without errors');
*/

// String interpolation
const person = 'Lev', time = 'today';
console.log(`Hello ${person}, how are you ${time}?`);



// Tagged templates are a compact syntax for specifying a template literal along with a call to a "tag" function for parsing it. 
// A tagged template is just a more succinct and semantic way to invoke a function that processes a string and a set of relevant values. 
// The name of the template tag function precedes the template literal — as in the following example, where the template tag function is named print. 
// The print function will interpolate the arguments and serialize any objects or arrays that may come up, avoiding the pesky [object Object].



function makeBulletList(todo) {
    let list = ``;

    todo.forEach((item) => {
        list += `
        - ${item}`
    })

    return list;
}

function printTag(strings, day, person, todo) {

    // console.log(strings, day, person, todo);
    /*     
    [ 'On ', ', ', ' needs to do: ', '' ] 2024-04-05T09:04:50.019Z Francine [
    'Learn JavaScript',
    'Workout',
    'Get my vaccination',
    'Print materials for Heart RPG'
    ]
    */

    console.log(`${strings[0]}${day.toLocaleDateString()}${strings[1]}${person}${strings[2]}${makeBulletList(todo)}`);
}

const today = new Date();

const person1 = 'Francine';

const todos1 = [
    "Learn JavaScript",
    "Workout",
    "Get my vaccination",
    "Print materials for Heart RPG",
];

printTag`On ${today}, ${person1} needs to do: ${todos1}`;
/* 
On 05/04/2024, Francine needs to do: 
        - Learn JavaScript
        - Workout
        - Get my vaccination
        - Print materials for Heart RPG
*/

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const person2 = 'Werner';

const togos2 = [
    "Jordy's",
    "Gimsel",
    "Oogstmarkt",
    "Donner",
];

printTag`When it is ${tomorrow}, ${person2} should go to ${togos2}`
/* 
When it is 06/04/2024, Werner should go to 
        - Jordy's
        - Gimsel
        - Oogstmarkt
        - Donner
*/



FIXME:
// Since tagged template literals are just sugar of function calls, you can re-write the above as an equivalent function call:

print(["I need to do:\n", "\nMy current progress is: ", "\n"], todos, progress);

// This may be reminiscent of the console.log-style interpolation:

console.log("I need to do:\n%o\nMy current progress is: %o\n", todos, progress);

// You can see how the tagged template reads more naturally than a traditional "formatter" function, where the variables and the template itself have to be declared separately.