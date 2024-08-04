// ----------------------------- > WITH GETTER OR SETTER -----------------------------

// this in getters and setters is based on which object the property is accessed on, not which object the property is defined on. 
// A function used as getter or setter has its this bound to the object from which the property is being set or gotten.

const person = {
    firstName: 'John',
    lastName: 'Doe',

    get getName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set setName(value) {
        const [first, last] = value.split(' ');
        this.firstName = first;
        this.lastName = last;
    }
}

// Access the getter and setter on person object
console.log(person.getName); // Output: "John Doe"
person.setName = 'Jane Smith';
console.log(person.getName); // Output: "Jane Smith"

// Define another object that inherits from person
const student = Object.create(person);
student.firstName = 'Alice';
student.lastName = 'Brown';

// Access the getter and setter on student object
console.log(student.getName); // Output: "Alice Brown"
student.setName = 'Bob Johnson';
console.log(student.getName); // Output: "Bob Johnson"