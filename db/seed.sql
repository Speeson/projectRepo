-- Hackaton FP RepoProjects
-- seed.sql
-- Requiere ejecutar antes db/schema.sql

USE fp_repoprojects;

-- Permite re-ejecutar la seed sin errores de duplicados
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE projects;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Password de ejemplo para todos: Password123!
-- Guardada como SHA-256 para simplificar el MVP del hackaton
INSERT INTO users (full_name, email, password_hash, role) VALUES
  ('Ana Alumna', 'alumno@repoprojects.local', SHA2('Password123!', 256), 'ALUMNO'),
  ('Diego Docente', 'docente@repoprojects.local', SHA2('Password123!', 256), 'DOCENTE'),
  ('Ada Admin', 'admin@repoprojects.local', SHA2('Password123!', 256), 'ADMIN'),
  ('Bruno Alumno', 'bruno@repoprojects.local', SHA2('Password123!', 256), 'ALUMNO'),
  ('Clara Alumna', 'clara@repoprojects.local', SHA2('Password123!', 256), 'ALUMNO'),
  ('Nora Docente', 'nora@repoprojects.local', SHA2('Password123!', 256), 'DOCENTE'),
  ('admin', 'admin@example.com', SHA2('Pass123!', 256), 'ADMIN'),
  ('Ivan Admin', 'ivan@repoprojects.local', SHA2('Password123!', 256), 'ADMIN');

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
  ),
  (
    'Portal de Tutorias FP',
    'Reserva de tutoria, historial de citas y avisos para alumnado.',
    'DAM',
    '2025-2026',
    'Angular, NestJS, PostgreSQL',
    'https://github.com/example/portal-tutorias-fp',
    'https://demo.example.com/tutorias',
    'PUBLICADO',
    4
  ),
  (
    'Sistema de Tickets de Soporte',
    'Gestion de incidencias tecnicas por aula con estados y comentarios.',
    'ASIR',
    '2025-2026',
    'React, Express, MySQL',
    'https://github.com/example/tickets-soporte',
    NULL,
    'PENDIENTE',
    4
  ),
  (
    'Control de Asistencia NFC',
    'Registro de asistencia con lectura NFC y panel de estadisticas.',
    'DAM',
    '2023-2024',
    'Kotlin, Spring Boot, MariaDB',
    'https://github.com/example/asistencia-nfc',
    NULL,
    'BORRADOR',
    4
  ),
  (
    'Laboratorio Virtual de Redes',
    'Escenarios de practica para VLAN, routing y firewall en entorno web.',
    'ASIR',
    '2025-2026',
    'Vue, Go, Docker',
    'https://github.com/example/lab-redes-virtual',
    'https://demo.example.com/lab-redes',
    'PUBLICADO',
    5
  ),
  (
    'Gestor de Eventos del Centro',
    'Calendario colaborativo con inscripciones y control de plazas.',
    'DAM',
    '2024-2025',
    'Angular, Firebase, Cloud Functions',
    'https://github.com/example/eventos-centro',
    NULL,
    'PENDIENTE',
    5
  ),
  (
    'Auditoria Basica de Servidores',
    'Checklist automatizado de hardening y exportacion de informes.',
    'ASIR',
    '2023-2024',
    'Python, FastAPI, SQLite',
    'https://github.com/example/auditoria-servidores',
    NULL,
    'RECHAZADO',
    5
  ),
  (
    'Marketplace de Material Escolar',
    'Intercambio de material entre estudiantes con mensajes y valoraciones.',
    'DAM',
    '2025-2026',
    'Next.js, Prisma, MySQL',
    'https://github.com/example/marketplace-material',
    'https://demo.example.com/market',
    'PUBLICADO',
    1
  ),
  (
    'Panel de Energia del Edificio',
    'Visualizacion de consumo electrico por planta con alertas de picos.',
    'ASIR',
    '2024-2025',
    'Svelte, Node.js, InfluxDB',
    'https://github.com/example/panel-energia',
    NULL,
    'PENDIENTE',
    4
  ),
  (
    'Generador de Horarios FP',
    'Motor de asignacion de aulas y franjas con restricciones academicas.',
    'DAM',
    '2023-2024',
    'Java, Spring, MySQL',
    'https://github.com/example/generador-horarios',
    NULL,
    'BORRADOR',
    5
  ),
  (
    'Catalogo de Proyectos Historicos',
    'Buscador de proyectos de promociones anteriores con filtros avanzados.',
    'DAM',
    '2022-2023',
    'Angular, Elasticsearch, Express',
    'https://github.com/example/catalogo-proyectos',
    NULL,
    'PUBLICADO',
    5
  ),
  (
    'Seguimiento de Practicas FCT',
    'Registro de tareas, tutorias y evaluaciones durante FCT.',
    'ASIR',
    '2025-2026',
    'Laravel, MySQL, Bootstrap',
    'https://github.com/example/seguimiento-fct',
    'https://demo.example.com/fct',
    'PUBLICADO',
    4
  );
