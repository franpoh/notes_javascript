/* 
Table of Contents

> SPREAD ...
>> In Function Calls
>> In Array Literals
>> Spread In Object Literals
>> In Calling Constructors
> REST ... 
*/



// Spread syntax and Rest syntax looks exactly the same: ...iterableObject

// Spread syntax "expands" an iterable object into its elements

// Rest syntax collects multiple elements and "condenses" them into a single iterable object.

const spreadOfValues = [1, 2, 3, 4, 5];

function exampleOfBoth (a, b, ...restOfValues) { // usage of Rest syntax here with ...restOfValues
    console.log(`The first number is ${a}, the second number is ${b}, and the rest of the numbers is ${restOfValues}`);
}

exampleOfBoth(...spreadOfValues); // usage of Spread syntax here with ...spreadOfValues

// The first number is 1, the second number is 2, and the rest of the numbers is 3,4,5



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

// A single spread creates a shallow copy of the original object (but without non-enumerable properties and without copying the prototype), similar to copying an array.

let clonedObj = { ...obj1 }; 
console.log("clonedObj: ", clonedObj); // clonedObj:  { foo: 'bar', x: 42 }

// When one object is spread into another object, or when multiple objects are spread into one object, and properties with identical names are encountered, 
// the property takes the last value assigned while remaining in the position it was originally set.

let mergedObj = { ...obj1, ...obj2 }; 
console.log("mergedObj: ", mergedObj); // mergedObj:  { foo: 'baz', x: 42, y: 13 }





// Objects themselves are not iterable, but they become iterable when used in an Array, or with iterating functions such as map(), reduce(), and assign(). 
// When merging 2 objects together with the spread operator, it is assumed another iterating function is used when the merging occurs.

// Spread syntax (other than in the case of spread properties) can be applied only to iterable objects:

let obj = { 'key1': 'value1' };
let array = [...obj]; // TypeError: obj is not iterable



// ----------------------------- > SPREAD ... >> In Calling Constructors

// When calling a constructor with new it's not possible to directly use an array and apply() (apply() does a [[Call]] and not a [[Construct]]). 
// However, an array can be easily used with new thanks to spread syntax:

let dateFields = [2022, 4, 10];

console.log(new Date(...dateFields)); 



// ----------------------------- > REST ... -----------------------------

// See about the rest syntax in destructuring.js



// rest syntax example

function f(a, b, ...theArgs) {
    // ...
}

// The rest parameter (...) allows a function to treat an indefinite number of arguments as an array:

function sum(...args) {
    let sum = 0;
    for (let arg of args) sum += arg;
    return sum;
}

let x = sum(4, 9, 16, 25, 29, 100, 66, 77); 
console.log("x: ", x); // x:  326