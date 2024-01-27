/* 
Table of Contents

> BASICS
>> Array Destructuring
>> Object Destructuring
> BINDING AND ASSIGNMENT
>> Binding
>> Assignment
> DEFAULT VALUE
> REST PROPERTY

> EXAMPLES
>> Swapping Variables in One Expression
>> Parsing An Array Returned From A Function
>> Ignoring Some Returned Values
>> Using A Binding Pattern As The Rest Property
>> Unpacking Values From A Regular Expression Match
>> Using Array Destructuring On Any Iterable
>> Assigning To New Variable Names
>> Assigning To New Variables Names And Providing Default Values
>> Unpacking Fields From Objects Passed As A Function Parameter
>> Setting A Function Parameter's Default Value
>> Nested Object And Array Destructuring
>> For Of Iteration And Destructuring
>> Computed Object Property Names And Destructuring
>> Invalid Javascript Identifier As A Property Name
>> Destructuring Primitive Values
>> Combined Array and Object Destructuring
>> The Prototype Chain Is Looked Up When The Object Is Deconstructed 

> ACCESSING OBJECT PROPERTY WITH DESTRUCTURING
*/



// ----------------------------- > BASICS -----------------------------

// The destructuring assignment syntax is a JavaScript expression 
// that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
// Destructuring makes it easy to extract only what is needed



// ----------------------------- > BASICS >> Array Destructuring

let a, b, rest;

[a, b] = [10, 20];

console.log(a); // 10
console.log(b); // 20



[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]



const colours = ['one', 'two', 'three'];

const [red, yellow, green] = colours;
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



// ----------------------------- > BASICS >> Object Destructuring

({ a, b } = { a: 10, b: 20 });

console.log(a); // 10
console.log(b); // 20



({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });

console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
console.log(c); // c is not defined



const person = {
    id: 42,
    isVerified: true,
};

const { id, isVerified } = person;

console.log(id); // 42
console.log(isVerified); // true



// -----------------------------

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

// Experiment

const objjj = { d: 1, e: 2 };
const { m, n } = objjj;

console.log(m); // undefined    
console.log(n); // undefined



// NOTE: Destructuring patterns with other syntaxes
// In many syntaxes where the language binds a variable for you, you can use a destructuring pattern as well. These include:

// The looping variable of for...in and for...of loops;
// Function parameters;
// The catch binding variable.



// ----------------------------- > BINDING AND ASSIGNMENT -----------------------------

// For both object and array destructuring, there are two kinds of destructuring patterns: 
// binding pattern and assignment pattern, with slightly different syntaxes.



// ----------------------------- > BINDING AND ASSIGNMENT >> Binding

// NOTE:
// In programming, a binding is an association of an identifier with a value. 
// Not all bindings are variables — for example, function parameters and the binding created by the catch (e) block are not "variables" in the strict sense. 
// In addition, some bindings are implicitly created by the language — for example, this and new.target in JavaScript.



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
console.log(banana); // Error: not defined
console.log(cherry); // Error : not defined



// All variables share the same declaration, 
// so if you want some variables to be re-assignable but others to be read-only, 
// you may have to destructure twice — once with let, once with const.

const objB = { avocado: 1, brinjal: { carrot: 2 } };

const { avocado } = objB; // avocado is constant

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

// The properties `a` and `b` of objNo are assigned to properties of `no`
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

let teriyaki, oden;

[teriyaki = 5, oden = 7] = [1];

console.log(teriyaki); // 1
console.log(oden); // 7



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
console.log(bay); // 2 - Does not log "hey", because `bay` is defined and there's no need to evaluate the default value.



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

// ----------------------------- > EXAMPLES >> Swapping Variables in One Expression

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



// ----------------------------- > EXAMPLES >> Parsing An Array Returned From A Function

// It's always been possible to return an array from a function. 
// Destructuring can make working with an array return value more concise.

// f() returns the values [1, 2] as its output, which can be parsed in a single line with destructuring.
function f() {
    return [1, 2];
}

let s, q;

[s, q] = f();

console.log(s); // 1
console.log(q); // 2



// ----------------------------- > EXAMPLES >> Ignoring Some Returned Values

// You can ignore return values that you're not interested in
function f() {
    return [1, 2, 3];
}

const [p, , h] = f();

console.log(p); // 1
console.log(h); // 3

const [c] = f();

console.log(c); // 1

// You can also ignore all returned values:
[, ,] = f();



// ----------------------------- > EXAMPLES >> Using A Binding Pattern As The Rest Property

// The rest property of array destructuring assignment can be another array or object binding pattern. 
// The inner destructuring destructures from the array created after collecting the rest elements, 
// so you cannot access any properties present on the original iterable in this way.

const [een, twee, ...{ length }] = [1, 2, 3, 4, 5]; // See > ACCESSING OBJECT PROPERTY WITH DESTRUCTURING for { length } explanation

console.log(een, twee); // 1 2
console.log(length); // 3



const [crabapple, ...pear] = [1, 2, 3];

console.log(crabapple); // 1
console.log(pear); // [2, 3]



