import { API_URL } from "./config";
const mp = new MercadoPago("APP_USR-070dada1-0f66-488e-a24d-6b0514d2357b", { locale: "es-AR" });

export const pagar = async() => {
    const res = await fetch(`${API_URL}/create_preference`, {
        method: "POST",
    });
    const data = await res.json();

    mp.checkout({
        preference: {
            id: data.id, // viene del backend
        },
        render: {
            container: "#button-checkout", // div donde se renderiza el botón
            label: "Pagar con Mercado Pago", // texto del botón
        },
    });
}
pagar();
