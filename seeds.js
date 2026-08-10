const Esporte = require('./models/esporte')

const esporte1 = new Esporte({
     nome: 'Futebol'
})

const esporte2 = new Esporte({
    nome: 'Esqui'
})

//Inserir o primeiro curso
// curso1.save()
//     .then(curso => {
//         console.log(curso)
//     })
//     .catch( e => {
//         console.log(e)
//     })

Esporte.insertMany([esporte1, esporte2])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

