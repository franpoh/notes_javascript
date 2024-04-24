/* 
Table of Contents

> SYMBOL.ITERATOR
>> Iteration Protocols
>>> The Iterable Protocol
>>> The Iterator Protocol
>>> Examples
*/

// In addition to user-defined symbols, JavaScript has some built-in symbols: Well-known Symbols
// These represent internal language behaviors which were not exposed to developers in < ES5. 



// All static properties of the Symbol constructor are Symbols themselves, whose values are constant across realms. 
// They are known as well-known Symbols, and their purpose is to serve as "protocols" for certain built-in JavaScript operations, allowing users to customize the language's behavior. 
// For example, if a constructor function has a method with Symbol.hasInstance as its name, this method will encode its behavior with the instanceof operator.



// Prior to well-known Symbols, JavaScript used normal properties to implement certain built-in operations. 
// For example, the JSON.stringify function will attempt to call each object's toJSON() method, and the String function will call the object's toString() and valueOf() methods. 
// However, as more operations are added to the language, designating each operation a "magic property" can break backward compatibility and make the language's behavior harder to reason with. 
// Well-known Symbols allow the customizations to be "invisible" from normal code, which typically only read string properties.



// In MDN and other sources, well-known symbol values are stylized by prefixing @@. 
// For example, Symbol.hasInstance is written as @@hasInstance. 
// This is because symbols don't have actual literal formats, but using Symbol.hasInstance does not reflect the ability of using other aliases to refer to the same symbol. 
// This is like the difference between Function.name and "Function".



// ----------------------------- > SYMBOL.ITERATOR -----------------------------

// The Symbol.iterator static data property represents the well-known symbol @@iterator. 
// The iterable protocol looks up this symbol for the method that returns the iterator for an object. 
// In order for an object to be iterable, it must have an @@iterator key.



// User-defined iterables

const iterable1 = {};

iterable1[Symbol.iterator] = function* () { // using square brackets to access object properties, see object > object.js > SQUARE BRACKET NOTATION
    yield 1;
    yield 2;
    yield 3;
};

// iterable1 is currently an object with only a method in it, no properties
console.log(iterable1); // Object { [Symbol(Symbol.iterator)]: [GeneratorFunction (anonymous)] }
console.log(...iterable1); // 1 2 3
console.log([...iterable1]); // [1, 2, 3]



// NOTE: Here is an explanation of how the spread syntax helps to produce a usable array from the iterator object
// Simply put, it spreads the values of the iterator into an array. Here is the process step-by-step
//      All iterator object has an iterator protocol, which defines how to produce a sequence of values from an object
//      the iteration protocol includes a next() method, which return an object with 2 properties: 'value', and a boolean 'done'
//      When the spread syntax is used on the iterator object, it internally calls the iterator's next() method repeatedly to retrieve each yielded value
//      As the spread syntax iterates over the iterator, it collects all the value properties from the next() method calls into a new array.
//      This process continues until the done property from the next() method returns true, indicating that there are no more values to iterate over.



// let's look at what the object will look like with more properties
const iterable2 = {
    item1: 'foo',
    item2: 'bar',
};

iterable2[Symbol.iterator] = function* () {
    yield this.item1; // 'this' required, otherwise 'ReferenceError: item1 is not defined'
    yield this.item2;
};

console.log(iterable2);
/* 
Object {
    item1: 'foo',
    item2: 'bar',
    [Symbol(Symbol.iterator)]: [GeneratorFunction(anonymous)]
}
*/

console.log(...iterable2) // foo bar



// Whenever an object needs to be iterated (such as at the beginning of a for...of loop), 
// its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.



// Some built-in types have a default iteration behavior, while other types (such as Object) do not. 
// Some built-in types with a @@iterator method are:

// Array.prototype[@@iterator]()
// TypedArray.prototype[@@iterator]()
// String.prototype[@@iterator]()
// Map.prototype[@@iterator]()
// Set.prototype[@@iterator]()



// ----------------------------- > SYMBOL.ITERATOR >> Iteration Protocols

// Iteration protocols aren't new built-ins or syntax, but protocols. These protocols can be implemented by any object by following some conventions.



// ----------------------------- > SYMBOL.ITERATOR >> Iteration Protocols >>> The Iterable Protocol

// The iterable protocol allows JavaScript objects to define or customize their iteration behavior, such as what values are looped over in a for...of construct. 
// Some built-in types are built-in iterables with a default iteration behavior, such as Array or Map, while other types (such as Object) are not.

// In order to be iterable, an object must implement the @@iterator method, 
// meaning that the object (or one of the objects up its prototype chain) must have a property with a @@iterator key which is available via constant Symbol.iterator.

// [Symbol.iterator]: A zero-argument function that returns an object, conforming to the iterator protocol.



// Whenever an object needs to be iterated (such as at the beginning of a for...of loop), 
// its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.

// Note that when this zero-argument function is called, it is invoked as a method on the iterable object. 
// NOTE: Therefore inside of the function, the this keyword can be used to access the properties of the iterable object, to decide what to provide during the iteration.



// NOTE: This function can be an ordinary function, or it can be a generator function, so that when invoked, an iterator object is returned. 
// Inside of this generator function, each entry can be provided by using yield.



// ----------------------------- > SYMBOL.ITERATOR >> Iteration Protocols >>> The Iterator Protocol

