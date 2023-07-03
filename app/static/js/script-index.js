const BASE_URL = "http://127.0.0.1:5000";

// get access when have accessToken
window.addEventListener("load", function () {
  if (!localStorage.getItem("accessToken")) {
    window.location.replace(BASE_URL + "/login");
  }
});

// handle logout and remove accessToken
const logout = document.getElementById("logout");
logout.addEventListener("click", function (event) {
  event.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", BASE_URL + "/api/auth/logout");
  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      localStorage.removeItem("accessToken");
      window.location.replace(BASE_URL + "/login");
    } else {
      const toastLive = document.getElementById("toastLive");
      const toastBody = document.getElementById("toastBody");
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);

      toastBody.innerHTML = "Oops! Something went wrong";
      toastBootstrap.show();
    }
  });
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send();
});

// handle api for get all projects and storage to localStorage
window.addEventListener("load", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", BASE_URL + "/api/projects");
  xhr.addEventListener("load", function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      localStorage.removeItem("projects");
      localStorage.setItem("projects", xhr.responseText);
    }
  });

  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send();
});

// handle api for get all tasks
const todoItem = document.getElementById("todoItem");
const doneItem = document.getElementById("doneItem");
window.addEventListener("load", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", BASE_URL + "/api/tasks");
  xhr.addEventListener("load", function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText).data;
      for (let i = 0; i < response.length; i++) {
        const cardWrap = document.createElement("div");
        const card = document.createElement("div");
        const cardHeader = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const selectedProject = document.createElement("h5");
        const cardBody = document.createElement("div");
        const cardText = document.createElement("p");
        const btnWrap = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");
        const btnDone = document.createElement("button");

        // Set Attribute
        cardWrap.setAttribute("class", "d-flex flex-column");
        card.setAttribute("class", "card mb-3");
        cardHeader.setAttribute(
          "class",
          "card-header d-flex justify-content-between"
        );
        cardTitle.setAttribute("class", "mb-0");
        cardTitle.innerHTML = response[i].title;
        selectedProject.setAttribute("class", "badge text-bg-info mb-0");
        cardBody.setAttribute("class", "card-body");
        cardText.setAttribute("class", "card-text");
        cardText.innerHTML = response[i].description;
        btnWrap.setAttribute("class", "d-grid gap-2 d-md-block");
        btnEdit.setAttribute("class", "btn btn-primary mx-1");
        btnEdit.setAttribute("type", "button");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#modalTaskEdit");
        btnEdit.setAttribute("data-title", response[i].title);
        btnEdit.setAttribute("data-description", response[i].description);
        btnEdit.setAttribute("data-id", response[i].id);
        btnEdit.innerHTML = "EDIT";
        btnDelete.setAttribute("class", "btn btn-danger mx-1");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("data-bs-toggle", "modal");
        btnDelete.setAttribute("data-bs-target", "#modalTaskDelete");
        btnDelete.setAttribute("data-id", response[i].id);
        btnDelete.innerHTML = "DELETE";
        btnDone.setAttribute("type", "button");

        // Append Child
        btnWrap.appendChild(btnEdit);
        btnWrap.appendChild(btnDelete);
        btnWrap.appendChild(btnDone);
        cardBody.appendChild(cardText);
        cardBody.appendChild(btnWrap);
        cardHeader.appendChild(cardTitle);
        cardHeader.appendChild(selectedProject);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardWrap.appendChild(card);

        // get project title from localStorage
        const projects = JSON.parse(localStorage.getItem("projects")).data;
        for (let x = 0; x < projects.length; x++) {
          if (response[i].project_id == projects[x].id) {
            selectedProject.innerHTML = projects[x].title;
          }
        }
        // logic for finish and unfinish the task
        if (response[i].is_done) {
          btnDone.setAttribute("class", "btn btn-warning mx-1");
          btnDone.innerHTML = "UNFINISH";
          doneItem.append(cardWrap);
        } else {
          btnDone.setAttribute("class", "btn btn-success mx-1");
          btnDone.innerHTML = "FINISH";
          todoItem.append(cardWrap);
        }
      }
    }
  });
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send();
});

// show add modal and fill option value
const modalTaskAdd = document.getElementById("modalTaskAdd");
let firstTime = true;
modalTaskAdd.addEventListener("shown.bs.modal", function (event) {
  event.preventDefault();

  const selectProject = document.getElementById("selectProject");
  const projects = JSON.parse(localStorage.getItem("projects")).data;

  // event tiggered just first click
  if (firstTime) {
    firstTime = false;
    for (let i = 0; i < projects.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", projects[i].id);
      option.text = projects[i].title;

      selectProject.options.add(option);
    }
  }
});

