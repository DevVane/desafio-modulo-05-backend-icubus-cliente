const bcrypt = require('bcrypt');
const knex = require('../bancodedados/conexao');
const { clienteSquema, clienteEditarDadosSquema } = require('../validacoes/clienteSchema');

async function obterCliente(req, res){
    const { cliente } = req;

    return res.status(200).json({ cliente });
}

async function cadastrarCliente(req, res){
    const { nome, email, telefone, senha} = req.body;
    
    try {
        await clienteSquema.validate(req.body);

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

async function editarDadosCliente(req, res){
    const { id: clienteId } = req.cliente;
    const { nome, email, telefone } = req.body;
    let { senha } = req.body;


    try {
        await clienteEditarDadosSquema.validate(req.body); 

        const emailEncontrado = await knex('cliente').where({ email }).first();
        
        if (emailEncontrado && (emailEncontrado.id != clienteId)) {
            return res.status(400).json('Já existe cliente cadastrado com esse email');
        }

        cliente = await knex('cliente').where({ id: clienteId }).first();

        let senhaCriptografada;
        if(!senha) {
            senhaCriptografada = cliente.senha;
        } else {
            senhaCriptografada = await bcrypt.hash(senha, 10);
        }

        const clienteAtualizado = await knex('cliente')
            .update({ nome, email, telefone, senha: senhaCriptografada})
            .where({ id: clienteId });

        if (!clienteAtualizado) {
            return res.status(400).json('Não foi possível atualizar os dados do cliente');
        }
        
        return res.status(201).json('Cliente atualizado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    obterCliente,
    cadastrarCliente,
    editarDadosCliente   
}