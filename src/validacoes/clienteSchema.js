const yup = require('./yup');

const clienteSquema = yup.object().shape({
    nome: yup.string().max(100).trim().required(),
    email: yup.string().max(100).email().required(),
    telefone: yup.string().max(25).trim(),
    senha: yup.string().trim().required()
 
})


module.exports = {
    clienteSquema
};