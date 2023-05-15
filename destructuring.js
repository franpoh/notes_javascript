/* 
Table of Contents

*/



// ----------------------------- > BASICS -----------------------------

// The destructuring assignment syntax is a JavaScript expression 
// that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
// Destructuring makes it easy to extract only what is needed



// Array Destructuring

let a, b, rest;

[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]



// Object Destructuring

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}



// The object and array literal expressions provide an easy way to create ad hoc packages of data.

const x = [1, 2, 3, 4, 5];

// The destructuring assignment uses similar syntax, 
// but on the left-hand side of the assignment to define what values to unpack from the sourced variable.

const [y, z] = x;
console.log(y); // 1
console.log(z); // 2

// Similarly, you can destructure arrays on the left-hand side of the assignment

const objj = { d: 1, e: 2 };
const { d, e } = objj;

console.log(d); // 1
console.log(e); // 2



// NOTE: Destructuring patterns with other syntaxes
// In many syntaxes where the language binds a variable for you, you can use a destructuring pattern as well. These include:

// The looping variable of for...in and for...of loops;
// Function parameters;
// The catch binding variable.



// ----------------------------- > BINDING AND ASSIGNMENT -----------------------------

// For both object and array destructuring, there are two kinds of destructuring patterns: 
// binding pattern and assignment pattern, with slightly different syntaxes.



// ----------------------------- > BINDING AND ASSIGNMENT >> Binding

// In binding patterns, the pattern starts with a declaration keyword (var, let, or const). 
// Then, each individual property must either be bound to a variable or further destructured.

const objA = { apple: 1, banana: { cherry: 2 } };

// Two variables are bound: apple and date
// banana and cherry remains undefined
const {
    apple,
    banana: { cherry: date },
} = objA;

console.log(apple); // 1
console.log(date); // 2



// All variables share the same declaration, 
// so if you want some variables to be re-assignable but others to be read-only, 
// you may have to destructure twice — once with let, once with const.

const objB = { avocado: 1, brinjal: { carrot: 2 } };

const { avocado } = objB; // a is constant

let {
    brinjal: { carrot: daikon },
} = objB; 

console.log(avocado); // 1

// daikon is re-assignable
console.log(daikon); // 2
daikon = 5;
console.log(daikon); // 5



// ----------------------------- > BINDING AND ASSIGNMENT >> Assignment

// In assignment patterns, the pattern does not start with a keyword. 

// Each destructured property is assigned to a target of assignment — 
// which may either be declared beforehand with var or let, or is a property of another object — 
// in general, anything that can appear on the left-hand side of an assignment expression.

const no = [];

const objNo = { a: 1, b: 2 };

({ a: no[0], b: no[1] } = objNo);

// The properties `a` and `b` are assigned to properties of `numbers`
console.log(no[0]); // 1
console.log(no[1]); // 2



// NOTE: The parentheses ( ... ) around the assignment statement are required when using object literal destructuring assignment without a declaration.

// { a, b } = { a: 1, b: 2 } is not valid stand-alone syntax, as the {a, b} on the left-hand side is considered a block and not an object literal. 
// However, ({ a, b } = { a: 1, b: 2 }) is valid, as is const { a, b } = { a: 1, b: 2 }.

// If your coding style does not include trailing semicolons, 
// the ( ... ) expression needs to be preceded by a semicolon, or it may be used to execute a function on the previous line.



// Note that the equivalent binding pattern of the code above is not valid syntax:

/* 
const numbers = [];
const obj = { a: 1, b: 2 };
const { a: numbers[0], b: numbers[1] } = obj;
*/

// This is equivalent to:
// const numbers[0] = obj.a;
// const numbers[1] = obj.b;
// Which definitely is not valid.



// ----------------------------- > DEFAULT VALUE -----------------------------

// Each destructured property can have a default value. 
// The default value is used when the property is not present, or has value undefined. 
// It is not used if the property has value null.

const [anise = 1] = []; 
console.log(anise); // 1

const { basil = 2 } = { basil: undefined };
console.log(basil); // 2

