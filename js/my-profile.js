// Primero debe cargar la página del perfil, sino está logueado el usuario debe de hacerlo
document.addEventListener("DOMContentLoaded", function (e) {
  if (localStorage.getItem("usuario") == null) {
    window.location = "index.html";
  } else {
    ObtieneUsuarioDelLS();
    DatosdelUsuarioDelLocalStorage();
  }
});

function ObtieneUsuarioDelLS() {
  nombreUsuario_json = localStorage.getItem("usuario");
  const usuarioLocalStorage = JSON.parse(nombreUsuario_json);
  document.getElementById("email-profile").value = usuarioLocalStorage;
}

function DatosdelUsuarioDelLocalStorage() {
  // obtengo el valor que tengo en el input email y lo igualo a una variable
  let email = document.getElementById("email-profile").value;
  // traigo el email guardado con la clave usuario que se guarda en LS cuando se loguea el usuario
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  if (email == usuario) {
    // Lo que tengo que hacer es traer lo que tengo guardado en el local storage con los datos del perfil del usuario
    let datos = JSON.parse(localStorage.getItem(`${email}`));
    //completa cada input los datos guardados para la direccion de ese usuario
    document.getElementById("primer-nombre").value = datos.name;
    document.getElementById("segundo-nombre").value = datos.secondname;
    document.getElementById("primer-apellido").value = datos.surname;
    document.getElementById("segundo-apellido").value = datos.secondsurname;
    document.getElementById("pasword1").value = datos.pasword;
    document.getElementById("pasword2").value = datos.repeatpasword;
    document.getElementById("email-profile").value = datos.correo;
    document.getElementById("numero-cel").value = datos.phone;
  }
}

function Guardar() {
  // Traigo el valor del input que pone cada usuario en: nombre, segundo nombre, apellido, segundo apellido, y email
  let nombre = document.getElementById("primer-nombre").value;
  let segundoNombre = document.getElementById("segundo-nombre").value;
  let apellido = document.getElementById("primer-apellido").value;
  let segundoApellido = document.getElementById("segundo-apellido").value;
  let contrasenia = document.getElementById("pasword1").value;
  let repetirContrasenia = document.getElementById("pasword2").value;
  let email = document.getElementById("email-profile").value;
  console.log(email);
  let contacto = document.getElementById("numero-cel").value;
  //------------------------------------------------------------//
  //declaro un objeto con la propiedad que quiero que se guarde
  let datosUsuario = {
    name: nombre,
    secondname: segundoNombre,
    surname: apellido,
    secondsurname: segundoApellido,
    pasword: contrasenia,
    repeatpasword: repetirContrasenia,
    correo: email,
    phone: contacto,
  };
  localStorage.setItem(`${email}`, JSON.stringify(datosUsuario));
}

var form = document.getElementById("formulario-perfil");

form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");
});
