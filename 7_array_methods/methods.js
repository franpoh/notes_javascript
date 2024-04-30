/* 
Table of Contents

> COPYING METHODS AND MUTATING METHODS
> ACCESS VALUE BY LOCATION WITHIN ARRAY
> REPLACE INDIVIDUAL ARRAY ITEMS
> SUMMING UP ALL VALUES IN ARRAY
> INDEXOF() / LASTINDEXOF()
> FINDINDEX() / FINDLASTINDEX()
> FIND() / FINDLAST()
> AT()
> WITH()
> SPLIT
> JOIN()
> FROM
> LENGTH 
> DELETE
> PUSH() / POP()
> SHIFT() / UNSHIFT()
> SPLICE
> SLICE()
> CONCAT()
> TEST
> ACCESSING EVERY ITEM  
*/



// ----------------------------- > COPYING METHODS AND MUTATING METHODS -----------------------------

// Let's talk about methods that changes and copies arrays



// Some methods do not mutate the existing array that the method was called on, but instead return a new array. 
// They do so by first constructing a new array and then populating it with elements. 
// The copy always happens shallowly — the method never copies anything beyond the initially created array. 

// Elements of the original array(s) are copied into the new array as follows:

//      Objects: 
//      the object *reference is copied into the new array. 
//      Both the original and new array refer to the same object. 
//      That is, if a referenced object is modified, the changes are visible to both the new and original arrays.

//      Primitive types such as strings, numbers and booleans (not String, Number, and Boolean objects): 
//      their values are copied into the new array.

// * reference: See pass_reference_value.js



// Other methods mutate the array that the method was called on, in which case their return value differs depending on the method: 
// sometimes a reference to the same array, sometimes the length of the new array.



// ----------------------------- > ACCESS VALUE BY LOCATION WITHIN ARRAY -----------------------------

let nameArray = ['Chris', 'Bob', 'Jim'];

console.log(`Name in first position: ${nameArray[0]}`); // Name in first position: Chris



// ----------------------------- > REPLACE INDIVIDUAL ARRAY ITEMS -----------------------------

nameArray[0] = 'Mark';

console.log(nameArray); // [ 'Mark', 'Bob', 'Jim' ]



// ----------------------------- > SUMMING UP ALL VALUES IN ARRAY -----------------------------

numArray = [1, 2, 3, 4, 5];
let numSum = 0;

for (let value in numArray) {
    numSum += numArray[value];
}

console.log(numSum); // 15



// ----------------------------- > INDEXOF() / LASTINDEXOF() -----------------------------

// ----- indexOf() returns the first index at which a given element can be found in the array

// returns -1 if item is not present.
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



// ----- lastIndexOf(): returns the last index at which a given element can be found in the array 

// returns -1 if item is not present
// The array is searched backwards, starting at the specified index.

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



// ----------------------------- > FINDINDEX() / FINDLASTINDEX() -----------------------------

// ----- findIndex(): returns the index of the first element in an array that satisfies the provided testing function. 

// If no elements satisfy the testing function, -1 is returned. 



// This is the syntax: array.findIndex(providedTestingFunction)

// The provided testing function takes 3 arguments:
//      The item value
//      The item index
//      The array itself



// This example finds the index of the first element that is larger than 18:

let numArray = [4, 9, 16, 25, 29];

// The testing function finds the index of the first element that is larger than 18:
function providedTestingFunction(value, index, array) { // in this case, only the value is being used
    return value > 18;
}

console.log(numArray.findIndex(providedTestingFunction)); // 3



// The above example can also be written like this:

console.log(numArray.findIndex((value) => value > 18)); // 3



// Another example where we make full use of the arguments

numArray = [4, 9, 16, 25, 29];

let anotherNumArray = [3, 5, 13, 19, 26]

function fullTestingFunction (value, index, array) {
    if ( value > 13 && index > 2 && array[index] > 27 ) {
        return true; // returning booleans results in returning the index anyway (or -1 if no elements satisfy the testing function)
    } else {
        return false;
    }
}

console.log(numArray.findIndex(fullTestingFunction)); // 4
console.log(anotherNumArray.findIndex(fullTestingFunction)); // -1



// ----- findLastIndex(): iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. 

// If no elements satisfy the testing function, -1 is returned. 

numArray = [4, 9, 16, 25, 29];

// The testing function finds the index of the first element that is smaller than 18:
console.log(numArray.findLastIndex((value) => value < 18)); // 2



// ----------------------------- > FIND() / FINDLAST() -----------------------------

// ----- find(): returns the first element in the provided array that satisfies the provided testing function. 

// If no values satisfy the testing function, undefined is returned. 

numArray = [4, 9, 16, 25, 29];

// The testing function finds the first element that is bigger than 18:
console.log(numArray.find((value) => value > 18)); // 25



// ----- findLast(): iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. 

// If no elements satisfy the testing function, undefined is returned. 

numArray = [4, 9, 16, 25, 29];

// The testing function finds the first element that is smaller than 18:
console.log(numArray.findLast((value) => value < 18)); // 16



// ----------------------------- > AT() -----------------------------

// at(): returns the element at the specified index in the array, or undefined if the index is out of range. 
// It's notably used for negative indices that access elements from the end of the array.

myArray = ["a", "b", "c", "d", "e"];
console.log(myArray.at(-2));; // d (second-last element of myArray)



// The at() method is equivalent to the bracket notation when index is non-negative. 
// For example, array[0] and array.at(0) both return the first item. 

