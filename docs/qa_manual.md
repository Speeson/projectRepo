# QA manual - MVP RepoProjects

## Objetivo
Validar el flujo obligatorio del hackaton de extremo a extremo:
- ALUMNO crea borrador
- ALUMNO envia a revision
- DOCENTE/ADMIN publica
- El proyecto aparece en listado publico

## Precondiciones
- Base de datos cargada (`db/schema.sql` + `db/seed.sql`).
- Backend levantado en `http://127.0.0.1:3000`.
- Frontend levantado en `http://localhost:4200`.

## Credenciales de prueba
- ALUMNO: `alumno@repoprojects.local` / `Password123!`
- DOCENTE: `docente@repoprojects.local` / `Password123!`
- ADMIN: `admin@repoprojects.local` / `Password123!`

## Checklist manual (UI)

| ID | Caso | Pasos | Esperado | Estado |
|---|---|---|---|---|
| QA-UI-01 | Login ALUMNO | Entrar con credenciales de alumno | Redirige a `/my-projects` | PASS |
| QA-UI-02 | Crear borrador | En "Mis proyectos" crear un proyecto valido | Se muestra con estado `BORRADOR` | PASS |
| QA-UI-03 | Enviar a revision | Pulsar "Enviar a revision" en un borrador | Estado cambia a `PENDIENTE` | PASS |
| QA-UI-04 | Login DOCENTE | Cerrar sesion y entrar como docente | Redirige a `/pending` | PASS |
| QA-UI-05 | Publicar pendiente | En "Pendientes" publicar un proyecto | Proyecto sale de pendientes | PASS |
| QA-UI-06 | Validar publico | Ir a `/public` y filtrar por texto/titulo | Proyecto aparece como `PUBLICADO` | PASS |
| QA-UI-07 | Control de rol alumno | Alumno intenta entrar a `/pending` | Acceso denegado/redireccion a publico | PASS |
| QA-UI-08 | Control de rol docente | Docente intenta entrar a `/my-projects` | Acceso denegado/redireccion a publico | PASS |
| QA-UI-09 | Login invalido | Probar password incorrecta | Muestra error y boton vuelve de "Entrando..." a "Entrar" | PASS |

## Evidencia API (ejecucion local automatizada)
Fecha: 2026-02-16

Resultado de la prueba E2E por API:
- `project_id`: `5`
- `submit_message`: `Project sent to revision (PENDIENTE)`
- `publish_message`: `Project published (PUBLICADO)`
- `pending_contains_project`: `true`
- `public_contains_project`: `true`

## Resultado global
- Estado QA-01: PASS
- Riesgos residuales: no hay tests automatizados unitarios/e2e; la validacion es manual para hackaton.
