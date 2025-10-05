import { API_URL } from "./config.js";
import { logout } from "./admin/auth.js"
import { crearCardProducto, abrirCerrar, initBuscador } from "./modules/cardProduct.js";
import { initUserUI, userRole, userName} from "./modules/user.js";
import { initAdminUI } from "./modules/adminUi.js";
// ELEMENTOS DEL DOM ===============================================================
// Carrusel
const images = document.querySelector(".carousel-images");
const totalImages = document.querySelectorAll(".carousel-images a").length;

// EVENTOS admin ====================================================================
initAdminUI(userRole, abrirCerrar)
// EVENTOS user =====================================================================
initUserUI(userName, abrirCerrar, logout)
// FUNCIONES API (Cargar productos) =================================================
const cargarProductos = async () => {
    try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        const producto = data.products

        const conteinerCard = document.getElementById("card-conteiner");
        conteinerCard.innerHTML = ""; 
    
        producto.forEach(p => {
            const card = crearCardProducto(p, API_URL)
            conteinerCard.appendChild(card)
        })
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
};
// Inicializar buscador en esta página ============================================
initBuscador({
    inputId: "buscador",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
});
initBuscador({
    inputId: "buscador-dos",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
});

// ================================================================================
// CARRUSEL =======================================================================
let index = 0;

function showImage(i) {
    index = (i + totalImages) % totalImages;
    images.style.transform = `translateX(-${index * 100}%)`;
}
// Auto-play cada 5 segundos
setInterval(() => showImage(index + 1), 5000);

// ================================================================================
// INICIALIZACIÓN =================================================================
cargarProductos();