const [plum, mango, ...[cherry, starfruit]] = [1, 2, 3, 4];
console.log(plum, mango, cherry, starfruit); // 1 2 3 4



// These binding patterns can even be nested, as long as each rest property is the last in the list.

const [angelica, bellflower, ...[cornflower, dandelion, ...[elder, frangipani]]] = [1, 2, 3, 4, 5, 6];
console.log(angelica, bellflower, cornflower, dandelion, elder, frangipani); // 1 2 3 4 5 6



// On the other hand, object destructuring can only have an identifier as the rest property.

/* 
const { a, ...{ b } } = { a: 1, b: 2 }; 
*/
// SyntaxError: `...` must be followed by an identifier in declaration contexts

/* 
let a, b;
({ a, ...{ b } } = { a: 1, b: 2 }); 
*/
// SyntaxError: `...` must be followed by an assignable reference in assignment contexts



// ----------------------------- > EXAMPLES >> Unpacking Values From A Regular Expression Match

// When the regular expression *exec() method finds a match, 
// it returns an array containing first the entire matched portion of the string 
// and then the portions of the string that matched each parenthesized group in the regular expression. 

// Destructuring assignment allows you to unpack the parts out of this array easily, ignoring the full match if it is not needed.

// * exec(): executes a search for a match in a specified string and returns a result array, or null.

function parseProtocol(url) {
    const parsedURL = /^(\w+):\/\/([^/]+)\/(.*)$/.exec(url);
    if (!parsedURL) {
        return false;
    }
    console.log(parsedURL);
    /* 
    [
        'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        'https',
        'developer.mozilla.org',
        'en-US/docs/Web/JavaScript',
        index: 0,
        input: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        groups: undefined
    ] 
    */

    const [, protocol, fullhost, fullpath] = parsedURL;
    return protocol;
}

console.log(parseProtocol("https://developer.mozilla.org/en-US/docs/Web/JavaScript")); // "https"



// ----------------------------- > EXAMPLES >> Using Array Destructuring On Any Iterable

// Array destructuring calls the iterable protocol of the right-hand side. 
// Therefore, any iterable, not necessarily arrays, can be destructured.

const [andy, ben] = new Map([[1, 2], [3, 4],]);
console.log(andy, ben); // [1, 2] [3, 4]



// Non-iterables cannot be destructured as arrays.

const objt = { 0: "a", 1: "b", length: 2 };
const [avery, benoit] = objt; // TypeError: obj is not iterable



// Iterables are only iterated until all bindings are assigned.

const num = {
    *[Symbol.iterator]() {
        for (const v of [0, 1, 2, 3]) {
            console.log(v);
            yield v;
        }
    },
};

const [t, u] = num; // 0 1



// The rest binding is eagerly evaluated and creates a new array, instead of using the old iterable.

const obje = {
    *[Symbol.iterator]() {
        for (const v of [0, 1, 2, 3]) {
            console.log(v);
            yield v;
        }
    },
};

const [i, j, ...theRest] = obje; // 0 1 2 3
console.log(theRest); // [2, 3] 



// ----------------------------- > EXAMPLES >> Assigning To New Variable Names

// A property can be unpacked from an object and assigned to a variable with a different name than the object property.

const dip = { p: 'olive', q: 'pistolet' };

// 'const {p: oil} = dip' takes from the object 'dip' the property named 'p' and assigns it to a local variable named 'oil'.
const { p: oil, q: bread } = dip;

console.log(oil); // olive
console.log(p); // error: p is not defined



const { v: three, u: four } = { v: 3, u: 4 };

console.log(three); // 3
console.log(v); // error: v is not defined






// ----------------------------- > EXAMPLES >> Assigning To New Variables Names And Providing Default Values

// A property can be both:
// Unpacked from an object and assigned to a variable with a different name.
// Assigned a default value in case the unpacked value is undefined.

const { earth: human = 'beige', mars: martians = 'green' } = { earth: 'multi-coloured' };

console.log(human); // multi-coloured
console.log(martians); // green



// ----------------------------- > EXAMPLES >> Unpacking Fields From Objects Passed As A Function Parameter

// Objects passed into function parameters can also be unpacked into variables, 
// which may then be accessed within the function body. 

// As for object assignment, 
// the destructuring syntax allows for the new variable to have the same name or a different name than the original property, 
// and to assign default values for the case when the original object does not define the property. 

const user = {
    id: 42,
    displayName: 'jdoe',
    fullName: {
        firstName: 'John',
        lastName: 'Doe'
    }
};



// The parameter value { id } indicates that the id property of the object passed to the function should be unpacked into a variable with the same name, 
// which can then be used within the function. 

function userId({ id }) {
    return id;
}

console.log(userId(user)); // 42



// Here we unpack the property named displayName, and rename it to dname for use within the function body

function userDisplayName({ displayName: dname }) {
    return `The user's name is ${dname}`;
}

console.log(userDisplayName(user)); // The user's name is jdoe



// Nested objects can also be unpacked. 
// The example below shows the property fullname.firstName being unpacked into a variable called name.

