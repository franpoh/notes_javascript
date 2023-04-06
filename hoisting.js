
// Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).

// ----------------------------- > VAR -----------------------------

// can be used before it has been declared.

z = 5; // Assign 5 to z
console.log("z: " + z); // z: 5
var z; // Declare z

// the above functions the same as below:

var a; // Declare a
a = 6; // Assign 6 to a
console.log("a: " + a); // a: 6



// ----------------------------- > LET & CONST -----------------------------

// hoisted to the top of the block, but not initialized.
// The block of code is aware of the variable, but it cannot be used until it has been declared.
// Will result in errors

carName = "Volvo"; // Assign Volvo to carName
console.log("carName: " + carName); // Cannot access 'carName' before initialization
let carName; // Declare carName



// ----------------------------- > INITIALIZATION -----------------------------

// When you declare a variable it is automatically initialized, which means memory is allocated for the variable by the JavaScript engine.
// While declarations are hoisted, initializations are NOT hoisted

var x = 5; // Initialize x
var y = 7; // Initialize y
console.log("x: " + x + ", y: " + y); // x: 5, y: 7

var b = 5; // initialize b
console.log("b: " + b + ", c: " + c); // b: 5, c: undefined
var c = 7; // initialize c

// This is because only the declaration (var c), not the initialization (= 7) is hoisted to the top.
// Because of hoisting, c has been declared before it is used, but because initializations are not hoisted, the value of c is undefined.



// ----------------------------- > FUNCTIONS -----------------------------

// Named function declaration – hoisted
// Function expressions – ignored