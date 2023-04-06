// Table of Contents

// > EXPLANATIONS & MEANINGS
// > JAVASCRIPT METHODS
// > <script> IN HTML HEAD
// > ERRORS



// ----------------------------- > EXPLANATIONS & MEANINGS -----------------------------

// JavaScript is a "dynamically typed language", 
// which means that, unlike some other languages, you don't need to specify what data type a variable will contain (numbers, strings, arrays, etc). 

// Expression - any valid unit of code that resolves to a value

// Primitive data type – most basic things eg string, number, boolean
// Non-primitive data type – things that can still be broken down eg objects, functions



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



// ----------------------------- > <script> IN HTML HEAD -----------------------------

// async and defer both instruct the browser to download the script(s) in a separate thread, while the rest of the page is downloading, 
// so the page loading is not blocked during the fetch process.

{/* <script src="script.js"></script> */}
// No attributes
// the HTML file will be parsed until it comes to the script file
// At that point, parsing will stop and a request will be made to fetch the file (if it is external)
// The script will be executed before parsing is resumed

{/* <script src="script.js" defer></script> */}
// Defer 
// downloads the file during HTML parsing 
// only execute after the parser has completed
// guarantees the order of execution in which they appear in the page

{/* <script async src="script.js"></script> */}
// Async  
// downloads file during HTML parsing
// will pause the HTML parser to execute it as soon as the script is loaded
// doesn't guarantee the order of execution
// If your scripts should be run immediately and they don't have any dependencies, then use async. eg. loading game files while intro script is running

// for modules: 
{/* <script type="module" src="main.js"></script> */}
// There is no need to use the defer attribute when loading a module script; modules are deferred automatically.



// ----------------------------- > ERRORS -----------------------------

// Syntax errors
// These are spelling errors in your code that actually cause the program not to run at all, or stop working part way through — you will usually be provided with some error messages too.

// Logic errors
// These are errors where the syntax is actually correct but the code is not what you intended it to be, meaning that program runs successfully but gives incorrect results.



