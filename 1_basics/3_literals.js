/* 
Table of Contents

> ARRAY LITERAL
>> Length
>> Sparse Arrays 
> BOOLEAN LITERALS
> NUMERIC LITERALS
> OBJECT LITERALS
>> Enhanced Object Literals
> REGEXP LITERALS
> STRING LITERALS
>> Escaping Characters In A String
>> Template Literals
>> Split A Traditional String Over Multiple Lines
>>> Tagged Templates
*/



// Literals represent values in JavaScript. These are fixed values—not variables—that you literally provide in your script. 

// This section describes the following types of literals:

// Array literals
const array = [value1, value2, value3];

// Boolean literals
true;
false;

// Numeric literals
1, 28, 545;

// Object literals
const object = {
    property1: value1,
    property2: value2,
    property3: value3,
}

// RegExp literals
const regExp = /ab+c/;

// String literals
'Hello I am a string.'



// NOTE: Although this page is about literals, we will also be going through some stuff about these data types, not just about literals. 



// ----------------------------- > ARRAY LITERAL -----------------------------

// An array literal is a list of zero or more expressions, each of which represents an array element, enclosed in square brackets ([]). 
// When you create an array using an array literal, it is initialized with the specified values as its elements, and its length is set to the number of arguments specified.

// NOTE: Array index start from 0. So an array with 3 elements in it will have the indexes 0, 1, 2
// See interesting but not necessary explanation in https://en.wikipedia.org/wiki/Zero-based_numbering
// I don't quite understand myself but it's all about optimisation and math stuff

// An array literal creates a new array object every time the literal is evaluated. 
// For example, an array defined with a literal in the global scope is created once when the script loads. 
// However, if the array literal is inside a function, a new array is instantiated every time that function is called



// The following example creates the coffees array with three elements and a length of three:

let coffees = ["French Roast", "Colombian", "Kona"];

console.log(coffees[0]); // French Roast
console.log(coffees[1]); // Colombian
console.log(coffees[2]); // Kona

// You can also create arrays using the following methods:

coffees = new Array("French Roast", "Colombian", "Kona");
console.log(coffees); // [ 'French Roast', 'Colombian', 'Kona' ]

coffees = Array("French Roast", "Colombian", "Kona");
console.log(coffees); // [ 'French Roast', 'Colombian', 'Kona' ]



// in an array we can store various data types — strings, numbers, objects, and even other arrays. 
// We can also mix data types in a single array

coffees = ["French Roast", "Colombian", "Kona"];
let random = ['tree', 795, 'apple', 9.273, coffees];

console.log(random[0]); // tree
console.log(random[1]); // 795
console.log(random[4]); // [ 'French Roast', 'Colombian', 'Kona' ]



// ----- Multidimensional Array  

// Arrays can be nested, meaning that an array can contain another array as an element. 
// Using this characteristic of JavaScript arrays, multi-dimensional arrays can be created.

// You can access an item inside an array that is itself inside another array by chaining two sets of square brackets together.

coffees = ["French Roast", "Colombian", "Kona"];
random = ['tree', 795, ['apple', 9.273, coffees]];

console.log(random[2][2]); // [ 'French Roast', 'Colombian', 'Kona' ]
console.log(random[2][2][0]); // French Roast



// ----- Creating Empty Arrays

const empty1 = [];
const empty2 = new Array();
const empty3 = Array();



const arr = [1, 2, 3];
arr.property = "value";
console.log(arr); // "value"



// ----------------------------- > ARRAY LITERAL >> Length

// At the implementation level, JavaScript's arrays actually store their elements as standard object properties, using the array index as the property name.

// Writing a value that is shorter than the number of stored items truncates the array. Writing 0 empties it entirely:

const cats = ["Dusty", "Misty", "Twiggy"];
console.log(cats.length); // 3

cats.length = 2;
console.log(cats); // [ 'Dusty', 'Misty' ] - Twiggy has been removed

cats.length = 0;
console.log(cats); // []; the cats array is empty

cats.length = 3;
console.log(cats); // [ <3 empty items> ]



// ----------------------------- > ARRAY LITERAL >> Sparse Arrays 

// Arrays can contain "empty slots", which are not the same as slots filled with the value undefined. 
// Empty slots can be created in one of the following ways:

// Array constructor:
const a = Array(5);
console.log(a);// [ <5 empty items> ]

// Consecutive commas in array literal:
const b = [1, 2, , , 5];
console.log(b); // [ 1, 2, <2 empty items>, 5 ]

// Directly setting a slot with index greater than array.length:
const c = [1, 2];
c[4] = 5;
console.log(c); // [ 1, 2, <2 empty items>, 5 ]

// Elongating an array by directly setting .length:
const d = [1, 2];
d.length = 5;
console.log(d); // [ 1, 2, <3 empty items> ]

