// Array iteration methods operate on every array item.

// CurrentValue - The value of the current element
// index - The array index of the current element
// array - The array object the current element belongs to



// ----------------------------- > ARRAY.FOREACH -----------------------------

// The forEach() method calls a function (a callback function) once for each array element.

const numbers = [45, 4, 9, 16, 25];
let txt = "";
numbers.forEach(myFunction);

function myFunction(value, index, array) {
    txt += value + "<br>";
}

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself

// The example above uses only the value parameter.The example can be rewritten to:

function myFunction(value) {
    txt += value + "<br>";
}



// Change colours loop, with delay of 1 second, stops at end of array

var interval = 1000;

colours.forEach(function (value, index, array) {
    setTimeout(function () {
        spanCol.style.backgroundColor = array[index].color;
    }, index * interval);
    // adding 1 second to each item eg red = 0*1000, green = 1*1000, blue = 2*1000
})



// Change colours loop, with delay of 1 second, restarts at end of array

colours.forEach(function (value, index, array) {
    let noCol = -1; // setting this to -1 starts the noCol loop at 0, setting at 0 starts it at 1
    setInterval(function () {
        spanCol.style.backgroundColor = array[noCol = (noCol + 1) % colours.length].color;
    }, 1000);
})

// interval runs forever 
// just access the next element in names each time
// by incrementing a variable(noCol) that stores the index of the current name
// using % to reset it back to 0 when it exceeds the length of the array(since 7 % 7 = 0)



// Change colours loop, with delay of 1 second, restarts at end of array, stops at end of array when checkbox is checked

checkBox.addEventListener("change", colours.forEach(() => {
    let noCol = -1;
    let delayLoop = setInterval(() => { // named the interval
        spanCol.style.backgroundColor = colours[noCol = (noCol + 1) % colours.length].color;
        if (checkBox.checked && noCol === 6) {
            clearInterval(delayLoop); // clear interval
        }
    }, 1000);
}));



// ----------------------------- > ARRAY.MAP -----------------------------

// The map() method creates a new array by performing a function on each array element.
// The map() method does not execute the function for array elements without values.
// The map() method does not change the original array.

// This example multiplies each array value by 2
const numbers1 = [45, 4, 9, 16, 25];
const numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
    return value * 2;
}

// Note that the function takes 3 arguments:
// The item value
// The item index
// The array itself

// When a callback function uses only the value parameter, the index and array parameters can be omitted



// ----------------------------- > ARRAY.FILTER -----------------------------

// The filter() method creates a new array with array elements that passes a test.

// This example creates a new array from elements with a value larger than 18
const numbers = [45, 4, 9, 16, 25];
const over18 = numbers.filter(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

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

// filter() returns [
// 	{ name: 'Cheryl', age: 29, gender: 'f' },
// 	{ name: 'Kelly', age: 27, gender: 'f' }
// ]



// ----------------------------- > ARRAY.REDUCE -----------------------------

// The reduce() method runs a function on each array element to produce(reduce it to) a single value.
// The reduce() method works from left - to - right in the array.See also reduceRight().
// The reduce() method does not reduce the original array.

// This example finds the sum of all numbers in an array:
const numbers = [45, 4, 9, 16, 25];
let sum = numbers.reduce(myFunction);

function myFunction(total, value, index, array) {
    return total + value;
} // 99

// Note that the function takes 4 arguments:
// The total(the initial value / previously returned value)
// The item value
// The item index
// The array itself

// The example above does not use the index and array parameters.It can be rewritten to:

function myFunction(total, value) {
    return total + value;
}

The reduce() method can accept an initial value:

const numbers = [45, 4, 9, 16, 25];
let sum = numbers.reduce(myFunction, 100);

function myFunction(total, value) {
    return total + value;
} // 199



// ----------------------------- > ARRAY.REDUCERIGHT -----------------------------

// The reduceRight() method runs a function on each array element to produce(reduce it to) a single value.
// The reduceRight() works from right - to - left in the array.See also reduce().
// The reduceRight() method does not reduce the original array.

// This example finds the sum of all numbers in an array:
const numbers = [45, 4, 9, 16, 25];
let sum = numbers1.reduceRight(myFunction);

function myFunction(total, value, index, array) {
    return total + value;
}



// ----------------------------- > ARRAY.EVERY -----------------------------

// The every() method check if all array values pass a test.

// This example check if all array values are larger than 18:
const numbers = [45, 4, 9, 16, 25];
let allOver18 = numbers.every(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

// Note that the function takes 3 arguments:
// 	The item value
// 	The item index
// 	The array itself
// When a callback function uses the first parameter only(value), the other parameters can be omitted



// ----------------------------- > ARRAY.SOME -----------------------------

// The some() method check if some array values pass a test.
//     some() executes the function once for each element in the array:
// 	If it finds an array element where the function returns a true value
// some() returns true(and does not check the remaining values)
// 		Otherwise it returns false
// some() does not execute the function for empty array elements.
//     some() does not change the original array.

// Check if any values in the ages array are 18 or over:
const ages = [3, 10, 18, 20];

ages.some(checkAdult)   // Returns true

function checkAdult(age) {
    return age >= 18;
}

// Note that the function takes 3 arguments:
// 	The item value
// 	The item index
// 	The array itself



// ----------------------------- > ARRAY.INCLUDES -----------------------------

// allows us to check if an element is present in an array(including NaN, unlike indexOf).

const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.includes("Mango"); // is true

// Syntax
// array.includes(search - item)



// ----------------------------- > ARRAY.FIND -----------------------------

// The find() method returns the value of the first array element that passes a test function.

// This example finds (returns the value of) the first element that is larger than 18:
const numbers = [4, 9, 16, 25, 29];
let first = numbers.find(myFunction);

function myFunction(value, index, array) {
    return value > 18;
}

// Note that the function takes 3 arguments:
// 	The item value
// 	The item index
// 	The array itself

// Array.Keys()
// The Array.keys() method returns an Array Iterator object with the keys of an array.

// Create an Array Iterator object, containing the keys of the array:
const fruits = ["Banana", "Orange", "Apple", "Mango"];
const keys = fruits.keys();

for (let x of keys) {
    text += x + "<br>";
}