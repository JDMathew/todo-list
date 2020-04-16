//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filer-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", displyTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault(); //prevent form from submitting
  todo = todoInput.value;
  createTodos(todo);
  //Add todo to localstorage
  saveTodo(todo);
  //Clear Todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  //Delete Todo
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    // // Alternate way to event listener for transitionend
    // setTimeout(() => {
    //   todo.remove();
    // }, 2000);
  }
  //Completed Todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(option) {
  const todos = todoList.childNodes;

  const showTodos = option.target.value;
  console.log(showTodos);
  todos.forEach((item) => {
    // if (showTodos === "all") {
    //   item.style.display = "flex";
    // } else if (showTodos === "completed") {
    //   if (item.classList.contains("completed")) {
    //     item.style.display = "flex";
    //   } else {
    //     item.style.display = "none";
    //   }
    // } else {
    //   if (!item.classList.contains("completed")) {
    //     item.style.display = "flex";
    //   } else {
    //     item.style.display = "none";
    //   }
    // }
    switch (showTodos) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "todo":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

function createTodos(todo) {
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Complted button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //Append to list
  todoList.appendChild(todoDiv);
}

function saveTodo(todo) {
  //check if todo is there
  let = todos = getLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function displyTodos() {
  let = todos = getLocalTodos();
  todos.forEach(createTodos);
}

function removeLocalTodos(todo) {
  let = todos = getLocalTodos();
  const todoIndex = todo.children[0].innerText; //Children[0] is the li element
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
