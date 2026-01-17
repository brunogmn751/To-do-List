const addButton = document.querySelector("#add-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".list");
const doneTracker = document.querySelector("#done");
const incompleteTracker = document.querySelector("#incomplete");

let done = 0;
let incomplete = 0;
let tasksArray = [];

function updateTasks() {
  doneTracker.innerText = "Done: " + done;
  incompleteTracker.innerText = "Incomplete: " + incomplete;
}

function createTask() {
  if (taskInput.value === "") {
    return;
  }

  let task = {
    name: taskInput.value,
    done: false,
    id: Math.round(Math.random() * 100000000),
  };

  tasksArray.push(task);
  saveTasks();
  renderTask(tasksArray[tasksArray.length - 1]);
}

function saveTasks() {
  let ArrayToString = JSON.stringify(tasksArray);
  localStorage.setItem("savedTasks", ArrayToString);
}

function renderTask(task) {
  const newLi = document.createElement("li");
  newLi.classList.add("list-item");
  newLi.id = JSON.stringify(task.id);
  const newDiv = document.createElement("div");
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
  checkInput.onchange = doneTask;
  const pElement = document.createElement("p");
  pElement.innerText = task.name;
  if (task.done === true) {
    checkInput.checked = "checked";
    pElement.classList.add("done-text");
    done++;
  } else {
    incomplete++;
  }
  const closeIcon = document.createElement("img");
  closeIcon.src = "./images/close-icon.webp";
  closeIcon.onclick = closeTask;

  newDiv.appendChild(checkInput);
  newDiv.appendChild(pElement);
  newLi.appendChild(newDiv);
  newLi.appendChild(closeIcon);

  taskList.appendChild(newLi);
  taskInput.value = "";
  updateTasks();
}

addButton.addEventListener("click", createTask);
taskInput.addEventListener("keydown", function add(event) {
  if (event.key === "Enter") {
    createTask();
  }
});

function closeTask() {
  let closingTaskId = Number(this.parentNode.id);
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id === closingTaskId) {
      if (tasksArray[i].done === true) {
        done--;
      } else {
        incomplete--;
      }
      tasksArray.splice(i, 1);
      break;
    }
  }
  saveTasks();
  taskList.removeChild(this.parentNode);
  updateTasks();
}

function doneTask() {
  let doneTaskId = Number(this.parentNode.parentNode.id);
  for (let i = 0; i < tasksArray.length; i++) {
    if (tasksArray[i].id === doneTaskId) {
      if (this.checked) {
        tasksArray[i].done = true;
        this.nextElementSibling.classList.add("done-text");
        done++;
        incomplete--;
        saveTasks();
        updateTasks();
      } else {
        tasksArray[i].done = false;
        this.nextElementSibling.classList.remove("done-text");
        done--;
        incomplete++;
        saveTasks();
        updateTasks();
      }
    }
  }
}

function loadTasks() {
  let recoveredData = localStorage.getItem("savedTasks");
  let recoveredArray = JSON.parse(recoveredData);

  if (recoveredArray.length === 0) {
    return;
  }

  for (let i = 0; i < recoveredArray.length; i++) {
    renderTask(recoveredArray[i]);
  }

  tasksArray = [...recoveredArray];
}
loadTasks();

