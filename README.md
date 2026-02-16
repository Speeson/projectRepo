# FP RepoProjects - MVP Hackaton

Repositorio del equipo para construir un MVP funcional de un repositorio de proyectos de final de ciclo.

## 1. Objetivo
Desarrollar una aplicacion web con:
- Frontend: Angular
- Backend: Node.js + Express + TypeScript
- Base de datos: MySQL

Flujo minimo obligatorio:
1. ALUMNO inicia sesion.
2. ALUMNO crea proyecto en estado `BORRADOR`.
3. ALUMNO envia a revision (`PENDIENTE`).
4. DOCENTE/ADMIN revisa y publica (`PUBLICADO`).
5. El listado publico muestra solo proyectos `PUBLICADO`.

## 2. Stack y requisitos
- Node.js LTS
- npm
- Angular CLI
- MySQL Server 8+
- Git
- VS Code

## 3. Estructura del repositorio
- `frontend/`: aplicacion Angular.
- `backend/`: API REST Express + TypeScript.
- `db/`: scripts SQL (`schema.sql`, `seed.sql`).
- `docs/`: backlog, decisiones y notas de equipo.
  - `docs/backlog.md`: tareas del sprint del hackaton.
  - `docs/decisiones.md`: registro de decisiones tecnicas.

## 4. Estado actual del proyecto
- [x] Definicion inicial del alcance MVP.
- [x] Base de datos inicial creada en `db/schema.sql` y `db/seed.sql`.
- [x] Backend inicial (auth + JWT + roles).
- [x] Frontend inicial (login + listados).
- [x] Integracion completa flujo ALUMNO -> DOCENTE/ADMIN.

## 5. Base de datos
Scripts disponibles:
- `db/schema.sql`
- `db/seed.sql`

### Tablas actuales
- `users`
- `projects`

### Roles
- `ALUMNO`
- `DOCENTE`
- `ADMIN`

### Estados de proyecto
- `BORRADOR`
- `PENDIENTE`
- `PUBLICADO`
- `RECHAZADO`

### Carga local
1. Ejecutar `db/schema.sql`.
2. Ejecutar `db/seed.sql`.

Credenciales de prueba (seed):
- `alumno@repoprojects.local`
- `docente@repoprojects.local`
- `admin@repoprojects.local`
- Password para todos: `Password123!`

## 6. API planificada (MVP)
Base path: `/api`

Auth:
- `POST /auth/login`
- `GET /auth/me` (token requerido)

Proyectos publicos:
- `GET /projects/public`

Proyectos de alumno:
- `POST /projects`
- `GET /projects/mine`
- `PATCH /projects/:id/submit`

Moderacion docente/admin:
- `GET /projects/pending`
- `PATCH /projects/:id/publish`

## 7. Frontend planificado (MVP)
Pantallas minimas:
- Login
- Listado publico de proyectos (con filtros)
- Mis proyectos (crear/listar/enviar a revision)
- Pendientes (publicar)

Filtros minimos del listado publico:
- Por `ciclo` (`DAM`/`ASIR`)
- Por texto (`titulo`/`descripcion`/`tecnologias`)
- Por `curso_academico`

## 8. Decisiones tecnicas
- Se usa SQL reproducible en `db/` para levantar entorno rapido.
- En la seed actual la password se almacena con `SHA2` para simplificar el MVP del hackaton.
- En version posterior se migrara a `bcrypt` en backend para entorno real.

## 9. Como ejecutar (work in progress)
### Base de datos
1. Crear/actualizar esquema ejecutando `db/schema.sql`.
2. Poblar datos con `db/seed.sql`.

### Backend
1. Ir a `backend/`.
2. Instalar dependencias: `npm install`.
3. Copiar variables: `cp .env.example .env` (en Windows PowerShell: `Copy-Item .env.example .env`).
4. Ajustar credenciales MySQL en `.env`.
5. Levantar API: `npm run dev`.

Backend implementado actualmente:
- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/projects/public` (filtros: `ciclo`, `curso_academico`, `q`)
- `POST /api/projects` (ALUMNO, crea en `BORRADOR`)
- `GET /api/projects/mine` (ALUMNO)
- `PATCH /api/projects/:id/submit` (ALUMNO, `BORRADOR` -> `PENDIENTE`)
- `GET /api/projects/pending` (DOCENTE/ADMIN)
- `PATCH /api/projects/:id/publish` (DOCENTE/ADMIN, `PENDIENTE` -> `PUBLICADO`)

### Frontend
1. Ir a `frontend/`.
2. Instalar dependencias: `npm install`.
3. Levantar app: `npm start`.

Frontend implementado actualmente:
- Login con Reactive Forms y JWT en localStorage.
- Interceptor para `Authorization: Bearer`.
- Guards por rol (`ALUMNO`, `DOCENTE`/`ADMIN`).
- Vista publica con filtros (`ciclo`, `curso_academico`, `q`).
- Vista alumno (crear borrador, listar propios, enviar a revision).
- Vista docente/admin (listar pendientes y publicar).

## 10. Bitacora de avance
- 2026-02-16: Creacion de `db/schema.sql` y `db/seed.sql` con roles, estados y datos semilla.
- 2026-02-16: Creacion de este `README.md` como documento vivo de seguimiento.
- 2026-02-16: Inicializacion de `backend/` con Express + TypeScript + MySQL + JWT.
- 2026-02-16: Implementado `GET /api/projects/public` con filtros obligatorios.
- 2026-02-16: Implementados endpoints de alumno (`POST /projects`, `GET /projects/mine`, `PATCH /projects/:id/submit`).
- 2026-02-16: Implementados endpoints de moderacion (`GET /projects/pending`, `PATCH /projects/:id/publish`).
- 2026-02-16: Inicializado frontend Angular + Material e integradas pantallas MVP.

## 11. Pendientes inmediatos
1. Ejecutar QA manual de flujo completo por rol.
2. Ajustar detalles visuales y mensajes de error para demo final.
