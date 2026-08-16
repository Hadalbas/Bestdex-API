//EXEMPLO ESPORTES
// const Esporte = require('./models/esporte')

// import { Esporte } from './models/User.js'
// import Esporte from "./models/esporte.js"
import { Esporte } from "./models/esporte.js"

const esporte1 = new Esporte({
     nome: 'Futebol'
})

const esporte2 = new Esporte({
    nome: 'Esqui'
})

// Esporte.insertMany([esporte1, esporte2])
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })


//EXEMPLO CURSOS
// const Curso = require('./models/curso')
// import Curso from "./models/curso.js"
import { Curso } from "./models/curso.js"

const curso1 = new Curso({
     sigla: 'ADS',
     nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas',
     duracao: '6 semestres'
})

const curso2 = new Curso({
    sigla: 'TPG', 
    nome: 'Tecnologia em Processos Gerenciais',
    duracao: '5 semestres'
})

//Inserir o primeiro curso
// curso1.save()
//     .then(curso => {
//         console.log(curso)
//     })
//     .catch( e => {
//         console.log(e)
//     })

// Curso.insertMany([curso1, curso2])
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })


//EXEMPLO NOTAS
import { Estudante } from "./models/estudante.js"

const estudante1 = new Estudante({
     nome: 'Bruno',
     turma: '401 Info',
     nota1: 7,
     nota2: 7.0,
     nota3: 7
})

const estudante2 = new Estudante({
     nome: 'José',
     turma: 'Futuro Digital - Front End',
     nota1: 7,
     nota2: 9.0,
     nota3: 10.0
})

Estudante.insertMany([estudante1, estudante2])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })