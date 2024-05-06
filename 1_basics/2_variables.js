/* 
Table of Contents

> NAMING VARIABLES
> CREATING VARIABLES WITH LET OR VAR
> VARIABLE TYPES 
*/



// ----------------------------- > DECLARING VARIABLES -----------------------------


// A variable is a container for a value, like a number we might use in a sum, or a string that we might use as part of a sentence.
// You use variables as symbolic names for values in your application. The names of variables, called identifiers, conform to certain rules.



// JavaScript has three kinds of variable declarations.

// ----- var
// Declares a variable, optionally initializing it to a value.
// Ever since let and const were added, they are preferred over var 

// ----- let
// Declares a block-scoped, local variable, optionally initializing it to a value.

// ----- const
// Declares a block-scoped, read-only named constant.

// Example:
let example = 'example';



// ----------------------------- > NAMING VARIABLES -----------------------------

// Don't use numbers at the start of variables. This isn't allowed and causes an error. Uncomment the below statement to see the error:
// let 7variable = 'does not work';

// Avoid using JavaScript reserved words as your variable names. Uncommnent the below statement to see the error:
// let function = 'do not use reserved words as variables, labels, or function names.'

// A safe convention to stick to is so-called "lower camel case", where you stick together multiple words, using lower case for the whole first word and then capitalize subsequent words.
let camelCase = "Camel case is a way of writing phrases without spaces, where the first letter of each word is capitalized, except for the first letter of the entire compound word, which may be either upper or lower case. In Javascript's case, it is always lower.";

// Javascript is case-sensitive. thisVariable and ThisVariable are two different variables.
let thisVariable = 'this is lower case.';
let ThisVariable = 'This is upper case.';

console.log(thisVariable); // this is lower case.
console.log(ThisVariable); // This is upper case.



// ----------------------------- > DECLARING AND INITIALISING -----------------------------

let whatWhat = 'what what'; // This variable has been declared, and initialized with a value

// let whatWhat ----- called a declaration
// = 'what what' ----- called an initializer

console.log(whatWhat); // what what



// Variables should always be declared before they are used.
// The declaration allows the variable to be accessed later in code without throwing a ReferenceError, while the initializer assigns a value to the variable. 

// In var and let declarations, the initializer is optional. 
// If a variable is declared without an initializer, it is assigned the value undefined.

let popPop; // This variable has been declared, without a value
console.log(popPop); // undefined



// ----- Redeclaration

// With let, you don’t have to redeclare the same variables, no matter where in the script they are

let myName = 'Werner';
console.log(myName); // Werner

myName = 'Francine'; // initialized a value, did not redeclare with let
console.log(myName); // Francine

// NOTE: This is why 'let' will be most commonly used in my notes. I can reuse the same variable names with different values if need be, instead of thinking of new variable names.



// You can declare var as many times as you like, but not let

var yourName = 'Chris';
console.log(yourName); // Chris

var yourName = 'Bob';
console.log(yourName); // Bob



// ----------------------------- > CONST -----------------------------



// ----------------------------- > SCOPE -----------------------------

// Scope determines the accessibility of variables, objects, and functions from different parts of the code.

// A variable may belong to one of the following scopes:

// ----- Global scope: The default scope for all code running in script mode.
// ----- Module scope: The scope for code running in module mode.
// ----- Function scope: The scope created with a function.

// In addition, variables declared with let or const can belong to an additional scope:

// ----- Block scope: The scope created with a pair of curly braces (a block).



// When you declare a variable outside of any function, it is called a global variable, because it is available to any other code in the current document. 
// When you declare a variable within a function, it is called a local variable, because it is available only within that function.



// ----------------------------- > SCOPE >> Variable Scope

// let and const declarations can also be scoped to the block statement that they are declared in.

let thisLet = 'value'; // global scope
const thisConst = 'value'; // global scope

function myFunction() {
    let thisLet = 'value'; // function scope
    const thisConst = 'value'; // function scope
}

{
    let thisLet = 'value'; // block scope
    const thisConst = 'value'; // block scope
}



// However, variables created with var are not block-scoped, but only local to the function (or global scope) that the block resides within.

var thisVar = 'value'; // global scope

function myFunction() {
    var thisVar = 'value'; // function scope
}



// If you assign a value to a variable that has not been declared, it will automatically become a global variable, even if the value is assigned inside a function.

function myFunction() {
    francine = 'Hello it is Francine from inside a function'; // not declared
    let werner = 'Hello it is Werner from inside a function'; // declared
}

// no declaration keyword (let, const, var) means that a will always be accessible globally
myFunction();
console.log(francine); // Hello it is Francine from inside a function
console.log(werner); // ReferenceError: werner is not defined



// ----------------------------- > HOISTING ----------------------------- FIXME: NEEDED FROM HERE ONWARDS

// Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope (to the top of the current script or the current function).



// ----- var

// var-declared variables are hoisted, meaning you can refer to the variable anywhere in its scope, even if its declaration isn't reached yet. 
// You can see var declarations as being "lifted" to the top of its function or global scope. 

// However, if you access a variable before it's declared, the value is always undefined, because only its declaration and default initialization (with undefined) is hoisted, but not its value assignment.

console.log(country); // undefined
var country = 'netherlands';

// Because of hoisting, all var statements in a function should be placed as near to the top of the function as possible. This best practice increases the clarity of the code.



// ----- let & const

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


