import express from "express";
import { PrismaClient } from "@prisma/client";
import { StreakService } from "../services/streakService";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const { email, id: postId, utm_source, utm_medium, utm_campaign, utm_channel } = req.query;

    if (!email || !postId) {
      res.status(400).json({ error: "Email e ID da edição são obrigatórios" });
      return;
    }

    console.log(`📩 Webhook recebido para o email: ${email}, Edição ID: ${postId}`);

    // Verifica se o usuário já existe pelo email
    let user = await prisma.user.findUnique({ where: { email: String(email) } });

    if (!user) {
      console.log("🆕 Usuário não encontrado, criando novo...");
      try {
        user = await prisma.user.create({
          data: {
            id: crypto.randomUUID(), // ✅ Gera um UUID automático
            email: String(email),
          },
        });
      } catch (createError: any) {
        console.error("❌ Erro ao criar usuário:", createError.message);
        res.status(500).json({ error: "Erro ao criar usuário", details: createError.message });
        return;
      }
    }

    // Registra a abertura da edição
    try {
      await prisma.newsletterOpen.create({
        data: {
          userId: user.id,
          postId: String(postId),  // ✅ Agora sim, usamos o postId corretamente!
          utmSource: utm_source ? String(utm_source) : null,
          utmMedium: utm_medium ? String(utm_medium) : null,
          utmCampaign: utm_campaign ? String(utm_campaign) : null,
          utmChannel: utm_channel ? String(utm_channel) : null,
        },
      });
    } catch (openError: any) {
      console.error("❌ Erro ao registrar abertura:", openError.message);
    }

    // Atualiza o streak do usuário
    await StreakService.updateUserStreak(user.id);

    res.json({ message: "✅ Webhook processado com sucesso" });
  } catch (error: any) {
    console.error("❌ Erro ao processar webhook:", error.message);
    res.status(500).json({ error: "Erro interno do servidor", details: error.message });
  }
});


export default router;
