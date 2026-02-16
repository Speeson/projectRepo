# Guia de archivos del proyecto (MVP RepoProjects)

Este documento resume para que sirve cada archivo importante del repo.
No incluye archivos generados automaticamente (`node_modules`, `dist`, `.angular/cache`).

## Raiz del repositorio

- `README.md`: documentacion principal del proyecto, estado, endpoints y como ejecutar.
- `README_init.md`: README inicial de plantilla (historico).

## Carpeta `db/`

- `db/schema.sql`: crea la base de datos `fp_repoprojects`, tablas (`users`, `projects`), claves e indices.
- `db/seed.sql`: inserta datos de prueba (usuarios por rol y proyectos en distintos estados).

## Carpeta `backend/`

### Configuracion general
- `backend/package.json`: dependencias y scripts (`dev`, `build`, `start`).
- `backend/package-lock.json`: bloqueo de versiones npm.
- `backend/tsconfig.json`: configuracion TypeScript del backend.
- `backend/.env.example`: variables de entorno de ejemplo (puerto, JWT, MySQL).
- `backend/.env`: variables reales de tu entorno local.
- `backend/.gitignore`: excluye `node_modules`, `dist` y `.env` del control de versiones.

### Entrada de la aplicacion
- `backend/src/server.ts`: arranque del servidor y comprobacion de conexion a DB.
- `backend/src/app.ts`: configuracion de Express (cors, json, rutas y 404).

### Configuracion interna
- `backend/src/config/env.ts`: lectura y validacion de variables de entorno.
- `backend/src/config/db.ts`: pool de conexion a MySQL/MariaDB.

### Middleware y tipos
- `backend/src/middleware/auth.ts`: validacion JWT (`requireAuth`) y control de roles (`requireRole`).
- `backend/src/types/auth.ts`: tipos de auth (roles, payload, usuario autenticado).
- `backend/src/types/express.d.ts`: extiende `Express.Request` para incluir `req.user`.

### Rutas API
- `backend/src/routes/health.routes.ts`: endpoint de salud `GET /api/health`.
- `backend/src/routes/auth.routes.ts`: login y datos del usuario (`POST /api/auth/login`, `GET /api/auth/me`).
- `backend/src/routes/projects.routes.ts`: endpoints de proyectos:
  - Publico: `GET /api/projects/public`
  - Alumno: `POST /api/projects`, `GET /api/projects/mine`, `PATCH /api/projects/:id/submit`
  - Moderacion: `GET /api/projects/pending`, `PATCH /api/projects/:id/publish`

## Carpeta `frontend/`

### Configuracion Angular
- `frontend/package.json`: scripts Angular (`start`, `build`) y dependencias.
- `frontend/package-lock.json`: bloqueo de versiones npm.
- `frontend/angular.json`: configuracion del build/serve y budgets.
- `frontend/tsconfig.json`, `frontend/tsconfig.app.json`, `frontend/tsconfig.spec.json`: configuraciones TypeScript.
- `frontend/src/main.ts`: punto de entrada de Angular.
- `frontend/src/index.html`: pagina HTML base.
- `frontend/src/styles.css`: estilos globales y tema Material.

### App principal
- `frontend/src/app/app.ts`: componente raiz (barra superior, logout, enlaces segun rol).
- `frontend/src/app/app.html`: plantilla del layout principal.
- `frontend/src/app/app.css`: estilos del layout principal.
- `frontend/src/app/app.config.ts`: providers globales (router, http, interceptor, animaciones).
- `frontend/src/app/app.routes.ts`: rutas y proteccion por auth/rol.

### Core (cliente API, auth y seguridad)
- `frontend/src/app/core/api-base.ts`: URL base del backend (`http://127.0.0.1:3000/api`).
- `frontend/src/app/core/models.ts`: tipos TS de usuarios, proyectos y respuestas API.
- `frontend/src/app/core/services/auth.service.ts`: login/logout, token y usuario actual.
- `frontend/src/app/core/services/project.service.ts`: llamadas HTTP de proyectos.
- `frontend/src/app/core/interceptors/auth.interceptor.ts`: anade JWT a peticiones.
- `frontend/src/app/core/guards/auth.guard.ts`: bloquea rutas si no hay sesion.
- `frontend/src/app/core/guards/role.guard.ts`: bloquea rutas segun rol.

### Paginas
- `frontend/src/app/pages/login-page.component.ts|html|css`: pantalla de login.
- `frontend/src/app/pages/public-projects-page.component.ts|html|css`: listado publico con filtros.
- `frontend/src/app/pages/my-projects-page.component.ts|html|css`: vista ALUMNO (crear, listar, enviar a revision).
- `frontend/src/app/pages/pending-projects-page.component.ts|html|css`: vista DOCENTE/ADMIN (pendientes y publicar).

## Carpeta `docs/`

- `docs/backlog.md`: backlog de tareas del hackaton y estado de cada bloque.
- `docs/decisiones.md`: decisiones tecnicas tomadas y su razon.

## Carpeta `context/`

- `context/Guia_Alumnado_Hackaton_FP_RepoProjects.pdf`: enunciado oficial del hackaton.
- `context/guia_archivos_proyecto.md`: este documento.
