// CURRENTLY UNDER CONSTRUCTION

// Event

// There are two ways of event propagation in the HTML DOM, bubbling and capturing.

// Event propagation is a way of defining the element order when an event occurs. If you have a <p> element inside a <div> element, and the user clicks on the <p> element, which element's "click" event should be handled first?

// In bubbling the inner most element's event is handled first and then the outer: 
// the <p> element's click event is handled first, then the <div> element's click event.

// In capturing the outer most element's event is handled first and then the inner: 
// the <div> element's click event will be handled first, then the <p> element's click event.



// Common HTML events

// onchange - An HTML element has been changed
// onclick - The user clicks an HTML element



onclick

button.onclick = () => {
    alert(`Your username is ${person.username} and password is ${person.pwd}.`);
}

// onmouseover - The user moves the mouse over an HTML element
// onmouseout - The user moves the mouse away from an HTML element
// onkeydown - The user pushes a keyboard key

// word counter
text1.addEventListener("keydown", wordCount); // detecting keydown

function wordCount() {
    const textArr = text1.value.split(' '); // converting string to array
    const textArrNo = textArr.filter(function (item) {
        return /\S/.test(item); // filtering whitespace out from array
    });
    span1.innerText = textArrNo.length; // number of items in array
}

// another word counter
function wordCount() {
    const text = document.querySelector("textarea").value;
    var wordCount = 0;
    for (var i = 0; i <= text.length; i++) {
        if (text.charAt(i) == ' ') {
            wordCount++;
        }
    }
    document.querySelector("span").innerText = wordCount;
}



onload

// The browser has finished loading the page
window.addEventListener("load", function test() {
    console.log("windows loaded");
})



onkeypress

window.addEventListener('keypress', function (evt) { // detecting keypress in windows
    console.log(evt);
    switch (evt.key) {
        case "l":
            document.querySelector("#l").style.backgroundColor = "green";
            break;

        case "e":
            document.querySelector("#e").style.backgroundColor = "green";
            break;
    }
});



addEventListener()

element.addEventListener("click", myFunction);
element.addEventListener("click", function () {
    myFunction(p1, p2);
});

// The addEventListener() method attaches an event handler to the specified element.
// attaches an event handler to an element without overwriting existing event handlers.
// can add many event handlers to one element.
// can add many event handlers of the same type to one element, i.e two "click" events.
// can easily remove an event listener by using the removeEventListener() method.



element.removeEventListener("mousemove", myFunction);

// specify the propagation type by using the "useCapture" parameter:

// syntax
// addEventListener(event, function, useCapture);

// example
document.getElementById("myP").addEventListener("click", myFunction, true);

// The default value is false, which will use the bubbling propagation, when the value is set to true, the event uses the capturing propagation.



Event.preventDefault()

// tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
// The event continues to propagate as usual, unless one of its event listeners terminates propagation
// calling preventDefault() for a non-cancelable event, such as one dispatched via EventTarget.dispatchEvent(), without specifying cancelable: true has no effect

// The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL

// Syntax
event.preventDefault();

// Prevent a link from opening the URL
document.getElementById("myAnchor").addEventListener("click", function (event) {
    event.preventDefault()
});

// example
document.getElementById("myAnchor").addEventListener("click", function (event) {
    event.preventDefault()
});

// Prevent the default action of a checkbox:
document.getElementById("myCheckbox").addEventListener("click", function (event) {
    event.preventDefault()
});

// Prevent default action of button
buttonSub.addEventListener("click", function (event) {
    event.preventDefault()
});

Event.stopPropagation()

// prevents further propagation of the current event in the capturing and bubbling phases. 
// It does not, however, prevent any default behaviors from occurring
// eg clicks on links are still processed.

// syntax
event.stopPropagation();

// example
function func1(event) {
    alert("DIV 1");
    event.stopPropagation();
}

Event.stopImmediatePropagation()

// prevents other listeners of the same event from being called.
// If several listeners are attached to the same element for the same event type, they are called in the order in which they were added. 
// If stopImmediatePropagation() is invoked during one such call, no remaining listeners will be called.

// Syntax
event.stopImmediatePropagation();

// example
function myFunction(event) {
    alert("Hello World!");
    event.stopImmediatePropagation();
}

event.which

// Get the Unicode value of the pressed keyboard key:

// syntax
var x = event.which;

// The which property returns
// Unicode character code of the key that triggered the onkeypress event
// or the Unicode key code of the key that triggered the onkeydown or onkeyup event.

// The difference between the two code types:

// Character codes - A number which represents an ASCII character
// Key codes - A number which represents an actual key on the keyboard

// Apparently it's best to write logic against which, as keyCode and charCode are complicated:

// The event.which property normalizes event.keyCode and event.charCode. It is recommended to watch event.which for keyboard key input

// In a keypress event, the Unicode value of the key pressed is stored in either the keyCode or charCode property, never both. 
// If the key pressed generates a character (e.g. 'a'), charCode is set to the code of that character, respecting the letter case. (i.e. charCode takes into account whether the shift key is held down). 
// Otherwise, the code of the pressed key is stored in keyCode.

// Alert some text if the user presses the Escape key:

{/* <input type="text" onkeydown="myFunction(event)"> */ }

function myFunction(event) {
    var x = event.keyCode;
    if (x == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}

// Event.target

// Get the element that triggered a specific event
// The target event property returns the element that triggered the event.

// It is different from Event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.
// always refers to the element whose event listener triggered the event.

alert(event.target);

// Using the event.target property together with the element.tagName property to find out which element triggered a specified event
function myFunction(event) {
    var x = event.target;
    document.getElementById("demo").innerHTML = "Triggered by a " + x.tagName + " element";
}

// The event.target property can be used in order to implement event delegation.
function hide(evt) {
    evt.target.style.visibility = 'hidden';
}

preventDefault()

// The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

// For example, this can be useful when:

// Clicking on a "Submit" button, prevent it from submitting a form
// Clicking on a link, prevent the link from following the URL

// Prevent a link from opening the URL
document.getElementById("myAnchor").addEventListener("click", function (event) {
    event.preventDefault()
});