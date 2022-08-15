const link_cars =
  "https://japceibal.github.io/emercado-api/cats_products/101.json";

fetch(link_cars)
  .then((respuesta) => respuesta.json()) //Aquí ya lo convirtió en un objeto de tipo JS
  .then((datos) => {
    // Creo la variable contenido que va a almacenar todo el contenido HTML a agregar al contenedor
    let contenido = "";

    console.log(datos.products);

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

      // `
      // <div class="list-group-item list-group-item-action">
      //     <div class="row">
      //         <div class="col-3">
      //             <img id="img-product" height: "200" width:"200" src="` + /// estaba el img scr y es src
      // product.image +
      // `" alt="" class="">
      //         </div>
      //         <div class="col">
      //             <div class="">
      //                 <div class="mb-1">
      //                 <h4>` +
      // product.name +
      // `</h4>
      //                 <p> ` +
      // product.description + // Falta agregar la "t" en description
      // `</p>
      //                 </div>
      //                 <small class="text-muted">` +
      // product.soldCount + // estaban cambiados con el category.name
      // ` artículos</small>
      //             </div>

      //         </div>
      //     </div>
      // </div>
      // `;
    }

    //Agrego el contenido armado anteriormente al contenedor de los productos
    document.getElementById("products-container").innerHTML = contenido;
  });

//   `
// <div class="img" id="img">
//     <div class="row">
//         <div class="">
//             <img src="` +
//   product.image +
//   `" alt="" class="">
//           </div>
//           <div class="">
//               <div class="">
//                   <div id="title-product">
//                   <id="" h1>` +
//   product.name +
//   `</h4>
//   <p> ` +
//   product.description +
//   `</h4>
//   <p> ` +
//   product.currency +
//   `<p>
// </p>` +
//   product.cost +
//   "<p>Cantidades vendidas: " +
//   product.soldCount +
//   "</p>";
