import { crearCardProducto } from "./modules/cardProduct.js";
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com";

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