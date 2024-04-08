/* 
Table of Contents

> NUMBER OBJECT
>> Methods
*/


// Integers are floating-point numbers without a fraction. 
// They can either be positive or negative, e.g. 10, 400, or -5.

// Floating point numbers (floats) have decimal points and decimal places
// eg 12.5, and 56.7786543.

// Doubles are a specific type of floating point number that have greater precision than standard floating point numbers 
// they are accurate to a greater number of decimal places



// ----------------------------- > NUMBER OBJECT -----------------------------

// The built-in Number object has properties for numerical constants, such as maximum value, not-a-number, and infinity. 
// You cannot change the values of these properties and you use them as follows:

const biggestNum = Number.MAX_VALUE;
const smallestNum = Number.MIN_VALUE;
const infiniteNum = Number.POSITIVE_INFINITY;
const negInfiniteNum = Number.NEGATIVE_INFINITY;
const notANum = Number.NaN;

// You always refer to a property of the predefined Number object as shown above, and not as a property of a Number object you create yourself.



// ----------------------------- > NUMBER OBJECT >> Methods

// Number methods can be used on all JavaScript numbers

// These are some of the more commonly-used number methods 



// ----- Number()

// constructor that will convert a string value number into a number number

var x = '9.656';
console.log(x + 3); // 9.6563
console.log(Number(x)); // 9.656



// ----- toFixed()

//  returns a string, with the number written with a specified number of decimals

var x = 9.656;

console.log(x.toFixed(0)); // 10
console.log(x.toFixed(2)); // 9.66
console.log(x.toFixed(4)); // 9.6560
console.log(x.toFixed(6)); // 9.656000



// ----- toExponential()


// returns a string, with a number rounded and written using exponential notation.

var x = 9.656;

console.log(x.toExponential(2)); // 9.66e+0
console.log(x.toExponential(4)); // 9.6560e+0
console.log(x.toExponential(6)); // 9.656000e+0



// ----- toPrecision() 

// Returns a string representing the number to a specified precision in fixed-point notation

var x = 9.656;

console.log(x.toPrecision()); // 9.656
console.log(x.toPrecision(2)); // 9.7
console.log(x.toPrecision(4)); // 9.656
console.log(x.toPrecision(6)); // 9.65600



// ----- valueOf() 

// returns a number as a number.

var x = 123;

console.log(x.valueOf()); // 123
console.log((123).valueOf()); // 123
console.log((100 + 23).valueOf()); // 123



// ----- parseFloat()

// parses a string argument and returns the floating point first number.

console.log(parseFloat(10)); // 10
console.log(parseFloat("10")); // 10
console.log(parseFloat("10.33")); // 10.33
console.log(parseFloat("34 45 66")); // 34
console.log(parseFloat("He was 40")); // NaN



// ----- parseInt()

// parses a string argument and returns the first integer of the specified radix or base

console.log(parseInt("10")); // 10
console.log(parseInt("10.00")); // 10
console.log(parseInt("10.33")); // 10
console.log(parseInt("34 45 66")); // 34
console.log(parseInt(" 60 ")); // 60
console.log(parseInt("40 years")); // 40
console.log(parseInt("He was 40")); // NaN



// ----- isInteger()

// returns true if the argument is an integer.

console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(-123)); // true
console.log(Number.isInteger('123')); // false

console.log(Number.isInteger(4-2)); // true
console.log(Number.isInteger(4/2)); // true
console.log(Number.isInteger(5-2)); // true
console.log(Number.isInteger(5/2)); // false