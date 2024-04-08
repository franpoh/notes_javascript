
// Depending on the type of error, you may be able to use the name and message properties to get a more refined message.

// The name property provides the general class of Error (such as DOMException or Error), 
// while message generally provides a more succinct message than one would get by converting the error object to a string.

// If you are throwing your own exceptions, in order to take advantage of these properties (such as if your catch block doesn't discriminate between your own exceptions and system ones), 
// you can use the Error constructor.



function doSomethingErrorProne() {
    if (ourCodeMakesAMistake()) {
        throw new Error("The message");
    } else {
        doSomethingToGetAJavaScriptError();
    }
}

try {
    doSomethingErrorProne();
} catch (e) {
    // Now, we actually use `console.error()`
    console.error(e.name); // 'Error'
    console.error(e.message); // 'The message', or a JavaScript error message
}

// Output:
// ReferenceError
// ourCodeMakesAMistake is not defined