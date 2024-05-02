/* 
Table of Contents

> FOREACH()
> MAP()
> FLATMAP()
> FILTER()
> REDUCE() / REDUCERIGHT()
> EVERY()
> SOME()
> INCLUDES
> FIND() / FINDLAST()
> FINDINDEX() / FINDLASTINDEX()
> KEYS 
*/



// Array methods that take a callback are known as iterative methods, because they iterate over the entire array in some fashion, and can operate on every array item

// Each one takes an optional second argument called thisArg. If provided, thisArg becomes the value of the this keyword inside the body of the callback function.
// If thisArg is not provided, as with other cases where a function is invoked outside of an explicit object context, 
// this will refer to the global object (window, globalThis, etc.) when the function is not strict, or undefined when the function is strict.



// Syntax: 

Array.iterativeMethod(callbackFunction, thisArg);

// Syntax without the optional thisArg argument. NOTE: All examples will now be shown without the optional thisArg unless necessary.

Array.iterativeMethod(callbackFunction);



// A typical example might have a separate callback function, which is then inserted as an argument

function callBackFunction(value, index, array) {
    // code
}

Array.iterativeMethod(callbackFunction);



// However, you can also write a full callback function in the argument of forEach()
// NOTE: The thisArg argument is irrelevant for any callback function defined with an arrow function, as arrow functions don't have their own this binding.

Array.iterativeMethod((value, index, array) => {
    // callback function code
});



// value: The value of the current element
// index: The array index of the current element
// array: The array object the current element belongs to

// You don't have to name them 'value', 'index' and 'array', it's just the names I chose to use for clarity. But it will always remain in the (value, index, array) order. 
// The above arguments for the callback function is optional, but value is most often used. Therefore, you don't necessarily need to use all the arguments in the callback function

Array.iterativeMethod((value) => {
    // callback function code that only uses value
});



// Let's head down to > FOREACH() to take a look at an example where thisArg is used



// ----------------------------- > FOREACH() -----------------------------

// calls a function (a callback function) once for each array element.

let numArray = [45, 4, 9, 16, 25];
let text = "";

function callbackFunction(value) {
    text += value + "/";
}

numArray.forEach(callbackFunction);

console.log(text); // 45/4/9/16/25/

// The above code be written as a forEach argument, making it more concise

numArray = [45, 4, 9, 16, 25];
text = "";

numArray.forEach((value) => text += value + "/")

console.log(text); // 45/4/9/16/25/



// ----- Example: utilising thisArg 

const person = {
    name: 'John Doe',
    greetFriends: function (friend) {
        console.log(`Hello ${friend}, my name is ${this.name}`);
    }
};

const friends = ['Alice', 'Bob', 'Charlie'];

friends.forEach(person.greetFriends, person); // 'person' is the optional thisArg
// Hello Alice, my name is John Doe
// Hello Bob, my name is John Doe
// Hello Charlie, my name is John Doe


friends.forEach(person.greetFriends); // when 'person' is not provided for thisArg
// Hello Alice, my name is undefined
// Hello Bob, my name is undefined
// Hello Charlie, my name is undefined



// When we call friends.forEach(person.greetFriends, person), we pass two arguments:

// person.greetFriends: This is the function that will be called for each element in the friends array.
// person: This is the thisArg parameter, which sets the value of this inside the greetFriends function to the person object.

// Without the thisArg parameter, the this value inside the greetFriends function would be bound to the global object (window in a browser, global in Node.js), or undefined in strict mode. 
// By providing the person object as the thisArg, we ensure that this.name inside the greetFriends function refers to the name property of the person object.

// The forEach method calls the greetFriends function for each element in the friends array, using the provided thisArg (person) as the value of this inside the function. 
// This allows the greetFriends method to access the name property of the person object and log the appropriate greeting for each friend.

// The thisArg parameter is useful when you need to call a function with a specific context (this value), 
// particularly when working with methods defined on objects or when passing callback functions to array methods like forEach, map, filter, etc.



// ----- Making full use of the arguments

numArray = [45, 4, 9, 16, 25];
text = "";

function callbackFunction(value, index, array) {
    if (index + 1 === array.length) {
        text += `${value} is in last place...`
    } else if (index === 0) {
        text += `${value} is at the 1st place!\n`
    } else {
        text += `${value} is at the ${index + 1}th place!\n`
    }

}

numArray.forEach(callbackFunction)

console.log(text);
/* 
45 is at the 1st place!
4 is at the 2th place!
9 is at the 3th place!
16 is at the 4th place!
25 is in last place...
*/



// See 4_functions/custom_functions/colour_change.js for another forEach example.



// ----------------------------- > MAP() -----------------------------

// creates a new array populated with the results of calling a provided function on every element in the calling array. 
// does not execute the function for array elements without values.
// does not change the original array.



