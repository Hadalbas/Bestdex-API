const express = require('express')
const cors = require('cors')
const app = express()
const Esporte = require('./models/esporte')

app.use(express.json()) //para receber dados por post
app.use(cors()) //para permitir que nosso servidor seja acessivel por outros servidores 
app.use(express.urlencoded({extended: true}))

app.get('/esportes', async (req, res) => {
    const esportes = await Esporte.find({})
    res.status(200).json(esportes)
})

app.get('/esportes/:id', async (req,res) => {
    const {id} = req.params
    const esporte = await Esporte.findById(id)    
    res.status(200).json(esporte)
})

app.post('/esportes', async (req,res) => {
    const {nome} = req.body
    const novoEsporte = new Esporte({nome})
    await novoEsporte.save()
    res.status(201).json({})
})

app.patch('/esportes/:id', async (req, res) => {
    const {id} = req.params
    const {nome} = req.body
    await Esporte.findByIdAndUpdate(id, {nome}, {runValidators: true})
    res.status(204).json({})
})

app.delete('/esportes/:id', async (req,res) => {
    const {id} = req.params
    await Esporte.findByIdAndDelete(id)
    res.status(204).json({})
})

app.listen(3005, () => {
    console.log("Servidor ligado na porta 3005!")
})