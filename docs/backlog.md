# Backlog Hackaton - FP RepoProjects

## 1. Reglas de trabajo
- Reparto obligatorio por verticales segun `context/distribucion_verticales.md`.
- Cada tarea debe tener vertical responsable, persona responsable y estado.
- No se empieza una tarea sin definir endpoint, tabla o contrato JSON.
- Commits recomendados cada 20-30 minutos.

Estados sugeridos: `TODO`, `IN_PROGRESS`, `BLOCKED`, `DONE`

## 2. Sprint unico (4 horas)

| ID | Vertical | Tarea | Responsable sugerido | Estado | Prioridad | Criterio de aceptacion |
|---|---|---|---|---|---|---|
| A-01 | A (Infra + DB) | Inicializar backend Express + TypeScript | ASIR1 | DONE | Alta | `npm run dev` levanta API |
| A-02 | A (Infra + DB) | Configurar conexion MySQL y variables de entorno | ASIR1 | DONE | Alta | Backend conecta con `fp_repoprojects` |
| A-03 | A (Infra + DB) | Crear `db/schema.sql` con tablas `users` y `projects` | ASIR1 | DONE | Alta | Script ejecuta sin errores |
| A-04 | A (Infra + DB) | Crear `db/seed.sql` con roles, usuarios y proyectos de ejemplo | ASIR1 | DONE | Alta | Hay usuarios ALUMNO/DOCENTE/ADMIN y proyectos en varios estados |
| A-05 | A (Infra + DB) | Endpoint `GET /api/health` operativo | ASIR1 | DONE | Alta | Responde OK para validar entorno |
| A-06 | A (Infra + DB) | Documentar pasos minimos de arranque en `README.md` | ASIR1 | DONE | Media | README permite levantar proyecto desde cero |
| B-01 | B (Auth) | Implementar `POST /api/auth/login` y JWT | DAM1 | DONE | Alta | Devuelve token valido con credenciales correctas |
| B-02 | B (Auth) | Implementar `GET /api/auth/me` | DAM1 | DONE | Alta | Devuelve usuario autenticado con token valido |
| B-03 | B (Auth) | Middleware `auth` + `requireRole` | DAM1 | DONE | Alta | Endpoints protegidos por rol |
| B-04 | B (Auth) | Login frontend con Reactive Forms | DAM1 | DONE | Alta | Login guarda JWT en localStorage |
| B-05 | B (Auth) | Interceptor JWT + navegacion post-login + error 401 visible | DAM1 | DONE | Alta | Peticiones autenticadas y error de auth visible |
| C-01 | C (Publicos) | `GET /api/projects/public` con filtros | DAM2 | DONE | Alta | Filtra por ciclo, texto y curso_academico |
| C-02 | C (Publicos) | Pantalla publica con filtros | DAM2 | DONE | Alta | Renderiza proyectos publicados y aplica filtros |
| D-01 | D (Area alumno) | `POST /api/projects` (ALUMNO) | DAM3 | DONE | Alta | Crea proyecto en `BORRADOR` |
| D-02 | D (Area alumno) | `GET /api/projects/mine` (ALUMNO) | DAM3 | DONE | Media | Lista solo proyectos del autor autenticado |
| D-03 | D (Area alumno) | `PATCH /api/projects/:id/submit` (ALUMNO) | DAM3 | DONE | Media | Cambia de BORRADOR a PENDIENTE |
| D-04 | D (Area alumno) | Pantalla Mis Proyectos (crear/listar/enviar) | DAM3 | DONE | Alta | Crear/listar/enviar a revision funciona |
| E-01 | E (Moderacion) | `GET /api/projects/pending` (DOCENTE/ADMIN) | ASIR2 o DAM4 | DONE | Alta | Lista proyectos `PENDIENTE` |
| E-02 | E (Moderacion) | `PATCH /api/projects/:id/publish` (DOCENTE/ADMIN) | ASIR2 o DAM4 | DONE | Alta | Cambia estado a `PUBLICADO` |
| E-03 | E (Moderacion) | Pantalla pendientes docente/admin + boton Publicar | ASIR2 o DAM4 | DONE | Alta | Publicar proyecto y refrescar listado |
| X-01 | Integracion | Prueba E2E manual del flujo obligatorio | Todo el equipo | DONE | Alta | Flujo completo validado sin errores criticos |

## 3. Reparto operativo obligatorio (5 personas)

| Vertical | Persona sugerida | Nombre | Ownership principal | Archivos/zonas |
|---|---|---|---|---|
| A | ASIR1 |  | Infra + DB + health + README base | `db/schema.sql`, `db/seed.sql`, `backend/src/config/db.ts`, `backend/src/routes/health.routes.ts`, `README.md` |
| B | DAM1 |  | Auth end-to-end (login + JWT + interceptor) | `backend/src/routes/auth.routes.ts`, `backend/src/middleware/auth.ts`, `frontend/src/app/pages/login-page.component.ts`, `frontend/src/app/pages/login-page.component.html`, `frontend/src/app/core/services/auth.service.ts`, `frontend/src/app/core/interceptors/auth.interceptor.ts` |
| C | DAM2 |  | Publicos end-to-end (endpoint + listado + filtros) | `backend/src/routes/projects.routes.ts` (public), `frontend/src/app/pages/public-projects-page.component.ts`, `frontend/src/app/pages/public-projects-page.component.html` |
| D | DAM3 |  | Area alumno end-to-end | `backend/src/routes/projects.routes.ts` (mine/create/submit), `frontend/src/app/pages/my-projects-page.component.ts`, `frontend/src/app/pages/my-projects-page.component.html` |
| E | ASIR2 o DAM4 |  | Moderacion end-to-end | `backend/src/routes/projects.routes.ts` (pending/publish), `frontend/src/app/pages/pending-projects-page.component.ts`, `frontend/src/app/pages/pending-projects-page.component.html` |

## 4. Ramas y merge (alineado a verticales)

Ramas recomendadas:
- `feat/db-infra` (Vertical A)
- `feat/auth-login` (Vertical B)
- `feat/proyectos-publicos` (Vertical C)
- `feat/proyectos-alumno` (Vertical D)
- `feat/moderacion-publicar` (Vertical E)
- `chore/docs-readme` (soporte documental)

Orden recomendado de merge:
1. `feat/db-infra`
2. `feat/auth-login`
3. `feat/proyectos-publicos`
4. `feat/proyectos-alumno` y `feat/moderacion-publicar` en paralelo
5. `chore/docs-readme`

## 5. Dependencias criticas
- Vertical B depende de Vertical A.
- Vertical C depende de Vertical A.
- Vertical D depende de Vertical B.
- Vertical E depende de Vertical B.
- El flujo final depende de C + D + E integradas.

## 6. Registro rapido de progreso
- [ ] 00:00-00:30 Vertical A (entorno + DB + health)
- [ ] 00:30-01:30 Vertical B (auth completo)
- [ ] 01:30-02:15 Vertical C (publicos)
- [ ] 02:15-03:15 Vertical D y E en paralelo
- [x] 03:15-04:00 Integracion, QA manual y README final
