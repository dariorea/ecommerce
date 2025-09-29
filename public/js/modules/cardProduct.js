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

// FUNCION ABRIR, CERRAR
// =====================
// FUNCIONES AUXILIARES (UI)
// =====================

// Mostrar/ocultar paneles
export const abrirCerrar = (mostrar, ocultar) => {
    if (ocultar.style.display === "flex") ocultar.style.display = "none";
    mostrar.style.display = (mostrar.style.display === "none" || mostrar.style.display === "") 
    ? "flex" 
    : "none";
};


// =====================
// Buscador reutilizable
// =====================
export const initBuscador = ({ inputId, resultadosId, apiUrl }) => {
    const input = document.getElementById(inputId);
    const resultados = document.getElementById(resultadosId);

    if (!input || !resultados) return; // seguridad: si no existe, no rompe

    const buscar = async (query) => {
        try {
            const res = await fetch(`${apiUrl}/api/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();

            resultados.innerHTML = ""; 

            data.products.forEach(item => {
                const li = document.createElement("div");
                li.classList.add("card-resultados");
                li.innerHTML = `
                    <img src="${item.image.startsWith("http") ? item.image : `${apiUrl}/images/${item.image}`}" alt="${item.name}">
                    <a href="./pages/product.html?id=${item._id}">${item.name}</a>
                `;
                resultados.appendChild(li);
            });
        } catch (error) {
            console.error("Error al buscar:", error);
        }
    };

    // Debounce con timeout
    let timeout;
    input.addEventListener("input", (e) => {
        clearTimeout(timeout);
        const valor = e.target.value.trim();

        timeout = setTimeout(() => {
            if (valor.length > 0) buscar(valor);
            else resultados.innerHTML = "";
        }, 300);
    });
}
