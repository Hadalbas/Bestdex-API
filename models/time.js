import mongoose from "../db.js"

const timeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    criador: {
        type: String,
        required: true
    },
    regulacao: {
        type: String,
        required: true
    },
    acessos: {
        type: Number,
        default: 0
    },
    pokemons: [
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        },
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        },
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        },
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        },
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        },
        {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: String, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O EV não pode ser menor que 0"],
                    max:[32, "Nenhum EV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: [
                String,
                String,
                String,
                String
            ]
        }
    ]
})

export const Time = mongoose.model('Time', timeSchema)