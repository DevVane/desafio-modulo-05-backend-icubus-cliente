const yup = require('./yup');

const pedidoSquema = yup.object().shape({
    subtotal: yup.number().integer().required(),
    taxaEntrega: yup.number().integer().required(),
    total: yup.number().integer().required(),
    produtos: yup.array().min(1).of(yup.object().shape({
        id: yup.number().integer().required(),
        preco: yup.number().integer().required(),
        quantidade: yup.number().integer().required(),
        precoTotal: yup.number().integer().required()
    }))
})

module.exports = {
    pedidoSquema
};
