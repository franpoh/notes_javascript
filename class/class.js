/* 
Table of Contents

> CLASS
> CLASS EXPRESSION AND DECLARATION
> BODY
> PUBLIC
>> This and Super
>> Accessing Fields
>> Adding Fields
> STATIC
>> Initializing
>> This and Super
>> Calling Static Members From Another Static Method
>> Calling Static Members From A Class Constructor And Other Methods
> PRIVATE
>> Private Static
>> Get And Set Private Properties
>> Private Functions
> EXTENDS
> EVALUATION ORDER
*/



// ----------------------------- > CLASS -----------------------------

// a template for creating objects. They encapsulate data with code to work on that data
// Classes in JS are built on prototypes but also have some syntax and semantics that are unique to classes.



// Example as seen in constructor.js

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



// ----------------------------- > CLASS EXPRESSION AND DECLARATION -----------------------------

// Classes are "special functions", 
// and just as you can define function expressions and function declarations, the class syntax has two components: 
// class expressions and class declarations.

// Declaration
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Expression; the class is anonymous but assigned to a variable
const Rectangle = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

// Expression; the class has its own name
const Rectangle = class Rectangle2 {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};

// Like function expressions, class expressions may be anonymous, or have a name that's different from the variable that it's assigned to. 
// However, unlike function declarations, class declarations have the same *temporal dead zone restrictions as let or const and behave as if they are not hoisted.

// * Temporal Dead Zone: the term to describe the state where variables are un-reachable. They are in scope, but they aren't declared.



// ----------------------------- > BODY -----------------------------

// The body of a class is the part that is in curly brackets {}. 
// This is where you define class members, such as methods or constructor.
// The body of a class is executed in strict mode even without the "use strict" directive.



// Class fields are public by default, but private class members can be created by using a hash # prefix.

// Private features have the restriction that all property names declared in the same class must be unique. 
// All other public properties do not have this restriction — you can have multiple public properties with the same name, and the last one overwrites the others. 
// This is the same behavior as in object initializers.



// Public: These members of the class and available to everyone that can access the (owner) class instance.

// Private: These members are only accessible within the class that instantiated the object.

// Protected: This keyword allows a little more access than private members but a lot less than the public. 
// A protected member is accessible within the class (similar to private) and any object that inherits from it. 
// A protected value is shared across all layers of the prototype chain. It is not accessible by anybody else.



// A class element can be characterized by three aspects:
// Kind: Getter, setter, method, or field
// Location: Static or instance
// Visibility: Public or private



// Together, they add up to 16 possible combinations:
// Method definitions: Public instance method
// getter: Public instance getter
// setter: Public instance setter
// Public class fields: Public instance field
// static: Public static method, getter, setter, and field
// Private class features: Everything that's private

// In addition, there are two special class element syntaxes: constructor and static initialization blocks, with their own references.



// Example For Private And Static Uses

class Permission {
    // These are static constants that show what are the possible values when checking permission.
    static OperationsConst = {
        CREATE: "CREATE",
        READ: "READ",
        UPDATE: "UPDATE",
        DELETE: "DELETE"
    }

    static RolesConst = {
        OWNER: "OWNER",
        EDITOR: "EDITOR",
        READER: "READER"
    }

    // private variables
    #role;
    #operation;

    // constructor
    constructor(role, operation) {
        if (this.constructor.name === "Permission") {
            throw new Error("This class cannot be instantiated"); // throwing error example
        }
        this.#role = role;
        this.#operation = operation
    }

