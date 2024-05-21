/* 
Table of Contents

> DECLARING VARIABLES
> NAMING VARIABLES
> DECLARING & INITIALISING
>> Redeclaration
> SCOPE
> HOISTING
*/



// ----------------------------- > DECLARING VARIABLES -----------------------------


// A variable is a container for a value, like a number we might use in a sum, or a string that we might use as part of a sentence.
// You use variables as symbolic names for values in your application. The names of variables, called identifiers, conform to certain rules.



// JavaScript has three kinds of variable declarations.

// ----- var
// Declares a variable, optionally initializing it to a value.

// ----- let
// Declares a block-scoped, local variable, optionally initializing it to a value.

// ----- const
// Declares a block-scoped, read-only named constant. 

// Example:
let example = 'example';

// NOTE: let and const is newer than var, and has taken over as the preferred way to create a variable. We will look into this more below.



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



// ----------------------------- > DECLARING & INITIALISING -----------------------------

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

// If you try to declare a const variable without being initialised with a value, it will throw an error.

// Uncomment the statement below to see the error. 
// const beepBeep; 



// ----------------------------- > DECLARING & INITIALISING >> Redeclaration

// NOTE: Here, we will look at one of the reasons why let and const is preferred over var



// ----- var

// var variables can be re-declared and updated
// This means that we can do this within the same scope and won't get an error.

var yourName = 'Werner';
console.log(yourName); // Werner

var yourName = 'Francine';
console.log(yourName); // Francine

// While this is not a problem if you knowingly want yourName to be redefined, it becomes a problem when you do not realize that a variable yourName has already been defined before.



// ----- let 

// let can be updated but not re-declared.

let myName = 'Werner';
console.log(myName); // Werner

// Uncomment the statement below to see the error. You will not accidentally redefine the same variable as it will throw an error. 
// let myName = 'Wiener';

// However, you can update the variable. Still, it is less prone to accidental redefinition than var. 
myName = 'Francine'; // initialized a value, did not redeclare with let
console.log(myName); // Francine


// NOTE: This is why 'let' will be most commonly used in my notes. I can reuse the same variable names and reassign different values if need be, instead of thinking of new variable names.
// Also, you will have a tidy block of code that you can highlight and run, instead of having to scroll up to find some variable I defined 50 lines ago
// However, I'm pretty sure this is not best practices when it comes to actual coding, since it can create a lot of confusion.



// ----- const

// The value of a constant can't be changed through reassignment using the assignment operator, but if a constant is an object, its properties can be added, updated, or removed.
// You will learn more about objects later. 

const thisName = 'Werner';
console.log(thisName); // Werner

// Uncomment the statement below to see the error. A const variable cannot be reassigned. 
// const thisName = 'Francine';

// An error does not show up now, but if you run it, it will throw an error.
thisName = 'Francine'; // TypeError: Assignment to constant variable.
console.log(thisName);



// ----------------------------- > SCOPE -----------------------------

// Scope determines the accessibility of variables, objects, and functions from different parts of the code.

// A variable may belong to one of the following scopes:

// ----- *Global scope: The default scope for all code running in script mode.
// ----- Module scope: The scope for code running in module mode.
// ----- Function scope: The scope created with a function.

// In addition, variables declared with let or const can belong to an additional scope:

// ----- Block scope: The scope created with a pair of curly braces (a block).

// * Global scope: Despite the fact that var, let and const can all be global scoped, global scope means different things for var, and const and let. 
// See Cheatsheet\global_scope.js now, or I will remind you to check it out in a later section when it becomes really relevant. 



// When you declare a variable outside of any function, it is called a global variable, because it is available to any other code in the current document. 
// When you declare a variable within a function, it is called a local variable, because it is available only within that function.



// ----- let and const 

// can also be scoped to the block statement that they are declared in
// See below for applicable scopes

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



// ----- var 

// are not block-scoped, but only local to the function (or global scope) that the block resides within.
// See below for applicable scopes

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



// NOTE: Here, we will look at another of the reasons why let and const is preferred over var. 

// Due to the fact that var is not block-scoped, errors like this could happen:

var greeter = "say hi";
var times = 4;

if (times > 3) {
    var greeter = "say Hello instead";
    console.log(`From within the block scope: ${greeter}`); // From within the block scope: say Hello instead
}

console.log(`From the global scope: ${greeter}`) // From the global scope: say Hello instead

// the global variable 'greeter' has changed as the variable 'greeter' defined within the 'if' statement is not block-scoped. 



// Compare it to the equivalent using let

let greeting = "say hi";
let times = 4;

if (times > 3) {
    let greeting = "say Hello instead";
    console.log(`From within the block scope: ${greeting}`); // From within the block scope: say Hello instead
}

console.log(`From the global scope: ${greeting}`) // From the global scope: say hi

// There is no inadvertent reassignment of the variable here because both instances are treated as different variables since they have different scopes.
// This fact makes let a better choice than var. When using let, you don't have to bother if you have used a name for a variable before as a variable exists only within its scope. 



// ----------------------------- > HOISTING ----------------------------- 

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




