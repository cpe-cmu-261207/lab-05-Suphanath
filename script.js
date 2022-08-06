const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  if (inputAdd.value == "") {
    alert("input cant be empty");
  } else {
    addTodo(inputAdd.value);
    inputAdd.value = "";
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.style.display = "none";
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  todoCtn.prepend(div);
  div.append(span);
  div.append(doneBtn);
  div.append(deleteBtn);
  saveTodo();
  //your code here
  //append todo to HTML...
  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
  }
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todoData", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todoData");
  const data = JSON.parse(dataStr);
  for (const todoObj of data.reverse()) {
    addTodo(todoObj.title, todoObj.completed);
  }
}

loadTodo();
