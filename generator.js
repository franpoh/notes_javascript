/* 
Table of Contents

> GENERATOR FUNCTION
>> yield
> GENERATOR OBJECT
>> next()
>> return
> EXAMPLES
*/



// NOTE: In my research, some say generator functions are awesome, others say they've never found any use for them. 
// Either ways, it's good to have a basic understanding.



// ----------------------------- > GENERATOR FUNCTION -----------------------------

// The function* declaration (function keyword followed by an asterisk) defines a generator function, which returns a Generator object. 
// The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

// function* declarations are hoisted to the top of their scope and can be called anywhere in their scope.

function* generator() {
    // yield operator is used to pause and resume a generator function.
    yield 10;
    yield 20;
}

const gen = generator();

// this console.log is just to show that calling a generator function will contruct a Generator object
console.log(gen); // Object [Generator] {}

// next() is a method in the generator object's iterator prototype
// when next() is called, the generator function's body is executed until the first yield expression, where it pauses
// then next() returns an object with two properties done and value
console.log(gen.next()); // { value: 10, done: false }

// when next() is called, the generator function's body unpauses and executed until the subsequent yield expression
// it will pause at that yield expression or, if it is the last yield, terminate the generator function
// returning only the value
console.log(gen.next().value); // 20

// When a generator is finished, subsequent next() calls will not execute any of that generator's code, 
// they will just return an object of this form: {value: undefined, done: true}.
console.log(gen.next()); // { value: undefined, done: true }



// You can also pass arguments into a generator function using parameters

function* generatorOnce(a, b) {
    yield a;
    yield a * b;
}

// You can pass arguments into generatorOnce() here
const genOnce = generatorOnce(10, 2);

// You can also provide a parameter to the next method to send a value to the generator, see examples below
console.log(genOnce.next()); // { value: 10, done: false }
console.log(genOnce.next()); // { value: 20, done: false }
console.log(genOnce.next()); // { value: undefined, done: true }



// Generators are functions that can be exited and later re-entered.
// Their context (variable bindings) will be saved across re-entrances.

// NOTE: Therefore, an important part of running the generator function 
// without creating a new generator object and rerunning from the start each time 
// is assigning the generator object to a variable

// This means unlike typical functions which will rerun from the top when called
// generator functions won't rerun the function from the top again, just from where it was paused
// Once it has finished running all of the code in the function body, it's done

// This enables you to run the generator function to the first yield
// saving where it pauses to your generator object in memory
// and restarting from your saved point the next time you call next()



// Let's see what will happen if we ran a generator function without binding it to a variable first

function* generatorNot() {
    yield 10;
    yield 20;
}

// The below result is because it is creating a new generator object every time we call generatorNot().next()

// Essentially, it creates a new generator object #1 and runs it until the first yield
// However, instead of saving this generator object #1 in memory, it trashes it
console.log(generatorNot().next()); // { value: 10, done: false }

// The next generatorNot().next() creates a new generator object #2 and starts the process all over again from the first line of code until it reaches the first yield
console.log(generatorNot().next()); // { value: 10, done: false }

// And it starts over again with creating a generator object #3 and returns the first yield. No progress is made. 
console.log(generatorNot().next()); // { value: 10, done: false }



// Now let's explain how assigning the generator object to a variable works

function* generatorYes() {
    yield 10;
    yield 20;
}

// By assigning the created generator object to a variable, we are saving a reference to the generator object in memory
let genYes = generatorYes(); // A new generator object #1 is created and a reference to it is saved to variable genYes

// Calling genYes.next(); we are able to reference generator object #1, run the code until the first yield, and save this point to generator object #1 
console.log(genYes.next()); // { value: 10, done: false }

// Calling genYes.next() again enables us to refer to generator object #1, continue running the code from the saved point and save the new point at which we stopped to generator object #1 
console.log(genYes.next()); // { value: 20, done: false }

// We are able to make progress and run all of the code in the function body to the end
console.log(genYes.next()); // { value: undefined, done: true }



