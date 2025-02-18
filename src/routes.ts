import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import streaksRoutes from "./routes/streaks.routes";
//import newsletterRoutes from "./routes/newsletter.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/streaks", streaksRoutes);
//router.use("/newsletter", newsletterRoutes);


export default router;
