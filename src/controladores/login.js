const knex = require('../bancodedados/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function logarCliente(req, res) {
    const { email, senha } = req.body;

    try {
        const cliente = await knex('cliente').where({ email }).first();

        if (!cliente) {
            return res.status(404).json('Cliente não encontrado');
        }
        
        const validacaoSenhaBcrypt = await bcrypt.compare(senha, cliente.senha);

        if (!validacaoSenhaBcrypt) {
            return res.status(400).json('Email e senha não confere.');
        }

        const dadosTokenCliente = {
            id: cliente.id,
            email: cliente.email
        }

        const token = jwt.sign(dadosTokenCliente, process.env.SENHA_JWT, { expiresIn: '1d' });

        const { senha: senhaCliente, ...dadosCliente } = cliente;

        return res.status(200).json({
            cliente: dadosCliente,
            token
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    logarCliente
}