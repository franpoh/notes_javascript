/* 
Table of Contents

> COPYING METHODS AND MUTATING METHODS
> ACCESS VALUE BY LOCATION WITHIN ARRAY
> REPLACE INDIVIDUAL ARRAY ITEMS
> SUMMING UP ALL VALUES IN ARRAY
> INDEXOF() / LASTINDEXOF()
> AT()
> WITH()
> JOIN()
> LENGTH 
> DELETE
> PUSH() / POP()
> SHIFT() / UNSHIFT()
> SPLICE() / TOSPLICED()
> SLICE()
> CONCAT()
> REVERSE() / TOREVERSED()
> FLAT()
> SORT() / TOSORTED()
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



// ----------------------------- > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES -----------------------------

// ----- Similar functions in 7_array_methods\1_methods.js

//      If you need the index of the found element in the array, use findIndex().
//      If you need to find the index of a value, use indexOf(). (It's similar to findIndex(), but checks each element for equality with the value instead of using a testing function.)
//      If you need to find if a value exists in an array, use includes(). Again, it checks each element for equality with the value instead of using a testing function.



// ----- Similar functions in 7_array_methods\2_iterative_methods.js

//      If you need to find if any element satisfies the provided testing function, use some().
//      If you need to find all elements that satisfy the provided testing function, use filter().



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

// ----- indexOf() 

// returns the first index at which a given element can be found in the array
// returns -1 if item is not present.
// If the item is present more than once, it returns the position of the first occurrence.

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES



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



// ----- lastIndexOf()

// returns the last index at which a given element can be found in the array 
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



// ----------------------------- > AT() -----------------------------

// returns the element at the specified index in the array, or undefined if the index is out of range. 
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

// With the array methods at() and with(), you can both read and write (respectively) an array using negative indices.

// * indices: plural of index



// ----------------------------- > WITH() -----------------------------

// It is the *copying version of using the bracket notation to change the value of a given index. 
// It returns a new array with the element at the given index replaced with the given value.

// * copying: See > COPYING METHODS AND MUTATING METHODS

myArray = ["a", "b", "c", "d", "e"];
let newArray = myArray.with(2, 'cat'); // arguments is (index, value)

console.log(newArray); // [ 'a', 'b', 'cat', 'd', 'e' ]
console.log(myArray); // [ 'a', 'b', 'c', 'd', 'e' ]

// You can also use a negative index in with()
let negativeIndexArray = myArray.with(-2, "dog");
console.log(negativeIndexArray); // [ 'a', 'b', 'c', 'dog', 'e' ]



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



// ----------------------------- > LENGTH ----------------------------- >

// Find the length of array

let sequence = [1, 1, 2, 3, 5, 8, 13];
console.log(sequence.length); // 7



// This has other uses, but it is most commonly used to tell a loop to keep going until it has looped through all the items in an array

// i = 0: Start looping at item number 0 in the array.
// i < sequence.length: Stop looping at the item number equal to the length of the array.
// i++: +1 to the current value of i for each loop

for (let i = 0; i < sequence.length; i++) {
    console.log("Loop through all items in array: " + sequence[i]); // Loop through all items in array: 1, ...
}



// Find the length of item in array

const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C']
console.log(strArray[0].length); // 10



// With length, we can also append a new element to the end of the array, but probably not best practice

fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits[fruits.length] = "Kiwi"; // Appends "Kiwi" to fruits

console.log(fruits); // [ 'Banana', 'Orange', 'Apple', 'Mango', 'Kiwi' ]



// ----------------------------- > DELETE -----------------------------

// Used to delete elements, but leaves undefined holes in the array, therefore not best practice
// Use pop() or shift() instead

fruits = ["Banana", "Orange", "Apple", "Mango"];
delete fruits[2];

console.log(fruits); // [ 'Banana', 'Orange', <1 empty item>, 'Mango' ]
console.log(fruits[2]); // undefined



// ----------------------------- > PUSH() / POP() -----------------------------

// ----- push()

// adds one or more elements to the end of an array and returns the resulting length of the array.

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



// ----- pop()

// removes the last element from an array and returns that element.

// You can save the removed element in a variable

let foodArray = ["Egg", "Bread", "Kaya", "Butter", "Soy Sauce", "Pepper"];
let removedItem = foodArray.pop();

console.log(foodArray); // [ 'Egg', 'Bread', 'Kaya', 'Butter', 'Soy Sauce' ]
console.log(removedItem); // Pepper



// ----------------------------- > SHIFT() / UNSHIFT() -----------------------------

// work in exactly the same way as push() and pop(), except that they work on the beginning of the array, not the end.



// ----- shift()

// removes the first element from an array and returns that element.

myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
removedElement = myEnglandArray.shift();

console.log(myEnglandArray); // ['London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle']
console.log(removedElement); // Manchester



// ----- unshift()

// adds one or more elements to the front of an array and returns the new length of the array.

myEnglandArray = ['Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle'];
newLength = myEnglandArray.unshift('Edinburgh');

console.log(myEnglandArray); // ['Edinburgh', 'Manchester', 'London', 'Liverpool', 'Birmingham', 'Leeds', 'Carlisle']
console.log(newLength); // 7



// ----------------------------- > SPLICE() / TOSPLICED() -----------------------------

// ----- splice()

// removes elements from an array and (optionally) replaces them. It returns the items which were removed from the array.

// This is the syntax: array.splice(startingIndex, noOfElementsToRemove, item1, item2, /* …, */ itemN)

