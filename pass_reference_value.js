// You learn about 'pass by value' and 'pass by reference', but
// NOTE: JavaScript is always pass-by-value. 
// This means everything in JavaScript is a value type and function arguments are always passed by value. 
// That being said, object types are a bit more confusing.



// ----------------------------- > OBJECTS -----------------------------

// for objects the value of the variable is a reference
// Because of this, when you pass an object and change its members 
// those changes persist outside of the function.

// This makes it look like pass by reference. 
// But if you actually change the value of the object variable 
// you will see that the change does not persist, proving it's really pass by value.



// A good analogy will be delivering letters 

const address1 = { letter: "undelivered" };
const address2 = { letter: "undelivered" };

function deliverLetter (add1, add2) { // We supply our postman with the addresses he has to deliver to

    // he goes to address1 to deliver the letter
    add1.letter = 'delivered'; // pointing directly to the member in the object that add1 is referencing with its value

    // he does not goes to address2, the letter never reaches its destination
    add2 = { letter: 'delivered' }; // pointing to value of add2, which is a reference

}

deliverLetter(address1, address2);

console.log(address1); // { letter: 'delivered' } 
console.log(address2); // { letter: 'undelivered' } 

// Simply put, changes to the object inside the function will affect the original object, as they both refer to the same object. 
// However, reassigning the value of the variable holding the object originally will not affect the object referenced by the function.
// NOTE: In short, if you make changes to the reference only, nothing will happen



// The term pass by reference and pass by value only applies to function calls and their arguments. 

// NOTE: The lesser used and known term that was coined is Call by sharing which applies to Ruby, JavaScript, Python, Java and so forth. 
// It implies that all values are object, all values are boxed, and they copy a reference when they pass it as value.



// ----- Another Example

// Changing the object reference in the function

function PassbyReference(obj) {
    obj = {
        a: 10,
        b: 20,
        c: 30,
    }
    console.log("Hello from inside the function: ", obj);
}

let objA = {
    a: 10,
    b: 20
}

console.log("Before calling Pass By Reference Function: ", objA); // Before calling Pass By Reference Function:  { a: 10, b: 20 }
PassbyReference(objA); // Hello from inside the function:  { a: 10, b: 20, c: 30 }
console.log("After calling Pass By Reference Function:", objA); // After calling Pass By Reference Function: { a: 10, b: 20 }



// Changing the original object

function PassbyReference(obj) {
    obj.c = 30;
    console.log("Hello from inside the function: ", obj);
}

let objB = {
    a: 10,
    b: 20
}

console.log("Before calling Pass By Reference Function: ", objB); // Before calling Pass By Reference Function:  { a: 10, b: 20 }
PassbyReference(objB); // Hello from inside the function:  { a: 10, b: 20, c: 30 }
console.log("After calling Pass By Reference Function:", objB); // After calling Pass By Reference Function: { a: 10, b: 20, c: 30 }



// ----------------------------- > PRIMITIVES -----------------------------

// Function is called by directly passing the value of the variable as the argument. 
// Changing the argument inside the function doesn’t affect the variable passed from outside the function.


const num = 10;

function callByValue(no) {
    // We can see very obviously here that only the value of the variable was passed in, not the variable itself
    console.log(no); // 10
    no = 100;
}

callByValue(num);

console.log("num: ", num); // num: 10 - no change occurs



// NOTE: Javascript always pass by value so changing the value of the variable never changes the original primitive 