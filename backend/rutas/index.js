const express = require("express");
const router = express.Router();

const mesasRoutes = require("./mesas");
const pedidosRoutes = require("./pedidos");

router.use("/mesas", mesasRoutes);
router.use("/pedidos", pedidosRoutes);

module.exports = router;
