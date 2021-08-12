const knex = require('../bancodedados/conexao');
const jwt = require('jsonwebtoken');

async function verificaLogin(req, res, next) {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json('Não autorizado. Recomenda-se fazer login');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.SENHA_JWT);

        const clienteExiste = await knex('cliente').where({ id }).first();

        if(!clienteExiste) {
            return res.status(404).json('Cliente não encontrado');
        }

        const { senha, ...cliente} = clienteExiste;

        req.cliente = cliente;

        next();

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin;