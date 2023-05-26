/* 
Table of Contents

> NAMING VARIABLES
> CREATING VARIABLES WITH LET OR VAR
> VARIABLE TYPES 
*/



// A variable is a container for a value, like a number we might use in a sum, or a string that we might use as part of a sentence.



// ----------------------------- > NAMING VARIABLES -----------------------------

// Don't use numbers at the start of variables. This isn't allowed and causes an error.
// A safe convention to stick to is so-called "lower camel case", where you stick together multiple words, using lower case for the whole first word and then capitalize subsequent words.
// avoid using JavaScript reserved words as your variable names

const buttonA = document.querySelector('#button_A');
const headingA = document.querySelector('#heading_A');

buttonA.onclick = function () {
    let name = prompt('What is your name?');
    alert('Hello ' + name + ', nice to see you!');
    headingA.textContent = 'Welcome ' + name;
}



// ----------------------------- > CREATING VARIABLES WITH LET OR VAR -----------------------------

// containers for values, eg. numbers, text

// best practice to declare null if there is no values to put in yet
let myName; // declared a variable with no value

// with let, you don’t have to redeclare the same variables, no matter where in the script they are
myName = 'Fran'; // initialized a value, did not redeclare with let

// you can declare var as many times as you like, but not let
var yourName = 'Chris';
var yourName = 'Bob';



// ----------------------------- > VARIABLE TYPES -----------------------------

// When you give a variable a number value, you don't include quotes
let myAge = 17;



// NaN means Not a Number



// Strings are pieces of text. 
// When you give a variable a string value, you need to wrap it in single or double quote marks; 
// otherwise, JavaScript tries to interpret it as another variable name.



// Booleans are true/false values
let iAmAlive = true;



// Array - a single object that contains multiple values enclosed in square brackets and separated by commas.
let myNameArray = ['Chris', 'Bob', 'Jim'];

// Once arrays are defined, you can access each value by their location within the array.
myNameArray[0]; // should return 'Chris’



// object - a structure of code that models a real-life object. eg
// object that represents a box and contains information about its width, length, and height
// object that represents a person, and contains data about their name, height, weight, what language they speak, how to say hello to them, and more.
let dog = { name: 'Spot', breed: 'Dalmatian' };
// To retrieve the information stored in the object, you can use the following syntax:
dog.name
dog.breed



// const - Constants are used to store values that once declared can't be changed
const daysInWeek = 7;
daysInWeek = 8; // will throw an error

// if referencing HTML elements, then when HTML element value changes, this will change too. But HTML elements referenced will not change.