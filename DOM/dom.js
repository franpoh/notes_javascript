// The Document Object Model (DOM) is a programming interface for web documents. 
// It represents the page so that programs can change the document structure, style, and content. 
// The DOM represents the document as nodes and objects; that way, programming languages can interact with the page. 

// A web page is a document that can be either displayed in the browser window or as the HTML source. 
// In both cases, it is the same document but the Document Object Model (DOM) representation allows it to be manipulated.

// DOM is not part of the JavaScript language, but is instead a Web API used to build websites



// ----------------------------- > TERMINOLOGY -----------------------------

// NOTE: Because the vast majority of code that uses the DOM revolves around manipulating HTML documents, 
// it's common to refer to the nodes in the DOM as elements, although strictly speaking not every node is an element.



// ----- Document

// the root document object itself.

// The Document interface represents any web page loaded in the browser 
// and serves as an entry point into the web page's content, which is the DOM tree.

// The DOM tree includes elements such as <body> and <table>, among many others. 
// It provides functionality globally to the document, like how to obtain the page's URL and create new elements in the document.



// ----- Objects

// All of the properties, methods, and events available for manipulating and creating web pages are organized into objects
// For example, the document object that represents the document itself, 
// any table objects that implement the HTMLTableElement DOM interface for accessing HTML tables, and so forth, are all objects.



// ----- Node

// Every object located within a document is a node of some kind. 
// In an HTML document, an object can be an element node but also a text node or attribute node.
// Nodes can also have event handlers attached to them



// ----- Element 	

// The element type is based on node. 
// It refers to an element or a node of type element returned by a member of the DOM API. 

// Rather than saying, for example, that the document.createElement() method returns an object reference to a node, 
// we just say that this method returns the element that has just been created in the DOM. 



// ----- NodeList

// an array of elements, like the kind that is returned by document.querySelectorAll().

// Items in a nodeList are accessed by index in either of two ways:
list.item(1) // the single method on the nodeList object
list[1] // uses the typical array syntax to fetch the second item in the list



// ----- Attr

// When an attribute is returned by a member (e.g., by the createAttribute() method), 
// it is an object reference that exposes a special (albeit small) interface for attributes. 
// Attributes are nodes in the DOM just like elements are, though you may rarely use them as such. 



// ----------------------------- > DOM INTERFACES -----------------------------

// Many objects borrow from several different interfaces

// For example, the object representing the HTML form element 
// gets its name property from the HTMLFormElement interface 
// but its className property from the HTMLElement interface. 
// In both cases, the property you want is in that form object.



// Example: Table Object

// implements a specialized HTMLTableElement interface, which includes such methods as createCaption and insertRow. 
// But since it's also an HTML element, table implements the Element interface described in the DOM Element Reference chapter. 
// And finally, since an HTML element is also, as far as the DOM is concerned, a node in the tree of nodes that make up the object model for an HTML or XML page, 
// the table object also implements the more basic Node interface, from which Element derives.

// When you get a reference to a table object, as in the following example, 
// you routinely use all three of these interfaces interchangeably on the object, perhaps without knowing it.

const table = document.getElementById("table");

const tableAttrs = table.attributes; // Node/Element interface

for (let i = 0; i < tableAttrs.length; i++) {
    // HTMLTableElement interface: border attribute
    if (tableAttrs[i].nodeName.toLowerCase() == "border")
        table.border = "1";
}

// HTMLTableElement interface: summary attribute
table.summary = "note: increased border";



// The document and window objects are the objects whose interfaces you generally use most often in DOM programming. 

// In simple terms, the window object represents something like the browser, 
// and the document object is the root of the document itself. 
// Element inherits from the generic Node interface, 
// and together these two interfaces provide many of the methods and properties you use on individual elements. 

// These elements may also have specific interfaces for dealing with the kind of data those elements hold, 
// as in the table object example in the previous section.