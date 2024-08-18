/* 
Table of Contents

> SETS
>> A Set have no Keys
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