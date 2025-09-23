console.log("hola desde search")
const input = document.getElementById("buscador");
const resultados = document.getElementById("conteiner-resultados");
const API_URL = "http://localhost:3000/api/products/search"; // tu endpoint

// función para consultar la API
const buscar = async (query) => {
  try {
    const res = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`);
    const data = await res.json();
console.log("respuesta del backend:", data);


    // limpiar resultados previos
    resultados.innerHTML = "";

    //if (query === "") {
    //  resultados.style.display = "none";
    //} else {
    //  resultados.style.display = "flex";
    //}
    // mostrar nuevos resultados
    data.products.forEach(item => {
      const li = document.createElement("div");
      li.classList.add("card-resultados")
      li.innerHTML = `
        <img src=../images/${item.image} alt="zapatilla"></img>
        <a href=../pages/product.html?id=${item._id}>${item.name}</a>
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
