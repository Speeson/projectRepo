# Resumen simple de archivos (para demo)

## Que hay en este proyecto

- `db/`: base de datos (estructura + datos de ejemplo).
- `backend/`: API que gestiona login, roles y proyectos.
- `frontend/`: aplicacion web que usa la API.
- `docs/`: backlog y decisiones del equipo.
- `README.md`: como ejecutar todo.

## Archivos clave y para que sirven

### Base de datos
- `db/schema.sql`: crea la base de datos y tablas.
- `db/seed.sql`: mete usuarios de prueba y proyectos iniciales.

### Backend (API)
- `backend/src/server.ts`: arranca el servidor.
- `backend/src/app.ts`: configura rutas y middleware.
- `backend/src/routes/auth.routes.ts`: login y usuario actual.
- `backend/src/routes/projects.routes.ts`: endpoints de proyectos (publicos, alumno y docente/admin).
- `backend/src/middleware/auth.ts`: valida JWT y permisos por rol.
- `backend/.env`: configuracion local (puerto, DB, JWT).

### Frontend (web)
- `frontend/src/app/app.routes.ts`: rutas de la aplicacion.
- `frontend/src/app/core/services/auth.service.ts`: login/logout y token.
- `frontend/src/app/core/services/project.service.ts`: llamadas a la API de proyectos.
- `frontend/src/app/pages/login-page.component.ts`: pantalla de login.
- `frontend/src/app/pages/public-projects-page.component.ts`: listado publico con filtros.
- `frontend/src/app/pages/my-projects-page.component.ts`: zona alumno.
- `frontend/src/app/pages/pending-projects-page.component.ts`: zona docente/admin.

## Flujo del MVP (en una frase)

Alumno crea proyecto -> lo envia a revision -> docente/admin lo publica -> aparece en el listado publico.

## Como se ejecuta

1. Cargar DB con `db/schema.sql` y `db/seed.sql`.
2. Levantar backend en `backend/` con `npm run dev`.
3. Levantar frontend en `frontend/` con `npm start`.
4. Abrir `http://localhost:4200`.
