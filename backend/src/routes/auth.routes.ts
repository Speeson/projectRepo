import { Router } from "express";
import jwt from "jsonwebtoken";
import type { RowDataPacket } from "mysql2";
import { pool } from "../config/db";
import { env } from "../config/env";
import { requireAuth } from "../middleware/auth";
import type { UserRole } from "../types/auth";

type LoginRow = RowDataPacket & {
  id: number;
  email: string;
  role: UserRole;
};

const authRouter = Router();

authRouter.get("/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

authRouter.post("/auth/login", async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
    return;
  }

  const [rows] = await pool.query<LoginRow[]>(
    `
      SELECT id, email, role
      FROM users
      WHERE email = ?
        AND password_hash = SHA2(?, 256)
      LIMIT 1
    `,
    [email, password]
  );

  const user = rows[0];
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"] }
  );

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

export { authRouter };
