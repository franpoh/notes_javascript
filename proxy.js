


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

const exampleProxyOne = new Proxy (targetObj, handlerAsVariable);

const exampleProxyTwo = new Proxy (targetObj, { /* handler code */ })



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



// +++++ Example with receiver set to proxy by default

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



// +++++ Example with receiver set to child created from proxy

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

const proxyThree = new Proxy (userThree, handlerThree);
const childThree = Object.create(proxyThree);

console.log(childThree.name);
// Child is attempting to access name on target object. Access is denied.
// 403



// Proxies are often used with the Reflect object

// The major use case of Reflect is to provide default forwarding behavior in Proxy handler traps. 
// A trap is used to intercept an operation on an object — it provides a custom implementation for an object internal method. 
// The Reflect API is used to invoke the corresponding internal method.

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

