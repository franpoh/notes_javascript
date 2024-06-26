// iteration-methods.js > Array.FILTER - has a very neat promise in a class example



// Use const when you can, and use let when you have to.



// NOTE: See oop.js in Cheatsheet > coding for Object-Oriented Programming. Pay attention to > COMPOSITION OVER INHERITANCE



function clickButton() {
    let name = prompt('What is your name?');
    alert('Hello ' + name + ', nice to see you!');
}

// window.prompt() function - creates a pop-up dialog box to ask the user to answer a question, then stores the text they enter inside a given variable

// window.alert() function - display another popup containing a string we've assembled from two string literals and the name variable, via concatenation.



// ----------------------------- > <script> IN HTML HEAD -----------------------------

// async and defer both instruct the browser to download the script(s) in a separate thread, while the rest of the page is downloading, 
// so the page loading is not blocked during the fetch process.

// +++++ <script src="script.js"></script>
// No attributes
// the HTML file will be parsed until it comes to the script file
// At that point, parsing will stop and a request will be made to fetch the file (if it is external)
// The script will be executed before parsing is resumed

// +++++ <script src="script.js" defer></script>
// Defer 
// downloads the file during HTML parsing 
// only execute after the parser has completed
// guarantees the order of execution in which they appear in the page

// +++++ <script async src="script.js"></script>
// Async  
// downloads file during HTML parsing
// will pause the HTML parser to execute it as soon as the script is loaded
// doesn't guarantee the order of execution
// If your scripts should be run immediately and they don't have any dependencies, then use async. eg. loading game files while intro script is running

// for modules: 

// +++++ <script type="module" src="main.js"></script>
// There is no need to use the defer attribute when loading a module script; modules are deferred automatically.