import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware padrão
app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor do Backend da Identidade em Cristo Rodando com Sucesso!');
});


// ROTA 1: INICIAR / RETOMAR JORNADA
app.post('/api/start-journey', async (req, res) => {
    const { userName } = req.body; 

    if (!userName) {
        return res.status(400).json({ error: 'O nome do usuário é obrigatório.' });
    }

    try {
        // 1. Tenta encontrar o usuário existente
        let user = await prisma.user.findFirst({
            where: { name: userName },
            // Inclui a última reflexão para saber onde o usuário parou
            include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
        });

        // 2. Se o usuário não existir, cria um novo
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: userName,
                    journeyStartTime: new Date(), // Campo com 'T' maiúsculo
                },
                include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
            });
        }
        
        // 3. Garante que journeyStartTime está preenchido se ele for nulo
        if (user && !user.journeyStartTime) {
             user = await prisma.user.update({
                where: { id: user.id },
                data: { journeyStartTime: new Date() },
                include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
            });
        }

        res.status(200).json({ 
            message: 'Jornada iniciada/retomada com sucesso!', 
            userId: user.id,
            userName: user.name,
            latestReflection: user.reflections.length > 0 ? user.reflections[0] : null,
            journeyStartTime: user.journeyStartTime,
        });

    } catch (error) {
        console.error('Erro ao iniciar a jornada:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao processar o usuário.' });
    }
});


// ROTA 2: SALVAR RELATÓRIO E REFLEXÃO
app.post('/api/save-reflection', async (req, res) => {
    const {
        userId,
        totalScore,
        wallet, // Campo tipo Json
        personalReflection // Campo reflectionText no schema
    } = req.body;

    if (!userId || totalScore === undefined || !wallet || !personalReflection) {
        return res.status(400).json({ error: 'Dados incompletos para salvar o relatório.' });
    }
    
    // CORREÇÃO CRÍTICA PARA O CAMPO JSON (wallet)
    let safeWallet = wallet;
    try {
        // Tenta converter de String JSON para Objeto JS, se necessário
        if (typeof wallet === 'string') {
            safeWallet = JSON.parse(wallet);
        }
    } catch (e) {
        console.error('Erro ao fazer parse do JSON da carteira:', e);
        return res.status(400).json({ error: 'O formato da carteira (wallet) é inválido (JSON malformado).' });
    }

    try {
        // 1. Atualiza o Usuário (totalScore e fim da jornada)
        const updatedUser = await prisma.user.update({
            where: { id: userId }, 
            data: {
                totalScore: totalScore,
                journeyEndTime: new Date(),
            },
        });

        // 2. Cria a Reflexão, usando o 'safeWallet' garantido como Objeto JS
        const newReflection = await prisma.reflection.create({
            data: {
                wallet: safeWallet, // Usa o objeto garantido
                reflectionText: personalReflection, 
                user: {
                    connect: { id: userId }, 
                },
            },
        });

        res.status(200).json({
            message: 'Relatório e reflexão salvos com sucesso!',
            userId: updatedUser.id,
            reflectionId: newReflection.id
        });

    } catch (error) {
        console.error('Erro ao salvar reflexão/atualizar usuário:', error);
        if (error.code === 'P2025') { 
            return res.status(404).json({ error: 'Usuário não encontrado (ID inválido).' });
        }
        res.status(500).json({ error: `Erro interno do servidor ao processar o relatório. Detalhe: ${error.message}` });
    }
});

// ROTA 3: BUSCAR DADOS DO USUÁRIO
app.get('/api/user-data', async (req, res) => {
    const { userId } = req.query; 

    if (!userId) {
        return res.status(400).json({ error: 'O ID do usuário é obrigatório para a consulta.' });
    }

    try {
        const userData = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                reflections: { 
                    orderBy: { createdAt: 'desc' }, 
                    take: 1,
                }, 
            },
        });

        if (!userData) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(userData);

    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao consultar os dados.' });
    }
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log('Base de Dados Conectada via Prisma.');
});
