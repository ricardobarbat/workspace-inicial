let minPrice = undefined;
let maxPrice = undefined;
var products = [];

initialize();

function initialize() {
  getProductsListAndUpdateHtml();
}

// Consigna 2, parte b

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ----------------Parte 1 de la consigna, funcion onclick, coloca el id del producto en LocalStorage -------------///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setProductID(id) {
  localStorage.setItem("ProductID", id);
  const prodID = localStorage.getItem("ProductID");
  if (prodID) {
    window.location = "product-info.html";
  } else {
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function getProductsListAndUpdateHtml() {
  let link_cars =
    "https://japceibal.github.io/emercado-api/cats_products/" +
    getCatIdFromStorage() +
    ".json";
  fetch(link_cars)
    .then((respuesta) => respuesta.json()) //Aquí ya lo convirtió en un objeto de tipo JS
    .then((data) => {
      //Clona el array obtenido del servicio
      products = data.products.slice();

      //Actualizo el html de los productos con el array cargado
      updateProductsHtml();
    });
}

function updateProductsHtml() {
  // Creo la variable contenido que va a almacenar todo el contenido HTML a agregar al contenedor
  let contenido = "";

  //Itero sobre los productos y voy armando el contenido HTML

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    //Le agrego el contenido HTML de cada producto a la variable contenido general

    //Dentro del if coloco las condiciones para el filtrado
    if (!(product.cost < minPrice) && !(product.cost > maxPrice)) {
      contenido += `
        <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active" id="div-container">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `;
    }
  }
  //Agrego el contenido armado anteriormente al contenedor de los productos
  document.getElementById("products-container").innerHTML = contenido;
}

document
  .getElementById("rangeFilterPrice")
  .addEventListener("click", function () {
    minPrice = parseInt(document.getElementById("rangeFilterPriceMin").value);
    maxPrice = parseInt(document.getElementById("rangeFilterPriceMax").value);
    updateProductsHtml();
  });

document
  .getElementById("clearRangePrice")
  .addEventListener("click", function () {
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    updateProductsHtml();
  });

document.getElementById("sortDesc").addEventListener("click", function () {
  products.sort(function (car, carToCompare) {
    if (parseInt(car.cost) > parseInt(carToCompare.cost)) {
      return -1;
    }
    if (parseInt(car.cost) < parseInt(carToCompare.cost)) {
      return 1;
    }
    return 0;
  });

  updateProductsHtml();
});

document.getElementById("sortAsc").addEventListener("click", function () {
  products.sort(function (car, carToCompare) {
    if (parseInt(car.cost) < parseInt(carToCompare.cost)) {
      return -1;
    }
    if (parseInt(car.cost) > parseInt(carToCompare.cost)) {
      return 1;
    }
    return 0;
  });

  updateProductsHtml();
});

document.getElementById("sortByCount").addEventListener("click", function () {
  products.sort(function (car, carToCompare) {
    if (parseInt(car.soldCount) > parseInt(carToCompare.soldCount)) {
      return -1;
    }
    if (parseInt(car.soldCount) < parseInt(carToCompare.soldCount)) {
      return 1;
    }
    return 0;
  });

  updateProductsHtml();
});
