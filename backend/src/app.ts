import cors from "cors";
import express from "express";
import { authRouter } from "./routes/auth.routes";
import { healthRouter } from "./routes/health.routes";
import { projectsRouter } from "./routes/projects.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", authRouter);
app.use("/api", projectsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

export { app };
