/* 
Table of Contents

> FOREACH()
> MAP
> FILTER
> REDUCE
> REDUCERIGHT
> EVERY
> SOME
> INCLUDES
> FIND
> KEYS 
*/



// Array methods that take a callback are known as iterative methods, because they iterate over the entire array in some fashion, and can operate on every array item

// Each one takes an optional second argument called thisArg. If provided, thisArg becomes the value of the this keyword inside the body of the callback function.
// If thisArg is not provided, as with other cases where a function is invoked outside of an explicit object context, 
// this will refer to the global object (window, globalThis, etc.) when the function is not strict, or undefined when the function is strict.



// Syntax: 

Array.iterativeMethod(callbackFunction, thisArg);

// Syntax without the optional thisArg argument. All examples will now be shown without the optional thisArg unless necessary.

Array.iterativeMethod(callbackFunction);



// A typical example might have a separate callback function, which is then inserted as an argument

function callBackFunction(value, index, array) {
    // code
}

Array.iterativeMethod(callbackFunction);



// However, you can also write a full callback function in the argument of forEach()
// NOTE: The thisArg argument is irrelevant for any callbackFn defined with an arrow function, as arrow functions don't have their own this binding.

Array.iterativeMethod((value, index, array) => {
    // callback function code
});



// value: The value of the current element
// index: The array index of the current element
// array: The array object the current element belongs to

// The above arguments for the callback function is optional, but value is most often used
// Therefore, you don't necessarily need to use all the arguments in the callback function

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



// ----- Example utilising thisArg 

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



// See 4_functions/custom_functions/colour_change.js for another forEach example.



// ----------------------------- > MAP -----------------------------

// The map() method creates a new array by performing a function on each array element.
// The map() method does not execute the function for array elements without values.
// The map() method does not change the original array.

// This example multiplies each array value by 2

const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
    return value * 2;
}

console.log(numbers2);

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself

// When a callback function uses only the value parameter, the index and array parameters can be omitted



// ----------------------------- > FILTER -----------------------------

// The filter() method creates a new array with array elements that passes a test.

// This example creates a new array from elements with a value larger than 18

const numbersB = [45, 4, 9, 16, 25];
const over18 = numbersB.filter(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

console.log(over18);

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself

// In the example above, the callback function does not use the index and array parameters, so they can be omitted



class Database {
    #data = [
        {
            name: "Ivan",
            age: 30,
            gender: "m",
        },
        {
            name: "Christopher",
            age: 34,
            gender: "m",
        },
        {
            name: "Cheryl",
            age: 29,
            gender: "f",
        },
        {
            name: "Kelly",
            age: 27,
            gender: "f",
        },
    ];

    filter(prop, value) {
        return new Promise((resolve) => {
            resolve(this.#data.filter(person => person[prop] === value));
        });
    }
}

const db = new Database();
db.filter("gender", "f").then((r) => console.log("filter() returns", r));



// ----------------------------- > REDUCE -----------------------------

// The reduce() method runs a function on each array element to produce (reduce it to) a single value.
// The reduce() method works from left - to - right in the array. See also reduceRight().
// The reduce() method does not reduce the original array.

// This example finds the sum of all numbers in an array:

const numbersC = [45, 4, 9, 16, 25];
let sumC = numbersC.reduce(myFunction);

function myFunction(total, value, index, array) {
    let num = total + value;
    console.log(num);
    return num;
}

console.log(sumC); // 99

// Note that the function takes 4 arguments:
// The total(the initial value / previously returned value)
// The item value
// The item index
// The array itself

// The example above does not use the index and array parameters.It can be rewritten to:

function myFunction(total, value) {
    return total + value;
}

// The first time that the callback is run there is no "return value of the previous calculation".
// If supplied, an initial value may be used in its place. 

// Otherwise the array element at index 0 is used as the initial value 
// and iteration starts from the next element (index 1 instead of index 0). 

// The reduce() method can accept an initial value:

const numbersD = [45, 4, 9, 16, 25];
let sumD = numbersD.reduce(myFunction, 100); // 100 is the initial value

function myFunction(total, value) {
    return total + value;
}

console.log(sumD); // 199



// ----------------------------- > REDUCERIGHT -----------------------------

// The reduceRight() method runs a function on each array element to produce(reduce it to) a single value.
// The reduceRight() works from right - to - left in the array.See also reduce().
// The reduceRight() method does not reduce the original array.

// This example finds the sum of all numbers in an array:

const numbersE = [45, 4, 9, 16, 25];
let sumE = numbersE.reduceRight(myFunction);

function myFunction(total, value, index, array) {
    return total + value;
}

console.log(sumE); // 99



// ----------------------------- > EVERY -----------------------------

// The every() method check if all array values pass a test.

// This example check if all array values are larger than 18:

const numbersF = [45, 4, 9, 16, 25];
let allOver18 = numbersF.every(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

console.log(allOver18); // false

// Note that the function takes 3 arguments:
// 	The item value
// 	The item index
// 	The array itself
// When a callback function uses the first parameter only(value), the other parameters can be omitted



// ----------------------------- > SOME -----------------------------

// The some() method check if some array values pass a test.
// some() executes the function once for each element in the array:

// If it finds an array element where the function returns a true value
// some() returns true(and does not check the remaining values)
// Otherwise it returns false

// some() does not execute the function for empty array elements.
// some() does not change the original array.

// Check if any values in the ages array are 18 or over:

const ages = [3, 10, 18, 20];

const adults = ages.some(checkAdult)   // Returns true

function checkAdult(age) {
    return age >= 18;
}

console.log(adults); // true

// Note that the function takes 3 arguments:
// 	The item value
// 	The item index
// 	The array itself



// ----------------------------- > INCLUDES -----------------------------

// allows us to check if an element is present in an array(including NaN, unlike indexOf).

const fruitsA = ["Banana", "Orange", "Apple", "Mango"];

console.log(fruitsA.includes("Mango")); // true



// ----------------------------- > FIND -----------------------------

// The find() method returns the value of the first array element that passes a test function.

// This example finds (returns the value of) the first element that is larger than 18:

const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

console.log(first); // 25

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself



// ----------------------------- > KEYS -----------------------------

// The Array.keys() method returns an Array Iterator object with the keys (indexes) of an array.

// Create an Array Iterator object, containing the keys of the array:

const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

console.log(iterator); // Object [Array Iterator] {}

for (const key of iterator) {
    console.log(key);
}