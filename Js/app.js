

function welcomeMassage(){
  var username = prompt("Please enter your name:");
    //gender
    var gender = prompt("Please enter your gender (male/female)");
    // Mr/Ms
    var title = "";
    if (gender === "male") {
      title = "Mr.";
    } else if (gender === "female") {
      title = "Ms.";
    }
    var age = parseInt(prompt("Please enter your age:"));

// Gender


if (age <= 0) {
  alert("Invalid age! Age must be greater than zero.");
} else {
  alert("Valid age. Thank you!");
}
  
// Ask the user to confirm if he/she wants to skip the welcoming message.

  var skipMassaege =prompt("Do you want to skip the welcoming message?");
  if (skipMassaege == "no") {
  alert("Welcome, " + title + " " + username + "!");
  }
  

}


//* */

function qustions(){

var q1=prompt("Do you love ASAC?");
var q2 =prompt("Are you here?");
var q3=prompt("Do you love Bayan?");

var answer=[q1,q2,q3]

for(let i=0; i< answer.length; i++){

if (answer[i]==''){
  answer[i]="invalid"
   
}
  
}
console.log(answer)
}


welcomeMassage()
qustions()