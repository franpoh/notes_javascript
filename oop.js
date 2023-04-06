// Table of Contents

// > BASICS
// > USES
// > HOW TO OOP
// > STRUCTURE OF OBJECT-ORIENTED PROGRAMMING
// > MAIN PRINCIPLES OF OOP
// >> Inheritance
// >> Encapsulation
// >> Abstraction
// >> Polymorphism
// > BENEFITS OF OOP
// > CRITICISM OF OOP



// ----------------------------- > BASICS

// Object-oriented programming is about modeling a system as a collection of objects, 
// where each object represents some particular aspect of the system. 

// Objects contain both functions (or methods) and data. 
// An object provides a public interface to other code that wants to use it but maintains its own private, internal state; 
// other parts of the system don't have to care about what is going on inside the object.



// Procedural Programming
// Procedural programming is about writing procedures or methods that perform operations on the data

let baseSalary = 30_000;
let overtime = 10;
let rate = 20;

function getWage(baseSalary, overtime, rate) { // procedural programming can end up with lots of parameters
    return baseSalary + (overtime * rate);
}



// OOP
// object-oriented programming is about creating objects that contain both data and methods

let employee = {

    // all parameters are modelled as properties of this object
    baseSalary: 30_000,
    overtime: 10,
    rate: 20,

    getWage: function () { // no parameters
        return this.baseSalary + (this.overtime * this.rate);
    }
}

employee.getWage();

// the less parameters, the less maintenance the function needs



// ----------------------------- > USES -----------------------------

// OOP focuses on the objects that developers want to manipulate rather than the logic required to manipulate them. 
// This approach to programming is well-suited for programs that are large, complex and actively updated or maintained. 

// also makes the method beneficial to collaborative development



// ----------------------------- > HOW TO OOP -----------------------------

// The first step in OOP is to collect all of the objects a programmer wants to manipulate and identify how they relate to each other -- an exercise known as data modeling.
// Objects can range from physical entities, such as a human being who is described by properties like name and address, to small computer programs, such as widgets.

// Once an object is known, it is labeled with a class of objects that defines the kind of data it contains and any logic sequences that can manipulate it. 
// Each distinct logic sequence is known as a method. 
// Objects can communicate with well-defined interfaces called messages.



// ----------------------------- > STRUCTURE OF OBJECT-ORIENTED PROGRAMMING -----------------------------

// Classes 
// are user-defined data types that act as the blueprint for individual objects, attributes and methods.

// Objects 
// instances of a class created with specifically defined data. 

// Methods 
// functions that are defined inside a class that describe the behaviors of an object. 

// Attributes 
// defined in the class template and represent the state of an object. 
// Objects will have data stored in the attributes field. 
// Class attributes belong to the class itself.



// ----------------------------- > MAIN PRINCIPLES OF OOP -----------------------------

// Starting with a simple example of a class declaration
class Person {

    name;

    // a constructor that takes a name parameter that is used to initialize the new object's name property
    constructor(name) {
        this.name = name;
    }

    introduceSelf() {
        console.log(`Hi! I'm ${this.name}`);
    }

}



// ----------------------------- > MAIN PRINCIPLES OF OOP >> Inheritance

// main advantage of inheritance is reusability. 
// When a child class inherits from parent class we don't need to write the same code again

// forces a more thorough data analysis, reduces development time and ensures a higher level of accuracy.



// Inheritance with extends
class Professor extends Person {

    teaches;

    constructor(name, teaches) {
        super(name);
        this.teaches = teaches;
    }

    introduceSelf() {
        console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);
    }

    grade(paper) {
        const grade = Math.floor(Math.random() * (5 - 1) + 1);
        console.log(grade);
    }

}



// ----------------------------- > MAIN PRINCIPLES OF OOP >> Encapsulation

// binding the data and methods into a single unit to protect it from outside access

// This characteristic of data hiding provides greater program security and avoids unintended data corruption.

// In the context of class, some properties are not directly accessed from outside of the class. You need to call the responsible method for the properties.
// It's like creating a getter/setter method for the private properties we declare in a class.



class Student extends Person {

    // # makes a data property private
    // You can have private methods as well as private data properties
    #year;

    constructor(name, year) {
        super(name);
        this.#year = year;
    }


    introduceSelf() {
        console.log(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
    }

    canStudyArchery() {
        return this.#year > 1;
    }

}

summers.year; // SyntaxError



// ----------------------------- > MAIN PRINCIPLES OF OOP >> Abstraction

// Abstraction is one step ahead of encapsulation. 
// Abstraction is defined as showing only the essential things and hiding the inner implementation.



// ----------------------------- > MAIN PRINCIPLES OF OOP >> Polymorphism

// Polymorphism means 'more than one form'

// Objects are designed to share behaviors and they can take on more than one form.
// The program will determine which meaning or usage is necessary for each execution of that object from a parent class, reducing the need to duplicate code.
// allows different types of objects to pass through the same interface.



// You might notice that introduceSelf() is defined in all three classes. 
// The reason for this is that while all people want to introduce themselves, the way they do so is different:

walsh = new Professor("Walsh", "Psychology");
walsh.introduceSelf(); // 'My name is Professor Walsh and I will be your Psychology professor.'

summers = new Student("Summers", 1);
summers.introduceSelf(); // 'My name is Summers and I'm in the first year.'

// We might have a default implementation of introduceSelf() for people who aren't students or professors:

pratt = new Person("Pratt");
pratt.introduceSelf(); // 'My name is Pratt.'

// This feature - when a method has the same name but a different implementation in different classes - is called polymorphism.
// When a method in a subclass replaces the superclass's implementation, we say that the subclass overrides the version in the superclass.



// ----------------------------- > BENEFITS OF OOP -----------------------------

// Modularity. Encapsulation enables objects to be self-contained, making troubleshooting and collaborative development easier.

// Reusability. Code can be reused through inheritance, meaning a team does not have to write the same code multiple times.

// Productivity. Programmers can construct new programs quicker through the use of multiple libraries and reusable code.

// Easily upgradable and scalable. Programmers can implement system functionalities independently.

// Interface descriptions. Descriptions of external systems are simple, due to message passing techniques that are used for objects communication.

// Security. Using encapsulation and abstraction, complex code is hidden, software maintenance is easier and internet protocols are protected.

// Flexibility. Polymorphism enables a single function to adapt to the class it is placed in. Different objects can also pass through the same interface.



// ----------------------------- > CRITICISM OF OOP -----------------------------

// The object-oriented programming model has been criticized by developers for multiple reasons.

// The largest concern is that OOP overemphasises the data component of software development and does not focus enough on computation or algorithms.
// Additionally, OOP code may be more complicated to write and take longer to compile.