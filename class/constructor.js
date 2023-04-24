// The constructor method is a special method of a class for creating and initializing an object instance of that class.
// There can only be one special method with the name "constructor" in a class — 
// a SyntaxError is thrown if the class contains more than one occurrence of a constructor method.

// A constructor can use the super keyword to call the constructor of the super class.

// You can create instance properties inside the constructor:

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

// Alternatively, if your instance properties' values do not depend on the constructor's arguments, you can define them as class fields.



// Example

class Polygon {
    constructor() {
        this.name = 'Polygon';
    }
}

const poly1 = new Polygon();

console.log(poly1.name); // Polygon