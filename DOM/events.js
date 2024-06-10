/* 
Table of Contents

> EVENT LISTENERS AND HANDLERS
>> addEventListener()
>> Event Handler Properties
>> removeEventListener()
>> AbortSignal
> EVENT OBJECTS
>> Extra Properties Of Event Objects
> PREVENTING DEFAULT BEHAVIOR
>> preventDefault()
> EVENT PROPAGATION
>> Event Bubbling
>> Event Capture
>> stopPropagation()
>> stopImmediatePropagation()
> EVENT DELEGATION
> HELPFUL EVENT PROPERTIES
>> DOMContentLoaded
>> Window Load
>> which()
*/



// Event propagation is a way of defining the element order when an event occurs in nested elements 
// There are two ways of event propagation in the HTML DOM, bubbling and capturing.

// In bubbling the inner most element's event is handled first and then the outer
// In capturing the outer most element's event is handled first and then the inner

// See > EVENT PROPAGATION for more information



// ----------------------------- > EVENT LISTENERS AND HANDLERS -----------------------------

// The following syntax applies for removeEventListener as well

addEventListener(type, listener)
addEventListener(type, listener, options)
addEventListener(type, listener, useCapture)

// +++++ type
// // Event types can include 'click', 'mouseover', 'keydown', 'focus', 'dblclick', etc



// +++++ options > capture / once / passive / signal
// An optional object that specifies characteristics about the event listener

// +++++ capture
// A boolean value indicating that events of this type will be dispatched to the registered listener 
// before being dispatched to any EventTarget beneath it in the DOM tree. 
// If not specified, defaults to false.

// +++++ once 
// A boolean value indicating that the listener should be invoked at most once after being added. 
// If true, the listener would be automatically removed when invoked. If not specified, defaults to false.

// +++++ passive 
// A boolean value that, if true, indicates that the function specified by listener will never call preventDefault(). 
// If a passive listener does call preventDefault(), the user agent will do nothing other than generate a console warning. 
// If not specified, defaults to false – except that in browsers other than Safari, defaults to true for the wheel, mousewheel, touchstart and touchmove events. 

// +++++ signal 
// An AbortSignal. 
// The listener will be removed when the given AbortSignal object's abort() method is called. 
// If not specified, no AbortSignal is associated with the listener.
// See > EVENT LISTENERS AND HANDLERS >> AbortSignal



// +++++ useCapture 
// An optional boolean value indicating whether events of this type will be dispatched to the registered listener 
// before being dispatched to any EventTarget beneath it in the DOM tree. 
// Events that are bubbling upward through the tree will not trigger a listener designated to use capture. 
// The default value is false, which will use the bubbling propagation, 
// when the value is set to true, the event uses the capturing propagation.



// ----------------------------- > EVENT LISTENERS AND HANDLERS >> addEventListener()

element.addEventListener("click", myFunction);

element.addEventListener("click", () => {
    // code
});

// attaches an event handler to an element without overwriting existing event handlers.

// can add many event handlers to one element.
// can add many event handlers of the same type to one element, i.e two "click" events.



// It is recommended that you use addEventListener() to register event handlers. 
// It's the most powerful method and scales best with more complex programs. 

// However, there are two other ways of registering event handlers that you might see: 
// event handler properties 
// inline event handlers (Never use - bad practice)



// ----------------------------- > EVENT LISTENERS AND HANDLERS >> Event Handler Properties 

// Objects (such as buttons) that can fire events also usually have properties whose name is 'on' followed by the name of the event.
// For example, elements have a property 'onclick'. 
// This is called an event handler property. 
// To listen for the event, you can assign the handler function to the property. 

const btn = document.querySelector("button");
btn.onclick = () => { /* ... */ }



// With event handler properties, you can't add more than one handler for a single event.
// any subsequent attempts to set the property will overwrite earlier ones



// Other event handler properties include onmouseover, onmouseout, onkeydown



// ----------------------------- > EVENT LISTENERS AND HANDLERS >> removeEventListener()

element.removeEventListener("click", myFunction);

element.removeEventListener("click", () => {
    // code
});



// ----------------------------- > EVENT LISTENERS AND HANDLERS >> AbortSignal

// Event handlers can also be removed by 
// passing an AbortSignal to addEventListener() 
// and then later calling abort() on the controller owning the AbortSignal. 



// For example, to add an event handler that we can remove with an AbortSignal:

const controller = new AbortController();

btn.addEventListener("click",
    () => {
        document.body.style.backgroundColor = 'yellow';
    },
    { signal: controller.signal } // pass an AbortSignal to this handler
);

// Then the event handler created by the code above can be removed like this:

controller.abort(); // removes any/all event handlers associated with this controller



// NOTE: For simple, small programs, cleaning up old, unused event handlers isn't necessary, 
// but for larger, more complex programs, it can improve efficiency. 

// Also, the ability to remove event handlers allows you to have the same button performing different actions in different circumstances: 
// all you have to do is add or remove handlers. 



// ----------------------------- > EVENT OBJECTS -----------------------------

