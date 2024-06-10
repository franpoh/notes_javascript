/* CURRENTLY UNDER CONSTRUCTION */

/* 
Table of Contents
*/



// A Promise is an object representing the eventual completion or failure of an asynchronous operation. 

// NOTE: Since most people are consumers of already-created promises, 
// this section will explain consumption of returned promises before explaining how to create them.



// ----------------------------- > DIFFERENCE BETWEEN CALLBACK AND PROMISE -----------------------------

// With the use of callbacks to implement asynchronous functions, 
// you call the asynchronous function, passing in your callback function. 
// The function returns immediately and calls your callback when the operation is finished.

// A promise is a returned object to which you attach callbacks, instead of passing callbacks into a function
// The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.



// Imagine a function, submitForm(), 
// which asynchronously submits a form when given user details, and two callback functions: 
// one called if the form submission is successful, and the other called if an error occurs.

function successCallback(result) {
    console.log(`Form Submitted`);
}

function failureCallback(error) {
    console.error(`Error Submitting Form`);
}

submitForm(userDetails, successCallback, failureCallback);

// If submitForm() were rewritten to return a promise, you would attach your callbacks to it instead:

submitForm(userDetails) // this returns a promise
    // attaching callbacks to the promise 
    .then(successCallback)
    .catch(failureCallback);


// ----------------------------- > CHAINING -----------------------------

// A common need is to execute two or more asynchronous operations back to back, 
// where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. 



// +++++ Callback Example

// In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom:

// We will demonstrate the callback example with XMLHttpRequest, which is a callback-based API
// Run this in browser console as XMLHttpRequest only works in browsers

const req = new XMLHttpRequest();

