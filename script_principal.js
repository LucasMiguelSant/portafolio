const toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});
fetch("https://fastapi-backend.onrender.com/proyectos")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

function cargarProyectos() {
    fetch("proyectos.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("No se pudo cargar proyectos.json");
            }
            return res.json();
        })
        .then(proyectos => {
            const frame = document.getElementById("Frame_de_proyectos");

            proyectos.forEach((p, i) => {
                // Crear el contenedor del proyecto
                const div = document.createElement("div");
                div.classList.add("proyecto");

                // Hacerlo clickeable
                div.onclick = () => {
                    location.href = p.ruta;
                };

                // Título del proyecto (puedes cambiar el texto si quieres)
                const h4 = document.createElement("h4");
                h4.textContent = `${p.nombre}`;

                // (Opcional) descripción placeholder
                const pDesc = document.createElement("p");
                pDesc.textContent = "Haz clic para ver más detalles.";

                // Insertar elementos
                div.appendChild(h4);
                div.appendChild(pDesc);
                frame.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
        });
}
window.addEventListener("load", cargarProyectos);



