const express = require("express");
const router = express.Router();
const amazonController = require("../controllers/amazonController");

router.get("/clientes", amazonController.getAllClientes);
router.post("/clientes", amazonController.addClient);
router.get("/clientes/:id", amazonController.getClientById);
router.delete("/clientes/:id", amazonController.deleteCliente);

router.post("/pedidos", amazonController.addPedido); // Asegúrate de que esta línea esté correcta

module.exports = router;