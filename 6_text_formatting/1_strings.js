/* 
Table of Contents

> STRING OBJECTS
> INTERNATIONALISATION
>> Date & Time Formatting
>> Number Formatting
> TOSTRING
*/



// ----------------------------- > STRING OBJECTS -----------------------------

// The String object is a wrapper around the string primitive data type.

const foo = new String("foo"); // Creates a String object
console.log(foo); // [String: 'foo']
typeof foo; // 'object'

// You can call any of the methods of the String object on a string literal value
// JavaScript automatically converts the string literal to a temporary String object, calls the method, then discards the temporary String object. 
// You can also use the length property with a string literal.
// NOTE: See object\object_wrapper.js



// You should use string literals unless you specifically need to use a String object, because String objects can have counterintuitive behavior.

const firstString = "2 + 2"; // Creates a string literal value
const secondString = new String("2 + 2"); // Creates a String object

console.log(eval(firstString)); // 4
console.log(eval(secondString)); // [String: '2 + 2']



// A String object has one property, length, that indicates the number of *UTF-16 code units in the string. 

// * UTF-16 is a character encoding scheme that is used in various environments, including JavaScript and the web. 
// It represents each character using one or two 16-bit code units. 
// So essentially, the string object property 'length' is the number of characters in the string

// For example, the following code assigns helloLength the value 13, because "Hello, World!" has 13 characters, each represented by one UTF-16 code unit. 

const hello = "Hello, World!";
const helloLength = hello.length;

console.log(helloLength); // 13

// You can access each code unit using an array bracket style. 

console.log(hello[0]); // H

// You can't change individual characters because strings are immutable array-like objects:

hello[0] = "L"; // This has no effect, because strings are immutable
console.log(hello); // Hello, World!



// ----------------------------- > INTERNATIONALISATION -----------------------------

// The Intl object is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting. 

// The constructors for Intl.Collator, Intl.NumberFormat, and Intl.DateTimeFormat objects are properties of the Intl object.



// ----------------------------- > INTERNATIONALISATION >> Date & Time Formatting

// The Intl.DateTimeFormat object is useful for formatting date and time.

// July 17, 2014 00:00:00 UTC:

const myBirthday = new Date(1990, 6, 8);

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
};

const americanDateTime = new Intl.DateTimeFormat('en-US', options).format;
console.log(`America: ${americanDateTime(myBirthday)}`); // America: Sunday, July 8, 1990

const italyDateTime = new Intl.DateTimeFormat('it-IT', options).format;
console.log(`Italy: ${italyDateTime(myBirthday)}`); // Italy: domenica 8 luglio 1990

const netherlandsDateTime = new Intl.DateTimeFormat('nl-NL', options).format;
console.log(`Netherlands: ${netherlandsDateTime(myBirthday)}`); // Netherlands: zondag 8 juli 1990



// ----------------------------- > INTERNATIONALISATION >> Number Formatting

// The Intl.NumberFormat object is useful for formatting numbers, for example currencies.

const gasPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
});

console.log(gasPrice.format(5.259)); // $5.259

const benzinePrijs = new Intl.NumberFormat("nl-NL", {
    style: 'currency',
    currency: 'EUR',
})

console.log(benzinePrijs.format(5.259)); // € 5,26



// ----------------------------- > TOSTRING -----------------------------

// The toString() method of String values returns this string value.

let myNum2 = 123;
console.log(myNum2.toString()); // 123

