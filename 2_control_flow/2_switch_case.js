
const expr = 'Papayas';

switch (expr) { // expr - An expression whose result is matched against each case clause

    case 'Oranges': // Statements executed when the result of expression matches value Oranges
        console.log('Oranges are $0.59 a pound.');
        break; 
        // If the previous choice matches the expression/value, the browser stops executing the code block here, and moves on to any code that appears below the switch statement.
        // If break is omitted, the program continues execution at the next statement in the switch statement.

    case 'Mangoes': // Statements executed when the result of expression matches value Mangoes
    case 'Papayas': // Statements executed when the result of expression matches value Papayas
        console.log('Mangoes and papayas are $2.79 a pound.'); // expected output: "Mangoes and papayas are $2.79 a pound."
        break;

    default: // Statements executed when none of the values match the value of the expression
        console.log(`Sorry, we are out of ${expr}.`);
}


// Mangoes and papayas are $2.79 a pound.



// ----- Example

let animal;

const colour = "brown"

switch (colour) {
    case "black":
        animal = "black bear";
        break;
    case "brown":
        animal = "grizzly bear";
        break;
    case "white":
        animal = "polar bear";
        break;
    default:
        animal = "teddy bear"
}

console.log(animal); // grizzly bear



// ----- Example with let declared without being defined

var Animal = 'Giraffe';

switch (Animal) {
    case 'Cow':
    case 'Giraffe':
    case 'Dog':
    case 'Pig':
        console.log('This animal is not extinct.');
        break;
    case 'Dinosaur':
    default:
        console.log('This animal is extinct.');
}

// This animal is not extinct.



// Multi-case: single operation
// This method takes advantage of the fact that if there is no break below a case clause it will continue to execute the next case clause regardless if the case meets the criteria.

var foo = 1;

var output = 'Output: ';

switch (foo) {
    case 0:
        output += 'So '; // So What Is Your Name?!

    case 1:
        output += 'What '; // What Is Your Name?!
        output += 'Is ';

    case 2:
        output += 'Your '; // Your Name?!


    case 3:
        output += 'Name'; // Name?!

    case 4:
        output += '?';
        console.log(output); // ?!
        break;
    case 5:
        output += '!'; // !
        console.log(output);
        break;
    default:
        console.log('Please pick a number from 0 to 5!');
}

// Multi-case: chained operations
// multiple-operation sequential case clause, where, depending on the provided integer, you can receive different output. 
// This shows you that it will traverse in the order that you put the case clauses, and it does not have to be numerically sequential.



// Ensure that your function respects block-scoping