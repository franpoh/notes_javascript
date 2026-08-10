/* 
Table of Contents

> EXAMPLES
> FOR
>> Any Part Of For Can Be Skipped
>> For... In
>> For... In >>> Array
>> For... Of
>> Break
>> Continue
>> Continue / Break Cannot Be Used With Conditional Operator ?
>> Continue / Break Escaping Multiple Nested Loop with Labels
> WHEN TO USE FOR... IN VS FOR... OF
> WHILE
>> Do... While
*/



// ----------------------------- > EXAMPLES -----------------------------

// Runs code 100 times with for... in

for (let i = 0; i < 100; i++) {
    // Code
}



// Looping through a collection with for... of

let cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (const cat of cats) {
    console.log(cat);
}



// Looping through a collection with map()

cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

cats.map((cat) => { console.log(cat) });



// ----------------------------- > FOR -----------------------------

// for loop

for (initializer; condition; final-expression) {
    // code to run
}


for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
    console.log(i);
}

// +++++ initializer
// this is usually a variable set to a number, which is incremented to count the number of times the loop has run. 
// It is also sometimes referred to as a counter variable 
// let i = 0 - Executes once upon entering the loop.

// +++++ condition 
// this defines when the loop should stop looping. 
// This is generally an expression featuring a comparison operator, a test to see if the exit condition has been met 
// i < 3 - Checked before every loop iteration. Keeps going round the loop for as long as i is smaller than 3

// +++++ final-expression 
// this is always evaluated (or run) each time the loop has gone through a full iteration. 
// It usually serves to increment (or in some cases decrement) the counter variable, to bring it closer to the point where the condition is no longer true
// i++ - Executes after the body on each iteration.



// Here, the "counter" variable p is declared right in the loop. 
// This is called an "inline" variable declaration. 
// Such variables are visible only inside the loop.

for (let p = 0; p < 3; p++) {
    console.log(p); // 0, 1, 2
}
console.log(p); // ReferenceError: p is not defined



// Instead of defining a variable, we could use an existing one:

let p = 0;

for (p = 0; p < 3; p++) { // use an existing variable
    console.log(p); // 0, 1, 2
}

console.log(p); // 3, visible, because declared outside of the loop



// ----------------------------- > FOR >> Any Part Of For Can Be Skipped

// we can omit begin if we don’t need to do anything at the loop start.

i = 0; // we have i already declared and assigned

for (; i < 3; i++) { // no need for "begin"
    console.log(i); // 0, 1, 2
}



// We can also remove the step part. This makes the loop identical to while (i < 3).

i = 0;

for (; i < 3;) {
    console.log(i++);
}



// infinite loop - remove everything

/* 
for (; ;) {
    repeats without limits
} 
*/ // placed in comments otherwise affecting code below

// Please note that the two semicolons in for() ; must be present. Otherwise, there would be a syntax error.



// ----------------------------- > FOR >> For... In

// For in - loops through the properties of an Object

const obj = { key, key }

for (key in obj) {
    // code block to be executed
}



// Each iteration returns a key (x)
// The key is used to access the value of the key
// The value of the key is person[x]

const person = { fname: "John", lname: "Doe", age: 25 };

let text = "";

for (let x in person) { // set key ‘x’ to access the values in const ‘person’
    text += person[x];
}

console.log(text); // JohnDoe25



// ----------------------------- > FOR >> For... In >>> Array

// for in statement can also loop over the properties of an Array:
// Do not use for in over an Array if the index order is important.

for (variable in array) {
    // code in body
}



// +++++ Example

const food = ["banana", "orange", "pineapple"];

for (let x in food) {
    console.log(food[x]);
} // banana orange pineapple

for (let x in food) {
    console.log(x);
} // 0 1 2



// +++++ Example

const foodie = { yellow: "banana", orange: "orange", brown: "pineapple" };

for (let x in foodie) {
    console.log(foodie[x]);
} // banana orange pineapple

for (let x in foodie) {
    console.log(x);
} // yellow orange brown



// +++++ Example

