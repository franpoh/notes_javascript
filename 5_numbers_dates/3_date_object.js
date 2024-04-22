/* 
Table of Contents

> METHODS
>> toLocale
*/



// JavaScript does not have a date data type. However, you can use the Date object and its methods to work with dates and times in your applications. 
// The Date object has a large number of methods for setting, getting, and manipulating dates. It does not have any properties.

// JavaScript handles dates similarly to Java. 
// The two languages have many of the same date methods, 
// and both languages store dates as the number of milliseconds since midnight at the beginning of January 1, 1970, UTC, with a Unix Timestamp being the number of seconds since the same instant. 
// The instant at the midnight at the beginning of January 1, 1970, UTC is called the epoch.



// To create a Date object:

const dateObjectName = new Date([parameters]);



// Calling Date without the new keyword returns a string representing the current date and time.
// Note that it is a string, which is different from the Date object created with 'new Date()'
console.log(Date()); // eg Mon Apr 22 2024 14:19:00 GMT+0200 (Central European Summer Time)



// The parameters in the preceding syntax can be any of the following:

// Nothing: creates today's date and time. 
console.log(new Date()); // eg 2024-04-22T12:19:16.254Z

// A string representing a date, in many different forms. The exact forms supported differ among engines, but the following form is always supported: YYYY-MM-DDTHH:mm:ss.sssZ. 
var xmas95 = new Date("1995-12-25"); // If you omit hours, minutes, or seconds, the value will be set to zero.
console.log(xmas95); // 1995-12-25T00:00:00.000Z

// A set of integer values for year, month, and day. 
xmas95 = new Date(1995, 11, 25);
console.log(xmas95); // 1995-12-24T23:00:00.000Z

// A set of integer values for year, month, day, hour, minute, and seconds. 
xmas95 = new Date(1995, 11, 25, 9, 30, 0);
console.log(xmas95); // 1995-12-25T08:30:00.000Z



// ----------------------------- > METHODS -----------------------------

// The Date object methods for handling dates and times fall into these broad categories:

// "set" methods, for setting date and time values in Date objects.
// "get" methods, for getting date and time values from Date objects.
// "to" methods, for returning string values from Date objects.
// parse and UTC methods, for parsing Date strings.



// With the "get" and "set" methods you can get and set seconds, minutes, hours, day of the month, day of the week, months, and years separately. 
// There is a getDay method that returns the day of the week, but no corresponding setDay method, because the day of the week is set automatically. 

// These methods use integers to represent these values as follows:

// Seconds and minutes: 0 to 59
// Hours: 0 to 23
// Day: 0 (Sunday) to 6 (Saturday)
// Date: 1 to 31 (day of the month)
// Months: 0 (January) to 11 (December)
// Year: years since 1900



// For example, suppose you define the following date:

const xmas95 = new Date("1995-12-25");

console.log(xmas95.getMonth()); // 11
console.log(xmas95.getFullYear()); // 1995


// The getTime and setTime methods are useful for comparing dates. 
// The getTime method returns the number of milliseconds since the epoch for a Date object.

// For example, the following code displays the number of days left in the current year:

const today = new Date();
console.log(today); // eg 2024-04-22T12:18:01.384Z

const endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // Set day and month
console.log(endYear); // 1995-12-31T22:59:59.999Z

endYear.setFullYear(today.getFullYear()); // Set year to this year
console.log(endYear); // eg 2024-12-31T22:59:59.999Z

const msPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds per day
console.log(msPerDay); // 86400000

let daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
console.log(daysLeft); // eg 253.44581730324074

daysLeft = Math.round(daysLeft); // Returns days left in the year
console.log(daysLeft); // eg 253

// This example creates a Date object named today that contains today's date. 
// It then creates a Date object named endYear and sets the year to the current year. 
// Then, using the number of milliseconds per day, it computes the number of days between today and endYear, using getTime and rounding to a whole number of days.



// The parse method is useful for assigning values from date strings to existing Date objects. 
// Note: The parse doesn't work as a standalone, it has to be assigned to a existing Date object

// For example, the following code uses parse and setTime to assign a date value to the ipoDate object:

const ipoDate = new Date();

ipoDate.setTime(Date.parse("June 8, 1990"));

console.log(ipoDate); // 1995-08-08T22:00:00.000Z



// In the following example, the function JSClock() returns the time in the format of a digital clock.

function JSClock() {

    // The JSClock function first creates a new Date object called time; since no arguments are given, time is created with the current date and time. 
    const time = new Date();

    // Then calls to the getHours, getMinutes, and getSeconds methods assign the value of the current hour, minute, and second to hour, minute, and second.
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    // The following statements build a string value based on the time. 
    // For an explanation for %, see 5_expressions_operators\expressions_operators.js > ARITHMETIC OPERATORS >> % Remainder / modulo
    let temp = String(hour % 12); // The first statement creates a variable temp. Its value is hour % 12, which is hour in the 12-hour system. 

    // Then, if the hour is 0, it gets re-assigned to 12, so that midnights and noons are displayed as 12:00 instead of 0:00.
    if (temp === "0") {
        temp = "12";
    }

    // The next statement appends a minute value to temp. 
    temp += (minute < 10 ? ":0" : ":") + minute; // If the value of minute is less than 10, the conditional expression adds a string with a preceding zero; otherwise it adds a string with a demarcating colon. 
    temp += (second < 10 ? ":0" : ":") + second; // Then a statement appends a seconds value to temp in the same way.

    // Finally, a conditional expression appends "P.M." to temp if hour is 12 or greater; otherwise, it appends "A.M." to temp.
    temp += hour >= 12 ? " P.M." : " A.M.";

    return temp;
}

console.log(JSClock()); // eg 2:20:37 P.M.



// ----------------------------- > METHODS >> toLocale

// The toLocaleDateString() method of Date instances returns a string with a language-sensitive representation of the date portion of this date in the local timezone.

const e = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

console.log(e.toLocaleDateString()); // 20/12/2012

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

console.log(e.toLocaleDateString(undefined, options)); // Thursday, 20 December 2012
console.log(e.toLocaleDateString('nl-NL', options)); // donderdag 20 december 2012
console.log(e.toLocaleDateString('zh-CN', options)); // 2012年12月20日星期四



// The toLocaleTimeString() method of Date instances returns a string with a language-sensitive representation of the time portion of this date in the local timezone.

// Depending on timezone, your results will vary
const thisTime = new Date('August 19, 1975 23:15:30 GMT+00:00');

console.log(thisTime.toLocaleTimeString('en-US')); // 1:15:30 AM
console.log(thisTime.toLocaleTimeString('it-IT')); // 01:15:30