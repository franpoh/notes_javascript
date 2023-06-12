// The try...catch statement is comprised of a try block and either a catch block, a finally block, or both. 
// The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed. 
// The code in the finally block will always be executed before control flow exits the entire construct

try {
    tryStatements
} catch (exceptionVar) {
    catchStatements
} finally {
    finallyStatements
}

// ----- tryStatements
// The statements to be executed.

// ----- catchStatements
// Statement that is executed if an exception is thrown in the try block.

// ----- exceptionVar (Optional)
// An optional identifier or pattern to hold the caught exception for the associated catch block.
// If the catch block does not use the exception's value, you can omit the exceptionVar and its surrounding parentheses.

// ----- finallyStatements
// Statements that are executed before control flow exits the 'try...catch...finally' construct.
// These statements execute regardless of whether an exception was thrown or caught.



// ----- Example

try {
    const num = Math.floor(Math.random() * 10) + 1; // Generate a number 1-10
    if (num >= 5) console.log(`The correct number is ${num}!`);
    else throw num;
} catch (exceptionVar) {
    console.log(`An error has occurred: ${exceptionVar}`)
} finally {
    console.log('We have finally reached the end!')
}



// Unlike other constructs such as if or for, the try, catch, and finally blocks must be blocks, instead of single statements.

/* try doSomething(); */ // SyntaxError
/* catch (e) console.log(e); */



// ----------------------------- > THROW -----------------------------





// ----------------------------- > THE EXCEPTION VARIABLE -----------------------------

// When an exception is thrown in the try block, exceptionVar (i.e., the e in catch (e)) holds the exception value. 
// You can use this variable to get information about the exception that was thrown. 
// This variable is only available in the catch block's scope.

// It need not be a single identifier. 
// You can use a destructuring pattern to assign multiple identifiers at once.

try {
  throw new TypeError("oops");
} catch ({ name, message }) {
  console.log(name); // "TypeError"
  console.log(message); // "oops"
}
