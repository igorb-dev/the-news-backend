import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export class NewsletterOpenService {
    static async getNewsById(userId: string) {
      try {
        const news = await prisma.newsletterOpen.findMany({
          where: { userId },
          orderBy: { openedAt: "desc" }, // Ordena do mais recente para o mais antigo
        });
  
        return { status: 200, data: news };
      } catch (error) {
        console.error("Erro ao buscar news:", error);
        return { status: 500, data: { message: "Erro interno no servidor" } };
      }
    }

    static async getAllNews() {
      try {
        const streaks = await prisma.newsletterOpen.findMany({
          select: {
            id: true,
            userId: true,
            user: {
              select: { email: true, streakCount: true },
            },
            postId: true,
            openedAt: true
          },
          orderBy: { userId: "desc" },
        });
  
        return { status: 200, data: streaks };
      } catch (error) {
        console.error("Erro ao buscar todos os streaks:", error);
        return { status: 500, data: { message: "Erro interno no servidor" } };
      }
    }
  }
