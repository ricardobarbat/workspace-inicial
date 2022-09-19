var products = [];

initialize();

function initialize() {
  getProductInfoAndUpdate();
}
////////////////////////////////////////////////////////////////////////////////
/////////////-------Obtengo el id de la categoría----//////////////////////////
///////////////////////////////////////////////////////////////////////////////
function getCatIdFromStorage() {
  //Obtengo el catId del storage
  const catId = localStorage.getItem("catID");
  //Si no existe devuelvo el catId por defecto
  if (catId) {
    return catId;
  } else {
    return 101; //categoria por defecto
  }
}
/////////////////////////////////////////////////////////////////////////////////
////////////////-------Obtengo el id del producto----////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
function getIdProductfromStorage() {
  const prodID = localStorage.getItem("ProductID");
  if (prodID) {
    return prodID;
  } else {
    alert("Usted no ha seleccionado ningún elemento");
  }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////----Parte 3 de la consigna------ //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function getProductInfoAndUpdate() {
  let link_product_info =
    "https://japceibal.github.io/emercado-api/products/" +
    getIdProductfromStorage() +
    ".json";
  fetch(link_product_info)
    .then((respuesta) => respuesta.json()) //Aquí ya lo convirtió en un objeto de tipo JS para el Json de la info de cada producto
    .then((data) => {
      products = data;
      link_comment_products =
        "https://japceibal.github.io/emercado-api/products_comments/" +
        getIdProductfromStorage() +
        ".json";
      fetch(link_comment_products)
        .then((response) => response.json()) //Aquí ya lo convirtió en un objeto de tipo JS para el Json de los comentarios
        .then((dato) => {
          productComments = dato;
          updateInfoHtml();
        });
    });
}

function updateInfoHtml() {
  let contenido = "";

  contenido += `<div class="row">
   <div class="title-product-info col-5">
  <h1 class="p-3 mb-2 bg-info text-dark display-5">${products.name}</h1>
  <br>
  <h4 style="font-weight:bolder;">Precio</h4>
  <h4 class="display-5">${products.currency} ${products.cost}</h4>
  <h4 style="font-weight:bolder;">Descripción</h4>
  <h4>${products.description}</h4>
  <h4 style="font-weight:bolder;">Categoría</h4>
  <h4>${products.category}</h4>
  <h4 style="font-weight:bolder;">Cantidad de vendidos</h4>
  <h4>${products.soldCount}</h4>
  </div>


  <div id="carouselExampleDark" class="carousel carousel-dark slide col-7" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
      <img src="${products.images[0]}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="${products.images[1]}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item">
      <img src="${products.images[2]}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="${products.images[3]}" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


  <h4 style="font-weight:bolder;">Comentarios</h4>
`;
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////------Parte 3 de la consigna-------//////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let comments_html = "";
  for (let i = 0; i < productComments.length; i++) {
    const comment = productComments[i];

    if (comment.score == 1) {
      comments_html += `
      <div class="testimonios_contenedor row">
        <div class="testimonios_caja col-12">
          <div class="caja_top">
            <div class="perfil">
              <div class="name-user">
                <strong>${comment.user}</strong>
                <span>-${comment.dateTime}</span>
              </div>
            </div>
            <div class="reseñas">
              <i class="fas fa-star checked"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
          </div>
          <div class="comentarios_clientes">
            <p>
            ${comment.description}
            </p>
          </div>
        </div>
      </div>
            `;
    } else if (comment.score == 2) {
      comments_html += ` <div class="testimonios_contenedor row">
      <div class="testimonios_caja col-12">
        <div class="caja_top">
          <div class="perfil">
            <div class="name-user">
              <strong>${comment.user}</strong>
              <span>-${comment.dateTime}</span>
            </div>
          </div>
          <div class="reseñas">
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="comentarios_clientes">
          <p>
          ${comment.description}
          </p>
        </div>
      </div>
    </div>
            `;
    } else if (comment.score == 3) {
      comments_html += `<div class="testimonios_contenedor row">
      <div class="testimonios_caja col-12">
        <div class="caja_top">
          <div class="perfil">
            <div class="name-user">
              <strong>${comment.user}</strong>
              <span>-${comment.dateTime}</span>
            </div>
          </div>
          <div class="reseñas">
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="comentarios_clientes">
          <p>
          ${comment.description}
          </p>
        </div>
      </div>
    </div>
            `;
    } else if (comment.score == 4) {
      comments_html += `<div class="testimonios_contenedor row">
      <div class="testimonios_caja col-12">
        <div class="caja_top">
          <div class="perfil">
            <div class="name-user">
              <strong>${comment.user}</strong>
              <span>-${comment.dateTime}</span>
            </div>
          </div>
          <div class="reseñas">
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
        <div class="comentarios_clientes">
          <p>
          ${comment.description}
          </p>
        </div>
      </div>
    </div>
            `;
    } else if (comment.score == 5) {
      comments_html += `<div class="testimonios_contenedor row">
      <div class="testimonios_caja col-12">
        <div class="caja_top">
          <div class="perfil">
            <div class="name-user">
              <strong>${comment.user}</strong>
              <span>-${comment.dateTime}</span>
            </div>
          </div>
          <div class="reseñas">
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star checked"></i>
            <i class="fas fa-star" checked></i>
          </div>
        </div>
        <div class="comentarios_clientes">
          <p>
          ${comment.description}
          </p>
        </div>
      </div>
    </div>
            `;
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////------Parte 4 de la consigna ---------////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let agregar_comment = "";

  agregar_comment += `
  <h4 style="font-weight:bolder;">Comentar</h4>
  <div class="comentario row">
        <div id="comment_space">
          <label for="">Tu opinión</label>
          <br />
          <textarea type="text" id="realizar_comentario" class="form-control" rows="5" >
          </textarea>
        </div>
        <div id="ranking_puntuación">
          <label for="">Tu puntuación</label>
          <br />
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="5"
            class="form-control"
          />
        </div>
        <div id="contiene_boton">
          <br />
          <input type="submit" value="Enviar" id="boton-comentario" class="btn btn-info" />
        </div>
      </div>`;

  //Agrego por partes de la estructura html con DOM, en este caso lo hice separado pero pude haber concatenado contenido + comments_html + agregar_comment
  document.getElementById("containerInfoProd").innerHTML = contenido;
  document.getElementById("containerInfoProd").innerHTML += comments_html;
  document.getElementById("containerInfoProd").innerHTML += agregar_comment;
}
