const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com";

const conteinerProducts = document.querySelector(".card-conteiner")

const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
console.log("hola")
    data.products.forEach(p => {
        if(p.category === conteinerProducts.id) {
            const card = document.createElement("a")
            card.href = `./pages/product.html?id=${p._id}`;  
            card.classList.add("card")
            const imagen = document.createElement("img");
         // Manejar imagen local o URL externa
            imagen.src = p.image.startsWith("http") ? p.image : `${API_URL}/images/${p.image}`;
            imagen.alt = p.name;
            const nameProduct = document.createElement("h3");
            nameProduct.textContent = `${p.name}`;
            nameProduct.classList.add("card-title")
            const priceProduct = document.createElement("h2");
            priceProduct.textContent = `$${p.price}`;
            priceProduct.classList.add("card-price");
            card.appendChild(imagen);
            card.appendChild(nameProduct);
            card.appendChild(priceProduct);
            conteinerProducts.appendChild(card);
        }
    });
}
cargarProductos()