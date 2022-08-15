// function showAlertSuccess() {
//   document.getElementById("alert-success").classList.add("show");
// }

// function showAlertError() {
//   document.getElementById("alert-danger").classList.add("show");
// }

const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("button");

button.addEventListener("click", function (e) {
  // console.log(password.value);
  if (username.value != "" && password.value != "") {
    window.location.replace("portada.html");
  } else {
    alert("Debe ingresar caracteres");
  }
});
