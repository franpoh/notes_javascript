
// Array - a single object that contains multiple values enclosed in square brackets and separated by commas.
let myNameArray = ['Chris', 'Bob', 'Jim'];



// Array Literal

// An array literal is a list of zero or more expressions, each of which represents an array element, enclosed in square brackets ([]). 

// When you create an array using an array literal, it is initialized with 
// the specified values as its elements, 
// and its length is set to the number of arguments specified.

// The following example creates the coffees array with three elements and a length of three:

const coffees = ["French Roast", "Colombian", "Kona"];



// Note on curly braces: { } denotes an object, not an array. Objects have key-value pairs like
var a3 = { one: 1, two: 2 }



// in an array we can store various data types — strings, numbers, objects, and even other arrays. We can also mix data types in a single array
let sequence = [1, 1, 2, 3, 5, 8, 13];
let random = ['tree', 795, [0, 1, 2]];



// multidimensional array  - an array inside an array. You can access an item inside an array that is itself inside another array by chaining two sets of square brackets together.
let shopping1 = ['bread', 'milk', 'cheese', 'hummus', 'noodles', ['coffee', 'tea', 'water']];
shopping1[5][1]; // tea

