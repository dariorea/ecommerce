import { API_URL } from "./config.js";
import { logout } from "./admin/auth.js"
import { abrirCerrar, initBuscador } from "./modules/cardProduct.js";
import { initUserUI, userRole, userName, carrito, token} from "./modules/user.js";
import { initAdminUI } from "./modules/adminUi.js";


initUserUI(userName, abrirCerrar, logout)
initAdminUI(userRole, abrirCerrar)
initBuscador({
    inputId: "buscador",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
})

const envioConteiner = document.getElementById("envio-conteiner")
const carritoConteiner = document.getElementById("carrito-conteiner")

const nameUser = document.createElement("p")
nameUser.textContent = `${userName}`
const nameDirection = document.createElement("p")
nameDirection.textContent = `general paz 1697`
envioConteiner.append(nameUser, nameDirection)


const renderCarrito = ()=>{
    let total= 0
    carrito.forEach(item => {
        const card = document.createElement("div")
        card.classList.add("card-product")
        const imageProduct = document.createElement("img")
        imageProduct.src = `${API_URL}/images/${item.image}`;
        imageProduct.alt = item.name;
        const nameProduct = document.createElement("h3")
        nameProduct.textContent = `${item.name}`;
        const quantityProduct = document.createElement("h4")
        quantityProduct.textContent = `cantidad: ${item.quantity}`;
        const sizeProduct = document.createElement("h4")
        sizeProduct.textContent = `talle: ${item.size}`;
        const priceProduct = document.createElement("h4")
        priceProduct.textContent = `precio unitario: $${item.price}`;
        total += item.price
        card.append(imageProduct ,nameProduct, quantityProduct, sizeProduct, priceProduct)
        carritoConteiner.appendChild(card)
    });

    const totalPrice = document.createElement("h3")
    totalPrice.textContent = `Total: $${total}`
    carritoConteiner.appendChild(totalPrice)
}

const radios = document.querySelectorAll('input[name="pago"]');
const boton = document.getElementById("btn-pagar");
boton.addEventListener("click", pagarConMercadoPago)

radios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "mercado_pago" && radio.checked) {
            boton.style.display = "inline-block"; // Mostrar botón
        } else {
            boton.style.display = "none"; // Ocultar botón
        }
    });
});
  // Pagar con Mercado Pago
async function pagarConMercadoPago() {
    if (carrito.length === 0) return alert("El carrito está vacío :c");
  
    try {
        const res = await fetch(`${API_URL}/api/payments/create_preference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                products: carrito.map(item => ({
                    title: item.name,
                    quantity: Number(item.quantity),
                    price: Number(item.price)
                }))
            })
        });
        const data = await res.json();
        if (data.id) {
            const mp = new MercadoPago("APP_USR-070dada1-0f66-488e-a24d-6b0514d2357b", {
                locale: "es-AR"
            });
            mp.checkout({ preference: { id: data.id }, autoOpen: true });
        } else {
            alert("⚠️ No se pudo iniciar el pago");
        }
    } catch (error) {
        console.error(error);
        alert("❌ Error al intentar pagar con Mercado Pago");
    }
}

renderCarrito()
