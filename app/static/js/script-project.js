// get all projects list from api
const cardWrapper = document.getElementById("cardWrapper");
window.addEventListener("load", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", BASE_URL + "/api/projects");
  xhr.addEventListener("load", function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);

      // looping data from response
      for (let i = 0; i < response.data.length; i++) {
        // create element
        const col = document.createElement("div");
        const card = document.createElement("div");
        const cardHeader = document.createElement("h5");
        const cardBody = document.createElement("div");
        const cardText = document.createElement("p");
        const cardFooter = document.createElement("div");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");

        // set setAttribute
        col.setAttribute("class", "col");
        card.setAttribute("class", "card h-100");
        cardHeader.setAttribute("class", "card-header");
        cardHeader.innerHTML = response.data[i].title;
        cardBody.setAttribute("class", "card-body");
        cardText.setAttribute("class", "card-text");
        cardText.innerHTML = response.data[i].description;
        cardFooter.setAttribute("class", "card-footer");
        btnEdit.setAttribute("class", "btn btn-primary mx-1");
        btnEdit.setAttribute("type", "button");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#modalEditProject");
        btnEdit.setAttribute("data-title", response.data[i].title);
        btnEdit.setAttribute("data-description", response.data[i].description);
        btnEdit.innerHTML = "EDIT";
        btnDelete.setAttribute("class", "btn btn-danger mx-1");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute("data-bs-toggle", "modal");
        btnDelete.setAttribute("data-bs-target", "#modalDeleteProject");
        btnDelete.innerHTML = "DELETE";

        // append
        cardFooter.appendChild(btnEdit);
        cardFooter.appendChild(btnDelete);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardFooter);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        col.appendChild(card);
        cardWrapper.appendChild(col);
      }
    }
  });
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("accessToken")
  );
  xhr.send();
});

// create new project
const formAddProject = document.getElementById("formAddProject");
formAddProject.addEventListener("submit", function (event) {
  event.preventDefault();
  const addProjectTitle = document.getElementById("addProjectTitle").value;
  const addProjectDesc = document.getElementById("addProjectDesc").value;

  const toastLiveAdd = document.getElementById("toastLiveAdd");
  const toastBodyAdd = document.getElementById("toastBodyAdd");
  const toastBootstrapAdd = bootstrap.Toast.getOrCreateInstance(toastLiveAdd);

  if (!addProjectTitle) {
    toastBodyAdd.innerHTML = "Title is required!";
    toastBootstrapAdd.show();
  }

  const data = JSON.stringify({
    title: addProjectTitle,
    description: addProjectDesc,
  });

  const xhr = new XMLHttpRequest();
  xhr.open("POST", BASE_URL + "/api/projects");
  xhr.addEventListener("load", function () {
    if (xhr.status === 201) {
      // reset form, hide modal and reload
      const modalAddProject = document.getElementById("modalAddProject");
      const modalBoostrapAdd =
        bootstrap.Modal.getOrCreateInstance(modalAddProject);

      formAddProject.reset();
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

// get value from button edit
const modalEditProject = document.getElementById("modalEditProject");
const editProjectTitle = document.getElementById("editProjectTitle");
const editProjectDesc = document.getElementById("editProjectDesc");
modalEditProject.addEventListener("shown.bs.modal", function (event) {
  event.preventDefault();

  editProjectTitle.value = event.relatedTarget.attributes["data-title"].value;
  editProjectDesc.value =
    event.relatedTarget.attributes["data-description"].value;
});

const formEditProject = document.getElementById("formEditProject");
formEditProject.addEventListener("submit", function (event) {
  event.preventDefault();
});
