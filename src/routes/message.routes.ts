import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { NewsletterOpenService } from "../services/newsletterOpenService";
import { MessageService } from "../services/messageService";


const router = Router();

router.get("/", authMiddleware, async (req, res) => {

  try {
    const streaks = await MessageService.getRandomMessage();
    res.status(200).json(streaks);
  } catch (error) {
    console.error("Erro ao buscar streaks:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;
