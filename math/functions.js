// Math.trunc() 

// Math.trunc(x) returns the integer part of x:

Math.trunc(4.9); // returns 4
Math.trunc(4.7); // returns 4
Math.trunc(4.4); // returns 4



// Math.sign() 

// Math.sign(x) returns if x is negative, null or positive:

Math.sign(-4); // returns -1
Math.sign(0); // returns 0
Math.sign(4); // returns 1



// Math.random() 

// generates a random decimal number between 0 and 1, e.g. 0.5675493843.

Math.floor(Math.random()*100) + 1; // random number generator between 1-100

// multiply the random number by * 100

// round it down by passing the result of invoking Math.random() through Math.floor(), 
// which rounds the number passed to it down to the nearest whole number. 

// This would give us a random number between 0 and 99. 

// we then add 1, to give us a random number between 1 and 100.

// Select random item from array
const randomItem = itemArray[Math.floor(Math.random()*itemArray.length)];
