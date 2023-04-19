/* 
Table of Contents

> TOFIXED() 
> NUMBER() 
> ISINTEGER() 
*/


// Integers are floating-point numbers without a fraction. 
// They can either be positive or negative, e.g. 10, 400, or -5.

// Floating point numbers (floats) have decimal points and decimal places
// eg 12.5, and 56.7786543.

// Doubles are a specific type of floating point number that have greater precision than standard floating point numbers 
// they are accurate to a greater number of decimal places



// ----------------------------- > TOFIXED() 

// round your number to a fixed number of decimal places

let lotsOfDecimal = 1.766584958675746364;

let twoDecimalPlaces = lotsOfDecimal.toFixed(2);
console.log("2 decimal place: ", lotsOfDecimal.toFixed(2)); // 1.77

let noDecimalPlaces = lotsOfDecimal.toFixed();
console.log("No decimal place: ", lotsOfDecimal.toFixed()); // 2



// ----------------------------- > NUMBER() 

// constructor that will convert a string value number into a number number

let myNumber = '74';
console.log(myNumber + 3); // 743
console.log(Number(myNumber)); // 77



// ----------------------------- > ISINTEGER() 

// returns true if the argument is an integer.

console.log(Number.isInteger(10)); // returns true
console.log(Number.isInteger(10.5)); // returns false