//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTo(events) {
  //prevent form from submitting
  events.preventDefault();

  //Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Create li
  const newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //ADD todo to LocalStorage
  saveLocalTodos(todoInput.value);
  //check mark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //check delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // append to todo-list ul
  todoList.appendChild(todoDiv);
  //clear out input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target; // anthing in todoList(deleteButton or completeButton or newtodo)

  // Delete TODO
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    deleteLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      //after transition ends previously then the below lines get executed
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filter all, completed, uncompleted

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos); //return todo childNodes on clicking select tag
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//save localTodo
function saveLocalTodos(todo) {
  //CHECK Do I alread have thing in there
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // store it to the todos in object from string
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos)); // store todos to localStorage in string form
}

//save todos on DOMLoad
function getTodos() {
  //CHECK Do I alread have thing in there
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // store it to the todos in object from string
  }

  //(recreate the whole thing- todoList childrens)
  todos.forEach(function (todo) {
    //Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //check delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // append to todo-list ul
    todoList.appendChild(todoDiv);
  });
}

//Delete todo from local storage
function deleteLocalTodo(todo) {
  //CHECK Do I alread have thing in there
  let todos;
  if (localStorage.getItem("todos") == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos")); // store it to the todos in object from string
  }
  //get deleted array element(<li class="todo-item"></li>)
  todoIndex = todo.children[0].innerText;

  //cut out deleted element from todos
  todos.splice(todos.indexOf(todoIndex), 1);

  //modify he local storage after deleting
  localStorage.setItem("todos", JSON.stringify(todos));
}

//add completed todo in local storage

// recreate the whole completed todo list

/*
//after clicking plus button
<ul class="todo-list">

    //onclick add button

    <div class="todo">
        <li class="todo-item"></li>
        <button class="complete-btn">
            <i class='fas fa-check'></i>
        </button>
        <button class="delete-btn">
            <i class='fas fa-trash'></i>
        </button>
    </div>

    //again onclick add button

    ..............

</ul>
*/
