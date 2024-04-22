
// The built-in Math object has properties and methods for mathematical constants and functions.

// Below are some examples of common math object methods: 



// ----------------------------- Math.sign() 

// Math.sign(x) returns if x is negative, null or positive:

console.log(Math.sign(-4)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(4)); // 1



// ----------------------------- Math.min(), Math.max()

// The Math.min() static method returns the smallest of the numbers given as input parameters, or Infinity if there are no parameters.

console.log(Math.min(1, 3, 2)); // 1

// The Math.max() static method returns the largest of the numbers given as input parameters, or -Infinity if there are no parameters.

console.log(Math.max(1, 3, 2)); // 3



// ----------------------------- Math.trunc() 

// The Math.trunc() static method returns the integer part of a number by removing any fractional digits.

console.log(Math.trunc(4.93)); // 4
console.log(Math.trunc(4.7)); // 4
console.log(Math.trunc(4.456)); // 4
console.log(Math.trunc(0.456)); // 0


// ----------------------------- Math.round()

// The Math.round() static method returns the value of a number rounded to the nearest integer.

console.log(Math.round(0.2)); // 0
console.log(Math.round(1.423)); // 1
console.log(Math.round(5.95)); // 6
console.log(Math.round(-5.05)); // -5



// ----------------------------- Math.floor(), Math.ceil()

// The Math.floor() static method always rounds down and returns the largest integer less than or equal to a given number.

console.log(Math.floor(5.72)); // 5
console.log(Math.floor(5.23)); // 5

// The Math.ceil() static method always rounds up and returns the smallest integer greater than or equal to a given number.

console.log(Math.ceil(5.72)); // 6
console.log(Math.ceil(5.23)); // 6



// ----------------------------- Math.random() 

// generates a random decimal number between 0 and 1, e.g. 0.5675493843.

console.log(Math.random());



// Example of a random number generator between 1-100

console.log(Math.floor(Math.random()*100) + 1); 

// multiply the random number by * 100
// round it down by passing the result of invoking Math.random() through Math.floor(), which rounds the number passed to it down to the nearest whole number. 
// This would give us a random number between 0 and 99. 
// we then add 1, to give us a random number between 1 and 100.



// Example of using random number generator to select random item from array

const itemArray = ['cat', 'dog', 'bird', 'capybara'];
const randomItem = itemArray[Math.floor(Math.random()*itemArray.length)];

console.log(randomItem);
