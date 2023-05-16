//* Name */

let userName = prompt("Please enter your name:");
console.log("Hello, " + userName + "!");


/* Age */
let age = parseInt(prompt("Please enter your age:"));

if (age <= 0) {
  alert("Invalid age! Age must be greater than zero.");
} else {
  alert("Valid age. Thank you!");
}


//* Welcome Message */

let skipMessage = confirm("Do you want to skip the welcoming message?");

if (skipMessage) {
  console.log("Skipping the welcoming message.");
} else {
  console.log("Welcome to our website!");
}

/* Mr & Ms */
let username = prompt("Please enter your name:");
let userGender = prompt("Please enter your gender (male/female):");
let welcomemessage;

if (userGender.toLowerCase() === "male") {
  welcomemessage = "Welcome, Mr " + username + "!";
} else if (userGender.toLowerCase() === "female") {
  welcomemessage = "Welcome, Ms " + username + "!";
} else {
  welcomemessage = "Welcome, " + username + "!";
}

let skipmessage = confirm("Do you want to skip the welcoming message?");

if (!skipmessage) {
  alert(welcomemessage);
}
