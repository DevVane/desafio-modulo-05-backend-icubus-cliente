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

rotas.get('/clientes', clientes.obterCliente);
rotas.put('/clientes', clientes.editarDadosCliente);
rotas.post('/clientes/enderecos', clientes.cadastrarEnderecoCliente);



module.exports = rotas;