// The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.
// FRANCINE NOTE: The methods mentioned correspond with the generator function methods



// ----- 

// An object is an iterator when it implements a next() method with the following semantics:

// next()
// A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface (see below). 
// If a non-object value gets returned(such as false or undefined) when a built-in language feature(such as for...of) is using the iterator, 
// a TypeError ("iterator.next() returned a non-object value") will be thrown.



// -----

// All iterator protocol methods (next(), return(), and throw()) are expected to return an object implementing the IteratorResult interface. 
// It must have the following properties:

// done (Optional)
// A boolean that's false if the iterator was able to produce the next value in the sequence. (This is equivalent to not specifying the done property altogether.)
// Has the value true if the iterator has completed its sequence. In this case, value optionally specifies the return value of the iterator.

// value (Optional)
// Any JavaScript value returned by the iterator. Can be omitted when done is true.



// -----

// In practice, neither property is strictly required; if an object without either property is returned, it's effectively equivalent to { done: false, value: undefined }.

// If an iterator returns a result with done: true, any subsequent calls to next() are expected to return done: true as well, although this is not enforced on the language level.

// The next method can receive a value which will be made available to the method body. 
// No built-in language feature will pass any value. 
// The value passed to the next method of generators will become the value of the corresponding yield expression.



// -----

// Optionally, the iterator can also implement the return(value) and throw(exception) methods, 
// which, when called, tells the iterator that the caller is done with iterating it and can perform any necessary cleanup (such as closing database connection).

// return(value) (Optional)
// A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface, typically with value equal to the value passed in and done equal to true. 
// Calling this method tells the iterator that the caller does not intend to make any more next() calls and can perform any cleanup actions.

// throw(exception) (Optional)
// A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface, typically with done equal to true. 
// Calling this method tells the iterator that the caller detects an error condition, and exception is typically an Error instance.



// NOTE: It is not possible to know reflectively (i.e. without actually calling next() and validating the returned result) whether a particular object implements the iterator protocol.



// ----------------------------- > SYMBOL.ITERATOR >> Iteration Protocols >>> Examples

// It is very easy to make an iterator also iterable: just implement an [@@iterator]() method that returns 'this'.



// ----- Satisfies both the Iterator Protocol and Iterable

const myIterator = {
    next() {
        // ...
    },
    [Symbol.iterator]() {
        return this;
    },
};

// In this example, mijnIterator is an object that implements the iterator protocol. 
// It has an array (data), an index to keep track of the current position (index), and a next method that returns the next value in the sequence along with the done flag.

// The [Symbol.iterator] method returns the iterator itself, allowing it to be used in a for...of loop or with other iterable features in JavaScript.

const mijnIterator = {

    data: [1, 2, 3],

    index: 0,

    // Define a method called 'next' for the iterator
    next() {
        if (this.index < this.data.length) {
            return { value: this.data[this.index++], done: false };
        } else {
            return { done: true };
        }
    },

    // Define a method that returns the iterator itself when called with Symbol.iterator
    [Symbol.iterator]() {
        return this; // mouse over 'this'
    },
};

// Iterate over the elements using a for...of loop
for (let x of mijnIterator) {
    console.log(`The return value is ${x}.`);
}

// The return value is 1.
// The return value is 2.
// The return value is 3.



// Such object is called an iterable iterator. 

// Doing so allows an iterator to be consumed by the various syntaxes expecting iterables — 
// therefore, it is seldom useful to implement the Iterator Protocol without also implementing Iterable. 
// (In fact, almost all syntaxes and APIs expect iterables, not iterators.) 



// The generator object is an example:

const aGeneratorObject = (function* () {
    yield 1;
    yield 2;
    yield 3;
})();

console.log(typeof aGeneratorObject.next);
// function - it has a next method (which returns the right result), so it's an iterator

console.log(typeof aGeneratorObject[Symbol.iterator]);
// function - it has an @@iterator method (which returns the right iterator), so it's an iterable

console.log(aGeneratorObject[Symbol.iterator]() === aGeneratorObject);
// true - its @@iterator method returns itself (an iterator), so it's an iterable iterator

console.log(...aGeneratorObject); // 1 2 3

// All built-in iterators inherit from Iterator.prototype, which implements the[@@iterator]() method as returning this, so that built-in iterators are also iterable.
// However, when possible, it's better for iterable[Symbol.iterator] to return different iterators that always start from the beginning, like Set.prototype[@@iterator]() does.




// ----- Iterables can be defined directly inside a class or object using a computed property

class Foo {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

console.log(new Foo); // Foo {}
console.log(...new Foo()); // 1, 2, 3



const someObj = {
    item1: 'foo',
    *[Symbol.iterator]() {
        yield "a";
        yield this.item1;
    },
};

console.log(someObj);
/* 
Object {
    item1: 'foo',
    [Symbol(Symbol.iterator)]: [GeneratorFunction: [Symbol.iterator]]
}
*/

console.log(...someObj); // a foo



// ----- Iterating over a string

let okIterator = "OK"[Symbol.iterator]();

console.log(okIterator.next()); // {value: "O", done: false}
console.log(okIterator.next()); // {value: "K", done: false}
console.log(okIterator.next()); // {value: undefined, done: true} 

// See object > object_wrapper.js