// ----- Example: multiplies each array value by 2

numArray = [45, 4, 9, 16, 25];

function callbackFunction(value) {
    return value * 2;
}

let newNumArray = numArray.map(callbackFunction);

console.log(newNumArray); // [ 90, 8, 18, 32, 50 ]



// ----------------------------- > FLATMAP() -----------------------------

// returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. 
// It is identical to a map() followed by a flat() of depth 1 (arr.map(...args).flat()), but slightly more efficient than calling those two methods separately.

numArray = [45, 4, 9, 16, 25];

// if number is even, return an array with the number repeated twice, otherwise just return value
newNumArray = numArray.flatMap((value) => (value % 2 === 0 ? [value, value] : value));

console.log(newNumArray); // [ 45, 4, 4, 9, 16, 16, 25]



// ----- Let's see the same example, but using map() instead of flatMap()

numArray = [45, 4, 9, 16, 25];

newNumArray = numArray.map((value) => (value % 2 === 0 ? [value, value] : value));

console.log(newNumArray); // [ 45, [ 4, 4 ], 9, [ 16, 16 ], 25 ]

// To flatten the array, we need to take one more step with flat()

let newerNumArray = newNumArray.flat();

console.log(newerNumArray); // [ 45, 4, 4, 9, 16, 16, 25]



// ----------------------------- > FILTER() -----------------------------

// creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES



// ----- Example: Creates a new array from elements with a value larger than 18

let ages = [45, 4, 9, 16, 25];
let over18 = ages.filter(callbackFunction);

// test for values larger than 18
function callbackFunction(value) {
    return value > 18;
}

console.log(over18); // [ 45, 25 ]

// Original array not changed
console.log(ages); // [ 45, 4, 9, 16, 25 ]



// See filter/promise example in 4_functions\custom_function\people_filter.js



// ----------------------------- > REDUCE() / REDUCERIGHT() -----------------------------

// executes a user-supplied "reducer" callback function on each element of the array, in left-to-right order, passing in the return value from the calculation on the preceding element. 
// The final result of running the reducer across all elements of the array is a single value.

// The method does not change the original array.



// The syntax is slightly different from standard

array.reduce(callbackFn, initialValue) // initialValue is optional

// The arguments for the callback function is also slightly different from standard

function callbackFunction(accumulator, currentValue, currentIndex, array) {
    // code
}

// Let us look at the callback function's arguments first to understand how initialValue works:

// callbackFunction: 
//      A function to execute for each element in the array. 
//      Its return value becomes the value of the accumulator parameter on the next execution of callbackFunction. 
//      For the last execution, the return value becomes the return value of reduce(). 

// The function is called with the following arguments: accumulator, currentValue, currentIndex, array

// accumulator
//      The value resulting from the previous call to callbackFunction. 
//      On the first call, its value is initialValue if the latter is specified; otherwise its value is array[0].

// currentValue
//      The value of the current element.
//      On the first call, its value is array[0] if initialValue is specified; otherwise its value is array[1].

// currentIndex
//      The index position of currentValue in the array. 
//      On the first call, its value is 0 if initialValue is specified, otherwise 1.

// And you know array, no explanation needed. 



// ----- InitialValue in array.reduce(callbackFunction, initialValue)

// A value to which accumulator is initialized the first time the callback is called. 
// If initialValue is specified, callbackFn starts executing with the first value in the array as currentValue. 

// If initialValue is not specified, accumulator is initialized to the first value in the array, and callbackFn starts executing with the second value in the array as currentValue. 
// Therefore in this case, first time that the callback is run there is no "return value of the previous calculation". 
// In this case, if the array is empty (so that there's no first value to return as accumulator), an error is thrown. 



// This example finds the sum of all numbers in an array:

numArray = [45, 4, 9, 16, 25];

let sum = numArray.reduce(callbackFunction);

function callbackFunction(accumulator, currentValue) {
    console.log(`accumulator: ${accumulator}, currentValue: ${currentValue}`);
    let returnValue = accumulator + currentValue;
    console.log(`returnValue, which will become the accumulator on the next execution of the callbackFunction: ${returnValue}`);
    return returnValue;
}

console.log(sum);
/* 
accumulator: 45, currentValue: 4
returnValue, which will become the accumulator on the next execution of the callbackFunction: 49
accumulator: 49, currentValue: 9
returnValue, which will become the accumulator on the next execution of the callbackFunction: 58
accumulator: 58, currentValue: 16
returnValue, which will become the accumulator on the next execution of the callbackFunction: 74
accumulator: 74, currentValue: 25
returnValue, which will become the accumulator on the next execution of the callbackFunction: 99
99
*/



// Example with initialValue

numArray = [45, 4, 9, 16, 25];

sum = numArray.reduce(callbackFunction, 16);

