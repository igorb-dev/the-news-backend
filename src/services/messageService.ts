import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MessageService {
  static async getRandomMessage() {
    try {
      const messages = await prisma.motivationalMessage.findMany();

      if (messages.length === 0) {
        return { status: 404, data: { message: "Nenhuma mensagem encontrada." } };
      }

      const randomIndex = Math.floor(Math.random() * messages.length);
      const randomMessage = messages[randomIndex];

      return { status: 200, data: randomMessage };
    } catch (error) {
      console.error("Erro ao buscar mensagem:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    }
  }
}
