import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import streaksRoutes from "./routes/streaks.routes";
import newsRoutes from "./routes/newsletterOpen.routes";
import newsletterRoutes from "./jobs/fetchNewsletterJob";
import messageRoutes from "./routes/message.routes";
import webHookRoutes from "./routes/webhook.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/streaks", streaksRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/webhook", webHookRoutes);
router.use("/news", newsRoutes);
router.use("/message", messageRoutes);


export default router;