// Generators in JavaScript — especially when combined with Promises — are a very powerful tool for asynchronous programming 
// as they mitigate — if not entirely eliminate -- the problems with callbacks, such as Callback Hell and Inversion of Control. 
// NOTE: However, an even simpler solution to these problems can be achieved with async functions.



// ----------------------------- > GENERATOR FUNCTION >> yield

// The yield keyword pauses generator function execution 
// and the value of the expression following the yield keyword is returned to the generator's caller. 
// It can be thought of as a generator-based version of the return keyword.

// yield can only be used directly within the generator function that contains it. 
// It cannot be used within nested functions.



function* generatorYield(i) {
    // yield can have an expression
    // Expression is the value to yield from the generator function via the iterator protocol. If omitted, undefined is yielded.
    yield; // expression undefined
    yield 10; // expression is 10
    yield i; // expression is i
}

const genYield = generatorYield('snack');

console.log(genYield.next()); // { value: undefined, done: false }
console.log(genYield.next()); // { value: 10, done: false }
console.log(genYield.next()); // { value: 'snack', done: false }



// +++++ Another example with a yield expression that increments 

function* idMaker() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const genID = idMaker();

console.log(genID.next().value); // 0
console.log(genID.next().value); // 1
console.log(genID.next().value); // 2
console.log(genID.next().value); // 3
// …



// Return value: Returns the optional value passed to the generator's next() method to resume its execution

// Note: This means next() is asymmetric: 
// it always sends a value to the currently suspended yield, but returns the operand of the next yield. 
// The argument passed to the first next() call cannot be retrieved because there's no currently suspended yield.
// See > GENERATOR OBJECT >> next() >>> How Calling The next() Method With An Argument Works



// You can use yield* to delegate to another generator function. 

function* anotherGenerator(i) {
    yield i + 1;
    yield i + 2;
    yield i + 3;
}

function* generator(i) {
    console.log("Testing");
    yield i;
    yield* anotherGenerator(i); // delegating to anotherGenerator()
    yield i + 10;
}

const genNother = generator(10);

// Calling a generator function does not execute its body immediately; a generator object for the function is returned instead. 
console.log(genNother); // Object [Generator] {}

// the first call of next executes from the start of the function until the first yield statement
// generator() console.log("Testing") & yield i
console.log(genNother.next().value); // Testing 10

// anotherGenerator() yield + 1
console.log(genNother.next().value); // 11

// anotherGenerator() yield + 2
console.log(genNother.next().value); // 12 

// anotherGenerator() yield + 3
console.log(genNother.next().value); // 13 

// generator() yield i + 10
console.log(genNother.next().value); // 20 

console.log(genNother.next()); // { value: undefined, done: true }



// ----------------------------- > GENERATOR OBJECT -----------------------------

// The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.



// Generator is a subclass of the hidden *Iterator class.
// Generator instances inherits instance methods from its parent Iterator:

// Generator.prototype.next()
// Returns a value yielded by the yield expression.

// Generator.prototype.return()
// Acts as if a return statement is inserted in the generator's body at the current suspended position, 
// which finishes the generator and allows the generator to perform any cleanup tasks when combined with a 'try...finally' block.

// Generator.prototype.throw()
// Acts as if a throw statement is inserted in the generator's body at the current suspended position, 
// which informs the generator of an error condition and allows it to handle the error, or perform cleanup and close itself.



// * Iterator: An Iterator object is an object that conforms to the iterator protocol by providing a next() method that returns an iterator result object. 
// The Iterator.prototype object is a hidden global object that all built-in iterators inherit from. 
// It provides a @@iterator method that returns the iterator object itself, making the iterator also iterable.



// ----------------------------- > GENERATOR OBJECT >> next()

// When the iterator's next() method is called, the generator resumes execution, and runs until it reaches:
//      A yield expression
//      The end of the generator function
//      A return statement
//      A throw statement

// +++++ A yield expression. 
// In this case, the generator pauses, 
// and the next() method return an iterator result object with two properties: value and done. 
// The value property is the value of the expression after the yield operator, 
// and done is false, indicating that the generator function has not fully completed.

