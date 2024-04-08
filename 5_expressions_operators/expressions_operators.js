/* 
Table of Contents

> ARITHMETIC OPERATOR
>> % Remainder / modulo
>> ** Exponent
> ASSIGNMENT OPERATORS
> COMPARISON OPERATORS
> LOGICAL OPERATORS
>> Logical AND &&
>> Logical OR ||
>> Logical NOT !
>> Nullish Coalescing Operator ??
> UNARY OPERATORS
>> Increment And Decrement Operators 
> CONDITIONAL (TERNARY) OPERATOR
> MISC OPERATORS
*/

// NOTE: You'll sometimes see numbers involved in arithmetic referred to as operands

// An operand is the part of an instruction representing the data manipulated by the operator. 
// For example, when you add two numbers, the numbers are the operand and "+" is the operator.



// ----------------------------- > ARITHMETIC OPERATORS -----------------------------

// Multiply and divide are always done first, then add and subtract.
// Add parentheses if you want to override precedence

// 9 + 9
// 9 – 9
// 9 * 9
// 9 / 9

// + can be used to join text strings together (in programming, this is called concatenation)



// ----------------------------- > ARITHMETIC OPERATORS >> % Remainder / modulo

// Returns the remainder left over after you've divided the left number into a number of integer portions equal to the right number.

console.log(17 % 5); // 2 (5 goes into 17 thrice, leaving 2 left over)

console.log(4 % 8); // 4 (As 8 is unable to go into 4 at all, leaving still 4)



// ----------------------------- > ARITHMETIC OPERATORS >> ** Exponent	

// Raises a base number to the exponent power - the base number multiplied by itself, exponent times.

console.log(5 ** 2); // 25 (is the same as 5 * 5)
console.log(3 ** 4); // 81



// You may sometimes see exponents expressed using the older Math.pow() method, which works in a very similar way. 
// For example, in Math.pow(7, 3), 7 is the base and 3 is the exponent, so the result of the expression is 343. Math.pow(7, 3) is equivalent to 7**3.



// ----------------------------- > ASSIGNMENT OPERATORS -----------------------------

// Assignment operators are operators that assign a value to a variable.

let x = 15; // assigns 5 to x with =



// There are some more complex types, which provide useful shortcuts to keep your code neater and more efficient

// += 
// Addition Assignment
x = 15;
console.log(x += 4); // 19 (x = x + 4;)

// -= 
// Substraction Assignment 
x = 15;
console.log(x -= 3); // 12

// *= 
// Multiplication Assignment
x = 15;
console.log(x *= 3); // 45

// /= 
// Division Assignment
x = 15;
console.log(x /= 5); // 3



// ----------------------------- > COMPARISON OPERATORS -----------------------------

// For running true/false tests



// === 
// Strict Equal
// Returns true if the operands are equal and of the same type.

console.log('Chris' === 'Bob'); // false
console.log(5 === 2 + 3); // true
console.log(2 === '2'); // false (number versus string)



// == 
// Equal
// Returns true if the operands are equal

console.log(5 == 2 + 3); // true
console.log(2 == '2'); // true (number versus string)



// !== 
// Strict Not Equal
// Returns true if the operands are of the same type but not equal, or are of different type

console.log(5 !== 2 + 4); // true
console.log('Chris' !== 'Bob'); // true
console.log(2 !== '2'); // true (number versus string)



// !=
// Not Equal
// Returns true if the operands are not equal

console.log(5 != 2 + 4); // true
console.log('Chris' != 'Bob'); // true
console.log(2 != '2'); // false


// < 
// Less than

console.log(6 < 10); // true



// > 
// Greater than

console.log(6 > 10); // false



// <= 
// Less than or equal to

console.log(3 <= 2); // false



// >= 
// Greater than or equal to

console.log(5 >= 4); // true



// ----------------------------- > LOGICAL OPERATORS -----------------------------

// Logical operators are typically used with Boolean(logical) values; when they are, they return a Boolean value.

// However, the && and || operators actually return the value of one of the specified operands, 
// so if these operators are used with non - Boolean values, they may return a non-Boolean value.

// Examples of expressions that can be converted to false are those that evaluate to null, 0, NaN, the empty string (""), or undefined. 



// As logical expressions are evaluated left to right, they are tested for possible "short-circuit" 

// false && anything is short-circuit evaluated to false.
// true || anything is short-circuit evaluated to true.

// The rules of logic guarantee that these evaluations are always correct.
// Note that the anything part of the above expressions is not evaluated, so any side effects of doing so do not take effect.



// Note that for the second case - (true || anything is short-circuit evaluated to true)
// in modern code you can use the Nullish coalescing operator (??) 

// ?? works like ||, but it only returns the second expression, when the first one is "nullish", i.e. null or undefined. 
// It is thus the better alternative to provide defaults, when values like '' or 0 are valid values for the first expression, too. 

// See > NULLISH COALESCING OPERATOR ??



// ----------------------------- > LOGICAL OPERATORS >> Logical AND &&

// expr1 && expr2	

// Returns expr1 if it can be converted to false; otherwise, returns expr2.
// Thus, when used with Boolean values, && returns true if both operands are true; otherwise, returns false.

console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false

console.log(false && (3 == 4)); // false
console.log((3 == 3) && (3 == 4)); // false
console.log((3 == 3) && (4 == 4)) // true

