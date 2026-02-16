export type UserRole = "ALUMNO" | "DOCENTE" | "ADMIN";

export type AuthTokenPayload = {
  sub: number;
  email: string;
  role: UserRole;
};

export type AuthUser = {
  id: number;
  email: string;
  role: UserRole;
};
