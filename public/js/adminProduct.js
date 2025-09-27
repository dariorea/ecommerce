const token = localStorage.getItem("token"); // 👈 Solo admins deberían tener acceso

const iconoAdmin = document.getElementById("icono-admin");
const formAgregar = document.getElementById("form-agregar");
const formEliminar = document.getElementById("form-eliminar");
const formActualizar = document.getElementById("form-actualizar");
const panel = document.getElementById("panel-admin");


const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com";


//para abrir y cerrar las opciones admin
iconoAdmin.addEventListener("click", () => {
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block"; // abrir
    } else {
        panel.style.display = "none"; // cerrar
    }
});


//mostrar o cerrar el formulario agregar
document.getElementById("agregar-producto").addEventListener("click", () => {
    formEliminar.style.display = "none";
    formActualizar.style.display = "none";
    if (formAgregar.style.display === "none" || formAgregar.style.display === "") {
        formAgregar.style.display = "flex";
    } else {
        formAgregar.style.display = "none";
    }
})
//mostrar o cerrar el formulario eliminar
document.getElementById("eliminar-producto").addEventListener("click", ()=> {
    formAgregar.style.display = "none";
    formActualizar.style.display = "none";
    if (formEliminar.style.display === "none" || formEliminar.style.display === "") {
        formEliminar.style.display = "flex";
    } else {
        formEliminar.style.display = "none";
    }
})
//mostrar o cerrar el formulario actualizar
document.getElementById("actualizar-producto").addEventListener("click", ()=> {
    formEliminar.style.display = "none";
    formAgregar.style.display = "none";
    if (formActualizar.style.display === "none" || formActualizar.style.display === "") {
        formActualizar.style.display = "flex";
    } else {
        formActualizar.style.display = "none";
    }
})

//AGREGAR PRODUCTO

document.getElementById("form-agregar").addEventListener("submit", async(e)=> {
    e.preventDefault()
    const producto = {
        name: document.getElementById("name-agregar").value,
        price: document.getElementById("price-agregar").value,
        image: document.getElementById("img-agregar").value,
        sizes: [
            { size: "S", stock: parseInt(document.getElementById("stock-s").value) },
            { size: "M", stock: parseInt(document.getElementById("stock-m").value) },
            { size: "L", stock: parseInt(document.getElementById("stock-l").value) },
            { size: "XL", stock: parseInt(document.getElementById("stock-xl").value)}
        ]
    };
    try {
        const res = await fetch(`${API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(producto)
        });
        const data = await res.json();
        alert("✅ Producto agregado: " + data.producto.name);
        window.location.reload()
    } catch (error) {
        alert("no se pudo agregar a la db", error)
    }
})
//eliminar producto de la base de datos
document.getElementById("form-eliminar").addEventListener("submit", async(e)=> {
    e.preventDefault()
    const id = document.getElementById("id-eliminar").value
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if (res.status === 204) {
            alert("✅ Producto eliminado correctamente");
        } else {
            const data = await res.json();
            alert(`✅ Producto eliminado: ${data.name || data.message}`);
        }
        window.location.reload()
    } catch (error) {
        console.error(error);
        alert("❌ Error al eliminar producto");
    }
})
document.getElementById("form-actualizar").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("id-update").value

    const updateData = {};

    // Solo agregar campos si tienen valor
    const name = document.getElementById("name-update").value;
    if (name) updateData.name = name;

    const price = document.getElementById("price-update").value;
    if (price) updateData.price = parseFloat(price);

    const image = document.getElementById("img-update").value;
    if (image) updateData.image = image;

    // Agregar solo talles con stock válido
    const sizes = [];
    const sStock = parseInt(document.getElementById("s-update").value);
    if (!isNaN(sStock)) sizes.push({ size: "S", stock: sStock });

    const mStock = parseInt(document.getElementById("m-update").value);
    if (!isNaN(mStock)) sizes.push({ size: "M", stock: mStock });

    const lStock = parseInt(document.getElementById("l-update").value);
    if (!isNaN(lStock)) sizes.push({ size: "L", stock: lStock });

    const xlStock = parseInt(document.getElementById("xl-update").value);
    if (!isNaN(xlStock)) sizes.push({ size: "XL", stock: xlStock });

    if (sizes.length > 0) updateData.sizes = sizes;

    console.log("Datos a enviar:", updateData);

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
        });

        const data = await res.json();
        if (res.ok) {
            alert("✅ Producto actualizado: " + data.productUpdate.name);
        } else {
            alert("❌ Error: " + data.mensaje + " -> " + (data.error || ""));
        }
        window.location.reload();
    } catch (error) {
        console.error(error);
        alert("❌ Error al actualizar producto");
    }
});


export const cargarProductos = async () => {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    const conteinerCard = document.getElementById("card-conteiner")

    data.products.forEach(p => {
        const card = document.createElement("div")
        card.classList.add("card")

        const imagen = document.createElement("img");
        imagen.src = `../images/${p.image}`;        
        imagen.alt = `${p.name}`;

        const nameProduct = document.createElement("h3");
        nameProduct.textContent = `${p.name}`;
        nameProduct.classList.add("card-title")

        const idProduct = document.createElement("h3");
        idProduct.textContent = `Item ID: ${p._id}`
        idProduct.classList.add("card-item")

        const priceProduct = document.createElement("h3");
        priceProduct.textContent = `precio: $${p.price}`;
        priceProduct.classList.add("card-price");

        const sizesDiv = document.createElement("div"); 
        sizesDiv.classList.add("sizes");

        p.sizes.forEach(s => {
            const btn = document.createElement("h3");
            btn.textContent = `talle: ${s.size} (stock: ${s.stock})`;
            btn.classList.add("btn-size");
            sizesDiv.appendChild(btn)
        })

        card.appendChild(imagen);
        card.appendChild(nameProduct);
        card.appendChild(idProduct)
        card.appendChild(priceProduct);
        card.appendChild(sizesDiv)

        conteinerCard.appendChild(card)
    });
}
cargarProductos()