const button = document.getElementById("button");

button.addEventListener("click", function (e) {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  if (username.value != "" && password.value != "") {
    window.location.replace("portada.html");
  } else {
    alert("Debe llenar los campos de obligatorios");
  }
});
