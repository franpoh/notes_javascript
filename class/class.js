/* 
Table of Contents
*/



// ----------------------------- > CLASS -----------------------------

// a template for creating objects. They encapsulate data with code to work on that data
// Classes in JS are built on prototypes but also have some syntax and semantics that are unique to classes.



// ----------------------------- > CLASS >> Class Expression and Declaration

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



// ----------------------------- > CLASS >> Body

// The body of a class is the part that is in curly brackets {}. This is where you define class members, such as methods or constructor.

// The body of a class is executed in strict mode even without the "use strict" directive.



// A class element can be characterized by three aspects:
// Kind: Getter, setter, method, or field
// Location: Static or instance
// Visibility: Public or private



// Together, they add up to 16 possible combinations. 

// Method definitions: Public instance method

// getter: Public instance getter

// setter: Public instance setter

// Public class fields: Public instance field

// static: Public static method, getter, setter, and field

// Private class features: Everything that's private



// Note: Private features have the restriction that all property names declared in the same class must be unique. 
// All other public properties do not have this restriction — you can have multiple public properties with the same name, and the last one overwrites the others. 
// This is the same behavior as in object initializers.

// In addition, there are two special class element syntaxes: constructor and static initialization blocks, with their own references.




// Example for private and static uses

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

Syntax

class ClassName {
    constructor() { /* ... */ }
}

Example

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

// When you have a class, you can use the class to create objects

let myCar1 = new Car("Ford", 2014);
let myCar2 = new Car("Audi", 2019);

// uses the Car class to create two Car objects. Constructor method is called automatically when a new object is created.

// Class declarations

// One way to define a class is using a class declaration. To declare a class, you use the class keyword with the name of the class ("Rectangle" here).
// function declarations are hoisted and class declarations are not hoisted. 

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Class expressions

// A class expression is another way to define a class. Class expressions can be named or unnamed. The name given to a named class expression is local to the class's body. However, it can be accessed via the name property.

// unnamed

let Rectangle = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
console.log(Rectangle.name); // output: "Rectangle"

// named

let Rectangle = class Rectangle2 {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
};
console.log(Rectangle.name); // output: "Rectangle2"

// static 

// defines a static method or property for a class and not any one object
// Normally objects created from the class do not have access to the static stuff
// Neither static methods nor static properties can be called on instances of the class. Instead, they're called on the class itself
// Static methods are often utility functions, such as functions to create or clone objects
// static properties are useful for caches, fixed-configuration, or any other data you don't need to be replicated across instances.

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

// Syntax

// static methodName() { ... }
// static propertyName [= value];

// Class static initialization block
// static {
// }

// Using static members in classes
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

// Calling static members from another static method

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

StaticMethodCall.anotherStaticMethod();
// 'Static method and static property has been called from another static method'

// Calling static members from a class constructor and other methods

// Static members are not directly accessible using the this keyword from non-static methods. You need to call them using the class name: 
// CLASSNAME.STATIC_METHOD_NAME()
// CLASSNAME.STATIC_PROPERTY_NAME 
// or by calling the method as a property of the constructor: 	this.constructor.STATIC_METHOD_NAME()
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

// Constructor

// a special method of a class for creating and initializing an object instance of that class.

class Dog {
    constructor(name, breed, origin, hobby = "singing") { // default values can be added here
        this.name = name;
        this.breed = breed;
        this.origin = origin;
        this.hobby = hobby;
    }
    about() {
        console.log(`My name is ${this.name} and I am a ${this.breed}. I am from ${this.origin} and my hobby is ${this.hobby}.`);
    }
}

const dog1 = new Dog("Meeko", "Irish Wolfhound", "Skyrim", "barking");
const dog2 = new Dog("K.K. Slider", "Singer", "Animal Crossing");

dog1.about();
// My name is Meeko and I am a Irish Wolfhound. I am from Skyrim and my hobby is barking.
dog2.about();
// My name is K.K. Slider and I am a Singer. I am from Animal Crossing and my hobby is singing.

// Another example

let newDate = new Date();
let thisYear = newDate.getFullYear();

class MedicalRecord {

    noOfVisit = 0;
    inClinic = false;

