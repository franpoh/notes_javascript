
// Use the if statement to execute a statement if a logical condition is true. Use the optional else clause to execute a statement if the condition is false.

if (condition) {
    statement1;
} else {
    statement2;
}



// Here, the condition can be any expression that evaluates to true or false. 

// If condition evaluates to true, statement_1 is executed. Otherwise, statement_2 is executed. 
// statement_1 and statement_2 can be any statement, including further nested if statements.

// You can also compound the statements using else if to have multiple conditions tested in sequence, as follows:

if (condition1) {
    statement1;
} else if (condition2) {
    statement2;
} else if (conditionN) {
    statementN;
} else {
    statementLast;
}



// In the case of multiple conditions, only the first logical condition which evaluates to true will be executed. 
// To execute multiple statements, group them within a block statement ({ /* … */ }).

// In general, it's good practice to always use block statements—especially when nesting if statements:

if (condition) {
    // Statements for when condition is true
    // …
} else {
    // Statements for when condition is false
    // …
}



// In general it's good practice to not have an if...else with an assignment like x = y as a condition:

if (x = y) {
    // statements here
}

// However, in the rare case you find yourself wanting to do something like that, 
// here is a link on best practices: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while#using_an_assignment_as_a_condition



// Example

// Change the number between 1, 2, and any other number
let test = 2;

if (test === 1) {
    console.log('This is the number 1');
} else if (test === 2) {
    console.log('This is the number 2');
} else {
    console.log('This is whatever');
}



// +++++ Falsy values

// The following values evaluate to false (also known as Falsy values):

// false
// undefined
// null
// 0
// NaN
// the empty string ("")

// All other values—including all objects—evaluate to true when passed to a conditional statement.



// Note: Do not confuse the primitive boolean values true and false with the true and false values of the Boolean object!

const a = false; // primitive boolean value
const b = new Boolean(false); // Boolean Object { false }
const c = true; // primitive boolean value
let d; // undefined

function test(value) {
    if (value) {
        console.log('value is truthy');
    }
    if (value == true) {
        console.log('value equates to true');
    }
    if (!value) {
        console.log('value is falsy');
    }
}

test(a); // value is falsy
test(b); // value is truthy
test(c); // value is truthy, value equates to true
test(d); // value is falsy
