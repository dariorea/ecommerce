import { API_URL } from "./config.js";
import {token} from "./modules/user.js"
import { logout } from "./admin/auth.js"
import { abrirCerrar, initBuscador } from "./modules/cardProduct.js";
import { initUserUI, userRole, userName} from "./modules/user.js";
import { initAdminUI } from "./modules/adminUi.js";


initUserUI(userName, abrirCerrar, logout)
initAdminUI(userRole, abrirCerrar)

initBuscador({
    inputId: "buscador",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
})

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Contenedores del DOM
const carritoContainer = document.getElementById("carrito-container");
const totalContainer = document.getElementById("total-container");

// Renderizar carrito
function renderCarrito() {
  if (!token) {
    alert("Debes iniciar sesión para comprar");
    return;
  }

  carritoContainer.innerHTML = "";
  totalContainer.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>Tu carrito está vacío :/</p>";
    return;
  }

  carrito.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    const imgConteiner = document.createElement("div")
    imgConteiner.classList.add("img-conteiner")

    const img = document.createElement("img");
    img.src = `../images/${item.image}`;
    img.alt = item.name;

    const infoConteiner = document.createElement("div")
    infoConteiner.classList.add("info-conteiner")
    const name = document.createElement("h3");
    name.textContent = `${item.name} (${item.size || "-"})`;

    const cantidad = document.createElement("p");
    cantidad.textContent = `Cantidad: ${item.quantity}`;

    const price = document.createElement("p");
    price.textContent = `Precio: $${item.price}`;

    const subtotal = document.createElement("p");
    subtotal.textContent = `Subtotal: $${item.price * item.quantity}`;
    total += item.price * item.quantity;

    const btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = `<i class="bi bi-trash-fill"></i>`
    btnEliminar.classList.add("btn-eliminar");
    btnEliminar.addEventListener("click", () => eliminarProducto(item));
    
    imgConteiner.appendChild(img)
    infoConteiner.append(name, cantidad, price, subtotal, btnEliminar)
    card.appendChild(imgConteiner)
    card.appendChild(infoConteiner);
    carritoContainer.appendChild(card)
  });

  const totalTexto = document.createElement("p");
  totalTexto.textContent = `TOTAL: $${total}`;
  totalContainer.appendChild(totalTexto);

  // Botón finalizar compra (crear orden en DB)
  const btnFinalizar = document.createElement("a");
  btnFinalizar.textContent = "comprar ahora";
  btnFinalizar.classList.add("btn-finalizar");
  btnFinalizar.href =`${API_URL}/pages/payment.html`
  //btnFinalizar.addEventListener("click", finalizarCompra);
  totalContainer.appendChild(btnFinalizar);

}

// Eliminar producto del carrito
function eliminarProducto(item) {
  carrito = carrito.filter(i => i.id !== item.id || i.size !== item.size || i.quantity !== item.quantity);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

// Finalizar compra (crear orden en DB)
async function finalizarCompra() {
  if (carrito.length === 0) return alert("El carrito está vacío :c");

  try {
    const orderBody = {
      products: carrito.map(item => ({
        product: item.id,
        quantity: item.quantity,
        size: item.size
      }))
    };

    const res = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(orderBody)
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Orden creada con éxito");
      carrito = [];
      localStorage.removeItem("carrito");
      renderCarrito();
    } else {
      alert("⚠️ Error al crear la orden: " + data.mensaje);
    }
  } catch (error) {
    console.error(error);
    alert("❌ No se pudo completar la orden");
  }
}


// Inicializar render
renderCarrito();