    constructor(firstName, lastName, yearOfBirth, allergy = null, noOfVisit = 0, inClinic = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.allergy = allergy;
        this.noOfVisit = noOfVisit;
        this.inClinic = inClinic;
    }

    checkOut() {
        this.noOfVisit++;
        this.inClinic = false;
    }

    checkIn() {
        this.inClinic = true;
    }

    isAdult() {
        const age = thisYear - this.yearOfBirth;
        if (age > 21) {
            return "is an Adult";
        } else {
            return "is not an Adult";
        }
    }

    about() {
        console.log(`The patient's name is ${this.firstName} ${this.lastName}. The year of birth is ${this.yearOfBirth}. Their allergy(s) is ${this.allergy}. The patient ${this.isAdult()}. They have visited the clinic ${this.noOfVisit} times and their check in status is ${this.inClinic}.`);
    }
}

const patientOne = new MedicalRecord("Francine", "Poh", 1990, "Hay Fever");

patientOne.checkIn();
patientOne.checkOut();

patientOne.about();

// enables you to provide any custom initialization that must be done before any other methods can be called on an instantiated object.

class user {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName – lastName;
        this.getName = function () {
            return `User’s name: ${this.firstName} ${this.lastName}`;
        }
    }
}

const userProfile01 = new User(“Francine”, “Poh”);
console.log(userProfile01); // User {firstName: “Francine”, lastName: “Poh”}
console.log(userProfile01.getName()); // User’s name: Francine Poh

example

class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const otto = new Person('Otto');
otto.introduce(); // “Hello, my name is Otto”

// If your class is a derived class, the default constructor calls the parent constructor, passing along any arguments that were provided

// Class types

// Public: These members of the class and available to everyone that can access the (owner) class instance.

// Private: These members are only accessible within the class that instantiated the object.

// Protected: This keyword allows a little more access than private members but a lot less than the public. A protected member is accessible within the class (similar to private) and any object that inherits from it. A protected value is shared across all layers of the prototype chain. It is not accessible by anybody else.

// Private class features

// Class fields are public by default, but private class members can be created by using a hash # prefix.

// Example, with how to get and set private properties

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

console.log(newPerson.firstName); // undefined

// methods that get and set
console.log(newPerson.getfirstName()); // Francine
newPerson.setfirstName("Werner");
console.log(newPerson.getfirstName()); // Werner

// get and set functions
console.log(newPerson.getName); // Francine
newPerson.setName = "Werner";
console.log(newPerson.getName); // Werner

// Another example with private functions

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

Syntax

class ClassWithPrivateField {
    #privateField;
}

class ClassWithPrivateMethod {
    #privateMethod() {
        return 'hello world';
    }
}

class ClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD;
}

class ClassWithPrivateStaticMethod {
    static #privateStaticMethod() {
        return 'hello world';
    }
}

// Private instance fields

// Private instance fields are declared with # names (pronounced "hash names"), 
// identifiers prefixed with #. 
// The # is a part of the name itself. 
// Private fields are accessible on the class constructor from inside the class declaration itself. 
// They are used for declaration of field names as well as for accessing a field's value.

// It is a syntax error to refer to # names from out of scope. 
// It is also a syntax error to refer to private fields that were not declared before they were called, or to attempt to remove declared fields with delete.

class ClassWithPrivateField {
    #privateField;

    constructor() {
        this.#privateField = 42;
        delete this.#privateField;   // Syntax error
        this.#undeclaredField = 444; // Syntax error
    }
}

const instance = new ClassWithPrivateField()
instance.#privateField === 42;   // Syntax error

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

new SubClass(); // SubClass {#privateField: 42, #subPrivateField: 23}

// Private static fields

// Private static fields are added to the class constructor at class evaluation time. The limitation of static variables being called by only static methods still holds.

class ClassWithPrivateStaticField {
    static #PRIVATE_STATIC_FIELD;

    static publicStaticMethod() {
        ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD = 42;
        return ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD;
    }
}

console.log(ClassWithPrivateStaticField.publicStaticMethod() === 42);
// true

// Private methods

// Private instance methods - methods available on class instances whose access is restricted in the same manner as private instance fields.

