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
- MySQL 8+ o MariaDB compatible
- Git
- VS Code

## 3. Estructura del repositorio
- `frontend/`: aplicacion Angular.
- `backend/`: API REST Express + TypeScript.
- `db/`: scripts SQL (`schema.sql`, `seed.sql`).
- `docs/`: backlog, decisiones y notas de equipo.
  - `docs/backlog.md`: tareas del sprint del hackaton.
  - `docs/decisiones.md`: registro de decisiones tecnicas.
  - `docs/qa_manual.md`: checklist QA manual y evidencia E2E.

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

Base de datos objetivo:
- `repoprojects_db`

### Tablas actuales
- `usuarios`
- `proyectos`

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
1. Ejecutar schema en MySQL (puerto 3307):
   - `Get-Content .\db\schema.sql -Raw | mysql -h 127.0.0.1 -P 3307 -u root -p`
2. Ejecutar seed:
   - `Get-Content .\db\seed.sql -Raw | mysql -h 127.0.0.1 -P 3307 -u root -p`
3. Verificar tablas:
   - `mysql -h 127.0.0.1 -P 3307 -u root -p -D repoprojects_db -e "SHOW TABLES;"`
4. Verificar que backend usa `DB_PORT=3307` y `DB_NAME=repoprojects_db`.

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

## 9. Como ejecutar
### Base de datos
Desde la raiz del repo:
1. `Get-Content .\db\schema.sql -Raw | mysql -h 127.0.0.1 -P 3307 -u root -p`
2. `Get-Content .\db\seed.sql -Raw | mysql -h 127.0.0.1 -P 3307 -u root -p`

### Backend
1. Ir a `backend/`.
2. Instalar dependencias: `npm install`.
3. Copiar variables: `cp .env.example .env` (en Windows PowerShell: `Copy-Item .env.example .env`).
4. Ajustar credenciales MySQL en `.env` (`DB_HOST`, `DB_PORT=3307`, `DB_USER`, `DB_PASSWORD`, `DB_NAME=repoprojects_db`).
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
- 2026-02-16: Ejecutada QA manual E2E y cerrada documentacion final.
- 2026-02-17: Migracion de BD al esquema `usuarios/proyectos` (`repoprojects_db`) y actualizacion de seed/backend.

## 11. Demo rapida (checklist)
1. Login como `ALUMNO` y crear proyecto en `BORRADOR`.
2. Enviar proyecto a revision (`PENDIENTE`).
3. Login como `DOCENTE` o `ADMIN` y publicar proyecto.
4. Ir al listado publico y comprobar que aparece como `PUBLICADO`.

## 12. Estado de entrega
- MVP funcional completado.
- Flujo obligatorio validado.
- QA manual documentada en `docs/qa_manual.md`.

## 13. Docker local
Servicios definidos en `docker-compose.yml`:
- `db` (MySQL 8)
- `backend` (Node.js + Express)
- `frontend` (Angular build estatico servido por Nginx)

Comandos:
1. `docker compose up --build -d`
2. `docker compose ps`
3. `docker compose logs -f backend`

Endpoints:
- App: `http://localhost:8080`
- API: `http://localhost:3000/api/health`
- MySQL: `127.0.0.1:3308` (`root` / `root`, DB `repoprojects_db`)

Reinicializar base de datos en contenedor:
1. `docker compose down -v`
2. `docker compose up --build -d`

## 14. GitHub Actions (imagenes Docker)
Workflow incluido:
- `.github/workflows/docker-images.yml`
- `.github/workflows/deploy.yml`

Que hace:
1. Se ejecuta en `push` a `main` o `dev` (y manual con `workflow_dispatch`).
2. Construye y publica imagenes de `backend` y `frontend` en GHCR.
3. Etiquetas generadas: `sha`, nombre de rama y `latest` en la rama por defecto.

Formato de imagen:
- `ghcr.io/speeson/projectrepo/backend`
- `ghcr.io/speeson/projectrepo/frontend`

URLs utiles:
- Actions: `https://github.com/Speeson/projectRepo/actions`
- GHCR backend: `https://ghcr.io/speeson/projectrepo/backend`
- GHCR frontend: `https://ghcr.io/speeson/projectrepo/frontend`

Deploy automatico en Windows (self-hosted runner):
1. Se ejecuta en push a `main` (o manual desde Actions).
2. El job corre en tu runner local (`runs-on: [self-hosted, Windows, X64]`).
3. Ejecuta `docker compose up -d --build --remove-orphans` en el repositorio.

Requisitos:
- Tener el runner de GitHub Actions levantado (`run.cmd` o servicio).
- Docker Desktop funcionando en la maquina del runner.
