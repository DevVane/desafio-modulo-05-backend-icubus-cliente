const knex = require('../bancodedados/conexao');

async function listarRestaurantes (req, res) {
    try {
        const restaurantes = await knex('restaurante').returning('*');

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarRestaurantes
}