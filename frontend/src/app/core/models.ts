export type UserRole = 'ALUMNO' | 'DOCENTE' | 'ADMIN';

export type AuthUser = {
  id: number;
  email: string;
  role: UserRole;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type ProjectStatus = 'BORRADOR' | 'PENDIENTE' | 'PUBLICADO' | 'RECHAZADO';

export type PublicProject = {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: 'DAM' | 'ASIR';
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: 'PUBLICADO';
  autor: string;
  fecha_creacion: string;
};

export type PublicProjectsResponse = {
  total: number;
  filters: {
    ciclo: 'DAM' | 'ASIR' | null;
    curso_academico: string | null;
    q: string | null;
  };
  items: PublicProject[];
};

export type MyProject = {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: 'DAM' | 'ASIR';
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: ProjectStatus;
  fecha_creacion: string;
  fecha_actualizacion: string;
};

export type MyProjectsResponse = {
  total: number;
  items: MyProject[];
};

export type PendingProject = {
  id: number;
  titulo: string;
  descripcion: string;
  ciclo: 'DAM' | 'ASIR';
  curso_academico: string;
  tecnologias: string;
  repositorio_url: string;
  demo_url: string | null;
  estado: 'PENDIENTE';
  autor: string;
  autor_email: string;
  fecha_creacion: string;
};

export type PendingProjectsResponse = {
  total: number;
  items: PendingProject[];
};