console.log('Cat' && 'Dog'); // Dog
console.log(false && 'Cat'); // false
console.log('Cat' && false); // false
console.log(true && 'Cat'); // Cat
console.log('Cat' && true); // true



// ----------------------------- > LOGICAL OPERATORS >> Logical OR ||

// expr1 || expr2	
// Returns expr1 if it can be converted to true; otherwise, returns expr2.
// Thus, when used with Boolean values, || returns true if either operand is true; if both are false, returns false.

console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true

console.log(false || (3 == 4)); // false
console.log((3 == 3) || (3 == 4)); // true
console.log((3 == 3) || (4 == 4)) // true

console.log('Cat' || 'Dog'); // Cat
console.log(false || 'Cat'); // Cat
console.log('Cat' || false); // Cat
console.log(true || 'Cat'); // true
console.log('Cat' || true); // Cat



// ----------------------------- > LOGICAL OPERATORS >> Logical NOT !

// !expr	
// Returns false if its single operand that can be converted to true; otherwise, returns true.

console.log(!true);  // false
console.log(!false); // true
console.log(!'Cat'); // false



// ----------------------------- > LOGICAL OPERATORS >> Nullish Coalescing Operator ??

// leftExpr ?? rightExpr
// logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
// It is thus the better alternative to provide defaults, when values like '' or 0 are valid values for the first expression, too.

console.log(null ?? "default for A"); // default for A
console.log("" ?? "default for B"); // "" (as the empty string is not null or undefined)
console.log(42 ?? 0); // 42



// It is not possible to combine both the AND(&&) and OR operators(||) directly with ??. A SyntaxError will be thrown in such cases.
// However, providing parenthesis to explicitly indicate precedence is correct:

console.log(null || undefined); // undefined
console.log((null || undefined) ?? "foo"); // foo



let z = 1;

console.log(z ??= y); // 1
// Nullish coalescing assignment short-circuits, which means that the above is equivalent to
console.log(z ?? (z = y)); // 1

z = null;
console.log(z ??= y); // y is not defined



// No assignment is performed if the left-hand side is not nullish, due to short-circuiting of the nullish coalescing operator. 
// For example, the following does not throw an error, despite w being const

const w = 1;
console.log(w ??= 2); // 1



// In fact, if v is not nullish, y is not evaluated at all.
const v = 1;
v ??= console.log("y evaluated"); // Logs nothing



// NOTE: Useful Example

// You can use the nullish coalescing assignment operator to apply default values to object properties. 
// Compared to using destructuring and default values, ??= also applies the default value if the property has value null.

function config(options) {
    options.duration ??= 100;
    options.speed ??= 25;
    return options;
}

console.log(config({ duration: 125 })); // { duration: 125, speed: 25 }
console.log(config({})); // { duration: 100, speed: 25 }



// ----------------------------- > UNARY OPERATORS -----------------------------

// simplest operators in JavaScript
// A unary operation is an operation with only one operand.

let a = 10;

// Unary Plus +  
// convert an operand into a number

console.log("+a: ", a = +a); // 10

// Unary Minus -
// convert an operand into a number and negate the value after that.

console.log("-a: ", a = -a); // -10



// When applied to non-numeric value, performs the same conversion as the Number() function.

a = '10';
console.log(+a); // 10



// converts boolean values into numbers

let f = false,
    t = true;
console.log(+f); // 0
console.log(+t); // 1



// a product object with the valueOf() method, the method is called to return the converted value

let product = {
    valueOf: function () {
        return 60;
    }
};

console.log(+product); // 60



// ----------------------------- > UNARY OPERATORS >> Increment And Decrement Operators 

// prefix / postfix increments(++) – add one to its operand
// prefix / postfix decrements(--) – subtract one from its operand.
// Both increment and decrement operators have two versions: prefix and postfix.

// Prefix - the value of the variable changed before the statement is evaluated.
// Postfix - evaluate them until the containing statement has been evaluated.



// ++ is an incrementation operation, increase by 1

let num = 0;
console.log("Prefix: ", ++num); // 1

num = 0;
console.log("Postfix Before Evaluation: ", num++); // Postfix Before Evaluation:  0 (this is because the browser returns the current value, then increments the variable)
console.log("Postfix After Evaluation: ", num); // Postfix After Evaluation:  1 (Here it has incremented)



// -- is a decrement operator, decrease by 1

num = 5;
console.log("Prefix: ", --num); // Prefix:  4

num = 5;
console.log("Postfix Before Evaluation: ", num--); // Postfix Before Evaluation:  5
console.log("Postfix After Evaluation: ", num); // Postfix After Evaluation:  4



// ----------------------------- > CONDITIONAL (TERNARY) OPERATOR -----------------------------

// The conditional operator is the only JavaScript operator that takes three operands. 
// The operator can have one of two values based on a condition. The syntax is:

// condition ? val1 : val2

// If condition is true, the operator has the value of val1. Otherwise it has the value of val2. 
// You can use the conditional operator anywhere you would use a standard operator.

let age = 23;
const currentStatus = age >= 18 ? "adult" : "minor";
console.log(currentStatus); // adult

// This statement assigns the value "adult" to the variable currentStatus if age is eighteen or more. 
// Otherwise, it assigns the value "minor" to currentStatus. 



// ----------------------------- > MISC OPERATORS -----------------------------

// instanceof
// The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object.
// The return value is a boolean value.

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car); // true
console.log(auto instanceof Object); // true
