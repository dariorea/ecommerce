import { API_URL } from "./config.js";
const token = localStorage.getItem("token");

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

        card.append(idUser, nameUser, emailUser, roleUser)
        conteinerCard.appendChild(card)
    })
}

cargarUsuarios()