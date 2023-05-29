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

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}



// ----- Example as seen in class.js

// A base class is defined using the new reserved 'class' keyword
class Polygon {
    // ..and an (optional) custom class constructor. 
    // If one is not supplied, a default constructor is used instead:
    // constructor() { }
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }

    sayName() {
        console.log('Hi, I am a ', this.name + '.');
    }

    sayHistory() {
        console.log('"Polygon" is derived from the Greek polus (many) ' +
            'and gonia (angle).');
    }
}

let p = new Polygon(300, 400);
p.sayName(); // Hi, I am a  Polygon.
console.log('The width of this polygon is ' + p.width); // The width of this polygon is 400

// Classes support extending other classes, but can also extend other objects. 
// Whatever you extend must be a constructor.

// Let's extend the Polygon class to create a new derived class called Square.
class Square extends Polygon {
    constructor(length) {
        // The reserved 'super' keyword is for making super-constructor calls and allows access to parent methods.
        // Here, it will call the parent class' constructor with lengths provided for the Polygon's width and height
        super(length, length);
        // Note: In derived classes, super() must be called before you can use 'this'. Leaving this out will cause a reference error.
        this.name = 'Square';
    }

    // Getter/setter methods are supported in classes,
    // similar to their ES5 equivalents
    get area() {
        return this.height * this.width;
    }

    set area(value) {
        this.area = value;
    }
}

let s = new Square(5);

s.sayName(); // Hi, I am a  Square.
console.log('The area of this square is ' + s.area); // The area of this square is 25



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



class Foo {
    constructor(name) {
        this.name = name;
    }

    getNameSeparator() {
        return '-';
    }
}

class FooBar extends Foo {
    constructor(name, index) {
        super(name);
        this.index = index;
    }

    getFullName() {
        return this.name + super.getNameSeparator() + this.index;
    }
}

const firstFooBar = new FooBar('foo', 1);

console.log(firstFooBar.name); // foo

console.log(firstFooBar.getFullName()); // foo-1



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

