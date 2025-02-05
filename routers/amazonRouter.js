const express = require("express");
const router = express.Router();
const amazonController = require("../controllers/amazonController");

router.get("/clientes", amazonController.getAllClientes);
router.post("/clientes", amazonController.addClient);
router.get("/clientes/:id", amazonController.getClientById);
router.delete("/clientes/:id", amazonController.deleteCliente);

router.post("/pedidos", amazonController.addPedido);
router.get("/pedidos", amazonController.getPedidos);
router.get("/pedidos/:id", amazonController.getPedidoById);
router.put("/pedidos/:id/estado", amazonController.updateEstadoPedido);
router.delete("/pedidos/:id", amazonController.deletePedido);

router.get("/clientescompendidos", amazonController.clientesconpedidos);

router.get("/pedidos/:fecha", amazonController.getpedidosByDate);




module.exports = router;