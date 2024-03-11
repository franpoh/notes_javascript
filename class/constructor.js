/* 
Table of Contents

> CONSTRUCTOR
> IMPLICIT / EXPLICIT CONSTRUCTOR
> SUPER
>> Calling Super In A Constructor Bound To A Different Prototype
*/



// This is constructor specific to class

// For constructor functions that create new objects, see object.js > Constructor



// ----------------------------- > CONSTRUCTOR -----------------------------

// The constructor method is a special method of a class for creating and initializing an object instance of that class.

// There can only be one special method with the name "constructor" in a class — 
// a SyntaxError is thrown if the class contains more than one occurrence of a constructor method.

// A constructor can use the super keyword to call the constructor of the super class.

// You can create instance properties inside the constructor
// Alternatively, if your instance properties' values do not depend on the constructor's arguments, you can define them as class fields.

// There are some additional syntax restrictions:
// A class method called constructor cannot be a getter, setter, async, or generator.
// A class cannot have more than one constructor method.



// NOTE: See example in class.js > CLASS



// NOTE: A constructor enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.

class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const otto = new Person("Otto");

otto.introduce(); // Hello, my name is Otto



// ----------------------------- > IMPLICIT / EXPLICIT CONSTRUCTOR -----------------------------

// If you don't provide your own constructor, then a default constructor will be supplied for you. 

// If your class is a base class, the default constructor is empty:
// constructor() {}

// If your class is a derived class, the default constructor calls the parent constructor, passing along any arguments that were provided:
// constructor(...args) {
//   super(...args);
// } 

// (Note: The difference between an explicit constructor like the one above and the default constructor is that 
// the latter doesn't actually invoke the array iterator through argument spreading.)

// That enables code like this to work:

class ValidationError extends Error {
    printCustomerMessage() {
        return `Validation failed :-( (details: ${this.message})`;
    }
}

try {
    throw new ValidationError("Not a valid phone number");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.name); // Error 
        console.log(error.printCustomerMessage()); // Validation failed :-( (details: Not a valid phone number)
    } else {
        console.log("Unknown error", error);
        throw error;
    }
}

// The ValidationError class doesn't need an explicit constructor, because it doesn't need to do any custom initialization. 
// The default constructor then takes care of initializing the parent Error from the argument it is given.



// However, if you provide your own constructor, 
// and your class derives from some parent class, 
// then you must explicitly call the parent class constructor using super().

class ValidationError extends Error {
    constructor(message) {
        super(message); // call parent class constructor
        this.name = "ValidationError";
        this.code = "42";
    }

    printCustomerMessage() {
        return `Validation failed :-( (details: ${this.message}, code: ${this.code})`;
    }
}

try {
    throw new ValidationError("Not a valid phone number");
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(error.name); // ValidationError
        console.log(error.printCustomerMessage()); // Validation failed :-( (details: Not a valid phone number, code: 42)
    } else {
        console.log("Unknown error", error);
        throw error;
    }
}



// ----------------------------- > SUPER -----------------------------

// The super keyword is used invoke a superclass's constructor.
// The super(...args) expression is valid in class constructors.

// used to access and call functions on an object's parent



// In the constructor body of a derived class (with extends), 
// the super keyword may appear as a "function call" (super(...args)), 
// which must be called before the this keyword is used, and before the constructor returns. 

// It calls the parent class's constructor and binds the parent class's public fields, 
// after which the derived class's constructor can further access and modify this



class Naam {
    checkNaam = 'Check from Naam.';

    constructor(name) {
        this.name = name;
    }

    get getFirstName() {
        return this.name;
    }
}

class VoorenAchternaam extends Naam {
    checkVoorenAchternaam = 'Check from VoorenAchternaam.';

    constructor(name, surname) {
        super(name); // if you don't add super, you will still inherit all public fields, methods and constructor from prototype
        this.surname = surname; // but 'this' will throw an error. Try commenting out the 'super' line to try
        // if 'super' is commented out: ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    }

    get getFullName() {
        return `${this.name} ${this.surname}`;
    }

    set setFirstName(name) {
        this.name = name;
        return console.log(`First name has been reset to ${this.name}.`);
    }
}

const myName = new VoorenAchternaam('Francine', 'Poh');

console.log(myName);
/* 
VoorenAchternaam {
    checkNaam: 'Check from Naam.',
    name: 'Francine',
    checkVoorenAchternaam: 'Check from VoorenAchternaam',
    surname: 'Poh'
}
*/

console.log(myName.checkNaam); // Check from Naam.
console.log(myName.checkVoorenAchternaam); // Check from VoorenAchternaam.

console.log(myName.getFirstName); // Francine
console.log(myName.getFullName); // Francine Poh

myName.setFirstName = 'Werner'; // First name has been reset to Werner.
console.log(myName.getFullName); // Werner Poh



// ----------------------------- > SUPER >> Calling Methods of Super Class

// The super keyword can also be used to call corresponding methods of super class.

class Cat {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Lion extends Cat {
    speak() {
        super.speak();
        console.log(`${this.name} roars.`);
    }
}

const l = new Lion("Fuzzy");
l.speak();
// Fuzzy makes a noise.
// Fuzzy roars.



// Super-calling static methods

class Rectangle {
    static logNbSides() {
        return 'I have 4 sides';
    }
}

class Square extends Rectangle {
    static logDescription() {
        return super.logNbSides() + ' which are all equal';
    }
}
Square.logDescription(); // 'I have 4 sides which are all equal'



// ----------------------------- > SUPER >> Calling Super In A Constructor Bound To A Different Prototype

// super() calls the constructor that's the prototype of the current class. 
// If you change the prototype of the current class itself, super() will call the constructor that's the new prototype. 
// Changing the prototype of the current class's prototype property doesn't affect which constructor super() calls.

class Polygon {
    constructor() {
        this.name = "Polygon";
    }
}

class Rectangle {
    constructor() {
        this.name = "Rectangle";
    }
}

class Square extends Polygon {
    constructor() {
        super();
    }
}

// Make Square extend Rectangle (which is a base class) instead of Polygon
Object.setPrototypeOf(Square, Rectangle);

const newInstance = new Square();

// newInstance is still an instance of Polygon, because we didn't change the prototype of Square.prototype, 
// so the prototype chain of newInstance is still newInstance --> Square.prototype --> Polygon.prototype
console.log(newInstance instanceof Polygon); // true
console.log(newInstance instanceof Rectangle); // false

// However, because super() calls Rectangle as constructor, the name property of newInstance is initialized with the logic in Rectangle
console.log(newInstance.name); // Rectangle