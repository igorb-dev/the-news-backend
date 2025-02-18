import express from "express";
import { PrismaClient } from "@prisma/client";
import { StreakService } from "../services/streakService";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const { email, id, utm_source, utm_medium, utm_campaign, utm_channel } = req.query;

    if (!email || !id) {
       res.status(400).json({ error: "Email e ID são obrigatórios" });
       return
    }

    console.log(`📩 Webhook recebido para o email: ${email}`);

    // Verifica se o usuário existe
    let user = await prisma.user.findUnique({ where: { email: String(email) } });

    if (!user) {
      console.log("🆕 Usuário não encontrado, criando novo...");
      user = await prisma.user.create({
        data: {
          id: String(id), // Usando o ID fornecido na requisição
          email: String(email),
        },
      })
    }

    // Registra a abertura da edição
    await prisma.newsletterOpen.create({
      data: {
        userId: user.id,
        postId: String(id),
        utmSource: utm_source ? String(utm_source) : null,
        utmMedium: utm_medium ? String(utm_medium) : null,
        utmCampaign: utm_campaign ? String(utm_campaign) : null,
        utmChannel: utm_channel ? String(utm_channel) : null,
      },
    });

    // Atualiza o streak do usuário
    await StreakService.updateUserStreak(user.id);

    res.json({ message: "✅ Webhook processado com sucesso" });
    return
  } catch (error: any) {
    console.error("❌ Erro ao processar webhook:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
    return
  }
});

export default router;
