import crypto from 'node:crypto';
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

import express from 'express';
const app = express();

import cors from 'cors'

app.use(express.json()) //para receber dados por post
app.use(cors()) //para permitir que nosso servidor seja acessivel por outros servidores 
app.use(express.urlencoded({extended: true}))

//EXEMPLO ESPORTES
import { Esporte } from "./models/esporte.js"
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



//EXEMPLO CURSOS
import { Curso } from "./models/curso.js"
app.get('/cursos', async (req, res) => {
    const cursos = await Curso.find({})
    res.status(200).json(cursos)
})

app.get('/cursos/:id', async (req,res) => {
    const {id} = req.params
    const curso = await Curso.findById(id)    
    res.status(200).json(curso)
})

app.post('/cursos', async (req,res) => {
    const {sigla, nome} = req.body
    const novoCurso = new Curso({sigla, nome})
    await novoCurso.save()
    res.status(201).json({})
})

app.patch('/cursos/:id', async (req, res) => {
    const {id} = req.params
    const {sigla, nome} = req.body
    await Curso.findByIdAndUpdate(id, {sigla, nome}, {runValidators: true})
    res.status(204).json({})
})

app.delete('/cursos/:id', async (req,res) => {
    const {id} = req.params
    await Curso.findByIdAndDelete(id)
    res.status(204).json({})
})



app.listen(3005, () => {
    console.log("Servidor ligado na porta 3005!")
})