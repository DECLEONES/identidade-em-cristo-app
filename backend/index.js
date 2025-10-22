// backend/index.js

// 1. Importar as bibliotecas necessárias
import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';

// Carrega as variáveis de ambiente (como DATABASE_URL)


// 2. Inicializar o servidor Express e o cliente Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// 3. Configurar Middlewares (funções que processam requisições)
// Permite que o servidor aceite dados em formato JSON no corpo da requisição
app.use(express.json()); 
// Permite que o frontend (rodando em outra porta/domínio) se comunique com o backend
app.use(cors());

// 4. Teste de Rota (Rota Raiz)
app.get('/', (req, res) => {
    res.send('Servidor do Backend da Identidade em Cristo Rodando com Sucesso!');
});


// 5. Rota: Iniciar uma Jornada (Criar Novo Usuário)
app.post('/api/start-journey', async (req, res) => {
    // O frontend enviará o nome do usuário no corpo da requisição
    const { userName } = req.body; 

    // Validação básica
    if (!userName) {
        return res.status(400).json({ error: 'O nome do usuário é obrigatório.' });
    }

    try {
        // Usa o Prisma para criar um novo registro na tabela 'User'
        const newUser = await prisma.user.create({
            data: {
                name: userName,
                // Os outros campos (score, journeyTime) são iniciados com seus valores padrão (0).
            },
        });

        // Responde ao frontend com o ID e nome do novo usuário
        res.status(201).json({ 
            message: 'Jornada iniciada com sucesso!', 
            userId: newUser.id,
            userName: newUser.name 
        });

    } catch (error) {
        // Loga o erro completo no terminal para debug
        console.error('Erro ao iniciar a jornada:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar o usuário.' });
    }
});

// backend/index.js

// 5.1. Rota: Salvar uma Reflexão e Atualizar o Usuário
app.post('/api/save-reflection', async (req, res) => {
    // 1. Desestruturar os dados recebidos do Frontend
    const {
        userId,
        totalScore,
        journeyTime, // Em minutos ou segundos, conforme definido
        wallet,      // O objeto da carteira (ex: { pai: "Filho de Deus", irmao: "Serviço" })
        personalReflection
    } = req.body;

    // 2. Validação básica (o userId é crucial para saber quem atualizar)
    if (!userId || !totalScore || !wallet || !personalReflection) {
        return res.status(400).json({ error: 'Dados incompletos para salvar o relatório.' });
    }

    try {
        // --- 3. Atualizar a Tabela User ---
        // O Prisma faz a atualização e, como extra, retorna os dados atualizados.
        const updatedUser = await prisma.user.update({
            where: { id: userId }, 
            data: {
                totalScore: totalScore,
                journeyEndTime: journeyTime, // <--- CORREÇÃO: Usar 'journeyEndTime'
            },
        });

        // --- 4. Criar o Registro da Reflexão ---
        // Cria um novo registro na tabela Reflection, que é vinculada ao User via foreign key.
        const newReflection = await prisma.reflection.create({
            data: {
                wallet: wallet, // Salva o objeto JSON diretamente no campo JSONB (PostgreSQL)
                reflectionText: personalReflection,
                // Associa a Reflexão ao User usando o ID (Foreign Key)
                user: {
                    connect: { id: userId }, 
                },
            },
        });

        // 5. Resposta de Sucesso
        res.status(200).json({
            message: 'Relatório e reflexão salvos com sucesso!',
            userId: updatedUser.id,
            reflectionId: newReflection.id
        });

    } catch (error) {
        // Se o erro for, por exemplo, 'Usuário não encontrado', será capturado aqui.
        console.error('Erro ao salvar reflexão/atualizar usuário:', error);

        // Retorno de erro mais específico para "Usuário não encontrado"
        if (error.code === 'P2025') { 
            return res.status(404).json({ error: 'Usuário não encontrado (ID inválido).' });
        }

        res.status(500).json({ error: 'Erro interno do servidor ao processar o relatório.' });
    }
});

// 5.2. Rota: Buscar Dados do Usuário e Reflexões
app.get('/api/user-data', async (req, res) => {
    // Esperamos o userId como um query parameter: /api/user-data?userId=123
    const { userId } = req.query; 

    if (!userId) {
        return res.status(400).json({ error: 'O ID do usuário é obrigatório para a consulta.' });
    }

    try {
        // --- 1. Buscar o Usuário e suas Reflexões ---
        const userData = await prisma.user.findUnique({
            where: { id: userId }, // Encontra o usuário pelo ID
            // Inclui todas as reflexões relacionadas a este usuário
            include: {
                reflections: true, 
            },
        });

        // 2. Tratar Caso 'Usuário Não Encontrado'
        if (!userData) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // 3. Resposta de Sucesso (Envia todos os dados)
        // O Prisma retorna os dados já formatados, incluindo a lista de reflexões
        res.status(200).json(userData);

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao consultar os dados.' });
    }
});

// 6. Iniciar o Servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log('Base de Dados Conectada via Prisma.');
});