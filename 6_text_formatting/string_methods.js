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



// ----------------------------- > STRING METHODS >> Length 

// find out length of string (number of characters)

let pancake = 'pannenkoek';
console.log(pancake.length); // 10


 
// ----------------------------- > STRING METHODS >> Return Any Character Inside A String 

// return any character inside a string by using square bracket notation at the end of your variable name, and include the number of the character you want to return

pancake = 'pannenkoek';

console.log(pancake[2]); // n

// To get the last letter of any string:
console.log(pancake[pancake.length - 1]); // k



// ----------------------------- > STRING METHODS >> indexOf() / lastIndexOf() 

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



// ----------------------------- > STRING METHODS >> slice() 

// extracts a section of this string and returns it as a new string, without modifying the original string. 

pancake = 'pannenkoek';

console.log(pancake.slice(0,6)); // pannen
console.log(pancake.slice(6)); // koek
console.log(pancake); // pannenkoek



// ----------------------------- > STRING METHODS >> concat()

// concatenates (combines) the string arguments to this string and returns a new string. 

let greeting = 'Hello';
pancake = 'Pannenkoek';

console.log(greeting.concat(' ', pancake)); // Hello Pannenkoek
console.log(greeting.concat(' ', pancake, ', I am Syrup.')); // Hello Pannenkoek, I am Syrup.



// ----------------------------- > STRING METHODS >> split()

// takes a pattern and divides this string into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.

let pancakeText = "Hello world, welcome to the pannenkoek";

const words = pancakeText.split(' '); // split at spaces, spaces are eliminated
console.log(words); // [ 'Hello', 'world,', 'welcome', 'to', 'the', 'pannenkoek' ]
console.log(words[2]); // welcome
console.log(pancakeText.split(' ')[2]); // welcome

const chars = pancakeText.split(''); // split at 'no space' - ie split at every character/punctuation/space. Nothing is eliminated
console.log(chars); // [ 'H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', ',', ' ', 'w', ... ]
console.log(chars[8]); // r

const onlyE = pancakeText.split('e'); // split at 'e', 'e' is eliminated
console.log(onlyE); // [ 'H', 'llo world, w', 'lcom', ' to th', ' pann', 'nko', 'k' ]

const pancakeCopy = pancakeText.split(); // no pattern provided to split at
console.log(pancakeCopy); // [ 'Hello world, welcome to the pannenkoek' ]



// ----------------------------- > STRING METHODS >> subString()

// returns the part of this string from the start index up to and excluding the end index, or to the end of the string if no end index is supplied.

pancake = 'Pannenkoek';

console.log(pancake.substring(0, 6)); // Pannen
console.log(pancake.substring(6)); // koek



// slice() and subString() is almost identical, but there are a few differences, with the main one being that
// substring() swaps its two arguments if indexStart is greater than indexEnd, meaning that a string is still returned. 
// slice() returns an empty string if this is the case. 

pancake = 'Pannenkoek';

console.log(`subString: ${pancake.substring(6, 0)} and koek`); // subString: Pannen and koek
console.log(`slice: ${pancake.slice(6, 0)} and koek`); // slice:  and koek



// ----------------------------- > STRING METHODS >> toLowerCase() / toUpperCase() 

// convert all characters in string to lower- or uppercase

let panCake = "pannenKOEK";

console.log(panCake.toLowerCase()); // pannenkoek
console.log(panCake.toUpperCase()); // PANNENKOEK



// ----------------------------- > STRING METHODS >> replace() / replaceAll()

// ----- replace(): replace one substring inside a string with another substring

pancake = "pannenkoek";

// temporary, only for that return
console.log(pancake.replace('koek','cake')); // pannencake
console.log(pancake); // pannenkoek

// permanently changed
pancake = pancake.replace('koek','cake');
console.log(pancake); // pannencake



// ----- replaceAll()

pancakecakecake = 'pannenkoekkoekkoek'

// with replace()
console.log(pancakecakecake.replace('koek','cake')); // pannencakekoekkoek

// with replaceAll()
console.log(pancakecakecake.replaceAll('koek','cake')); // pannencakecakecake



// ----------------------------- > STRING METHODS >>

// ----- match()

pancakeText = "Hello world, welcome to the pannenkoek.";

console.log(pancakeText.match('pannenkoek'));

