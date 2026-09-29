import mongoose from "../db.js"
import bcrypt from 'bcryptjs';

const treinadorSchema = new mongoose.Schema({
    nome: { type: String, unique: true, required: true },
    senha: { type: String, required: true }
}, { timestamps: true });

// GATILHO: Roda automaticamente ANTES de salvar o usuário no banco de dados
treinadorSchema.pre('save', async function () {
    // Se a senha não foi modificada (ex: atualizou apenas o nome), pula a criptografia
    if (!this.isModified('senha')) return;

    try {
        // Gera o "salt" (tempero aleatório para fortalecer o hash) com custo 10
        const salt = await bcrypt.genSalt(10);
        // Substitui a senha em texto limpo pela senha criptografada
        this.senha = await bcrypt.hash(this.senha, salt);
    } catch (error) {
        throw error;
    }
});

// MÉTODO AUXILIAR: Compara a senha digitada no login com o hash do banco
treinadorSchema.methods.compararSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

const Treinador = mongoose.model('Treinador', treinadorSchema);
export default Treinador;