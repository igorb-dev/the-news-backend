import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { NewsletterOpenService } from "../services/newsletterOpenService";


const router = Router();

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const streaks = await NewsletterOpenService.getNewsById(id);
    res.status(200).json(streaks);
  } catch (error) {
    console.error("Erro ao buscar news:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/", authMiddleware, async (req, res) => {

  try {
    const streaks = await NewsletterOpenService.getAllNews();
    res.status(200).json(streaks);
  } catch (error) {
    console.error("Erro ao buscar news:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default router;
