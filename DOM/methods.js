/* 
Table of Contents

> DOMCONTENTLOADED
> DOCUMENT.CREATEELEMENT() 
> GET ELEMENTS
>> document.getElementById() 
>> document.getElementsByClassName() 
>> document.querySelector() 
>> document.querySelectorAll() 
> INSERTING NODE OBJECTS / STRING OBJECTS
>> Node.append() 
>> NODE.appendChild() 
> TEXT
>> HTMLElement.innerText
>> Node.textContent
>> Element.innerHTML
> IMAGE
> VIDEO 
> REMOVE
> ATTRIBUTES
>> Element.getAttribute()
>> Element.setAttribute()
>> Element.removeAttribute()
>> Setting Attributes Examples
> HTMLELEMENT.DATASET
> ELEMENT.CLASSLIST()
> STYLING
>> Display
>> Text Fade Transition Example
*/


// ----------------------------- > DOMCONTENTLOADED -----------------------------

// event listener, listens for the browser's "DOMContentLoaded" event, which signifies that the HTML body is completely loaded and parsed. 
// The JavaScript inside this block will not run until after that event is fired

document.addEventListener("DOMContentLoaded", function () {
    // ...
});



// ----------------------------- > DOCUMENT.CREATEELEMENT() -----------------------------

// creates an Element Node with the specified name

var btn = document.createElement("BUTTON");



// HTML elements often contains text. To create a button with text, use the innerText or innerHTML properties of the element object:

var btn = document.createElement("BUTTON"); // Create a <button> element
btn.innerHTML = "CLICK ME"; // Insert text
document.body.appendChild(btn); // Append <button> to <body>



// Example of now to do almost the same thing using different interfaces

var para = document.createElement("P"); // Create a <p> element
para.innerText = "This is a paragraph"; // Insert text

document.body.appendChild(para); // Append <p> to <body>
document.getElementById("myDIV").appendChild(para); // Append <p> to <div> with id="myDIV"



// ----------------------------- > GET ELEMENTS -----------------------------

// ----------------------------- > GET ELEMENTS >> document.getElementById() 

// returns the element that has the ID attribute with the specified value

var x = document.getElementById("demo"); // Get the element with id="demo"
x.style.color = "red"; // Change the color of the element



// ----------------------------- > GET ELEMENTS >> document.getElementsByClassName() 

// returns an array-like object of all child elements which have all of the given class name(s)



// Get all elements that have a class of 'test':
document.getElementsByClassName('test')

// Get all elements that have both the 'red' and 'test' classes:
document.getElementsByClassName('red test')

// Get all elements that have a class of 'test', inside of an element that has the ID of 'main':
document.getElementById('main').getElementsByClassName('test')

// Get the first element with a class of 'test', or undefined if there is no matching element:
document.getElementsByClassName('test')[0]



// modifying all class items

const paraAll = document.getElementsByClassName("para");

var i;

for (i = 0; i < paraAll.length; i++) {
    paraAll[i].style.backgroundColor = "red"; // loop through the paraAll 'array' to modify all items inside
}



// modifying 1 class item

const buttonExample = document.getElementsByClassName("btn");
buttonExample[0].style.backgroundColor = "red"



// ----------------------------- > GET ELEMENTS >> document.querySelector() 

// returns the first element that matches a specified CSS selector(s) in the document
// needs '.' and '#' for class and id 



document.querySelector("p"); // Get the first <p> element in the document

document.querySelector("p.example"); // Get the first <p> element in the document with class="example"

document.querySelector("#demo").innerHTML = "Hello World!" // Change the text of an element with id="demo"

document.querySelector("div > p"); // Get the first <p> element in the document where the parent is a <div> element

document.querySelector("a[target]") // Get the first <a> element in the document that has a "target" attribute

document.querySelector('#div1').append('Hello World'); // can append text to queried item

document.querySelector('#div1').append(paraOne); // can append variable to queried item

document.body.querySelector("input[type='text'").value // get target via type attribute



// ----------------------------- > GET ELEMENTS >> document.querySelectorAll() 

// returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors. 



const matches1 = document.querySelectorAll("p"); // obtain a NodeList of all of the <p> elements in the document

// returns a list of all <div> elements within the document with a class of either note or alert
const matches2 = document.querySelectorAll("div.note, div.alert");

// get a list of <p> elements 
// whose immediate parent element is a <div> 
// with the class highlighted 
// and which are located inside a container whose ID is test
const container = document.querySelector("#test");
const matches3 = container.querySelectorAll("div.highlighted > p");



// ----------------------------- > INSERTING NODE OBJECTS / STRING OBJECTS -----------------------------

// The Element.append() method inserts a set of Node objects or string objects after the last child of the Element. 
// String objects are inserted as equivalent Text nodes.



