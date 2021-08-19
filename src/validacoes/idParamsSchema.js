const yup = require('./yup');

const idParamsSquema = yup.object().shape({
    id: yup.number().integer(),
    idProduto: yup.number().integer()
})

module.exports = idParamsSquema;