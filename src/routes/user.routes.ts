import { Router } from "express";
import { UserService } from "../services/userService";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await UserService.getUserById(id);
  res.status(response.status).json(response.data);
});

export default router;
