const express = require('express');

const clientes = require('./controladores/clientes');
const loginControlador = require('./controladores/login');


const rotas = express();

//cadastro de usuario/cliente
rotas.post('/clientes', clientes.cadastrarCliente);

//login
rotas.post('/login', loginControlador.logarCliente);

module.exports = rotas;