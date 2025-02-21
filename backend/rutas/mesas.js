const express = require("express");
const router = express.Router();
const { obtenerMesas, reservarMesa } = require("../logica/mesasLogica");

// Ruta para obtener todas las mesas
router.get("/", async (req, res) => {
    try {
        const mesas = await obtenerMesas();
        res.json(mesas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener mesas" });
    }
});

// Ruta para reservar una mesa
router.post("/reservar/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await reservarMesa(id);
        if (resultado) {
            res.json({ mensaje: `Mesa ${id} reservada con éxito` });
        } else {
            res.status(400).json({ error: "La mesa ya está reservada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al reservar la mesa" });
    }
});

module.exports = router;
