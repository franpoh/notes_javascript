/* 
Table of Contents

> TOSTRING
*/



// ----------------------------- > STRING OBJECTS -----------------------------

// The String object is a wrapper around the string primitive data type.

const foo = new String("foo"); // Creates a String object
console.log(foo); // [String: 'foo']
typeof foo; // 'object'

// You can call any of the methods of the String object on a string literal value
// JavaScript automatically converts the string literal to a temporary String object, calls the method, then discards the temporary String object. 
// You can also use the length property with a string literal.
// NOTE: See object\object_wrapper.js



// You should use string literals unless you specifically need to use a String object, because String objects can have counterintuitive behavior.

const firstString = "2 + 2"; // Creates a string literal value
const secondString = new String("2 + 2"); // Creates a String object

console.log(eval(firstString)); // 4
console.log(eval(secondString)); // [String: '2 + 2']



// A String object has one property, length, that indicates the number of *UTF-16 code units in the string. 

// * UTF-16 is a character encoding scheme that is used in various environments, including JavaScript and the web. 
// It represents each character using one or two 16-bit code units. 
// So essentially, the string object property 'length' is the number of characters in the string

// For example, the following code assigns helloLength the value 13, because "Hello, World!" has 13 characters, each represented by one UTF-16 code unit. 

const hello = "Hello, World!";
const helloLength = hello.length;

console.log(helloLength); // 13

// You can access each code unit using an array bracket style. 

console.log(hello[0]); // H

// You can't change individual characters because strings are immutable array-like objects:

hello[0] = "L"; // This has no effect, because strings are immutable
console.log(hello); // Hello, World!













// ----------------------------- > TOSTRING -----------------------------

// To convert a number value into a string

let myNum2 = 123;
console.log(myNum2.toString()); // 123