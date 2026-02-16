-- Hackaton FP RepoProjects
-- seed.sql
-- Requiere ejecutar antes db/schema.sql

USE fp_repoprojects;

-- Password de ejemplo para todos: Password123!
-- Guardada como SHA-256 para simplificar el MVP del hackaton
INSERT INTO users (full_name, email, password_hash, role) VALUES
  ('Ana Alumna', 'alumno@repoprojects.local', SHA2('Password123!', 256), 'ALUMNO'),
  ('Diego Docente', 'docente@repoprojects.local', SHA2('Password123!', 256), 'DOCENTE'),
  ('admin', 'admin@example.com', SHA2('Pass123!', 256), 'ADMIN'),
  ('Ada Admin', 'admin@repoprojects.local', SHA2('Password123!', 256), 'ADMIN');

-- Proyectos de ejemplo para probar listados, filtros y flujo
INSERT INTO projects (
  titulo,
  descripcion,
  ciclo,
  curso_academico,
  tecnologias,
  repositorio_url,
  demo_url,
  estado,
  autor_id
) VALUES
  (
    'Gestor de Biblioteca Escolar',
    'Aplicacion para gestionar prestamos, reservas y catalogo en un centro educativo.',
    'DAM',
    '2025-2026',
    'Angular, Node.js, Express, MySQL',
    'https://github.com/example/biblioteca-escolar',
    'https://demo.example.com/biblioteca',
    'PUBLICADO',
    1
  ),
  (
    'Monitorizacion de Servicios LAN',
    'Panel para monitorizar disponibilidad y metricas basicas de equipos y servicios.',
    'ASIR',
    '2025-2026',
    'Node.js, Express, Prometheus, Grafana',
    'https://github.com/example/monitorizacion-lan',
    NULL,
    'PENDIENTE',
    1
  ),
  (
    'App de Gestion de Tareas',
    'MVP para organizacion de tareas por equipos con etiquetas y prioridades.',
    'DAM',
    '2024-2025',
    'Angular, TypeScript, MySQL',
    'https://github.com/example/gestion-tareas',
    NULL,
    'BORRADOR',
    1
  ),
  (
    'Inventario de Hardware de Aula',
    'Registro de equipos con historial de incidencias y estado operativo.',
    'ASIR',
    '2024-2025',
    'Express, MySQL, Docker',
    'https://github.com/example/inventario-hardware',
    NULL,
    'RECHAZADO',
    1
  );
