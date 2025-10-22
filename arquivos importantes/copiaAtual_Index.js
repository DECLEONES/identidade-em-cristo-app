import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor do Backend da Identidade em Cristo Rodando com Sucesso!');
});


app.post('/api/start-journey', async (req, res) => {
    const { userName } = req.body; 

    if (!userName) {
        return res.status(400).json({ error: 'O nome do usuário é obrigatório.' });
    }

    try {
        let user = await prisma.user.findFirst({
            where: { name: userName },
            include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: userName,
                    journeyStarttime: new Date(),
                },
                include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
            });
        }
        
        if (user && !user.journeyStarttime) {
             user = await prisma.user.update({
                where: { id: user.id },
                data: { journeyStarttime: new Date() },
                include: { reflections: { orderBy: { createdAt: 'desc' }, take: 1 } }
            });
        }

        res.status(200).json({ 
            message: 'Jornada iniciada/retomada com sucesso!', 
            userId: user.id,
            userName: user.name,
            latestReflection: user.reflections.length > 0 ? user.reflections[0] : null,
            journeyStarttime: user.journeyStarttime,
        });

    } catch (error) {
        console.error('Erro ao iniciar a jornada:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao processar o usuário.' });
    }
});


app.post('/api/save-reflection', async (req, res) => {
    const {
        userId,
        totalScore,
        journeyTime, 
        wallet, 
        personalReflection
    } = req.body;

    if (!userId || totalScore === undefined || !wallet || !personalReflection) {
        return res.status(400).json({ error: 'Dados incompletos para salvar o relatório.' });
    }
    
    if (journeyTime === undefined) { 
        return res.status(400).json({ error: 'O tempo total da jornada é obrigatório.' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId }, 
            data: {
                totalScore: totalScore,
                journeyTime: journeyTime,
                journeyEndTime: new Date(),
            },
        });

        const newReflection = await prisma.reflection.create({
            data: {
                wallet: wallet, 
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
        res.status(500).json({ error: 'Erro interno do servidor ao processar o relatório. Verifique o log do backend.' });
    }
});

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
