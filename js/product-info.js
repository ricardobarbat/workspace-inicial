var products;

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
function setProductID(id) {
  localStorage.setItem("ProductID", id);
  const prodID = localStorage.getItem("ProductID");
  if (prodID) {
    window.location = "product-info.html";
  } else {
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
      //console.log(products.relatedProducts);
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
  let buttonBuyer = `
    <button id="buttonBuyer" type="button" class="btn btn-success pull-right">Comprar</button>
    <br>
  `;

  let contenido = "";

  contenido += `<div class="row mt-3">
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
    comments_html += generarComentarioHtml(productComments[i]);
  }

  function generarComentarioHtml(comment) {
    let html = `<div class="testimonios_contenedor row">
        <div class="testimonios_caja col-12">
          <div class="caja_top">
            <div class="perfil">
              <div class="name-user">
                <strong>${comment.user}</strong>
                <span>-${comment.dateTime}</span>
              </div>
            </div>
            <div class="reseñas">`;
    for (i = 1; i <= 5; i++) {
      let checkedClass = "";
      if (i <= comment.score) {
        checkedClass = "checked";
      }
      html += `<i class="fas fa-star ${checkedClass}"></i>`;
    }
    html += `</div>
        </div>
        <div class="comentarios_clientes">
          <p>
          ${comment.description}
          </p>
        </div>
      </div>
    </div>`;
    return html;
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
      </div>
      <br />
      <h4 style="font-weight:bolder;">Productos relacionados</h4>`;

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////-------------Entrega 4, parte a --------------//////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let related_products = "";
  for (let i = 0; i < products.relatedProducts.length; i++) {
    const product_related = products.relatedProducts[i];

    related_products += `
    
         <div onclick="setProductID(${product_related.id})" class="list-group-item list-group-item-action cursor-active" id="div-container">
  <div class="row">
      <div class="col-3">
          <img src="${product_related.image}" class="img-thumbnail">
      </div>
      <div class="col">
          <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1">${product_related.name}</h4>
          </div>
      </div>
  </div>
</div>
`;
  }

  //Agrego por partes de la estructura html con DOM, en este caso lo hice separado pero pude haber concatenado contenido + comments_html + agregar_comment

  document.getElementById("containerInfoProd").innerHTML = contenido;
  document.getElementById("containerInfoProd").innerHTML += buttonBuyer;
  document.getElementById("containerInfoProd").innerHTML += comments_html;
  document.getElementById("containerInfoProd").innerHTML += agregar_comment;
  document.getElementById("containerInfoProd").innerHTML += related_products;

  document.getElementById("buttonBuyer").addEventListener("click", function () {
    console.log("funciona el click");
    purchase_detail = products;
    //for (let i = 0; i < products.length; i++) {
    //const purchase_detail = products[i];}
    console.log(purchase_detail);
    let productosEnCarrito = `<th scope="row"><img src="${purchase_detail.image}" class="img-thumbnail" width="200"
   height="180"alt="..."></th>
   <td>${purchase_detail.name}</td>
   <td>${purchase_detail.currency} <span id="product-${purchase_detail.id}-unit-cost">${purchase_detail.unitCost}</span></td>
   <td><input class="product-quantity" id="product-${purchase_detail.id}-quantity" type="number" value="${purchase_detail.count}" /></td>
   <td><span id="product-${purchase_detail.id}-subtotal">${purchase_detail.unitCost}</span></td>
   `;
    localStorage.setItem("producto", JSON.stringify(productosEnCarrito));
    window.location = "cart.html";
  });
}
//}

// const productosEnCarrito = new Array();
// // declaro un nuevo array que va a ser el carrito en el local sto
// productosEnCarrito = localStorage.getItem("producto");
// console.log(productosEnCarrito);

// // if (productoDelStorage.id == products.id) {
// //   console.log("Este producto ya se encuentra en el carrito");
// // } else {
// for (let i = 0; i < products.length; index++) {
//  const nuevoproductoencarrito = products[i];
// }
// //let nuevoproductoencarrito = new Array();
// nuevoproductoencarrito= {
//   id: products.id,
//   count: 1,
//   name: products.name,
//   unitCost: products.cost,
//   image: `img/prod` + products.id + `_1.jpg`,
//   currency: products.currency,
// };

// console.log(nuevoproductoencarrito);

// //productosEnCarrito.push(nuevoProductoEnCarrito);
// //console.log(productosEnCarrito);

// //console.log(nuevoProductoEnLS);
// localStorage.setItem("producto", JSON.stringify(nuevoproductoencarrito));
// //window.location = "cart.html";
// //}