// Deleting an element:
const e = [1, 2, 3, 4, 5];
delete e[2];
console.log(e); // [ 1, 2, <1 empty item>, 4, 5 ]

// If you include a trailing comma at the end of the list of elements, the comma is ignored.

const f = [1, 2, 3, , ];
console.log(f); // [ 1, 2, 3, <1 empty item> ]

// When writing your own code, you should explicitly declare the missing elements as undefined, or at least insert a comment to highlight its absence. 
// Doing this increases your code's clarity and maintainability.

const g = [1, /* empty */, 3, /* empty */,];
console.log(g); // [ 1, <1 empty item>, 3, <1 empty item> ]



// NOTE: You may want to come back to the reset of the >> Sparse Arrays section again once you have studied till 7_array_methods

// In some operations, empty slots behave as if they are filled with undefined.

const arr = [1, 2, , , 5]; // Create a sparse array

// Indexed access
console.log(arr[2]); // undefined

// For... of method to iterate over an array
for (const i of arr) {
    console.log(i); // 1 2 undefined undefined 5
}

// Spreading
const another = [...arr]; // "another" is [ 1, 2, undefined, undefined, 5 ]



// But in others (most notably array iteration methods), empty slots are skipped.

const arraySkip = [1, 2, , , 5];
const mapped = arraySkip.map((i) => i + 1);
console.log(mapped);// [ 2, 3, <2 empty items>, 6 ]

arraySkip.forEach((i) => console.log(i)); // 1 2 5

const filtered = arraySkip.filter(() => true);
console.log(filtered); // [ 1, 2, 5 ]

const hasFalsy = arraySkip.some((k) => !k);
console.log(hasFalsy); // false

// Property enumeration
const keys = Object.keys(arraySkip);
console.log(keys); // [ '0', '1', '4' ]

for (const key in arraySkip) {
    console.log(key); // 0 1 4
}

// Spreading into an object uses property enumeration, not the array's iterator
const objectSpread = { ...arraySkip };
console.log(objectSpread); // { '0': 1, '1': 2, '4': 5 }



// ----- Example Test of a Sparse Array

let empty4 = new Array(7);
console.log(empty4); // [ <7 empty items> ]
console.log(empty4.length); // 7

// Iterating over the array with for... in
for (let x in empty4) {
    console.log(`This is an element: ${empty4[x]}`); // nothing is logged
}

empty4.push('banana', 'apple'); // putting new elements at the end of the array
console.log(empty4); // [ <7 empty items>, 'banana', 'apple' ]

// Iterating over the array with for... in
for (let x in empty4) {
    // console.log(`This is an element: ${empty4[x]}`);
}
/* 
This is an element: banana
This is an element: apple
*/

empty4.shift(empty4[0]); // removing the element (an empty item) at the start of the array
console.log(empty4); // [ <6 empty items>, 'banana', 'apple' ]

empty4[3] = 'cat'; // assigning 'cat' to the 4th index
console.log(empty4); // [ <3 empty items>, 'cat', <2 empty items>, 'banana', 'apple' ]

// Iterating over the array to log the elements inside
for (let x in empty4) {
    console.log(`This is an element: ${empty4[x]}`);
}
/* 
This is an element: cat
This is an element: banana
This is an element: apple 
*/

// Iterating over the array with for... in
for (const x of empty4) {
    console.log(`This is an element: ${x}`); 
}
/* 
This is an element: undefined
This is an element: undefined
This is an element: undefined
This is an element: cat
This is an element: undefined
This is an element: undefined
This is an element: banana
This is an element: apple
*/



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



// When working with numbers, you might sometimes see the result/error NaN. It means 'Not a Number'.

// For more information on numeric literals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_literals



// ----------------------------- > OBJECT LITERALS -----------------------------

// An object literal is a list of zero or more pairs of property names and associated values of an object, enclosed in curly braces ({}).

// Warning: Do not use an object literal at the beginning of a statement!
// This will lead to an error (or not behave as you expect), because the { will be interpreted as the beginning of a block.



// The following is an example of an object literal. 

let car = {
    type: "Sedan",
    brand: "Honda",
    wheels: 4,
    colour: 'Red',
};

console.log(car.type); // Sedan
console.log(car.brand); // Honda
console.log(car.wheels); // 4
console.log(car.colour); // Red



// Additionally, you can use a numeric or string literal for the name of a property or nest an object inside another. 

// The following example uses these options.

