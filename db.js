const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dbProgWeb')
    .then(() => {
        console.log('Conexão estabelecida com o banco!')
    })
    .catch(err => {
        console.log('Erro ao conectar ao banco.')
        console.log(err)
    })

module.exports = mongoose