let user = {
    name: "John",
    age: 30,
    isAdmin: true
};

for (let key in user) {
    console.log(key);  // name, age, isAdmin
    console.log(user[key]); // John, 30, true
}



// +++++ Example

cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (let i = 0; i < cats.length; i++) {
    console.log(cats[i]); // Leopard, Serval, Jaguar, Tiger, Caracal, Lion
}



// ----------------------------- > FOR >> For... Of

// creates a loop iterating over iterable objects, including: 
// built-in String, Array, array-like objects (e.g., arguments or NodeList), TypedArray, Map, Set, and user-defined iterables.

// Both for...in and for...of statements iterate over something. The main difference between them is in what they iterate over.
// The for...in statement iterates over the enumerable properties of an object, in an arbitrary order.
// The for...of statement iterates over values that the iterable object defines to be iterated over.

for (variable of iterable) {
    // statement
}

// variable
// On each iteration a value of a different property is assigned to variable. 
// variable may be declared with const, let, or var.

// iterable
// Object whose iterable properties are iterated



// array:

let iterable = [10, 20, 30];

for (const value of iterable) {
    console.log(value);
} // 10 20 30



// string:

iterable = 'boo';

for (const value of iterable) {
    console.log(value);
} // b o o



// // ----------------------------- > FOR >> Break

// Break – force an exit at any time in a loop

// The combination "infinite loop + break as needed" 
// is great for situations when a loop’s condition must be checked not in the beginning or end of the loop, but in the middle or even in several places of its body.



// Simpler Example

const nameList = ['chris', 'sarah', 'bill'];

let searchPerson = 'chris'; // change search term here 

for (const person of nameList) {

    if (person === searchPerson) {

        console.log(`${person} has been found.`);

        break; // stop function right here if the above conditions is achieved

    } else if (searchPerson === '') {
       
        console.log('The search term was left blank.')

        break;

    } else {
        console.log('Person does not match.'); // this will return for each name that searchPerson does not matches
    }
}

console.log('Search has come to an end.');

// The break directive is activated if the searchPerson matches with a name
// It stops the loop immediately, passing control to the first line after the loop.



// More complicated Example involving multiple methods 

const contacts = ['Chris:2232322', 'Sarah:3453456', 'Bill:7654322', 'Mary:9998769', 'Dianne:9384975'];

let searchName = "ChRis"; // change search term here

for (const contact of contacts) {

    // array.split() is an array function that you wil learn more about in 8_array_methods\1_methods.js
    const splitContact = contact.split(':'); // It splits the element at ':', therefore resulting in [ 'Chris', '2232322' ]

    if (splitContact[0].toLowerCase() === searchName.toLowerCase()) { // Changing all name strings to lowercase as any differences in letter cases will result in no match

        console.log(`${splitContact[0]}'s number is ${splitContact[1]}.`);

        break; // stop function right here if the above conditions is achieved

    } else if (searchName === '') {
        
        console.log('Contact not found.');

        break;
    }
}

console.log('Search has come to an end.');



// ----------------------------- > FOR >> Continue

// doesn’t stop the whole loop. 
// Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

// The loop below uses continue to output only odd values.
// For even values of i, the continue directive stops executing the body and passes control to the next iteration of for (with the next number). 
// So console.log is only called for odd values.



// See more about the % operator at 5_expressions_operators\expressions_operators.js >> % Remainder / modulo

for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) continue; // if 'the number is even' is true, skip the remaining part of the body
    console.log(i); // 1, 3, 5, 7, 9
}



// The continue directive helps decrease nesting
// A loop that shows odd values can also look like this:

for (let i = 0; i < 10; i++) {
    if (i % 2) {
        console.log(i);
    }
}

// From a technical point of view, this is identical to the example above. 
// you can just wrap the code in an if block instead of using continue. 
// But as a side-effect, this created one more level of nesting (the console.log call inside the curly braces).



// ----------------------------- > FOR >> Continue / Break Cannot Be Used With Conditional Operator ?

// No break/continue to the right side of ‘?’

