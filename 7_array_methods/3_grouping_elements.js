
// The Object.groupBy() static method groups the elements of a given iterable according to the string values returned by a provided callback function. 
// The returned object has separate properties for each group, containing arrays with the elements in the group.

// Syntax: Object.groupBy(items, callbackFunction)



// Here we have a simple inventory array that contains "food" objects that have a name and a type.

const inventory = [
    { name: "asparagus", type: "vegetables" },
    { name: "bananas", type: "fruit" },
    { name: "goat", type: "meat" },
    { name: "cherries", type: "fruit" },
    { name: "fish", type: "meat" },
];

// To use Object.groupBy(), you supply a callback function that is called with the current element, and optionally the current index and array, and returns a string indicating the group of the element.

// The code below uses an arrow function to return the type of each array element (this uses *object destructuring syntax for function arguments to unpack the type element from the passed object). 
// The result is an object that has properties named after the unique strings returned by the callback. 
// Each property is assigned an array containing the elements in the group.

// * object destructuring: See destructuring.js

const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result);
/* 
[Object: null prototype] {
    vegetables: 
    [
        { name: 'asparagus', type: 'vegetables' }
    ],
    fruit: 
    [
        { name: 'bananas', type: 'fruit' },
        { name: 'cherries', type: 'fruit' }
    ],
    meat: 
    [
        { name: 'goat', type: 'meat' },
        { name: 'fish', type: 'meat' }
    ]
}
*/

// Note that the returned object references the same elements as the original array (not deep copies). 
// Changing the internal structure of these elements will be reflected in both the original array and the returned object.

for (const prop in result) {
    result[prop].forEach((value) => {
        value.type = 'food'
    });
}

console.log(result);
/* 
[Object: null prototype] {
    vegetables: 
    [
        { name: 'asparagus', type: 'food' }
    ],
    fruit: 
    [
        { name: 'bananas', type: 'food' },
        { name: 'cherries', type: 'food' }
    ],
    meat: 
    [
        { name: 'goat', type: 'food' }, 
        { name: 'fish', type: 'food' }
    ]
}
*/

console.log(inventory);
/*
[
  { name: 'asparagus', type: 'food' },
  { name: 'bananas', type: 'food' },
  { name: 'goat', type: 'food' },
  { name: 'cherries', type: 'food' },
  { name: 'fish', type: 'food' }
]
*/



// If you can't use a string as the key, for example, if the information to group is associated with an object that might change, then you can instead use Map.groupBy().
// This is very similar to Object.groupBy() except that it groups the elements of the array into a *Map that can use an arbitrary value (object or primitive) as a key.

// * Map: See 8_keyed_collections\map_set