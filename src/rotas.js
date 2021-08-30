const express = require('express');

const clientes = require('./controladores/clientes');
const loginControlador = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const restaurantes = require('./controladores/restaurantes');

const rotas = express();

rotas.post('/clientes', clientes.cadastrarCliente);

rotas.post('/login', loginControlador.logarCliente);

rotas.use(verificaLogin);

rotas.get('/restaurantes', restaurantes.listarRestaurantes);
rotas.get('/restaurantes/:id', restaurantes.obterRestaurante);
rotas.get('/restaurantes/:id/produtos/ativos', restaurantes.listarProdutosAtivos);
rotas.get('/restaurantes/:id/produtos/:idProduto', restaurantes.obterProduto);
rotas.get('/restaurantes/:id/acompanhamento-pedido', restaurantes.obterUltimoPedidoNaoEntregue);
rotas.post('/restaurantes/:id/finalizar-pedido', restaurantes.finalizarPedido);

rotas.get('/pedidos/nao-entregues', restaurantes.listarPedidosNaoEntregues);
rotas.post('/pedidos/:id/entregue', restaurantes.definirPedidoComoEntregue);

rotas.get('/clientes', clientes.obterCliente);
rotas.get('/clientes/enderecos', clientes.obterEnderecoCliente);
rotas.put('/clientes', clientes.editarDadosCliente);
rotas.post('/clientes/enderecos', clientes.cadastrarEnderecoCliente);


module.exports = rotas;