# Backlog Hackaton - FP RepoProjects

## 1. Reglas de trabajo
- Cada tarea debe tener responsable y estado.
- No se empieza una tarea sin definir antes endpoint, tabla o contrato JSON.
- Commits recomendados cada 20-30 minutos.

Estados sugeridos: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`

## 2. Sprint unico (4 horas)

| ID | Tarea | Responsable | Estado | Prioridad | Criterio de aceptacion |
|---|---|---|---|---|---|
| DB-01 | Crear `db/schema.sql` con tablas `users` y `projects` |  | DONE | Alta | Script ejecuta sin errores |
| DB-02 | Crear `db/seed.sql` con roles, usuarios y proyectos de ejemplo |  | DONE | Alta | Hay usuarios ALUMNO/DOCENTE/ADMIN y proyectos en varios estados |
| BE-01 | Inicializar backend Express + TypeScript |  | DONE | Alta | `npm run dev` levanta API |
| BE-02 | Configurar conexion MySQL y variables de entorno |  | DONE | Alta | Backend conecta con `fp_repoprojects` |
| BE-03 | Implementar `POST /api/auth/login` y JWT |  | DONE | Alta | Devuelve token valido con credenciales correctas |
| BE-04 | Middleware `auth` + `requireRole` |  | DONE | Alta | Endpoints protegidos por rol |
| BE-05 | `GET /api/projects/public` con filtros |  | DONE | Alta | Filtra por ciclo, texto y curso_academico |
| BE-06 | `POST /api/projects` (ALUMNO) |  | DONE | Alta | Crea proyecto en `BORRADOR` |
| BE-07 | `GET /api/projects/mine` (ALUMNO) |  | DONE | Media | Lista solo proyectos del autor autenticado |
| BE-08 | `PATCH /api/projects/:id/submit` (ALUMNO) |  | DONE | Media | Cambia de BORRADOR a PENDIENTE |
| BE-09 | `GET /api/projects/pending` (DOCENTE/ADMIN) |  | DONE | Alta | Lista proyectos `PENDIENTE` |
| BE-10 | `PATCH /api/projects/:id/publish` (DOCENTE/ADMIN) |  | DONE | Alta | Cambia estado a `PUBLICADO` |
| FE-01 | Inicializar frontend Angular + Material |  | DONE | Alta | `ng serve` arranca correctamente |
| FE-02 | Login con Reactive Forms |  | DONE | Alta | Login guarda JWT en localStorage |
| FE-03 | Interceptor JWT + guards por rol |  | DONE | Alta | Peticiones autenticadas y rutas protegidas |
| FE-04 | Pantalla publico con filtros |  | DONE | Alta | Renderiza solo proyectos publicados |
| FE-05 | Pantalla mis proyectos |  | DONE | Alta | Crear/listar/enviar a revision funciona |
| FE-06 | Pantalla pendientes docente/admin |  | DONE | Alta | Publicar proyecto funciona |
| QA-01 | Prueba E2E manual del flujo obligatorio |  | TODO | Alta | Flujo completo validado sin errores criticos |
| DOC-01 | Actualizar README con comandos finales y notas |  | TODO | Media | README permite levantar proyecto desde cero |

## 3. Reparto sugerido por rol
- Analista/Arquitecto: define contratos API y valida decisiones.
- Backend lead: tareas `BE-*`.
- Frontend lead: tareas `FE-*`.
- DB/Infra lead: tareas `DB-*` y conexion entorno.
- Integrador/QA: tareas `QA-*` y soporte merge.

## 4. Bloqueos y dependencias
- `BE-03` depende de `BE-01` y `BE-02`.
- `FE-02` depende de `BE-03`.
- `FE-04`, `FE-05`, `FE-06` dependen de endpoints backend correspondientes.

## 5. Registro rapido de progreso
- [ ] 00:00-00:30 Preparacion entorno + DB
- [ ] 00:30-01:30 Auth backend + login frontend
- [ ] 01:30-02:30 Endpoints proyectos + pantallas base
- [ ] 02:30-03:30 Integracion + roles + filtros
- [ ] 03:30-04:00 QA + README + demo
