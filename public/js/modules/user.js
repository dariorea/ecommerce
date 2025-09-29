// Usuario
export const userName = localStorage.getItem("userName");
export const userRole = localStorage.getItem("role");


export function initUserUI(userName, abrirCerrar, logout) {
    const exitUser     = document.querySelector(".exit-user");
    const loginIcon    = document.getElementById("icono-registrar");
    const cerrarSesion = document.getElementById("cerrar-sesion");
    const nameUser = document.getElementById("name-user");

    if (!exitUser || !loginIcon || !nameUser || !cerrarSesion) return;

    if (userName) {
        nameUser.innerText = `¡Hola ${userName}!`;
        nameUser.style.display = "flex";
    } else {
        loginIcon.style.display = "flex";
    }

    nameUser.addEventListener("click", () => abrirCerrar(panelOpciones, panelAdmin));
    cerrarSesion.addEventListener("click", logout);
    exitUser.addEventListener("click", () => panelOpciones.style.display = "none");
}
