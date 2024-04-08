/* 
Table of Contents

> ARRAY.MAP BUT NOT REALLY
> PUSHING INTO ARRAY A
> PUSHING INTO ARRAY B
> CALCULATING PAYABLE PRICES 
*/



// Higher order functions are functions that operate on other functions, either by taking them as arguments or by returning them. 

// Everything below are examples



// ----------------------------- > ARRAY.MAP BUT NOT REALLY -----------------------------

const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];

function mapForEach(arr, fn) {

  const newArray = []; // store output from fn(arr[i]) 

  for(let i = 0; i < arr.length; i++) {
    newArray.push(
      fn(arr[i]) // fn = function(item){return item.length}, arr[i] = item
    );
  }

  return newArray; // return stored item length values

}

// fn(arr[i]) = function(strArray[i]) {return strArray[i].length}

const lenArray = mapForEach(strArray, function(item) { // point to arr, fn in mapForEach
  return item.length;
}); // lenArray = newArray value

console.log(lenArray); // [ 10, 6, 3, 4, 1 ]



// ----------------------------- > PUSHING INTO ARRAY A -----------------------------

function addTailElement(fn) {

  const arr = fn();

  arr.push("tail element");

  return arr;
}

function createArr() {

  const newArr = [];

  for (i = 1; i < 4; i++) {
    newArr.push(i);
  }
  
  return newArr;
}

createArr();

const result = addTailElement(createArr);

console.log(result); // [ 1, 2, 3, 'tail element' ]



// ----------------------------- > PUSHING INTO ARRAY B -----------------------------

function createQueue(fn) {

  const queue = [1, 2, 3, 4];

  return fn(queue);
}

function addStuff(otherStuff) { 

  const arr = otherStuff;

  arr.push("last");

  arr.unshift("start");

  return arr;
}

const res = createQueue(addStuff); 

console.log(res); // ["start", 1, 2, 3, 4, "last"];



// ----------------------------- > CALCULATING PAYABLE PRICES -----------------------------

const priceList = [10.5, 9.9, 8.9, 4.5];

function getPrice() {

  const totalPrice = priceList.reduce((a, b) => {
    return a + b;
  });

  return function() {
    console.log(totalPrice); // 33.8
    const payablePrice = totalPrice * 1.07;
    return payablePrice; // 36.166
  }
}

console.log(getPrice()); // [Function (anonymous)]

let innerFunc = getPrice();

console.log(innerFunc()); // 36.166

let finalPrice = innerFunc(); 

console.log(finalPrice.toFixed(2)); // 36.17