
const iconoAdmin = document.getElementById("icono-admin");
const loginLink = document.getElementById("icono-registrar");
const nameUser = document.getElementById("name-user")
const cerrarSesion = document.getElementById("cerrar-sesion");
const userName = localStorage.getItem("userName");
const userRole = localStorage.getItem("role");
const panelAdmin = document.getElementById("panel-admin");
const panelOpciones = document.getElementById("panel-opciones");
const exit = document.querySelector(".exit");
const exitUser = document.querySelector(".exit-user")

const API_URL = "http://localhost:3000"; 



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





//if (userName) {
//    loginLink.innerHTML = `<p>¡Hola ${userName}!</p>`;  // mostrar el nombre
//    loginLink.href = "#";
//    loginLink.classList.add("name-user") // opcional, no va a login
//} else {
//    loginLink.innerHTML = '<a href="../pages/login.html"><i class="bi bi-person-fill"></i></a>';
//}
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

cargarProductos()
