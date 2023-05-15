/* 
Table of Contents

> JSON STRUCTURE
> CONVERTING BETWEEN OBJECTS AND TEXT
*/



// JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. 

//  Even though it closely resembles JavaScript object literal syntax, 
// it can be used independently from JavaScript, 
// and many programming environments feature the ability to read (parse) and generate JSON. 

// It is commonly used for transmitting data in web applications 
// (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa). 

// A JSON string can be stored in its own file, which is basically just a text file with an extension of .json, and a MIME type of application/json.



// ----------------------------- > JSON STRUCTURE -----------------------------

// As described above, JSON is a string whose format very much resembles JavaScript object literal format. 

// You can include the same basic data types inside JSON as you can in a standard JavaScript object 
// — strings, numbers, arrays, booleans, and other object literals. 

// This allows you to construct a data hierarchy, as seen in json\example.json



// If we loaded this string into a JavaScript program and parsed it into a variable called superHeroes, 
// we could then access the data inside it using the same dot/bracket notation we looked at in the JavaScript object basics article.

const superHeroes = require('./example.json');

console.log(superHeroes.homeTown); // Metro City
console.log(superHeroes["active"]); // true
console.log(superHeroes["members"][1]["powers"][2]); // Superhuman reflexes



// Above we mentioned that JSON text basically looks like a JavaScript object inside a string. 
// We can also convert arrays to/from JSON.

// JSON is purely a string with a specified data format — it contains only properties, no methods.

// JSON requires double quotes to be used around strings and property names. 
// Single quotes are not valid other than surrounding the entire JSON string.

// JSON can actually take the form of any data type that is valid for inclusion inside JSON, not just arrays or objects. 
// So for example, a single string or number would be valid JSON.

// NOTE: Unlike in JavaScript code in which object properties may be unquoted, in JSON only quoted strings may be used as properties.



// ----------------------------- > CONVERTING BETWEEN OBJECTS AND TEXT -----------------------------

// a built-in JSON object is available in browsers, which contains the following two methods:

// parse(): Accepts a JSON string as a parameter, and returns the corresponding JavaScript object.
// stringify(): Accepts an object as a parameter, and returns the equivalent JSON string.

let guy = { name: "Chris", age: 38 };
console.log('Guy: ', guy); // Guy:  { name: 'Chris', age: 38 }

let myString = JSON.stringify(guy);
console.log('Object to JSON String: ', myString); // Object to JSON String:  {"name":"Chris","age":38}

let myObj = JSON.parse(myString);
console.log('JSON string to Object: ', myObj); // JSON string to Object:  { name: 'Chris', age: 38 }
