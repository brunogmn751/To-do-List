const addButton = document.querySelector("#add-button");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".list");
const doneTracker = document.querySelector("#done");
const incompleteTracker = document.querySelector("#incomplete");

let done = 0;
let incomplete = 0;

function updateDoneTasks(){
    let currentNumber = doneTracker.textContent.split(" ")[1];
    currentNumber = done;
    doneTracker.innerText = "Done: " + currentNumber;
}

function addTask() {
  const newLi = document.createElement("li");
  newLi.classList.add("list-item");
  const newDiv = document.createElement("div");
  const checkInput = document.createElement("input");
  checkInput.type = "checkbox";
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
}

function closeTask(){
    console.log(this.parentNode);
    taskList.removeChild(this.parentNode)
}



// function wtf() {
//   let taskName = taskInput.value;
//   console.log(taskName);
//   taskInput.value = "";
// }

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function add(event){
    if(event.key === "Enter"){
        addTask();
    }
});
