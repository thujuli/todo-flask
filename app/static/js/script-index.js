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
        const cardHeader = document.createElement("h5");
        const cardBody = document.createElement("div");
        const cardText = document.createElement("p");
        const btnWrap = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");
        const btnDone = document.createElement("button");

        // Set Attribute
        cardWrap.setAttribute("class", "d-flex flex-column");
        card.setAttribute("class", "card mb-3");
        cardHeader.setAttribute("class", "card-header");
        cardHeader.innerHTML = response[i].title;
        cardBody.setAttribute("class", "card-body");
        cardText.setAttribute("class", "card-text");
        cardText.innerHTML = response[i].description;
        btnWrap.setAttribute("class", "d-grid gap-2 d-md-block");
        btnEdit.setAttribute("class", "btn btn-primary mx-1");
        btnEdit.setAttribute("type", "button");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#modalEditTask");
        btnEdit.innerHTML = "EDIT";
        btnDelete.setAttribute("class", "btn btn-danger mx-1");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("data-bs-toggle", "modal");
        btnDelete.setAttribute("data-bs-target", "#modalDeleteTask");
        btnDelete.innerHTML = "DELETE";
        btnDone.setAttribute("type", "button");

        // Append Child
        btnWrap.appendChild(btnEdit);
        btnWrap.appendChild(btnDelete);
        btnWrap.appendChild(btnDone);
        cardBody.appendChild(cardText);
        cardBody.appendChild(btnWrap);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardWrap.appendChild(card);

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

// is another bug
const modalAddTask = document.getElementById("modalAddTask");
const selectProject = document.getElementById("selectProject");
modalAddTask.addEventListener("shown.bs.modal", function (event) {
  event.preventDefault();
  const projects = JSON.parse(localStorage.getItem("projects")).data;
  for (let i = 0; i < projects.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", projects[i].id);
    option.text = projects[i].title;

    selectProject.options.add(option);
  }
});

const formAddTask = document.getElementById("formAddTask");
formAddTask.addEventListener("submit", function (event) {
  event.preventDefault();
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
