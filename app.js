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

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(express.json()) //para receber dados por post
app.use(cookieParser());
// app.use(cors()) para permitir que nosso servidor seja acessivel por outros servidores 
// IMPORTANTE: Configure o CORS para permitir credenciais (cookies) do frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }))

//O backend precisa validar os dados do usuário, gerar o token JWT e injetá-lo em um cookie criptografado de forma automática no navegador.
// npm install express jsonwebtoken cookie-parser cors dotenv bcryptjs
//O ponto crítico aqui é configurar o cookie como httpOnly para que ele fique invisível a scripts maliciosos no frontend.

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 1. Busque e valide o usuário no banco de dados (exemplo simplificado)
    if (email === "usuario@email.com" && password === "123") {

        // 2. Geração do token JWT
        const token = jwt.sign(
            { userId: 'id_do_usuario', role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
            // const token = jwt.sign({ userId: 123 }, process.env.JWT_SECRET, { expiresIn: '1h' });
        );

        // 3. Envio do JWT dentro do HTTP-only Cookie
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',

            // IMPORTANTE: Se sameSite for 'none', a propriedade 'secure' DEVE ser true.
            // Como a API do IFRS usa HTTPS (https://ads.osorio...), ela pode enviar cookies seguros.
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: 'Login efetuado com sucesso!' });
        // return res.status(200).json({ success: true, user: { email } });
    }
    return res.status(401).json({ error: "Credenciais inválidas" });
});

app.post('/logout', (req, res) => {
    // Limpa o cookie chamado 'token'
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        // IMPORTANTE: Em alguns cenários de produção com domínios diferentes, 
        // inclua também a propriedade 'domain' se ela tiver sido usada no login.
    });

    return res.status(200).json({ message: 'Logout efetuado com sucesso!' });
});

app.get('/paginadousuario', verificarToken, async (req, res) => {
    // res.json({ dados: 'Informações secretas' });
    res.json({ dados: 'Informações secretas', usuario: req.usuario });
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