    // function
    check() {
        const ops = this.#operation.toUpperCase();

        switch (this.#role.toUpperCase()) {
            case Permission.RolesConst.OWNER:
                return true;
            case Permission.RolesConst.EDITOR:
                if (ops === Permission.OperationsConst.READ || ops === Permission.OperationsConst.CREATE || ops === Permission.OperationsConst.UPDATE) {
                    return true;
                }
                return false;
            case Permission.RolesConst.READER:
                if (ops === Permission.OperationsConst.READ) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

class Document extends Permission {
    #content;
    constructor(role, operation, content) {
        super(role, operation);
        this.#content = content;
    }

    get getContent() {
        return this.#content;
    }

    process() {
        let checkThis = this.check();
        if (checkThis === false) {
            return console.log("Blocked");
        } else if (checkThis === true) {
            return console.log("Allowed, " + this.getContent);
        }
    }
}

// Scenario 1:
const b = new Document(Permission.RolesConst.EDITOR, Permission.OperationsConst.UPDATE, "Hello content")
b.process(); // "Allowed"

// Scenario 2:
const c = new Document(Permission.RolesConst.READER, Permission.OperationsConst.UPDATE, "Hello content")
c.process(); // "Blocked"

// Scenario 3:
const d = new Document(Permission.RolesConst.OWNER, Permission.OperationsConst.DELETE, "Hello content")
d.process(); // "Allowed"



// ----------------------------- > PUBLIC -----------------------------

// Both static and instance public fields are writable, enumerable, and configurable properties. 
// As such, unlike their private counterparts, they participate in prototype inheritance.

// Class fields are similar to object properties, not variables, so we don't use keywords such as const to declare them. 
// In JavaScript, private features use a special identifier syntax, so modifier keywords like public and private should not be used either.

// As seen below, the fields can be declared with or without a default value. 
// Fields without default values default to undefined. 
// By declaring a public field, you can ensure the field is always present, and the class definition is more self-documenting.



// With the class field declaration syntax, the constructor example can be written as:

class Rectangle {
    height = 20;
    width;
    colour = 'blue';
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

const rec = new Rectangle(10, 15);
console.log(rec); // Rectangle { height: 10, width: 15, colour: 'blue' }

rec.width = 5;
console.log(rec); // Rectangle { height: 10, width: 5, colour: 'blue' }

const rec1 = new Rectangle();
console.log(rec1); // Rectangle { height: undefined, width: undefined, colour: 'blue' }



// ----------------------------- > PUBLIC >> This and Super

// In the field initializer, 
// this refers to the class instance under construction, 
// and super refers to the prototype property of the base class, which contains the base class's instance methods, but not its instance fields.

class Base {
    baseField = "base field";
    anotherBaseField = this.baseField;
    baseMethod() {
        return "base method output";
    }
}

class Derived extends Base {
    subField = super.baseMethod();
}

const base = new Base();
const sub = new Derived();

console.log(base.anotherBaseField); // "base field"
console.log(sub.subField); // "base method output"



// The field initializer expression is evaluated each time a new instance is created. 
// (Because the this value is different for each instance, the initializer expression can access instance-specific properties.)

class C {
    obj = {};
}

const instance1 = new C();
const instance2 = new C();
console.log(instance1.obj === instance2.obj); // false



// ----------------------------- > PUBLIC >> Accessing Fields

// Because instance fields of a class are added before the respective constructor runs, 
// you can access the fields' values within the constructor. 

// However, because instance fields of a derived class are defined after super() returns, 
// the base class's constructor does not have access to the derived class's fields.

class Base {
    constructor() {
        console.log("Base constructor:", this.field);
    }
}

class Derived extends Base {
    field = 1;
    constructor() {
        super();
        console.log("Derived constructor:", this.field);
        this.field = 2;
    }
}

const instance = new Derived();
// Base constructor: undefined
// Derived constructor: 1

console.log(instance.field); // 2



// ----------------------------- > PUBLIC >> Adding Fields

// Fields are added one-by-one. 
// Field initializers can refer to field values above it, but not below it. 

// All instance and static methods are added beforehand and can be accessed, 
// although calling them may not behave as expected if they refer to fields below the one being initialized.

class C {
    a = 1;
    b = this.c;
    c = this.a + 1;
    d = this.c + 1;
}

const insta = new C();
console.log(insta.d); // 3
console.log(insta.b); // undefined



// ----------------------------- > STATIC -----------------------------

// The static keyword defines a static method or field for a class, or a static initialization block 
// Static properties (fields and methods) are defined on the class itself instead of each instance.
// Static properties cannot be directly accessed on instances of the class. Instead, they're accessed on the class itself.

// Static methods are often utility functions, such as functions to create or clone objects, 
// whereas static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

class Car {
    constructor(brand) {
        this.carname = brand;
    }
    static hello() {  // static method
        return "Hello!!";
    }
}

mycar = new Car("Ford");

console.log(Car.hello()); // Hello! 
console.log(mycar.hello()); // error, because referencing object rather than class



// The following example demonstrates several things:

// How a static member (method or property) is defined on a class.
// That a class with a static member can be sub-classed.
// How a static member can and cannot be called.

class Triple {
    static customName = 'Tripler';
    static description = 'I triple any number you provide';
    static calculate(n = 1) {
        return n * 3;
    }
}

class SquaredTriple extends Triple {
    static longDescription;
    static description = 'I square the triple of any number you provide';
    static calculate(n) {
        return super.calculate(n) * super.calculate(n);
    }
}

console.log(Triple.description); // 'I triple any number you provide'
console.log(Triple.calculate()); // 3
console.log(Triple.calculate(6)); // 18

const tp = new Triple();

console.log(SquaredTriple.calculate(3)); // 81 (not affected by parent's instantiation)
console.log(SquaredTriple.description); // 'I square the triple of any number you provide'
console.log(SquaredTriple.longDescription); // undefined
console.log(SquaredTriple.customName); // 'Tripler'

// This throws because calculate() is a static member, not an instance member.
console.log(tp.calculate()); // 'tp.calculate is not a function'



// ----------------------------- > STATIC >> Initializing

// Static fields can have an initializer. 
// Static fields without initializers are initialized to undefined. 
// Public static fields are not reinitialized on subclasses, but can be accessed via the prototype chain.

class ClassWithStaticField {
    static staticField;
    static staticFieldWithInitializer = "static field";
}

class SubclassWithStaticField extends ClassWithStaticField {
    static subStaticField = "subclass field";
}

console.log(Object.hasOwn(ClassWithStaticField, "staticField")); // true
console.log(ClassWithStaticField.staticField); // undefined
console.log(ClassWithStaticField.staticFieldWithInitializer); // "static field"
console.log(SubclassWithStaticField.staticFieldWithInitializer); // "static field"
console.log(SubclassWithStaticField.subStaticField); // "subclass field"



// ----------------------------- > STATIC >> This and Super

// In the field initializer, 
// this refers to the current class (which you can also access through its name), 
// and super refers to the base class constructor.

class ClassWithStaticField {
    static baseStaticField = "base static field";
    static anotherBaseStaticField = this.baseStaticField;

    static baseStaticMethod() {
        return "base static method output";
    }
}

class SubClassWithStaticField extends ClassWithStaticField {
    static subStaticField = super.baseStaticMethod();
}

console.log(ClassWithStaticField.anotherBaseStaticField); // "base static field"
console.log(SubClassWithStaticField.subStaticField); // "base static method output"



// ----------------------------- > STATIC >> Calling Static Members From Another Static Method

// In order to call a static method or property within another static method of the same class, you can use the this keyword.

class StaticMethodCall {
    static staticProperty = 'static property';

    static staticMethod() {
        return 'Static method and ' + this.staticProperty + ' has been called';
    }

    static anotherStaticMethod() {
        return this.staticMethod() + ' from another static method';
    }
}

StaticMethodCall.staticMethod(); // 'Static method and static property has been called'
StaticMethodCall.anotherStaticMethod(); // 'Static method and static property has been called from another static method'



// ----------------------------- > STATIC >> Calling Static Members From A Class Constructor And Other Methods

// Static members are not directly accessible using the this keyword from non-static methods. 

// You need to call them using the class name: 
// CLASSNAME.STATIC_METHOD_NAME()
// CLASSNAME.STATIC_PROPERTY_NAME 

// or by calling the method as a property of the constructor: 	
// this.constructor.STATIC_METHOD_NAME()
// this.constructor.STATIC_PROPERTY_NAME

class StaticMethodCall {
    constructor() {
        console.log(StaticMethodCall.staticProperty); // 'static property'
        console.log(this.constructor.staticProperty); // 'static property'
        console.log(StaticMethodCall.staticMethod()); // 'static method has been called.'
        console.log(this.constructor.staticMethod()); // 'static method has been called.'
    }

    static staticProperty = 'static property';
    static staticMethod() {
        return 'static method has been called.';
    }
}



// ----------------------------- > PRIVATE -----------------------------

// Class fields are public by default, but private class members can be created by using a hash # prefix. 
// The privacy encapsulation of these class features is enforced by JavaScript itself.

// NOTE: It's an error to reference private fields from outside of the class; they can only be read or written within the class body. 

// By defining things that are not visible outside of the class, 
// you ensure that your classes' users can't depend on internals, which may change from version to version.

// Private fields can only be declared up-front in a field declaration. 
// They cannot be created later through assigning to them, the way that normal properties can.



// All private identifiers declared within a class must be unique. 
// The namespace is shared between static and instance properties. 
// The only exception is when the two declarations define a getter-setter pair.



// Using private fields, the definition can be refined as below.

class Rectangle {
    #height = 0;
    #width;
    constructor(height, width) {
        this.#height = height;
        this.#width = width;
    }
}

const rec = new Rectangle(10, 15);
console.log(rec); // Rectangle {}



// Private fields are accessible on the class constructor from inside the class declaration itself. 
// They are used for declaration of field names as well as for accessing a field's value.

// It is a syntax error to refer to # names from out of scope. 
// It is also a syntax error to refer to private fields that were not declared before they were called, 
// or to attempt to remove declared fields with delete.

class ClassWithPrivateField {
    #privateField;

    constructor() {
        this.#privateField = 42;
        delete this.#privateField;   // Syntax error
        this.#undeclaredField = 444; // Syntax error
    }
}



// Like public fields, private fields are added at construction time in a base class, or at the point where super() is invoked in a subclass.

class ClassWithPrivateField {
    #privateField;

    constructor() {
        this.#privateField = 42;
    }
}

class SubClass extends ClassWithPrivateField {
    #subPrivateField;

    constructor() {
        super();
        this.#subPrivateField = 23;
    }
}

const subbo = new SubClass(); // SubClass {#privateField: 42, #subPrivateField: 23}
console.log(subbo); // SubClass {}



// ----------------------------- > PRIVATE >> Private Static

// Like their public equivalent, private static methods are called on the class itself, not instances of the class. 
// Like private static fields, they are only accessible from inside the class declaration.

class ClassWithPrivateStaticMethod {
    static #privateStaticMethod() {
        return 42;
    }

    static publicStaticMethod1() {
        return ClassWithPrivateStaticMethod.#privateStaticMethod();
    }

    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

console.log(ClassWithPrivateStaticMethod.publicStaticMethod1() === 42); // true
console.log(ClassWithPrivateStaticMethod.publicStaticMethod2() === 42); // true



// The same restriction previously mentioned for private static fields holds for private static methods, and similarly can lead to unexpected behavior when using this. 
// when we try to call Derived.publicStaticMethod2(), this refers to the Derived class (not the Base class) and so causes a TypeError.

class Base {
    static #privateStaticMethod() {
        return 42;
    }
    static publicStaticMethod1() {
        return Base.#privateStaticMethod();
    }
    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

class Derived extends Base { }

console.log(Derived.publicStaticMethod1()); // 42
console.log(Derived.publicStaticMethod2()); // TypeError: Cannot read private member #privateStaticMethod from an object whose class did not declare it



// ----------------------------- > PRIVATE >> Get And Set Private Properties

class Person {
    #firstName; // set private property

    constructor(firstName) {
        this.#firstName = firstName; // set value of private property
    }

    setfirstName(name) { // method
        this.#firstName = name;
    }

    getfirstName() { // method
        return this.#firstName;
    }

    set setName(name) { // function
        this.#firstName = name;
    }

    get getName() { // function
        return this.#firstName;
    }
}

const newPerson = new Person("Francine");

console.log(newPerson); // Person {}

// methods that emulates get and set
console.log(newPerson.getfirstName()); // Francine

newPerson.setfirstName("Werner");
console.log(newPerson.getfirstName()); // Werner

newPerson.setfirstName("Francine"); // resetting for the below functions

// get and set functions
console.log(newPerson.getName); // Francine

newPerson.setName = "Werner";
console.log(newPerson.getName); // Werner



// // ----------------------------- > PRIVATE >> Private Functions

class PaymentGateway {
    #connectToBank() {
        console.log("Connecting to Bank...");
    }

    #verifyCardDetails() {
        console.log("Verifying Card Details...");
    }

    #processPayment() {
        console.log("Processing Payment...");
    }

    pay() {
        this.#connectToBank();
        this.#verifyCardDetails();
        this.#processPayment();
        console.log("Transaction Complete!");
    }
}

const newPayment = new PaymentGateway();

newPayment.pay();
// Connecting to Bank...
// Verifying Card Details...
// Processing Payment...
// Transaction Complete!



// ----------------------------- > EXTENDS -----------------------------

// The extends keyword is used in class declarations or class expressions to create a class as a child of another constructor (either a class or a function).

// indicates that a class is inherited from another class

// Does not inherit private properties



// Example

// Create a class named "Model" which will inherit the methods from the "Car" class

class Car {
    constructor(brand) {
        this.carname = brand;
    }
    present() {
        return 'I have a ' + this.carname;
    }
}

class Model extends Car {
    constructor(brand, mod) {
        super(brand);
        this.model = mod; // Referring to this before calling super() will throw an error.
    }
    show() {
        return this.present() + ', it is a ' + this.model;
    }
}

let mycar = new Model("Ford", "Mustang");
document.getElementById("demo").innerHTML = mycar.show(); // I have a Ford, it is a Mustang



// Example

class Vehicle {
    constructor(carPlateNo, type, noOfWheels = 4) {
        this.carPlateNo = carPlateNo;
        this.type = type;
        this.noOfWheels = noOfWheels;
    }

