const yup = require('./yup');
const phone = require('yup-phone');


const clienteSquema = yup.object().shape({
    nome: yup.string().max(100).trim().required(),
    email: yup.string().max(100).email().required(),
    telefone: yup.string().max(25).trim().phone("BR", true, 'Informe um número de telefone válido. DDD + os 9 digitos').required(),
    senha: yup.string().trim().required()
 
});

const clienteEditarDadosSquema = yup.object().shape({
    nome: yup.string().max(100).required().trim(),
    email: yup.string().max(100).email().required(),
    senha: yup.string().trim(),
    telefone: yup.string().max(25).trim().phone("BR", true, 'Informe um número de telefone válido. DDD + os 9 digitos').required(),
})

const enderecoSquema = yup.object().shape({
    cep: yup.string().max(25).required(),
    endereco: yup.string().max(200).trim().required(),
    complemento: yup.string().max(100),
})


module.exports = {
    clienteSquema,
    clienteEditarDadosSquema,
    enderecoSquema
};