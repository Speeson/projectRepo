# Distribución de verticales (Hackatón FP RepoProjects) 

**Regla principal:** Cada equipo desarrolla la aplicación completa.  
Las **verticales** son el reparto interno del trabajo dentro del equipo.

---

## 1. Qué significa “vertical” en este hackatón

En este proyecto trabajaremos por **vertical slices**.

- **Equipos = repositorios**
- **Verticales = funcionalidades**

Una **vertical** es una funcionalidad completa del sistema que incluye normalmente:

- Base de datos (tablas o cambios SQL)
- Backend (endpoints y lógica de negocio)
- Frontend (pantalla y consumo API)
- Pruebas mínimas (Postman/curl y navegador)

El objetivo es evitar el modelo típico de:
- “unos hacen solo frontend”
- “otros hacen solo backend”

porque genera bloqueos y dificulta la integración.

En este hackatón cada alumno asume la responsabilidad de una vertical completa (end-to-end), pero todo se desarrolla dentro del mismo repositorio del equipo.

---

## 2. Distribución recomendada por equipo (equipos de 5)

Cada equipo tendrá 5 miembros. La distribución recomendada es:

---

### Vertical A — Infraestructura + Base de datos (ASIR preferente)
**Responsable:** 1 alumno  
**Objetivo:** dejar MySQL y el entorno reproducible listo para el equipo.

**Incluye:** DB + conexión backend mínima + documentación.

**Tareas principales:**
- Ejecutar `db/schema.sql`
- Ejecutar `db/seed.sql`
- Ajustar `.env` en backend (y mantener `.env.example`)
- Verificar conexión MySQL desde backend
- Crear endpoint `GET /api/health`
- Documentar pasos mínimos en README

**Entregables:**
- `/db/schema.sql`
- `/db/seed.sql`
- backend con conexión MySQL funcionando
- endpoint `/api/health`

---

### Vertical B — Autenticación completa (Login end-to-end)
**Responsable:** 1 alumno  
**Objetivo:** implementar login completo con JWT funcionando de extremo a extremo.

**Incluye:** backend auth + frontend login + interceptor.

**Tareas principales:**

**Backend:**
- `POST /api/auth/login`
- `GET /api/auth/me`
- bcrypt para password
- JWT con rol en payload
- middleware JWT
- CORS configurado para `http://localhost:4200`

**Frontend:**
- pantalla login con Angular Material
- Reactive Forms con validaciones
- AuthService (login)
- guardar token en localStorage
- interceptor Bearer token
- navegación tras login a `/proyectos`
- mostrar error visible si 401

**Entregables:**
- Login funcionando desde UI
- Token enviado automáticamente en peticiones
- `/api/auth/me` operativo

---

### Vertical C — Proyectos públicos (end-to-end)
**Responsable:** 1 alumno  
**Objetivo:** listado público funcional de proyectos publicados.

**Incluye:** endpoint público + pantalla listado.

**Tareas principales:**

**Backend:**
- `GET /api/proyectos/publicos` (solo estado PUBLICADO)
- filtros opcionales: texto, ciclo, curso

**Frontend:**
- pantalla listado público de proyectos
- filtros en la interfaz

**Entregables:**
- Listado público visible y funcionando en navegador

---

### Vertical D — Área alumno (crear + enviar proyecto) end-to-end
**Responsable:** 1 alumno  
**Objetivo:** permitir al alumno crear proyectos y enviarlos a revisión.

**Incluye:** endpoints alumno + pantallas de creación y listado.

**Tareas principales:**

**Backend:**
- `POST /api/proyectos` (crea BORRADOR)
- `GET /api/proyectos/mios`
- `PUT /api/proyectos/:id/enviar` (BORRADOR -> PENDIENTE)
- control de permisos: solo el dueño puede editar/enviar

**Frontend:**
- pantalla Mis Proyectos
- formulario crear proyecto
- botón enviar a revisión

**Entregables:**
- Alumno crea proyectos y los envía a revisión

---

### Vertical E — Moderación docente/admin (publicar) end-to-end
**Responsable:** 1 alumno  
**Objetivo:** permitir a docente/admin publicar proyectos pendientes.

**Incluye:** endpoints de moderación + pantalla pendientes.

**Tareas principales:**

**Backend:**
- `GET /api/proyectos/pendientes` (solo DOCENTE/ADMIN)
- `PUT /api/proyectos/:id/publicar` (PENDIENTE -> PUBLICADO)
- control de roles (DOCENTE/ADMIN)

**Frontend:**
- pantalla Pendientes
- botón Publicar
- actualización de listado tras publicar

**Entregables:**
- Docente publica proyectos
- Proyecto pasa a PUBLICADO

---

## 3. Reparto recomendado si hay DAM y ASIR en el equipo (actualizado)

Reparto ideal en equipos mixtos:

- **ASIR1:** Vertical A (infra + DB + conexión + README)
- **DAM1:** Vertical B (login completo end-to-end)
- **DAM2:** Vertical C (públicos end-to-end)
- **DAM3:** Vertical D (alumno end-to-end)
- **ASIR2 o DAM4:** Vertical E (moderación end-to-end)

Si solo hay 1 alumno ASIR:
- ese alumno se encarga de Vertical A y apoya en README/seguridad
- el resto DAM se reparten B, C, D y E

---

## 4. Orden obligatorio de ejecución (para llegar a MVP)

No se empieza por lo que cada uno quiera. El orden recomendado es:

1) Vertical A: DB lista + scripts ejecutables + health  
2) Vertical B: login completo funcionando (backend + frontend)  
3) Vertical C: listado público  
4) Vertical D y E en paralelo  
5) Integración final y documentación  

Si el login no funciona, el resto se bloquea.

---

## 5. Estrategia de ramas Git recomendada

Cada vertical trabaja en su rama. Convención:

- `feat/db-infra`
- `feat/auth-login`
- `feat/proyectos-publicos`
- `feat/proyectos-alumno`
- `feat/moderacion-publicar`
- `chore/docs-readme`

Normas:
- commits pequeños y frecuentes
- merge a `main` al menos cada 30-40 minutos
- antes de hacer push: `git pull`

---

## 6. Regla de integración (muy importante)

No se permite trabajar 2 horas sin integrar.

Regla:
- una vez una funcionalidad mínima funciona, se integra en `main`

El objetivo no es perfección, es un MVP completo.

---

## 7. Definición de éxito del hackatón

Un equipo ha completado el hackatón si logra el flujo completo:

1) Login correcto con roles  
2) Alumno crea proyecto BORRADOR  
3) Alumno envía a PENDIENTE  
4) Docente publica a PUBLICADO  
5) Listado público muestra PUBLICADOS  

Todo ejecutable en local y documentado en README.

---

## 8. Uso obligatorio de IA durante el hackatón

La IA se usa para generar código, pero el equipo debe:

- diseñar antes de pedir
- validar con pruebas reales
- corregir errores y adaptar código

Regla:
- la IA genera, pero el equipo es responsable del resultado

---

## 9. Documentación mínima recomendada

Cada equipo debe mantener:

- `README.md` actualizado
- `docs/backlog.md` marcado
- (opcional) `docs/ai-log.md` con prompts utilizados
- (opcional) `docs/api.md` con endpoints

---
