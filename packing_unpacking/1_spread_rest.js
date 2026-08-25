/* 
Table of Contents

> SPREAD ...
>> In Function Calls
>> In Array Literals
>> Spread In Object Literals
> REST ... as a Function Parameter 
*/



// Spread syntax and Rest syntax looks exactly the same: ...iterableObject

// Spread syntax unpacks an iterable collection into its individual elements
// Rest syntax packs multiple individual elements into a single iterable collection.

// The spread and rest operator (...) is not an expression that returns a standalone value on its own. 
// It is a syntactic operation that packs, or unpacks data into a surrounding container.

// Here is a simple example demonstrating how the spread and rest syntax can be used:

const spreadOfValues = [1, 2, 3, 4, 5];

function exampleOfBoth (a, b, ...restOfValues) { // usage of Rest syntax here with ...restOfValues. This collects any leftover elements that were not assigned to the parameter a or b and assign them to the parameter restOfValues
    console.log(`The first number is ${a}, the second number is ${b}, and the rest of the numbers is ${restOfValues}`);
}

// usage of Spread syntax here with ...spreadOfValues. This unpacks all elements from the array spreadOfValues and pass them into the function exampleOfBoth as individual elements.
exampleOfBoth(...spreadOfValues); // The first number is 1, the second number is 2, and the rest of the numbers is 3,4,5



// As you will see in the previous and following examples, the spread and rest syntax will always be enclosed by brackets creating a collection

// function (...example)
// [...array]
// {...object}

// This creates a brand-new collection in memory that can be used for packing or unpacking individual elements
// The collection can then be assigned to a variable or function parameter

// function (): See 4_functions\1_function.js > ARGUMENTS OBJECT



// ----------------------------- > SPREAD ... -----------------------------

// allows an iterable be expanded in places where:
// zero or more arguments (for function calls) are expected
// zero or more elements (for array literals) are expected
// zero or more key-value pairs (for object literals) are expected.

// Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.



// +++++ Syntax

// For function calls, pass all elements of iterableObject as arguments to function 
myFunction(...iterableObject);

// For array literals or strings, combine two arrays by inserting all elements from iterableObject
[...iterableObject, '4', 'five', 6];

// For object literals, pass all key:value pairs from an object 
let objectClone = { ...iterableObject }; 



// ----------------------------- > SPREAD ... >> In Function Calls

function sum(x, y, z) { // function takes x, y, and z as arguments
    return x + y + z; // returns the sum of these values
}

const numbers = [1, 2, 3];

// Consider the difference between using the spread syntax and not using the spread syntax 

console.log(...numbers); // 1 2 3 - the values have been extracted out of the array as individual values
console.log(numbers); // [ 1, 2, 3 ]

// When we call the function, we pass it all the values in the array using the spread syntax and the array name - '...numbers'

console.log(sum(...numbers)); // 6 
console.log(sum(numbers)); // 1,2,3undefinedundefined

// If the array contained more than three numbers, e.g. [1, 2, 3, 4], then it would still work fine, 
// except that all four would be passed, but only the first three would be used unless you added more arguments to the function

const moreNumbers = [1, 2, 3, 4];

console.log(...moreNumbers); // 1 2 3 4
console.log(sum(...moreNumbers)); // 6



// +++++ Replace apply()

let args = [0, 1, 2];

function myFunction(x, y, z) { return x + y + z; }

// It is common to use Function.prototype.apply() in cases where you want to use the elements of an array as arguments to a function.

console.log(myFunction.apply(null, args)); // 3

// With spread syntax the above can be written as:

console.log(myFunction(...args)); // 3

// Any argument in the argument list can use spread syntax, and the spread syntax can be used multiple times.

let args2 = [0, 1];

function thatFunction(t, u, v, w, x, y, z) { return t + u + v + w + x + y + z; }

console.log(thatFunction(-1, ...args, 2, ...args2)); // 5



// ----------------------------- > SPREAD ... >> In Array Literals

// Using Spread syntax is a more easier and straightforward way of combining arrays



// +++++ Example of replacing Array.prototype.concat() with spread

// Array.prototype.concat() is often used to concatenate an array to the end of an existing array.

let arrayA = [0, 1, 2];
let arrayB = [3, 4, 5];

arrayA = arrayA.concat(arrayB);
console.log("arrayA: ", arrayA); // arrayA:  [ 0, 1, 2, 3, 4, 5 ]

// With Spread syntax this becomes:

let arrayC = [0, 1, 2];
let arrayD = [3, 4, 5];

arrayC = [...arrayC, ...arrayD]
console.log("arrayC: ", arrayC); // arrayC:  [ 0, 1, 2, 3, 4, 5 ]



// +++++ Example of replacing Array.prototype.unshift() with spread

// Array.prototype.unshift() is often used to insert an array of values at the start of an existing array. 

let arrayE = [0, 1, 2];
let arrayF = [3, 4, 5];

Array.prototype.unshift.apply(arrayE, arrayF) //  arrayE is now [3, 4, 5, 0, 1, 2]
console.log("arrayE: ", arrayE); // arrayE:  [ 3, 4, 5, 0, 1, 2 ]

// With spread syntax, this becomes:

let arrayG = [0, 1, 2];
let arrayH = [3, 4, 5];

arrayG = [...arrayH, ...arrayG];
console.log("arrayG: ", arrayG); // arrayG:  [ 3, 4, 5, 0, 1, 2 ]

// Note: Unlike unshift(), this creates a new arrayG, and does not modify the original arrayG array in-place.
// This means that using spread leaves the original array untouched at its original memory address and generates a brand-new array object elsewhere in memory

let arrayI = [0, 1, 2];
let arrayJ = [3, 4, 5];

