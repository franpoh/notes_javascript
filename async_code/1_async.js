/* 
Table of Contents

> SYNCHRONOUS PROGRAMMING
> EVENT HANDLERS
> CALLBACK
>> Callback Hell
*/



// NOTE: I think before starting on asynchronous code, you should take a look at try_catch.js 



// Asynchronous programming is a technique that enables your program to start a potentially long-running task 
// and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. 
// Once that task has finished, your program is presented with the result.



// Many functions provided by browsers, especially the most interesting ones, can potentially take a long time, and therefore, are asynchronous. For example:

// Making HTTP requests using fetch() (send a request message to a remote server, and it sends us back a response)
// Accessing a user's camera or microphone using getUserMedia()
// Asking a user to select files using showOpenFilePicker()



// ----------------------------- > SYNCHRONOUS PROGRAMMING -----------------------------

// With synchronous programming, the browser effectively steps through the program one line at a time, in the order we wrote it. 
// At each point, the browser waits for the line to finish its work before going on to the next line. 
// It has to do this because each line depends on the work done in the preceding lines.

// The basic problem with long-running synchronous functions is that while the function is running, 
// our program is completely unresponsive: you can't type anything, click anything, or do anything else.



// ----------------------------- > EVENT HANDLERS -----------------------------

// Event handlers are really a form of asynchronous programming: 
// you provide a function (the event handler) that will be called, not right away, but whenever the event happens. 

// If "the event" is "the asynchronous operation has completed", 
// then that event could be used to notify the caller about the result of an asynchronous function call.



// For example, the XMLHttpRequest API enables you to make HTTP requests to a remote server using JavaScript. 
// Since this can take a long time, it's an asynchronous API, 
// and you get notified about the progress and eventual completion of a request by attaching event listeners to the XMLHttpRequest object.

// Run this in browser console as XMLHttpRequest only works in browsers

function callToServer() { // 1. Start the HTTP request process

    const xhr = new XMLHttpRequest(); // 2A. Create new HTTP request

    xhr.addEventListener("loadend", () => { // 3A. listening for loadend event, which is fired when a request has completed
        console.log(`Finished with status: ${xhr.status}`); // 3B. updates log.textContent 'Finished with status: 200'
    });

    xhr.open( // 2B. Starts a new request...
        "GET", // ... to get data...
        "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json" // ... from server
    );

    xhr.send(); // 2C. sends the request to get data from server, to the server

    console.log(`Started XHR request`); // 2D. updates log.textContent 'Started XHR request' 

};

callToServer();

// 'Started XHR request'
// 'Finished with status: 200'

// 1. Run the function to send a request. 
// 2A, 2B, 2C. We create a new XMLHttpRequest and listen for its loadend event (As seen in 3A)
// 2D. Meanwhile, we log "Started XHR request"
// 3A, 3B. When the loadend event is fired, the handler logs a "Finished!" message along with the status code.

// Note Step 2D, when we are able to log 'Started XHR request' while the request itself is running
// this shows that our program can continue to run while the request is going on, and our event handler will be called when the request is complete.



// ----------------------------- > CALLBACK -----------------------------

// An event handler is a particular type of callback. 
// A callback is just a function that's passed into another function, with the expectation that the callback will be called at the appropriate time. 
// As we just saw, callbacks used to be the main way asynchronous functions were implemented in JavaScript.

// However, callback-based code can get hard to understand when the callback itself has to call functions that accept a callback. 
// This is a common situation if you need to perform some operation that breaks down into a series of asynchronous functions.



// ----- Synchronous Example
// A straightforward single operation that's split into three steps, where each step depends on the last step

function doStep1(init) {
    return init + 1;
}

function doStep2(init) {
    return init + 2;
}

function doStep3(init) {
    return init + 3;
}

function doOperation() {
    let result = 0;
    result = doStep1(result);
    result = doStep2(result);
    result = doStep3(result);
    console.log(`result: ${result}`);
}

doOperation(); // result: 6



// ----- Callback Example
// We rewrite the previous example using callbacks

function doStep1(init, callback) {
    const result = init + 1;
    callback(result);
}

function doStep2(init, callback) {
    const result = init + 2;
    callback(result);
}

function doStep3(init, callback) {
    const result = init + 3;
    callback(result);
}

function doOperation() {
    doStep1(0, (result1) => {
        doStep2(result1, (result2) => {
            doStep3(result2, (result3) => {
                console.log(`result: ${result3}`);
            });
        });
    });
}

doOperation(); // result: 6



// Because we have to call callbacks inside callbacks, 
// we get a deeply nested doOperation() function, which is much harder to read and debug. 
// This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation looks like a pyramid on its side).

// When we nest callbacks like this, it can also get very hard to handle errors: 
// often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.

// For these reasons, most modern asynchronous APIs don't use callbacks. 
// Instead, the foundation of asynchronous programming in JavaScript is the Promise



// ----------------------------- > CALLBACK >> Callback Hell

// callback hell is when people try to write JavaScript in a way where execution happens visually from top to bottom.

// The most important aspect of avoiding callback hell is moving functions out of the way 
// so that the program flow can be more easily understood 
// without newcomers having to wade through all the detail of the functions to get to the meat of what the program is trying to do.



// You can start by separating out a long function into different components

// ----- Instead of this:

function submitForm() {
    /* Long code for sending form details to database */
    /* Long code for navigating to user account page */
    /* Long code for displaying a welcome message */
}

// ----- Do this:

function submitForm() {
    /* Long code for sending form details to database */
}

function navigateUser() {
    /* Long code for navigating to user account page */
}

function displayWelcomeMsg() {
    /* Long code for displaying a welcome message */
}

function submissionDone() {
    submitForm();
    navigateUser();
    displayWelcomeMsg();
}



// You can then export individual functions into standalone files, and import them to your selected file for use (See Modularization repo)

// Another advantage is that these individual functions can be reused elsewhere if needed



// NOTE: 

// don’t stack too much code into a single object

// Don't nest functions. Give them names and place them at the top level of your program

// A good module is small and focuses on one problem

// Individual files in a module should not be longer than around 150 lines of JavaScript

// If it takes more than a few minutes to understand what is happening, it probably isn't a very good module.

// Handle every single error and make your code stable