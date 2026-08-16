import crypto from 'node:crypto';
if (!globalThis.crypto) {
  globalThis.crypto = crypto;
}

import express from 'express';
const app = express();

import cors from 'cors'
import xss from 'xss';

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
    let {nome} = req.body
    nome = xss(nome)
    const novoEsporte = new Esporte({nome})
    await novoEsporte.save()
    res.status(201).json({})
})

app.patch('/esportes/:id', async (req, res) => {
    const {id} = req.params
    let {nome} = req.body
    nome = xss(nome)
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
    let {sigla, nome, duracao} = req.body
    sigla = xss(sigla)
    nome = xss(nome)
    duracao = xss(duracao)
    const novoCurso = new Curso({sigla, nome, duracao})
    await novoCurso.save()
    res.status(201).json({})
})

app.patch('/cursos/:id', async (req, res) => {
    const {id} = req.params
    let {sigla, nome, duracao} = req.body
    sigla = xss(sigla)
    nome = xss(nome)
    duracao = xss(duracao)
    await Curso.findByIdAndUpdate(id, {sigla, nome, duracao}, {runValidators: true})
    res.status(204).json({})
})

app.delete('/cursos/:id', async (req,res) => {
    const {id} = req.params
    await Curso.findByIdAndDelete(id)
    res.status(204).json({})
})


//EXEMPLO NOTAS
import { Estudante } from "./models/estudante.js"
app.get('/estudantes', async (req, res) => {
    const estudantes = await Estudante.find({})
    res.status(200).json(estudantes)
})

app.get('/estudantes/:id', async (req,res) => {
    const {id} = req.params
    const estudante = await Estudante.findById(id)
    res.status(200).json(estudante)
})

app.post('/estudantes', async (req,res) => {
    let {nome, turma, nota1, nota2, nota3} = req.body
    nome = xss(nome)
    turma = xss(turma)
    nota1 = xss(nota1)
    nota2 = xss(nota2)
    nota3 = xss(nota3)
    const novoEstudante = new Estudante({nome, turma, nota1, nota2, nota3})
    await novoEstudante.save()
    res.status(201).json({})
})

app.patch('/estudantes/:id', async (req, res) => {
    const {id} = req.params
    let {nome, turma, nota1, nota2, nota3} = req.body
    nome = xss(nome)
    turma = xss(turma)
    nota1 = xss(nota1)
    nota2 = xss(nota2)
    nota3 = xss(nota3)
    await Estudante.findByIdAndUpdate(id, {nome, turma, nota1, nota2, nota3}, {runValidators: true})
    res.status(204).json({})
})

app.delete('/estudantes/:id', async (req,res) => {
    const {id} = req.params
    await Estudante.findByIdAndDelete(id)
    res.status(204).json({})
})


app.listen(3005, () => {
    console.log("Servidor ligado na porta 3005!")
})