    inspect() {
        return `This vehicle is a ${this.type} (${this.carPlateNo}) and it has ${this.noOfWheels} wheels.`;
    }
}

class Truck extends Vehicle {
    constructor(carPlateNo, type, noOfWheels = 4, weightInKg) {
        // super must include all the properties being brought over from parent
        super(carPlateNo, type, noOfWheels = 4); // inserting default value here is optional, but...
        this.weightInKg = weightInKg; // additional properties are inserted after super
    }

    about() {
        return this.inspect() + ` It weighs ${this.weightInKg}kg.`
    }
}

class Car extends Vehicle {
    constructor(carPlateNo, type, noOfWheels = 3) { // default value here overrides parent default value
        super(carPlateNo, type, noOfWheels);
    }
}

// ... this will only work if the default value is inserted there. Which may not be correct?
const newTruck = new Truck("PG-86-HT", "Toyota Hilux", this, 100);
console.log(newTruck.about());
// This vehicle is a Toyota Hilux (PG-86-HT) and it has 4 wheels. It weighs 100kg.

const reliantRobin = new Car("83AN", "Reliant Robin")
console.log(reliantRobin.inspect()); // This vehicle is a Reliant Robin (83AN) and it has 3 wheels.



// Example

class BaseSignal {
    constructor(transmitter) {
        if (this.constructor.name === "BaseSignal") { // new BaseSignal()
            throw new Error("This class cannot be instantiated"); // throwing error example
        }
        this.transmitter = transmitter;
    }
    send() {
        console.log(`Send ${this.transmitter} signal.`);
    }
}

class TVSignal extends BaseSignal {
    constructor(transmitter) {
        super(transmitter);
    }
    send() {
        if (this.transmitter.toUpperCase() !== 'TV') {
            throw new Error("This is not a TV");
        }
        console.log(`Send tv signal.`);
    }
}

class AirconSignal extends BaseSignal {
    constructor(transmitter) {
        super(transmitter);
    }
    send() {
        if (this.transmitter.toUpperCase() !== 'AIRCON') {
            throw new Error("This is not an Aircon");
        }
        console.log(`Send aircon signal.`);
    }
}

class DoorSignal extends BaseSignal {
    constructor(transmitter) {
        super(transmitter);
    }
    send() {
        if (this.transmitter.toUpperCase() !== 'DOOR') {
            throw new Error("This is not a Door");
        }
        console.log(`Send door signal.`);
    }
}

const signalOne = new TVSignal('tv');
signalOne.send(); // "Send tv signal"

const signalTwo = new AirconSignal('aircon');
signalTwo.send(); // "Send aircon signal"

const signalThree = new DoorSignal('door');
signalThree.send(); // "Send door signal"



// ----------------------------- > EVALUATION ORDER -----------------------------

// When a class declaration or class expression is evaluated, its various components are evaluated in the following order:

// The extends clause, if present, is first evaluated. 
// It must evaluate to a valid constructor function or null, or a TypeError is thrown.

// The constructor method is extracted, substituted with a default implementation if constructor is not present. 
// However, because the constructor definition is only a method definition, this step is not observable.

// The class elements' property keys are evaluated in the order of declaration. 
// If the property key is computed, the computed expression is evaluated, with the this value is set to the this value surrounding the class (not the class itself). 
// None of the property values are evaluated yet.

// Methods and accessors are installed in the order of declaration. 
// Instance methods and accessors are installed on the prototype property of the current class, 
// and static methods and accessors are installed on the class itself. 
// Private instance methods and accessors are saved to be installed on the instance directly later. 
// This step is not observable.

// The class is now initialized with the prototype specified by extends and implementation specified by constructor. 
// For all steps above, if an evaluated expression tries to access the name of the class, a ReferenceError is thrown because the class is not initialized yet.



// The class elements' values are evaluated in the order of declaration:

// For each instance field (public or private), its initializer expression is saved. 
// The initializer is evaluated during instance creation, at the start of the constructor (for base classes) or immediately before the super() call returns (for derived classes).

// For each static field (public or private), 
// its initializer is evaluated with this set to the class itself, and the property is created on the class.

// Static initialization blocks are evaluated with this set to the class itself.



// The class is now fully initialized and can be used as a constructor function.