/* 
Table of Contents

> INDEXOF() / LASTINDEXOF()
> FINDINDEX
> SUMMING UP
> ACCESS VALUE BY LOCATION WITHIN ARRAY
> REPLACE INDIVIDUAL ARRAY ITEMS
> SPLIT
> JOIN
> FROM
> LENGTH 
> DELETE
> PUSH / ARRAY.POP
> UNSHIFT / ARRAY.SHIFT
> CONCAT
> SLICE
> TEST
> ACCESSING EVERY ITEM  
*/



// ----------------------------- > INDEXOF() / LASTINDEXOF() -----------------------------

// ----- indexOf() returns the first index at which a given element can be found in the array, or -1 if it is not present.

// If the item is present more than once, it returns the position of the first occurrence.

let fruits = ["Banana", "Orange", "Apple", "Mango", "Pineapple", "Apple", "Melon", "Cherry"];

console.log(fruits.indexOf("Apple")); // 2
console.log(fruits.indexOf("Cucumber")); // -1

// If starting index < -array.length or starting index is omitted, 0 is used, causing the entire array to be searched.

console.log(fruits.indexOf("Melon")); // 6

// Optional specified starting index, starts from the 6th index 

console.log(fruits.indexOf("Cherry", 6)); // 7
console.log(fruits.indexOf("Apple", 6)); // -1

// Negative index counts back from the end of the array

console.log(fruits.indexOf("Apple", -2)) // -1
console.log(fruits.indexOf("Apple", -3)) // 5

// If starting index >= array.length, the array is not searched and -1 is returned.

console.log(fruits.indexOf("Apple", 9)) // -1



// ----- lastIndexOf(): returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at the specified index. 

fruits = ["Banana", "Orange", "Apple", "Mango", "Pineapple", "Apple", "Melon", "Cherry"];

console.log(fruits.lastIndexOf("Apple")); // 5
console.log(fruits.lastIndexOf("Cucumber")); // -1

// Optional specified starting index, starts from the 3rd index 

console.log(fruits.lastIndexOf("Apple", 3)); // 2
console.log(fruits.lastIndexOf("Apple", 1)); // -1

// Negative index counts back from the end of the array

console.log(fruits.lastIndexOf("Apple", -4)); // 2

// If starting index >= array.length, array.length - 1 is used, causing the entire array to be searched.

console.log(fruits.lastIndexOf("Apple", 9)); // 5



// ----------------------------- > FINDINDEX -----------------------------

// The findIndex() method returns the index of the first array element that passes a test function.

// This example finds the index of the first element that is larger than 18:

const nums = [4, 9, 16, 25, 29];

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself

// in this case, only the value is being used
function myFunction(value, index, array) {
    return value > 18;
}

console.log("findIndex: " + nums.findIndex(myFunction)); // findIndex: 3



// ----------------------------- > SUMMING UP -----------------------------

let numArray1 = [1, 2, 3, 4, 5];
let numSum1 = 0;

for (let z in numArray1) {
    numSum1 += numArray1[z];
}

console.log("Summing Up: " + numSum1); // numSum: 15



// ----------------------------- > ACCESS VALUE BY LOCATION WITHIN ARRAY -----------------------------

let myNameArray = ['Chris', 'Bob', 'Jim'];

console.log("Name in first position: " + myNameArray[0]); // Name in first position: Chris



// ----------------------------- > REPLACE INDIVIDUAL ARRAY ITEMS -----------------------------

myNameArray[0] = 'Mark';

console.log("myNameArray: " + myNameArray); // myNameArray: Mark,Bob,Jim



// ----------------------------- > SPLIT -----------------------------

// separate out raw data contained in a big long string into individual items 
// takes a single parameter, the character you want to separate the string at, and returns the substrings between the separator as items in an array.

let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let myArray = myData.split(',');

console.log("Split: " + myArray); // Split: ['Manchester','London','Liverpool','Birmingham','Leeds','Carlisle']



// ----------------------------- > JOIN -----------------------------

// does the opposite of split

console.log("Join: " + myArray.join(',')); // Join: Manchester,London,Liverpool,Birmingham,Leeds,Carlisle

// With join() you can specify different separators

console.log("Join with / separators: " + myArray.join('/')); // Join with / separators: Manchester/London/Liverpool/Birmingham/Leeds/Carlisle



// toString() is simpler than join() as it doesn't take a parameter, but it always uses a comma.
// JavaScript automatically converts an array to a comma separated string when a primitive value is expected

console.log("toString: " + myArray.toString()); // toString: Manchester,London,Liverpool,Birmingham,Leeds,Carlisle


// ----------------------------- > FROM -----------------------------

// The Array.from() method returns an Array object from any object with a length property or any iterable object.

// Create an Array from a String:

console.log("Array.from: " + Array.from("ABCDEFG"));   // Array.from: A,B,C,D,E,F,G



// ----------------------------- > LENGTH ----------------------------- >

// length of array

let sequence = [1, 1, 2, 3, 5, 8, 13];

console.log("Array length: " + sequence.length); // length: 7



// This has other uses, but it is most commonly used to tell a loop to keep going until it has looped through all the items in an array

