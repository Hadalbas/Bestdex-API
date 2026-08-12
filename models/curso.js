import mongoose from "../db.js"

const cursoSchema = new mongoose.Schema({
    sigla: {
        type: String,
        required: true
    },
    nome: String,
    duracao: String
})

export const Curso = mongoose.model('Curso', cursoSchema)