/* This is the output in vscode
[
  'pannenkoek',
  index: 28,
  input: 'Hello world, welcome to the pannenkoek.',
  groups: undefined
]
*/

/* It's a lot easier to understand when you look at web browser console output
Array [ "pannenkoek" ]
    0: "pannenkoek"
    groups: undefined
    index: 28
    input: "Hello world, welcome to the pannenkoek."
    length: 1
*/

// Here is how you should access the information in the output
let pancakeMatch = pancakeText.match('pannenkoek');
console.log(pancakeMatch[0]); // pannenkoek
console.log(pancakeMatch.index); // 28



// ----- matchAll()

pancakeText = "Hello world, welcome to the pannenkoek. The pannenkoek says hello too.";

pancakeMatch = pancakeText.match('pannenkoek');
console.log(pancakeMatch); // match() only makes 1 match
/* 
[
  'pannenkoek',
  index: 28,
  input: 'Hello world, welcome to the pannenkoek. The pannenkoek says hello too.',
  groups: undefined
]
*/


// When you don't use spread syntax, you just get an iterator object
console.log(pancakeText.matchAll('pannenkoek')); // Object [RegExp String Iterator] {}

// note the spread syntax (into an array) that we are using here. See symbol\well_known_symbol.js > SYMBOL.ITERATOR
let pancakeMatchAll = [...pancakeText.matchAll('pannenkoek')]; // this turns the iterator object into a usable array of values
console.log(pancakeMatchAll); 
/* vscode console output
[
  [
    'pannenkoek',
    index: 28,
    input: 'Hello world, welcome to the pannenkoek. The pannenkoek says hello too.',
    groups: undefined
  ],
  [
    'pannenkoek',
    index: 44,
    input: 'Hello world, welcome to the pannenkoek. The pannenkoek says hello too.',
    groups: undefined
  ]
]
*/

/* browser console output
Array [ (1) […], (1) […] ]
    0: Array [ "pannenkoek" ]
        0: "pannenkoek"
        groups: undefined
        index: 28
        input: "Hello world, welcome to the pannenkoek. The pannenkoek says hello too."
        length: 1
        <prototype>: Array []
    1: Array [ "pannenkoek" ]
        0: "pannenkoek"
        groups: undefined
        index: 44
        input: "Hello world, welcome to the pannenkoek. The pannenkoek says hello too."
        length: 1
        <prototype>: Array []
    length: 2
*/

// accessing information, on the second index of matchAll() output

pancakeText = "Hello world, welcome to the pannenkoek. The pannenkoek says hello too.";
pancakeMatchAll = [...pancakeText.matchAll('pannenkoek')];

console.log(pancakeMatchAll[1][0]); // pannenkoek
console.log(pancakeMatchAll[1].index); // 4



// ----------------------------- > STRING METHODS >> includes()

// The includes() method returns true if a string contains a specified value, otherwise false:

pancakeText = "Hello world, welcome to the pannenkoek";
console.log(pancakeText.includes("pannenkoek")); // true



// Checking for multiple substrings in string
// See array\iteration_methods.js > ARRAY.SOME

pancakeText = "Hello world, welcome to the pannenkoek";

let pancakeIncludes = ['pannenkoek', 'world'].some(item => pancakeText.includes(item)); // checking if string contains 'pannenkoek' and/or 'world'
console.log(pancakeIncludes); // true

pancakeIncludes = ['pancake', 'world'].some(item => pancakeText.includes(item)); // checking if string contains 'pancake' and/or 'world'
console.log(pancakeIncludes); // true

pancakeIncludes = ['pancake', 'wereld'].some(item => pancakeText.includes(item)); // checking if string contains 'pancake' and/or 'wereld'
console.log(pancakeIncludes); // false



// ----------------------------- > STRING METHODS >> startsWith() / endsWith()

// The startsWith() method returns true if a string begins with a specified value, otherwise false:

pancakeText = "Hello world, welcome to the pannenkoek";
console.log(pancakeText.startsWith("Hello")); // true
console.log(pancakeText.startsWith("Hoi")); // false



// The endsWith() method returns true if a string ends with a specified value, otherwise false:

pancakeText = "Hello world, welcome to the pannenkoek";
console.log(pancakeText.endsWith("pannenkoek")); // true
console.log(pancakeText.endsWith("pancake")); // false