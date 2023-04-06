// Table of Contents
// > THE SYMBOL TYPE
// > USE CASE
// > ALWAYS UNIQUE
// > DON’T AUTO-CONVERT TO A STRING
// > IN AN OBJECT LITERAL
// > SKIPPED BY FOR…IN
// > GLOBAL SYMBOLS
// >> Symbol.keyFor



// ----------------------------- > THE SYMBOL TYPE -----------------------------

// A JavaScript Symbol is a primitive datatype just like Number, String, or Boolean.
// It represents a unique "hidden" identifier that no other code can accidentally access.

// A value of this type can be created using Symbol():
let id0 = Symbol();

// Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:
id0 = Symbol('id');

// So, to summarize, a symbol is a “primitive unique value” with an optional description.



// By specification, only two primitive types may serve as object property keys:
// string type, or
// symbol type.

// Otherwise, if one uses another type, such as number, it’s autoconverted to string. 
// So that obj[1] is the same as obj["1"], and obj[true] is the same as obj["true"].



// ----------------------------- > USE CASE -----------------------------

// What’s the benefit of using Symbol("id") over a string "id"?

// For instance, if different coders want to add a person.id property to a person object belonging to a third-party code
// As the person object belong to another codebase, it’s unsafe to add fields to it, since we might affect pre-defined behavior in that other codebase. 
// However, symbols cannot be accessed accidentally. 
// The third-party code won’t be aware of newly defined symbols, so it’s safe to add symbols to the user objects.

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue"
};

// id is a symbol with the description "id"
let id = Symbol('id');

person[id] = 140353;
// Now Person[id] = 140353
// but person.id is still undefined



// ----------------------------- > ALWAYS UNIQUE -----------------------------

// If you create two symbols with the same description they will have different values.

let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false



// ----------------------------- > DON’T AUTO-CONVERT TO A STRING -----------------------------

let id3 = Symbol("id3");

alert(id3); // TypeError: Cannot convert a Symbol value to a string

alert(id3.toString()); // Symbol(id3)

// symbol.description property to show the description only
alert(id3.description); // id3



// ----------------------------- > IN AN OBJECT LITERAL -----------------------------

// If we want to use a symbol in an object literal {...}, we need square brackets around it.

let id4 = Symbol("id4");

let user1 = {
    name: "John",
    [id4]: 123 // not "id4": 123
};

// That’s because we need the value from the variable id4 as the key, not the string “id4”.



// ----------------------------- > SKIPPED BY FOR…IN -----------------------------

let id5 = Symbol("id5");

let user2 = {
    name: "John",
    age: 30,
    [id5]: 123
};

for (let key in user) alert(key); // name, age (no symbols)



// Object.keys(user) also ignores them. 
// That’s a part of the general “hiding symbolic properties” principle. 
// If another script or a library loops over our object, it won’t unexpectedly access a symbolic property.



// In contrast, Object.assign copies both string and symbol properties:

let id6 = Symbol("id6");

let user = {
    [id6]: 123
};

let clone = Object.assign({}, user);

alert(clone[id6]); // 123

// There’s no paradox here. That’s by design. 
// The idea is that when we clone an object or merge objects, we usually want all properties to be copied (including symbols like id).



// ----------------------------- > GLOBAL SYMBOLS -----------------------------

// As we’ve seen, usually all symbols are different, even if they have the same name. 
// But sometimes we want same-named symbols to be same entities. 
// For instance, different parts of our application want to access symbol "id" meaning exactly the same property.

// To achieve that, there exists a global symbol registry. 
// We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

// In order to read (create if absent) a symbol from the registry, use Symbol.for(key).
// That call checks the global registry, and if there’s a symbol described as key, then returns it, otherwise creates a new symbol Symbol(key) and stores it in the registry by the given key.



// read from the global registry
let id7 = Symbol.for("id7"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id7");

// the same symbol
alert(id7 === idAgain); // true



// Symbols inside the registry are called global symbols. If we want an application-wide symbol, accessible everywhere in the code – that’s what they are for.



// ----------------------------- > GLOBAL SYMBOLS >> Symbol.keyFor

// We have seen that for global symbols, Symbol.for(key) returns a symbol by name. 
// To do the opposite – return a name by global symbol – we can use: Symbol.keyFor(sym):

// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id

// The Symbol.keyFor internally uses the global symbol registry to look up the key for the symbol. 
// So it doesn’t work for non-global symbols. If the symbol is not global, it won’t be able to find it and returns undefined.



// That said, all symbols have the description property.

let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global

alert( localSymbol.description ); // name



// https://tc39.es/ecma262/#sec-well-known-symbols