// +++++ The end of the generator function. 
// In this case, execution of the generator ends, 
// and the next() method returns an iterator result object where the value is undefined and done is true.

// +++++ A return statement. 
// In this case, execution of the generator ends, 
// and the next() method returns an iterator result object where the value is the specified return value and done is true.

// +++++ A throw statement. 
// In this case, execution of the generator halts entirely, 
// and the next() method throws the specified exception.



// The next() method returns an object with a value property containing the yielded value 
// and a done property which indicates whether the generator has yielded its last value, as a boolean.  
// You can also provide a parameter to the next method to send a value to the generator. 



// +++++ NOTE: Important Example for how Calling the next() method with an argument works

// Calling the next() method with an argument will resume the generator function execution, 
// replacing the yield expression where an execution was paused with the argument from next().

// It is slightly confusing, so a few console.logs have been inserted so you can see where we are step-by-step

function* test() {
    console.log(`Pausing at first yield`);
    const yieldOne = yield 'Original value for yieldOne';

    console.log(`Pausing at second yield. This is the value of yieldOne: ${yieldOne}`);
    const yieldTwo = yield 'Original value for yieldTwo';

    console.log(`Pausing at third yield. This is the the value of yieldTwo: ${yieldTwo}`);
    const yieldThree = yield 'Original value for yieldThree';

    console.log(`Ending this function, this is the value of yieldThree: ${yieldThree}`);
}

const testing = test();

console.log(`This is the first next`);
console.log(testing.next('Argument for first next'));
// This is the first next
// Pausing at first yield
// { value: 'Original value for yieldOne', done: false }

console.log(`This is the second next`);
console.log(testing.next('Argument for second next'));
// This is the second next
// Pausing at second yield. This is the value of yieldOne: Argument for Second Next
// { value: 'Original value for yieldTwo', done: false }

console.log(`This is the third next`);
console.log(testing.next('Argument for third next'));
// This is the third next
// Pausing at third yield. This is the the value of yieldTwo: Argument for Third Next
// { value: 'Original value for yieldThree', done: false }

console.log(`This is the fourth next`);
console.log(testing.next('Argument for Fourth Next'));
// This is the fourth next
// Ending this function, this is the value of yieldThree: Argument for Fourth Next
// { value: undefined, done: true }

// NOTE: As you can see, the argument for the first next() was completely ignored and appeared nowhere in the values that were returned

// Remember, the code runs until it reaches a yield, at which point it returns that yield's object and then pauses until next() is called again
// NOTE: Therefore, observe that with the subsequent nexts, this are the steps it takes:
//      1. the next() argument replaces the yield expression where code execution is currently frozen
//      2. Code execution resumes from that exact spot until it reaches the next yield
//      3. It returns the object of that yield and pauses code execution

// Simply put, you can say that the next() argument replaces the 'previous' yield expression entirely. It is no longer a yield expression.  

// This is why the argument for the first next() is ignored and lost
// With the first next(), we are running the code from the start, there is no 'previous' yield expression to replace



// +++++ A Practical Example making use of the mechanic

// Observe that this has a 'question and answer' quality to it

function* pizzaOrder() {
    console.log("Order started...");

    // 1. Pauses at `yield`. 
    // When resumed via next(argument), the `yield "What size?"` expression is replaced by the argument.
    const size = yield "What size?";

    console.log(`Selected size: ${size}`);

    // 2. Pauses at the next `yield`.
    const topping = yield "What topping?";

    console.log(`Selected topping: ${topping}`);

    return `Order ready: 1 ${size} ${topping} pizza!`;
}

// Instantiate the generator
const order = pizzaOrder();

// Step 1: Start execution (runs until it hits the first yield)
console.log(order.next());
// Generator output: "Order started..."
// Returned object:  { value: 'What size?', done: false }

// Step 2: Pass "Large" INTO the paused yield
console.log(order.next("Large"));
// Generator output: "Selected size: Large"   
// Returned object:  { value: 'What topping?', done: false }

