


// The Proxy object allows you to create an object that can be used in place of the original object, 
// but which may redefine fundamental Object operations like getting, setting, and defining properties. 
// Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

// You create a Proxy with two parameters:

// Syntax
new Proxy(target, handler);

// target: the original object which you want to proxy
// handler: an object that defines which operations will be intercepted and how to redefine intercepted operations.

// The handler may be defined as a separate variable or during the creation of the proxy

const targetObj = {};

const handlerAsVariable = { /* code */ };

const exampleProxyOne = new Proxy(targetObj, handlerAsVariable);

const exampleProxyTwo = new Proxy(targetObj, { /* handler code */ })



// Basic Example

const userOne = {
    user: "admin",
    password: "password",
};

const handlerOne = {};
const proxyOne = new Proxy(user, handlerOne);

// Note that you are accessing the original object's properties through the proxy wrapper
console.log(proxyOne.name); // werner



// Syntax
new Proxy(target, {
    get(target, property, receiver) {
    }
})

// The following parameters are passed to the get() method. this is bound to the handler.

// target: the underlying object wrapped by the proxy
// property: the key being requested
// receiver: The 'this' value for getters. The receiver is usually either the proxy itself, or an object that inherits from the proxy.

// The get() handler intercepts attempts to access properties in the target.
// Handler functions are sometimes called traps, presumably because they trap calls to the target object.

// This trap can intercept these operations:
// Property access: proxy[foo] and proxy.bar
// Reflect.get()
// Or any other operation that invokes the [[Get]] internal method.



// +++++ Example with receiver set to proxy (accessed directly from proxy)

const userTwo = {
    user: "admin",
    password: "password",
};

const handlerTwo = {
    get(target, property, receiver) {
        console.log(target === userTwo); // true
        console.log(receiver === proxyTwo); // true - note that receiver is set to proxy by default
        console.log(target === receiver); // false

        console.log(`Accessing ${String(property)} on target object. Access is denied.`);
        return 403;
    }
};

const proxyTwo = new Proxy(userTwo, handlerTwo);
console.log(proxyTwo.user);
// Accessing user on target object. Access is denied.
// 403



// +++++ Example with receiver set to child (accessed via prototype inheritance)

const userThree = {
    user: "admin",
    password: "password",
};

const handlerThree = {
    get(target, property, receiver) {
        console.log(target === userThree); // true
        console.log(receiver === proxyThree); // false - note that receiver is no longer set to proxy by default
        console.log(receiver === childThree); // true - receiver is instead set to the child created from proxy
        console.log(target === receiver); // false

        console.log(`Child is attempting to access ${String(property)} on target object. Access is denied.`);
        return 403;
    }
}

const proxyThree = new Proxy(userThree, handlerThree);
const childThree = Object.create(proxyThree);

console.log(childThree.name);
// Child is attempting to access name on target object. Access is denied.
// 403



// Proxies are often used with the Reflect object - which you can read more about at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect

// The major use case of Reflect is to provide default forwarding behavior in Proxy handler traps. 
// A trap is used to intercept an operation on an object — it provides a custom implementation for an object internal method. 
// The Reflect API is used to invoke the corresponding internal method.

// Syntax
Reflect.get(target, property, receiver); // If receiver is not included, 'this' defaults to target. Otherwise it is set either to the proxy or child. 

// For example, we can call Reflect.get if we don't wish to redefine the object's behavior:

const userFour = {
    user: "admin",
    password: "password",
};

const handlerFour = {
    get(target, property, receiver) {
        console.log(`Accessing ${String(property)} on target object.`);
        return Reflect.get(target, property, receiver);
    }
};

const proxyFour = new Proxy(userFour, handlerFour);
console.log(proxyFour.user);
// Accessing user on target object.
// admin

// Of course, there is no need to use reflect if you are not intending to change the object's behaviour

const proxyUnchanged = new Proxy(userFour, {});
console.log(proxyUnchanged.user); // admin



// Here is another example of using Reflect

// Syntax 
Reflect.set(target, property, value, receiver); // If receiver is not included, 'this' defaults to target. Otherwise it is set either to the proxy or child. 

// Example

const userFive = {
    user: "admin",
    password: "password",
};

const handlerFive = {
    set(target, property, value, receiver) {
        console.log(`Setting ${String(property)} on target object.`);
        return Reflect.set(target, property, value, receiver);
    }
}

const proxyFive = new Proxy(userFive, handlerFive);

proxyFive.user = "basic user"; // Setting user on target object.
proxyFive.password = "secret"; // Setting password on target object.
console.log(proxyFive); // Proxy({ user: 'basic user', password: 'secret' })



// Here is a comparision between declaring and not declaring receiver in the list of Reflect.[method] arguments

const userReceive = {
    user: "admin",
    password: "password",
};

// +++++ With receiver, set to child

const handlerWithReceiver = {
    set(target, property, value, receiver) {
        console.log(`Setting ${String(property)} on target object.`);
        return Reflect.set(target, property, value, receiver);
    }
};

