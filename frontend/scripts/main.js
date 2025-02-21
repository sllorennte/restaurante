document.addEventListener("DOMContentLoaded", async function() {
    const contenedor = document.getElementById("mesas-contenedor");

    async function cargarMesas() {
        try {
            const respuesta = await fetch("http://localhost:3000/api/mesas");
            const mesas = await respuesta.json();

            contenedor.innerHTML = ""; // Limpia el contenedor
            mesas.forEach(mesa => {
                const div = document.createElement("div");
                div.classList.add("mesa");
                div.dataset.id = mesa._id;
                div.textContent = mesa.reservada ? `Mesa ${mesa.numero} (Reservada)` : `Mesa ${mesa.numero}`;
                div.style.backgroundColor = mesa.reservada ? "#d9534f" : "#4CAF50";
                div.style.cursor = mesa.reservada ? "not-allowed" : "pointer";

                if (!mesa.reservada) {
                    div.addEventListener("click", async () => reservarMesa(mesa._id));
                }

                contenedor.appendChild(div);
            });

        } catch (error) {
            console.error("Error cargando las mesas:", error);
        }
    }

    async function reservarMesa(id) {
        const confirmar = confirm("¿Quieres reservar esta mesa?");
        if (confirmar) {
            try {
                const respuesta = await fetch(`http://localhost:3000/api/mesas/reservar/${id}`, {
                    method: "POST"
                });
                const data = await respuesta.json();
                
                if (respuesta.ok) {
                    alert(data.mensaje);
                    cargarMesas(); // Recargar las mesas para actualizar el estado
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error("Error al reservar la mesa:", error);
            }
        }
    }

    cargarMesas(); // Cargar las mesas al inicio
});
