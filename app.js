import crypto from 'node:crypto';
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}

import express from 'express';
import cors from 'cors'
import xss from 'xss';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { verificarToken } from './authMiddleware.js';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
app.use(express.json()) //para receber dados por post
app.use(cookieParser());
// app.use(cors()) para permitir que nosso servidor seja acessivel por outros servidores 
// Configure o CORS para permitir credenciais (cookies) do frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }))

//O backend precisa validar os dados do usuário, gerar o token JWT e injetá-lo em um cookie criptografado de forma automática no navegador.
// npm install express jsonwebtoken cookie-parser cors dotenv bcryptjs
//Configurar o cookie como httpOnly para que ele fique invisível a scripts maliciosos no frontend.

//CONTROLE DE USUÁRIOS
app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;

    try {
        // 1. Busca o usuário pelo nome
        const treinador = await Treinador.findOne({ nome });
        if (!treinador) {
            return res.status(401).json({ message: 'Incorrect name or password.' });
        }

        // 2. Utiliza o método auxiliar do bcrypt para verificar a senha
        const senhaCorreta = await treinador.compararSenha(senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Incorrect name or password.' });
        }

        // 3. Se estiver tudo certo, gera o token JWT
        const token = jwt.sign(
            { userId: treinador._id, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // 4. Envia o cookie HTTP-only
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Retorna dados públicos do usuário para o front se achar necessário
        return res.status(200).json({
            message: 'Logged in successfully!',
            user: { id: treinador._id, nome: treinador.nome }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

app.post('/logout', (req, res) => {
    // Limpa o cookie chamado 'token'
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });
    return res.status(200).json({ message: 'Logout successful!' });
});

import Treinador from './models/treinador.js';
app.post('/treinadores', async (req, res) => {
    let { nome, senha } = req.body;
    nome = xss(nome)

    try {
        // Verifica se o nome já está em uso
        const treinadorExiste = await Treinador.findOne({ nome });
        if (treinadorExiste) {
            return res.status(400).json({ message: 'This name has already been registered.' });
        }

        // Cria o objeto do usuário (a senha aqui vai em texto limpo, o pre('save') vai interceptar)
        const novoTreinador = new Treinador({ nome, senha });
        const treinadorCriado = await novoTreinador.save();
        const treinadorResponse = treinadorCriado.toObject();
        delete treinadorResponse.senha;

        res.status(201).json({ message: 'User created sucessfully!', treinador: treinadorResponse });
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ message: 'Internal error in creating the user.' });
    }
})

app.get('/treinadores', async (req, res) => {
    try {
        // Busca todos os usuários, mas remove o campo 'senha' do retorno
        const treinadores = await Treinador.find({}).select('-senha');
        return res.status(200).json(treinadores);
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for users.' });
    }
})

app.get('/treinadores/:id', async (req, res) => {
    const { id } = req.params; // //Obtém o ID do usuário autenticado pelo token
    //precisa implementar checagem para garantir que seja o mesmo usuário
    try {
        // Busca o usuário e remove o campo 'senha' do retorno
        const treinador = await Treinador.findById(id).select('-senha');
        return res.status(200).json(treinador);
    } catch (error) {
        return res.status(500).json({ message: 'Error searching for user.' });
    }
})

app.patch('/treinadores/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    let { nome } = req.body;

    // Garante que os dados existem antes de aplicar o xss para evitar crash (TypeError)
    if (nome) nome = xss(nome);

    try {
        //{ new: true } para retornar o usuário atualizado
        const treinadorAtualizado = await Treinador.findByIdAndUpdate(
            id,
            { nome },
            { runValidators: true, returnDocument: after }
        ).select('-senha'); // Oculta a senha por segurança

        if (!treinadorAtualizado) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({
            message: 'User updated successfully!',
            treinador: treinadorAtualizado
        });

    } catch (error) {
        // TRATAMENTO DE DUPLICIDADE: Caso o usuário tente mudar para um nome que já existe
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This name is already being used by another user.' });
        }

        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ message: 'Uptading user error.' });
    }
});

app.patch('/treinadores/:id/senha', verificarToken, async (req, res) => {
    const { id } = req.params;
    const { senhaantiga, senhanova } = req.body;

    try {
        // 1. Busca o usuário pelo ID
        const treinador = await Treinador.findById(id);
        if (!treinador) {
            // Se o ID não existir, mudei para 404 (Não encontrado) para fazer mais sentido semântico
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Valida se a senha antiga está correta
        const senhaCorreta = await treinador.compararSenha(senhaantiga);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Wrong current password.' });
        }

        // 3. Aplica a nova senha diretamente no objeto do documento
        treinador.senha = senhanova;

        // 4. Salva o documento. Isso OBRIGATORIAMENTE dispara o pre('save') 
        // e criptografa a nova senha com bcrypt automaticamente!
        await treinador.save();

        // 5. Retorna status 200 (OK) já que estamos enviando uma mensagem no JSON
        return res.status(200).json({ message: 'Senha alterada com sucesso!' });

    } catch (error) {
        console.error("Erro ao alterar senha:", error);
        return res.status(500).json({ message: 'Erro interno ao alterar a senha.' });
    }
});

app.delete('/treinadores/:id', verificarToken, async (req, res) => {
    const { id } = req.params;

    try {
        // BLINDAGEM DE SEGURANÇA: Impede que um usuário apague a conta de outro
        // O middleware 'verificarToken' injetou os dados do token em 'req.treinador'
        // if (req.treinador.userId !== id && req.treinador.role !== 'admin') {
        //     return res.status(403).json({ 
        //         message: 'Acesso negado. Você não tem permissão para apagar este usuário.' 
        //     });
        // }

        // VALIDAÇÃO DE EXISTÊNCIA: Verifica se o usuário realmente existe no banco
        const treinadorApagado = await Treinador.findByIdAndDelete(id);

        if (!treinadorApagado) {
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({ message: 'Usuário apagado com sucesso!' });

    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return res.status(500).json({ message: 'Erro interno ao tentar apagar o usuário.' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor ligado na porta ${process.env.PORT}!`)
})