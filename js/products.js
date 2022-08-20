const link_cars =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(link_cars)
  .then((respuesta) => respuesta.json()) //Aquí ya lo convirtió en un objeto de tipo JS
  .then((datos) => {
    // Creo la variable contenido que va a almacenar todo el contenido HTML a agregar al contenedor
    let contenido = "";

    // console.log(datos.products);

    //Itero sobre los productos y voy armando el contenido HTML
    for (let i = 0; i < datos.products.length; i++) {
      const product = datos.products[i];

      //Le agrego el contenido HTML de cada producto a la variable contenido general

      //ToDo: crear el HTML como el del ejemplo
      contenido += `
            <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active" id="div-container">
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

    //Agrego el contenido armado anteriormente al contenedor de los productos
    document.getElementById("products-container").innerHTML = contenido;
  });