// However, when counting elements from the end of the array, you cannot use array[-1] like you may in Python or R, 
// because negative *indices are not recognized as array indices, only non-negative integers are. 
// In this case, negative indices are treated literally as string properties, so you will end up reading array["-1"], which is just a normal string property instead of an array index.

// The usual practice is to access length and calculate the index from that — for example, array[array.length - 1]. 
// The at() method allows relative indexing, so this can be shortened to array.at(-1).

// By combining at() with with(), you can both read and write (respectively) an array using negative indices.

// * indices: plural of index



// ----------------------------- > WITH() -----------------------------

// with(): It is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value.





// ----------------------------- > SPLIT -----------------------------

// separate out raw data contained in a big long string into individual items 
// takes a single parameter, the character you want to separate the string at, and returns the substrings between the separator as items in an array.

let myData = 'Manchester,London,Liverpool,Birmingham,Leeds,Carlisle';
let myArray = myData.split(',');

console.log("Split: " + myArray); // Split: ['Manchester','London','Liverpool','Birmingham','Leeds','Carlisle']



// ----------------------------- > JOIN() -----------------------------

// creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. 
// If the array has only one item, then that item will be returned without using the separator. 

let myEnglandArray = ['Manchester','London','Liverpool','Birmingham','Leeds','Carlisle'];

// my specified separator string is a space
console.log(myEnglandArray.join(' ')); // Manchester London Liverpool Birmingham Leeds Carlisle

// With join() you can specify different separators, like a backslash
console.log(myEnglandArray.join('/')); // Manchester/London/Liverpool/Birmingham/Leeds/Carlisle



// Note that toString() is simpler than join() as it doesn't take a parameter, but it always uses a comma.
// JavaScript automatically converts an array to a comma separated string when a primitive value is expected

console.log(myEnglandArray.toString()); // Manchester,London,Liverpool,Birmingham,Leeds,Carlisle



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



// ----------------------------- > PUSH() / POP() -----------------------------

// ----- push(): adds one or more elements to the end of an array and returns the resulting length of the array.

myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];

// The new length of the array is returned when the method call completes.
// You can store the new array length in a variable
let newLength = myEnglandArray.push('Bristol');

console.log(myEnglandArray); // Manchester,London,Liverpool,Birmingham,Leeds,Carlisle,Bristol
console.log(newLength); // 7


// Can form new array with push

numArray = [];

for (i = 0; i < 5; i++) {
    numArray.push(i);
}

console.log(numArray); // [ 0, 1, 2, 3, 4 ]
numArray.push('apple');
console.log(numArray); // [ 0, 1, 2, 3, 4, 'apple' ]



// ----- pop(): removes the last element from an array and returns that element.

// You can save the removed element in a variable

let foodArray = ["Egg", "Bread", "Kaya", "Butter", "Soy Sauce", "Pepper"];
let removedItem = foodArray.pop();

console.log(foodArray); // [ 'Egg', 'Bread', 'Kaya', 'Butter', 'Soy Sauce' ]
console.log(removedItem); // Pepper



// ----------------------------- > SHIFT() / UNSHIFT() -----------------------------

// work in exactly the same way as push() and pop(), except that they work on the beginning of the array, not the end.



// ----- shift(): removes the first element from an array and returns that element.

myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
removedElement = myEnglandArray.shift();

console.log(myEnglandArray); // ['London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle']
console.log(removedElement); // Manchester



// ----- unshift(): adds one or more elements to the front of an array and returns the new length of the array.

myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
newLength = myEnglandArray.unshift('Edinburgh');

console.log(myEnglandArray); // ['Edinburgh', 'Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle']
console.log(newLength); // 7



// ----------------------------- > SPLICE -----------------------------

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



// ----------------------------- > SLICE() -----------------------------

// slice(): extracts a section of an array and returns a new array, does not remove any elements from the source array.

let fruitsArray = ["Banana", "Orange", "Lemon", "Apple", "Mango"];

let fruitsStart = fruitsArray.slice(2); // defined start point only
let fruitsStartEnd = fruitsArray.slice(1, 4); // defined start and end point

// Original array not changed
console.log(fruitsArray); // [ 'Banana', 'Orange', 'Lemon', 'Apple', 'Mango' ]

console.log(fruitsStart); // [ 'Lemon', 'Apple', 'Mango' ]
console.log(fruitsStartEnd); // [ 'Orange', 'Lemon', 'Apple' ]



// ----------------------------- > CONCAT() -----------------------------

// used to merge two or more arrays. 
// This method does not change the existing arrays, but instead returns a new array.

let myGirls = ["Cecilie", "Lone"];
let myBoys = ["Emil", "Tobias", "Linus"];

let myPeople = myGirls.concat(myBoys);

console.log(myPeople); // [ 'Cecilie', 'Lone', 'Emil', 'Tobias', 'Linus' ]

// As you can see, the existing arrays did not change
console.log(myGirls); // [ 'Cecilie', 'Lone' ]
console.log(myBoys); // [ 'Emil', 'Tobias', 'Linus' ]



// merging more than 2 arrays: 

myGirls = ["Cecilie", "Lone"];
myBoys = ["Emil", "Tobias", "Linus"];
myCats = ["Robin", "Morgan"];

console.log(myGirls.concat(myBoys, myCats)); // ['Cecilie', 'Lone', 'Emil', 'Tobias', 'Linus', 'Robin', 'Morgan']



// merging array with values

myBoys = ["Emil", "Tobias", "Linus"];

console.log(myBoys.concat("Peter")); // [ 'Emil', 'Tobias', 'Linus', 'Peter' ]



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

