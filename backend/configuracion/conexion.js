const express = require("express");
const app = express();
const rutas = require("../rutas");


app.use(express.json());
app.use("/api", rutas);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
