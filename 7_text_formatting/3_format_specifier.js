
// We know that the console.log() function will log a message to the console, but console.log() can also format the text and make the message stand out from other messages. 
// This gives us the ability to find important messages in the console.


// Format specifiers, otherwise also known as string substitutions, are special strings that can be used with console.log() and other console methods in JavaScript to format and style the output.
// In other words, we can use format specifiers to tell the log function how the data should be printed. 



// In JavaScript, the most common format specifiers used with the `console.log()` method are:

// %s           Formats the value as a string.
// %i or %d     Formats the value as an integer.
// %f           Formats the value as a floating-point value.
// %o           Formats the value as an expandable DOM element, as seen in the Elements panel.
// %O           Formats the value as an expandable JavaScript object.
// %c           Applies CSS style rules to the output string as specified by the second parameter.



// Here's an example:

const pname = "John Doe";
const age = 30;
const isStudent = true;

console.log("Name: %s, Age: %d, Student: %s", pname, age, isStudent); // Name: John Doe, Age: 30, Student: true


// In this example, the format specifiers `%s`, `%d`, and `%s` are used to represent the string, integer, and boolean values, respectively.



// Try running this in browser console!
console.log("%cJavascript Jeep 🚙in Blue", "color:blue; font-size:50px");