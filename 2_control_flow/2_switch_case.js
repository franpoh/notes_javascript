
// A switch statement allows a program to evaluate an expression and attempt to match the expression's value to a case label. 
// If a match is found, the program executes the associated statement. 



// +++++ Example

const fruit = 'Papayas'; // Try changing the fruit for testing

switch (fruit) { // The value of fruit is matched against each case clause

    case 'Oranges': // Statements executed when the result of expression matches value Oranges
        console.log('Oranges are $0.59 a pound.');
        break; // If the previous choice matches the expression/value, the browser stops executing the code block here, and resumes execution of any code following the end of switch.

    case 'Mangoes': 

    case 'Papayas': 
        console.log('Mangoes and papayas are $2.79 a pound.'); 
        break;

    default: // Statements executed when none of the values match the value of the expression
        console.log(`Sorry, we are out of ${fruit}.`);
}

console.log('This is the code after the switch statement, for testing purposes.')

// Expected Output: 
// Mangoes and papayas are $2.79 a pound.
// This is the code after the switch statement, for testing purposes.



// Default:
// If no default clause is found, the program resumes execution of any code following the end of switch.
// (By convention, the default clause is written as the last clause, but it does not need to be so.) 

// Break:
// If break is omitted, the program continues execution at the next statement in the switch statement.



// +++++ Example

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



// +++++ This example takes advantage of the fact that if there is no break below a case clause it will continue to execute the next case clause regardless if the case meets the criteria.

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