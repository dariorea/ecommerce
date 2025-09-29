export function initAdminUI(userRole) {
    const iconoAdmin   = document.getElementById("icono-admin");
    const panelAdmin   = document.getElementById("panel-admin");
    const panelOpciones= document.getElementById("panel-opciones");
    const exit         = document.querySelector(".exit");

    if (!iconoAdmin || !panelAdmin || !panelOpciones || !exit) return;

    if (userRole === "admin") {
        iconoAdmin.style.display = "flex";
    }

    iconoAdmin.addEventListener("click", () => abrirCerrar(panelAdmin, panelOpciones));
    exit.addEventListener("click", () => panelAdmin.style.display = "none");
}