const { caper = 2 } = { caper: null }; 
console.log(caper); // null



// The default value can be any expression. It will only be evaluated when necessary.

const { bay = console.log("hey") } = { bay: 2 };
console.log(bay); // 2 - Does not log "hey", because `b` is defined and there's no need to evaluate the default value.



// ----------------------------- > REST PROPERTY -----------------------------

// You can end a destructuring pattern with a rest property ...rest. 
// This pattern will store all remaining properties of the object or array into a new object or array.

const { allspice, ...others } = { allspice: 1, borage: 2, cumin: 3 };
console.log(others); // { borage: 2, cumin: 3 }

const [first, ...others2] = [1, 2, 3];
console.log(others2); // [ 2, 3 ]



// The rest property must be the last in the pattern, and must not have a trailing comma.
// Always consider using rest operator as the last element

/* 
const [a, ...b,] = [1, 2, 3]; // SyntaxError: rest element may not have a trailing comma
*/



// ----------------------------- > EXAMPLES -----------------------------

// Array destructuring

const foo = ['one', 'two', 'three'];

const [red, yellow, green] = foo;
console.log(red); // one
console.log(yellow); // two
console.log(green); // three

// In an array destructuring from an array of length N specified on the right-hand side of the assignment
// if the number of variables specified on the left-hand side of the assignment is greater than N
// only the first N variables are assigned values. 
// The values of the remaining variables will be undefined.

const food = ['one', 'two'];

const [danish, salad, omelette, sausage] = food;
console.log(danish); // one
console.log(salad); // two
console.log(omelette); // undefined
console.log(sausage);  //undefined



// Default values

// A variable can be assigned a default, in the case that the value unpacked from the array is undefined.

let teriyaki, oden;

[teriyaki = 5, oden = 7] = [1];
console.log(teriyaki); // 1
console.log(oden); // 7




// Swapping variables

// Two variables values can be swapped in one destructuring expression.
// Without destructuring assignment, swapping two values requires a temporary variable

let croissant = 1;
let brioche = 3;

[croissant, brioche] = [brioche, croissant];

console.log(croissant); // 3
console.log(brioche); // 1



const arr = [1, 2, 3];
[arr[2], arr[1]] = [arr[1], arr[2]];

console.log(arr); // [1,3,2]



// Parsing an array returned from a function

// Destructuring can make working with an array return value more concise.

// f() returns the values [1, 2] as its output, which can be parsed in a single line with destructuring.
function f() {
    return [1, 2];
}

let a, b;
[a, b] = f();
console.log(a); // 1
console.log(b); // 2



// Ignoring some returned values

// You can ignore return values that you're not interested in
function f() {
    return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); // 1
console.log(b); // 3

const [c] = f();
console.log(c); // 1

// You can also ignore all returned values:
[, ,] = f();



// Assigning the rest of an array to a variable

// When destructuring an array, you can unpack and assign the remaining part of it to a variable using the rest pattern:

const [a, ...b] = [1, 2, 3];
console.log(a); // 1
console.log(b); // [2, 3]



// Be aware that a SyntaxError will be thrown if a trailing comma is used on the right-hand side of a rest element:

const [a, ...b,] = [1, 2, 3];
// SyntaxError: rest element may not have a trailing comma
// Always consider using rest operator as the last element

// Object destructuring

// Basic assignment
const user = {
    id: 42,
    isVerified: true
};

const { id, isVerified } = user;

console.log(id); // 42
console.log(isVerified); // true



// Assignment without declaration

// A variable can be assigned its value with destructuring separate from its declaration.

let a, b;
({ a, b } = { a: 1, b: 2 });

// Note: The parentheses ( ... ) around the assignment statement are required when using object literal destructuring assignment without a declaration.

// {a, b} = {a: 1, b: 2} is not valid stand-alone syntax, as the {a, b} on the left-hand side is considered a block and not an object literal.
// However, ({a, b} = {a: 1, b: 2}) is valid, as is const {a, b} = {a: 1, b: 2}
// Your ( ... ) expression needs to be preceded by a semicolon or it may be used to execute a function on the previous line.