{/* (i > 5) ? console.log(i) : continue; */ } // continue/break isn't allowed here

// This is just another reason not to use the question mark operator ? instead of if.



// ----------------------------- > FOR >> Continue / Break Escaping Multiple Nested Loop with Labels

// A label is the only way for break/continue to escape a / multiple nested loop(s)
// You can use a label to identify a statement, and later refer to it using a break or continue statement

// A label is an identifier with a colon before a loop:
// labelName: for (...) {...}

label: for (let i = 0; i < 3; i++) {
    // ...
}



// If a break label; statement is encountered when executing statement, 
// execution of statement terminates, 
// and execution continues at the statement immediately following the labeled statement.



// continue label; can only be used if statement is one of the looping statements. 
// If a continue label; statement is encountered when executing statement, 
// execution of statement continues at the next iteration of the loop. 

// continue; without a label can only continue the innermost loop, 
// while continue label; allows continuing any given loop even when the statement is nested within other loops.



// A statement can have multiple labels. In this case, the labels are all functionally equivalent.



// Example with labelled loops, utilising both 'break' and 'continue'

let maxValue = 3;

loop1: for (let i = 0; i <= maxValue; i++) { // first loop here, labelled loop1

    console.log(`hi from start of loop 1`);

    loop2: for (let j = 0; j <= maxValue; j++) { // second (inner} loop here, labelled loop2

        console.log(`hi from start of loop 2, i = ${i} and j = ${j}`);

        if (i === 1 && j === 1) { // condition with the result of 'continue'

            console.log(`i === 1 && j === 1 has been found to be true - 'continue loop1' - restart loop 1`);
            continue loop1; 

        } else if (i === 1 && j === 2) { // condition with the result of 'break' for loop2

            console.log(`i === 1 && j === 2 has been found to be true - 'break loop2' - break out of loop 2, and executing rest of loop 1`);
            break loop2;

        } else if (i === 2 && j === 2) { // condition with the result of 'break' for loop1

            console.log(`i === 2 && j === 2 has been found to be true - 'break loop1' - break out of loop 1 and thus ending the entire process`);
            break loop1;
            
        } else if (j === maxValue) {

            console.log(`j = ${j} and has reached its max value, reaching natural end of loop 2 and executing rest of loop 1`);
            // There is no 'continue' here -  loop2 has reached its natural end and thus reverts back to the outer loop - loop1

        } else {

            console.log(`Hi from end of loop 2, restarting loop 2`);

        }
    }

    console.log(`Hi from end of loop 1, restarting loop 1!`);
}



/* Logs:
hi from start of loop 1
hi from start of loop 2, i = 0 and j = 0
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 0 and j = 1
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 0 and j = 2
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 0 and j = 3
j = 3 and has reached its max value, reaching natural end of loop 2 and executing rest of loop 1
Hi from end of loop 1, restarting loop 1!
hi from start of loop 1
hi from start of loop 2, i = 1 and j = 0
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 1 and j = 1
i === 1 && j === 1 has been found to be true - 'continue loop1' - restart loop 1
hi from start of loop 1
hi from start of loop 2, i = 2 and j = 0
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 2 and j = 1
Hi from end of loop 2, restarting loop 2
hi from start of loop 2, i = 2 and j = 2
i === 2 && j === 2 has been found to be true - 'break loop1' - break out of loop 1 and thus ending the entire process
*/

// Notice the difference between continue and break
// When continue was executed on loop 1, it restarts from the top of loop 1
// When break was executed on loop 2, it 'broke out' of loop 2 into loop 1, and executes the rest of loop 1
// When break was executed on loop 1, it 'broke out' of loop 1, which is the outermost loop, therefore ending the entire process



// We can also move the label onto a separate line:

outer:
for (let i = 0; i < 3; i++) {
    // ...
}



// ----------------------------- > WHEN TO USE FOR... IN VS FOR... OF -----------------------------

cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (let i = 0; i < cats.length; i++) {
    console.log(cats[i]);
}