car = {
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



// ----------------------------- > REGEXP LITERALS -----------------------------

// Regex literal is short for regular expression literal

// A regular expression is a pattern of characters, enclosed between slashes. 
// The pattern is used for searching and/or replacing characters in strings.

// In JavaScript, regular expressions are also objects.

// More information on how to create a regular expression: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions



// ----- Examples of how to create a regular expression.

// Using a regular expression literal, which consists of a pattern enclosed between slashes
const reLit = /ab+c/;

// Regular expression literals provide compilation of the regular expression when the script is loaded. If the regular expression remains constant, using this can improve performance. 



// You can also create a regular expression by calling the constructor function of the RegExp object
const reCon = new RegExp("ab+c");

// Using the constructor function provides runtime compilation of the regular expression. 
// Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input. 



// These regex literal can be used with methods, for example: 
//      test() and exec() methods for the RegExp object, the RegExp object being used for used for matching text with a pattern
//      match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String



// ----- Example use for regex literal

function secretPassword(passphrase) {

    const testWord = /owl/; // text to test for

    // if passphrase contains the text 'owl'
    // "Welcome to the secret society" is assigned to 'result' if true
    // "Your secret society is 3 doors down" if assigned to 'result' if false
    const result = testWord.test(passphrase) ? "Welcome to the secret society" : "Your secret society is 3 doors down";
    // You will learn more about this method of writing an if/else statement in 5_expressions_operators \ expressions_operators.js > CONDITIONAL (TERNARY) OPERATOR

    console.log(result);
}

secretPassword('The owl hoots sadly at night'); // Welcome to the secret society
secretPassword('The whale sings into the ocean'); // Your secret society is 3 doors down



// ----- Simple example that tests if "hello" is contained at the very beginning of a string, returning a boolean result.

const str = "hello world!";
const result = /^hello/.test(str);

console.log(result); // true



// ----------------------------- > STRING LITERALS -----------------------------

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
// NOTE: See object\object_wrapper.js

// You can also use the length property with a string literal:

// Will print the number of symbols in the string including whitespace.
console.log("Joyo's cat".length); // 10



// ----------------------------- > STRING LITERALS >> Escaping Characters In A String

// Escaping characters means that we do something to them to make sure they are recognized as text, not part of the code.
// In JavaScript, we do this by putting a backslash just before the character.

const bigmouth = 'I\'ve got no right to take my place…';
console.log(bigmouth); // I've got no right to take my place…



// ----------------------------- > STRING LITERALS >> Template Literals

// Template literals are also available, a newer syntax that provides more flexible, easier to read strings
// Template literals are enclosed by the back-tick (`) (grave accent) character instead of double or single quotes.

// Template literals provide syntactic sugar for constructing strings. (This is similar to string interpolation features in Perl, Python, and more.)



// To turn a standard string literal into a template literal, you have to replace the quote marks (' ', or " ") with backtick characters (` `).

`I'm a template literal`;

// to include a variable or expression inside the string, you include it inside a ${ } construct, which is called a placeholder.

let whatAmI = 'template literal';
`I'm a ${whatAmI}`;



// ----- Example

let song = 'Country Roads'
let score = 9;
let highestScore = 10;

// Old way of outputting a string with a combination of strings and variables
let oldOutput = 'I like the song "' + song + '". I gave it a score of ' + (score / highestScore * 100) + '%.';
console.log(oldOutput); // I like the song "Country Roads". I gave it a score of 90%.

// Template Literal:
let newOutput = `I like the song "${song}". I gave it a score of ${score / highestScore * 100}%.`;
console.log(newOutput); // I like the song "Country Roads". I gave it a score of 90%.



// ----------------------------- > STRING LITERALS >> Split A Traditional String Over Multiple Lines

// \n – a newline character, used to split a string onto new lines in a traditional string literal

output = 'Roses are Red, \nViolets are Blue, \nThis is a String Literal Example, \nPoetry poetry poetry';
console.log(output);



// Template literals respect the line breaks in the source code, so newline characters are no longer needed. This would achieve the same result:

output = `Roses are Red, 
Violets are Blue, 
This is a Template Literal Example, 
Poetry poetry poetry`;

console.log(output);



// ----------------------------- > STRING LITERALS >> Template Literals >>> Tagged Templates

// NOTE: You might want to come back to this later after studying until 7_array_methods at least. 

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

// printTag`On ${today}, ${person1} needs to do: ${todos1}`;
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

// Since tagged template literals are just sugar of function calls, you can re-write the above as an equivalent function call:

printTag(["On ", ", ", " needs to do: "], today, person1, todos1);
/* 
On 07/04/2024, Francine needs to do: 
        - Learn JavaScript
        - Workout
        - Get my vaccination
        - Print materials for Heart RPG
*/

// This may be reminiscent of the console.log-style interpolation:

console.log("When it is %s %s needs to do: %o", today, person1, todos1); // See explanation of %s and %o in string\format_specifier.js
/*
When it is 2024-04-07T09:13:58.057Z 'Francine' needs to do: [
  'Learn JavaScript',
  'Workout',
  'Get my vaccination',
  'Print materials for Heart RPG',
  [length]: 4
]
*/


// You can see how the tagged template reads more naturally than a traditional "formatter" function, where the variables and the template itself have to be declared separately.



