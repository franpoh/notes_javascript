/* CURRENTLY UNDER CONSTRUCTION */

/* 
Table of Contents
*/



// ----------------------------- > WHAT IS A PROMISE -----------------------------

// Promises are the foundation of asynchronous programming in modern JavaScript.

// A promise is an object returned by an asynchronous function, which represents the current state of the operation. 
// At the time the promise is returned to the caller, the operation often isn't finished, 
// but the promise object provides methods to handle the eventual success or failure of the operation.



// ----------------------------- > WHAT IS A PROMISE >> States

// A Promise is in one of these states:

// ----- Pending
// Initial state, neither fulfilled nor rejected. 
// Result is undefined.

// ----- Fulfilled 
// Meaning that the operation was completed successfully. 
// Result is a value.

// ----- Rejected
// Meaning that the operation failed. 
// Result is an error object. 



// The eventual state of a pending promise can either be fulfilled with a value or rejected with a reason (error). 
// When either of these options occur, the associated handlers queued up by a promise's then method are called. 

myPromise.then(
    // below are the 'associated handlers'
    function (value) { /* code for handling successful operation */ },
    function (error) { /* code for handling failed operation */ }
);



// If the promise has already been fulfilled or rejected when a corresponding handler is attached, 
// the handler will be called, 
// so there is no *race condition between an asynchronous operation completing and its handlers being attached.

// * Race Condition: A race condition occurs when two threads access a shared variable at the same time



// A promise is said to be settled if it is either fulfilled or rejected, but not pending.

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png



// ----------------------------- > USING PROMISES -----------------------------

// A Promise is an object representing the eventual completion or failure of an asynchronous operation. 
// NOTE: Since most people are consumers of already-created promises, this section will explain consumption of returned promises before explaining how to create them.



// ----------------------------- > USING PROMISES >> Difference Between Callback And Promise 

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

submitForm(userDetails).then(successCallback, failureCallback); // note the rewritten function with 'function(parameter).then(successFunction, failureFunction)'



// ----------------------------- > USING PROMISES >> Chaining

// A common need is to execute two or more asynchronous operations back to back, 
// where each subsequent operation starts when the previous operation succeeds, with the result from the previous step. 



// In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom:

doSomething(function (result) {
    doSomethingElse(result, function (newResult) {
        doThirdThing(newResult, function (finalResult) {
            console.log(`Got the final result: ${finalResult}`);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);



// With promises, we accomplish this by creating a promise chain. 

// The API design of promises makes this great, 
// because callbacks are attached to the returned promise object, instead of being passed into a function.

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

doSomething()
    .then(function (result) {
        return doSomethingElse(result);
    })
    .then(function (newResult) {
        return doThirdThing(newResult);
    })
    .then(function (finalResult) {
        console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);



// You might see this expressed with arrow functions instead:

doSomething()
    .then((result) => doSomethingElse(result))
    .then((newResult) => doThirdThing(newResult))
    .then((finalResult) => {
        console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);



// NOTE: Important: Always return results, otherwise callbacks won't catch the result of a previous promise 
// If the previous handler started a promise but did not return it, 
// there's no way to track its settlement anymore, and the promise is said to be "floating".

doSomething()
    .then((url) => {
        // I forgot to return this
        fetch(url);
    })
    .then((result) => {
        // result is undefined, because nothing is returned from the previous handler.
        // There's no way to know the return value of the fetch() call anymore, or whether it succeeded at all.
    });



// This may be worse if you have race conditions — 
// if the promise from the last handler is not returned, the next then handler will be called early, and any value it reads may be incomplete.

var listOfIngredients = [];

doSomething()
    .then((url) => {
        // I forgot to return this
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                listOfIngredients.push(data);
            });
    })
    .then(() => {
        console.log(listOfIngredients);
        // Always [], because the fetch request hasn't completed yet.
    });

// Therefore, as a rule of thumb, whenever your operation encounters a promise, return it and defer its handling to the next then handler.

var listOfIngredients = [];

doSomething()
    .then((url) =>
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

doSomething()
    .then((url) => fetch(url))
    .then((res) => res.json())
    .then((data) => {
        listOfIngredients.push(data);
    })
    .then(() => {
        console.log(listOfIngredients);
    });


























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

// ----- Example

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

// ----- Example of a promise inside a function

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

// ----- Example of Promise with then and also async

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

// ----- More Example

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

// ----- Even More Examples

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

// ----- Example Using Callback
setTimeout(function () { myFunction("I love You !!!"); }, 3000);

function myFunction(value) {
    document.getElementById("demo").innerHTML = value;
}

// ----- Example Using Promise
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



// ----- Another Example

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