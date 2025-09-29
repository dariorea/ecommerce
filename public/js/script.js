import {logout} from "./admin/auth.js"
// =====================
// CONFIGURACIÓN
// =====================

// API URL dinámica (local o producción)
const API_URL = (["localhost", "127.0.0.1"].includes(window.location.hostname))
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com";

// =====================
// ELEMENTOS DEL DOM
// =====================

// Usuario
const userName = localStorage.getItem("userName");
const userRole = localStorage.getItem("role");
const exitUser = document.querySelector(".exit-user");
const loginLink = document.getElementById("icono-registrar");
const nameUser = document.getElementById("name-user");
const cerrarSesion = document.getElementById("cerrar-sesion");

// Paneles
const iconoAdmin = document.getElementById("icono-admin");
const panelAdmin = document.getElementById("panel-admin");
const panelOpciones = document.getElementById("panel-opciones");
const exit = document.querySelector(".exit");

// Buscador
const input = document.getElementById("buscador");
const resultados = document.getElementById("conteiner-resultados");

// Carrusel
const images = document.querySelector(".carousel-images");
const totalImages = document.querySelectorAll(".carousel-images img").length;

// =====================
// FUNCIONES AUXILIARES (UI)
// =====================

// Mostrar/ocultar paneles
const abrirCerrar = (mostrar, ocultar) => {
  if (ocultar.style.display === "flex") ocultar.style.display = "none";
    mostrar.style.display = (mostrar.style.display === "none" || mostrar.style.display === "") 
    ? "flex" 
    : "none";
};
// =====================
// EVENTOS USUARIO
// =====================

if (userRole === "admin") iconoAdmin.style.display = "flex";

iconoAdmin.addEventListener("click", () => abrirCerrar(panelAdmin, panelOpciones));
exit.addEventListener("click", () => panelAdmin.style.display = "none");
exitUser.addEventListener("click", () => panelOpciones.style.display = "none");

cerrarSesion.addEventListener("click", logout);

if (userName) {
    nameUser.innerText = `¡Hola ${userName}!`;
    nameUser.style.display = "flex";
} else {
    loginLink.style.display = "flex";
}

nameUser.addEventListener("click", () => abrirCerrar(panelOpciones, panelAdmin));

// =====================
// FUNCIONES API
// =====================

// Cargar productos
export const cargarProductos = async () => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();

        const conteinerCard = document.getElementById("card-conteiner");
        conteinerCard.innerHTML = ""; 

        data.products.forEach(p => {
        const card = document.createElement("a");
        card.href = `./pages/product.html?id=${p._id}`;
        card.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = p.image.startsWith("http") ? p.image : `${API_URL}/images/${p.image}`;
        imagen.alt = p.name;

        const nameProduct = document.createElement("h3");
        nameProduct.textContent = p.name;
        nameProduct.classList.add("card-title");

        const priceProduct = document.createElement("h2");
        priceProduct.textContent = `$${p.price}`;
        priceProduct.classList.add("card-price");

        card.append(imagen, nameProduct, priceProduct);
        conteinerCard.appendChild(card);
    });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};

// Buscar productos
const buscar = async (query) => {
    try {
        const res = await fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        resultados.innerHTML = ""; 

        data.products.forEach(item => {
            const li = document.createElement("div");
            li.classList.add("card-resultados");
            li.innerHTML = `
                <img src="${item.image.startsWith("http") ? item.image : `${API_URL}/images/${item.image}`}" alt="${item.name}">
                <a href="./pages/product.html?id=${item._id}">${item.name}</a>
            `;
            resultados.appendChild(li);
        });
    } catch (error) {
        console.error("Error al buscar:", error);
    }
};
// =====================
// EVENTOS BUSCADOR
// =====================
let timeout;
input.addEventListener("input", (e) => {
    clearTimeout(timeout);
    const valor = e.target.value.trim();

    timeout = setTimeout(() => {
        if (valor.length > 0) buscar(valor);
        else resultados.innerHTML = "";
    }, 300);
});

// =====================
// CARRUSEL
// =====================
let index = 0;

function showImage(i) {
    index = (i + totalImages) % totalImages;
    images.style.transform = `translateX(-${index * 100}%)`;
}
// Auto-play cada 5 segundos
setInterval(() => showImage(index + 1), 5000);

// =====================
// INICIALIZACIÓN
// =====================
cargarProductos();
