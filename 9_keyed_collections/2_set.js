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

function whatNum (thisThing) {

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

whatNum(duckSet); // The list of keys are as follows: Mallard, Lesser Whistling Duck, and Gadwell. The list of values are as follows: Mallard, Lesser Whistling Duck, and Gadwell.
whatNum(heronMap); // The list of keys are as follows: Yellow Bittern, Little Egret, and Grey Heron. The list of values are as follows: small, medium, and large.



// +++++ Example of adding variables to a set

const lettering = new Set();

const a = "1";
const b = "2";
const c = "3";

lettering.add(a);
lettering.add(b);
lettering.add(c);

console.log(lettering); // Set(3) { '1', '2', '3' }