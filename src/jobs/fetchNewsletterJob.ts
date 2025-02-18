import cron from "node-cron";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fetchNewsletterOpens() {
  try {
    console.log("🔄 Buscando newsletter opens do Beehiiv...");

    const response = await axios.get("https://api.beehiiv.com/webhooks/newsletter-opens");

    const opens = response.data; // Lista de acessos retornados pelo Beehiiv

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

// 🔥 Executa a função imediatamente ao iniciar o servidor
fetchNewsletterOpens();

// Agendar o job para rodar todo início de hora (0 * * * *)
cron.schedule("0 * * * *", fetchNewsletterOpens);

console.log("✅ Job de sincronização de newsletter agendado para rodar a cada 1 hora.");
