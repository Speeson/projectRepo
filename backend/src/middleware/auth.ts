import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthTokenPayload, UserRole } from "../types/auth";

function isAuthTokenPayload(value: unknown): value is AuthTokenPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const token = value as Partial<AuthTokenPayload>;
  return (
    typeof token.sub === "number" &&
    typeof token.email === "string" &&
    (token.role === "ALUMNO" || token.role === "DOCENTE" || token.role === "ADMIN")
  );
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.slice("Bearer ".length).trim();
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    if (!isAuthTokenPayload(decoded)) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden for this role" });
      return;
    }
    next();
  };
}
