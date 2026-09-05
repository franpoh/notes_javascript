/* 
Table of Contents

> MAPS
>> Benefits of using Map over a normal Object
>> Iterating through a Map
> WEAKMAP 
*/



// Map and Set objects are collections of data which are indexed by a key
// Map and Set objects contain elements which are iterable in the order of insertion



// ----------------------------- > MAPS -----------------------------

// A Map holds key-value pairs where the keys can be any datatype.
// A key in the Map may only occur once; it is unique in the Map's collection.
// A Map remembers the original insertion order of the keys.
// A Map has a property that represents the size of the map.
// Maps are Objects



// ----------------------------- > MAPS >> Benefits of using Map over a normal Object

// A map does not contain any keys by default. It only contains what is explicitly put into it.
// An Object has a prototype, so it contains default keys that could collide with your own keys if you're not careful. 

// NOTE: A Map is safe to use with user-provided keys and values.
// Setting user-provided key-value pairs on an Object may allow an attacker to override the object's prototype, which can lead to *object injection attacks

// The keys of an Object are strings or symbols
// A Map's keys can be any value (including functions, objects, or any primitive). 

// The keys in Map are ordered in a simple, straightforward way: A Map object iterates entries, keys, and values in the order of entry insertion. 

// The number of items in a Map is easily retrieved from its size property, while you have to manually keep track of size for an Object

// A Map is an iterable, so it can be directly iterated. 

// Performs better in scenarios involving frequent additions and removals of key-value pairs. 



// * object injection attacks: See Cheatsheet\prototype_pollution.js



// These three tips can help you to decide whether to use a Map or an Object:
//      Use maps over objects when keys are unknown until run time, especially if the keys come from external input.
//      Maps support keys and values of any type and do not require keys to be serializable to strings or symbols.
//      Use objects when the shape is known ahead of time and *all keys are expressible as strings.



// * all keys are expressible as strings: 
//      Keys ARE expressible as strings: Predictable, named properties like 'userId', 'status', or 'configOptions' - Use an Object {}.
//      Keys ARE NOT expressible as strings: Raw object references (DOM elements, class instances, functions) or cases where number 1 and string '1' must stay separate. - Use a Map.



// -----------------------------

const fruits = new Map(); // new Map() - Create a Map

console.log(fruits); // Map(0) {}



const fruitBasket = new Map([ // You can create a Map by passing an Array to the new Map() constructor:
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

console.log(fruitBasket); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }



const fruitBowl = new Map();

fruitBowl.set("apples", 500); // set() - add elements to a Map 
fruitBowl.set("bananas", 300);
fruitBowl.set("oranges", 200);

console.log(fruitBowl); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }



fruitBowl.set("apples", 1000); // set() can also be used to change existing Map values

console.log(fruitBowl); // Map(3) { 'apples' => 1000, 'bananas' => 300, 'oranges' => 200 }



// get() - Returns the value associated to the passed key
console.log(fruitBowl.get("oranges")); // 200



// has() - Returns true if a key exists in a Map
console.log(fruitBowl.has("oranges")); // true


// size - Returns the number of Map elements
console.log(fruitBowl.size); // 3



const fruitTray = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

// only makes a shallow copy, the objects inside are not copied so references are the same between the two arrays
const fruitClone = new Map(fruitTray); // clone() - clone a Map

console.log(fruitTray); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }
console.log(fruitClone); // Map(3) { 'apples' => 500, 'bananas' => 300, 'oranges' => 200 }
console.log(fruitTray === fruitClone); // false (the data itself is not cloned)



fruitTray.delete("apples"); // delete() - Removes a Map element specified by a key

console.log(fruitTray); // Map(2) { 'bananas' => 300, 'oranges' => 200 }



fruitTray.clear(); // clear() - Removes all the elements from a Map

console.log(fruitTray); // Map(0) {}



const fruitCup = new Map([
    ["apples", 500],
    ["bananas", 300],
    ["oranges", 200]
]);

const fruitSpoon = new Map([
    ["apples", 500],
    ["bananas", 1000],
    ["kiwis", 100],
]);

const fruitMerge = new Map([...fruitCup, ...fruitSpoon]); // merge() - merge maps while maintaining key uniqueness

console.log(fruitMerge); // Map(4) { 'apples' => 500,'bananas' => 1000, 'oranges' => 200, 'kiwis' => 100 }



// ----------------------------- > MAPS >> Iterating through a Map 

const fruitColours = new Map([
    ["apples", "red"],
    ["bananas", "yellow"],
    ["oranges", "orange"]
]);


// keys() - Returns an iterator object with the keys in a Map
for (const fruit of fruitColours.keys()) {
    console.log(fruit); // apples bananas oranges
}

// values() - Returns an iterator object of the values in a Map
for (const fruit of fruitColours.values()) {
    console.log(fruit); // red yellow orange
}

// entries() - Returns an iterator object with the [key, value] pairs in a Map
for (const fruit of fruitColours.entries()) {
    console.log(fruit); // [ 'apples', 'red' ] [ 'bananas', 'yellow' ] [ 'oranges', 'orange' ]
}

// forEach() - Invokes a callback for each key/value pair in a Map
fruitColours.forEach((value, key) => {
    console.log(`${key} = ${value}.`) // apples = red. bananas = yellow. oranges = orange.
});



// ----------------------------- > WEAKMAP -----------------------------

// A WeakMap is a collection of key/value pairs:
// the keys must be objects or non-registered symbols only
// the values can be of any arbitrary JavaScript type
// This restriction is tied to the *garbage collection mechanism; primitives are not garbage collected in the same way as objects.

