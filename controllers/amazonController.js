const { Cliente, Pedido } = require("../models/relacion");

module.exports = {
    async getAllClientes(req, res) {
        try {
            const clientes = await Cliente.findAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addClient(req, res) {
        try {
            const { nombre, email, telefono } = req.body;
            console.log(nombre, email, telefono);
            const nuevoCliente = await Cliente.create({ nombre, email, telefono });
            res.json(nuevoCliente);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getClientById(req, res) {
        console.log(req.params.id);
        const cliente = await Cliente.findOne({
            where: { ID: req.params.id },
            include: {
                model: Pedido,
                where: { clienteID: req.params.id },
                required: true
            }
        });
        console.log(cliente);
        res.json(cliente);
    },

    async deleteCliente(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);
            if (!cliente) return res.status(404).json({ message: "Cliente no encontrado" });
            await cliente.destroy();
            res.json({ message: "Cliente eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addPedido(req, res) { 
        try {
            const { clienteID, fecha, monto, estado } = req.body;
            const nuevoPedido = await Pedido.create({ clienteID, fecha, monto, estado });
            res.json(nuevoPedido);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getPedidos(req,res){
        try {
            const pedidos = await Pedido.findAll(
                {
                    include: [{
                        model: Cliente,
                        attributes: ['nombre']
                    }]
                }
            );
            res.json(pedidos);
            
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    async getPedidoById(req,res){
        const pedido = await Pedido.findByPk(req.params.id,
            {
                include:{
                    model: Cliente
                }
            }
        );
        res.json(pedido);
    },

    async updateEstadoPedido(req,res){
        try {
            const pedido = await Pedido.findByPk(req.params.id);
            pedido.estado = req.body.estado;
            await pedido.save();
            res.json(pedido);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deletePedido(req,res){
        try {
            const pedido = await Pedido.findByPk(req.params.id);
            await pedido.destroy();
            res.json({ message: "Pedido eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};