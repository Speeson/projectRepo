# Decisiones Tecnicas - FP RepoProjects

## Plantilla de decision
Usar este formato para cada decision importante:

- ID: DEC-XXX
- Fecha: YYYY-MM-DD
- Contexto: problema o necesidad
- Decision: que se decide
- Alternativas consideradas: opcion A, B, C
- Impacto: coste, riesgo, ventajas
- Estado: propuesta | aceptada | descartada

---

## DEC-001
- Fecha: 2026-02-16
- Contexto: arrancar rapido el MVP del hackaton con una base reproducible.
- Decision: definir scripts SQL en `db/schema.sql` y `db/seed.sql`.
- Alternativas consideradas: crear tablas manualmente desde Workbench.
- Impacto: setup rapido y uniforme para todo el equipo.
- Estado: aceptada.

## DEC-002
- Fecha: 2026-02-16
- Contexto: necesitamos credenciales de prueba inmediatas para avanzar en login.
- Decision: usar `SHA2` en seed para simplificar autenticacion inicial del MVP.
- Alternativas consideradas: `bcrypt` desde el inicio.
- Impacto: menor seguridad que `bcrypt`, pero mayor velocidad de implementacion.
- Estado: aceptada (temporal para hackaton).

## DEC-003
- Fecha: 2026-02-16
- Contexto: alinear el desarrollo con los requisitos minimos de la guia.
- Decision: implementar primero el flujo obligatorio extremo a extremo antes de extras.
- Alternativas consideradas: empezar por mejoras visuales o funcionalidades no obligatorias.
- Impacto: reduce riesgo de no llegar al MVP funcional en 4 horas.
- Estado: aceptada.

## DEC-004
- Fecha: 2026-02-16
- Contexto: necesitamos autenticar rapido con los usuarios de `seed.sql`.
- Decision: validar credenciales con comparacion SQL `password_hash = SHA2(?, 256)` y emitir JWT.
- Alternativas consideradas: hashear en backend con `bcrypt`.
- Impacto: implementacion mas rapida para MVP, con deuda tecnica de seguridad para post-hackaton.
- Estado: aceptada (temporal para hackaton).

## DEC-005
- Fecha: 2026-02-16
- Contexto: evitar cambios de estado indebidos y accesos a proyectos de otros alumnos.
- Decision: en `PATCH /projects/:id/submit` actualizar solo con `autor_id` del token y estado actual `BORRADOR`.
- Alternativas consideradas: validar en dos consultas separadas (lectura + actualizacion).
- Impacto: menos condiciones de carrera y control de propiedad/estado en una sola operacion SQL.
- Estado: aceptada.

## DEC-006
- Fecha: 2026-02-16
- Contexto: controlar la moderacion para evitar publicaciones fuera del flujo.
- Decision: `PATCH /projects/:id/publish` solo permite transicion `PENDIENTE -> PUBLICADO` para roles `DOCENTE` y `ADMIN`.
- Alternativas consideradas: permitir publicar cualquier estado o revisar en dos pasos.
- Impacto: refuerza consistencia del flujo obligatorio y reduce errores operativos.
- Estado: aceptada.

## Pendientes de decision
- Elegir libreria de acceso a MySQL en backend (`mysql2` directo o con ORM).
- Definir estrategia de validacion de input (manual o libreria).
- Decidir si se migra a `bcrypt` antes de la entrega final.
