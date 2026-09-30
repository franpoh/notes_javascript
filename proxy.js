/*
Table of Contents
-----------------------------
> HANDLERS
> REFLECT
> HANDLING PRIVATE FIELDS
> VALIDATION
> PROXIES WITH INLINE OBJECT LITERALS
> PROXIES WITH EMPTY INLINE OBJECTS
*/



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



// ----------------------------- > HANDLERS -----------------------------

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



// ----------------------------- > REFLECT -----------------------------

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



// ----------------------------- > HANDLING PRIVATE FIELDS -----------------------------

// NOTE: No private field forwarding

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

if (value instanceof Function) {
    return function (...optionalArgs) {
        return value.apply(this === receiver ? target : this, optionalArgs);
    }
}

// why do you need a wrapper function(...optionalArgs) {}
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

            // Here, we will declare a variable and assign it the wrapper function for easier explanation later
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
proxyExampleOne.getSecret(); // I like matcha better as a latte.

const proxyExampleTwo = new Proxy(exampleSecret, handlerExampleTwo);
proxyExampleTwo.getSecret(); // TypeError: Cannot read private member #secret from an object whose class did not declare it



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



// Therefore, for the wrapper function:
// function(...optionalArgs) {} 'this' is evaluated based on where it's called
// value.apply(this === receiver = true); will only apply if we are calling the function in the context of the proxy
// and of course this ==== receiver = false means that we are calling the function in any other context but the proxy due to things like function.bind() and method assignment



// +++++ Here is another method of handling private properties

class MySecret {
    #secret = "I would eat eggs every day if I could."

    get getSecret() { // note 'get' getSecret()
        console.log(this.#secret);
    }
}

const mySecret = new MySecret();

const mySecretProxy = new Proxy(mySecret, {
    get(target, prop, receiver) {
        return target[prop]; // in this case, it is mySecret["getSecret"]
    },
});

// Note that the below is not a function
mySecretProxy.getSecret; // I would eat eggs every day if I could.

// Because getSecret is defined with the 'get' *accessor keyword, 
// accessing mySecret["getSecret"] automatically invokes the getter function immediately during property access.
// therefore returning the value of #secret immediately rather than a function that we have to invoke with ()

// * Accessor: See more in Cheatsheet\coding\object_property.js

// Accessor Property: Associates a key with one of two accessor functions (get and set) to retrieve or store a value.
// NOTE: getSecret is not a standard method that has a getter added to it. Rather, getSecret itself is the name of an accessor property.

// When you write 'get getSecret() {}' inside a class definition, the engine does not create a function property named getSecret. 
// Instead, it creates an accessor property descriptor on MySecret.prototype under the property key "getSecret".

// Under the hood, the class definition directly assigns the function body to the get slot of that descriptor.
// This is what class MySecret { get getSecret() {} } constructs on MySecret.prototype:

class MySecret {
    #secret = "I would eat eggs every day if I could.";

