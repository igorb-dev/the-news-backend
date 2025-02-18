import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import streaksRoutes from "./routes/streaks.routes";
import newsletterRoutes from "./jobs/fetchNewsletterJob";
import webHookRoutes from "./routes/webhook.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/streaks", streaksRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/webhook", webHookRoutes);


export default router;
