const express = require('express');

const clientes = require('./controladores/clientes');

const rotas = express();

//cadastro de usuario/cliente
rotas.post('/clientes', clientes.cadastrarCliente);

module.exports = rotas;