import { API_URL } from "./config.js";
import { logout } from "./admin/auth.js"
import { crearCardProducto,abrirCerrar, initBuscador } from "./modules/cardProduct.js";
import { initUserUI, userRole, userName} from "./modules/user.js";
import { initAdminUI } from "./modules/adminUi.js";


initUserUI(userName, abrirCerrar, logout)
initAdminUI(userRole, abrirCerrar)

initBuscador({
    inputId: "buscador",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
})
initBuscador({
    inputId: "buscador-dos",
    resultadosId: "conteiner-resultados",
    apiUrl: API_URL
})

const conteinerProducts = document.querySelector(".card-conteiner")
const category = conteinerProducts.dataset.category
const subcategory = conteinerProducts.dataset.subcategory

const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    const products = data.products
    
    products.forEach(p => {
        if (category === "kids" && p.category === "unisex" && p.type === "nokids") {
            return
        }
        if(p.category === category || p.category === "unisex" || p.subcategory === subcategory) {
            const card = crearCardProducto(p, API_URL)
            conteinerProducts.appendChild(card);
        }
    });
}
cargarProductos()