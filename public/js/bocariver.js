import { API_URL } from "./config.js";
import { crearCardProducto } from "./modules/cardProduct.js";

const conteinerProducts = document.querySelector(".card-conteiner")

const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
console.log("hola")
    data.products.forEach(p => {
        if (conteinerProducts.id === "bover") {
            if( p.type === "boca" || p.type === "river") {
                const card = crearCardProducto(p, API_URL)
                conteinerProducts.appendChild(card)
            }
            return
        }
        if (conteinerProducts.id === "adizero") {
            if(p.type === "adizero") {
                const card = crearCardProducto(p, API_URL)
                conteinerProducts.appendChild(card)   
            }
            return
        }

    });
}
cargarProductos()