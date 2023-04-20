// Table of Contents

// > CONCATENATE STRINGS USING + OPERATOR
// > TOSTRING
// > TEMPLATE LITERAL
// >> ${ } Construct 
// >> Split A Traditional String Over Multiple Lines



// When you enter an actual string in your code, enclosed in single or double quotes, it is called a string literal.



// ----------------------------- > ESCAPING CHARACTERS IN A STRING -----------------------------

// Escaping characters means that we do something to them to make sure they are recognized as text, not part of the code.
// In JavaScript, we do this by putting a backslash just before the character.

const bigmouth = 'I\'ve got no right to take my place…';
console.log(bigmouth); // I've got no right to take my place…



// ----------------------------- > TOSTRING -----------------------------

// To convert a number value into a string

let myNum2 = 123;
console.log(myNum2.toString()); // 123



// ----------------------------- > TEMPLATE LITERAL -----------------------------

// This is a newer syntax that provides more flexible, easier to read strings. 

// To turn a standard string literal into a template literal, you have to replace the quote marks (' ', or " ") with backtick characters (` `).

let score = 9;
let highestScore = 10;

let output = 'I like the song "' + song + '". I gave it a score of ' + (score/highestScore * 100) + '%.';

// Template Literal:
output = `I like the song "${ song }". I gave it a score of ${ score/highestScore * 100 }%.`;

// There is no more need to open and close multiple string pieces — the whole lot can just be wrapped in a single pair of backticks. 



// ----------------------------- > TEMPLATE LITERAL >> ${ } Construct 

// to include a variable or expression inside the string, you include it inside a ${ } construct, which is called a placeholder.


// ----------------------------- > TEMPLATE LITERAL >> Split A Traditional String Over Multiple Lines

// \n – a newline character

output = 'I like the song "' + song + '".\nI gave it a score of ' + (score/highestScore * 100) + '%.';

// Template literals respect the line breaks in the source code, so newline characters are no longer needed. This would achieve the same result:

output = `I like the song "${ song }".
I gave it a score of ${ score/highestScore * 100 }%.`;