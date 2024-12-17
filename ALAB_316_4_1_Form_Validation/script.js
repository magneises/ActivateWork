
// Part 3: Registration Form Validation Requirements
// For the Registration Form section of the page, implement the following validation requirements:
// Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.

const registrationForm = document.getElementById("registration");
const username = registrationForm.elements["username"];
const email = registrationForm.elements["email"];
const password = registrationForm.elements["password"];
const passwordCheck = registrationForm.elements["passwordCheck"];
const usernameUniqueCharRegex = new Set(username);
const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const whitespaceRegex = /\s/;


function validateUsername(username) { 
    if (username === "") { // The username cannot be blank
        alert("Please include username.")
        return false;
    }

    if (username.length < 4) { // The usernmae length must be atleast 4 characters long
        alert("Please make your username atlease four (4) characters long.")
        return false
    }

    if (usernameUniqueCharRegex.size < 2) {
        return "Username must contain at least two unique characters.";
    }

    if (specialCharacterRegex.test(username) || whitespaceRegex.test(username)) {
        return "Username cannot contain special characters or whitespace."
    }
    return null;
}

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const unsernameError = validateUsername(username.value);

    if (usernameError) {
        alert(usernameError)
    } else {
        console.log("Form submitted successfully");
        registrationForm.submit();
    }
});