// Sometimes, inside an event handler function, you'll see a parameter specified with a name such as event, evt, or e. 
// This is called the event object, and it is automatically passed to event handlers to provide extra features and information.

const btn = document.querySelector("button");

function bgChange(e) {
    // The target property of the event object is always a reference to the element that triggered the event
    e.target.style.backgroundColor = 'yellow'; // setting a background color style on e.target — which is the button itself
    console.log(e);
}

btn.addEventListener("click", bgChange);


// Note: You can use any name you like for the event object — 
// you just need to choose a name that you can then use to reference it inside the event handler function. 
// e/evt/event is most commonly used by developers because they are short and easy to remember.


// Event.target is different from Event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.
// Event.target always refers to the element whose event listener triggered the event.



// Using the event.target property together with the element.tagName property to find out which element triggered a specified event
function myFunction(event) {
    var x = event.target;
    document.getElementById("demo").innerHTML = "Triggered by a " + x.tagName + " element";
}



// The event.target property can be used in order to implement event delegation.
function hide(evt) {
    evt.target.style.visibility = 'hidden';
}



// ----------------------------- > EVENT OBJECTS >> Extra Properties Of Event Objects

// Most event objects have a standard set of properties and methods available on the event object
// Some event objects add extra properties that are relevant to that particular type of event. 

// For example, the keydown event fires when the user presses a key. 
// Its event object is a KeyboardEvent, which is a specialized Event object with a key property that tells you which key was pressed:

const textBox = document.querySelector("#textBox");

const output = document.querySelector("#output");

textBox.addEventListener("keydown", (event) => { // event here is KeyboardEvent
    output.textContent = `You pressed "${event.key}".`; // key property of KeyboardEvent
});



// ----------------------------- > PREVENTING DEFAULT BEHAVIOR -----------------------------

//  Sometimes, you'll come across a situation where you want to prevent an event from doing what it does by default. 

// The most common example is that of a web form, for example, a custom registration form. 
// When you fill in the details and click the submit button, 
// the natural behavior is for the data to be submitted and the browser to be redirected to a "success message" of some kind

// The trouble comes when the user has not submitted the data correctly — 
// as a developer, you want to prevent the submission to the server and give an error message 

// Some browsers support automatic form data validation features, 
// but since many don't, you are advised to not rely on those and implement your own validation checks.



// ----------------------------- > PREVENTING DEFAULT BEHAVIOR >> preventDefault()

// The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, 
// its default action should not be taken as it normally would be.

// The event continues to propagate as usual, 
// unless one of its event listeners calls stopPropagation() or stopImmediatePropagation(), 
// either of which terminates propagation at once.

// As noted below, calling preventDefault() for a non-cancelable event, 
// such as one dispatched via EventTarget.dispatchEvent(), without specifying 'cancelable: true' has no effect. 

const form = document.querySelector("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => { // when the form triggers a submit event
    if (firstName.value === "" || lastName.value === "") { // if either the first or last name are not filled in
        e.preventDefault(); // prevent the default submission behaviour
        para.textContent = "You need to fill in both names!"; // send an error message
    }
});



// ----------------------------- > EVENT PROPAGATION -----------------------------

// As mentioned above, event propagation is a way of defining the element order when an event occurs in nested elements 



// ----------------------------- > EVENT PROPAGATION >> Event Bubbling

// Event bubbling describes how the browser handles events targeted at nested elements.

<div>
    <button></button>
</div>

var div = document.querySelector("div");
var button = document.querySelector("button");

function handleClick(e) {
    return `You clicked on a ${e.currentTarget.tagName} element`;
}

// If we added handleClick to <div> 

div.addEventListener("click", handleClick);

// clicking on the button will return 'You clicked on a DIV element'
// the button is inside the <div>, so when you click the button you're also implicitly clicking the element it is inside



// +++++ Bubbling Example

// If we added handleClick to <div>, <button> and <body> 

document.body.addEventListener("click", handleClick);
div.addEventListener("click", handleClick);
button.addEventListener("click", handleClick);

// clicking on the button will return:

// You clicked on a BUTTON element - click fires first
// You clicked on a DIV element - click fires second
// You clicked on a BODY element - click fires third

// We describe this by saying that the event bubbles up from the innermost element that was clicked



// ----------------------------- > EVENT PROPAGATION >> Event Capture

// An alternative form of event propagation is event capture. 

// This is like event bubbling but the order is reversed: 
// so instead of the event firing first on the innermost element targeted, and then on successively less nested elements, 
// the event fires first on the least nested element, and then on successively more nested elements, until the target is reached.

// Event capture is disabled by default. To enable it you have to pass the capture option in addEventListener().



<div>
    <button></button>
</div>

var div = document.querySelector("div");
var button = document.querySelector("button");

function handleClick(e) {
    return `You clicked on a ${e.currentTarget.tagName} element`;
}

document.body.addEventListener("click", handleClick, { capture: true });
div.addEventListener("click", handleClick, { capture: true });
button.addEventListener("click", handleClick);

// Clicking on the button will return:

// You clicked on a BODY element - click fires first
// You clicked on a DIV element - click fires second
// You clicked on a BUTTON element - click fires third



// Why bother with both capturing and bubbling? 
// In the bad old days, when browsers were much less cross-compatible than now, 
// Netscape only used event capturing, and Internet Explorer used only event bubbling. 
// When the W3C decided to try to standardize the behavior and reach a consensus, 
// they ended up with this system that included both, which is what modern browsers implement.

// By default almost all event handlers are registered in the bubbling phase, and this makes more sense most of the time.



// ----------------------------- > EVENT PROPAGATION >> stopPropagation() -----------------------------

// prevents further propagation of the current event in the capturing and bubbling phases. 
// It does not, however, prevent any default behaviors from occurring
// eg. clicks on links are still processed.

<div>
    <button></button>
</div>

var div = document.querySelector("div");
var button = document.querySelector("button");



// Default Bubbling

div.addEventListener("click", (e) => `You clicked on a ${e.currentTarget.tagName} element`);
button.addEventListener("click", (e) => `You clicked on a ${e.currentTarget.tagName} element`);

// Clicking on the button will return:

// You clicked on a BUTTON element 
// You clicked on a DIV element 



// to stop the click event from bubbling up to the div element, use stopPropagation()

div.addEventListener("click", (e) => `You clicked on a ${e.currentTarget.tagName} element`);

button.addEventListener("click", (e) => {
    e.stopPropagation(); // click event is stopped here
    return `You clicked on a ${e.currentTarget.tagName} element`;
});

// Clicking on the button will return:

// You clicked on a BUTTON element 



// ----------------------------- > EVENT PROPAGATION >> stopImmediatePropagation() -----------------------------

// prevents other listeners of the same event from being called.
// If several listeners are attached to the same element for the same event type, they are called in the order in which they were added. 
// If stopImmediatePropagation() is invoked during one such call, no remaining listeners will be called.

var button = document.querySelector("button");

button.addEventListener("click", (e) => {
    `First Click`;
});

button.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    `Second Click`;
    e.stopImmediatePropagation();
});

button.addEventListener("click", (e) => {
    `Third Click`;
});

// Clicking on the button will return:

// First Click
// Second Click



// ----------------------------- > EVENT DELEGATION -----------------------------

// Event bubbling can be very useful as it enables event delegation. 

// In this practice, when we want some code to run when the user interacts with any one of a large number of child elements, 
// we set the event listener on their parent and have events that happen on them bubble up to their parent 
// rather than having to set the event listener on every child individually.



// In this example, the page is divided into 16 tiles, and we want to set each tile to a random color when the user clicks that tile

<div id="container">
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
    {/* etc, for 16 tiles altogether */}
</div>

function bgChange() {
    /* Code the generate random colours */
}

const container = document.querySelector("#container");

// set the click event handler on the parent
// rely on event bubbling to ensure that the handler is executed when the user clicks on a tile
container.addEventListener("click", (event) => {
    // using event.target to get the element that was the target of the event (that is, the innermost element)
    event.target.style.backgroundColor = bgChange();
});



// ----------------------------- > HELPFUL EVENT PROPERTIES -----------------------------

// ----------------------------- > HELPFUL EVENT PROPERTIES >> DOMContentLoaded -----------------------------

// event listener, listens for the browser's "DOMContentLoaded" event, which signifies that the HTML body is completely loaded and parsed. 
// The JavaScript inside this block will not run until after that event is fired

document.addEventListener("DOMContentLoaded", function () {
    // ...
});



// ----------------------------- > HELPFUL EVENT PROPERTIES >> Window Load -----------------------------

// The load event is fired when the whole page has loaded, 
// including all dependent resources such as stylesheets, scripts, iframes, and images. 

// This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, 
// without waiting for resources to finish loading. 



// The browser has finished loading the page

window.addEventListener("load", function test() {
    console.log("windows loaded");
});



// ----------------------------- > HELPFUL EVENT PROPERTIES >> which() -----------------------------

// The UIEvent.which read-only property of the UIEvent interface 
// returns a number that indicates which button was pressed on the mouse, 
// or the numeric keyCode or the character code (charCode) of the key pressed on the keyboard.



// The which property returns
// Unicode character code of the key that triggered the onkeypress event
// or the Unicode key code of the key that triggered the onkeydown or onkeyup event.

// The difference between the two code types:

// Character codes - A number which represents an ASCII character
// Key codes - A number which represents an actual key on the keyboard



// In a keypress event, the Unicode value of the key pressed is stored in either the keyCode or charCode property, never both. 

// If the key pressed generates a character (e.g. 'a'), charCode is set to the code of that character, respecting the letter case. 
// (i.e. charCode takes into account whether the shift key is held down). 

// Otherwise, the code of the pressed key is stored in keyCode.



// Alert some text if the user presses the Escape key:

<input type="text" onkeydown="myFunction(event)" />

function myFunction(event) {
    var x = event.keyCode;
    if (x == 27) {  // 27 is the ESC key
        alert("You pressed the Escape key!");
    }
}