function callbackFunction(accumulator, currentValue) {
    console.log(`accumulator: ${accumulator}, currentValue: ${currentValue}`);
    let returnValue = accumulator + currentValue;
    console.log(`returnValue, which will become the accumulator on the next execution of the callbackFunction: ${returnValue}`);
    return returnValue;
}

console.log(sum);
/* 
accumulator: 16, currentValue: 45
returnValue, which will become the accumulator on the next execution of the callbackFunction: 61
accumulator: 61, currentValue: 4
returnValue, which will become the accumulator on the next execution of the callbackFunction: 65
accumulator: 65, currentValue: 9
returnValue, which will become the accumulator on the next execution of the callbackFunction: 74
accumulator: 74, currentValue: 16
returnValue, which will become the accumulator on the next execution of the callbackFunction: 90
accumulator: 90, currentValue: 25
returnValue, which will become the accumulator on the next execution of the callbackFunction: 115
115
*/



// ----------------------------- 

// The reduceRight() method runs a function on each array element to produce(reduce it to) a single value.
// The reduceRight() works from right - to - left in the array.See also reduce().
// The reduceRight() method does not reduce the original array.

// This example finds the sum of all numbers in an array:

const numbersE = [45, 4, 9, 16, 25];
let sumE = numbersE.reduceRight(callbackFunction);

function callbackFunction(total, value, index, array) {
    return total + value;
}

console.log(sumE); // 99



// ----------------------------- > EVERY() -----------------------------

// tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. 



// check if all array values are larger than 18:
function callbackFunction(value) {
    return value > 18;
}

ages = [45, 4, 9, 16, 25];
console.log(ages.every(callbackFunction)); // false

let adults = [23, 54, 87, 56, 19];
console.log(adults.every(callbackFunction)); // true



// ----------------------------- > SOME() -----------------------------

// tests whether at least one element in the array passes the test implemented by the provided function. 
// It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. 
// It doesn't modify the array. 

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES



ages = [45, 4, 9, 16, 25];
console.log(ages.some((age) => age >= 18)); // true

let underAge = [15, 2, 8, 14, 16];
console.log(underAge.some((age) => age >= 18)); // false




// ----------------------------- > INCLUDES -----------------------------

// allows us to check if an element is present in an array(including NaN, unlike indexOf).

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES

const fruitsA = ["Banana", "Orange", "Apple", "Mango"];

console.log(fruitsA.includes("Mango")); // true



// ----------------------------- > FIND() / FINDLAST() -----------------------------

// ----- find()

// returns the first element in the provided array that satisfies the provided testing function. 
// If no values satisfy the testing function, undefined is returned. 

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES



numArray = [4, 9, 16, 25, 29];

let first = numArray.find(callbackFunction);

// Finds the first element that is larger than 18:
function callbackFunction(value) {
    return value > 18;
}

console.log(first); // 25



// ----- findLast()

// iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. 
// If no elements satisfy the testing function, undefined is returned. 

numArray = [4, 9, 16, 25, 29];

// Finds the first element that is smaller than 18:
first = numArray.findLast((value) => value < 18);

console.log(first); // 16



// ----------------------------- > FINDINDEX() / FINDLASTINDEX() -----------------------------

// ----- findIndex()

// returns the index of the first element in an array that satisfies the provided testing function. 
// If no elements satisfy the testing function, -1 is returned. 

// NOTE: See 7_array_methods\1_methods.js > SIMILAR METHODS FOR FINDING PARTICULAR ELEMENTS/INDICES



numArray = [4, 9, 16, 25, 29];

// The testing function finds the index of the first element that is larger than 18:
function callbackFunction(value) { // in this case, only the value is being used
    return value > 18;
}

console.log(numArray.findIndex(callbackFunction)); // 3



// Another example making full use of arguments

numArray = [4, 9, 16, 25, 29];

let anotherNumArray = [3, 5, 13, 19, 26]

function fullTestingFunction(value, index, array) {
    if (value > 13 && index > 2 && array[index] > 27) {
        return true; // returning booleans results in returning the index anyway (or -1 if no elements satisfy the testing function)
    } else {
        return false;
    }
}

console.log(numArray.findIndex(fullTestingFunction)); // 4
console.log(anotherNumArray.findIndex(fullTestingFunction)); // -1



// ----- findLastIndex()

// iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. 

// If no elements satisfy the testing function, -1 is returned. 

numArray = [4, 9, 16, 25, 29];

// The testing function finds the index of the first element that is smaller than 18:
console.log(numArray.findLastIndex((value) => value < 18)); // 2



// ----------------------------- > KEYS -----------------------------

// The Array.keys() method returns an Array Iterator object with the keys (indexes) of an array.

// Create an Array Iterator object, containing the keys of the array:

const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

console.log(iterator); // Object [Array Iterator] {}

for (const key of iterator) {
    console.log(key);
}