// Step 3: Pass "Pepperoni" INTO the second paused yield
console.log(order.next("Pepperoni"));
// Generator output: "Selected topping: Pepperoni" 
// Returned object:  { value: 'Order ready: 1 Large Pepperoni pizza!', done: true }



// ----------------------------- > GENERATOR OBJECT >> return -----------------------------

// A return statement in a generator, when executed, will make the generator finish 
// (i.e. the done property of the object returned by it will be set to true). 

// If a value is returned, it will be set as the value property of the object returned by the generator. 

// Much like a return statement, an error thrown inside the generator will make the generator finished — 
// unless caught within the generator's body. 

function* yieldAndReturn() {
    yield "Y";
    return "R";
    yield "unreachable";
}

const genReturn = yieldAndReturn();
console.log(genReturn.next()); // { value: "Y", done: false }
console.log(genReturn.next()); // { value: "R", done: true }
console.log(genReturn.next()); // { value: undefined, done: true }



// ----------------------------- > GENERATOR OBJECT >> throw -----------------------------

// Calling gen.throw(error) inserts a throw error statement into the generator function body where it is currently paused
// which informs the generator of an error condition and allows it to handle the error, or perform cleanup and close itself.

// Whether your application crashes or continues smoothly depends entirely on whether that paused yield statement lives inside a try...catch block inside the generator.



// +++++ Example with unhandled error

// If the generator is paused at a yield that is not wrapped in a try...catch block, 
// injecting an error destroys the generator's execution state and bubbles the error up to the caller.
// In this case, it passes the error up the chain until it hits the main program and crashes it

function* unhandledGenerator() {
    yield "Step 1";
    yield "Step 2"; // Never reached
}

const unhandledGen = unhandledGenerator();

console.log(unhandledGen.next()); // { value: 'Step 1', done: false }
console.log(unhandledGen.throw(new Error("Something broke!"))); // Uncaught Error: Something broke!

// Generator is now closed/done.



// +++++ Example with handled error

// If the yield statement is wrapped in a try...catch block, the error is caught inside the generator function. 
// Execution automatically moves into the catch block and continues downward to the next yield or return.

function* handledGenerator() {
    try {
        yield "Attempting task...";
    } catch (err) {
        console.log(`Handled inside generator: ${err.message}`);
    }

    yield "Fallback step execution"; // Resumes here after catch
}

const handledGen = handledGenerator();

// Advance to the first yield inside the try block
console.log(handledGen.next());
// { value: 'Attempting task...', done: false }

// Inject an error into the paused yield statement
console.log(handledGen.throw(new Error("Network Timeout")));
// Logs inside generator: "Handled inside generator: Network Timeout"
// Returns next yield: { value: 'Fallback step execution', done: false }



// ----------------------------- > EXAMPLES -----------------------------

// Generator as an object property

const someObj = {
    *generator() {
        yield "a";
        yield "b";
    },
};

const genObj = someObj.generator();

console.log(genObj.next()); // { value: 'a', done: false }
console.log(genObj.next()); // { value: 'b', done: false }
console.log(genObj.next()); // { value: undefined, done: true }



// Generator as an object method

class Foo {
    *generator() {
        yield 1;
        yield 2;
        yield 3;
    }
}

const f = new Foo();
const genMet = f.generator();

console.log(genMet.next()); // { value: 1, done: false }
console.log(genMet.next()); // { value: 2, done: false }
console.log(genMet.next()); // { value: 3, done: false }
console.log(genMet.next()); // { value: undefined, done: true }



// Generator as a computed property

class Foo {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
    }
}

const SomeObj = {
    *[Symbol.iterator]() {
        yield "a";
        yield "b";
    },
};

console.log(Array.from(new Foo())); // [ 1, 2 ]
console.log(Array.from(SomeObj)); // [ 'a', 'b' ]



// Generator defined in an expression

const foo = function* () {
    yield 10;
    yield 20;
};

const bar = foo();
console.log(bar.next()); // {value: 10, done: false}