    static {
        Object.defineProperty(MySecret.prototype, "getSecret", {
            get: function () {
                console.log(this.#secret);
            },
            enumerable: false,
            configurable: true,
        });
    }
}



// ----------------------------- > VALIDATION -----------------------------

// Proxies can be used for validation as well, useful for when you are accessing properties with square bracket notation with names provided by user input

// The proxy can stand in front of your real object ( private API ) and expose a limited subset of the object ( public API ). 
// The underlying object retains its internal state (_internalApiKey), but external code only interacts with the Proxy wrapper (publicProfile), which enforces encapsulation.

// This is probably the best approach if you are using this pattern, as it is most consistent with typical object oriented programming paradigms.
// Instead of writing defensive if/else checks everywhere you access properties (if (key !== '_internalApiKey' && ...)), 
// you encapsulate access-control logic inside the object's interface. Consumers can use standard object bracket syntax (proxy[key]) seamlessly.

// Here is a repeat of the example provided in 10_object\1_object.js

const privateProfile = {
    name: "Alex",
    role: "user",
    _internalApiKey: "secret_123"
};

// Define the public "allowed" subset
const allowedFields = ["name", "role"];

// Create the Proxy gatekeeper
const publicProfile = new Proxy(privateProfile, {
    get(target, property) {

        // Only allow access if the property is explicitly in our whitelist
        if (allowedFields.includes(property)) {
            return target[property];
        }

        // Return undefined or throw an error for anything else
        return undefined;
    }
}
);

// SAFE: Dynamic bracket access through the Proxy
console.log(publicProfile["name"]);            // "Alex" (Allowed)
console.log(publicProfile["_internalApiKey"]); // undefined (Blocked!)



// ----------------------------- > PROXIES WITH INLINE OBJECT LITERALS -----------------------------

// So far we have been creating proxies with existing objects. However, you can also create proxies where the object exists nowhere but in the proxy

// Syntax
new Proxy({}, {}); // Both the object and the handler are inline

// It will behave exactly like a standard empty object:

const pet = new Proxy({}, {});

pet.name = "Mr Pigeon"; // Falls back to default [[Set]] operation on target
console.log(pet.name); // "Mr Pigeon" - Falls back to default [[Get]] operation on target



// +++++ Inline Object Example

// Creating a target object directly inside new Proxy(target, handler)—such as new Proxy({}, handler) - is used primarily in two architectural scenarios:

// Target Encapsulation (Preventing Reference Leakage): 
// Enforcing strict invariants (validation, read-only constraints, audit logging) by ensuring no external variable holds a reference to the raw target object. 
// If a target variable exists in scope, caller code could bypass the Proxy traps by mutating the target directly.

function newSign(signInfo) {
    return new Proxy(
        {
            information: signInfo,
            personInCharge: "Not a Bird",
            contact: "totallyabird@birdmail.com",
        },
        {
            set(target, property, value, receiver) {
                console.log(`Accessing ${property} to change...`);

                if (property === "information") {
                    console.log(`${property} has been changed.`);
                    return Reflect.set(target, property, value, receiver);
                }
                return console.log(`Access is not allowed.`);
            },

            get(target, property, receiver) {
                if (property === "personInCharge" || property === "contact") {
                    return `You can contact ${target.personInCharge} at ${target.contact}.`
                }
                return Reflect.get(target, property, receiver);
            }
        }
    );
}

const birdSign = newSign("Birds are allowed on the tables.");

console.log(birdSign);
// Proxy({
//   information: 'Birds are allowed on the tables.',
//   personInCharge: 'Not a Bird',
//   contact: 'totallyabird@birdmail.com'
// })

console.log(birdSign.information); // Birds are allowed on the tables.
console.log(birdSign.personInCharge); // You can contact Not a Bird at totallyabird@birdmail.com.
console.log(birdSign.contact); // You can contact Not a Bird at totallyabird@birdmail.com.

birdSign.information = "Birds are allowed on human tables and chairs."; // Accessing information to change... information has been changed.
birdSign.personInCharge = "A Human"; // Accessing personInCharge to change... Access is not allowed.
birdSign.contact = "nastyhuman@humanmail.com"; // Accessing contact to change... Access is not allowed.

console.log(birdSign);
// Proxy({
//   information: 'Birds are allowed on human tables and chairs.',
//   personInCharge: 'Not a Bird',
//   contact: 'totallyabird@birdmail.com'
// })



// ----------------------------- > PROXIES WITH EMPTY INLINE OBJECTS -----------------------------

// A proxy with an empty object is also good for returning custom values and methods on demand (via the get trap) without the need of object properties of any kind.
// (Custom setters need their own `set` trap. A `get` trap only affects reads.)

// When you use an empty object ({}) as a target, you don't need any physical properties on the object at all.
// The get trap runs on every property read, so you can return synthesized functions or computed values entirely out of thin air.
// Only operations that have a trap defined are intercepted. With just a `get` trap, writes, `in` checks, `delete`, etc. still go straight to the empty target.

// Trap Interception Priority:
// When you write proxy.someMethod(), JavaScript invokes the get trap first.
// If the trap returns a function, JavaScript executes that function. The trap is not required to find someMethod on {}.
// (After the trap returns, the engine does look the property up on the target, but only to enforce the invariants described below.)

// Zero Invariant Restrictions:
// The ECMAScript spec requires that if a target property is a NON-CONFIGURABLE AND NON-WRITABLE own data property, the get trap must return its exact actual value.
// (Likewise, if it is a non-configurable accessor property with no getter, the trap must return undefined.)
// Because an empty target {} has no such properties, none of these invariants can be violated. The trap has total freedom over what it returns.



// Here, the Proxy object has zero properties stored in memory, but exposes an infinite set of custom string-transformation methods dynamically:

const stringUtils = new Proxy({}, {

    get(target, prop) {

        // Synthesize explicit custom methods on demand

        if (prop === "shout") {
            return (text) => `${text.toUpperCase()}!!!`;
        }

        if (prop === "whisper") {
            return (text) => `${text.toLowerCase()}, shhhhh.`;
        }

        // Fallback behavior for ANY unknown method name

        return (text) => `The method [${String(prop)}] is not found, returning original text: ${text}.`;
    }

});

// None of these methods exist as properties on the target object ({})

console.log(stringUtils.shout("hello world")); // HELLO WORLD!!!
console.log(stringUtils.whisper("THE SECRET IS THAT I LOVE EGGS")); // the secret is that i love eggs, shhhhh.
console.log(stringUtils.reverse("hello")); // The method [reverse] is not found, returning original text: hello.

// When using an empty object literal target ({}), the target isn't storing data or behavior
// it acts purely as an empty shell to satisfy the new Proxy(target, handler) signature, leaving all logic entirely to your custom trap functions.



// NOTE: The above example is a very basic example of how a proxy with an empty object may work
// If you only have a fixed, known set of utility functions (like shout and whisper), using a Proxy is actually an anti-pattern. 
// For static utilities, standard individual functions or a plain object literal (const utils = { shout, whisper }) are vastly superior because 
// they give you IDE autocompletion, TypeScript type safety, tree-shaking, and better performance in V8.

// The Proxy approach is preferable only when you need meta-programming 
// situations where individual functions cannot be written ahead of time or where you need to apply behavior dynamically across an infinite range of inputs.



// +++++ Dynamic Database Query Synthesizer

// Intercepts calls matching findBy[And...], parses the property name into field keys at runtime, 
// and filters an in-memory dataset without any hardcoded query methods.

function createDynamicDatabase(dataset) {
    return new Proxy({}, {
        get(target, prop) {

            // Always return a function, so calling an invalid method gives the error message instead of "is not a function"
            if (!prop.startsWith("findBy")) {
                return () => `Error: search term is not valid.`;
            }

            const field = prop.slice(6).toLowerCase(); // Parse method name. Example: 'findByEmail' to 'email

            // Return a dynamically synthesized query function
            return (arg) => {

                const hasField = dataset.some((record) => Object.hasOwn(record, field)); // Check if search field exists on user

                if (!hasField) { // if search field doesn't exists
                    return `Error: Field '${field}' not found.`;
                }

                const hasMatch = dataset.filter((record) => record[field] === arg); // Filter user dataset where provided search term matches the field value
                return hasMatch.length === 0 ? `Error: User not found.` : hasMatch;

            };
        }
    });
}

const users = [
    { id: 1, name: "Alice", email: "alice@example.com", status: "active", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", status: "pending", role: "user" },
    { id: 3, name: "Charlie", email: "charlie@example.com", status: "active", role: "user" }
];

const userDatabase = createDynamicDatabase(users);

// None of these methods exist on the target object ({})

console.log(userDatabase.findByEmail("alice@example.com")); // [ { id: 1, name: 'Alice', email: 'alice@example.com', status: 'active', role: 'admin' } ]
console.log(userDatabase.findByName("Charlie")); // [ { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'active', role: 'user' } ]
console.log(userDatabase.findById(4)); // Error: User not found.
console.log(userDatabase.findBySurname('Smith')); // Error: Field 'surname' not found.



// +++++ Universal Interception & Performance Audit Wrapper

// NOTE: Unlike the other examples, this proxy wraps a real object (the service) instead of an empty {}.
// It's included for contrast: the get trap forwards to the real target with Reflect.get and only decorates functions.

// Wraps an existing service object to apply uniform telemetry, timing logs, and error logging across all methods present and future
// without modifying the underlying class or service functions.

function createAuditWrapper(service, serviceName = "Service") {

    return new Proxy(service, {

        get(target, prop, receiver) {

            const originalValue = Reflect.get(target, prop, receiver);

            // Only intercept method calls; pass raw properties (and Object.prototype's built-ins) through
            if (typeof originalValue !== "function" || originalValue === Object.prototype[prop]) {
                return originalValue;
            }

            return async function (...args) {

                const startTime = performance.now();
                console.log(`[AUDIT LOG] ${serviceName}.${String(prop)} invoked with args:`, args);

                try {
                    const result = await originalValue.apply(target, args);
                    const duration = (performance.now() - startTime).toFixed(2);
                    console.log(`[AUDIT SUCCESS] ${serviceName}.${String(prop)} completed in ${duration}ms ->`, result);
                    return result;
                } catch (error) {
                    const duration = (performance.now() - startTime).toFixed(2);
                    console.error(`[AUDIT ERROR] ${serviceName}.${String(prop)} failed in ${duration}ms: ${error.message}`);
                    throw error;
                }
            };
        }
    });
}

const paymentService = {
    accountBalance: 500,
    async processPayment(amount) {
        if (amount > this.accountBalance) {
            throw new Error("Insufficient funds.");
        }
        this.accountBalance -= amount;
        return { transactionId: "TX_10928", status: "APPROVED" };
    }
};

const auditedPayments = createAuditWrapper(paymentService, "PaymentService");

await auditedPayments.processPayment(150);
// [AUDIT LOG] PaymentService.processPayment invoked with args: [ 150 ]
// [AUDIT SUCCESS] PaymentService.processPayment completed in 0.12ms -> { transactionId: 'TX_10928', status: 'APPROVED' }

await auditedPayments.processPayment(1000);
// [AUDIT LOG] PaymentService.processPayment invoked with args: [ 1000 ]
// [AUDIT ERROR] PaymentService.processPayment failed in 2.18ms: Insufficient funds.
// Error: Insufficient funds.



// +++++ Dynamic RPC / REST API Client

// Synthesizes arbitrary endpoint path chains dynamically without pre-declaring SDK routes, resolving automatically when terminal HTTP verbs(.get(), .post(), .delete()) are invoked.

function createApiClient(baseURL) {

    function createPathNode(pathSegments = []) {

        return new Proxy({}, {

            get(target, prop) {

                console.log(`pathSegments: ${pathSegments}, prop: ${prop}`);
                // pathSegments: , prop: users
                // pathSegments: users, prop: 42
                // pathSegments: users,42, prop: posts
                // pathSegments: users,42,posts, prop: get

                // Prevent un-wrapping issues if checked by async frameworks
                if (typeof prop === "symbol" || prop === "then") {
                    return undefined;
                }

                const HTTP_VERBS = ["get", "post", "put", "delete"];

                // Terminal HTTP call execution
                if (HTTP_VERBS.includes(String(prop).toLowerCase())) {
                    // 8. Proxy 4.get:
                    //      Trap fires: prop = "get".
                    //      "get" matches the HTTP_VERBS array (["get", "post", "put", "delete"]).

                    return async (dataOrParams = {}, customHeaders = {}) => {
                        // 9. The returned function executes immediately with dataOrParams = { limit: 5 }.

                        const method = String(prop).toUpperCase();
                        // 10. get becomes GET

                        let url = `${baseURL}/${pathSegments.join("/")}`;
                        // 11. https://api.example.com/v1 combines with pathSegments.join("/"), which joins ["users", "42", "posts"] into "users/42/posts"
                        // https://api.example.com/v1/users/42/posts

                        const requestOptions = {
                            method,
                            headers: { "Content-Type": "application/json", ...customHeaders }
                        };

                        if (method === "GET" || method === "DELETE") {
                            const queryString = new URLSearchParams(dataOrParams).toString();
                            // 12. Because the verb is "GET", { limit: 5 } is serialized via URLSearchParams into "limit=5"
                            if (queryString) url += `?${queryString}`;
                            // 13. combines url and ?queryString together to become https://api.example.com/v1/users/42/posts?limit=5
                        } else {
                            requestOptions.body = JSON.stringify(dataOrParams);
                        }

                        console.log(`[HTTP ${method}] Request sent to:${url}`);

                        if (requestOptions.body) console.log(`[PAYLOAD]:`, requestOptions.body);

                        // Mock network response
                        const result = { status: 200, url, method };
                        console.log(result);
                        return result;
                    };
                }

                // Sub-path accumulation node
                return createPathNode([...pathSegments, String(prop)]);
                // 4. Evaluating await api.users["42"].posts.get({ limit: 5 }):

                // 5. api.users:
                //      Accesses users on Proxy 1.
                //      Trap fires: prop = "users".
                //      "users" is not a symbol, not "then", and not an HTTP verb.
                //      Returns a new Proxy via createPathNode(["users"]) (Proxy 2).

                // 6. Proxy 2["42"]:
                //      Accesses "42" on Proxy 2.
                //      Trap fires: prop = "42".
                //      Returns a new Proxy via createPathNode(["users", "42"]) (Proxy 3).

                // 7. Proxy 3.posts:
                //      Accesses posts on Proxy 3.
                //      Trap fires: prop = "posts".
                //      Returns a new Proxy via createPathNode(["users", "42", "posts"]) (Proxy 4).

                // Architectural Note: Returning a new Proxy at every step keeps each node's path immutable, so any node can be safely reused or branched
                // (e.g. const users = api.users; users[1].get(); users[2].get()).
                // Reusing or mutating pathSegments in-place would leak state between calls: 
                // after api.users.get(), a later api.posts.get() would build "users/posts" instead of "posts".
            }
        });
    }

    return createPathNode([]);
}

const api = createApiClient("https://api.example.com/v1");
// 1. createApiClient invokes createPathNode([]).
// 2. pathSegments is initialized as an empty array [].
// 3. Returns Proxy 1 wrapping {} with access to baseURL = "[https://api.example.com/v1](https://api.example.com/v1)" and pathSegments = [].

await api.users["42"].posts.get({ limit: 5 });
// See explanation within function above

// [HTTP GET] Request sent to:https://api.example.com/v1/users/42/posts?limit=5
// { status: 200, url: 'https://api.example.com/v1/users/42/posts?limit=5', method: 'GET' }

await api.analytics.events.post({ event: "PAGE_VIEW", user: "Alice" });
// Evaluating await api.analytics.events.post({ event: "PAGE_VIEW", user: "Alice" }):
// Traverses api > analytics > events > post.
// Terminal verb matches "POST".
// Because method is not "GET" or "DELETE", dataOrParams, which is { event: "PAGE_VIEW", user: "Alice" }, is serialized using JSON.stringify() into requestOptions.body.
// Dispatches mock HTTP request and returns { status: 200, url, method: "POST" }.

// [HTTP POST] Request sent to:https://api.example.com/v1/analytics/events
// [PAYLOAD]: {"event":"PAGE_VIEW","user":"Alice"}
// { status: 200, url: 'https://api.example.com/v1/analytics/events', method: 'POST' }



// NOTE: The example below is a very simple version of how the above works:

function test() {
    function innerTest(combineProp = []) {
        return new Proxy({}, {
            get(target, providedProp) {

                console.log(`combineProp: ${combineProp}, providedProp: ${providedProp}`);
                // Each line is one get trap firing on a different proxy.
                // The first line comes from the proxy created by the initial innerTest([]) call,
                // and every later line comes from the proxy that the previous trap created by calling innerTest again with the extended array:
                //      combineProp: , providedProp: one
                //      combineProp: one, providedProp: two
                //      combineProp: one,two, providedProp: three
                //      combineProp: one,two,three, providedProp: end

                const result = [...combineProp, String(providedProp)]; // Here, we add the current provided property accessor into the combineProp array

                // A conditional for reaching the 'end' property accessor, which in this case logs result (combineProp plus 'end') and stops returning new proxies
                if (providedProp === "end") {
                    console.log(`The End. Final result combineProp: ${result}.`); // The End. Final result combineProp: one,two,three,end.
                    return;
                }

                // Rerun innerTest again with the newest combineProp
                return innerTest(result); // Note that even without the 'end' conditional, it will end by itself upon reaching the final property accessor
            }
        })
    }
    return innerTest([]);
}

const tester = test();
tester.one.two.three.end;



// +++++ Auto-Mocking Test Utility

// Creates a test double that automatically generates tracking functions on-the-fly for any method name requested during a unit test,
// capturing call arguments and timestamps without manual setup.

// NOTE: Unlike the earlier examples, the target here isn't purely an empty shell. Each generated mock is cached on the target
// so that mock.someMethod returns the same function every time it is read.

function createAutoMock() {

    return new Proxy({}, {

        get(target, prop) {

            // Guards against JavaScript's async/await runtime checks. 
            // If an object has a .then method, await assumes it is a Promise ("Thenable") and attempts to resolve it, causing an infinite hang. 
            // Returning undefined for then and Symbol lookups ensures await mock safely resolves to the mock object itself.
            if (typeof prop === "symbol" || prop === "then") return undefined;

            // Returns a function to retrieve call history. 
            // When called (e.g., mock.__getCalls("sendEmail")), it uses optional chaining (?.) to safely check if target["sendEmail"] exists and has a .calls array. 
            // If the method was never accessed, it falls back to an empty array [].
            if (prop === "__getCalls") {
                return (methodName) => target[methodName]?.calls || [];
            }

            // Synthesize and cache the mock function if it hasn't been accessed yet
            if (!target[prop]) {

                // Creates an isolated array in closure memory to store call metadata (arguments and timestamps) specifically for this method.
                const calls = [];

                // Synthesizes a brand-new mock function using rest parameters (...args) to accept any arguments. 
                // Declaring it async ensures it automatically returns a resolved Promise.
                const mockFn = async (...args) => {
                    // every time the synthesized function is executed, 
                    // it appends an object containing the passed arguments and current Unix timestamp to its calls array.
                    calls.push({ args, timestamp: Date.now() });
                    return { mockHandled: true, method: String(prop) };
                };

                // Attaches the calls array directly onto the mockFn function instance as a property. 
                mockFn.calls = calls;

                // Caches the synthesized mockFn on the target object {} under prop. 
                // This guarantees reference stability (e.g., mock.sendEmail === mock.sendEmail evaluates to true) 
                // and prevents recreating the function on subsequent property reads.
                target[prop] = mockFn;
            }

            // Returns the cached mock function (or undefined / inspection handler) to the caller.
            return target[prop];
        }
    });
}

const mockEmailProvider = createAutoMock();

// 1. Invoke methods on demand
const res1 = await mockEmailProvider.sendWelcomeEmail("alice@example.com", { templateId: 4 });
console.log(res1); // { mockHandled: true, method: 'sendWelcomeEmail' }

const res2 = await mockEmailProvider.sendPasswordReset("bob@example.com");
console.log(res2); // { mockHandled: true, method: 'sendPasswordReset' }

// 2. Inspect recorded calls for invoked methods
console.log(mockEmailProvider.__getCalls("sendWelcomeEmail")); // [ { args: [ 'alice@example.com', { templateId: 4 } ], timestamp: 17... } ]
console.log(mockEmailProvider.__getCalls("sendPasswordReset")); // [ { args: [ 'bob@example.com' ], timestamp: 17... } ]

// 3. Inspect a method that was NEVER called (returns fallback [])
console.log(mockEmailProvider.__getCalls("sendContactDetails")); // []

// 4. Verify function identity stability (same method reference across reads)
console.log(mockEmailProvider.sendWelcomeEmail === mockEmailProvider.sendWelcomeEmail); // true

// 5. Verify Promise/thenable safety (awaiting the mock resolves directly to itself)
console.log((await mockEmailProvider) === mockEmailProvider); // true