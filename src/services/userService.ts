import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {

  static async getAllUsers() {
    return await prisma.user.findMany();
  }

  static async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return { status: 404, data: { message: "Usuário não encontrado" } };
      }

      return { status: 200, data: user };
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    }
  }
}
