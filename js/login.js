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

////////////////////////////////////////////////////////////////////////////////
///////////////----- Entrega 4, parte b--------////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function agregarItem() {
  if (localStorage.getItem("usuario")) {
    nombreUsuario_json = localStorage.getItem("usuario");

    const usuarioLocalStorage = JSON.parse(nombreUsuario_json);

    document.getElementById("navigator").innerHTML +=
      `<div class="dropdown"> <a class="btn btn-dark dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false href="my-profile.html">` +
      usuarioLocalStorage +
      `</a>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html">Cerrar sesión</a></li>
  </ul>
      
      </div>`;
  }
});