let arrayK = arrayI;

arrayI = [...arrayJ, ...arrayI];
console.log("arrayI: ", arrayI); // arrayI:  [ 3, 4, 5, 0, 1, 2 ]
console.log("arrayK:", arrayK); // arrayK: [ 0, 1, 2 ]



// Using spread, you can also easily insert anywhere in the array

let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes']; 

console.log(lyrics); // ["head", "shoulders", "knees", "and", "toes"]



// the real value in spread syntax is that it works with the same value, no matter how many elements are contained in the object, array, etc
// commonly used when you want to add a new item to a local data store, or display all stored items plus a new addition.

let numberStore = [0, 1, 2];
let newNumber = 12;

numberStore = [...numberStore, newNumber];

console.log(numberStore); // [ 0, 1, 2, 12 ]



// NOTE: Spread syntax effectively goes one level deep while copying an array. 
// Therefore, it may be unsuitable for copying multidimensional arrays

var a = [[['a', 'b'], ['c', 'd']], 'e'];
var b = [...a];

console.log(a); // [ [ [ 'a', 'b' ], [ 'c', 'd' ] ], 'e' ]
console.log(b); // [ [ [ 'a', 'b' ], [ 'c', 'd' ] ], 'e' ]

b[0][0][0] = 'z';
b[1] = 'x';

console.log(a); // [ [ [ 'z', 'b' ], [ 'c', 'd' ] ], 'e' ]
console.log(b); // [ [ [ 'z', 'b' ], [ 'c', 'd' ] ], 'x' ]

// In both arrays, the [0][0][0] value was changed. 
// Meaning that the object sitting at [0][0][0] in both arrays are referring to the same object, and is not a copy. 
// However, the [1] values of both arrays are different, meaning that it is indeed a copy.

// Shallow copy means the first level is copied, deeper levels are referenced.



// ----------------------------- > SPREAD ... >> Spread In Object Literals

// You can use spread syntax to merge multiple objects into one new object.

let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };
let obj3 = { fee: 'bee', z: 67 };

let mergedObj = {...obj1, ...obj3};
console.log('mergedObj', mergedObj); // mergedObj { foo: 'bar', x: 42, fee: 'bee', z: 67 }



// A single spread creates a shallow copy of the original object (but without non-enumerable properties and without copying the prototype), similar to copying an array.

let clonedObj = { ...obj1 }; 
console.log("clonedObj: ", clonedObj); // clonedObj:  { foo: 'bar', x: 42 }



// When one object is spread into another object, or when multiple objects are spread into one object, and properties with identical names are encountered, 
// the property takes the last value assigned while remaining in the position it was originally set.

let overlapObj = { ...obj1, ...obj2 }; 
console.log("overlapObj: ", overlapObj); // overlapObj:  { foo: 'baz', x: 42, y: 13 }



// +++++ Example: You can make an element present or absent in an object literal, depending on a condition, using a conditional operator.

let isSummer = false;
let isWinter = true;

const fruits = {
    apple: 10,
    banana: 5,
    ...(isSummer ? { watermelon: 30 } : {}), 
    ...(isWinter ? { winterpeen: 20 } : {}),
};

console.log(fruits); // { apple: 10, banana: 5, winterpeen: 20 }

// The case where the condition is false is an empty object, so that nothing gets spread into the final object.
// Note the difference between using spread and the alternative method shown below



// In this case, the watermelon/winterpeen properties are always present and will be visited by methods such as Object.keys()

isSummer = false;
isWinter = true;

const fruits1 = {
    apple: 10,
    banana: 5,
    watermelon: isSummer ? 30 : undefined, // alternative way to write without spread, but less efficient and neat
    winterpeen: isWinter ? 20 : undefined,
};

console.log(fruits1); // { apple: 10, banana: 5, watermelon: undefined, winterpeen: 20 }



// Because primitives can be spread into objects as well, 
// and from the observation that all falsy values do not have enumerable properties, 
// you can simply use a logical AND operator:

isSummer = false;
isWinter = true;

const fruits2 = {
  apple: 10,
  banana: 5,
  ...(isSummer && { watermelon: 30 }),
  ...(isWinter && { winterpeen: 20 }),
};

console.log(fruits2); // { apple: 10, banana: 5, winterpeen: 20 }

// In this case, if isSummer is any falsy value, no property will be created on the fruits object.



// ----------------------------- > REST ... as a Function Parameter -----------------------------

// Rest Syntax

function f(a, b, ...theArgs) {
    // code
}

// The rest parameter (...) allows a function to treat an indefinite number of arguments as an array:

function sum(...args) { // there is no need to define a number of parameters that is equal to the number of arguments that will be passed into the function

    console.log(args); // [ 4, 9, 16, 25, 29, 100, 66, 77 ]

    let sum = 0;

    for (let arg of args) sum += arg;

    return sum;
}

let total = sum(4, 9, 16, 25, 29, 100, 66, 77); 
console.log(total); // 326



// There are certain limitations to the rest parameter:

// A function definition can only have one rest parameter.
// The rest parameter must be the last parameter in the function definition.
// Trailing commas are not allowed after the rest parameter.
// The rest parameter cannot have a default value.



// NOTE: Rest parameters are Array instances, meaning methods like sort(), map(), forEach() or pop() can be applied on it directly.

function everythingIsEars (...theseCanBeEars) {
    return theseCanBeEars.map((notEars) => notEars.slice(1));
}

console.log(everythingIsEars('tear', 'fear', 'near', 'pear', 'rear'));



// NOTE: For the uses of the the Rest property in destructuring, please see packing_unpacking\2_destructuring.js > REST PROPERTY


