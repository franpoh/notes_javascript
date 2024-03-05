
// In object-oriented programming languages, 
// a mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes.

// JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

// can use as a way to augment a class by adding multiple behaviors

// may become a point of conflict if they accidentally overwrite existing class methods. 
// So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.



// NOTE: React actually removed mixin usage from their library as they consider it harmful. Lsit of reasons include:
// Mixins introduce implicit dependencies 



// ----- Basic Example

let greetingMixin = {
    sayHi() {
        console.log(`Hello ${this.name}`);
    },
    sayBye() {
        console.log(`Bye ${this.name}`);
    }
};

class User {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(User.prototype, greetingMixin); // usage of mixin here

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!



// There’s no inheritance, but a simple method copying. 
// NOTE: So User may inherit from another class and still include the mixin

let introMixin = {
    sayHi() {
        console.log(`Hello, I am ${this.name}`);
    }
};

class Person {
    constructor (name) {
        this.name = name;
    }
}

class User extends Person {
    constructor (name, location) {
        super(name);
        this.location = location;
    }

    getLocation() {
        console.log(`${this.name} is from ${this.location}`);
    }
}

Object.assign(User.prototype, introMixin);

const dude = new User("Dude", "Singapore");

dude.getLocation(); // Dude is from Singapore
dude.sayHi(); // Hello, I am Dude



// NOTE: Mixins can make use of inheritance inside themselves.

let sayMixin = {
    say(phrase) {
        console.log(phrase);
    }
};

// sayHiMixin inherits from sayMixin:

let sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.setPrototypeOf to set the prototype here)

    sayHi() {
        // call parent method
        super.say(`Hi ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};

// the call to the parent method super.say() from sayHiMixin looks for the method in the prototype of that mixin, not the class.

class Dude {
    constructor(name) {
        this.name = name;
    }
}

Object.assign(Dude.prototype, sayHiMixin);

new Dude("Man").sayHi(); // Hi Man