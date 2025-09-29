import { API_URL } from "./config.js";

// Leer carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Recuperar token guardado al iniciar sesión
const token = localStorage.getItem("token");


// Contenedor donde se mostrarán los productos
const carritoContainer = document.getElementById("carrito-container");
const totalValue = document.getElementById("carrito-total");
const totalContainer = document.getElementById("total-container")

// Función para renderizar el carrito
function renderCarrito() {
    if (!token) {
        alert("Debes iniciar sesión para comprar");
        return;
    }
    carritoContainer.innerHTML = ""; // limpiar contenido
    let total = 0;

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>Tu carrito está vacío :/</p>";
        totalContainer.textContent = "";
        return;
    }

    carrito.forEach(item => {
        // Crear card para el producto
        const card = document.createElement("div");
        card.classList.add("card")
        // Imagen
        const img = document.createElement("img");
        img.src = `../images/${item.image}`;
        img.alt = item.name;

        // Nombre y talle
        const name = document.createElement("h3");
        name.textContent = `${item.name} (${item.size})`;

        // Cantidad y precio
        const cantidad = document.createElement("p");
        cantidad.textContent = `Cantidad: ${item.quantity}`;

        const price = document.createElement("p");
        price.textContent = `Precio: $${item.price}`;

        // Subtotal
        const subtotal = document.createElement("p");
        subtotal.textContent = `Subtotal: $${item.price * item.quantity}`;
        total += item.price * item.quantity;

        // Botón eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn-eliminar")
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(item);
        });
    
        // Agregar elementos a la card
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(cantidad);
        card.appendChild(price);
        card.appendChild(subtotal);
        card.appendChild(btnEliminar);
        carritoContainer.appendChild(card);
    });
    // Mostrar total
    totalContainer.textContent = `TOTAL: $${total}`;
    //boton finalizar compra
    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "comprar";
    btnFinalizar.classList.add("btn-finalizar")
    totalContainer.appendChild(btnFinalizar)
    btnFinalizar.addEventListener("click", finalizarCompra);
}


//FUNCIONES  =>  =>  =>  =>  =>  =>  =>  =>  =>  =>  =>

// Función para eliminar producto
function eliminarProducto(element) {
    carrito = carrito.filter(item => item.id !== element.id || item.size !== element.size || item.quantity !== element.quantity);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
}

// Función para finalizar compra
async function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío :c");
        return;
    }

    try {
        // Transformamos el carrito al formato que espera tu API
        const orderBody = {
            products: carrito.map(item => ({
                product: item.id,       // ID del producto
                quantity: item.quantity, // Cantidad elegida
                size: item.size  //talle
            }))
        };
        // Creamos la respuesta para mandar la orden a la base de datos
        const res = await fetch(`${API_URL}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`  // 👈 acá mandás el JWT
            },
            body: JSON.stringify(orderBody)
        });

        const data = await res.json();
        if (res.ok) {
            alert("✅ Compra realizada con éxito");
            // Vaciar carrito
            carrito = [];
            localStorage.removeItem("carrito");
            renderCarrito(); // refrescar vista del carrito
            console.log("Orden creada:", data);
        } else {
            alert("⚠️ Error al crear la orden: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error al finalizar compra:", error);
        alert("❌ No se pudo completar la compra");
    }
}

// Inicializar render
renderCarrito();