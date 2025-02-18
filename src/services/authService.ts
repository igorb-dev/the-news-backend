import { Request } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export class AuthService {
  static async login(req: Request) {
    const { email } = req.body;

    if (!email) {
      return { status: 400, data: { message: "E-mail é obrigatório" } };
    }

    try {
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { status: 400, data: { message: "E-mail inválido" } };
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      return { status: 200, data: { message: "Login bem-sucedido", user, token } };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { status: 500, data: { message: "Erro interno no servidor" } };
    } finally {
      await prisma.$disconnect();
    }
  }
}
