/* 
Table of Contents

> LENGTH 
> RETURN ANY CHARACTER INSIDE A STRING 
> INDEXOF() / LASTINDEXOF() 
> SLICE() 
> CONCAT()
> SPLIT()
> SUBSTRING()
> TOLOWERCASE() / TOUPPERCASE() 
> INCLUDES()
> STARTSWITH() / ENDSWITH()
> WORKS WITH REGULAR EXPRESSIONS
>> replace() / replaceAll()
>> match() / matchAll()
>> search()
*/



// ----------------------------- > LENGTH -----------------------------

// find out length of string (number of characters)

let pancake = 'pannenkoek';
console.log(pancake.length); // 10



// ----------------------------- > RETURN ANY CHARACTER INSIDE A STRING -----------------------------

// return any character inside a string by using square bracket notation at the end of your variable name, and include the number of the character you want to return

pancake = 'pannenkoek';

console.log(pancake[2]); // n

// To get the last letter of any string:
console.log(pancake[pancake.length - 1]); // k



// ----------------------------- > INDEXOF() / LASTINDEXOF() -----------------------------

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



// ----------------------------- > SLICE() -----------------------------

// extracts a section of this string and returns it as a new string, without modifying the original string. 

pancake = 'pannenkoek';

console.log(pancake.slice(0, 6)); // pannen
console.log(pancake.slice(6)); // koek
console.log(pancake); // pannenkoek



// ----------------------------- > CONCAT() -----------------------------

// concatenates (combines) the string arguments to this string and returns a new string. 

let greeting = 'Hello';
pancake = 'Pannenkoek';

console.log(greeting.concat(' ', pancake)); // Hello Pannenkoek
console.log(greeting.concat(' ', pancake, ', I am Syrup.')); // Hello Pannenkoek, I am Syrup.



// ----------------------------- > SPLIT() -----------------------------

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



// ----------------------------- > SUBSTRING() -----------------------------

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



// ----------------------------- > TOLOWERCASE() / TOUPPERCASE() -----------------------------

// convert all characters in string to lower- or uppercase

let panCake = "pannenKOEK";

console.log(panCake.toLowerCase()); // pannenkoek
console.log(panCake.toUpperCase()); // PANNENKOEK



// ----------------------------- > INCLUDES() -----------------------------

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



// ----------------------------- > STARTSWITH() / ENDSWITH() -----------------------------

// The startsWith() method returns true if a string begins with a specified value, otherwise false:

pancakeText = "Hello world, welcome to the pannenkoek";
console.log(pancakeText.startsWith("Hello")); // true
console.log(pancakeText.startsWith("Hoi")); // false



// The endsWith() method returns true if a string ends with a specified value, otherwise false:

pancakeText = "Hello world, welcome to the pannenkoek";
console.log(pancakeText.endsWith("pannenkoek")); // true
console.log(pancakeText.endsWith("pancake")); // false


// ----------------------------- > WORKS WITH REGULAR EXPRESSIONS -----------------------------

// These methods can take a regular expression object as a parameter. 



// ----------------------------- > WORKS WITH REGULAR EXPRESSIONS >> replace() / replaceAll()

// Can be a string or an object with a Symbol.replace method — the typical example being a regular expression. 
// Any value that doesn't have the Symbol.replace method will be *coerced to a string.

// * type coercion: See Cheatsheet\coding\type_coercion.js



// ----- replace(): replace one substring inside a string with another substring

pancake = "pannenkoek";

// temporary, only for that return
console.log(pancake.replace('koek', 'cake')); // pannencake
console.log(pancake); // pannenkoek

// permanently changed
pancake = pancake.replace('koek', 'cake');
console.log(pancake); // pannencake



// ----- replaceAll()

pancakecakecake = 'pannenkoekkoekkoek'

// with replace()
console.log(pancakecakecake.replace('koek', 'cake')); // pannencakekoekkoek

// with replaceAll()
console.log(pancakecakecake.replaceAll('koek', 'cake')); // pannencakecakecake



// ----- Example with Regex

// Small explanation about the regex: /\b/(word1|word2|word3)\b/g

//      \b: 
//      This is a word boundary that matches the position between a word character and a non-word character. 
//      This ensures that the pattern matches whole words and not substrings within larger words.

//      (word1|word2|word3|...): 
//      This is a group that contains the words you want to match, separated by the pipe (|) symbol, which represents alternation. 

//      \b: 
//       Another word boundary to ensure the match ends at the end of the word.

//      g: 
//      This is a flag that makes the regular expression global, meaning it will find all occurrences in the string, not just the first one.

