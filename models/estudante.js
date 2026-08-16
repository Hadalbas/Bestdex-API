import mongoose from "../db.js"

const estudanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    turma: {
        type: String
    },
    nota1: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: [0.0, 'A nota mínima permitida é 0.0'],
        max: [10.0, 'A nota máxima permitida é 10.0'],
        
        // SETTER: Arredonda para 1 casa decimal ANTES de salvar no banco
        set: (val) => {
            if (!val) return val;
                // Converte para número, fixa 1 casa decimal e retorna como String para o Decimal128
                return parseFloat(Number(val).toFixed(1)).toString();
        },

        // GETTER: Transforma o objeto Decimal128 em número comum ao ler do banco
        get: (val) => val ? parseFloat(val.toString()) : val 
    },
    nota2: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: [0.0, 'A nota mínima permitida é 0.0'],
        max: [10.0, 'A nota máxima permitida é 10.0'],

        set: (val) => {
            if (!val) return val;
                return parseFloat(Number(val).toFixed(1)).toString();
        },

        get: (val) => val ? parseFloat(val.toString()) : val 
    },
    nota3: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: [0.0, 'A nota mínima permitida é 0.0'],
        max: [10.0, 'A nota máxima permitida é 10.0'],

        set: (val) => {
            if (!val) return val;
                return parseFloat(Number(val).toFixed(1)).toString();
        },

        get: (val) => val ? parseFloat(val.toString()) : val 
    }
}, { 
        // timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true }
   }
)

export const Estudante = mongoose.model('Estudante', estudanteSchema)