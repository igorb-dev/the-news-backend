import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchNewsletterOpens() {
  try {
    const response = await axios.get("https://api.beehiiv.com/webhooks/newsletter-opens", {
      headers: {
        Authorization: `Bearer SEU_TOKEN_AQUI`, // Substituir pelo token correto
      },
    });

    const opens = response.data; // Lista de acessos

    for (const open of opens) {
      await prisma.newsletterOpen.create({
        data: {
          userId: open.userId, // O Beehiiv retorna isso?
          newsletterId: `post_${open.resource_id}`,
          openDate: new Date(open.timestamp), // Garantindo que salva a data correta
        },
      });
    }

    console.log(`✅ Newsletter opens sincronizados com sucesso!`);
  } catch (error) {
    console.error("❌ Erro ao buscar os acessos do Beehiiv:", error);
  }
}
