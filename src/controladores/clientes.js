const bcrypt = require('bcrypt');
const knex = require('../bancodedados/conexao');
const { clienteSquema, clienteEditarDadosSquema, enderecoSquema } = require('../validacoes/clienteSchema');

async function obterCliente(req, res){
    const { cliente } = req;

    return res.status(200).json({ cliente });
}

async function obterEnderecoCliente(req, res){
    const { cliente } = req;

    try {
        const endereco = await knex('endereco')
            .where({ cliente_id: cliente.id })
            .first();

        if (!endereco) {
            return res.status(404).json('Ops, ainda não há endereço cadastrado pra esse cliente');
        }

        return res.status(200).json(endereco);

    } catch (error) {
        return res.status(400).json(error.message);
    }
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

async function cadastrarEnderecoCliente(req, res){
    const { cliente } = req;
    const { cep, endereco, complemento} = req.body;
    
    try {
        await enderecoSquema.validate(req.body);

        const enderecoCadastrado = await knex('endereco')
            .insert({ cep, endereco, complemento, cliente_id: cliente.id})
            .returning('*');

        if (!enderecoCadastrado) {
            return res.status(400).json('Não foi possível cadastrar o endereço do cliente');
        } 

        return res.status(201).json('Endereço cadastrado com sucesso.');
   
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
    obterEnderecoCliente,
    cadastrarCliente,
    cadastrarEnderecoCliente,
    editarDadosCliente    
}