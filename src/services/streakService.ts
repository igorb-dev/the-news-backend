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
                select: {
                  email: true,
                },
              },
            },
            orderBy: {
              count: "desc",
            },
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
              data: { userId, count: 1 },
            });
            return { status: 201, data: newStreak };
          }
    
          if (lastOpened && lastOpened.add(1, "day").isSame(today)) {
            const updatedStreak = await prisma.streak.update({
              where: { userId },
              data: { count: streak.count + 1, lastOpened: new Date() },
            });
            return { status: 200, data: updatedStreak };
          } else if (lastOpened && lastOpened.isBefore(today)) {
            const resetStreak = await prisma.streak.update({
              where: { userId },
              data: { count: 1, lastOpened: new Date() },
            });
            return { status: 200, data: resetStreak };
          }
    
          return { status: 200, data: streak };
        } catch (error) {
          console.error("Erro ao atualizar streak:", error);
          return { status: 500, data: { message: "Erro interno no servidor" } };
        }
      }
}
