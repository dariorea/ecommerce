const token = localStorage.getItem("token"); // 👈 Solo admins deberían tener acceso
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
? "http://localhost:3000"
: "https://ecommerce-1-1h6x.onrender.com";


const cargarOrdenes = async () => {
    const res = await fetch(`${API_URL}/api/orders`);
    const data = await res.json();
    //const conteinerCard = document.getElementById("cardconteiner")
    console.log(data)
    const container = document.getElementById("cardconteiner"); // un div en tu HTML

    data.orders.forEach(order => {
        const card = document.createElement("div");
        card.className = "card";

        // Header de la orden
        const header = document.createElement("div");
        header.className = "order-header";
        
        const id = document.createElement("p");
        id.innerHTML = `<strong>Orden #</strong>${order._id}`;

        const user = document.createElement("p")
        user.innerHTML = `<strong>Usuario : </strong> ${order.usuario.name}`

        const emailUser = document.createElement("p")
        emailUser.innerHTML = `<strong>Email :</strong> ${order.usuario.email}`
        
        const fecha = new Date(order.createdAt).toLocaleDateString("es-AR");
        const date = document.createElement("p");
        date.innerHTML = `<strong>Fecha:</strong> ${fecha}`;
        
        const status = document.createElement("p");
        status.innerHTML = `<strong>Estado:</strong> Pendiente`;
        
        header.appendChild(id);
        header.appendChild(user)
        header.appendChild(emailUser)
        header.appendChild(date); 
        header.appendChild(status);
        
        // Lista de productos
        const productsDiv = document.createElement("div");
        productsDiv.className = "order-products";
        
        let total = 0;
        order.products.forEach(item => {
            const subtotal = item.product.price * item.quantity;
            total += subtotal;
            
            const productCard = document.createElement("div");
            productCard.className = "product-item";
            
            productCard.innerHTML = `
                <p><strong>Producto:</strong> ${item.product.name}</p>
                <p><strong>Talle:</strong> ${item.size}</p>
                <p><strong>Cantidad:</strong> ${item.quantity}</p>
                <p><strong>Precio unitario:</strong> $${item.product.price}</p>
                <p><strong>Subtotal:</strong> $${subtotal}</p>
            `;
            productsDiv.appendChild(productCard);
        });
        // Total
        const totalDiv = document.createElement("p");
        totalDiv.className = "order-total";
        totalDiv.innerHTML = `<strong>TOTAL:</strong> $${total}`;
        // Armar la card
        card.appendChild(header);
        card.appendChild(document.createElement("hr"));
        card.appendChild(productsDiv);
        card.appendChild(document.createElement("hr"));
        card.appendChild(totalDiv);
        container.appendChild(card);
    })
}
cargarOrdenes()