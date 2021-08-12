const yup = require('./yup');
const phone = require('yup-phone');


const clienteSquema = yup.object().shape({
    nome: yup.string().max(100).trim().required(),
    email: yup.string().max(100).email().required(),
    telefone: yup.string().max(25).trim().phone("BR", true, '${path} deve ser um número de telefone válido para região BR').required(),
    senha: yup.string().trim().required()
 
})


module.exports = {
    clienteSquema
};