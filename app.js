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
    const { email, password } = req.body;

    try {
        // 1. Busca o usuário pelo e-mail
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // 2. Utiliza o método auxiliar do bcrypt para verificar a senha
        const senhaCorreta = await usuario.compararSenha(password);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        // 3. Se estiver tudo certo, gera o token JWT
        const token = jwt.sign(
            { userId: usuario._id, role: 'user' },
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
            message: 'Login efetuado com sucesso!',
            user: { id: usuario._id, nome: usuario.nome, email: usuario.email }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erro interno no servidor.' });
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
    return res.status(200).json({ message: 'Logout efetuado com sucesso!' });
});

import Usuario from './models/usuario.js';
app.post('/usuarios', verificarToken, async (req, res) => {
    let { nome, email, senha } = req.body;
    nome = xss(nome)
    email = xss(email)

    try {
        // Verifica se o e-mail já está em uso
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ message: 'Este e-mail já está cadastrado.' });
        }

        // Cria o objeto do usuário (a senha aqui vai em texto limpo, o pre('save') vai interceptar)
        const novoUsuario = new Usuario({ nome, email, senha });
        const usuarioCriado = await novoUsuario.save();
        const usuarioResponse = usuarioCriado.toObject();
        delete usuarioResponse.senha;

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: usuarioResponse });
    } catch (error) {
        console.error("Erro no cadastro:", error);
        res.status(500).json({ message: 'Erro interno ao cadastrar usuário.' });
    }
})

app.get('/usuarios', verificarToken, async (req, res) => {
    try {
        // Busca todos os usuários, mas remove o campo 'senha' do retorno
        const usuarios = await Usuario.find({}).select('-senha');
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
})

app.patch('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params
    let { nome, email } = req.body
    nome = xss(nome)
    email = xss(email)
    await Usuario.findByIdAndUpdate(id, { nome, email }, { runValidators: true })
    res.status(204).json({message: 'Usuário atualiza com sucesso!'})
})

app.patch('/usuarios/:id/senha', verificarToken, async (req, res) => {
    const { id } = req.params
    let { email, senhaAntiga, senhaNova } = req.body
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }
    const senhaCorreta = await usuario.compararSenha(senhaAntiga);
    if (!senhaCorreta) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }
    await Usuario.findByIdAndUpdate(id, { senha: senhaNova }, { runValidators: true })
    res.status(204).json({message: 'Senha alterada com sucesso!'})
})

app.delete('/usuarios/:id', verificarToken, async (req, res) => {
    const { id } = req.params
    await Usuario.findByIdAndDelete(id)
    res.status(204).json({})
})





//EXEMPLO ESPORTES
import { Esporte } from "./models/esporte.js"
app.get('/esportes', async (req, res) => {
    const esportes = await Esporte.find({})
    res.status(200).json(esportes)
})

app.get('/esportes/:id', async (req, res) => {
    const { id } = req.params
    const esporte = await Esporte.findById(id)
    res.status(200).json(esporte)
})

app.post('/esportes', async (req, res) => {
    let { nome } = req.body
    nome = xss(nome)
    const novoEsporte = new Esporte({ nome })
    const esporteCriado = await novoEsporte.save()
    res.status(201).json(esporteCriado)
})

app.patch('/esportes/:id', async (req, res) => {
    const { id } = req.params
    let { nome } = req.body
    nome = xss(nome)
    await Esporte.findByIdAndUpdate(id, { nome }, { runValidators: true })
    res.status(204).json({})
})

app.delete('/esportes/:id', async (req, res) => {
    const { id } = req.params
    await Esporte.findByIdAndDelete(id)
    res.status(204).json({})
})





//EXEMPLO CURSOS
import { Curso } from "./models/curso.js"
app.get('/cursos', async (req, res) => {
    const cursos = await Curso.find({})
    res.status(200).json(cursos)
})

app.get('/cursos/:id', async (req, res) => {
    const { id } = req.params
    const curso = await Curso.findById(id)
    res.status(200).json(curso)
})

app.post('/cursos', async (req, res) => {
    let { sigla, nome, duracao } = req.body
    sigla = xss(sigla)
    nome = xss(nome)
    duracao = xss(duracao)
    const novoCurso = new Curso({ sigla, nome, duracao })
    const cursoCriado = await novoCurso.save()
    res.status(201).json(cursoCriado)
})

app.patch('/cursos/:id', async (req, res) => {
    const { id } = req.params
    let { sigla, nome, duracao } = req.body
    sigla = xss(sigla)
    nome = xss(nome)
    duracao = xss(duracao)
    await Curso.findByIdAndUpdate(id, { sigla, nome, duracao }, { runValidators: true })
    res.status(204).json({})
})

app.delete('/cursos/:id', async (req, res) => {
    const { id } = req.params
    await Curso.findByIdAndDelete(id)
    res.status(204).json({})
})





//EXEMPLO NOTAS
import { Estudante } from "./models/estudante.js"
app.get('/estudantes', async (req, res) => {
    const estudantes = await Estudante.find({})
    res.status(200).json(estudantes)
})

app.get('/estudantes/:id', async (req, res) => {
    const { id } = req.params
    const estudante = await Estudante.findById(id)
    res.status(200).json(estudante)
})

app.post('/estudantes', async (req, res) => {
    let { nome, turma, nota1, nota2, nota3 } = req.body
    nome = xss(nome)
    turma = xss(turma)
    nota1 = xss(nota1)
    nota2 = xss(nota2)
    nota3 = xss(nota3)
    const novoEstudante = new Estudante({ nome, turma, nota1, nota2, nota3 })
    const estudanteCriado = await novoEstudante.save()
    res.status(201).json(estudanteCriado)
})

app.patch('/estudantes/:id', async (req, res) => {
    const { id } = req.params
    let { nome, turma, nota1, nota2, nota3 } = req.body
    nome = xss(nome)
    turma = xss(turma)
    nota1 = xss(nota1)
    nota2 = xss(nota2)
    nota3 = xss(nota3)
    await Estudante.findByIdAndUpdate(id, { nome, turma, nota1, nota2, nota3 }, { runValidators: true })
    res.status(204).json({})
})

app.delete('/estudantes/:id', async (req, res) => {
    const { id } = req.params
    await Estudante.findByIdAndDelete(id)
    res.status(204).json({})
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor ligado na porta ${process.env.PORT}!`)
})