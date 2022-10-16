let cart = [];
let purchase_detail = [];
initialize();

function initialize() {
  getInfoCartAndUpdate();
}

function getInfoCartAndUpdate() {
  const link_cart =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  fetch(link_cart)
    .then((response) => response.json()) //Aquí ya lo convirtió en un objeto de tipo JS para el Json de la info de cada producto
    .then((datos) => {
      cart = datos.articles;
      updatecartHtml();
    });
}

function updatecartHtml() {
  let cart_info = "";
  for (let i = 0; i < cart.length; i++) {
    purchase_detail = cart[i];

    cart_info = `
    <h4>Artículos a comprar</h4>
    <br>
    <table class="table">
    <thead class="table-info">
      <tr>
        <th scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Costo</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
      </tr>
    </thead>
    <tbody class="table-secondary" id="tabla">
      <tr>
        <th scope="row"><img src="${purchase_detail.image}" class="img-thumbnail" width="200" 
        height="180"alt="..."></th>
        <td>${purchase_detail.name}</td>
        <td>${purchase_detail.currency} <span id="product-${purchase_detail.id}-unit-cost">${purchase_detail.unitCost}</span></td>
        <td><input class="product-quantity" id="product-${purchase_detail.id}-quantity" type="number" value="${purchase_detail.count}" /></td>
        <td><span id="product-${purchase_detail.id}-subtotal">${purchase_detail.unitCost}</span></td>
      </tr>
    </tbody>
  </table>
    <br>`;
  }

  let shipping_type = `
 <h4>Tipo de envío</h4>
 <div>

    <label><input type="checkbox" class="radio" id="" value=""> Premium 2 a 5 días (15%)</label><br>
    <input type="checkbox" class="radio" id="" value=""> <label for="">Express 5 a 8 días (7%)</label><br>
    <input type="checkbox" class="radio" id="" value=""> <label for="">Standard 12 a 15 días (5%)</label>
</div>
 `;

  let adress = `
  <br>
 <h4>Dirección de envío</h4>
 <form class="row">
  <div class="mb-3 col-7">
    <label for="" class="form-label">Calle</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3 col-5">
    <label for="" class="form-label">Número</label>
    <input type="number" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 col-7">
    <label for="" class="form-label">Esquina</label>
    <input type="text" class="form-control" id="exampleInputPassword1">
  </div>
</form>
 `;

  document.getElementById("container").innerHTML = cart_info;
  document.getElementById("container").innerHTML += shipping_type;
  document.getElementById("container").innerHTML += adress;

  GetNewProductAndUpdateHtml();

  /////////////////////////////////////

  const quantityImputs = document.querySelectorAll(".product-quantity");
  quantityImputs.forEach((input) => {
    input.addEventListener("change", function () {
      let numberOfProductsToBuy = input.value;
      const productId = input
        .getAttribute("id")
        .replace("product-", "")
        .replace("-quantity", "");

      //console.log(`product-` + productId + `-unit-cost`);

      let unitCost = document.getElementById(
        `product-` + productId + `-unit-cost`
      ).textContent;

      const subTotal = numberOfProductsToBuy * unitCost;
      document.getElementById(`product-` + productId + `-subtotal`).innerText =
        subTotal;
    });
  });
}

function GetNewProductAndUpdateHtml() {
  purchase_detail = JSON.parse(localStorage.getItem("producto"));

  let nuevoProducto = `<th scope="row"><img src="${purchase_detail.image}" class="img-thumbnail" width="200"
   height="180"alt="..."></th>
   <td>${purchase_detail.name}</td>
   <td>${purchase_detail.currency} <span id="product-${purchase_detail.id}-unit-cost">${purchase_detail.unitCost}</span></td>
   <td><input class="product-quantity" id="product-${purchase_detail.id}-quantity" type="number" value="${purchase_detail.count}" /></td>
   <td><span id="product-${purchase_detail.id}-subtotal">${purchase_detail.unitCost}</span></td>
   `;
  document.getElementById("tabla").innerHTML += nuevoProducto;
}
