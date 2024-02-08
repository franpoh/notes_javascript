/* 
Table of Contents
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



// ----------------------------- > Symbol.iterator

// The Symbol.iterator static data property represents the well-known symbol @@iterator. 
// The iterable protocol looks up this symbol for the method that returns the iterator for an object. 
// In order for an object to be iterable, it must have an @@iterator key.



// User-defined iterables

const iterable1 = {};

iterable1[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log(iterable1); // Object { [Symbol(Symbol.iterator)]: [GeneratorFunction (anonymous)] }
console.log(...iterable1); // 1 2 3
console.log([...iterable1]); // [1, 2, 3]



// Whenever an object needs to be iterated (such as at the beginning of a for...of loop), 
// its @@iterator method is called with no arguments, and the returned iterator is used to obtain the values to be iterated.



