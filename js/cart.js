initialize();

function initialize() {
  getCartInfoAndUpdateCartTable();
}

function getCartInfoAndUpdateCartTable() {
  const link_cart =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";
  fetch(link_cart)
    .then((response) => response.json()) //Aquí ya lo convirtió en un objeto de tipo JS para el Json de la info de cada producto
    .then((datos) => {
      actualizarCartTable(datos.articles);
      eventoActualizarSubtotalProduct();
      actualizarSubtotalResumen();
      costoDeEnvío();
      disabledinputsdepago();
    });
}

function generarCartRow(purchaseDetail) {
  const productSubtotal = purchaseDetail.unitCost * purchaseDetail.count;
  return `
    <tr>
      <th scope="row"><img src="${purchaseDetail.image}" class="img-thumbnail" width="200" 
      height="180"alt="..."></th>
      <td>${purchaseDetail.name}</td>
      <td>${purchaseDetail.currency} <span id="product-${purchaseDetail.id}-unit-cost">${purchaseDetail.unitCost}</span></td>
      <td><input class="product-quantity" id="product-${purchaseDetail.id}-quantity" type="number" value="${purchaseDetail.count}" /></td>
      <td><span id="product-${purchaseDetail.id}-subtotal" class="subtotal-product">${productSubtotal}</span></td>
    </tr>
  `;
}

function actualizarCartTable(cart) {
  let cartTable = "";
  for (let i = 0; i < cart.length; i++) {
    cartTable += this.generarCartRow(cart[i]);
  }
  document.getElementById("cart-tbody").innerHTML = cartTable;
}

function eventoActualizarSubtotalProduct() {
  const quantityImputs = document.querySelectorAll(".product-quantity");
  quantityImputs.forEach((input) => {
    input.addEventListener("change", function () {
      let numberOfProductsToBuy = input.value;
      const productId = input
        .getAttribute("id")
        .replace("product-", "")
        .replace("-quantity", "");

      let unitCost = document.getElementById(
        `product-` + productId + `-unit-cost`
      ).textContent;

      const subTotal = numberOfProductsToBuy * unitCost;
      document.getElementById(`product-` + productId + `-subtotal`).innerText =
        subTotal;
      actualizarSubtotalResumen();
      costoDeEnvío();
    });
  });
}

function actualizarSubtotalResumen() {
  const subtotales = document.querySelectorAll(".subtotal-product");
  let subtotalresumen = 0;
  subtotales.forEach((subtotal) => {
    subtotalresumen += subtotal.innerHTML * 1;
    costoDeEnvío();
  });

  document.getElementById("subtotal-summary").innerHTML = subtotalresumen;
}
function costoDeEnvío() {
  let subtotalCuadroResumen =
    document.getElementById("subtotal-summary").innerHTML;
  document
    .getElementById("envio-premium")
    .addEventListener("click", function (e) {
      document.getElementById("shipping-cost").innerHTML = "";
      let envioPremium = subtotalCuadroResumen * 0.15;
      document.getElementById("shipping-cost").innerHTML = envioPremium;
      totalResumen();
    });

  document
    .getElementById("envio-express")
    .addEventListener("click", function (e) {
      document.getElementById("shipping-cost").innerHTML = "";
      let envioExpress = subtotalCuadroResumen * 0.07;
      document.getElementById("shipping-cost").innerHTML = envioExpress;
      totalResumen();
    });

  document
    .getElementById("envio-standard")
    .addEventListener("click", function (e) {
      document.getElementById("shipping-cost").innerHTML = "";
      let envioStandard = subtotalCuadroResumen * 0.05;
      document.getElementById("shipping-cost").innerHTML = envioStandard;
      totalResumen();
    });
}
function totalResumen() {
  let subtotalCuadroResumen = parseInt(
    document.getElementById("subtotal-summary").innerHTML
  );
  let costoDeEnvioEnCuadro = parseInt(
    document.getElementById("shipping-cost").innerHTML
  );
  let total = costoDeEnvioEnCuadro + subtotalCuadroResumen;
  document.getElementById("total-cost").innerHTML = "USD " + total;
}

var form = document.getElementById("formulario");

form.addEventListener("submit", function (event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");
});

/*function EnviaFormulario() {
  if (document.getElementById("formulario").checkValidity()) {
    document.getElementById(
      "alert-great"
    ).innerHTML = ` <div class="alert alert-success" role="alert">
    Compra realizada con éxito
  </div>`;
    // } else {
    //   document.getElementById("validar").style.display = "inline";
  }
}*/

function disabledinputsdepago() {
  document
    .getElementById("tarjeta-de-credito")
    .addEventListener("click", function (e) {
      form.numerotarjeta.disabled = false;
      form.codseguridad.disabled = false;
      form.vencimiento.disabled = false;
      form.bancario.disabled = true;
    });

  document
    .getElementById("transferencia-bancaria")
    .addEventListener("click", function (e) {
      form.numerotarjeta.disabled = true;
      form.codseguridad.disabled = true;
      form.vencimiento.disabled = true;
      form.bancario.disabled = false;
    });
}
function validarCheck() {
  if (document.getElementById("tarjeta-de-credito").checkValidity()) {
    document.getElementById("validar").style.display = "none";
    document.getElementById(
      "alert-great"
    ).innerHTML = ` <div class="alert alert-success" role="alert">
    Compra realizada con éxito
    </div>`;
  } else {
    document.getElementById("validar").style.display = "inline-flex";
  }
}