class ClassWithPrivateMethod {
    #privateMethod() {
        return 'hello world';
    }

    getPrivateMessage() {
        return this.#privateMethod();
    }
}

const instance = new ClassWithPrivateMethod();
console.log(instance.getPrivateMessage()); // hello world

// Private instance methods may be generator, async, or async generator functions. Private getters and setters are also possible, although not in generator, async, or async generator forms.

// Private static methods

// Like their public equivalent, private static methods are called on the class itself, not instances of the class. Like private static fields, they are only accessible from inside the class declaration.

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

// extends - used in class declarations or class expressions to create a class that is a child of another class.
// indicates that a class is inherited from another class
// Does not inherit private properties

// example of extends and super

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

// Another example

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

// Syntax

class ChildClass extends ParentClass { // ... }

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
}

// Super - used to access and call functions on an object's parent
// When used in a constructor, the super keyword appears alone and must be used before the this keyword is used. 
// can also be used to call functions on a parent object.
// Deleting super properties will throw an error
// super.prop cannot overwrite non-writable properties

// Syntax

super([arguments]); // calls the parent constructor.
super.functionOnParent([arguments]);

// Using super in classes

// Here super() is called to avoid duplicating the constructor parts' that are common between Rectangle and Square.

class Rectangle {
    constructor(height, width) {
        this.name = 'Rectangle';
        this.height = height;
        this.width = width;
    }
    sayName() {
        console.log('Hi, I am a ', this.name + '.');
    }
    get area() {
        return this.height * this.width;
    }
    set area(value) {
        this._area = value;
    }
}

class Square extends Rectangle {
    constructor(length) {
        this.height; // ReferenceError, super needs to be called first!

        // Here, it calls the parent class's constructor with lengths provided for the Rectangle's width and height
        super(length, length);

        // Note: In derived classes, super() must be called before you can use 'this'. Leaving this out will cause a reference error.
        this.name = 'Square';
    }
}

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

// Using super.prop in object literals

var obj1 = {
    method1() {
        console.log('method 1');
    }
}

var obj2 = {
    method2() {
        super.method1(); // calls the first object's method
    }
}

// we are able to set the prototype of obj2 to obj1 with Object.setPrototypeOf(), so that super is able to find method1 on obj1.
Object.setPrototypeOf(obj2, obj1);
obj2.method2(); // logs "method 1"

// Call - calls a function with a given this value and arguments provided individually.
// allows for a function/method belonging to one object to be assigned and called for a different object.
// call() provides a new value of this to the function/method. With call(), you can write a method once and then inherit it in another object, without having to rewrite the method for the new object.

// Note: While the syntax of this function is almost identical to that of apply(), the fundamental difference is that call() accepts an argument list, while apply() accepts a single array of arguments.

// Syntax 

call()
call(thisArg)
call(thisArg, arg1)
call(thisArg, arg1, arg2)
call(thisArg, arg1, //...// , argN)

    // Using call to chain constructors for an object

    // chain constructors for an object
    // the constructor for the Product object is defined with two parameters: name and price.
    // Two other functions, Food and Toy, invoke Product, passing this, name, and price. 
    // Product initializes the properties name and price, both specialized functions define the category.

    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

function Food(name, price) {
        Product.call(this, name, price);
        this.category = 'food';
    }

function Toy(name, price) {
        Product.call(this, name, price);
        this.category = 'toy';
    }

const cheese = new Food('feta', 5);
const fun = new Toy('robot', 40);

console.log(cheese); // Food {name: 'feta', price: 5, category: 'food'}

console.log(fun); // Toy {name: 'robot', price: 40, category: 'toy'}

// Using call to invoke an anonymous function

// create an anonymous function and use call to invoke it on every object in an array.
// add a print function to every object, which is able to print the correct index of the object in the array.

const animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Fail' }
];

for (let i = 0; i < animals.length; i++) {
    (function (i) {
        this.print = function () {
            console.log(`#i ${this.species}: ${this.name}`);
        }
        this.print();
    }).call(animals[i], i); // first is array position, second is the # number
}

// #0 Lion: King
// #1 Whale: Fail

// Using call to invoke a function and without specifying the first argument

