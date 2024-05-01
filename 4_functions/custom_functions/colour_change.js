const colours = [
    {
        color: "red",
        value: "#f00"
    },
    {
        color: "green",
        value: "#0f0"
    },
    {
        color: "blue",
        value: "#00f"
    },
    {
        color: "cyan",
        value: "#0ff"
    },
    {
        color: "magenta",
        value: "#f0f"
    },
    {
        color: "yellow",
        value: "#ff0"
    },
    {
        color: "black",
        value: "#000"
    }
];

var interval = 1000;



// Change colours loop, with delay of 1 second, stops at end of array

colours.forEach(function (value, index, array) {
    setTimeout(function () {
        console.log(array[index].color);
    }, index * interval);
    // adding 1 second to each item eg red = 0*1000, green = 1*1000, blue = 2*1000
})



// Change colours loop, with delay of 1 second, restarts at end of array

colours.forEach(function (value, index, array) {
    let noCol = -1; // setting this to -1 starts the noCol loop at 0, setting at 0 starts it at 1
    setInterval(function () {
        console.log(array[noCol = (noCol + 1) % colours.length].color);
    }, 1000);
})

// interval runs forever 
// just access the next element in array each time
// by incrementing a variable(noCol) that stores the index of the current colour
// using % to reset it back to 0 when it exceeds the length of the array(since 7 % 7 = 0)

// % Remainder / modulo
// Returns the remainder left over after you've divided the left number into a number of integer portions equal to the right number.
// 8 % 3 (returns 2, as three goes into 8 twice, leaving 2 left over)



// Change colours loop, with delay of 1 second, restarts at end of array, stops at end of array when checkbox is checked

checkBox.addEventListener("change", colours.forEach(() => {
    let noCol = -1;
    let delayLoop = setInterval(() => { // named the interval
        spanCol.style.backgroundColor = colours[noCol = (noCol + 1) % colours.length].color;
        if (checkBox.checked && noCol === 6) {
            clearInterval(delayLoop); // clear interval
        }
    }, 1000);
}));