fruits = ["Banana", "Orange", "Apple", "Mango"];
let removedFruits = fruits.splice(2, 0, "Lemon", "Kiwi"); // Insert at index 2, 0 elements removed 

console.log(fruits); // [ 'Banana', 'Orange', 'Lemon', 'Kiwi', 'Apple', 'Mango' ]
console.log(removedFruits); // [] (since no elements removed)



// Example with deleted elements

fruits = ["Banana", "Orange", "Apple", "Mango"];
removedFruits = fruits.splice(2, 2, "Lemon", "Kiwi"); // insert at index 2, 2 elements removed

console.log(fruits); // [ 'Banana', 'Orange', 'Lemon', 'Kiwi' ]
console.log(removedFruits); // [ 'Apple', 'Mango' ]



// Removes elements without leaving "holes" in the array:

fruits = ["Banana", "Orange", "Apple", "Mango"];
removedFruits = fruits.splice(2, 1); // Removes the third element

console.log(fruits); // [ 'Banana', 'Orange', 'Mango' ]
console.log(removedFruits); // [ 'Apple' ]



// ----- toSpliced()

// the copying version of the splice() method. It returns a new array with some elements removed and/or replaced at a given index.

fruits = ["Banana", "Orange", "Apple", "Mango"];
let newFruits = fruits.toSpliced(2, 2, "Lemon", "Kiwi"); 

console.log(fruits); // [ 'Banana', 'Orange', 'Apple', 'Mango' ]
console.log(newFruits); // [ 'Banana', 'Orange', 'Lemon', 'Kiwi' ]



// ----------------------------- > SLICE() -----------------------------

// extracts a section of an array and returns a new array, does not remove any elements from the source array.

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



// ----------------------------- > REVERSE() / TOREVERSED() -----------------------------

// ----- reverse()

// reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. 
// In other words, elements order in the array will be turned towards the direction opposite to that previously stated.

let cats = ['tiger', 'lion', 'leopard', 'puma', 'jaguar'];
cats.reverse();

console.log(cats); // [ 'jaguar', 'puma', 'leopard', 'lion', 'tiger' ]



// ----- toReversed()

// the copying counterpart of the reverse() method. It returns a new array with the elements in reversed order.

cats = ['tiger', 'lion', 'leopard', 'puma', 'jaguar'];
let newCats = cats.toReversed();

console.log(cats); // [ 'tiger', 'lion', 'leopard', 'puma', 'jaguar' ]
console.log(newCats); // [ 'jaguar', 'puma', 'leopard', 'lion', 'tiger' ]



// ----------------------------- > FLAT() -----------------------------

// creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. 
// In short, flat() flattens nested arrays, starting from the shallowest nested array and ending at the deepest nested array

// flat() is a copying method, and therefore it does not alter the original array, and instead returns a new array

const oneDeep = [0, 1, 2, [3, 4]];
let flatArray = oneDeep.flat(); 

console.log(flatArray); // [0, 1, 2, 3, 4]
console.log(oneDeep); // [ 0, 1, 2, [ 3, 4 ] ]



const threeDeep = [0, 1, [2, [3, [4, 5]]]];

// Flattened the shallowest array into the topmost array
console.log(threeDeep.flat()); // [ 0, 1, 2, [ 3, [ 4, 5 ] ] ] 

// Flattened the array up to 2 deep
console.log(threeDeep.flat(2)); // [ 0, 1, 2, 3, [ 4, 5 ] ] 

// Flattened the array up to infinity depth, therefore by default the whole array
console.log(threeDeep.flat(Infinity)); // [ 0, 1, 2, 3, 4, 5 ] 



// ----------------------------- > SORT() / TOSORTED() -----------------------------

// ----- sort()

// sorts the elements of an array in place and returns the reference to the same array, now sorted. 
// The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

let months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();

// Sorted by alphabetical order
console.log(months); // [ 'Dec', 'Feb', 'Jan', 'March' ]



numArray = [1, 30, 4, 21, 100000];
numArray.sort();

// Sorted by first digit in number
console.log(numArray); // [ 1, 100000, 21, 30, 4 ]



// sort() can also take a callback function to determine how array elements are compared. 

// The callback function is called with two arguments, which are two values from the array. 
// The function compares these two values and returns a positive number, negative number, or zero, indicating the order of the two values.

numArray = [1, 30, 4, 21, 100000];

// Sort numbers in ascending order based on value
numArray.sort((a, b) => a < b ? -1 : 1);
console.log(numArray); // [ 1, 4, 21, 30, 100000 ]



// How the return value works:

function compareNumbers (a, b) {
    if (a < b) {
        return -1; // a comes before b
    } else if (a > b) {
        return 1; // b comes before a
    } else {
        return 0; // a and b keep their original order
    }
}

console.log([200, 7, 42, 8394, 34].sort(compareNumbers)); // [ 7, 34, 42, 200, 8394 ]



// ----- toSorted()

// is the copying version of the sort() method. It returns a new array with the elements sorted in ascending order.

months = ['March', 'Jan', 'Feb', 'Dec'];
let newMonths = months.toSorted();

console.log(newMonths); // [ 'Dec', 'Feb', 'Jan', 'March' ]
console.log(months); // [ 'March', 'Jan', 'Feb', 'Dec' ]



// ----------------------------- > ACCESSING EVERY ITEM -----------------------------

// See 7_array_methods/2_iteration_methods.js

const birds = ['Parrot', 'Falcon', 'Owl'];

for (const bird of birds) {
    console.log(bird);
}

