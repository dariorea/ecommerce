import { Router } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";

const router = Router();

// Inicializar MercadoPago con tu Access Token
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-1959254343473188-093022-5cd4c9bf306e5baf30bf88952d6fbf68-455103814"
});

router.post("/create_preference", async (req, res) => {
  try {
    console.log("📥 req.body recibido:", req.body);

    const { products } = req.body;

    // Validar que haya productos
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "No se recibieron productos para crear la preferencia de pago" });
    }

    // Armar items para MercadoPago
    const items = products
      .filter(item => Number(item.quantity) > 0 && Number(item.price) > 0)
      .map(item => ({
        title: item.name || item.title || "Producto sin nombre",
        quantity: Number(item.quantity),
        unit_price: Number(item.price),
        currency_id: "ARS"
      }));

    // Crear la preferencia
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items,
        back_urls: {
            success: "https://ecommerce-1-1h6x.onrender.com/success", // aunque sea temporal
            failure: "https://ecommerce-1-1h6x.onrender.com/failure",
            pending: "https://ecommerce-1-1h6x.onrender.com/pending"
        },
        auto_return: "approved"
      }
    });

    console.log("✅ Preferencia creada:", result.id);

    res.json({ id: result.id }); // <- Esto es lo que tu frontend necesita

  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).json({ error: error.message || "Error interno del servidor" });
  }
});

export default router;
