/* 
Table of Contents

*/



// A WeakMap is a collection of key/value pairs:

// whose keys must be objects or non-registered symbols, 

// with values of any arbitrary JavaScript type, 

// and which does not create strong references to its keys. 
// That is, an object's presence as a key in a WeakMap does not prevent the object from being garbage collected. 
// Once an object used as a key has been collected, its corresponding values in any WeakMap become candidates for garbage collection as well — as long as they aren't strongly referred to elsewhere. 

// The only primitive type that can be used as a WeakMap key is symbol — more specifically, non-registered symbols — 
// because non-registered symbols are guaranteed to be unique and cannot be re-created.



// The WeakMap API is essentially the same as the Map API. 
// However, a WeakMap doesn't allow observing the liveness of its keys, which is why it doesn't allow enumeration. 
// So there is no method to obtain a list of the keys in a WeakMap. If there were, the list would depend on the state of garbage collection, introducing non-determinism.



// One use case of WeakMap objects is to store private data for an object, or to hide implementation details. 