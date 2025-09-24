//token data
const userName = localStorage.getItem("userName");
const userRole = localStorage.getItem("role");
const exitUser = document.querySelector(".exit-user")


const iconoAdmin = document.getElementById("icono-admin");
const loginLink = document.getElementById("icono-registrar");
const nameUser = document.getElementById("name-user")
const cerrarSesion = document.getElementById("cerrar-sesion");
const panelAdmin = document.getElementById("panel-admin");
const panelOpciones = document.getElementById("panel-opciones");
const exit = document.querySelector(".exit");

// url
const API_URL = window.location.hostname === "localhost"
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com"; // URL de Render




const abrirCerrar = (e, d) => {
    if (d.style.display === "flex") {
        d.style.display = "none"
    }
    if (e.style.display === "none" || e.style.display === "") {
        e.style.display = "flex"; // abrir
    } else {
        e.style.display = "none"; // cerrar
    }
}

if (userRole === "admin") {
    iconoAdmin.style.display = "block";
}
iconoAdmin.addEventListener("click", () => {
    abrirCerrar(panelAdmin, panelOpciones)
});
exit.addEventListener("click", () => {
    if (panelAdmin.style.display === "flex") {
    panelAdmin.style.display = "none";
    }
})
exitUser.addEventListener("click", () => {
    if (panelOpciones.style.display === "flex") {
        panelOpciones.style.display = "none";
        }
})

const logout = () => {
    // Borrar token y datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("role")
    localStorage.removeItem("userEmail")
    // Redirigir al login o inicio
    window.location.href = "../index.html"; 
}
cerrarSesion.addEventListener("click", logout)


if (userName) {
    nameUser.innerText =`¡Hola ${userName}!`
    nameUser.style.display = "block";
} else {
    loginLink.style.display = "block";
}


nameUser.addEventListener("click", () => {
    abrirCerrar(panelOpciones, panelAdmin)
})

export const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    const conteinerCard = document.getElementById("card-conteiner")

    data.products.forEach(p => {
        const card = document.createElement("a")
        card.href = `./pages/product.html?id=${p._id}`;  
        card.classList.add("card")

        const imagen = document.createElement("img");
        imagen.src = `${API_URL}/images/${p.image}`;        
        imagen.alt = `${p.name}`;

        const nameProduct = document.createElement("h3");
        nameProduct.textContent = `${p.name}`;
        nameProduct.classList.add("card-title")

        const priceProduct = document.createElement("h2");
        priceProduct.textContent = `$${p.price}`;
        priceProduct.classList.add("card-price");

        

        card.appendChild(imagen);
        card.appendChild(nameProduct);
        card.appendChild(priceProduct);

        conteinerCard.appendChild(card)
    });
}

const input = document.getElementById("buscador");
const resultados = document.getElementById("conteiner-resultados");

const buscar = async (query) => {
    try {
        const res = await fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log("respuesta del backend:", data);
        // limpiar resultados previos
        resultados.innerHTML = "";
        data.products.forEach(item => {
        const li = document.createElement("div");
        li.classList.add("card-resultados")
        li.innerHTML = `
            <img src= ${API_URL}/images/${item.image} alt=${item.name}></img>
            <a href=${API_URL}/pages/product.html?id=${item._id}>${item.name}</a>
        ` // depende de tu modelo
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
        if (valor.length > 0) {
            buscar(valor);
        } else {
            resultados.innerHTML = "";
        }
    }, 300); // espera 300ms después de escribir
});


cargarProductos()
