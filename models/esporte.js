import mongoose from "../db.js"

const esporteSchema = new mongoose.Schema({
    nome: String
})

export const Esporte = mongoose.model('Esporte', esporteSchema)