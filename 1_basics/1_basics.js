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



// ----------------------------- > DEFINITIONS -----------------------------

// Expression - any valid unit of code that resolves to a value

// Primitive data type – most basic things eg string, number, boolean
// Non-primitive data type – things that can still be broken down eg objects, functions



// ----------------------------- > DATA TYPES -----------------------------

// The latest ECMAScript standard defines eight data types:



// Seven data types that are primitives:

// Boolean.     true and false.
// null.        A special keyword denoting a null value. (Because JavaScript is case-sensitive, null is not the same as Null, NULL, or any other variant.)
// undefined.   A top-level property whose value is not defined.
// Number.      An integer or floating point number. For example: 42 or 3.14159.
// BigInt.      An integer with arbitrary precision. For example: 9007199254740992n.
// String.      A sequence of characters that represent a text value. For example: "Howdy".
// Symbol.      A data type whose instances are unique and immutable.

// and Object



// Although these data types are relatively few, they enable you to perform useful operations with your applications. 

// Functions are the other fundamental elements of the language. 
// While functions are technically a kind of object, you can think of objects as named containers for values, and functions as procedures that your script can perform.



// ----------------------------- > JAVASCRIPT METHODS -----------------------------

// actions that can be performed on objects.
// a property containing a function definition.
// Methods are functions stored as object properties.

const person = {
    firstName: "John",
    lastName: "Doe",
    id: 5566,
    // The following is a method
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};



// ----------------------------- > ERRORS -----------------------------

// Syntax errors
// These are spelling errors in your code that actually cause the program not to run at all, or stop working part way through — you will usually be provided with some error messages too.

// Logic errors
// These are errors where the syntax is actually correct but the code is not what you intended it to be, meaning that program runs successfully but gives incorrect results.