// Differences from Node.appendChild():

// Element.append() allows you to also append string objects, whereas Node.appendChild() only accepts Node objects.
// Element.append() has no return value, whereas Node.appendChild() returns the appended Node object.
// Element.append() can append several nodes and strings, whereas Node.appendChild() can only append one node.



// ----------------------------- > INSERTING NODE OBJECTS / STRING OBJECTS >> Node.append() 

// The Element.append() method inserts a set of Node objects or string objects after the last child of the Element. 
// String objects are inserted as equivalent Text nodes.



var div = document.createElement("div");
var p = document.createElement("p");

div.append("Some text"); // Appending text
div.append(p); // Appending an element
div.append("Some text", p); // Appending an element and text



// ----------------------------- > INSERTING NODE OBJECTS / STRING OBJECTS >> NODE.appendChild() 

// The appendChild() method of the Node interface adds a node to the end of the list of children of a specified parent node.



// Create a <p> element and append it to a <div> element

var para = document.createElement("P");  // Create a <p> node
var t = document.createTextNode("This is a paragraph."); // Create a text node

para.appendChild(t); // Append the text to <p>
document.getElementById("myDIV").appendChild(para); // Append <p> to <div> with id="myDIV"
document.body.appendChild(para); // Append <p> to <body>



// list example

var node = document.createElement("LI"); // Create a <li> node
var textnode = document.createTextNode("Water"); // Create a text node

node.appendChild(textnode); // Append the text to <li>
document.getElementById("myList").appendChild(node); // Append <li> to <ul> with id="myList"



// Move a list item from one list to another:

var node = document.getElementById("myList2").lastChild;

document.getElementById("myList1").appendChild(node);



// ----------------------------- > TEXT -----------------------------

// The Differences Between innerHTML, innerText and textContent

<p id="myP">   This element has extra spacing     and contains <span>a span element</span>.</p>



// returns just the text content of the element and all its children, 
// without CSS hidden text spacing and tags, except <script> and <style> elements.

var text = document.getElementById("myP").innerText; // 'This element has extra spacing and contains a span element.'



// returns the text content of the element, 
// including all spacing and inner HTML tags.

var text = document.getElementById("myP").innerHTML; // '   This element has extra spacing    and contains <span>a span element</span>.'



// returns the text content of the element 
// and all indentations, spacing and CSS hidden text, but without tags.

var text = document.getElementById("demo").textContent; // '   This element has extra spacing    and contains a span element.'



// ----------------------------- > TEXT >> HTMLElement.innerText

// The innerText property sets or returns the text content of an element.
// When you set the innerText property, all child nodes are removed and replaced by only one new text node.

para.innerText = "This is a paragraph.";



// ----------------------------- > TEXT >> Node.textContent

// The textContent property sets or returns the text content of the specified node, and all its descendants.
// When you set the textContent property, all child nodes are removed and replaced by only one new text node.

para.textContent = "This is a paragraph.";



// ----------------------------- > TEXT >> Element.innerHTML

// The innerHTML property sets or returns the HTML content (inner HTML) of an element.



// append a new list item (<li>) to the existing list (<ul>)
const list = document.getElementById("list");
list.innerHTML += `<li><a href="#">Item ${list.children.length + 1}</a></li>`;



// It is not uncommon to see innerHTML used to insert text into a web page. 
// There is potential for this to become an attack vector on a site, creating a potential security risk.

let person = "John";
// assuming 'el' is an HTML DOM element
el.innerHTML = person; // harmless in this case

person = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = person; // harmless in this case



// For that reason, it is recommended that instead of innerHTML you use:

// Element.SetHTML() to sanitize the text before it is inserted into the DOM.
// Node.textContent when inserting plain text, as this inserts it as raw text rather than parsing it as HTML.

// will detect html tags in the value and implement them
para.innerHTML = "<strong>This is a paragraph.</strong>";

// more secure way of doing the same thing
const strong = document.createElement('strong');
strong.innerText = "This is a paragraph.";



// ----------------------------- > IMAGE -----------------------------

const img = document.createElement("IMG"); // creating an image element

img.src = "https://www.image.jpg"; // giving the image element a source

img.style.display = "block"; // setting display to block

img.style.height = "400px"; // setting height to 400px

document.body.append(img); // appending image to document body



// ----------------------------- > VIDEO -----------------------------

const video = document.createElement("iframe"); // create iframe element

video.src = "https://www.youtube.com/embed/MUG9VzHoEoc"; // giving iframe element a source 



// ----------------------------- > REMOVE -----------------------------

const textOne = document.querySelector('.text');
textOne.remove(); // deleted, but can be reappended back again



// ----------------------------- > ATTRIBUTES -----------------------------

// Elements in HTML have attributes; 
// these are additional values that configure the elements or adjust their behavior in various ways to meet the criteria the users want.
// eg border, class, color, name, minlength, etc