// Assigning to new variable names

// A property can be unpacked from an object and assigned to a variable with a different name than the object property.

const o = { p: 42, q: true };
const { p: foo, q: bar } = o;
// const {p: foo} = o takes from the object o the property named p and assigns it to a local variable named foo.

console.log(foo); // 42
console.log(bar); // true

// Assigning to new variables names and providing default values

// A property can be both
// Unpacked from an object and assigned to a variable with a different name.
// Assigned a default value in case the unpacked value is undefined.

const { a: aa = 10, b: bb = 5 } = { a: 3 };

console.log(aa); // 3
console.log(bb); // 5

// Unpacking fields from objects passed as a function parameter

const user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
        firstName: 'John',
        lastName: 'Doe'
    }
};

function userId({ id }) {
    return id;
}

function whois({ displayName, fullName: { firstName: name } }) {
    return `${displayName} is ${name}`;
}

console.log(userId(user)); // 42
console.log(whois(user));  // "jdoe is John"

// Setting a function parameter's default value

function drawChart({ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = {}) {
    console.log(size, coords, radius);
    // do some chart drawing
}

drawChart({
    coords: { x: 18, y: 30 },
    radius: 30
});

// In the function signature for drawChart above
// the destructured left-hand side is assigned to 
// an empty object literal on the right-hand side: 
{ size = 'big', coords = { x: 0, y: 0 }, radius = 25 } = { }.

// You could have also written the function without the right-hand side assignment. 
// However, if you leave out the right-hand side assignment, 
// the function will look for at least one argument to be supplied when invoked, 
// whereas in its current form, 
// you can call drawChart() without supplying any parameters. 

// The current design is useful if you want to be able to call the function without supplying any parameters

// the other can be useful when you want to ensure an object is passed to the function.

// Nested object and array destructuring

const metadata = {
    title: 'Scratchpad',
    translations: [
        {
            locale: 'de',
            localization_tags: [],
            last_edit: '2014-04-14T08:43:37',
            url: '/de/docs/Tools/Scratchpad',
            title: 'JavaScript-Umgebung'
        }
    ],
    url: '/en-US/docs/Tools/Scratchpad'
};

let {
    title: englishTitle, // rename
    translations: [
        {
            title: localeTitle, // rename
        },
    ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"

// For of iteration and destructuring

const people = [
    {
        name: 'Mike Smith',
        family: {
            mother: 'Jane Smith',
            father: 'Harry Smith',
            sister: 'Samantha Smith'
        },
        age: 35
    },
    {
        name: 'Tom Jones',
        family: {
            mother: 'Norah Jones',
            father: 'Richard Jones',
            brother: 'Howard Jones'
        },
        age: 25
    }
];

for (const { name: n, family: { father: f } } of people) {
    console.log('Name: ' + n + ', Father: ' + f);
}

// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"

// Computed object property names and destructuring

// Computed property names, like on object literals, can be used with destructuring.

let key = 'z';
let { [key]: foo } = { z: 'bar' };

console.log(foo); // "bar"


// Invalid JavaScript identifier as a property name

// Destructuring can be used with property names that are not valid JavaScript identifiers by providing an alternative identifier that is valid.

const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;

console.log(fizzBuzz); // "true"

// Combined Array and Object Destructuring

// Array and Object destructuring can be combined. Say you want the third element in the array props below, and then you want the name property in the object, you can do the following:

const props = [
    { id: 1, name: 'Fizz' },
    { id: 2, name: 'Buzz' },
    { id: 3, name: 'FizzBuzz' }
];

const [, , { name }] = props;

console.log(name); // "FizzBuzz"

// The prototype chain is looked up when the object is deconstructed 

// When deconstructing an object, if a property is not accessed in itself, it will continue to look up along the prototype chain.

let obj = { self: '123' };
obj.__proto__.prot = '456';
const { self, prot } = obj;
// self "123"
// prot "456" (Access to the prototype chain)