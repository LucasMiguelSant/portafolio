const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Función para cargar proyectos desde tu backend en Render
function cargarProyectos() {
    fetch("https://fastapi-backend.onrender.com/proyectos")
        .then(res => {
            if (!res.ok) {
                throw new Error("No se pudo cargar proyectos desde el backend");
            }
            return res.json();
        })
        .then(proyectos => {
            const frame = document.getElementById("Frame_de_proyectos");

            // Limpiar antes de renderizar
            frame.innerHTML = "";

            proyectos.forEach((p) => {
                // Crear el contenedor del proyecto
                const div = document.createElement("div");
                div.classList.add("proyecto");

                // Hacerlo clickeable
                div.onclick = () => {
                    location.href = p.url; // usa "url" del backend
                };

                // Título del proyecto
                const h4 = document.createElement("h4");
                h4.textContent = p.nombre;

                // Descripción placeholder
                const pDesc = document.createElement("p");
                pDesc.textContent = "Haz clic para ver más detalles.";

                // Insertar elementos
                div.appendChild(h4);
                div.appendChild(pDesc);
                frame.appendChild(div);
            });
        })
        .catch(err => {
            console.error("Error:", err);
            alert("No se pudo cargar la lista de proyectos.");
        });
}

// Ejecutar al cargar la página
window.addEventListener("load", cargarProyectos);
