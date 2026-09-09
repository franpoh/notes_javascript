/* 
Table of Contents

> SETS
>> A Set have no Keys
>> WEAKSET
*/



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



// +++++ set() - Creates a new empty Set

const newSet = new Set();
console.log(newSet); // Set(0) {}

// create new Set and passing in an array

const vegetables = new Set(["carrot", "lettuce", "zucchini"]);
console.log(vegetables); Set(3) // { 'carrot', 'lettuce', 'zucchini' }


// +++++ add() - Adds a new element to the Set 

const moreVeg = new Set(["carrot", "lettuce", "zucchini"]);
console.log(moreVeg); // Set(3) { 'carrot', 'lettuce', 'zucchini' }

moreVeg.add("broccoli");
moreVeg.add("radish"); // If you add equal elements, only the first will be saved:
moreVeg.add("radish"); // not added

console.log(moreVeg); // Set(5) { 'carrot', 'lettuce', 'zucchini', 'broccoli', 'radish' }



// +++++ size() - Returns the number of Set elements

const sizeVeg = new Set(["carrot", "lettuce", "zucchini"]);
console.log(sizeVeg.size); // 3



// +++++ delete() - Removes an element from a Set

const lessVeg = new Set(["carrot", "lettuce", "zucchini"]);

console.log(lessVeg); // Set(3) { 'carrot', 'lettuce', 'zucchini' }

lessVeg.delete("lettuce");
console.log(lessVeg); // Set(2) { 'carrot', 'zucchini' }



// +++++ has() - Returns true if a value exists - true

const gotVeg = new Set(["carrot", "lettuce", "zucchini"]);

console.log(gotVeg.has("lettuce")); // true
console.log(gotVeg.has("broccoli")); // false



// +++++ clear() - Removes all elements from a Set

const noVeg = new Set(["carrot", "lettuce", "zucchini"]);

noVeg.clear();
console.log(noVeg); // Set(0) {}



// +++++ Converting between Array and Set

// You can create an Array from a Set using Array.from or the spread syntax.

const mySet = new Set(["apple", "banana", "cherry"]);

// Using Array.from
const arrayFrom = Array.from(mySet); 
console.log(arrayFrom); // [ "apple", "banana", "cherry" ]

// Using spread syntax
const arraySpread = [...mySet];
console.log(arraySpread); // [ "apple", "banana", "cherry" ]



// Also, the Set constructor accepts an Array to convert in the other direction.
// Note: Set objects store unique values—so any duplicate elements from an Array are deleted when converting!

const arrayDupe = ["apple", "banana", "banana", "cherry"];
const setNoDupe = new Set(arrayDupe);

console.log(setNoDupe); // Set(3) { 'apple', 'banana', 'cherry' } - duplicate "banana" removed



// +++++ Array and Set compared

// Traditionally, a set of elements has been stored in arrays in JavaScript in a lot of situations.
// The Set object, however, has some advantages:

// Deleting Array elements by value - (arr.splice(arr.indexOf(val), 1)) - is very slow.
// Set objects let you delete elements by their value. With an array, you would have to splice based on an element's index.

// Set objects store unique values.You don't have to manually keep track of duplicates.



// ----------------------------- > SETS >> Iterating through a Set

const spellName = new Set(["f", "r", "a", "n"]);

let myName = "";

spellName.forEach(function (value) { // forEach() - invokes a callback for each element
    myName += value;
})

console.log(myName); // fran



const waterbirds = new Set(["heron", "duck", "swan"]);

for (const bird of waterbirds.values()) { // values() - returns a new set iterator object that contains the values for each element in the Set object in insertion order.
    console.log(bird); // heron duck swan
}



// ----------------------------- > SETS >> A Set have no Keys

// This particular property of Sets makes Sets compatible with Map

const numbers = new Set([1, 2, 3, 4, 5]);

// Here, we return the values of the numbers set by using values()

for (const item of numbers.values()) {
    console.log(item); // 1 2 3 4 5
}

// A Set has no keys, therefore while using keys(), it returns the same as values()

for (const item of numbers.keys()) {
    console.log(item); // 1 2 3 4 5 
}

// While using entries(), it returns an Iterator with [value,value] pairs instead of [key,value] pairs from a Set
for (const item of numbers.entries()) {
    console.log(item); // [ 1, 1 ] [ 2, 2 ] [ 3, 3 ] [ 4, 4 ] [ 5, 5 ]
}

