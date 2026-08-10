
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

// NOTE: The value that is passed is the reference 'address' to the 'real' object
// You need to access the 'real' object located at the reference 'address' to make any changes
// You can't just make changes to the reference 'address' and expect anything to happen to the 'real' object



// A good analogy will be a contractor visiting a house for painting

const house1 = { wall: "white" };
const house2 = { wall: "white" };

function paintWall (address1, address2) { // We supply our contractor with the addresses of the houses he has to paint

    // contractor goes to the house at address1 to paint the wall
    // he goes to the address, gets into the house, and paint the wall pink

    address1.wall = 'pink'; // pointing directly to the member in the object that address1 is referencing with its value

    // contractor is literally saying address2 now has a house with a wall that is blue
    // but he doesn't goes to address2 or access the house at address2 at all
    // he's just stating address2 now has some random ass house with a blue wall
    // in fact, because of this, address2 now is an entirely different address to a house the contractor made up

    address2 = { wall: 'blue' }; // pointing to value of address2, which is a reference, and replacing it with another object entirely

}

paintWall(house1, house2);

console.log(house1); // { wall: 'pink' }
console.log(house2); // { wall: 'white' }

// Simply put, changes to the object inside the function will affect the original object, as they both refer to the same object. 
// However, reassigning the value of the variable holding the object originally will not affect the object referenced by the function.
// NOTE: In short, if you make changes to the reference only, nothing will happen



// The term pass by reference and pass by value only applies to function calls and their arguments. 

// NOTE: The lesser used and known term that was coined is Call by sharing which applies to Ruby, JavaScript, Python, Java and so forth. 
// It implies that all values are object, all values are boxed, and they copy a reference when they pass it as value.
// In super simple terms, "Call by sharing" means that you are handing the function a duplicate address to your house, not the house itself.

// Here is what that means in practice:
// Imagine an Object in JavaScript is a house, and a variable is an address to that house.
// When you pass an Object into a function, JavaScript makes a copy of your adress and gives it to the function. 
// Now both you and the function have noted down the address to the exact same house.



// +++++ Another Example

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


let num = 10;

function callByValue(no) {
    // We can see very obviously here that only the value of the variable was passed in, not the variable itself
    console.log(no); // 10
    no = 100;
}

callByValue(num);

console.log("num: ", num); // num: 10 - no change occurs



// NOTE: Javascript always pass by value so changing the value of the variable never changes the original primitive 



let cyp = 10;

cyp = 100; // directly changing the value of a variable
console.log(`cyp: ${cyp}`); // cyp: 100