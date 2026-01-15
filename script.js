const addButton = document.querySelector("#add-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".list");
const doneTracker = document.querySelector("#done");
const incompleteTracker = document.querySelector("#incomplete");

let done = 0;
let incomplete = 0;

function updateTasks() {
  doneTracker.innerText = "Done: " + done;
  incompleteTracker.innerText = "Incomplete: " + incomplete;
}

function addTask() {
  if (taskInput.value === "") {
    return;
  };

  const newLi = document.createElement("li");
  newLi.classList.add("list-item");
  const newDiv = document.createElement("div");
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.onchange = doneTask;
  const pElement = document.createElement("p");
  pElement.innerText = taskInput.value;
  const closeIcon = document.createElement("img");
  closeIcon.src = "./images/close-icon.webp";
  closeIcon.onclick = closeTask;

  newDiv.appendChild(checkInput);
  newDiv.appendChild(pElement);
  newLi.appendChild(newDiv);
  newLi.appendChild(closeIcon);

  taskList.appendChild(newLi);
  taskInput.value = "";
  incomplete++;
  updateTasks();
}

function closeTask() {
  if (this.parentNode.classList.contains("done-task")) {
    done--;
  } else {
    incomplete--;
  }
  taskList.removeChild(this.parentNode);
  updateTasks();
}

function doneTask() {
  console.log("rodou");
  if (this.checked) {
    this.parentNode.parentNode.classList.add("done-task");
    this.nextElementSibling.classList.add("done-text");
    done++;
    incomplete--;
    updateTasks();
  } else {
    this.parentNode.parentNode.classList.remove("done-task");
    this.nextElementSibling.classList.remove("done-text");
    done--;
    incomplete++;
    updateTasks();
  }
}

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function add(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