// The reason why this property makes Sets compatible with Map:
// it allows generic functions to handle both Sets and Maps interchangeably without having to check for the type of data structure first



// +++++ Example of a function that works with both Sets and Maps

const duckSet = new Set(["Mallard", "Lesser Whistling Duck", "Gadwell"]);
const heronMap = new Map([
    ["small", "Yellow Bittern"],
    ["medium", "Little Egret"],
    ["large", "Grey Heron"]
]);

console.log(duckSet); // Set(3) { 'Mallard', 'Lesser Whistling Duck', 'Gadwell' }
console.log(heronMap); // Map(3) { 'small' => 'Yellow Bittern', 'medium' => 'Little Egret', 'large' => 'Grey Heron' }

function whatBird(thisThing) {

    let thisKey = "The list of keys are as follows: ";
    let thisValue = "The list of values are as follows: ";
    let counter = 1;

    for (const [value, key] of thisThing.entries()) {

        let counterCheck = thisThing.size === counter;

        thisKey += !counterCheck ? `${key}, ` : `and ${key}.`;
        thisValue += !counterCheck ? `${value}, ` : `and ${value}.`

        counter++;
    }

    console.log(thisKey, thisValue);

}

whatBird(duckSet); // The list of keys are as follows: Mallard, Lesser Whistling Duck, and Gadwell. The list of values are as follows: Mallard, Lesser Whistling Duck, and Gadwell.
whatBird(heronMap); // The list of keys are as follows: Yellow Bittern, Little Egret, and Grey Heron. The list of values are as follows: small, medium, and large.



// +++++ Example of adding variables to a set

const cats = new Set();

const small = "house cat";
const medium = "leopard";
const large = "tiger";

cats.add(small);
cats.add(medium);
cats.add(large);

console.log(cats); // Set(3) { 'house cat', 'leopard', 'tiger' }



// ----------------------------- > WEAKSET -----------------------------

// WeakSet objects are collections of garbage-collectable values, including objects and non-registered symbols. 
// A value in the WeakSet may only occur once. It is unique in the WeakSet's collection.

let firstName = { firstName: "Francine" };
let lastName = { lastName: "Poh" };

let thisWeakSet = new WeakSet([firstName, lastName]);
console.log(thisWeakSet.has(firstName)); // true

// thisWeakSet.add("This is a string"); // TypeError: Invalid value used in weak set - weaksets only allows objects and non-registered symbols

// References to objects in weaksets are held weakly. 
// If there is no other reference to an object stored in the WeakSet, they can be garbage collected. 
// That also means that there is no list of current objects stored in the collection.

firstName = null;
console.log(thisWeakSet.has(firstName)); // false - and the entry will be garbage collected

// Since there is no list of current objects stored in the collection, WeakSets are not enumerable and don't have a size method. 



// The use cases of WeakSet objects are limited. 
// They will not leak memory, so it can be safe to use DOM elements as a key and mark them for tracking purposes, for example.



// +++++ NOTE: Both the key equality of Map objects and the value equality of Set objects are based on the *Same-value-zero equality
// Map and Set use Same-value-zero equality internally to locate keys and entries.

// * Same-value-zero: Same-value equality determines whether two values are functionally identical in all contexts. 
// Same-value-zero is similar to same-value equality, but +0 and -0 are considered equal.

// Equality works like the identity comparison operator ===.

const thisColour = { colour: "yellow" };

const testSet = new Set(["red", "green", NaN, thisColour]);

const testMap = new Map ([
    ["red", "apple"],
    ["green", "durian"],
    ["nothing", NaN],
    [ thisColour, "banana" ]
]);

// NaN is considered equal to itself (contrary to ===).

console.log(NaN === NaN); // false - usual behaviour, see Cheatsheet\coding\nan.js
console.log(testSet.has(NaN)); // true

// Remember, Map and Set use SameValueZero internally - .has(), .get(), and .delete() - to locate keys and entries. 
// However, once .get() hands the value back to your code, standard JavaScript rules take over for whatever operator you use next.

console.log(testMap.get("nothing") === NaN); // false

// Same-value-zero equality means that for object values, equality is based on object identity. They are compared by reference, not by value.

console.log(testSet.has({ colour: "yellow" })); // false
console.log(testSet.has(thisColour)); // true

console.log(testMap.get({ colour: "yellow" })); // undefined
console.log(testMap.get(thisColour)); // banana

