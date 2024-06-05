/* 
Table of Contents

> MAPS
>> Benefits of using Map over a normal Object
>> Iterating through a Map
> SETS
>> A Set have no Keys
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

// A Map's keys can be any value (including functions, objects, or any primitive). 

// The keys in Map are ordered in a simple, straightforward way: A Map object iterates entries, keys, and values in the order of entry insertion. 

// The number of items in a Map is easily retrieved from its size property.

// A Map is an iterable, so it can be directly iterated. 

// Performs better in scenarios involving frequent additions and removals of key-value pairs. 



// * object injection attacks: See Cheatsheet\prototype_pollution.js



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



// ----------------------------- > SETS -----------------------------

// The Set object lets you store unique values of any type, whether primitive values or object references.
// Sets are Objects
// Each value can only occur once in a Set.
// A Set can hold any value of any data type.

// You can iterate through the elements of a set in insertion order. 
// The insertion order corresponds to the order in which each element was inserted into the set by the add() method successfully 
// (that is, there wasn't an identical element already in the set when add() was called).



// You can create a JavaScript Set by:
// Passing an Array to new Set()
// Create a new Set and use add() to add values
// Create a new Set and use add() to add variables

const test = new Set(); // new Set() - Creates a new Set
console.log(test); // Set(0) {}

const letters = new Set(["a", "b", "c"]); // create new Set by passing in an array
console.log(letters); // Set(3) { 'a', 'b', 'c' }
console.log(letters);



letters.add("d"); // add() - Adds a new element to the Set 
letters.add("e");
letters.add("f"); // If you add equal elements, only the first will be saved:
letters.add("f"); // not added

console.log(letters); // Set(6) { 'a', 'b', 'c', 'd', 'e', 'f' }



letters.delete("e"); // delete() - Removes an element from a Set
console.log(letters); // Set(5) { 'a', 'b', 'c', 'd', 'f' }



console.log(letters.has("a")); // has() - Returns true if a value exists - true
console.log(letters.has("e")); // false



letters.clear(); // clear() - Removes all elements from a Set
console.log(letters); // Set(0) {}



const moreLetters = new Set(["f", "r", "a", "n"]);

let text = "";

moreLetters.forEach(function (value) { // forEach() - invokes a callback for each element
    text += value;
})

console.log(text); // fran



const names = new Set(["francine", "werner"]);

names.add("poh");
names.add("marschall");

for (const item of names.values()) { // values() - returns a new set iterator object that contains the values for each element in the Set object in insertion order.
    console.log(item); // francine werner poh marschall
}



// ----------------------------- > SETS >> A Set have no Keys

// This particular property of Sets makes Sets compatible with Map

const numbers = new Set([1, 2, 3, 4, 5]);

for (const item of numbers.values()) { // values()
    console.log(item); // 1 2 3 4 5
}

// A Set has no keys, therefore while using keys()

for (const item of numbers.keys()) { // keys() - returns the same as values(), which makes Sets compatible with Map
    console.log(item); // 1 2 3 4 5 
}

// While using entries()

for (const item of numbers.entries()) { // entries() - returns an Iterator with the [value,value] pairs instead of [key,value] pairs from a Set
    console.log(item); // [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ] [ 5, 5 ]
}



// Adding variables to a set

const lettering = new Set();

const a = "1";
const b = "2";
const c = "3";

lettering.add(a);
lettering.add(b);
lettering.add(c);

console.log(lettering); // Set(3) { '1', '2', '3' }



