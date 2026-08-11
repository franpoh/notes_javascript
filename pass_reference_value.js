
// You learn about 'pass by value' and 'pass by reference'

// NOTE:Pass by Value: the data is copied and anything you do to it inside the function will only persist in the function scope

// NOTE: Pass by Reference: you are given a pointer/handle/reference to the data, and it refers to the same underlying data as the original scope. 
// So if you modify it, that can be seen outside the scope. 



// NOTE: BUT JavaScript is always pass-by-value. 
// This means everything in JavaScript is a value type and function arguments are always passed by value. 



// ----------------------------- > PRIMITIVES -----------------------------

// Let's take a look at passing primitives into a function to better understand how passing objects into a function works
// In this case, the value of the variable that we are about to pass into the function is a primitive, hence 'passing primitives'

// Remember, we are passing by value: the data is copied and anything you do to the data inside the function will only affect it within the function scope

let num = 10;

function passPrimitiveValue(no) { 
    console.log(`Before attempting change: ${no}`);
    no = 100; // we attempt to change the value that was passed into the function here
    console.log(`After attempting change: ${no}`); 
}

passPrimitiveValue(num); // we call the function by passing the value of the variable 'num' into the function
// Before attempting change: 10 - here, you can see it is merely a value - a copy of the value of 'num'
// After attempting change: 100 - here, you can see the value has been changed, but as you will later see, only within the function scope

console.log("num: ", num); 
// num: 10 - no change occurs with the value of 'num' in the global scope, hence proving that what we passed into the function is just a copy



// It works differently if you change the value of a variable directly and not within a function

let cyp = 10;

cyp = 100; // directly changing the value of a variable
console.log(`cyp: ${cyp}`); // cyp: 100



// ----------------------------- > OBJECTS -----------------------------

// +++++ Is passing objects into a function really pass by reference? Here is an example:

let passingObject = {changeThis: 'unchanged'};

function passObjectFunction (passedObject) {
    console.log(`Before changing passedObject's changeThis: ${passedObject.changeThis}`);

    passedObject.changeThis = 'changed'; // we attempt to change a member in the object that was passed into the function here

    console.log(`After changing passedObject's changeThis: ${passedObject.changeThis}`);
}

passObjectFunction(passingObject); // we call the function by passing the value of the variable 'passingObject' into the function
// Before changing passedObject's changeThis: unchanged
// After changing passedObject's changeThis: changed - here, you can see the value has been changed in the function scope

console.log(`passingObject's changeThis: ${passingObject.changeThis}`);
// passingObject's changeThis: changed - it has been changed in the original variable in global scope as well



// Remember, pass by reference: you are given a pointer/handle/reference to the data, and it refers to the same underlying data as the original scope. 
// So if you modify it, that can be seen outside the scope - as it demonstrated in the above example

// So this example makes it look like pass by reference - but it isn't



// When the value of a variable is an object, that value is actually a reference - it is pointing to the actual value stored somewhere in memory
// variable = {object} - the variable points to its value, and the value points to an object in memory

// +++++ Here is an example that demonstrates how the value points to an object in memory

passingObject = {changeThis: 'unchanged'};
let copyObject = passingObject; // copyObject's value now points to passingObject's object as well

function passObjectFunction (passedObject) {
    console.log(`Before changing passedObject's changeThis: ${passedObject.changeThis}`);

    passedObject.changeThis = 'changed'; // we attempt to change a member in the object that was passed into the function here

    console.log(`After changing passedObject's changeThis: ${passedObject.changeThis}`);
}

passObjectFunction(passingObject); 
// Before changing passedObject's changeThis: unchanged
// After changing passedObject's changeThis: changed

console.log(`passingObject's changeThis: ${passingObject.changeThis}`); // passingObject's changeThis: changed
console.log(`copyObject's changeThis: ${copyObject.changeThis}`); // copyObject's changeThis: changed

// As you can see in the above example, both passingObject and copyObject were changed both in the function scope and global scope, even though we only appear to have changed the member of passingObject
// This demonstrates how the value of both the passingObject and copyObject variable were pointing at the same object 



// Now that we have demonstrated how the variable's value points to an object in memory
// We can say that the value of that variable is a reference (to the object in memory) - but nonetheless, it is still a value
// Thus we say that Javascript is always Pass by Value

// +++++ Here is example that demonstrates that even though passing an object into a function looks like pass by reference
// it is in fact pass by value - the data is copied and anything you do to it inside the function will only persist in the function scope

let passObjectWrong = {changeThis: 'unchanged'};
let passObjectCorrect = {changeThis: 'unchanged'};

function passObjectFunction (passObjectWrong, passObjectCorrect) { // passing in the copied values of whichever variables we call this function with
    console.log(`Before changing passObjectWrong's changeThis: ${passObjectWrong.changeThis}`);
    console.log(`Before changing passObjectCorrect's changeThis: ${passObjectCorrect.changeThis}`);

    // we attempt to change a member in the object that was passed into the function here - note the difference between the two
    passObjectWrong = {changeThis: 'changed'}; // changing the copied value 
    passObjectCorrect.changeThis = 'changed'; // going to the member of the object that the copied value is pointing at, and changing it

    console.log(`After changing passObjectWrong's changeThis: ${passObjectWrong.changeThis}`);
    console.log(`After changing passObjectCorrect's changeThis: ${passObjectCorrect.changeThis}`);
}

passObjectFunction(passObjectWrong, passObjectCorrect); // here, we can see that both objects were changed in the function scope
/*
Before changing passObjectWrong's changeThis: unchanged
Before changing passObjectCorrect's changeThis: unchanged

After changing passObjectWrong's changeThis: changed
After changing passObjectCorrect's changeThis: changed
*/ 

console.log(`passObjectWrong's changeThis: ${passObjectWrong.changeThis}`);
// passObjectWrong's changeThis: unchanged - it remains unchanged in the original variable in global scope - hence proving what we changed was merely a copied value

console.log(`passObjectCorrect's changeThis: ${passObjectCorrect.changeThis}`);
//passObjectCorrect's changeThis: changed - it has been changed in the original variable in global scope as well



// NOTE: The lesser used and known term that was coined is Call by sharing which applies to Ruby, JavaScript, Python, Java and so forth. 
// It implies that all values are object, all values are boxed, and they copy a reference when they pass it as value.