import dotenv from "dotenv";

dotenv.config();

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(readEnv("PORT", "3000")),
  jwtSecret: readEnv("JWT_SECRET"),
  jwtExpiresIn: readEnv("JWT_EXPIRES_IN", "8h"),
  dbHost: readEnv("DB_HOST", "127.0.0.1"),
  dbPort: Number(readEnv("DB_PORT", "3306")),
  dbUser: readEnv("DB_USER"),
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbName: readEnv("DB_NAME", "fp_repoprojects")
};
