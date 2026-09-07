# Club de Fútbol NEXUM · Campeonato 6×6

Sistema minimalista para organizar el campeonato institucional desde un único repositorio.

## Enlaces de la aplicación

Cuando GitHub Pages esté activo en este repositorio:

- Inicio: `https://jeffer91.github.io/Club-futbol-ITSQMET-/`
- Inscripción: `https://jeffer91.github.io/Club-futbol-ITSQMET-/inscripcion/`
- Estudiantes: `https://jeffer91.github.io/Club-futbol-ITSQMET-/estudiantes/`
- Árbitro: `https://jeffer91.github.io/Club-futbol-ITSQMET-/arbitro/`
- Administrador: `https://jeffer91.github.io/Club-futbol-ITSQMET-/administrador/`

## Funcionalidad incluida

### Inscripción
- Nombre, logo y color del equipo.
- Capitán: nombre, cédula, teléfono y correo.
- Plantilla de 6 a 10 jugadores.
- Validación: mínimo 4 institucionales y máximo 2 externos.
- Control de cédulas repetidas.
- Comprobante de pago JPG/PNG/PDF.
- Código de inscripción automático.

### Estudiantes
- Equipos.
- Calendario y resultados.
- Tabla de posiciones automática.
- Fase final / llaves.
- Reglamento.

### Árbitro
- Acceso por PIN.
- Partidos pendientes.
- Participantes por equipo.
- Tarjetas amarillas y rojas.
- Cierre de acta.

### Administrador
- Dashboard.
- Aprobar, rechazar o pedir corrección de inscripciones.
- Equipos y grupos.
- Generación automática del campeonato priorizando separación de colores similares.
- Partidos: fecha, hora, cancha y resultado.
- Árbitros y PIN.
- Informes imprimibles / PDF.
- Configuración de nombre, fase, pagos y duración de partidos.

## Modo demostración

Por defecto la interfaz funciona en `DEMO_MODE` y guarda datos en `localStorage`, lo que permite probar todos los flujos sin servidor.

- Administrador demo: `admin2026`
- Árbitro demo: `2468`

**Importante:** localStorage no sirve como base multiusuario. Para producción se debe conectar Neon.

## Neon + Cloudflare Worker

La carpeta `worker/` incluye:

- `schema.sql`: modelo PostgreSQL para Neon.
- `src/index.js`: API base para datos públicos, inscripciones, archivos, revisión administrativa y resultados.
- `wrangler.toml`: configuración de Cloudflare Worker.

Variables seguras necesarias:

- `DATABASE_URL`: cadena de conexión de Neon.
- `ADMIN_TOKEN`: secreto de administración.
- Binding opcional `FILES`: bucket R2 para logos y comprobantes.

Nunca colocar contraseñas o tokens en `assets/config.js` ni en archivos públicos.

## Activar GitHub Pages

En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. El workflow `.github/workflows/pages.yml` publicará automáticamente cada cambio de `main`.

## Próximo paso de producción

1. Crear/conectar proyecto Neon.
2. Ejecutar `worker/schema.sql`.
3. Crear bucket Cloudflare R2.
4. Desplegar el Worker y configurar los secretos.
5. Cambiar `assets/config.js` a la URL real del API y desactivar `DEMO_MODE`.
6. Sustituir el acceso demo por autenticación real para administrador y árbitros.
