const knex = require('../bancodedados/conexao');
const idParamsSquema = require('../validacoes/idParamsSchema');
const { pedidoSquema } = require('../validacoes/pedidoSquema');

async function listarRestaurantes (req, res) {
    try {
        const restaurantes = await knex('restaurante').returning('*');

        return res.status(200).json(restaurantes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterRestaurante (req, res) {
    const { id: restauranteId } = req.params;

    try {
        await idParamsSquema.validate(req.params);

        const restaurante = await knex('restaurante')
            .where({ id: restauranteId })
            .first();
            
        if (!restaurante) {
            return res.status(404).json('Restaurante não encontrado');
        }

        return res.status(200).json(restaurante);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function listarProdutosAtivos (req, res) {
    const { id: restauranteId } = req.params;

    try {
        await idParamsSquema.validate(req.params);

        const produtos = await knex('produto')
            .where({ restaurante_id: restauranteId, ativo: true })
            .returning('*');

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterProduto (req, res) {
    const { id: restauranteId, idProduto } = req.params;

    try {
        await idParamsSquema.validate(req.params);

        const produto = await knex('produto')
            .where({ restaurante_id: restauranteId, id: idProduto })
            .first();
            
        if (!produto) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produto);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function finalizarPedido (req, res){
    const { cliente } = req;
    const { id: restauranteId } = req.params;
    const { produtos, subtotal, taxaEntrega, total} = req.body;
    
    try {
        await idParamsSquema.validate(req.params);
        await pedidoSquema.validate(req.body);

        const restaurante = await knex('restaurante')
            .where({id: restauranteId})
            .first();

        if (!restaurante){
            return res.status(404).json(`O restaurante de id ${restauranteId} não foi encontrado`);
        }

        const valorMinimo = restaurante.valor_minimo_pedido;
        if (restaurante && (total < valorMinimo)){
            const valorMinimoEmReais = (valorMinimo/100).toString().replace(".", ",");
    
            return res.status(400).json(`Para esse restaurante o pedido mínimo é R$ ${valorMinimoEmReais}`);
        }

        const enderecoCadastrado = await knex('endereco')
            .where({cliente_id: cliente.id})
            .first();

        if (!enderecoCadastrado) {
            return res.status(404).json('Ops, ainda não há endereço cadastrado pra esse cliente');
        }

        const produtosEmQtdInsuficiente = produtos.filter(produto => produto.quantidade < 1);
        
        if  (produtosEmQtdInsuficiente.length !== 0) {
            return res.status(400).json('Compre pelo menos uma unidade de cada produto');
        }

        const pedido = await knex('pedido')
            .insert({
                subtotal, 
                taxa_entrega: taxaEntrega, 
                total, 
                restaurante_id: restauranteId,
                cliente_id: cliente.id
            })
            .returning('*');
    
        if (pedido[0].length === 0) {
            return res.status(400).json('Não foi possível finalizar o pedido');
        } 

        for (const produto of produtos) {
            const produtoEncontrado = await knex('produto')
                .where({id: produto.id, restaurante_id: restauranteId})
                .first();
            
            if(!produtoEncontrado){
                return res.status(404).json(`O produto de id ${produto.id} não foi encontrado`);
            }

            const produtoDesativo = await knex('produto')
                .where({id: produto.id, ativo: false})
                .returning('*');
            
            if(produtoDesativo.length !== 0){
                return res.status(400).json(`O produto ${produtoDesativo[0].nome} não está mais disponível`);
            }

            const itensPedido = await knex('itens_pedido')
                .insert({
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    preco_total: produto.precoTotal,
                    pedido_id: pedido[0].id,
                    produto_id: produto.id
                })
                .returning('*');

            if (itensPedido.length === 0) {
                await knex('pedido').del().where({ id: pedido[0].id });

                return res.status(400).json('Não foi possível registrar o pedido com seus itens');
            } 
        } 
        
        return res.status(201).json('Pedido finalizado com sucesso.');
   
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function listarPedidosNaoEntregues (req, res) {
    const { cliente } = req;

    try {
        const pedidos = await knex('pedido')
            .where({cliente_id: cliente.id, foi_entregue: false})
            .orderBy('pedido.id', 'desc')
            .returning('*');
        
        return res.status(200).json(pedidos);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function obterUltimoPedidoNaoEntregue (req, res) {
    const { id: restauranteId} = req.params;

    try {
        await idParamsSquema.validate(req.params);

        const pedido = await knex('pedido')
            .where({ restaurante_id: restauranteId, foi_entregue: false})
            .orderBy('pedido.id', 'desc')
            .first();
            
        if (!pedido) {
            return res.status(404).json('Parece que não há pedidos');
        }

        return res.status(200).json(pedido);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

async function definirPedidoComoEntregue (req, res){
    const { id: pedidoId } = req.params;
    
    try {
        await idParamsSquema.validate(req.params);

        const pedidoAtualizado = await knex('pedido')
            .update({ foi_entregue: true })
            .where({ id: pedidoId});

        if (!pedidoAtualizado) {
            return res.status(404).json('Não foi possível atualizar a propriedade foi_entregue');
        }

        return res.status(200).json('Pedido foi entregue');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    listarRestaurantes,
    obterRestaurante,
    listarProdutosAtivos,
    obterProduto,
    finalizarPedido, 
    listarPedidosNaoEntregues,
    obterUltimoPedidoNaoEntregue,
    definirPedidoComoEntregue
    
}