let pancakeLetter = 'Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek...';
let pancakeRegex = /\b(Pancake|Pannenkoek)\b/g;
let nonGlobalPancakeRegex = /\b(Pancake|Pannenkoek)\b/;

console.log(pancakeLetter.replace(pancakeRegex, 'Generic Flat Cake')); // Dearest Generic Flat Cake, it is your cousin, Generic Flat Cake, dictating a letter from your long-lost sister, Generic Flat Cake...

// As you can see, we are using replace(), but yet it replaced all occurences, even repeated ones. 
// This is due to the 'g' in the regex, meaning it will find all occurrences in the string, not just the first one
// Here is an example without the 'g'

console.log(pancakeLetter.replace(nonGlobalPancakeRegex, 'Generic Flat Cake')); // Dearest Generic Flat Cake, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek...

// Using a non-global regex with replaceAll() results in a TypeError!
console.log(pancakeLetter.replaceAll(nonGlobalPancakeRegex, 'Generic Flat Cake')); // TypeError: String.prototype.replaceAll called with a non-global RegExp argument



// ----------------------------- > WORKS WITH REGULAR EXPRESSIONS >> match() / matchAll()

// If argument is not a RegExp object and does not have a Symbol.search method, it is implicitly converted to a RegExp by using new RegExp(regexp).



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



// ----- Example with Regex

pancakeLetter = 'Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek...';
pancakeRegex = /\b(Pancake|Pannenkoek)\b/g;
nonGlobalPancakeRegex = /\b(Pancake|Pannenkoek)\b/;

// Note the difference between the global and non-global regex output

console.log(pancakeLetter.match(pancakeRegex)); // Array(3) [ "Pannenkoek", "Pancake", "Pannenkoek" ]

console.log(pancakeLetter.match(nonGlobalPancakeRegex));
/* browser console output 
Array [ "Pannenkoek", "Pannenkoek" ]
    0: "Pannenkoek"
    1: "Pannenkoek"
    groups: undefined
    index: 8
    input: "Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek..."
    length: 2
*/

// The contents of the returned Array depend on the presence or absence of the global (g) flag, or null if no matches are found.
//      If the g flag is used, all results matching the complete regular expression will be returned, but capturing groups are not included.
//      If the g flag is not used, only the first complete match and its related capturing groups are returned. 



// Once again, note that using a non-global regex will result in a TypeError

console.log([...pancakeLetter.matchAll(pancakeRegex)]); // TypeError: String.prototype.matchAll called with a non-global RegExp argument

console.log([...pancakeLetter.matchAll(nonGlobalPancakeRegex)]);
/* browser console output
Array(3) [ (2) […], (2) […], (2) […] ]
    0: Array [ "Pannenkoek", "Pannenkoek" ]
        0: "Pannenkoek"
        1: "Pannenkoek"
        groups: undefined
        index: 8
        input: "Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek..."
        length: 2
        <prototype>: Array []
    1: Array [ "Pancake", "Pancake" ]
        0: "Pancake"
        1: "Pancake"
        groups: undefined
        index: 39
        input: "Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek..."
        length: 2
        <prototype>: Array []
    2: Array [ "Pannenkoek", "Pannenkoek" ]
        0: "Pannenkoek"
        1: "Pannenkoek"
        groups: undefined
        index: 95
        input: "Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek..."
        length: 2
        <prototype>: Array []
length: 3
*/



// ----------------------------- > WORKS WITH REGULAR EXPRESSIONS >> search()

// If argument is not a RegExp object and does not have a Symbol.search method, it is implicitly converted to a RegExp by using new RegExp(regexp).



// executes a search for a match between a regular expression and this string, returning the index of the first match in the string.

pancakeText = "Hello world, welcome to the pannenkoek. The pannenkoek says hello too.";
console.log(pancakeText.search('pannenkoek')); // 28



// ----- Example with Regex

pancakeLetter = 'Dearest Pannenkoek, it is your cousin, Pancake, dictating a letter from your long-lost sister, Pannenkoek...';
pancakeRegex = /\b(Pancake|Pannenkoek)\b/g;
nonGlobalPancakeRegex = /\b(Pancake|Pannenkoek)\b/;

// Note the same results. The search stops at the first match regardless of global or non-global regex

console.log(pancakeLetter.search(pancakeRegex)); // 8
console.log(pancakeLetter.search(nonGlobalPancakeRegex)); // 8

// The g flag of regexp has no effect on the search() result, and the search always happens as if the regex's lastIndex is 0. 