/* 
Table of Contents

> SPREAD ...
>> Syntax
>> In Function Calls
>> In Calling Constructors
>> In Array Literals
>>> A Better Way To Combine Arrays
>> Spread In Object Literals
> REST ... 
*/



// ----------------------------- > SPREAD ... -----------------------------

// allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, 
// or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

// Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.

// Spread syntax looks exactly like rest syntax. 
// In a way, spread syntax is the opposite of rest syntax. 
// Spread syntax "expands" an array into its elements, while rest syntax collects multiple elements and "condenses" them into a single element.



function sum(x, y, z) { // defined function takes x, y, and z as arguments
    return x + y + z; // returns the sum of these values
}

const numbers = [1, 2, 3]; // An array value is also defined

console.log(...numbers); // 1 2 3

console.log(sum(...numbers)); // 6

console.log(sum.apply(null, numbers)); // 6

// When we invoke the function, we pass it all the values in the array using the spread syntax and the array name — ...numbers.

// If the array contained more than three numbers, e.g. [1, 2, 3, 4], then it would still work fine, 
// except that all four would be passed, but only the first three would be used unless you added more arguments to the function



// the real value in spread syntax is that it works with the same value, no matter how many elements are contained in the object, array, etc

// commonly used when you want to add a new item to a local data store, or display all stored items plus a new addition.

let numberStore = [0, 1, 2];
let newNumber = 12;
numberStore = [...numberStore, newNumber];

console.log(numberStore); // [ 0, 1, 2, 12 ]

// In the above example you can rerun the last line as many times as you like, to keep adding an additional 12 to the end of the array.



// ----------------------------- > SPREAD ... >> Syntax

// // For function calls:
myFunction(...iterableObj); // pass all elements of iterableObj as arguments to function myFunction

// // For array literals or strings:
[...iterableObj, '4', 'five', 6]; // combine two arrays by inserting all elements from iterableObj

// // For object literals
let objClone = { ...obj }; // pass all key:value pairs from an object 


// ----------------------------- > SPREAD ... >> In Function Calls

// Replace apply()

function myFunction(x, y, z) { return x + y + z; }
let args = [0, 1, 2];

// It is common to use Function.prototype.apply() in cases where you want to use the elements of an array as arguments to a function.

console.log(myFunction.apply(null, args)); // 3

// With spread syntax the above can be written as:

console.log(myFunction(...args)); // 3

// Any argument in the argument list can use spread syntax, and the spread syntax can be used multiple times.

function thatFunction(t, u, v, w, x, y, z) { return t + u + v + w + x + y + z; }
let args2 = [0, 1];

console.log(thatFunction(-1, ...args, 2, ...args2)); // 5



// ----------------------------- > SPREAD ... >> In Calling Constructors

// When calling a constructor with new it's not possible to directly use an array and apply() (apply() does a [[Call]] and not a [[Construct]]). 
// However, an array can be easily used with new thanks to spread syntax:

let dateFields = [2022, 4, 10];

console.log(new Date(...dateFields)); 



// ----------------------------- > SPREAD ... >> In Array Literals

// A more powerful array literal 

// Without spread syntax, 
// to create a new array using an existing array as one part of it, the array literal syntax is no longer sufficient 
// and imperative code must be used instead using a combination of push(), splice(), concat(), etc. 

// With spread syntax this becomes much more succinct:

let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes']; 
console.log(lyrics); // ["head", "shoulders", "knees", "and", "toes"]



// Just like spread for argument lists, ... can be used anywhere in the array literal, and may be used more than once.

// Copy an array
let arrI = [1, 2, 3];
let arrII = [...arrI]; // like arr.slice()

arrII.push(4);
//  arr2 becomes [1, 2, 3, 4]
//  arr remains unaffected



// NOTE: Spread syntax effectively goes one level deep while copying an array. 
// Therefore, it may be unsuitable for copying multidimensional arrays

var a = [[['a', 'b'], ['c', 'd']], 'e'];
var b = [...a];

b[0][0][0] = 'z';
b[1] = 'x';

console.log('a', a); // a [ [ [ 'z', 'b' ], [ 'c', 'd' ] ], 'e' ]
console.log('b', b); // b [ [ [ 'z', 'b' ], [ 'c', 'd' ] ], 'x' ]

// Both arrays [0][0][0] value was changed. 
// Meaning that the object sitting at [0][0][0] in both arrays are referenced to the same object, and is not a copy. 
// However the [1] values are different meaning that it is indeed a copy.

// Shallow copy means the first level is copied, deeper levels are referenced.



// ----------------------------- > SPREAD ... >> In Array Literals >>> A Better Way To Combine Arrays

// Array.prototype.concat() is often used to concatenate an array to the end of an existing array.

let arrA = [0, 1, 2];
let arrB = [3, 4, 5];

// //  Append all items from arrB onto arrA
arrA = arrA.concat(arrB);
console.log("arrA: ", arrA); // arrA:  [ 0, 1, 2, 3, 4, 5 ]

// With spread syntax this becomes:

let arrC = [0, 1, 2];
let arrD = [3, 4, 5];

arrC = [...arrC, ...arrD]
console.log("arrC: ", arrC); // arrC:  [ 0, 1, 2, 3, 4, 5 ]

// Note: Do not use const, otherwise it will give TypeError (invalid assignment)



// Array.prototype.unshift() is often used to insert an array of values at the start of an existing array. 

// Without spread syntax, this is done as:

let arrE = [0, 1, 2];
let arrF = [3, 4, 5];

// //  Prepend all items from arrF onto arrE
Array.prototype.unshift.apply(arrE, arrF) //  arrE is now [3, 4, 5, 0, 1, 2]
console.log("arrE: ", arrE); // arrE:  [ 3, 4, 5, 0, 1, 2 ]

// With spread syntax, this becomes:

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

arr1 = [...arr2, ...arr1];
console.log("arr1: ", arr1); // arr1:  [ 3, 4, 5, 0, 1, 2 ]

// Note: Unlike unshift(), this creates a new arr1, and does not modify the original arr1 array in-place.



// ----------------------------- > SPREAD ... >> Spread In Object Literals

// It copies own enumerable properties from a provided object onto a new object.
// Shallow-cloning (excluding prototype) or merging of objects is now possible using a shorter syntax than Object.assign().

let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };

let clonedObj = { ...obj1 }; 
console.log("clonedObj: ", clonedObj); // clonedObj:  { foo: 'bar', x: 42 }

let mergedObj = { ...obj1, ...obj2 }; 
console.log("mergedObj: ", mergedObj); // mergedObj:  { foo: 'baz', x: 42, y: 13 }

// Note that Object.assign() triggers setters, whereas spread syntax doesn't.



// Only for iterables

// Objects themselves are not iterable, but they become iterable when used in an Array, or with iterating functions such as map(), reduce(), and assign(). 
// When merging 2 objects together with the spread operator, it is assumed another iterating function is used when the merging occurs.

// Spread syntax (other than in the case of spread properties) can be applied only to iterable objects:

let obj = { 'key1': 'value1' };
let array = [...obj]; // TypeError: obj is not iterable



// ----------------------------- > REST ... -----------------------------

// Rest syntax looks exactly like spread syntax. In a way, rest syntax is the opposite of spread syntax. 

// Spread syntax "expands" an array into its elements, 
// while rest syntax collects multiple elements and "condenses" them into a single element.



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