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

// time func
timeDisplay = document.getElementById("time");
function refreshTime() {
  let dateString = new Date().toLocaleTimeString([], {
    hour12: false,
  });
  timeDisplay.innerHTML = dateString;
}

setInterval(refreshTime, 1000);