const proxyWithReceiver = new Proxy(userReceive, handlerWithReceiver);
const childWithReceiver = Object.create(proxyWithReceiver);

console.log(userReceive); // { user: 'admin', password: 'password' }
console.log(childWithReceiver); // {}

childWithReceiver.user = "basic user"; // Setting user on target object.
console.log(childWithReceiver); // { user: 'basic user' } - child was changed
console.log(userReceive); // { user: 'admin', password: 'password' } - original object remains unchanged

// +++++ Without receiver, set to target by default

const handlerWithoutReceiver = {
    set(target, property, value) {
        console.log(`Setting ${String(property)} on target object.`);
        return Reflect.set(target, property, value);
    }
};

const proxyWithoutReceiver = new Proxy(userReceive, handlerWithoutReceiver);
const childWithoutReceiver = Object.create(proxyWithoutReceiver);

console.log(userReceive); // { user: 'admin', password: 'password' }
console.log(childWithoutReceiver); // {}

childWithoutReceiver.user = "basic user"; // Setting user on target object.
console.log(childWithoutReceiver); // {} - child remains unchanged
console.log(userReceive); // { user: 'basic user', password: 'password' } - original object was changed



// +++++ NOTE: A small aside about proxies and object internal methods

// Objects are collections of properties. 
// However, the language doesn't provide any machinery to directly manipulate data stored in the object
// rather, the object defines some internal methods specifying how it can be interacted with.

// For example, when you read obj.x, you may expect the following to happen:
//      The x property is searched up the prototype chain until it is found.
//      If x is an accessor property, the getter is invoked, and the return value of the getter is returned.

// Ordinary objects, by default, have a [[Get]] internal method that is defined with this behavior. 
// The obj.x property access syntax simply invokes the [[Get]] method on the object, 
// and the object uses its own internal method implementation to determine what to return.

// Another commonly used object internal method is [[Set]] 
// if you access an object property to change its value, [[Set]] is defined with the behaviour to do so

// Therefore, it's important to realize that all interactions with an object eventually boils down to the invocation of one of these internal methods, 
// and that they are all customizable through proxies. 

// This means almost no behavior (except certain critical invariants) is guaranteed in the language - everything is defined by the object itself. 
// When you run obj.x, there's no guarantee that the value of obj.x will be returned - it depends on the object's implementations of [[Get]]
// obj.x may perform other actions, such as logging things to the console - as seen in the above examples



// +++++ NOTE: No private field forwarding

// A proxy is still another object with a different identity — it's a proxy that operates between the wrapped object and the outside. 
// As such, the proxy does not have direct access to the original object's private elements.

class SecretKeeper {
    #secret = "The nightjar sits on a coconut"; // private property

    getSecret() {
        console.log(`The secret is ${this.#secret}.`);
    }

    getPublicInformation(publicInfo) {
        console.log(publicInfo);
    }
}

const secretUser = new SecretKeeper();

const secretHandlerNoAccess = {
    get(target, property, receiver) {
        console.log(`Attempting access...`);
        return Reflect.get(target, property, receiver);
    }
}

const secretProxyNoAccess = new Proxy(secretUser, secretHandlerNoAccess);

secretProxyNoAccess.getPublicInformation(`The nightjar is in Botanic Gardens`); // Attempting access... The nightjar is in Botanic Gardens.
secretProxyNoAccess.getSecret(); // Attempting access... TypeError: Cannot read private member #secret from an object whose class did not declare it

// This is because when the proxy's get trap is invoked, the this value is the proxy instead of the original secret, so #secret is not accessible.
// To fix the issue, we will use function.apply() to set the 'this' context to the target - the original object - instead

const secretHandlerAccess = {

    get(target, property, receiver) {

        console.log(`Attempting access...`);

        const value = target[property]; // Here, we get the value of secretKeeper[property]

        // The below code will deal with different scenarios - if secretKeeper[property] is just a primitive, or a method, or a method that accepts arguments, and so on

        if (value instanceof Function) { // if the value is a function - secretKeeeper[method] - return the below value

            // return this function which will wrap around secretKeeper[method]
            return function (...optionalArgs) { // '...optionalArgs' captures all arguments passed into any secretProxyAccess[method]() at runtime - such as secretProxyAccess.getPublicInformation(`The nightjar is in Botanic Gardens`)

                return value.apply(this === receiver ? target : this, optionalArgs);
                // if 'this' === receiver is true - that is, 'this' is currently set to the proxy
                // then take secretKeeeper[method], and use function.apply() to set secretKeeeper[method]'s 'this' to the target
                // otherwise, secretKeeeper[method]'s 'this' remains as is
                // lastly, we pass in the arguments that we receive as the second argument
                // I got slightly confused at this part, so just read it like this: in value.apply() the first argument is 'this === receiver ? target', and the second is 'optionalArgs'

            }

        }

        return value; // just return value if the value is anything but a function

    }

}

