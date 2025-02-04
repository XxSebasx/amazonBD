const Cliente = require('./Cliente');
const Pedido = require('./Pedido');
Cliente.hasMany(Pedido, { foreignKey: 'clienteID' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteID' });

module.exports = {
    Cliente,
    Pedido
};