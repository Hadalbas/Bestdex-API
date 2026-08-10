const {mongoose} = require('../db')

const esporteSchema = new mongoose.Schema({
    nome: String
})

const Esporte = mongoose.model('Esporte', esporteSchema)

module.exports = Esporte