const secretProxyAccess = new Proxy(secretUser, secretHandlerAccess); // Attempting access... The nightjar is in Botanic Gardens.
secretProxyAccess.getPublicInformation(`The nightjar is in Botanic Gardens`);
secretProxyAccess.getSecret(); // Attempting access... The secret is The nightjar sits on a coconut.



// +++++ NOTE: Let us explore the below function a little bit more

// why is you need a wrapper function(...optionalArgs) {}
// why would you need a conditional like 'this === receiver ? target : this'
// after all, by declaring receiver in get(target, property, receiver), isn't 'this' set to the receiver by default?

class SecretExample {
    #secret = "I like matcha better as a latte.";
    getSecret() {
        console.log(this.#secret);
    }
}

const exampleSecret = new SecretExample();

const handlerExampleOne = {
    get(target, property, receiver) {
        const value = target[property];

        console.log(this === handlerExampleOne); // true - 'this' is currently set to the handler

        if (value instanceof Function) {

            // Here, we will name the wrapper function for easier explanation later
            function wrapperFunction() {
                console.log(this === handlerExampleOne); // false - 'this' not set to the handler
                console.log(this === receiver); // true - 'this' is set to the receiver - the proxy
                return value.apply(this === receiver ? target : this);
            }

            return wrapperFunction;
        }
        return value;
    }
}

const handlerExampleTwo = {
    get(target, property, receiver) {
        const value = target[property];

        console.log(this === handlerExampleTwo); // true - 'this' is currently set to the handler

        if (value instanceof Function) {
            console.log(this === handlerExampleTwo); // true - 'this' is still set to the handler
            console.log(this === receiver); // false - this will result in the failed execution of the below code
            return value.apply(this === receiver ? target : this);
        }
        return value;
    }
}

const proxyExampleOne = new Proxy(exampleSecret, handlerExampleOne);
// proxyExampleOne.getSecret(); // I like matcha better as a latte.

const proxyExampleTwo = new Proxy(exampleSecret, handlerExampleTwo);
// proxyExampleTwo.getSecret(); // TypeError: Cannot read private member #secret from an object whose class did not declare it



// +++++ handlerExampleTwo fails because:

// First Failure Reason: Premature Execution (Returns result, not a function)

// Property access (proxy.method) and function invocation (proxy.method()) are two separate steps in JavaScript:
//      proxy.method triggers the get trap to retrieve the function reference.
//      () invokes the function returned by step 1.

// If you call value.apply(...) directly inside the get trap, the function executes immediately during property lookup

// Let's see the difference between the two proxies when we merely retrieve the function reference without executing it with ()
console.log(proxyExampleOne.getSecret);
// [Function: wrapperFunction]

console.log(proxyExampleTwo.getSecret);
// TypeError: Cannot read private member #secret from an object whose class did not declare it

// with the TypeError, you can see that for proxyExampleTwo, the function executes immediately during property lookup and returns an error
// Therefore, wrapperFunction is not just for capturing optional arguments, it is for deferring function execution as well



// Second Failure Reason: Wrong 'this' inside the get trap

// Inside the get trap itself, this refers to the handler object (the second argument passed to new Proxy(target, handler)).
// As you can see with the console logs inside handlerExampleTwo, 'this' is always set to the handler and never to the receiver

// this === receiver (the proxy) does not exist until the returned wrapper function is executed by the caller
// Remember,  value of this in JavaScript depends on how a function is invoked (runtime binding)



// In the context of the explanation below, the target[property] that we are using 'function.apply()' on is the class method 'getSecret' and henceforth shall be referred to as such

// For handlerExampleOne
//      upon invoking proxyExampleOne.getSecret(), the handler returns wrapperFunction, which wraps getSecret.apply() to defer its execution
//      wrapperFunction in turn executed by the caller proxyExampleOne, and it returns getSecret.apply(), which immediately executes as well to return console.log(this.#secret)
//      thus the execution context of 'this' is proxyExampleOne

// for handlerExampleTwo
//      Upon invoking proxyExampleTwo.getSecret(), the handler executes all the code, including getSecret.apply()
//      Thus the execution context of 'this' is handlerExampleTwo
//      Upon the execution of getSecret.apply(), the engine attempts to evaluate this.#secret inside getSecret(), which fails and throws a TypeError







// function(...args) { } creates it's own 'this' context, or 'this' is evaluated based on where it's called
// value.apply(this === receiver = true); will only apply if we are calling the function in the context of the proxy
// and of course this ==== receiver = false means that we are calling the function in any other context but the proxy due to things like bind and method assignment


class Secret {
    #secret;
    constructor(secret) {
        this.#secret = secret;
    }
    get secret() {
        return this.#secret.replace(/\d+/, "[REDACTED]");
    }
}

const secret = new Secret("123456");

const proxy = new Proxy(secret, {
    get(target, prop, receiver) {
        // By default, it looks like Reflect.get(target, prop, receiver)
        // which has a different value of `this`
        return target[prop];
    },
});

console.log(proxy.secret);