function whois({ displayName, fullName: { firstName: name } }) {
    return `${displayName} is ${name}`;
}

console.log(whois(user)); // jdoe is John



// ----------------------------- > EXAMPLES >> Setting A Function Parameter's Default Value

// Default values can be specified using =, 
// and will be used as variable values if a specified property does not exist in the passed object.

// Below we show a function where the default size is 'big', default co-ordinates are x: 0, y: 0 and default radius is 25.

function drawChart({ size = "big", coords = { x: 0, y: 0 }, radius = 25, } = {}) {
    console.log(size, coords, radius);
}

drawChart({ coords: { x: 18, y: 30 }, radius: 30, }); // big { x: 18, y: 30 } 30

drawChart(); // big { x: 0, y: 0 } 25

// In the function signature for drawChart above, 
// the destructured left-hand side has a default value of an empty object = {}.

// You could have also written the function without that default. 
// However, if you leave out that default value, the function will look for at least one argument to be supplied when invoked, 
// whereas in its current form, you can call drawChart() without supplying any parameters. 
// Otherwise, you need to at least supply an empty object literal.

function drawChart({ size = "big", coords = { x: 0, y: 0 }, radius = 25, }) { // left out default value of an empty object = {}
    console.log(size, coords, radius);
}

drawChart({ coords: { x: 18, y: 30 }, radius: 30, }); // big { x: 18, y: 30 } 30

drawChart(); // TypeError: Cannot read properties of undefined (reading 'size')



// ----------------------------- > EXAMPLES >> Nested Object And Array Destructuring

const metadata = {
    title: "Scratchpad",
    translations: [
        {
            locale: "de",
            localizationTags: [],
            lastEdit: "2014-04-14T08:43:37",
            url: "/de/docs/Tools/Scratchpad",
            title: "JavaScript-Umgebung",
        },
    ],
    url: "/en-US/docs/Tools/Scratchpad",
};

const {
    title: englishTitle, // rename
    translations: [
        {
            title: localeTitle, // rename
        },
    ],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"  



// ----------------------------- > EXAMPLES >> For Of Iteration And Destructuring

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



// ----------------------------- > EXAMPLES >> Computed Object Property Names And Destructuring

// *Computed property names, like on object literals, can be used with destructuring.

// * Computed property names: see object/object.js > SQUARE BRACKET NOTATION >> Computed Property Names

const key1 = "z";
const { [key1]: too } = { z: "far" };

console.log(too); // far



const key2 = ['x, y, z'];
const { [key2]: who } = { 'x, y, z': 'where' };

console.log(who); // where



// ----------------------------- > EXAMPLES >> Invalid Javascript Identifier As A Property Name

// Destructuring can be used with property names that are not valid JavaScript identifiers 
// by providing an alternative identifier that is valid.

const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;

console.log(fizzBuzz); // "true"



// ----------------------------- > EXAMPLES >> Destructuring Primitive Values

// Object destructuring is almost equivalent to property accessing. 

// This means if you try to destruct a primitive value, 
// the value will get wrapped into the corresponding wrapper object and the property is accessed on the wrapper object.

const { k, toFixed } = 1;
console.log(k, 'and', toFixed); // undefined and [Function: toFixed]

// Same as accessing properties, destructuring null or undefined throws a TypeError.



// ----------------------------- > EXAMPLES >> Combined Array and Object Destructuring

// Array and Object destructuring can be combined.

// Say you want the third element in the array props below, 
// and then you want the name property in the object

const props = [
    { id: 1, name: 'Fizz' },
    { id: 2, name: 'Buzz' },
    { id: 3, name: 'FizzBuzz' }
];

const [, , { name }] = props;

console.log(name); // FizzBuzz



// ----------------------------- > EXAMPLES >> The Prototype Chain Is Looked Up When The Object Is Deconstructed 

// When deconstructing an object, if a property is not accessed in itself, it will continue to look up along the prototype chain.

const obj = {
    self: "123",
    __proto__: {
        prot: "456",
    },
};

console.log(obj); // { self: '123' }

/* 
Object { self: "123" }
self: "123"
<prototype>: Object { prot: "456" }
*/

const { self, prot } = obj;

console.log(self); // "123"
console.log(prot); // "456"



// ----------------------------- > ACCESSING OBJECT PROPERTY WITH DESTRUCTURING -----------------------------

({ length } = ['oops', 'gasp', 'shout', 'sun']); // length: Gets or sets the length of the array.
console.log(length); // 4



// Starting with the basic object destructuring:

({ one, two } = { one: 'oops', two: 'gasp' });
console.log(one); // oops



// Taking a look under the hood of an array

// Typing ['oops', 'gasp', 'shout', 'sun'] into the browser console will give you:

// Array(4) [ "oops", "gasp", "shout", "sun" ]
// 0: "oops"
// 1: "gasp"
// 2: "shout"
// 3: "sun"
// length: 4
// <prototype>: Array []

// Therefore, you can see { length } as
// ({ length } = {0: 'oops', 1: 'gasp', 2: 'shout', 3: 'sun', length: 4});
