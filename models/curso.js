const {mongoose} = require('../db')

const cursoSchema = new mongoose.Schema({
    sigla: {
        type: String,
        required: true
    },
    nome: String
})

const Curso = mongoose.model('Curso', cursoSchema)

module.exports = Curso