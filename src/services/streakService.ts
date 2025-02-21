import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export class StreakService {
  static async getAllStreaks() {
    try {
      const streaks = await prisma.streak.findMany({
        select: {
          userId: true,
          count: true,
          lastOpened: true,
          user: {
            select: { email: true },
          },
        },
        orderBy: { count: "desc" },
      });

      return { status: 200, data: streaks };
    } catch (error) {
      console.error("Erro ao buscar todos os streaks:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    }
  }

  static async getStreakById(userId: string) {
    try {
      const streak = await prisma.streak.findUnique({ where: { userId } });

      if (!streak) {
        return { status: 200, data: { count: 0 } };
      }

      return { status: 200, data: { count: streak.count, lastOpened: streak.lastOpened } };
    } catch (error) {
      console.error("Erro ao buscar streak:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    }
  }

  static async updateUserStreak(userId: string) {
    try {
      const streak = await prisma.streak.findUnique({ where: { userId } });

      const today = dayjs().startOf("day");
      const lastOpened = streak ? dayjs(streak.lastOpened).startOf("day") : null;

      if (!streak) {
        const newStreak = await prisma.streak.create({
          data: { userId, count: 1, lastOpened: today.toDate() },
        });
        return { status: 201, data: newStreak };
      }

      if (lastOpened?.isSame(today)) {
        console.log("📅 Já contou hoje, nada a fazer.");
        return { status: 200, data: streak };
      }

      const diffDays = today.diff(lastOpened, "day");
      const isYesterday = diffDays === 1;
      const isSundaySkip = lastOpened?.day() === 6 && today.day() === 1; // Sábado → Segunda

      if (isYesterday || isSundaySkip) {
        const updatedStreak = await prisma.streak.update({
          where: { userId },
          data: { count: streak.count + 1, lastOpened: today.toDate() },
        });
        console.log(`🔥 Streak atualizado para ${streak.count + 1}!`);
        return { status: 200, data: updatedStreak };
      } else {
        const resetStreak = await prisma.streak.update({
          where: { userId },
          data: { count: 1, lastOpened: today.toDate() },
        });
        console.log("💀 Streak zerado!");
        return { status: 200, data: resetStreak };
      }
    } catch (error) {
      console.error("Erro ao atualizar streak:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    }
  }
}
