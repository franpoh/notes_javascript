/* 
Table of Contents

> CONSTRUCTORS
>> Super
> CLASS
>> Derived Classes
>> Bound Methods In Classes
*/



// ----------------------------- > CONSTRUCTORS -----------------------------

// this is referring to the instantiated object

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

let myCar1 = new Car("Ford", 2014); // object instantiation 



// When a function is used as a constructor (with the new keyword), 
// its this is bound to the new object being constructed, no matter which object the constructor function is accessed on

function C() {
    this.a = 37;
}

var o = new C();
console.log(o.a); // 37

function C2() {
    this.a = 37;
    return { a: 38 };
}

o = new C2();
console.log(o.a); // 38

// In the last example (C2), because an object was returned during construction, the new object that this was bound to gets discarded. 
// This essentially makes the statement "this.a = 37;" dead code. 
// It's not exactly dead because it gets executed, but it can be eliminated with no outside effects.



// ----------------------------- > CONSTRUCTORS >> Super

// When a function is invoked in the super.method() form, 
// the this inside the method function is the same value as the this value around the super.method() call, 
// and is generally not equal to the object that super refers to. 

// This is because super.method is not an object member access like the ones above — 
// it's a special syntax with different binding rules. For examples, see the super reference.



// When calling super.prop as a function, the this value inside the prop function is the current this, not the object that super points to. 
// For example, the super.getName() call logs "Extended", despite the code looking like it's equivalent to Base.getName().

class Base {
    static getName() {
        console.log(this.name);
    }
}

class Extended extends Base {
    static getName() {
        super.getName();
    }
}

Extended.getName(); // Logs "Extended"  



// ----------------------------- > CLASS -----------------------------

// A class can be split into two contexts: static and instance. 

// Constructors, methods, and instance field initializers (public or private) belong to the instance context. 
// Static methods, static field initializers, and static initialization blocks belong to the static context. The this value is different in each context.



// The behavior of this in classes and functions is similar, since classes are functions under the hood. But there are some differences and caveats.

// Within a class constructor, this is a regular object. 
// All non-static methods within the class are added to the prototype of this

// Static methods are not properties of this. They are properties of the class itself.

class Example {
    constructor() {
        const proto = Object.getPrototypeOf(this);
        console.log(Object.getOwnPropertyNames(proto));
    }
    first() { }
    second() { }
    static third() { }
}

new Example(); // ['constructor', 'first', 'second']



// Field initializers are also evaluated in the context of the class. 
// Instance fields are evaluated with this set to the instance being constructed. 
// Static fields are evaluated with this set to the current class. 
// This is why arrow functions in field initializers are bound to the class.

class C {
    instanceField = this;
    static staticField = this;
}

const c = new C();
console.log(c.instanceField === c); // true
console.log(C.staticField === C); // true



// ----------------------------- > CLASS >> Derived Classes

// Unlike base class constructors, derived constructors have no initial this binding. 
// Calling super() creates a this binding within the constructor and essentially has the effect of evaluating the following line of code, where Base is the base class:

this = new Base();



// Warning: Referring to this before calling super() will throw an error.

// Derived classes must not return before calling super(), 
// unless the constructor returns an object (so the this value is overridden) or the class has no constructor at all.

class Base { }

class Good extends Base { }

class AlsoGood extends Base {
    constructor() {
        return { a: 5 };
    }
}

class Bad extends Base {
    constructor() { }
}

new Good(); // No constructor, therefore good
new AlsoGood(); // returns an object, overriding the 'this' value, therefore good
new Bad(); // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor



// ----------------------------- > CLASS >> Bound Methods In Classes

// Just like with regular functions, the value of this within methods depends on how they are called. 
// Sometimes it is useful to override this behavior so that this within classes always refers to the class instance. 
// To achieve this, bind the class methods in the constructor:

class Cat {

    constructor() {
        this.sayBye = this.sayBye.bind(this); // Bind sayBye but not sayHi to show the difference
    }

    sayHi() {
        console.log(`Hello from ${this.name}`);
    }

    sayBye() {
        console.log(`Bye from ${this.name}`);
    }

    get name() {
        return "Cat";
    }
}

class Bird {
    get name() {
        return "Bird";
    }
}

const cat = new Cat();
const bird = new Bird();

// The value of 'this' in methods depends on their caller
cat.sayHi(); // Hello from Cat
bird.sayHi = cat.sayHi;
bird.sayHi(); // Hello from Bird

// For bound methods, 'this' doesn't depend on the caller
cat.sayBye(); // Bye from Cat
bird.sayBye = cat.sayBye;
bird.sayBye(); // Bye from Cat

class Tiger extends Cat {
    constructor() {
        super();
    }

    get name() {
        return "Tiger";
    }
}

class Dog {
    get name() {
        return "Dog";
    }
}

const tiger = new Tiger();
const dog = new Dog();

// But as you can see, in derived classes bound 'this' is now bound to the derived class that it's in, in this case 'Tiger'
tiger.sayHi(); // Hello from Tiger
tiger.sayBye(); // Bye from Tiger

dog.sayHi = tiger.sayHi;
dog.sayHi(); // Hello from Dog
dog.sayBye = tiger.sayBye;
dog.sayBye(); // Bye from Tiger



// Note: Classes are always in strict mode. Calling methods with an undefined this will throw an error if the method tries to access properties on this.



// Note, however, that auto-bound methods suffer from the same problem as using arrow functions for class properties: 
// each instance of the class will have its own copy of the method, which increases memory usage. 
// Only use it where absolutely necessary. 

// You can also mimic the implementation of Intl.NumberFormat.prototype.format(): 
// define the property as a getter that returns a bound function when accessed and saves it, so that the function is only created once and only created when necessary.