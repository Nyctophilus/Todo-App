let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array to store tasks into
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  GetTasksToLocalStorage();

  //   show clearBtn
}

// FUNC on.click to add tasks to div container
function clickToAddTasksToContainer() {
  if (input.value) {
    // Store tasks to Array
    StoreTasksToArray(input.value);

    // empty the field after submit
    input.value = null;
  }
}
// on submit button... call the func
submit.onclick = clickToAddTasksToContainer;

// on press 'enter' inside the Input Field... call the func
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    clickToAddTasksToContainer();
  }
});

// click on  task element
tasksDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    //   Remove element on click
    e.target.parentElement.remove();

    RemoveElementFromStorage(
      e.target.parentElement.dataset.id
    );
  }

  //   task element
  if (e.target.classList.contains("task")) {
    //   change status in localstorage
    changeStatusInStorage(e.target.dataset.id);

    // Toggle Status
    e.target.classList.toggle("done");
  }
});

function StoreTasksToArray(task) {
  // object of tasks
  const tasks = {
    id: Date.now(),
    title: task,
    status: false,
  };

  arrayOfTasks.push(tasks);

  addTasksToLocalStorage(arrayOfTasks);
  addElementsToPage(arrayOfTasks);
}

function addElementsToPage(arrayOfTasks) {
  // empty the div
  tasksDiv.innerHTML = null;

  arrayOfTasks.forEach((task) => {
    //   create the main task div container
    let div = document.createElement("div");
    div.className = "task";

    // if its completed add "done" class
    if (task.status) div.className = "task done";

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // create the delete span button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);

    // Add the Task div to the page
    tasksDiv.prepend(div);
  });
}

function addTasksToLocalStorage(arrayOfTasks) {
  localStorage.setItem(
    "tasks",
    JSON.stringify(arrayOfTasks)
  );
}

function GetTasksToLocalStorage() {
  if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(
      localStorage.getItem("tasks")
    );
    addElementsToPage(arrayOfTasks);
  }
}

function RemoveElementFromStorage(ClickedRemoveId) {
  // For Explain Only
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }

  arrayOfTasks = arrayOfTasks.filter(
    (task) => task.id != ClickedRemoveId
  );

  addTasksToLocalStorage(arrayOfTasks);
}

function changeStatusInStorage(ClickedStatusId) {
  //   For Explain Only
  for (let i = 0; i < arrayOfTasks.length; i++) {
    // console.log(`${arrayOfTasks[i].id} === ${taskId}`);

    if (arrayOfTasks[i].id == ClickedStatusId) {
      // toggle status of the clicked task
      arrayOfTasks[i].status = !arrayOfTasks[i].status;
    }
  }

  addTasksToLocalStorage(arrayOfTasks);
}

// Clear Button

document.querySelector(".clear").onclick = () => {
  localStorage.clear();
  tasksDiv.innerHTML = "";
};
