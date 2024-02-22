// When you hear about 'everything is an object' in Javascript, it doesn't mean that everything is actually an object
// Unlike objects, all primitives are immutable; that is, they cannot be altered.



// NOTE: However, primitives have no methods but still behave as if they do
// This is because When properties are accessed on primitives, JavaScript auto-boxes the value into a wrapper object and accesses the property on that object instead. 
// For example, "foo".includes("f") implicitly creates a String wrapper object and calls String.prototype.includes() on that object. 

// This auto-boxing behavior is not observable in JavaScript code but is a good mental model of various behaviors — 
// for example, why "mutating" primitives does not work (because str.foo = 1 is not assigning to the property foo of str itself, but to an ephemeral wrapper object).



// All primitive types (except for the types of undefined and null) have associated wrapper classes:

// Booleans have the wrapper class Boolean.
// Numbers have the wrapper class Number.
// Strings have the wrapper class String.
// Etc.



// ----- Example

let s = 'foo';
let sub = s.substring(1, 2);

console.log(sub); // o

// Behind the scenes, s.substring(1, 2) behaves as if it is performing the following (approximate) steps:

// Create a wrapper String object from s, equivalent to using new String(s)
// Call the substring() method with the appropriate parameters on the String object returned by step 1
// Dispose of the String object
// Return the string(primitive) from step 2



// A consequence of this is that while it looks as though you can assign properties to primitives, it is pointless because you cannot retrieve them:

let q = "foo";
q.bar = "cheese";

console.log(q.bar); // undefined

// This happens because the property is effectively defined on a String object that is immediately discarded.



// Numbers and Booleans also behave this way. 
// Functions, however, are fully-fledged objects, and inherit from Object,prototype
// Functions therefore can do anything objects can, including having properties:

function foo() { }
foo.bar = "tea";

console.log(foo.bar); // tea
console.log(foo); // [Function: foo] { bar: 'tea' }