// ----------------------------- > ATTRIBUTES >> Element.getAttribute()

// The getAttribute() method of the Element interface returns the value of a specified attribute on the element. 
// If the given attribute does not exist, the value returned will either be null or ""

<div id="div1">Hi Champ!</div>

const div1 = document.getElementById("div1");

const exampleAttr = div1.getAttribute("id"); // div1

const align = div1.getAttribute("align"); // null



// ----------------------------- > ATTRIBUTES >> Element.setAttribute()

// Sets the value of an attribute on the specified element. 

// If the attribute already exists, the value is updated; 
// otherwise a new attribute is added with the specified name and value.

const button = document.querySelector("button");

button.setAttribute("name", "helloButton"); //  changing the name attribute's value to "helloButton"



// To set the value of a Boolean attribute, such as disabled, you can specify any value. 
// An empty string or the name of the attribute are recommended values. 

// All that matters is that if the attribute is present at all, regardless of its actual value, its value is considered to be true. 
// The absence of the attribute means its value is false. 

// By setting the value of the disabled attribute to the empty string (""), 
// we are setting disabled to true, which results in the button being disabled. 

button.setAttribute("disabled", ""); // button is set to disabled



// ----------------------------- > ATTRIBUTES >> Element.removeAttribute()

document.getElementById("div1").removeAttribute("align");



// ----------------------------- > ATTRIBUTES >> Setting Attributes Examples -----------------------------

textBox.setAttribute("type", "text"); // set attribute of input to type = text

textBox.readOnly = true; // set text box to read only

// set textbox value
textBox.value = Math.floor(Math.random() * 20) + 1; // this number is a string
textBox.value = "";

button.disabled = true; // setting buttons to disabled



// ----------------------------- > HTMLELEMENT.DATASET -----------------------------

// The data-* attributes is used to store custom data private to the page or application.
// The data-* attributes gives us the ability to embed custom data attributes on all HTML elements.

// The stored (custom) data can then be used in the page's JavaScript 
// to create a more engaging user experience (without any Ajax calls or server-side database queries).



// The data-* attributes consist of two parts:
// The attribute name should not contain any uppercase letters, and must be at least one character long after the prefix "data-"
// The attribute value can be any string


<div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth>Carina Anand</div>

const el = document.querySelector("#user");

el.id === 'user'
el.dataset.id === '1234567890'
el.dataset.user === 'carinaanand'
el.dataset.dateOfBirth === ''



el.dataset.dateOfBirth = "1960-10-03"; // set a data attribute

// Result on JS: el.dataset.dateOfBirth === '1960-10-03'

// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth="1960-10-03">Carina Anand</div>



delete el.dataset.dateOfBirth;

// Result on JS: el.dataset.dateOfBirth === undefined

// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand">Carina Anand</div>



if (!("someDataAttr" in el.dataset)) {
    el.dataset.someDataAttr = "mydata";

    // Result on JS: 'someDataAttr' in el.dataset === true

    // Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-some-data-attr="mydata">Carina Anand</div>
}



// ----------------------------- > ELEMENT.CLASSLIST() -----------------------------

example.classList // access classes

example.classList.add('text') // add class

example.classList.remove('text') // remove class

example.classList.toggle('text') // toggle it on or off, remove or add
example.classList.toggle('text', false) // automatically remove 
example.classList.toggle('text', true) // automatically add



// ----------------------------- > STYLING -----------------------------

example.style.backgroundColor = 'yellow';

example.style.fontSize = '200%';

example.style.padding = '10px';

example.style.boxShadow = '3px 3px 6px black';

example.style.margin = "5px 5px";



// ----------------------------- > STYLING >> Display

// The display property sets or returns the element's display type.



// toggle on and off display example

function showText() {
    if (para.style.display === "none") {
        para.style.display = "block";
    } else {
        para.style.display = "none"
    }
}

// Elements in HTML are mostly "inline" or "block" elements

// The display property also allows the author to show or hide an element. 
// similar to the visibility property. 

// However, if you set display:none, it 'takes away' the entire element
// while visibility:hidden means that the contents of the element will be invisible, but the element stays in its original position and size.



// ----------------------------- > STYLING >> Text Fade Transition Example

{/* 

<style>

.text {
    opacity: 0; // beginning opacity is transparent
    transition: opacity 1s ease -in -out; // opacity transition takes 1 second
}

</style> 

*/}

// <script>

const text = document.querySelector('.text');

function tempGreet() {
    // statements
    text.style.opacity = 1 // become opaque
}

function timeFunction() {
    text.style.opacity = 0; // become transparent
    setTimeout(tempGreet, 1000); // callback function in 1 second
}

event.addEventListener(action, timeFunction);

// </script>