// handle api for create new task
const formAddTask = document.getElementById("formAddTask");
formAddTask.addEventListener("submit", function (event) {
  event.preventDefault();
  const addTaskTitle = document.getElementById("addTaskTitle").value;
  const selectProject = document.getElementById("selectProject").value;
  const addTaskDesc = document.getElementById("addTaskDesc").value;

  const toastLiveAdd = document.getElementById("toastLiveAdd");
  const toastBodyAdd = document.getElementById("toastBodyAdd");
  const toastBootstrapAdd = bootstrap.Toast.getOrCreateInstance(toastLiveAdd);

  if (!addTaskTitle || !selectProject) {
    toastBodyAdd.innerHTML = "Title and Select Project cannot be empty!";
    toastBootstrapAdd.show();
    return;
  }

  const data = JSON.stringify({
    title: addTaskTitle,
    project_id: parseInt(selectProject),
    description: addTaskDesc,
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", BASE_URL + "/api/tasks");
  xhr.addEventListener("load", function () {
    if (xhr.status === 201) {
      const modalBoostrapAdd =
        bootstrap.Modal.getOrCreateInstance(modalTaskAdd);

      formAddTask.reset();
      modalBoostrapAdd.toggle();
      window.location.reload();
    } else {
      const response = JSON.parse(xhr.responseText);
      toastBodyAdd.innerHTML = response.message;
      toastBootstrapAdd.show();
    }
  });
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send(data);
});

// get data from button edit
const modalTaskEdit = document.getElementById("modalTaskEdit");
firstTime = true;
let taskId;
modalTaskEdit.addEventListener("shown.bs.modal", function (event) {
  event.preventDefault();
  const editTaskTitle = document.getElementById("editTaskTitle");
  const editTaskDesc = document.getElementById("editTaskDesc");

  const editSelectedProject = document.getElementById("editSelectedProject");
  const projects = JSON.parse(localStorage.getItem("projects")).data;

  // event tiggered just first click
  if (firstTime) {
    firstTime = false;
    for (let i = 0; i < projects.length; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", projects[i].id);
      option.text = projects[i].title;

      editSelectedProject.options.add(option);
    }
  }

  editTaskTitle.value = event.relatedTarget.attributes["data-title"].value;
  editTaskDesc.value = event.relatedTarget.attributes["data-description"].value;
  taskId = event.relatedTarget.attributes["data-id"].value;
});

// handle api for edit task
const formEditTask = document.getElementById("formEditTask");
formEditTask.addEventListener("submit", function (event) {
  event.preventDefault();
  const editTaskTitle = document.getElementById("editTaskTitle").value;
  const editTaskDesc = document.getElementById("editTaskDesc").value;
  const editSelectedProject = document.getElementById(
    "editSelectedProject"
  ).value;

  const toastLiveEdit = document.getElementById("toastLiveEdit");
  const toastBodyEdit = document.getElementById("toastBodyEdit");
  const toastBootstrapEdit = bootstrap.Toast.getOrCreateInstance(toastLiveEdit);

  if (!editTaskTitle || !editSelectedProject) {
    toastBodyEdit.innerHTML = "Title and Select Project cannot be empty!";
    toastBootstrapEdit.show();
    return;
  }

  const data = JSON.stringify({
    title: editTaskTitle,
    description: editTaskDesc,
    project_id: parseInt(editSelectedProject),
  });

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `${BASE_URL}/api/tasks/${taskId}`);
  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      const modalBoostrapEdit =
        bootstrap.Modal.getOrCreateInstance(modalTaskEdit);
      modalBoostrapEdit.toggle();
      window.location.reload();
    } else {
      const response = JSON.parse(xhr.responseText);
      toastBodyEdit.innerHTML = response.message;
      toastBootstrapEdit.show();
    }
  });
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send(data);
});

const modalTaskDelete = document.getElementById("modalTaskDelete");
modalTaskDelete.addEventListener("shown.bs.modal", function (event) {
  event.preventDefault();
  taskId = event.relatedTarget.attributes["data-id"].value;
});

const btnTaskDelete = document.getElementById("btnTaskDelete");
btnTaskDelete.addEventListener("click", function (event) {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${BASE_URL}/api/tasks/${taskId}`);
  xhr.addEventListener("load", function () {
    if (xhr.status === 200) {
      const modalBoostrapDelete =
        bootstrap.Modal.getOrCreateInstance(modalTaskDelete);
      modalBoostrapDelete.toggle();
      window.location.reload();
    } else {
      const response = JSON.parse(xhr.responseText);
      const toastLiveDelete = document.getElementById("toastLiveDelete");
      const toastBodyDelete = document.getElementById("toastBodyDelete");
      const toastBootstrapDelete =
        bootstrap.Toast.getOrCreateInstance(toastLiveDelete);

      toastBodyDelete.innerHTML = response.message;
      toastBootstrapDelete.show();
    }
  });
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send();
});

// time func
timeDisplay = document.getElementById("time");
function refreshTime() {
  let dateString = new Date().toLocaleTimeString([], {
    hour12: false,
  });
  timeDisplay.innerHTML = dateString;
}

setInterval(refreshTime, 1000);
