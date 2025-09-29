export function initAdminUI(userRole, abrirCerrar) {
    const iconoAdmin   = document.getElementById("icono-admin");
    const panelAdmin   = document.getElementById("panel-admin");
    const exit         = document.querySelector(".exit");
    const panelOpciones  = document.getElementById("panel-opciones");

    if (!iconoAdmin || !panelAdmin || !panelOpciones || !exit) return;

    if (userRole === "admin") {
        iconoAdmin.style.display = "flex";
    }

    iconoAdmin.addEventListener("click", () => abrirCerrar(panelAdmin, panelOpciones));
    exit.addEventListener("click", () => panelAdmin.style.display = "none");
}
