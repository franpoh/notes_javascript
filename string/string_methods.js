// Table of Contents

// > STRING.LENGTH
// > RETURN ANY CHARACTER INSIDE A STRING
// > STRING.INDEXOF
// > STRING.SLICE
// > STRING.TOLOWERCASE / STRING.TOUPPERCASE
// > STRING.REPLACE
// > STRING.INCLUDES
// > STRING.STARTSWITH / STRING.ENDSWITH



// ----------------------------- > STRING.LENGTH -----------------------------

// find out length of string (number of characters)

let browserType = 'mozilla';
console.log(browserType.length); // 7


 
// ----------------------------- > RETURN ANY CHARACTER INSIDE A STRING -----------------------------

// return any character inside a string by using square bracket notation at the end of your variable name, and include the number of the character you want to return

// Computers count from 0, so to return the first letter of a string:

console.log(browserType[0]); // m

// To get the last letter of any string:

console.log(browserType[browserType.length - 1]); // a



// ----------------------------- > STRING.INDEXOF -----------------------------

// find out if a substring (smaller string) is present inside a larger one

// takes a single parameter — the substring you want to search for.

// If the substring is found inside the main string, 
// it returns a number representing the index position of the substring — 
// which character number of the main string the substring starts at. 

// If the substring is not found inside the main string, it returns a value of -1.

let variableOne = 'mozilla';
console.log(variableOne.indexOf('zilla')); // 2



// can be combined with assignment operators 

if (browserType.indexOf('mozilla') === -1) { }
if (browserType.indexOf('mozilla') !== -1) { }



// ----------------------------- > STRING.SLICE -----------------------------

// use to extract substring

browserType = 'mozilla';

console.log(browserType.slice(0,3)); // moz
console.log(browserType.slice(2)); // zilla



// ----------------------------- > STRING.TOLOWERCASE / STRING.TOUPPERCASE -----------------------------

// convert all characters in string to lower- or uppercase

let radData = "rAdIaTiOn";

console.log(radData.toLowerCase()); // radiation
console.log(radData.toUpperCase()); // RADIATION



// ----------------------------- > STRING.REPLACE -----------------------------

// replace one substring inside a string with another substring

browserType = "mozilla";

// temporary, only for that return
console.log(browserType.replace('moz','van')); // vanilla
console.log(browserType); // mozilla

// permanently changed
browserType = browserType.replace('moz','van');
console.log(browserType); // vanilla



// ----------------------------- > STRING.INCLUDES -----------------------------

// The includes() method returns true if a string contains a specified value, otherwise false:

let text = "Hello world, welcome to the universe.";
console.log(text.includes("world")); // true



// Checking for multiple substrings in string

// includes
substringsArray.some(substring => yourBigString.includes(substring))

// matches
substringsArray.some(substring => yourBigString === substring)



// ----------------------------- > STRING.STARTSWITH / STRING.ENDSWITH -----------------------------

// The startsWith() method returns true if a string begins with a specified value, otherwise false:

text = "Hello world, welcome to the universe.";
console.log(text.startsWith("Hello"));   // true



// The endsWith() method returns true if a string ends with a specified value, otherwise false:

text = "John Doe";
console.log(text.endsWith("Doe"));  // true