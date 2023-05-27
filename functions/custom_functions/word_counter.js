// word counter
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