// WeakMap creates *weak references to its keys (as opposed to strong references, which is the usual anywhere else in Javascript)
// Unlike a regular Map, a WeakMap does not prevent its keys from being garbage collected.
// If a key (an object) has no references to it in a program, it becomes eligible for garbage collection.
// When the key is garbage collected, its key-value pair is removed from the WeakMap.

// * weak references: See Cheatsheet\coding\strong_weak_reference.js
// * garbage collection: See Cheatsheet\coding\garbage_collection.js



// +++++ Basic Example using Object as Key

// Create an instance of the WeakMap object.
let pets = new WeakMap(); // create a 'pets' weakmap 
let dog = { name: "Rocket" }; // create a 'dog' object

pets.set(dog, "It's me Rocket"); // Set a key-value pair in 'pets' weakmap using the dog object as a key, with a string value

console.log(pets.has(dog)); // true
console.log(pets.get(dog)); // It's me Rocket

dog = null; // Overwrite the reference to the object

console.log(pets.has(dog)); // false
console.log(pets.get(dog)); // undefined

// While the strong (normal) reference between the dog variable and the object still exists, the dog object persists in the WeakMap, and we can access it with no issues.

// But, when we overwrite the reference between the dog variable and the object by reassigning the variable to null, 
// the only reference to the original object in memory is the weak reference coming from the WeakMap we created.

// Because it’s a weak reference, it won’t prevent garbage collection from occurring. 
// This means when the JavaScript engine runs a garbage collection process again, the dog object will be removed from memory and from the WeakMap we assigned it to.



// +++++ Example showing what happens when a key of a WeakMap retains a reference to it elsewhere

let domesticatedAnimal = new WeakMap();
let cat = { name: "Mr Tibbles" };

let kitty = cat; // Creating another reference to the object { name: "Mr Tibbles" }

domesticatedAnimal.set(cat, "It's me Mr Tibbles");

// Currently, passing in the object that is being referenced by the variable cat works
console.log(domesticatedAnimal.has(cat)); // true
console.log(domesticatedAnimal.get(cat)); // It's me Mr Tibbles

cat = null; // Overwrite the reference to the object

// As the value of the variable cat is now null, we are passing null in, which does not work 
console.log(domesticatedAnimal.has(cat)); // false
console.log(domesticatedAnimal.get(cat)); // undefined

// However, if we use the variable kitty, it is still pointing to the original object, which is passed in and returns the correct key-value pair
console.log(domesticatedAnimal.has(kitty)); // true
console.log(domesticatedAnimal.get(kitty)); // It's me Mr Tibbles

kitty = null; // we remove the last remaining reference to the object 

console.log(domesticatedAnimal.has(kitty)); // false
console.log(domesticatedAnimal.get(kitty)); // undefined

// the the only reference that the key-value entry has is a weak reference from domesticatedAnimal, therefore this entry is slated for garbage collection
// the object { name: "Mr Tibbles" } is no longer reachable and therefore also slated for garbage collection



// +++++ Example on what not to do when passing in an object to find a member of a WeakMap

let tamedFauna = new WeakMap();
let rabbit = { name: "Arsène Lapin" };

tamedFauna.set(rabbit, "It's me Arsène Lapin");

// This doesn't work as it is passing in an entirely new object only looks like the original object referenced by the variable rabbit 
console.log(tamedFauna.has({ name: "Arsène Lapin" })); // false
console.log(tamedFauna.get({ name: "Arsène Lapin" })); // undefined



// WeakMaps are not enumerable.
// You cannot iterate over the keys and values with for loops, forEach(), or keys().
// You cannot access the size.

// This is because a WeakMap doesn't allow observation of the liveness of its keys - that is, observing if the key still exist in memory or has been garbage collected
// If there were methods of obtaining a list of keys in a WeakMap (like by iteration methods) 
// the resultng list would depend on the state of garbage collection running in the background, introducing non-determinism - unpredictability in the results



// The only primitive type that can be used as a WeakMap key is *symbol — more specifically, non-registered symbols — 
// because non-registered symbols are guaranteed to be unique and cannot be re-created.

// * symbol: See symbol/symbol.js



// WeakMap offers several practical applications in JavaScript:

// Privacy and Encapsulation: 
// By storing private data separately from the object, WeakMap can enhance privacy and encapsulation. 
// This is particularly useful for classes and objects where internal data should not be exposed to the outside world.

// Memory Management: 
// WeakMap automatically releases unreferenced keys and associated values, allowing for efficient memory management in large applications.

// Caching: 
// WeakMap can implement caching mechanisms without causing memory leaks, as they automatically remove entries when keys are no longer accessible.



// +++++ Example showing how WeakMap can enhance privacy

// Create WeakMap
const myMap = new WeakMap();

// Private Fields Simulation
class User {
    constructor(name) {
        myMap.set(this, { secret: "hidden data" });
        this.name = name;
    }
    getSecret() {
        return myMap.get(this).secret;
    }
}

const user1 = new User("John");
console.log(user1); // User { name: 'John' }

const secret = user1.getSecret();
console.log(secret); // hidden data

// A WeakMap does not allow iteration.
// Outside code can not "discover" what objects are stored inside a WeakMap.

// To get the secret, you need the this reference that was used in the constructor.
// External code has access to user1 and myMap, bot not to the this reference inside myMap
// unless you explicitly expose it, like via getSecret(), the secret value is unreachable.

// WeakMap was intentionally designed for privacy: you can set, get, has, and delete using an object key, but not inspect what is inside.
// This was a great tool for simulating private properties in JavaScript classes (before #private fields were added to the language).



