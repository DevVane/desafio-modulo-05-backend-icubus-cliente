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

module.exports = rotas;