// invoking the display function without passing the first argument will bind the value of this to the global object.

var sData = 'Wisen';

function display() {
    console.log(this.sData);
}

display.call();  // Wisen

// Example with Call, Bind and Apply

// A simplistic object with its very own "this".
var obj = {
    num: 100
}

// A simple traditional function to operate on "this"
var add = function (a, b, c) {
    return this.num + a + b + c;
}

// call
var result = add.call(obj, 1, 2, 3) // establishing the scope as "obj"
console.log(result) // result 106

// apply
const arr = [1, 2, 3]
var result = add.apply(obj, arr) // establishing the scope as "obj"
console.log(result) // result 106

// bind
var result = add.bind(obj) // establishing the scope as "obj"
console.log(result(1, 2, 3)) // result 106

// Apply - calls a function with a given this value, and arguments provided as an array (or an array-like object).

Syntax

apply(thisArg)
apply(thisArg, argsArray)

example

const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max); // expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min); // expected output: 2

// thisArg - The value of this provided for the call to func.
// You use an arguments array instead of a list of arguments (parameters). 
// can use an array literal eg func.apply(this, ['eat', 'bananas'])
// an Array object eg func.apply(this, new Array('eat', 'bananas')).

// ArgsArray - An array-like object, specifying the arguments with which func should be called, or null or undefined if no arguments should be provided to the function.
// can also use arguments

// arguments is a local variable of a function.
// can be used for all unspecified arguments of the called object.
// do not have to know the arguments of the called object when you use the apply method.
// can use arguments to pass all the arguments to the called object.
// called object is then responsible for handling the arguments.

// Using apply to append an array to another

// When you don’t want to use:
// Push - add that array as a single element, instead of adding the elements individually. So you end up with an array inside an array.
// Concat - does not append to the existing array—it instead creates and returns a new array.

// For appending to the existing array

const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

// Bind - creates a new bound function, which is an exotic function object that wraps the original function object. Calling the bound function generally results in the execution of its wrapped function.

Syntax

bind(thisArg)
bind(thisArg, arg1)
bind(thisArg, arg1, arg2)
bind(thisArg, arg1, ..., argN)

// thisArg - The value to be passed as the this parameter to the target function func when the bound function is called. 
// The value is ignored if the bound function is constructed using the new operator. 
// When using bind to create a function (supplied as a callback) inside a setTimeout, any primitive value passed as thisArg is converted to object. I
// f no arguments are provided to bind , or if the thisArg is null or undefined, the this of the executing scope is treated as the thisArg for the new function.

// arg1, arg2, ...argN - Arguments to prepend to arguments provided to the bound function when invoking func.

// Creating a bound function

// The simplest use of bind() is to make a function that, no matter how it is called, is called with a particular this value.

// A common mistake is to extract a method from an object, then to later call that function and expect it to use the original object as its this (e.g., by using the method in callback-based code).

// Without special care, however, the original object is usually lost. Creating a bound function from the function, using the original object, neatly solves this problem:

this.x = 9; // 'this' refers to global 'window' object here in a browser

const module = {
    x: 81,
    getX: function () { return this.x; }
};

module.getX(); // returns 81

const retrieveX = module.getX;
retrieveX(); // returns 9; the function gets invoked at the global scope

// Create a new function with 'this' bound to module 
// New programmers might confuse the global variable 'x' with module's property 'x'

const boundGetX = retrieveX.bind(module);
boundGetX(); // returns 81

// another example

class Car {
    constructor() {
        // Bind sayBye but not sayHi to show the difference
        this.sayBye = this.sayBye.bind(this);
    }
    sayHi() {
        console.log(`Hello from ${this.name}`);
    }
    sayBye() {
        console.log(`Bye from ${this.name}`);
    }
    get name() {
        return 'Ferrari';
    }
}

class Bird {
    get name() {
        return 'Tweety';
    }
}

const car = new Car();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
car.sayHi(); // Hello from Ferrari
bird.sayHi = car.sayHi;
bird.sayHi(); // Hello from Tweety

// For bound methods, 'this' doesn't depend on the caller
bird.sayBye = car.sayBye;
bird.sayBye();  // Bye from Ferrari