/*let cart = [];
initialize();

function initialize() {
  getProductInfoAndUpdate();
}

function getProductInfoAndUpdate() {
  const link_cart =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  fetch(link_cart)
    .then((response) => response.json()) //Aquí ya lo convirtió en un objeto de tipo JS para el Json de la info de cada producto
    .then((datos) => {
      cart = datos.articles;
      updateInfoHtml();
    });
}

function updateInfoHtml() {
  const cart_info = "";
  for (let i = 0; i < cart.length; i++) {
    const carrito = cart[i];
    console.log(carrito);
    // Hasta aquí va todo bien-------------------------------
    // cart_info += ` <p>${carrito[0]}</p>
    // `;
  }

  //   document.getElementById("container").innerHTML = cart_info;
}
*/
