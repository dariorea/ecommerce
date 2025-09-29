import { API_URL } from "./config.js";
import { crearCardProducto } from "./modules/cardProduct.js";

const conteinerProducts = document.querySelector(".card-conteiner")
const category = conteinerProducts.dataset.category
const subcategory = conteinerProducts.dataset.subcategory

const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    const products = data.products
    
    products.forEach(p => {
        if(p.category === category || p.subcategory === subcategory) {
            const card = crearCardProducto(p, API_URL)
            conteinerProducts.appendChild(card);
        }
    });
}
cargarProductos()