// i = 0: Start looping at item number 0 in the array.
// i < sequence.length: Stop looping at the item number equal to the length of the array.
// i++: +1 to the current value of i for each loop
for (let i = 0; i < sequence.length; i++) {
    console.log("Loop through all items in array: " + sequence[i]); // Loop through all items in array: 1 (and so on and so forth)
}



// find length of item in array

const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C']

console.log("Item Length: " + strArray[0].length); // Item Length: 10



// With length, we can also append a new element to the end of the array

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits[fruits.length] = "Kiwi"; // Appends "Kiwi" to fruits

console.log("Use Length to append: " + fruits); // Use Length to append: Banana,Orange,Apple,Mango,Kiwi



// ----------------------------- > DELETE -----------------------------

// delete elements
// Using delete leaves undefined holes in the array
// Use pop() or shift() instead

fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[0];

console.log("Deleted Banana: " + fruits); // Deleted Banana: ,Orange,Apple,Mango
console.log("Deleted Banana: " + fruits[0]); // Deleted Banana: undefined



// ----------------------------- > PUSH / ARRAY.POP -----------------------------

// add or remove an item at the end of an array.



// Array.push adds an item to the end of the array

let myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];

// The new length of the array is returned when the method call completes.
// You can store the new array length in a variable
let newLength = myEnglandArray.push('Bristol');

console.log("Pushed: " + myEnglandArray); // Pushed: Manchester,London,Liverpool,Birmingham,Leeds,Carlisle,Bristol
console.log("Pushed - new array length: " + newLength); // Pushed - new array length: 7


// Can form new array with push

let numArray2 = [];

for (i = 0; i < 5; i++) {
    let x = i;
    numArray2.push(x);
}

console.log("Push - form new array: " + numArray2); // Push - form new array: 0,1,2,3,4



// myArray.pop removes an item at the end of an array.

// The item that was removed is returned when the method call completes.
// You can save the removed item in a variable

let foodArray = ["Egg", "Bread", "Kaya", "Butter", "Soy Sauce", "Pepper"];
let removedItem = foodArray.pop();

console.log("Popped: " + foodArray); // Popped: Egg,Bread,Kaya,Butter,Soy Sauce
console.log("Popped - removed item: " + removedItem); // Popped - removed item: Pepper




// ----------------------------- > UNSHIFT / ARRAY.SHIFT -----------------------------

// work in exactly the same way as push() and pop(), except that they work on the beginning of the array, not the end.

myEnglandArray.unshift('Edinburgh');

myEnglandArray.shift();




// Splice - add new items to an array

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");

// The first parameter(2) defines the position where new elements should be added(spliced in).
// The second parameter(0) defines how many elements should be removed.
// The rest of the parameters("Lemon", "Kiwi") define the new elements to be added.

// The splice() method returns an array with the deleted items:

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 2, "Lemon", "Kiwi");
fruits = ["Banana", "Orange", "Lemon", "Kiwi"];

// remove elements without leaving "holes" in the array:

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(0, 1);   // Removes the first element

// The first parameter(0) defines the position where new elements should be added(spliced in).
// The second parameter(1) defines how many elements should be removed.
// The rest of the parameters are omitted.No new elements will be added.



// ----------------------------- > CONCAT -----------------------------

// creates a new array by merging (concatenating) existing arrays:

const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

console.log("Concat: " + myGirls.concat(myBoys)); // Concat: Cecilie,Lone,Emil,Tobias,Linus



// merging more than 2 arrays: 

const arr1 = ["Cecilie", "Lone"];
const arr2 = ["Emil", "Tobias", "Linus"];
const arr3 = ["Robin", "Morgan"];

console.log("Concat > 2 arrays: " + arr1.concat(arr2, arr3)); // Concat > 2 arrays: Cecilie,Lone,Emil,Tobias,Linus,Robin,Morgan



// merging array with values

const arr4 = ["Emil", "Tobias", "Linus"];

console.log("Concat array with values: " + arr4.concat("Peter")); // Concat array with values: Emil,Tobias,Linus,Peter



// ----------------------------- > SLICE -----------------------------

// The slice() method creates a new array, does not remove any elements from the source array.

fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
const citrus2 = fruits.slice(2); // defined start point only
const citrus3 = fruits.slice(1, 4); // defined start and end point

console.log("Slice - original array: " + fruits); // Slice - original array: Banana,Orange,Lemon,Apple,Mango
console.log("Slice - new array with start point: " + citrus2); // Slice - new array: Lemon,Apple,Mango
console.log("Slice - new array with start/end point: " + citrus3); // Slice - new array with start/end point: Orange,Lemon,Apple


// ----------------------------- > TEST -----------------------------

// The test() method tests for a match in a string.
// This method returns true if it finds a match, otherwise it returns false.

let quote1 = "The best things in life are free";
let match1 = new RegExp("e");

console.log("Test - match 'e': " + match1.test(quote1)); // Test - match 'e': true


let quote2 = "Hello world!";
let match2 = /Hello/g;

console.log("Test - match 'Hello': " + match2.test(quote2)); // Test - match 'Hello': true

let match3 = /Time/g

console.log("Test - match 'Time': " + + match3.test(quote2)); // Test - match 'Time': 0



// Also see under array.filter for another example



// ----------------------------- > ACCESSING EVERY ITEM -----------------------------

// See array\iteration-methods.js

const birds = ['Parrot', 'Falcon', 'Owl'];

for (const bird of birds) {
    console.log(bird);
}