// This works just fine, and in early versions of JavaScript, for...of didn't exist, so this was the standard way to iterate through an array. 
// However, it offers more chances to introduce bugs into your code. For example:

// you might start i at 1, forgetting that the first array index is zero, not 1.
// you might stop at i <= cats.length, forgetting that the last array index is at length - 1.

// For reasons like this, it's usually best to use for...of if you can.

cats = ['Leopard', 'Serval', 'Jaguar', 'Tiger', 'Caracal', 'Lion'];

for (const cat of cats) {
    console.log(cat);
}



// Sometimes you still need to use a for loop to iterate through an array. 
// For example, in the code below we want to log a message listing our cats:

cats = ['Pete', 'Biggles', 'Jasmine'];

let myFavoriteCats = 'My cats are called ';

for (const cat of cats) {
    myFavoriteCats += `${cat}, `
}

console.log(myFavoriteCats); // "My cats are called Pete, Biggles, Jasmine, "

// The final output sentence isn't very well-formed:
// My cats are called Pete, Biggles, Jasmine,

// We'd prefer it to handle the last cat differently, like this:
// My cats are called Pete, Biggles, and Jasmine.



// NOTE: But to do this we need to know when we are on the final loop iteration, and to do that we can use a for loop and examine the value of i:

cats = ['Pete', 'Biggles', 'Jasmine'];

myFavoriteCats = 'My cats are called ';

for (let i = 0; i < cats.length; i++) {
    if (i === cats.length - 1) {   // We are at the end of the array
        myFavoriteCats += `and ${cats[i]}.`
    } else {
        myFavoriteCats += `${cats[i]}, `
    }
}

console.log(myFavoriteCats); // "My cats are called Pete, Biggles, and Jasmine."



// ----------------------------- > WHILE -----------------------------

initializer // initializer variable is set before the loop

while (condition) { // Check condition

    // code to run

    final-expression // final-expression is included inside the loop after the code to run
}



// While the condition is truthy, the code from the loop body is executed.

let i = 0;

while (i < 3) { // shows 0, then 1, then 2
    console.log(i);
    i++;
}



// Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by while.
// For instance, a shorter way to write while (i != 0) is while (i):

i = 3;

while (i) { // when i becomes 0, the condition becomes falsy, and the loop stops
    console.log(i);
    i--;
}



// If the loop body has a single statement, we can omit the curly braces {…}:

i = 3;
while (i) console.log(i--);



// +++++ Example

const kitties = ['Pete', 'Biggles', 'Jasmine'];

let myFavoriteKitties = 'My kitties are called ';

i = 0;

while (i < kitties.length) {
    if (i === kitties.length - 1) {
        myFavoriteKitties += `and ${kitties[i]}.`;
    } else {
        myFavoriteKitties += `${kitties[i]}, `;
    }

    i++;
}

console.log(myFavoriteKitties); // "My kitties are called Pete, Biggles, and Jasmine."



// ----------------------------- > WHILE >> Do... While

initializer // initializer variable is set before the loop

do {

    // code to run

    final-expression // final-expression is included inside the loop after the code to run

} while (condition) // Check condition



// The condition check can be moved below the loop body using the do..while syntax
// should only be used when you want the body of the loop to execute at least once regardless of the condition being truthy. 
// Usually, ‘while’ is preferred

i = 0;

do {
    console.log(i); // 0 1 2
    i++;
} while (i < 3);



// This code executes at least once even though the condition was falsy
i = 7;

do {
    console.log(`Execute this at least once ${i}`); // Execute this at least once 7
    i++;
} while (i === 6);



// +++++ Example

const katten = ['Pete', 'Biggles', 'Jasmine'];

let mijnKatten = 'My katten are called ';

i = 0;

do {
    if (i === katten.length - 1) {
        mijnKatten += `and ${katten[i]}.`;
    } else {
        mijnKatten += `${katten[i]}, `;
    }

    i++;
} while (i < katten.length);

console.log(mijnKatten); // "My katten are called Pete, Biggles, and Jasmine."
