/* 
Table of Contents

> STRING METHODS 
> STRING METHODS >> Length
>> Return Any Character Inside A String
>> Indexof() / lastIndexOf()
>> Slice()
>> Tolowercase() / Touppercase()
>> Replace()
>> Includes()
>> Startswith() / Endswith() 
*/



// ----------------------------- > STRING METHODS >> Length -----------------------------

// find out length of string (number of characters)

let pancake = 'pannenkoek';
console.log(pancake.length); // 10


 
// ----------------------------- > STRING METHODS >> Return Any Character Inside A String -----------------------------

// return any character inside a string by using square bracket notation at the end of your variable name, and include the number of the character you want to return

pancake = 'pannenkoek';

console.log(pancake[2]); // n

// To get the last letter of any string:
console.log(pancake[pancake.length - 1]); // k



// ----------------------------- > STRING METHODS >> Indexof() / lastIndexOf() -----------------------------

// ----- Indexof()

// searches string and returns the index of the first occurrence of the specified substring

// takes a single parameter — the substring you want to search for.
// If the substring is found inside the main string, it returns a number representing the index position of the substring — which character number of the main string the substring starts at. 
// If the substring is not found inside the main string, it returns a value of -1.

let pancakecakecake = 'pannenkoekkoekkoek';

console.log(pancakecakecake.indexOf('koek')); // 6
console.log(pancakecakecake.indexOf('cake')); // -1



// ----- lastIndexOf()

// searches string and returns the index of the last occurrence of the specified substring

pancakecakecake = 'pannenkoekkoekkoek';

console.log(pancakecakecake.lastIndexOf('koek')); // 14



// ----------------------------- > STRING METHODS >> Slice() -----------------------------

// extracts a section of this string and returns it as a new string, without modifying the original string. 

pancake = 'pannenkoek';

console.log(pancake.slice(0,6)); // pannen
console.log(pancake.slice(6)); // koek



// ----------------------------- > STRING METHODS >> Tolowercase() / Touppercase() -----------------------------

// convert all characters in string to lower- or uppercase

let panCake = "pannenKOEK";

console.log(panCake.toLowerCase()); // pannenkoek
console.log(panCake.toUpperCase()); // PANNENKOEK



// ----------------------------- > STRING METHODS >> Replace() -----------------------------

// replace one substring inside a string with another substring

pancake = "pannenkoek";

// temporary, only for that return
console.log(pancake.replace('koek','cake')); // pannencake
console.log(pancake); // pannenkoek

// permanently changed
pancake = pancake.replace('koek','cake');
console.log(pancake); // pannencake



// ----------------------------- > STRING METHODS >> Includes() -----------------------------

// The includes() method returns true if a string contains a specified value, otherwise false:

let pancakeText = "Hello world, welcome to the pannenkoek.";
console.log(pancakeText.includes("pannenkoek")); // true



// Checking for multiple substrings in string
// See array\iteration_methods.js > ARRAY.SOME

pancakeText = "Hello world, welcome to the pannenkoek.";

let pancakeIncludes = ['pannenkoek', 'world'].some(item => pancakeText.includes(item)); // checking if string contains 'pannenkoek' and/or 'world'
console.log(pancakeIncludes); // true

pancakeIncludes = ['pancake', 'world'].some(item => pancakeText.includes(item)); // checking if string contains 'pancake' and/or 'world'
console.log(pancakeIncludes); // true

pancakeIncludes = ['pancake', 'wereld'].some(item => pancakeText.includes(item)); // checking if string contains 'pancake' and/or 'wereld'
console.log(pancakeIncludes); // false



// ----------------------------- > STRING METHODS >> Startswith() / Endswith() -----------------------------

// The startsWith() method returns true if a string begins with a specified value, otherwise false:

text = "Hello world, welcome to the universe.";
console.log(text.startsWith("Hello"));   // true



// The endsWith() method returns true if a string ends with a specified value, otherwise false:

text = "John Doe";
console.log(text.endsWith("Doe"));  // true