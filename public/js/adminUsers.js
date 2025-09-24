const token = localStorage.getItem("token");
const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://ecommerce-1-1h6x.onrender.com"; // URL de Render
    
const conteinerCard = document.getElementById("card-conteiner")

const cargarUsuarios = async () => {
    const res = await fetch(`${API_URL}/api/users`)
    const data = await res.json()
console.log(data)

    data.users.forEach( user => {
        const card = document.createElement("div")
        card.classList.add("card")

        const idUser = document.createElement("h3")
        idUser.textContent = `ID: ${user._id}`
        const nameUser = document.createElement("p")
        nameUser.textContent = `Nombre: ${user.name}`
        const emailUser = document.createElement("p")
        emailUser.textContent =`Email: ${user.email}`
        const roleUser = document.createElement("p")
        roleUser.textContent = `Rol: ${user.role }`

        card.appendChild(idUser)
        card.appendChild(nameUser)
        card.appendChild(emailUser)
        card.appendChild(roleUser)

        conteinerCard.appendChild(card)
    })
    
}

cargarUsuarios()