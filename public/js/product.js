// Leer carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// Lee el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);


const productId = params.get("id");
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://ecommerce-1-1h6x.onrender.com";


const conteinerCard = document.getElementById("card-conteiner")
const dataProduct = document.getElementById("data-product")

async function cargarProducto() {
    try {
        const res = await fetch(`${API_URL}/api/products/${productId}`);
        const data = await res.json();
        console.log(data)
        const producto = data.producto

        if (producto) {
            //imagen del producto
            const imagen = document.createElement("img");
            imagen.src = `../images/${producto.image}`;        
            imagen.alt = `${producto.name}`;
            //nombre del producto
            const nameProduct = document.createElement("h2");
            nameProduct.textContent = `${producto.name}`;
            nameProduct.classList.add("data-title")
            //precio del producto
            const priceProduct = document.createElement("h3");
            priceProduct.textContent = `$${producto.price}`;
            priceProduct.classList.add("data-price")

            //seccion talle
            const sizeTitle = document.createElement("p");
            sizeTitle.textContent = "seleccione su talle";
            //creamos el contenedor donde pondremos los btns sizes
            const sizesDiv = document.createElement("div"); 
            sizesDiv.classList.add("sizes");

            let selectedSize = null;
            //recorremos los sizes para ver cual hay disponibles
            producto.sizes.forEach(s => {
            const btn = document.createElement("button");
            btn.textContent = s.size;
            btn.classList.add("btn-size");

            if (s.stock === 0) {
                btn.disabled = true; // deshabilita botón
                btn.classList.add("no-stock");
            } else {
                btn.classList.add("in-stock");
            }
            btn.addEventListener("click", () => {
                selectedSize = s.size;
                // resaltar el botón elegido
                document.querySelectorAll(".btn-size").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
            });
            btn.classList.add("btn");
            sizesDiv.appendChild(btn);
        });

        //titulo cantidad
        const titleCantidad = document.createElement("p")
        titleCantidad.textContent = "seleccione la cantidad";
        // Contenedor elegir la cantidad
        const cantidadDiv = document.createElement("div");
        cantidadDiv.classList.add("cantidad");
        // Botón - MENOS
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        // Input cantidad
        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.min = 1;
        cantidadInput.value = 1;
        // Botón + MAS
        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        // Eventos
        btnMenos.addEventListener("click", () => {
            if (cantidadInput.value > 1) {
            cantidadInput.value--;
            }
        });
        btnMas.addEventListener("click", () => {
            cantidadInput.value++;
        });
        // Agregamos todo al contenedor
        cantidadDiv.appendChild(btnMenos);
        cantidadDiv.appendChild(cantidadInput);
        cantidadDiv.appendChild(btnMas);


        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "Agregar al carrito";
        btnAgregar.classList.add("btn-agregar")

        const agregarAlCarrito = async (producto) => {
            if (selectedSize === null) {
                alert("no seleccionaste el talle")
                return
            }
            // Crear objeto con los datos que necesitás
            const item =  {
                id: producto._id,
                name: producto.name,
                price: producto.price,
                image: producto.image,
                quantity: cantidadInput.value,
                size: selectedSize
            };
            // Agregar al carrito
            carrito.push(item);
            // Guardar en localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Mostrar en consola
            console.log("Producto agregado:", item.name);
            console.log("Carrito:", carrito);
            //redireccionamos al carrito
            window.location.href = "./carrito.html"; // redirigir a tu home
        }
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto)
        });

        //los añadimos a los contenedores
        conteinerCard.appendChild(imagen)
        dataProduct.appendChild(nameProduct);
        dataProduct.appendChild(priceProduct);
        dataProduct.appendChild(sizeTitle);
        dataProduct.appendChild(sizesDiv); 
        dataProduct.appendChild(titleCantidad)
        dataProduct.appendChild(cantidadDiv);
        dataProduct.appendChild(btnAgregar)
        }
    } catch (error) {
        console.error(error)
    }
}

cargarProducto();