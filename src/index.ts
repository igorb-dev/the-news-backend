import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import router from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
