document.addEventListener("DOMContentLoaded", function obtenerusuario() {
  document.getElementById("button").addEventListener("click", function () {
    const nombreUsuario = document.getElementById("username").value;

    if (nombreUsuario !== "") {
      let nombreUsuario_json = JSON.stringify(nombreUsuario);

      localStorage.setItem("usuario", nombreUsuario_json);
    }
    //Hasta aca esta bien, aparece en el LocalStorage
  });
});

document.addEventListener("DOMContentLoaded", function agregarItem() {
  if (localStorage.getItem("usuario")) {
    nombreUsuario_json = localStorage.getItem("usuario");

    const usuarioLocalStorage = JSON.parse(nombreUsuario_json);

    document.getElementById("navigator").innerHTML =
      `<a class="nav-link" href="my-profile.html">` +
      usuarioLocalStorage +
      `</a>`;
  }
});
