/* 
Table of Contents

> GENERATOR FUNCTION
>> yield
> GENERATOR OBJECT
>> next()
>>> How Calling The next() Method With An Argument Works
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



// Generators are functions that can be exited and later re-entered.
// Their context (variable bindings) will be saved across re-entrances.
// (This is with regards to a SINGLE code run)

// This means unlike typical functions which will rerun from the top when called
// generator functions won't rerun the function from the top again, just from where it was paused
// Once it has run, it's done
// (Of course if you rerun the whole code again then it'll start from the top)

function* generatorOnce(i) {
    yield i;
}

// You can pass arguments into generatorOnce() here
const genOnce = generatorOnce(10);

// You can also provide a parameter to the next method to send a value to the generator, see examples below
console.log(genOnce.next()); // { value: 10, done: false }
console.log(genOnce.next()); // { value: undefined, done: true }



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



// ----- Another example with a yield expression that increments 

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
console.log(genNother);

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

// The next() method returns an object with a value property containing the yielded value 
// and a done property which indicates whether the generator has yielded its last value, as a boolean.  
// You can also provide a parameter to the next method to send a value to the generator. 



// -----------------------------

// When the iterator's next() method is called, the generator resumes execution, and runs until it reaches:
// A yield expression
// The end of the generator function
// A return statement
// A throw statement



// ----- A yield expression. 
// In this case, the generator pauses, 
// and the next() method return an iterator result object with two properties: value and done. 
// The value property is the value of the expression after the yield operator, 
// and done is false, indicating that the generator function has not fully completed.



// ----- The end of the generator function. 
// In this case, execution of the generator ends, 
// and the next() method returns an iterator result object where the value is undefined and done is true.



// ----- A return statement. 
// In this case, execution of the generator ends, 
// and the next() method returns an iterator result object where the value is the specified return value and done is true.



// ----- A throw statement. 
// In this case, execution of the generator halts entirely, 
// and the next() method throws the specified exception.



// -----------------------------

// Calling the next() method with an argument will resume the generator function execution, 
// replacing the yield expression where an execution was paused with the argument from next().

function* logGenerator() {
    console.log(0);
    console.log(1, yield);
    console.log(2, yield);
    console.log(3, yield);
}

const genArg = logGenerator();

// the first call of next executes from the start of the function until the first yield statement
genArg.next(); // 0
genArg.next("pretzel"); // 1 pretzel
genArg.next("california"); // 2 california
genArg.next("mayonnaise"); // 3 mayonnaise



// ----------------------------- > GENERATOR OBJECT >> next() >>> How Calling The next() Method With An Argument Works

// NOTE: This section is important because this mechanic was confusing for me, so read carefully 



// The first call does not log anything, because the generator was not yielding anything initially.

function* generatorA() {
    console.log('Test 1', yield 1);
    console.log('Test 1 Done')

    const value = yield 2;
    console.log('Test 2')

    console.log('Test 3', value);
    console.log('Test 3 Done')
}

const genA = generatorA();

// NOTE: No log at this step: the first value sent through `next` is lost
console.log(genA.next('duck')); // { value: 1, done: false }

console.log(genA.next('turkey')); // Test 1 turkey / Test 1 Done / { value: 2, done: false }
console.log(genA.next('chicken')); // Test 2 / Test 3 chicken / Test 3 Done { value: undefined, done: true }



// NOTE: Here is the same example as above, but with step-by-step comments
// Click on the arrows on the left to drop down comments

function* generatorB() {

    /* A. 1st next() ----- console.log(gen0.next('duck'));

    generator() runs until it reaches the yield expression (the 1 in yield 1;)
    yield keyword pauses generator()

    the value of the expression following the yield keyword is returned as the value returned by next() (See B)
    therefore generator() is paused BEFORE evaluating the value of the yield expression 
    */

    /* C. 2nd next() ----- console.log(gen0.next('turkey'));

    generator() starts again
    the value of the first yield expression is computed/replaced with the value of the argument given to next() on this call (See D) 
    */

    console.log('Test 1', yield 1);
    // B. 1st next() ----- returns '{ value: 1, done: false }'
    // D. 2nd next() ----- returns 'Test 1 turkey' 

    // E. 2nd next() continues -----

    console.log('Test 1 Done') // F. 2nd next() ----- returns Test 1 Done

    /* G. 2nd next() continues -----

    execution runs until the second yield
    yield keyword pauses generator()

    next() returns the value of the second yield (See H)
    */

    const value = yield 2; // H. 2nd next() ----- returns '{ value: 2, done: false }'

    /* I. 3rd next() ----- console.log(gen0.next('chicken'));

    generator() starts again
    */

    console.log('Test 2') // J. 3rd next() ----- returns 'Test 2'

    /* K. 3rd next() -----

    the value of the second yield expression is computed/replaced with the value of the argument given to next() on this call (See L) 
    */

    console.log('Test 3', value); // L. 3rd next() ----- returns 'Test 3 chicken'

    // M. 3rd next() continues -----

    console.log('Test 3 Done') // N. 3rd next() ----- returns 'Test 3 Done'

    /* O. 3rd next() ----- Termination of generator()


    execution runs until the end of generator()
    next() returns { value: undefined, done: true } to signal termination

    This probably made more sense to who invented this because the number of calls to next() is one more times the number of yield statements 
    (there's also the last one returning { value: undefined, done: true } to signal termination), 
    so if the argument of the first call would not have been ignored, then argument of the last call would have had to be ignored.
    */

}

const genB = generatorB();

// No log at this step: the first value sent through `next` is lost
console.log(genB.next('duck')); // { value: 1, done: false }

console.log(genB.next('turkey')); // Test 1 turkey / Test 1 Done / { value: 2, done: false }
console.log(genB.next('chicken')); // Test 2 / Test 3 chicken / Test 3 Done { value: undefined, done: true }



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
