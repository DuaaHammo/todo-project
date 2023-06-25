// var username = prompt("Please enter your name:");
// var gender = ""
// var title = "";
// var answers=[]

// function selectGender() {
//    gender = prompt("Please enter your gender (male/female):");
//   if (gender === "male") {
//     title = "Mr.";
//   } else if (gender === "female") {
//     title = "Ms.";
//   }
// }

// function checkAge() {

//   var age = parseInt(prompt("Please enter your age:"));

//   if (age <= 0) {
//     alert("Invalid age! Age must be greater than zero.");
//   } else {
//     alert("Valid age. Thank you!");
//   }

// }

// function welcomeMessage(){
//   var skipMessage = confirm("Do you want to skip the welcoming message?");

//   if (!skipMessage) {
//     alert("Welcome, " + title + " " + username + "!");
//   }

// }

// function questions(){
// var q1 = prompt("Do you love ASAC?");
// var q2 = prompt("Are you here?");
// var q3 = prompt("Do you love Bayan?");

// answers = [q1, q2, q3];
// }


// function displayAnswers() {

//   for (let i = 0; i < answers.length; i++) {

//     if (answers[i] === "") {
//       answers[i] = "invalid";
//     }
//     console.log(answers[i]);

//   }

// }
// selectGender()
// checkAge()
// welcomeMessage();
// questions();
// displayAnswers();

"use strict";




document.addEventListener("DOMContentLoaded", main);

function main() {
  document.getElementById("theme-switcher").addEventListener("click", function () {
    document.body.classList.toggle("light");
    const themeImg = this.children[0];
    themeImg.src = themeImg.src.includes("icon-sun.svg")
      ? "../assets/icon-moon.svg"
      : "./assets/sun-.svg";
  });

  addTodo();

  document.querySelector(".todos").addEventListener("dragover", function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains("dragging") &&
      e.target.classList.contains("card")
    ) {
      const draggingCard = document.querySelector(".dragging");
      const cards = [...this.querySelectorAll(".card")];
      const currPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      console.log(currPos, newPos);
      if (currPos > newPos) {
        this.insertBefore(draggingCard, e.target);
      } else {
        this.insertBefore(draggingCard, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  const add = document.getElementById("add-btn");
  const txtInput = document.querySelector(".txt-input");
  add.addEventListener("click", function () {
    const item = txtInput.value.trim();
    if (item) {
      txtInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = {
        item,
        isCompleted: false,
      };
      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    txtInput.focus();
  });

  txtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });

  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });

  document.getElementById("clear-completed").addEventListener("click", function () {
    let deleteIndexes = [];
    document.querySelectorAll(".card.checked").forEach(function (card) {
      deleteIndexes.push(
        [...document.querySelectorAll(".todos .card")].indexOf(card)
      );
      card.classList.add("fall");
      card.addEventListener("animationend", function (e) {
        setTimeout(function () {
          card.remove();
        }, 100);
      });
    });
    removeManyTodo(deleteIndexes);
  });
}

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeManyTodo(indexes) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(function (todo, index) {
    return !indexes.includes(index);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }
  const itemsLeft = document.getElementById("items-left");
  todos.forEach(function (todo) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");

    card.setAttribute("draggable", true);
    img.setAttribute("src", "./assets/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    cbInput.setAttribute("type", "checkbox");

    item.textContent = todo.item;

    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }

    card.addEventListener("dragstart", function () {
      this.classList.add("dragging");
    });

    card.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });

    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");
      itemsLeft.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });

    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;
      correspondingCard.classList.add("fall");
      removeTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        )
      );
      correspondingCard.addEventListener("animationend", function () {
        setTimeout(function () {
          correspondingCard.remove();
          itemsLeft.textContent = document.querySelectorAll(
            ".todos .card:not(.checked)"
          ).length;
        }, 100);
      });
    });

    button.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todos").appendChild(card);
  });

  itemsLeft.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}
