import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { StreakService } from "../services/streakService";


const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const streaks = await StreakService.getAllStreaks();
    res.status(200).json(streaks);
  } catch (error) {
    console.error("Erro ao buscar streaks:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await StreakService.getStreakById(id);
  res.status(response.status).json(response.data);
});

router.post("/", authMiddleware, async (req, res) => {
  const response = await StreakService.updateUserStreak(req.body.userId);
  res.status(response.status).json(response.data);
});

router.get("/news/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const response = await StreakService.getStreakById(id);
  res.status(response.status).json(response.data);
});

export default router;
