# 🛒 Ecommerce API

API RESTful para un sistema de Ecommerce construida con **Node.js**, **Express** y **MongoDB**.  
Permite gestionar usuarios, productos, pedidos y autenticación mediante **JWT**.  

---

## 🚀 Tecnologías

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) para autenticación
- [bcrypt](https://www.npmjs.com/package/bcrypt) para encriptar contraseñas
- [dotenv](https://www.npmjs.com/package/dotenv) para variables de entorno

---

## 📂 Estructura de carpetas

Ecommerce/
│── public/ # Archivos públicos (ej: imágenes)
│ └── images/
│── src/
│ ├── config/ # Configuración de la DB
│ ├── controllers/ # Controladores de la lógica de negocio
│ ├── middlewares/ # Middlewares (auth, errores, etc.)
│ ├── models/ # Modelos de Mongoose
│ ├── routes/ # Rutas de la API
│ └── index.js # Punto de entrada del servidor
│── .env # Variables de entorno
│── package.json
│── README.md

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/ecommerce.git
cd ecommerce

