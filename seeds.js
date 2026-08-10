//EXEMPLO ESPORTES
const Esporte = require('./models/esporte')

const esporte1 = new Esporte({
     nome: 'Futebol'
})

const esporte2 = new Esporte({
    nome: 'Esqui'
})

Esporte.insertMany([esporte1, esporte2])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })


//EXEMPLO CURSOS
const Curso = require('./models/curso')

const curso1 = new Curso({
     sigla: 'ADS',
     nome: 'Tecnologia em Análise e Desenvolvimento de Sistemas'
})

const curso2 = new Curso({
    sigla: 'TPG', 
    nome: 'Tecnologia em Processos Gerenciais'
})

//Inserir o primeiro curso
// curso1.save()
//     .then(curso => {
//         console.log(curso)
//     })
//     .catch( e => {
//         console.log(e)
//     })

Curso.insertMany([curso1, curso2])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })