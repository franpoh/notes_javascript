function login() {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // things to test for for email validation

    if (re.test(userName.value) === false && passWord.value.length > 8) {
        alert("Username must be a valid email");
    }

    else if (re.test(userName.value) === true && passWord.value.length < 8) {
        alert("Password must be at least 8 characters");
    }

    else if (re.test(userName.value) === false && passWord.value.length < 8) {
        alert("Username must be a valid email\nPassword must be at least 8 characters");
    } 
} 

// using \n to insert new line

// testing email against variable using test()

// making sure only the relevant alerts appear, in a single alert