function doStep1(req1, callback) {
    console.log('Started Request');
    req1.open("GET", "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
    req1.send();
    callback(req1);
}

function doStep2(req2, callback) {
    console.log('Request Pending');
    callback(req2);
}

function doStep3(req3, callback) {
    // listening for loadend event, which is fired when a request has completed
    req3.addEventListener("loadend", () => {
        callback(req3);
    });
}

function errorHandler() {
    console.log(`An error has occured`);
}

function doOperation() {
    doStep1(req, (res1) => {
        doStep2(res1, (res2) => {
            doStep3(res2, (res3) => {
                console.log(`Finished with status: ${res3.status}`);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
}

doOperation();

// Started Request
// Request Pending
// Finished with status: 200



// +++++ Promise Example

// With promises, we accomplish this by creating a promise chain. 

// The API design of promises makes this great, 
// because callbacks are attached to the returned promise object, instead of being passed into a function.



// We will demonstrate the promise example with Fetch, which is a promise-based API

// This is just a very simple promise that returns a URL for demonstrating how .then works
// We'll learn about creating our own promises a bit later
var fetchPromise = new Promise((resolve) => {
    resolve("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
});

fetchPromise
    .then((res1) => { // equivalent to doStep1
        console.log('Started Request');
        return fetch(res1)
    })
    .then((res2) => { // equivalent to doStep2
        console.log('Request Pending');
        return res2;
    })
    .then((res3) => { // equivalent to doStep3's callback. doStep3's loadend event listener is not needed here. 
        console.log(`Finished with status: ${res3.status}`);
    })
    .catch(() => {
        console.log(`An error has occurred`);
    })

// Started Request
// Request Pending
// Finished with status: 200



// Here's the magic: the then() function returns a new promise, different from the original:

const promise = doSomething();
const secondPromise = promise.then(successCallback, failureCallback);

// This second promise (secondPromise) represents the completion not just of doSomething(), 
// but also of the successCallback or failureCallback you passed in — which can be other asynchronous functions returning a promise. 
// When that's the case, any callbacks added to secondPromise get queued behind the promise returned by either successCallback or failureCallback.



// With this pattern, you can create longer chains of processing, 
// where each promise represents the completion of one asynchronous step in the chain. 

// In addition, the arguments to then are optional, 
// and 'catch(failureCallback)' is short for 'then(null, failureCallback)' — 
// so if your error handling code is the same for all steps, you can attach it to the end of the chain:



var fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
    .then(function (result1) { // Step 1
        console.log('Response received with status ', result1.status);
        return result1;
    })
    .then(function (result2) { // Step 2
        let res = result2.json(); // json() used to parse the JSON response to a Javascript object
        console.log('Res as of now: ', res); // Promise { <state>: "pending" } ...
        return res;
    })
    .then(function (result3) { // Step 3
        console.log('Res when passed to the next .then: ', result3); // Array(12) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]
        console.log('First item in the array: ', result3[0]);
    })
    .catch(function (error) {
        console.log(`Operation Failed: ${error}`);
    });

// Response received with status 200
// Res as of now: Promise { <state>: "pending" } ...
// Res when passed to the next .then: Array(12) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ]
// First item in the array: Object { name: "baked beans", price: 0.4, image: "beans.jpg", type: "vegetables" } ...



// NOTE: A short side note here about how a seemingly same item (res) has 2 different values depending on where it is

// Definition of Response: json() method by MDN: 
// The json() method of the Response interface takes a Response stream and reads it to completion. 
// It returns a promise which resolves with the result of parsing the body text as JSON, with the result being a Javascript object

// Because we are dealing with json() - which is asynchronous - there is no waiting around for responses. Code continues to execute.

// therefore, in Step 2
// instead of waiting for waiting for result2.json() to resolve, the console.log logs a promise that is pending

// The promise will resolve in Step 3, and the console.log will log an array
// thus we can now access the value of the item that we fetched from the server



// NOTE: For the following examples, please note that with arrow functions, '() => x' is short for '() => { return x; }'

// The above example expressed with arrow functions instead:


var fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
    .then((result1) => {
        console.log('Response received with status ', result1.status);
        return result1;
    })
    .then((result2) => {
        let res = result2.json();
        console.log('Res as of now: ', res);
        return res;
    })
    .then((result3) => {
        console.log('Res when passed to the next .then: ', result3);
        console.log('First item in the array: ', result3[0]);
    })
    .catch((error) => {
        console.log(`Operation Failed: ${error}`);
    });



// ----------------------------- > CHAINING >> Always Return Results

// NOTE: Important: Always return results, otherwise callbacks won't catch the result of a previous promise 
// If the previous handler started a promise but did not return it, 
// there's no way to track its settlement anymore, and the promise is said to be "floating".

var fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
    .then((result1) => {
        let res = result1.json();
        // Commented out the return statement
        // return res;
    })
    .then((result2) => {
        console.log('First item in the array: ', result2[0].name); // TypeError: Cannot read properties of undefined (reading '0')
        // There's no way to know the return value of the fetch() call anymore, or whether it succeeded at all.
    })



// This may be worse if you have race conditions — 
// if the promise from the last handler is not returned, the next then handler will be called early, and any value it reads may be incomplete.

var listOfIngredients = [];

var fetchPromise = new Promise((resolve) => {
    resolve("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
});

fetchPromise
    .then((url) => { // note the curly brackets, before an explicit return is needed
        // Note the lack of a return statement
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                listOfIngredients.push(data);
            });
    })
    .then(() => {
        console.log(listOfIngredients); // Always [], because the fetch request hasn't completed yet.
    });



// Therefore, as a rule of thumb, whenever your operation encounters a promise, return it and defer its handling to the next then handler.

var listOfIngredients = [];

var fetchPromise = new Promise((resolve) => {
    resolve("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
});

fetchPromise
    .then((url) => // note the lack of curly brackets, making the return implicit
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                listOfIngredients.push(data);
            }),
    )
    .then(() => {
        console.log(listOfIngredients);
    });

// OR

var listOfIngredients = [];

var fetchPromise = new Promise((resolve) => {
    resolve("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
});

fetchPromise
    // note the lack of curly brackets, making the return implicit
    .then((url) => fetch(url))
    .then((res) => res.json())
    .then((data) => {
        listOfIngredients.push(data);
    })
    .then(() => {
        console.log(listOfIngredients);
    });



// ----------------------------- > CHAINING >> Nesting

// In the two examples above, 
// the first one has one promise chain nested in the return value of another then() handler, 
// while the second one uses an entirely flat chain. 

// Simple promise chains are best kept flat without nesting, as nesting can be a result of careless composition.



// Nesting is a control structure to limit the scope of catch statements. 
// Specifically, a nested catch only catches failures in its scope and below, not errors higher up in the chain outside the nested scope. 
// When used correctly, this gives greater precision in error recovery:



// Created promises for purpose of demonstrating nesting catch - no need to pay too much attention

const whatNum = new Promise((resolve, reject) => {
    const num = Math.floor(Math.random() * 10) + 1; // Generate a number 1-10
    num >= 5 ? resolve(num) : reject(num);

});

function fiveIsError(num) {
    return new Promise((resolve, reject) => num > 5 ? resolve(num) : reject(num))
}

function sixIsError(num) {
    return new Promise((resolve, reject) => num > 6 ? resolve(num) : reject(num))
}

function add10(num) {
    let res = num + 10;
    console.log(`Added 10 to the number: ${res}`);
    return res;
}

function errorMsg(num) {
    num === 6 || num === 5 ? console.log(`Error: Equal to ${num}`) : console.log(`Error: ${num} is less than 5`);
    return num;
}

// Pay attention to this part - the nesting .then and .catch

whatNum
    .then((result) =>
        fiveIsError(result)
            .then((optionalResult) => sixIsError(optionalResult))
            .catch((optionalError) => errorMsg(optionalError))
    ) // Ignore if optional stuff fails; proceed.
    .then((finalResult) => {
        add10(finalResult);
    })
    .catch((error) => errorMsg(error));

// Note that the optional steps here are nested — 
// with the nesting caused not by the indentation, but by the placement of the outer ( and ) parentheses around the steps.

// The inner error-silencing catch handler only catches failures from fiveIsError() and sixIsError(), 
// after which the code resumes with whatNum().

// Importantly, if whatNum() fails, its error is caught by the final(outer) catch only, 
// and does not get swallowed by the inner catch handler.



// ----------------------------- > CHAINING >> Chaining After A Catch

// It's possible to chain after a failure, i.e. a catch, 
// which is useful to accomplish new actions even after an action failed in the chain.

new Promise((resolve, reject) => {
    console.log("Initial");
    resolve();
})
    .then(() => {
        throw new Error("Something failed");
        console.log("Do this");
    })
    .catch(() => {
        console.error("Do that");
    })
    .then(() => {
        console.log("Do this, no matter what happened before");
    });

// This will output the following text:

// Initial
// Do that
// Do this, no matter what happened before



// ----------------------------- > CHAINING >> Common Mistakes

// Here are some common mistakes to watch out for when composing promise chains. 

// +++++ Bad example - Spot 3 mistakes

doSomething()
    .then(function (result) {
        // Forgot to return promise from inner chain + unnecessary nesting
        doSomethingElse(result).then((newResult) => doThirdThing(newResult));
    })
    .then(() => doFourthThing());
// Forgot to terminate chain with a catch!



// The first mistake is to not chain things together properly. 
// This happens when we create a new promise but forget to return it. 
// As a consequence, the chain is broken — or rather, we have two independent chains racing. 

// This means doFourthThing() won't wait for doSomethingElse() or doThirdThing() to finish, and will run concurrently with them — which is likely unintended. 
// Separate chains also have separate error handling, leading to uncaught errors.



// The second mistake is to nest unnecessarily, enabling the first mistake. 
// Nesting also limits the scope of inner error handlers, which — if unintended — can lead to uncaught errors. 

// A variant of this is the promise constructor anti-pattern, 
// which combines nesting with redundant use of the promise constructor to wrap code that already uses promises.



// The third mistake is forgetting to terminate chains with catch. 
// Unterminated promise chains lead to uncaught promise rejections in most browsers. 
// See error handling below.



// A good rule of thumb is to always either return or terminate promise chains, 
// and as soon as you get a new promise, return it immediately, to flatten things:

doSomething()
    .then(function (result) {
        // If using a full function expression: return the promise
        return doSomethingElse(result);
    })
    // If using arrow functions: omit the braces and implicitly return the result
    .then((newResult) => doThirdThing(newResult))
    // Even if the previous chained promise returns a result, the next one doesn't necessarily have to use it. 
    // You can pass a handler that doesn't consume any result.
    .then((/* result ignored */) => doFourthThing())
    // Always end the promise chain with a catch handler to avoid any unhandled rejections!
    .catch((error) => console.error(error));

// Note that () => x is short for () => { return x; }.

// Now we have a single deterministic chain with proper error handling.

// Using async/await addresses most, if not all of these problems — the tradeoff being that it may be easy to forget the await keyword.
// We will take a look at async/await later



// ----------------------------- > ERROR HANDLING -----------------------------

// You might recall seeing errorHandler three times in the pyramid of doom earlier
// compared to only once at the end of the promise chain

var fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
);

fetchPromise
    .then((result) => {
        console.log(`Finished with status: ${result.status}`);
        return result;
    })
    .catch((error) => {
        console.log(`Error occured with status: ${error.status}`);
    });



// If there's an exception, the browser will look down the chain for .catch() handlers or onRejected. 
// This is very much modeled after how synchronous code works

// See try_catch.js

try {
    const result = await fetch(/* url */);
    if (result.status === 200) console.log(`Finished with status: ${result.status}`);
    else throw result;
} catch (error) {
    console.log(`Error occured with status: ${error.status}`);
}



// This symmetry with asynchronous code culminates in the async/await syntax:

// See FIXME: fill in with whatever reference

async function asyncPromise() {
    try {
        const result = await fetch(
            "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json"
        );
        if (result.status === 200) console.log(`Finished with status: ${result.status}`);
        else throw result;

    } catch (error) {
        console.log(`Error occured with status: ${error.status}`);
    }
}

asyncPromise();



// It builds on promises — 
// there's minimal refactoring needed to change from promises to async/await. 

// Promises solve a fundamental flaw with the callback pyramid of doom, 
// by catching all errors, even thrown exceptions and programming errors. 
// This is essential for functional composition of asynchronous operations.



// ----------------------------- > ERROR HANDLING >> Promise Rejection Events

// // If a promise rejection event is not handled by any handler, 
// it bubbles to the top of the call stack, and the host needs to surface it. 



// On the web, whenever a promise is rejected, one of two events is sent to the global scope 
// (generally, this is either the window or, if being used in a web worker, it's the Worker or other worker-based interface). 

// The two events are:

// +++++ unhandledrejection
// Sent when a promise is rejected but there is no rejection handler available.

// +++++ rejectionhandled
// Sent when a handler is attached to a rejected promise that has already caused an unhandledrejection event.



// In both cases, the event (of type PromiseRejectionEvent) has as members 
// a promise property indicating the promise that was rejected, 
// and a reason property that provides the reason given for the promise to be rejected.

// These make it possible to offer fallback error handling for promises, 
// as well as to help debug issues with your promise management.
// NOTE: These handlers are global per context, so all errors will go to the same event handlers, regardless of source.



// In Node.js, handling promise rejection is slightly different.
// You capture unhandled rejections by adding a handler for the Node.js unhandledRejection event (notice the difference in capitalization of the name)

process.on("unhandledRejection", (reason, promise) => {
    // Add code here to examine the "promise" and "reason" values
});



// +++++ Example

var uncaughtError = new Promise((resolve, reject) => {
    let reqStatus = 400;
    reqStatus === 200 ? resolve(200) : reject(400);
})

uncaughtError
    .then((result) => {
        console.log(`Resolved with status: ${result}`);
    })
// .catch((error) => {
//     console.log(`Rejected with status: ${error}`);
// });

process.on("unhandledRejection", (reason, promise) => {
    console.log(`unhandledRejection Reason: ${reason}`); // unhandledRejection Reason: 400
    console.log(`unhandledRejection Promise: ${promise}`); // unhandledRejection Promise: [object Promise]
});



// NOTE: 

// For Node.js, to prevent the error from being logged to the console (the default action that would otherwise occur), 
// adding that process.on() listener is all that's necessary; 
// there's no need for an equivalent of the browser runtime's preventDefault() method.

// However, if you add that process.on listener but don't also have code within it to handle rejected promises, 
// they will just be dropped on the floor and silently ignored. 
// So ideally, you should add code within that listener to examine each rejected promise and make sure it was not caused by an actual code bug.



// ----------------------------- > COMBINING MULTIPLE PROMISES -----------------------------

// There are four composition tools for running asynchronous operations concurrently: 

// Promise.all()
// Promise.allSettled()
// Promise.any()
// Promise.race()



// ----------------------------- > COMBINING MULTIPLE PROMISES >> Concurrent Composition Examples

// We can start operations at the same time and wait for them all to finish like this:

var prom1 = () => Promise.resolve('Promise 1');
var prom2 = () => Promise.resolve('Promise 2');
var prom3 = () => Promise.resolve('Promise 3');

Promise.all([prom1(), prom2(), prom3()]).then((values) => {
    console.log(values);
});

// [ 'Promise 1', 'Promise 2', 'Promise 3' ]



// If one of the promises in the array rejects, 
// Promise.all() immediately rejects the returned promise and aborts the other operations. 

var prom1 = () => Promise.resolve('Promise 1');
var prom2 = () => Promise.reject('Promise 2'); // added a reject here to stimulate an error
var prom3 = () => Promise.resolve('Promise 3');

Promise.all([prom1(), prom2(), prom3()]).then((values) => {
    console.log(values);
}).catch((error) => {
    console.log(`An error has occurred: ${error}`);
})

// An error has occurred: Promise 2



// This may cause unexpected state or behavior. 
// Promise.allSettled() is another composition tool that ensures all operations are complete before resolving.

// These methods all run promises concurrently — 
// a sequence of promises are started simultaneously and do not wait for each other. 



// ----------------------------- > COMBINING MULTIPLE PROMISES >> Sequential Composition Examples

// Sequential composition is possible using some clever JavaScript:

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

// For further explanation, see > COMBINING MULTIPLE PROMISES >> Sequential Composition Examples >>> Using Array.Reduce For Sequential Composition
[prom1, prom2, prom3]
    .reduce((p, f) => p.then(f), Promise.resolve())

// Promise 1
// Promise 2
// Promise 3



// In this example, we reduce an array of asynchronous functions down to a promise chain. 
// The code above is equivalent to:

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

Promise.resolve()
    .then(prom1)
    .then(prom2)
    .then(prom3)

// Promise 1
// Promise 2
// Promise 3



// ----------------------------- > COMBINING MULTIPLE PROMISES >> Sequential Composition Examples >>> Using Array.Reduce For Sequential Composition

// NOTE: Why Promise.resolve() is needed as an initial value in the reduce function 

// For an explanation on initial value, see array/iteration_method.js > ARRAY.REDUCE



// Promise.resolve() is being used as the initial value in the reduce function

// In the below example, the Promise.resolve() initial value is removed

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

[prom1, prom2, prom3]
    .reduce((p, f) => p.then(f));

// TypeError: p.then is not a function



// The error occurs because prom1, as the first 'p', needs to execute in order to return a promise that .then can act on

// The below example shows clearly that the function runs properly when prom1 is called by adding ()

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

[prom1(), prom2, prom3]
    .reduce((p, f) => p.then(f));

// Promise 1
// Promise 2
// Promise 3



// The easiest and most convenient way to handle the issue is to add Promise.resolve() as an initial value
// giving the first loop of 'p.then' a return promise (but no return resolve/reject value) to work with 
// before moving on to the promises in the array



// ----------------------------- > COMBINING MULTIPLE PROMISES >> Sequential Composition Examples >>> Reusable Compose Function

// This can be made into a reusable compose function, which is common in functional programming:

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

const applyAsync = (p, f) => p.then(f);

const composeAsync =
    (...funcs) =>
        (x) =>
            funcs.reduce(applyAsync, Promise.resolve(console.log(x)));


// The composeAsync() function accepts any number of functions as arguments 
// and returns a new function that accepts an initial value to be passed through the composition pipeline:

const transformData = composeAsync(prom1, prom2, prom3);

transformData('Promise 0');

// Promise 0
// Promise 1
// Promise 2
// Promise 3



// ----------------------------- > COMBINING MULTIPLE PROMISES >> Sequential Composition Examples >>> Async / Await

// Sequential composition can also be done more succinctly with async / await:

var prom1 = () => Promise.resolve(console.log('Promise 1'));
var prom2 = () => Promise.resolve(console.log('Promise 2'));
var prom3 = () => Promise.resolve(console.log('Promise 3'));

async function promSeq() {
    for (const p of [prom1, prom2, prom3]) {
        await p();
    }
}

promSeq();

// Promise 1
// Promise 2
// Promise 3



// However, before you compose promises sequentially, consider if it's really necessary — 
// it's always better to run promises concurrently so that they don't unnecessarily block each other 
// unless one promise's execution depends on another's result.



// ----------------------------- > PROMISE.ALL() -----------------------------

// The Promise.all() method is one of the promise concurrency methods. 

// It can be useful for aggregating the results of multiple promises. 
// It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully 
// — all of whom we want to fulfill before the code execution continues.



// Promise.all() will reject immediately upon any of the input promises rejecting. 

// In comparison, the promise returned by Promise.allSettled() will wait for all input promises to complete, regardless of whether or not one rejects.
// NOTE: Use allSettled() if you need the final result of every promise in the input iterable.



// The Promise.all() static method takes an iterable of promises as input and returns a single Promise. 

// This returned promise fulfills when all of the input's promises fulfill (including when an empty iterable is passed), with an array of the fulfillment values. 
// It rejects when any of the input's promises rejects, with this first rejection reason.

var prom1 = () => Promise.resolve('Promise 1');
var prom2 = () => Promise.resolve('Promise 2'); // resolve Promise 2
// var prom2 = () => Promise.reject('Promise 2'); // reject Promise 2 to stimulate error
var prom3 = () => Promise.resolve('Promise 3');

Promise.all([prom1(), prom2(), prom3()]) // An iterable (such as an Array) of promises.
    .then((values) => {
        console.log(values); // [ 'Promise 1', 'Promise 2', 'Promise 3' ]
    })
    .catch((error) => {
        console.log(`An error has occurred: ${error}`); // An error has occurred: Promise 2
    })



// The return value is a Promise that is:

// Already fulfilled, if the iterable passed is empty.

// Asynchronously fulfilled, when all the promises in the given iterable fulfill. 
// The fulfillment value is an array of fulfillment values, in the order of the promises passed, regardless of completion order. 
// If the iterable passed is non-empty but contains no pending promises, the returned promise is still asynchronously (instead of synchronously) fulfilled.

// Asynchronously rejected, when any of the promises in the given iterable rejects. 
// The rejection reason is the rejection reason of the first promise that was rejected.



// +++++ Example

// Promise.all waits for all fulfillments (or the first rejection).
// in the order of the promises passed, regardless of completion order

var p1 = Promise.resolve(3);

var p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 1000); // delayed for 1 second
});

var p3 = 1337;

Promise.all([p1, p2, p3]).then((values) => {
    console.log(values); // [ 3, 'foo', 1337 ]
});



// +++++ Example

// If the iterable contains non-promise values, they will be ignored, 
// but still counted in the returned promise array value (if the promise is fulfilled)

var p = Promise.all([1, 2, 3]); // All values are non-promises, so the returned promise gets fulfilled

var p2 = Promise.all([1, 2, 3, Promise.resolve(444)]); // The only input promise is already fulfilled, so the returned promise gets fulfilled

var p3 = Promise.all([1, 2, 3, Promise.reject(555)]) // One (and the only) input promise is rejected, so the returned promise gets rejected
    .catch((error) => {
        return error;
    });


setTimeout(() => { // Using setTimeout, we can execute code after the queue is empty
    console.log(p);
    console.log(p2);
    console.log(p3);
});

// Promise { [ 1, 2, 3 ] }
// Promise { [ 1, 2, 3, 444 ] }
// Promise { 555 }



// ----------------------------- > PROMISE.ALL() >> Asynchronicity Or Synchronicity Of Promise.all

// This following example demonstrates the asynchronicity of Promise.all when a non-empty iterable is passed:

// Passing an array of promises that are already resolved, to trigger Promise.all as soon as possible
var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

var p = Promise.all(resolvedPromisesArray);

// Immediately logging the value of p
console.log(p);

// Using setTimeout, we can execute code after the queue is empty
setTimeout(() => {
    console.log("the queue is now empty");
    console.log(p);
});

// Promise { <pending> }
// the queue is now empty
// Promise { [ 33, 44 ] }



// The same thing happens if Promise.all rejects:

var mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];

var p = Promise.all(mixedPromisesArray)
    .catch((error) => {
        return error;
    });

console.log(p);

setTimeout(() => {
    console.log("the queue is now empty");
    console.log(p);
});

// Promise { <pending> }
// the queue is now empty
// Promise { 44 }



// Promise.all resolves synchronously if and only if the iterable passed is empty:

var p = Promise.all([]); // Will be immediately resolved

var p2 = Promise.all([1337, "hi"]); // Non-promise values are ignored, but the evaluation is done asynchronously

console.log(p);

console.log(p2);

setTimeout(() => {
    console.log("the queue is now empty");
    console.log(p2);
});

// Promise { [] }
// Promise { <pending> }
// the queue is now empty
// Promise { [ 1337, 'hi' ] }



// ----------------------------- > PROMISE.ALL() >> Using Promise.all() With Async Functions




















// You don't "declare" promises. new Promise creates a promise and calls the executor function you pass it. You do that when you want the work the executor does to be started (right then), not later.

// If you want to define something that will do something returning a promise but not start it yet, simply put it in a function

// A JavaScript Promise object contains both the producing code and calls to the consuming code:

// Promise Syntax
let thePromise = new Promise(function (myResolve, myReject) {

    // "Producing Code" (May take some time)

    myResolve(); // when successful
    myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
thePromise.then(
    function (value) { /* code if successful */ },
    function (error) { /* code if some error */ }
);

// +++++ Example

let p = new Promise((resolve, reject) => {
    let a = 1 + 2;
    if (a == 2) {
        resolve('Success');
    } else {
        reject('Failure')
    }
})

p.then((message) => { // anything inside .then will run for 'resolve'
    console.log('Promise resolved, ' + message);
}).catch((message) => { // catch is for errors
    console.log('Promise unresolved, ' + message);
}) // Promise unresolved, Failed

// +++++ Example of a promise inside a function

function watchTutorialPromise() {
    let userLeft = false
    let userWatchingCatMeme = false
    return new Promise((resolve, reject) => {
        if (userLeft) {
            reject({
                name: 'User Left',
                message: ':('
            })
        } else if (userWatchingCatMeme) {
            reject({
                name: 'User Watching Cat Meme',
                message: 'WebDevSimplified < Cat'
            })
        } else {
            resolve('Thumbs up and Subscribe')
        }
    })
}

watchTutorialPromise().then(message => {
    console.log(message)
}).catch(error => {
    console.log(error.name + ' ' + error.message)
})

// +++++ Example of Promise with then and also async

class Database {
    #data = [
        {
            name: "Ivan",
            age: 30,
            gender: "m",
        },
        {
            name: "Christopher",
            age: 34,
            gender: "m",
        },
        {
            name: "Cheryl",
            age: 29,
            gender: "f",
        },
        {
            name: "Kelly",
            age: 27,
            gender: "f",
        },
    ];

    fetch() {
        return new Promise((resolve) => {
            resolve(this.#data);
        });
    }

    filter(prop, value) {
        return new Promise((resolve) => {
            resolve(this.#data.filter(person => person[prop] === value));
        });
    }
}

// Code Block Then
const db = new Database();
db.fetch().then((r) => console.log("fetch() returns", r));
db.filter("gender", "f").then((r) => console.log("filter() returns", r));

// Code Block Async
async function outPut() {
    const resultFet = await db.fetch();
    console.log("fetch() returns", resultFet);
    const resultFil = await db.filter("gender", "f");
    console.log("filter() returns", resultFil);
}

outPut();

// fetch() returns [
//         { name: 'Ivan', age: 30, gender: 'm' },
//         { name: 'Christopher', age: 34, gender: 'm' },
//         { name: 'Cheryl', age: 29, gender: 'f' },
//         { name: 'Kelly', age: 27, gender: 'f' }
//     ]

//     filter() returns [
//         { name: 'Cheryl', age: 29, gender: 'f' },
//         { name: 'Kelly', age: 27, gender: 'f' }
//     ]

// When the executing code obtains the result, it should call one of the two callbacks:
// Success - myResolve(result value)
// Error - myReject(error object)

// Promise Object Properties

// A JavaScript Promise object can be:
// Pending
// Fulfilled
// Rejected

// The Promise object supports two properties: state and result.
// While a Promise object is "pending" (working), the result is undefined.
// When a Promise object is "fulfilled", the result is a value.
// When a Promise object is "rejected", the result is an error object.

// You cannot access the Promise properties state and result.
// You must use a Promise method to handle promises.

// Here is how to use a Promise
myPromise.then(
    function (value) { /* code if successful */ },
    function (error) { /* code if some error */ }
);

// Promise.then() takes two arguments, a callback for success and another for failure.
// Both are optional, so you can add a callback for success or failure only.

function myDisplayer(some) {
    document.getElementById("demo").innerHTML = some;
}

let thisPromise = new Promise(function (myResolve, myReject) {
    let x = 0;

    // The producing code (this may take some time)

    if (x == 0) {
        myResolve("OK");
    } else {
        myReject("Error");
    }
});

thisPromise.then(
    function (value) { myDisplayer(value); },
    function (error) { myDisplayer(error); }
);

// ----------------------------- Async / Await -----------------------------

// Async Syntax
// The keyword async before a function makes the function return a promise:

// Await Syntax
// The keyword await before a function makes the function wait for a promise:\
// any lines after 'await' will wait
// The await keyword can only be used inside an async function.

function doSomething(mockReject) {
    return new Promise((resolve, reject) => {
        if (mockReject) {
            reject('rejected');
        } else {
            resolve('done');
        }
    });
}

// When async/await keyword is used, it is best practice to surround it with try-catch.
async function start() { // "async" keyword is declared with the function
    try { // "await" keyword is used at the code that returns a promise
        const res = await doSomething(true); // toggle boolean to resolve or reject
        console.log('res', res);
    } catch (err) {
        console.log('err', err);
    }
}

start();

// another 

function handle(isError) {
    return new Promise((resolve, reject) => {
        if (isError) {
            throw new Error("Mock error");
        }
        resolve("handled");
    })
}

async function test() {
    try {
        await handle(true);
    }
    catch (err) {
        console.log(`Rejected! ${err}`);
    }
    console.log(handle());
}

test();

// +++++ More Example

function pay(isSuccess) {
    return new Promise((resolve) => {
        resolve(isSuccess);
    })
}

function sendInvoice() {
    return new Promise(r => {
        r("email sent");
    });
}

function updateDelivery() {
    return new Promise(r => {
        r("updated");
    })
}

async function start() {

    // Wait for pay() to respond before moving on.
    let isSuccess = await pay(false); // toggle argument
    console.log("isSuccess", isSuccess);

    if (isSuccess) {

        // Send Invoice (don't have to wait for response)
        sendInvoice().then((msg) => {
            console.log(msg);
        }).catch(err => {
            console.error(err);
        })

        // Update Delivery (don't have to wait for response)
        updateDelivery().then(msg => {
            console.log(msg);
        }).catch(err => {
            console.error(err);
        })
    }

}

start(); // isSuccess false

// +++++ Even More Examples

const messages = [
    {
        to: "91234567",
        message: "Hello"
    },
    {
        to: "91111111",
        message: "See you"
    },
    {
        to: "92222222",
        message: "Bye"
    },
    {
        to: "93333333",
        message: "Hihi"
    },
    {
        to: "94444444",
        message: "I love you"
    }
]

// Use Promise.all() and Array#map to send all the messages.

Promise.all(
    messages.map(async (item) => {
        const res = await send(item.to, item.message);
        console.log("resolved:", res); // send resolved message + run function
    })
).then(() => {
    console.log("END"); // This line must be printed last.
});

function send(to, message) {
    const duration = _.random(1, 3);

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sending SMS to ${to} with message ${message}`)
            resolve("ok");
        }, duration);
    })
}

// Waiting for a Timeout

// +++++ Example Using Callback
setTimeout(function () { myFunction("I love You !!!"); }, 3000);

function myFunction(value) {
    document.getElementById("demo").innerHTML = value;
}

// +++++ Example Using Promise
let mijnPromise = new Promise(function (myResolve, myReject) {
    setTimeout(function () { myResolve("I love You !!"); }, 3000);
});

mijnPromise.then(function (value) {
    document.getElementById("demo").innerHTML = value;
});

// (PICTURE GOES HERE)

// Chained Promises

// The methods promise.then(), promise.catch(), and promise.finally() are used to associate further action with a promise that becomes settled.

// The .then() method takes up to two arguments; 
// the first argument is a callback function for the resolved case of the promise
// second argument is a callback function for the rejected case. 
// Each .then() returns a newly generated promise object, which can optionally be used for chaining

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('foo');
    }, 300);
});

myPromise
    .then(handleResolvedA, handleRejectedA)
    .then(handleResolvedB, handleRejectedB)

// Processing continues to the next link of the chain even when a .then() lacks a callback function that returns a Promise object. 
// Therefore, a chain can safely omit every rejection callback function until the final .catch().

// in the absence of an immediate need, it is simpler to leave out error handling until a final .catch() statement. A .catch() is really just a .then() without a slot for a callback function for the case when the promise is resolved.

// The return value of each resolved promise in the chain is passed along to the next .then(), while the reason for rejection is passed along to the next rejection-handler function in the chain.

// The promises of a chain are nested like Russian dolls, but get popped like the top of a stack. The first promise in the chain is most deeply nested and is the first to pop.

// (promise D, (promise C, (promise B, (promise A) ) ) )

// When a nextValue is a promise, the effect is a dynamic replacement. The return causes a promise to be popped, but the nextValue promise is pushed into its place. For the nesting shown above, suppose the .then() associated with "promise B" returns a nextValue of "promise X". The resulting nesting would look like this:

// (promise D, (promise C, (promise X) ) )

// A promise can participate in more than one nesting. For the following code, the transition of promiseA into a "settled" state will cause both instances of .then() to be invoked.

const promiseA = new Promise(myExecutorFunc);
const promiseB = promiseA.then(handleFulfilled1, handleRejected1);
const promiseC = promiseA.then(handleFulfilled2, handleRejected2);

// An action can be assigned to an already "settled" promise. 
// In that case, the action (if appropriate) will be performed at the first asynchronous opportunity. 	Note that promises are guaranteed to be asynchronous. 
// Therefore, an action for an already "settled" promise will occur only after the stack has cleared and a clock-tick has passed. 
// The effect is much like that of setTimeout(action,10).

const thatPromise = new Promise((resolutionFunc, rejectionFunc) => {
    resolutionFunc(777);
});
// At this point, "thatPromise" is already settled.
thatPromise.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");

// produces output in this order:
// immediate logging
// asynchronous logging has val: 777

// ----------------------------- Static Methods -----------------------------

// Promise.all(iterable)
// Wait for all promises to be resolved, or for any to be rejected.
// If the returned promise resolves, it is resolved with an aggregating array of the values from the resolved promises, in the same order as defined in the iterable of multiple promises.
// If it rejects, it is rejected with the reason from the first promise in the iterable that was rejected.

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
    console.log(values);
}); // expected output: Array [3, 42, "foo"]



// +++++ Another Example

const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded')
})

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then(messages => {
    console.log(messages)
})

// 0: "Video 1 Recorded"
// 1: "Video 2 Recorded"
// 2: "Video 3 Recorded"

// Promise.allSettled(iterable)
// Wait until all promises have settled (each may resolve or reject).
// Returns a Promise that resolves after all of the given promises is either fulfilled or rejected, with an array of objects that each describe the outcome of each promise.

const promiseI = Promise.resolve(3);
const promiseII = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const multiplePromises = [promiseI, promiseII];

Promise.allSettled(multiplePromises).
    then((results) => results.forEach((result) => console.log(result.status)));
// expected output:
// "fulfilled"
// "rejected"

// Promise.any(iterable)
// Takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise.

const promiseX = Promise.reject(0);
const promiseY = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promiseZ = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promiseX, promiseY, promiseZ];

Promise.any(promises).then((value) => console.log(value));
// expected output: "quick"

Promise.race(iterable)
// Wait until any of the promises is fulfilled or rejected.
// If the returned promise resolves, it is resolved with the value of the first promise in the iterable that resolved.
// If it rejects, it is rejected with the reason from the first promise that was rejected.

const promise10 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const promise20 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

Promise.race([promise10, promise20]).then((value) => {
    console.log(value);
    // Both resolve, but promise20 is faster
});
// expected output: "two"

Promise.reject(reason)
// Returns a new Promise object that is rejected with the given reason.

function resolved(result) {
    console.log('Resolved');
}

function rejected(result) {
    console.error(result);
}

Promise.reject(new Error('fail')).then(resolved, rejected);
// expected output: Error: fail

Promise.resolve(value)
// Returns a new Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise, the returned promise will be fulfilled with the value.

// Generally, if you don't know if a value is a promise or not, Promise.resolve(value) it instead and work with the return value as a promise.

Promise.resolve(value);

// ----------------------------- Instance Methods -----------------------------

Promise.prototype.catch()
// Appends a rejection handler callback to the promise, and returns a new promise resolving to the return value of the callback if it is called, or to its original fulfillment value if the promise is instead fulfilled.

const aPromise = new Promise((resolve, reject) => {
    throw 'Uh-oh!';
});

aPromise.catch((error) => {
    console.error(error);
}); // expected output: Uh-oh!

Promise.prototype.then()
// Appends fulfillment and rejection handlers to the promise, and returns a new promise resolving to the return value of the called handler, or to its original settled value if the promise was not handled (i.e. if the relevant handler onFulfilled or onRejected is not a function).

const whatPromise = new Promise((resolve, reject) => {
    resolve('Success!');
});

whatPromise.then((value) => {
    console.log(value);
    // expected output: "Success!"
});

Promise.prototype.finally()
// Appends a handler to the promise, and returns a new promise that is resolved when the original promise is resolved. The handler is called when the promise is settled, whether fulfilled or rejected.

function checkMail() {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve('Mail has arrived');
        } else {
            reject(new Error('Failed to arrive'));
        }
    });
}

checkMail()
    .then((mail) => {
        console.log(mail);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log('Experiment completed');
    });

// Error: Failed to arrive
// "Experiment completed"

// ----------------------------- Error -----------------------------

// Error objects are thrown when runtime errors occur. The Error object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.

new Error()
new Error(message)
new Error(message, options)
new Error(message, options, fileName)
new Error(message, options, fileName, lineNumber)

// Parameters

// message Optional
// A human-readable description of the error.

// options Optional
// An object that has the following properties:

// cause Optional
// A property indicating the specific cause of the error. When catching and re-throwing an error with a more-specific or useful error message, this property should be used to pass the original error.

// fileName Optional
// The value for the fileName property on the created Error object. Defaults to the name of the file containing the code that called the Error() constructor.

// lineNumber Optional
// The value for the lineNumber property on the created Error object. Defaults to the line number containing the Error() constructor invocation.

try {
    throw new Error('Whoops!')
} catch (e) {
    console.error(e.name + ': ' + e.message)
}

// ----------------------------- Throw and Try to Catch – part of Error -----------------------------

// The try statement lets you test a block of code for errors.
// define a block of code to be tested for errors while it is being executed.
// The catch statement lets you handle the error.
// define a block of code to be executed, if an error occurs in the try block.

// The throw statement lets you create custom errors.
// The finally statement lets you execute code, after try and catch, regardless of the result.

// The JavaScript statements try and catch come in pairs:

try {
    // Block of code to try
}

catch (err) {
    // Block of code to handle errors
}

// If you use throw together with try and catch, you can control program flow and generate custom error messages.

try {
    if (x == "") throw "empty";
    if (isNaN(x)) throw "not a number";
    x = Number(x);
    if (x < 5) throw "too low";
    if (x > 10) throw "too high";
}
catch (err) {
    message.innerHTML = "Input is " + err;
}

// The finally statement lets you execute code, after try and catch, regardless of the result:

try {
    // Block of code to try
}

catch (err) {
    // Block of code to handle errors
}

finally {
    // Block of code to be executed regardless of the try / catch result
}

try {
    if (x == "") throw "is empty";
    if (isNaN(x)) throw "is not a number";
    x = Number(x);
    if (x > 10) throw "is too high";
    if (x < 5) throw "is too low";
}
catch (err) {
    message.innerHTML = "Error: " + err + ".";
}
finally {
    document.getElementById("demo").value = "";
}


// The Error Object

// JavaScript has a built in error object that provides error information when an error occurs.
// The error object provides two useful properties: name and message.
// Six different values can be returned by the error name property:

// EvalError - An error has occurred in the eval() function
// RangeError - A number "out of range" has occurred
// ReferenceError - An illegal reference has occurred
// SyntaxError - A syntax error has occurred
// TypeError - A type error has occurred
// URIError - An error in encodeURI() has occurred

// Handling a specific error type
// You can choose to handle only specific error types by testing the error type with the error's constructor property or, if you're writing for modern JavaScript engines, instanceof keyword:

try {
    foo.bar()
} catch (e) {
    if (e instanceof EvalError) {
        console.error(e.name + ': ' + e.message)
    } else if (e instanceof RangeError) {
        console.error(e.name + ': ' + e.message)
    }
    // ... etc

    else {
        // If none of our cases matched leave the Error unhandled
        throw e;
    }
}

// Sometimes a block of code can fail for reasons that require different handling, but which throw very similar errors (i.e. with the same type and message).
// You can catch them and throw new Error objects that have more specific messages. 
// The original error should be passed to the new Error in the constructor option parameter (cause property)
// this ensures that the original error and stack trace are available to higher level try/catch blocks.

// The example below shows this for two methods that would otherwise fail with similar errors 	(doFailSomeWay() and doFailAnotherWay()):

function doWork() {
    try {
        doFailSomeWay();
    } catch (err) {
        throw new Error('Failed in some way', { cause: err });
    }
    try {
        doFailAnotherWay();
    } catch (err) {
        throw new Error('Failed in another way', { cause: err });
    }
}

try {
    doWork();
} catch (err) {
    switch (err.message) {
        case 'Failed in some way':
            handleFailSomeWay(err.cause);
            break;
        case 'Failed in another way':
            handleFailAnotherWay(err.cause);
            break;
    }
}