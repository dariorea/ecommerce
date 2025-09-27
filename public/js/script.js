// =====================
// TOKEN Y DATOS USUARIO
// =====================
const userName = localStorage.getItem("userName");
const userRole = localStorage.getItem("role");
const exitUser = document.querySelector(".exit-user");

const iconoAdmin = document.getElementById("icono-admin");
const loginLink = document.getElementById("icono-registrar");
const nameUser = document.getElementById("name-user");
const cerrarSesion = document.getElementById("cerrar-sesion");
const panelAdmin = document.getElementById("panel-admin");
const panelOpciones = document.getElementById("panel-opciones");
const exit = document.querySelector(".exit");

// =====================
// API URL
// =====================
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://ecommerce-1-1h6x.onrender.com";

// =====================
// FUNCIONES UI
// =====================
const abrirCerrar = (e, d) => {
    if (d.style.display === "flex") d.style.display = "none";
    e.style.display = (e.style.display === "none" || e.style.display === "") ? "flex" : "none";
};

if (userRole === "admin") iconoAdmin.style.display = "flex";

iconoAdmin.addEventListener("click", () => abrirCerrar(panelAdmin, panelOpciones));
exit.addEventListener("click", () => { if (panelAdmin.style.display === "flex") panelAdmin.style.display = "none"; });
exitUser.addEventListener("click", () => { if (panelOpciones.style.display === "flex") panelOpciones.style.display = "none"; });

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    window.location.href = "../index.html"; 
};
cerrarSesion.addEventListener("click", logout);

if (userName) {
    nameUser.innerText = `¡Hola ${userName}!`;
    nameUser.style.display = "flex";
} else {
    loginLink.style.display = "flex";
}

nameUser.addEventListener("click", () => abrirCerrar(panelOpciones, panelAdmin));

// =====================
// CARGAR PRODUCTOS
// =====================
export const cargarProductos = async () => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        const conteinerCard = document.getElementById("card-conteiner");
        conteinerCard.innerHTML = ""; // limpiar contenedor

        data.products.forEach(p => {
            const card = document.createElement("a");
            card.href = `./pages/product.html?id=${p._id}`;
            card.classList.add("card");

            const imagen = document.createElement("img");
            // Manejar imagen local o URL externa
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

// =====================
// BUSCADOR
// =====================
const input = document.getElementById("buscador");
const resultados = document.getElementById("conteiner-resultados");

const buscar = async (query) => {
    try {
        const res = await fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        resultados.innerHTML = ""; // limpiar resultados

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
// INICIALIZAR
// =====================
cargarProductos();
