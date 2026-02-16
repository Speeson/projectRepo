import { app } from "./app";
import { pool } from "./config/db";
import { env } from "./config/env";

async function start(): Promise<void> {
  try {
    await pool.query("SELECT 1");
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

void start();
