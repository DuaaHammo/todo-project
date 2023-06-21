var username = prompt("Please enter your name:");
var gender = ""
var title = "";
var answers=[]

function selectGender() {
   gender = prompt("Please enter your gender (male/female):");
  if (gender === "male") {
    title = "Mr.";
  } else if (gender === "female") {
    title = "Ms.";
  }
}

function checkAge() {

  var age = parseInt(prompt("Please enter your age:"));

  if (age <= 0) {
    alert("Invalid age! Age must be greater than zero.");
  } else {
    alert("Valid age. Thank you!");
  }

}

function welcomeMessage(){
  var skipMessage = confirm("Do you want to skip the welcoming message?");

  if (!skipMessage) {
    alert("Welcome, " + title + " " + username + "!");
  }

}

function questions(){
var q1 = prompt("Do you love ASAC?");
var q2 = prompt("Are you here?");
var q3 = prompt("Do you love Bayan?");

answers = [q1, q2, q3];
}


function displayAnswers() {

  for (let i = 0; i < answers.length; i++) {

    if (answers[i] === "") {
      answers[i] = "invalid";
    }
    console.log(answers[i]);

  }

}
selectGender()
checkAge()
welcomeMessage();
questions();
displayAnswers();
