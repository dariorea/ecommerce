// =====================
// CREAR CARD PRODUCTO
// =====================
export function crearCardProducto(p, API_URL) {
    const card = document.createElement("a");
    card.href = `${API_URL}/pages/product.html?id=${p._id}`;
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
    return card;
}
