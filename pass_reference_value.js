/* 
Table of Contents

> PASS BY VALUE
> PASS BY REFERENCE
>> Mutating the original value in an object
*/



function changeStuff(a, b, c) {
    a = a * 10;
    b.item = "changed";
    c = { item: "changed" };
}

var num = 10;
var obj1 = { item: "unchanged" };
var obj2 = { item: "unchanged" };

changeStuff(num, obj1, obj2);

console.log("a: ", num); // a:  10
console.log("b: ", obj1.item); // b:  changed
console.log("c: ", obj2.item); // c:  unchanged

// If obj1 was not a reference at all, 
// then changing obj1.item would have no effect on the obj1 outside of the function.

// If the argument was a proper reference, then everything would have changed. 
// num would be 100, and obj2.item would read "changed". Instead, num stays 10 and obj2.item remains "unchanged".

// Instead, the situation is that the item passed in is passed by value. 
// NOTE: But the item that is passed by value is itself a reference. See > PASS BY VALUE notes

// In practical terms, this means that if you change the parameter itself (as with num and obj2), 
// that won't affect the item that was fed into the parameter. 
// But if you change the internals of the parameter, that will propagate back up (as with obj1).



// ----------------------------- > PASS BY VALUE -----------------------------

// Function is called by directly passing the value of the variable as the argument. 
// Changing the argument inside the function doesn’t affect the variable passed from outside the function.

// NOTE: Javascript always pass by value so changing the value of the variable never changes the underlying primitive (String or number).
// In JavaScript the value that is passed is a reference. 
// That means that, indeed, that the reference to the primitive is copied, and therefore changing a primitive inside a function doesn't affect the primitive on the outside. 
// That also means that, indeed, the reference to a reference type, such as an array or object, is copied and passed as the value.

// NOTE: All primitive-methods return a new value and thus one can not modify it, 
// all objects and arrays can have methods that modified their value, and thus one can modify it. 

// The term pass by reference and pass by value only applies to function calls and their arguments. 

// NOTE: The lesser used and known term that was coined is Call by sharing which applies to Ruby, JavaScript, Python, Java and so forth. 
// It implies that all values are object, all values are boxed, and they copy a reference when they pass it as value.



// Value as Primitive Value Example

varOne = 10;

function callByValue(varOne) {
    varOne = 100;
} // at this point, varOne = 10

callByValue(varOne); // we run the function

console.log("varOne: ", varOne); // varOne:  10

// varOne outside function and varOne inside function points to their own individual locations



// ----------------------------- > PASS BY REFERENCE -----------------------------

// Function is called by directly passing the reference/address of the variable as the argument. 

// Changing the argument inside the function affect the variable passed from outside the function. 

// In Javascript objects and arrays follows pass by reference.
// so if we are passing object or array as an argument to the method, then there is a possibility that value of the object can change.

// NOTE: Once again, the term pass by reference and pass by value only applies to function calls and their arguments. 
// In short: It's always pass by value, but the value of objects and arrays is a reference.



let varOne = { a: 10 }; // this is an object

function callByReference(varOne) { // the object is passed into a function*
    varOne.a = 100;
} // at this point, varOne = {a:10}

// * the reference is passed, the location of the data in memory
// Therefore, varOne.a points to the same location as varOne = {a://value} 

console.log("varOne: ", varOne); // varOne: {a:10}

callByReference(varOne) // we run the function. 

console.log("varOne: ", varOne); // varOne: {a:100}



// Another Example

var mycar = { // Declare var 'mycar'; create & initialize new Object; assign reference to it to 'mycar'
    brand: "Honda",
    model: "Accord",
    year: 1998
};

function myFunc(theObject) { // Declare the function 'myFunc'
    theObject.brand = "Toyota";
}

console.log(mycar.brand); // Logs 'Honda'

myFunc(mycar); // Pass object reference to the function 

console.log(mycar.brand); // Logs 'Toyota' as the value of the 'brand' property



// ----------------------------- > PASS BY REFERENCE >> Mutating the original value in an object

// Note: In Pass by Reference, we are mutating the original value. 
// when we pass an object as an arguments and update that object’s reference in the function’s context, that won’t affect the object value. 
// But if we mutate the object internally, It will affect the object.



// Updating the object reference in the function

function PassbyReference(obj) {
    obj = {
        a: 10,
        b: 20,
        c: 30,
    }
    console.log("Hello from inside the function: ", obj);
}

let obj = {
    a: 10,
    b: 20
}

console.log("Before calling Pass By Reference Function: ", obj); // Before calling Pass By Reference Function:  { a: 10, b: 20 }

PassbyReference(obj); // Hello from inside the function:  { a: 10, b: 20, c: 30 }

console.log("After calling Pass By Reference Function:", obj); // After calling Pass By Reference Function: { a: 10, b: 20 }



// Mutating the original Object

function PassbyReference(obj) {
    obj.c = 30;
    console.log("Hello from inside the function: ", obj);
}

obj = {
    a: 10,
    b: 20
}

console.log("Before calling Pass By Reference Function: ", obj); // Before calling Pass By Reference Function:  { a: 10, b: 20 }

PassbyReference(obj); // Hello from inside the function:  { a: 10, b: 20, c: 30 }

console.log("After calling Pass By Reference Function:", obj); // After calling Pass By Reference Function: { a: 10, b: 20, c: 30 }