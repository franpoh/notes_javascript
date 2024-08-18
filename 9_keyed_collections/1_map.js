/* 
Table of Contents

> MAPS
>> Benefits of using Map over a normal Object
>> Iterating through a Map
*/



// Map and Set objects are collections of data which are indexed by a key; Map and Set objects contain elements which are iterable in the order of insertion.



// ----------------------------- > MAPS -----------------------------

// A Map holds key-value pairs where the keys can be any datatype.
// A key in the Map may only occur once; it is unique in the Map's collection.
// A Map remembers the original insertion order of the keys.
// A Map has a property that represents the size of the map.
// Maps are Objects



// ----------------------------- > MAPS >> Benefits of using Map over a normal Object

// A map does not contain any keys by default. It only contains what is explicitly put into it.
// An Object has a prototype, so it contains default keys that could collide with your own keys if you're not careful. 

// NOTE: A Map is safe to use with user-provided keys and values.
// Setting user-provided key-value pairs on an Object may allow an attacker to override the object's prototype, which can lead to *object injection attacks

// The keys of an Object are strings or symbols
// A Map's keys can be any value (including functions, objects, or any primitive). 

// The keys in Map are ordered in a simple, straightforward way: A Map object iterates entries, keys, and values in the order of entry insertion. 

// The number of items in a Map is easily retrieved from its size property, while you have to manually keep track of size for an Object

// A Map is an iterable, so it can be directly iterated. 

// Performs better in scenarios involving frequent additions and removals of key-value pairs. 



// * object injection attacks: See Cheatsheet\prototype_pollution.js



// These three tips can help you to decide whether to use a Map or an Object:
//      Use maps over objects when keys are unknown until run time, and when all keys are the same type and all values are the same type.
//      Use maps if there is a need to store primitive values as keys because object treats each key as a string whether it's a number value, boolean value or any other primitive value.
//      Use objects when there is logic that operates on individual elements.



// -----------------------------

const fruits = new Map(); // new Map() - Create a Map

console.log(fruits); // Map(0) {}



const fruitBasket = new Map([ // You can create a Map by passing an Array to the new Map() constructor:
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

console.log(fruitBasket); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }



const fruitBowl = new Map();

fruitBowl.set("apples", 500); // set() - add elements to a Map 
fruitBowl.set("oranges", 200);

console.log(fruitBowl); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }



fruitBowl.set("apples", 1000); // set() can also be used to change existing Map values

console.log(fruitBowl); // Map(3) { 'apples' => 1000, 'bananas' => 300, 'oranges' => 200 }



// get() - Returns the value associated to the passed key
console.log(fruitBowl.get("oranges")); // 200



// has() - Returns true if a key exists in a Map
console.log(fruitBowl.has("oranges")); // true


// size - Returns the number of Map elements
console.log(fruitBowl.size); // 3



const fruitTray = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

// only makes a shallow copy, the objects inside are not copied so references are the same between the two arrays
const fruitClone = new Map(fruitTray); // clone() - clone a Map

console.log(fruitClone); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }
console.log(fruitTray === fruitClone); // false (the data itself is not cloned)



fruitTray.delete("apples"); // delete() - Removes a Map element specified by a key

console.log(fruitTray); // Map(2) { 'bananas' => 300, 'oranges' => 200 }



fruitTray.clear(); // clear() - Removes all the elements from a Map

console.log(fruitTray); // Map(0) {}



const fruitCup = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

const fruitSpoon = new Map([
    ["apples", 500],
    ["kiwis", 100],
]);

const fruitMerge = new Map([...fruitCup, ...fruitSpoon]); // merge() - merge maps while maintaining key uniqueness

console.log(fruitMerge); // Map(4) { 'apples' => 500,'bananas' => 300, 'oranges' => 200, 'kiwis' => 100 }



// ----------------------------- > MAPS >> Iterating through a Map 

const fruitColours = new Map([
    ["apples", "red"],
    ["bananas", "yellow"],
    ["oranges", "orange"]
]);



for (const fruit of fruitColours.keys()) { // keys() - Returns an iterator object with the keys in a Map
    console.log(fruit); // apples bananas oranges
}



for (const fruit of fruitColours.values()) { // values() - Returns an iterator object of the values in a Map
    console.log(fruit); // red yellow orange
}



for (const fruit of fruitColours.entries()) { // entries() - Returns an iterator object with the [key, value] pairs in a Map
    console.log(fruit); // [ 'apples', 'red' ] [ 'bananas', 'yellow' ] [ 'oranges', 'orange' ]
}



fruitColours.forEach((value, key) => { // forEach() - Invokes a callback for each key/value pair in a Map
    console.log(`${key} = ${value}.`) // apples = red. bananas = yellow. oranges = orange.
});



