// Recuperar token guardado al iniciar sesión
const token = localStorage.getItem("token");

let isRegister = false;

function toggleForm() {
    isRegister = !isRegister;
    document.getElementById("form-title").textContent = isRegister ? "Registro" : "Iniciar Sesión";
    document.getElementById("name").style.display = isRegister ? "block" : "none";
    document.getElementById("submit-btn").textContent = isRegister ? "Registrarse" : "Entrar";
    document.querySelector(".toggle").textContent = isRegister 
    ? "¿Ya tienes cuenta? Inicia sesión" 
    : "¿No tienes cuenta? Regístrate";
}

document.getElementById("submit-btn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password || (isRegister && !name)) {
        alert("Por favor completa todos los campos");
        return;
    }

    const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3000"
    : "https://ecommerce-1-1h6x.onrender.com";




    const url = isRegister 
    ? `${API_URL}/api/auth/register`
    : `${API_URL}/api/auth/login`;

    const body = isRegister ? { name, email, password } : { email, password };

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    const data = await res.json();

    if (res.ok && !isRegister) {
      // Guardamos token y userId
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email)
        localStorage.setItem("role", data.user.role)

        alert("✅ Bienvenido " + data.user.name);
        window.location.href = "../index.html"; // redirigir a tu home
    } else if (res.ok && isRegister) {
        alert("✅ Registro exitoso, ahora inicia sesión");
        toggleForm();
    } else {
        alert("❌ Error: " + (data.error || "Algo salió mal"));
    }
    } catch (error) {
        console.error(error);
        alert("❌ Error de conexión");
    }
});
