import { Router } from "express";
import { AuthService } from "../services/authService";

const router = Router();

router.post("/login", async (req, res) => {
    try {
    const response = await AuthService.login(req);
    
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro na rota de login:", error);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.post("/server-awake", async (req, res) => {
  try {
    console.log("Servidor Acordado")
  res.status(200).json({message: "Servidor Acordado"});
} catch (error) {
  res.status(500).json({ message: "Erro interno no servidor" });
}
});

export default router;
