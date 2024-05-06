/* 
Table of Contents

> EXPLANATION
> DEFINITIONS
> DATA TYPES
> JAVASCRIPT METHODS
> ERRORS 
*/



// ----------------------------- > EXPLANATION -----------------------------

// JavaScript is a "dynamically typed language", 
// which means that, unlike some other languages, you don't need to specify what data type a variable will contain (numbers, strings, arrays, etc). 

// When you load a web page in your browser, you are running your code (the HTML, CSS, and JavaScript) inside an execution environment (the browser tab).

// Each browser tab has its own separate bucket for running code in (these buckets are called "execution environments" in technical terms) — 
// this means that in most cases the code in each tab is run completely separately, 
// and the code in one tab cannot directly affect the code in another tab — or on another website.

// See also Cheatsheet\javascript.js



// ----------------------------- > RUNNING CODE IN JAVASCRIPT -----------------------------

// Right click and select 'Run Code', or the shortcut 'Ctrl Alt N'
// If you wish to run a particular section of code, highlight the specific section of code and run it



// You will be seeing this a lot
console.log('Hello World!'); 
console.log('Try running this individually!');

// the log() method writes (logs) a message to the console, and is useful for testing purposes.
// You will see the output in the 'Output' section of the terminal
// You can open a new terminal by going to 'Terminal' in the navigation bar and selecting 'New Terminal'

// The semicolon ; at the end is used to end a statement. It is not always required, but considered good practice to include them to avoid potential errors. 
// What is a statement? See the below section > DEFINITIONS to learn more.



// Some common errors you might see when running your code

// ----- Syntax errors
// These are spelling errors in your code that actually cause the program not to run at all, or stop working part way through — you will usually be provided with some error messages too.

// ----- Logic errors
// These are errors where the syntax is actually correct but the code is not what you intended it to be, meaning that program runs successfully but gives incorrect results.



// What's with all the green words and the backslashes? Those are comments, text which are excluded from code execution.
// Comments can be used to explain JavaScript code, and to make it more readable. They can also be used to prevent execution, when testing alternative code.

// Two backslashes for a single line comment

/* This is a 
multi-line comment. 
Hello world! */



// ----------------------------- > COMMON TERMS -----------------------------

// ----- NaN 
// Not a Number

// ----- Statement
// In a computer programming language, a statement is a line of code commanding a task. Every program consists of a sequence of statements.




// ----------------------------- > DATA TYPES -----------------------------

// Primitive data type – most basic things eg string, number, boolean
// Non-primitive data type – things that can still be broken down eg objects, functions

// The latest ECMAScript standard defines eight data types:



// Seven data types that are primitives:

// Boolean.     true and false.
// null.        A special keyword denoting a null value. (Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant.)
// undefined.   A top-level property whose value is not defined.
// Number.      An integer or floating point number. For example: 42 or 3.14159.
// String.      A sequence of characters that represent a text value. For example: "Howdy".
// BigInt.      An integer with arbitrary precision. For example: 9007199254740992n.
// Symbol.      A data type whose instances are unique and immutable.

// and Object

// NOTE: Pay more attention to the first 5 primitives and object, we will get to BigInt and Symbol later



// Although these data types are relatively few, they enable you to perform useful operations with your applications. 

// Functions are the other fundamental elements of the language. 
// While functions are technically a kind of object, you can think of objects as named containers for values, and functions as procedures that your script can perform.