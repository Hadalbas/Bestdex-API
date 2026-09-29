import mongoose from "../db.js"

const timeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    regulacao: {
        type: String,
        required: true
    },
    acessos: {
        type: Number,
        default: 0,
        required: true
    },
    pokemons: [{
        pokemon1: {
            required: true,
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
        pokemon2: {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
        pokemon3: {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
        pokemon4: {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
        pokemon5: {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
        pokemon6: {
            species: {type: String, required: true},
            nickname: String,
            item: {type: String, default: "Empty"},
            ability: {type: String, required: true},
            gender: {type: CharacterData, required: true, enum: ['f', 'm', 'x']},
            shiny: {type: Boolean, default: false},
            stats: {
                hp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                at:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                df:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sa:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sd:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                },
                sp:{
                    type: Number, 
                    min:[0, "O IV não pode ser menor que 0"],
                    max:[32, "Nenhum IV pode ultrapassar 32"],
                    default: 0
                }
            },
            moves: {
                move1: {type: String, required: true},
                move2: {type: String},
                move3: {type: String},
                move4: {type: String}
            }
        },
    }]
})

export const Time = mongoose.model('Time', timeSchema)