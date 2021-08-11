const bcrypt = require('bcrypt');
const knex = require('../bancodedados/conexao');

async function cadastrarCliente(req, res){
    const { nome, email, telefone, senha} = req.body;
    
    try {
        const emailEncontrado = await knex('cliente').where({ email }).first();

        if (emailEncontrado) {
            return res.status(400).json('Já existe cliente cadastrado com esse email');
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const cliente = await knex('cliente')
            .insert({ nome, email, telefone, senha: senhaCriptografada})
            .returning('*');

        if (!cliente) {
            return res.status(400).json('Não foi possível cadastrar o cliente');
        } 

        return res.status(201).json('Cliente cadastrado com sucesso.');
   
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarCliente   
}