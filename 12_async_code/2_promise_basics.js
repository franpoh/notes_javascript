// ----------------------------- > WHAT IS A PROMISE -----------------------------

// Promises are the foundation of asynchronous programming in modern JavaScript.

// A promise is an object returned by an asynchronous function, which represents the current state of the operation. 
// At the time the promise is returned to the caller, the operation often isn't finished, 
// but the promise object provides methods to handle the eventual success or failure of the operation.



// +++++ Promise Example

// We will demonstrate a promise example with Fetch, which is a promise-based API
// the Fetch API provides an interface for fetching resources (including across the network)

// You will need at least Node v18 for fetch to work in VSCode, otherwise run in browser console



// calling the fetch() API, and assigning the return value to the fetchPromise variable
var fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

// immediately after, logging the fetchPromise variable. 
// This should output something like: Promise { <state>: "pending" }, telling us that we have a Promise object, and it has a state whose value is "pending". 
// The "pending" state means that the fetch operation is still going on.
console.log(fetchPromise);

// passing a handler function into the Promise's then() method. 
// When (and if) the fetch operation succeeds, the promise will call our handler, passing in a Response object, which contains the server's response.
fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});

// logging a message that we have started the request.
console.log("Started request…");

// Promise { <state>: "pending" }
// Started request…
// Received response: 200



// Note that Started Request is logged before we receive the response. 
// Unlike a synchronous function, fetch() returns while the request is still going on, enabling our program to stay responsive. 
// The response shows the 200 (OK) status code, meaning that our request succeeded.



// ----------------------------- > PROMISE STATES -----------------------------

// A Promise is in one of these states:

// +++++ Pending
// Initial state, neither fulfilled nor rejected. 
// Result is undefined.

// +++++ Fulfilled 
// Meaning that the operation was completed successfully. 
// Result is a value.

// +++++ Rejected
// Meaning that the operation failed. 
// Result is an error object. 



// The eventual state of a pending promise can either be fulfilled with a value or rejected with a reason (error). 
// When either of these options occur, the associated handlers queued up by a promise's then method are called. 

// Note that what "succeeded" or "failed" means here is up to the API in question: 
// for example, the Fetch API considers a request successful if the server returned an error like 404 Not Found, 
// but not if a network error prevented the request being sent.

// Sometimes, we use the term settled to cover both fulfilled and rejected.
// A promise is resolved if it is settled, or if it has been "locked in" to follow the state of another promise.



// +++++ Typical Promise Syntax

myPromise
    .then((value) => { /* code for handling successful operation */ })
    .catch((error) => { /* code for handling failed operation */ });



// If the promise has already been fulfilled or rejected when a corresponding handler is attached, 
// the handler will be called, 
// so there is no *race condition between an asynchronous operation completing and its handlers being attached.

// * Race Condition: A race condition occurs when two threads access a shared variable at the same time



// A promise is said to be settled if it is either fulfilled or rejected, but not pending.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png