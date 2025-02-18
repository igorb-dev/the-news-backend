import express from "express";
import { PrismaClient } from "@prisma/client";
import { StreakService } from "../services/streakService";

const router = express.Router();
const prisma = new PrismaClient();

// Rota para buscar ou criar um usuário da newsletter pelo e-mail
router.get("/subscribe", async (req, res) => {
  try {
    const { email, id } = req.query;

    if (!email) {
       res.status(400).json({ error: "O campo 'email' é obrigatório." });
       return
    }

    console.log(`🔄 Buscando informações do usuário no banco: ${email}`);

    // Buscando o usuário pelo e-mail no banco de dados
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Se o usuário não existir, cria um novo
    if (!user) {
      console.log("Usuário não encontrado, criando novo usuário...");
      user = await prisma.user.create({
        data: { id: String(id), email: String(email) }, // Usando o ID da query
      });
    }

    try {
      await StreakService.updateUserStreak(user.id);
    } catch (streakError) {
      console.error("⚠️ Erro ao atualizar o streak:", streakError);
      // O erro no streak não impede a resposta ao usuário
    }

    // Retornando os dados reais do banco
    res.json({
      data: {
        id: user.id,
        email: user.email,
        created_at: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error("❌ Erro ao buscar/criar o usuário no banco:", error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;