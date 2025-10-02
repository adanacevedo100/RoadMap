import type { RoadmapNodeData } from './types';

export const rootData: RoadmapNodeData = {
    "name": "Ecosistema TurboSteps",
    "details": "El ecosistema integral de fitness digital con Inteligencia Artificial y gamificación.",
    "children": [
        {
            "name": "0. Componentes",
            "details": "Plataformas y herramientas que forman la arquitectura técnica del proyecto.",
            "children": [
                // FIX: Use template literal for multi-line string to fix parsing errors.
                {"name": "App Móvil (iOS/Android)", "details": `Detalle Completo
App móvil (iOS/Android)
La aplicación móvil es el corazón de TurboSteps, porque será el punto de entrada principal para la mayoría de los usuarios. El 90% de nuestra audiencia objetivo (mujeres entre 24 y 50 años en LATAM y España) utiliza su teléfono como herramienta principal para entrenar, consumir contenido y comunicarse.

Qué debe ofrecer la app desde el inicio (MVP):
Experiencia fluida: interfaz simple, intuitiva y motivadora, que permita entrar rápido a entrenar o ver contenido.
Acceso a los módulos clave: entrenamientos en vivo, entrenamientos en diferido, calendario, asesores, comunidad, blog, soporte.
Sistema multiplataforma: sincronizar el progreso y la experiencia del usuario entre iOS y Android, evitando diferencias notables.
Gamificación integrada: mostrar TurboCoins, medallas y recordatorios de agua dentro de la experiencia móvil.
Notificaciones push: mantener a los usuarios enganchados con avisos de retos, recordatorios y motivación.`, "category": "Plataforma"},
                {"name": "Web de Miembros (Navegador)", "details": "Una versión alternativa de acceso pensada para usuarios que prefieren conectarse desde PC, laptop o navegador web. Incluye las funcionalidades más importantes de la app, como: Rutinas y retos destacados, En vivos vía streaming, Blog de nutrición, Panel personal (historial, progreso, medallas), Zona de descargas (PDFs de informes, menús), Comunidad ligera. No sustituye la app, sino que complementa la experiencia y sirve para aumentar la accesibilidad. **Objetivo: dar acceso rápido desde navegador a entrenamientos y en vivos, y permitir a usuarios sin smartphone compatible, igual participar en la comunidad.**", "category": "Plataforma"},
                {"name": "Panel Administrativo", "details": "Es la herramienta interna donde el equipo de TurboSteps gestiona todo el ecosistema. Permite: Subir y organizar videos, rutinas y retos. Crear planes preestablecidos (Turbo Builder). Gestionar usuarios (suscripciones, upgrades/downgrades). Moderar la comunidad (comentarios, reportes). Controlar gamificación (validación de medallas, asignación de TurboCoins). Consultar analíticas clave: DAU, MAU, retención, conversiones, mapa de calor, ingresos por publicidad, TurboCoins, suscripción pro. **Objetivo: dar control total al equipo sobre la app y generar métricas para la toma de decisiones e informes para inversionistas.**", "category": "Interna"},
                {"name": "Dispositivos Futuros", "details": "Expansión natural del ecosistema para consolidar a TurboSteps como el Netflix del fitness: **Smart TV** → apps nativas en Samsung, LG, Android TV y Apple TV para entrenar en pantalla grande. **Apple Watch / Samsung Watch / Wear OS** → Fase 1: tracking básico (pasos, calorías, frecuencia cardíaca). Fase 2: entrenamientos guiados desde el reloj, sincronizados con la app. **Otros wearables** → conexión con pulseras o sensores de terceros. **Objetivo: estar presente en todos los dispositivos del día a día del usuario para aumentar engagement y tiempo de uso.**", "category": "Expansión"},
                {"name": "Entorno de API", "details": "Una capa de integración que permitirá a TurboSteps conectarse con sistemas externos y con empresas. **Casos de uso:** Automatizaciones internas (conexión con n8n, CRM GHL, email marketing Brevo). B2B (Corporate Wellness) (permitir a empresas integrar TurboSteps en sus sistemas de RRHH, recibiendo métricas de uso agregadas de sus empleados). **Objetivo: convertir a TurboSteps en un ecosistema abierto, escalable y fácil de integrar con aliados estratégicos y marketing con IA.**", "category": "Integración"}
            ]
        },
        {
            "name": "1. Módulos Principales",
            "details": "Las funcionalidades clave que ofrecen valor directo al usuario.",
            "children": [
                {"name": "Entrenamiento en Vivo (Directos)", "details": "Propósito: Sesiones en tiempo real con entrenadores para aumentar adherencia, comunidad y valor percibido PRO. **Acceso según plan:** Gratis → No accede. Premium → Acceso a directos 3 veces por semana, solo como espectador. PRO → Acceso a directos 6 veces por semana, con cámara/mic y participación completa. **Características principales:** Listado de próximos en vivos + 🔴 en sesiones activas. Sala con video, chat, reacciones, levantar mano. Roles: Host (entrenador), Co-Host (moderador), Espectador. Grabación automática → publicada en diferido. **Métricas clave:** Inscripciones, asistencia, tiempo de permanencia. Conversiones de Gratis → Premium y Premium → PRO.", "category": "Core"},
                {"name": "Entrenamiento Diferido (Pregrabadas)", "details": "Propósito: Biblioteca estilo “Netflix del fitness” con progresión, personalización y comunidad. **Alcance (App/Web):** Catálogo organizado: Por entrenador → categorías → subcategorías infinitas → niveles. **Continuar viendo:** Barra de progreso por video y por programa. Guarda el punto exacto donde el usuario dejó de ver. **Interacción del usuario:** Favoritos, Rating/likes, Comentarios en cada entrenamiento (solo usuarios PRO), Descargas offline (para PRO). **NFR:** Carga rápida, Reproducción resiliente, DRM/anti-abuso (bloqueo de descargas ilegales).", "category": "Core"},
                {"name": "Asesor de Nutrición Online", "details": "Propósito: Orientar a los usuarios en nutrición, menús y dudas con tono humano (texto y voz). Solo PRO. **Alcance:** Chat contextual (texto y audio) con historial. **Funciones:** Menús según objetivo, Listas de compra, Sustituciones de alimentos, FAQs de nutrición. Proactividad: check-ins semanales vía notificación. **Integraciones:** Motor IA (API), Edamam / LogMeal. **NFR:** Latencia baja (<3s), Seguridad de datos sensibles (GDPR).", "category": "Asesoría"},
                {"name": "Asesor de Fitness Online", "details": "Propósito: Entrenador virtual que guía en técnica, motivación y planificación diaria. **Alcance:** Chat (texto y voz) con tres modos: Motivación, Relajación, Técnico. Recepción de fotos/videos para feedback básico (postura general). Proactividad: notificaciones tipo → 'Hace 5 días que no entrenas...'. **Accesos por plan:** Gratis → No disponible. Premium → Acceso parcial (chat texto, recomendaciones). PRO → Acceso completo (chat + voz + feedback multimedia).", "category": "Asesoría"},
                {"name": "Generador de Entrenamientos Personalizados", "details": "Propósito: Crear planes de 7 a 30 días totalmente adaptados a objetivos, nivel y disponibilidad del usuario. **Generación automática:** Define objetivo, nivel, días/semana, equipo, áreas de enfoque. El plan se sincroniza automáticamente con el calendario. **Accesos por plan:** Gratis → Mini plan demo de 7 días (bloqueado). Premium → Planes de 7 a 30 días con edición ligera. PRO → Todo lo de Premium + personalización avanzada.", "category": "Personalización"},
                {"name": "Planes de Alimentación Personalizados", "details": "Propósito: Generar menús de 7 o 30 días adaptados a macros, restricciones y preferencias personales. **Menús diarios:** Recetas con fotos, raciones y lista de compra semanal. Sustituciones inteligentes. Exportación: opción de descargar plan en PDF. **Accesos por plan:** Gratis → Vista previa de un día. Premium → Planes completos de 7/30 días. PRO → Todo lo de Premium + integración con escáner de alimentos, asesor de nutrición y ajuste dinámico.", "category": "Personalización"},
                {"name": "Comunidad (Discord/Foro)", "details": "Propósito: Convertir la comunidad en el espacio social central de TurboSteps. **Estructura tipo Discord/Slack:** Canales temáticos, Feed con publicaciones (texto, imágenes, videos cortos), Comentarios en hilo. **Perfiles de usuario:** Muestra el medallero Workster (Oro, Plata, Bronce). Los logros aparecen junto al nombre. **Integración:** Las medallas de la app se reflejan como emblemas visibles en la comunidad.", "category": "Social"},
                {"name": "Calendario & Retos", "details": "Propósito: Estructurar el hábito con agenda y objetivos grupales. **Alcance:** Calendario personal (planes, en vivos, retos). Retos 7/30/90 días (inscripción, reglas, hitos, ranking). Recordatorios inteligentes (si no entrenó, ofrece sesión corta alternativa).", "category": "Social"},
                {"name": "Gamificación (Medallas y TurboCoins)", "details": "Función: Reconocer y premiar el progreso del usuario mediante la obtención de medallas visibles en su perfil y en la comunidad. **Mecánica:** Desbloquea medallas automáticamente al cumplir hitos (entrenamientos, nutrición, comunidad). La acumulación de medallas determina su posición en rankings y tableros sociales.", "category": "Recompensa"},
                {"name": "Tienda de TurboCoins", "details": "Propósito: Cerrar el ciclo de recompensa → canje tangible. **Canjes:** 3.000 TC → acceso Premium. Contenidos/cursos específicos. Sorteos/tómbolas con premios hasta $100. **Integraciones:** pagos/licencias, CRM/GHL. **Datos & Métricas:** tasa de canje, ítems más canjeados.", "category": "Recompensa"},
                {"name": "Seguimiento Personalizado (Informes Mensuales)", "details": "Propósito: Cierre de ciclo: medición, reflexión y nuevo compromiso. Solo PRO. **Alcance:** Trackeo automático (entrenos, escáner, uso de app). Formulario mensual + generación de informe PDF (evolución peso/medidas, calorías consumidas vs. quemadas, sesiones, medallas) + carta de compromiso para el siguiente mes.", "category": "Premium/PRO"},
                {"name": "Blog de Nutrición", "details": "Propósito: Educación continua y SEO in-app. **Alcance:** Listado, búsqueda, categorías. Post con imágenes, enlaces internos a planes/asesores/retos. Marcado “Recomendado por el asesor” (si llegó desde el chat).", "category": "Contenido"},
                {"name": "Soporte (FAQ, Contacto, CRM GHL)", "details": "Propósito: Resolver fricciones rápido para proteger la retención. **Alcance:** FAQ buscable (categorías por tema). Contacto vía formulario/WhatsApp/email. Ticketing con estados (abierto, en curso, resuelto) conectado a GHL.", "category": "Servicio"}
            ]
        },
        {
            "name": "2. Funcionalidades Detalladas",
            "details": "Funciones específicas dentro de los módulos principales (extraídas de la sección 2 del documento).",
            "imageUrl": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRmNDZlNSIgYXJpYS1oaWRkZW49InRydWUiIGNsYXNzPSJody02IHctNiI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTIuOTY0IDEwLjI3Yy41My0uMjY4IDEuMTM1LS40MiAxLjc3Ny0uNDJoLjc5N2EuNzUuNzUgMCAwMC43NS0uNzVWOC4yNWEuNzUuNzUgMCAwMC0uNzUtLjc1aC0uNzk3QTQuNDk4IDQuNDk4IDAgMDAtMTIgN2EuNzUuNzUgMCAwMC0uNzUuNzV2Ljc5N2M0LjE0MiAwIDcuNSA0LjEyOSA3LjUgOC4yNTUgMCAuNDEzLS4zMzYgLjc1LS43NS43NWgtLjc5N2EuNzUuNzUgMCAwMC0uNzUtLjc1aC0uMzk4Yy0uNTI2IDAtLjk4My0uMjE2LTEuMzEtLjU1MmEuNzUuNzUgMCAwMC0xLjA3MiAxLjA3MmMuOTUgLjg2NyAyLjI1NiAxLjQwOSA0LjAzNCAxLjQxMWguMzk4Yy40MTMgMCAuNzUtLjMzNi43NS0uNzVoLjc5N2MyLjA3MSAwIDMuNzUtMi4xNjIgMy4yNS00Ljg3NVMxOS41NzEgMi4yNSA2Ljc1IDIuMjVILTYuNzVDNC42OCAyLjI1IDMgNC40MTIgMyA3LjEyNXYuNzk3YzAgLjQxMy4zMzYuNzUuNzUuNzVoLjc5N2MuNDEzIDAgLjc1LS4zMzYuNzUtLjc1VjcuMTI1YzAtMy4xMDggMi4zOTYtNS42MjUgNS4yNS01LjYyNWguNzVjMy40NDYgMCA2LjQ0NCAzLjI3MiA2LjQ0NCA3LjEyNXYuMzk4YzAgMS4zNzYtLjYzMSAyLjYtMS42NzggMy4zMTlhLjc1Ljc1IDAgMTAtLjk4MyAxLjEzNnoiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KICA8cGF0aCBkPSJNOS4xNSA5LjgxM2MuMjEtLjQ5My40ODQtLjk0My44MDMtMS4zMjdBNC41IDQuNSAwIDAxMTIgOC4yNWMuNDEzIDAgLjc1LS4zMzYuNzUtLjc1VjYuNzVBNiA2IDAgMDAtNiA2Ljc1djIuMTM3YzAgLjQxMy4zMzYuNzUuNzUuNzVoMi40MDNjLS4wOC0uMzM4LS4xMy0uNjktLjEzLTEuMDY0di0uMzk4eiIgLz4KICA8cGF0aCBkPSJNMTUuNzUgMTIuNzVhMyAzIDAgMTEtNiAwIDMgMyAwIDAxNiAwem0tMS41IDBhMS41IDEuNSAwIDExLTMgMCAxLjUgMS41IDAgMDEzIDB6IiAvPgogIDxwYXRoIGQ9Ik0zIDExLjM3NWEuNzUuNzUgMCAwMC0uNzUuNzVWMTlhLjc1Ljc1IDAgMDAuNzUuNzVoMi4yNWMuNDE0IDAgLjc1LS4zMzYgLjc1LS43NXYtMi4xYy4zMjUgMCAuNjU0LjAwNi45ODQuMDE3YTYuNzUgNi4yNSAwIDAwNS41MTYtNS4xMDNBNS4yMSA1LjIxIDAgMDExMiAxMC4wNjJ2LS4yMzVhLjc1Ljc1IDAgMDAtLjc1LS43NWgtMi4xMjdBLjQ5OC40OTggMCAwMCguOTMzIDguOTlhNi4wMDIgNi4wMDIgMCAwMC01Ljk4MyAyLjM4NmEuNzUuNzUgMCAwMC4zMzggMS4zMDJBNy41IDcuNSAwIDAxOCA5Ljc5NHYxLjU4MnoiIC8+Cjwvc3ZnPg==","children": [
                 {"name": "Home", "details": "Retos del mes, continuar viendo, historial, recordatorio de agua.", "category": "Funcionalidad"},
                 {"name": "Entrenamientos Diferidos", "details": "Favoritos, rating, descargas, comentarios, barra de progreso estilo Netflix.", "category": "Funcionalidad"},
                 {"name": "Entrenamientos en Vivo", "details": "Levantar mano, emojis, chat, host + co-host, calendario.", "category": "Funcionalidad"},
                 {"name": "Generador de Entrenamientos", "details": "Planes de 7/30 días, sincronización al calendario.", "category": "Funcionalidad"},
                 {"name": "Planes de Alimentación", "details": "Conexión con Edamam API.", "category": "Funcionalidad"},
                 {"name": "Asesor de Nutrición", "details": "Menús, dudas, seguimiento proactivo (texto/audio).", "category": "Funcionalidad"},
                 {"name": "Asesor de Fitness", "details": "Feedback con texto/audio/video, motivación, seguimiento proactivo.", "category": "Funcionalidad"},
                 {"name": "Corrección de Movimientos IA", "details": "Feedback en tiempo real con voz de Fausto.", "category": "Funcionalidad"},
                 {"name": "Escáner de Macronutrientes", "details": "Registro diario + informe acumulado.", "category": "Funcionalidad"},
                 {"name": "Tienda TurboCoins", "details": "Canjes (Premium, cursos, sorteos $100).", "category": "Funcionalidad"},
                 {"name": "Seguimiento Personalizado", "details": "Informes mensuales + carta de compromiso.", "category": "Funcionalidad"},
                 {"name": "Métricas & Analítica", "details": "Mapa de calor, conversiones, uso de contenidos.", "category": "Funcionalidad"}
            ]
        },
        {
            "name": "3. Contenido",
            "details": "Activos de valor dentro de la plataforma (videos, documentos, planes).",
            "children": [
                {"name": "Videos de Fausto + entrenadores", "details": "Contenido principal de entrenamiento.", "category": "Contenido"},
                {"name": "Retos mensuales", "details": "Programas grupales para aumentar el engagement.", "category": "Contenido"},
                {"name": "Planes pregrabados (Turbo Builder)", "details": "Programas estructurados de entrenamiento.", "category": "Contenido"},
                {"name": "Planes de nutrición", "details": "Menús y guías alimentarias.", "category": "Contenido"},
                {"name": "Blog de Nutrición", "details": "Artículos educativos.", "category": "Contenido"},
                {"name": "Documentos descargables", "details": "PDF informes, menús.", "category": "Contenido"}
            ]
        },
        {
            "name": "4. Roadmap (Fases)",
            "details": "Plan de desarrollo por etapas.",
            "children": [
                {"name": "MVP (4 meses)", "details": "12 módulos clave funcionales (entrenamientos en vivo/diferido, comunidad, asesores virtuales/planes básicos, medallas, calendario, tienda básica de TurboCoins).", "category": "Fase"},
                {"name": "Versión 1.0 (12 meses)", "details": "Funciones PRO completas (IA movimientos, escáner, seguimiento mensual con informes). Consolidación.", "category": "Fase"},
                {"name": "Fase 2 (24 meses)", "details": "Expansión a Dispositivos Futuros (Smart TV, relojes) y B2B (Corporate Wellness).", "category": "Fase"}
            ]
        },
        {
            "name": "5. Estrategia & Modelo de Negocio",
            "details": "Definición del modelo de monetización (mes 6, después del MVP).",
            "children": [
                {"name": "Plan Gratis, Plan Premium, Plan PRO", "details": "Modelo de planes escalonados según funcionalidades y acceso.", "category": "Monetización"},
                {"name": "B2B – Corporate Wellness", "details": "Permitir a empresas integrar TurboSteps en sus sistemas de RRHH, recibiendo métricas de uso agregadas de sus empleados.", "category": "Monetización"},
                {"name": "Monetización: publicidad, TurboCoins, licencias, sorteos", "details": "Diversas fuentes de ingresos adicionales para el ecosistema.", "category": "Monetización"}
            ]
        }
    ]
};

export const CATEGORY_COLORS: { [key: string]: [string, string] } = {
    'Plataforma': ['#f0f8ff', '#007bff'], 
    'Interna': ['#fff8f0', '#ff7800'], 
    'Expansión': ['#f0fff8', '#00bf8e'], 
    'Integración': ['#faf0ff', '#8e00bf'], 
    'Core': ['#fff0f0', '#ff0000'], 
    'Asesoría': ['#f8fff0', '#66cc00'], 
    'Personalización': ['#fffff0', '#ffcc00'], 
    'Social': ['#f5f0ff', '#4d00e6'], 
    'Recompensa': ['#fff0f5', '#e6004c'], 
    'Premium/PRO': ['#f0fff5', '#009933'], 
    'Fase': ['#fff0f0', '#cc0000'], 
    'Monetización': ['#e0f0ff', '#00aae0'], 
    'Contenido': ['#fff8f0', '#ffaa00'], 
    'Servicio': ['#f8f8f8', '#8c8c8c'], 
    'Funcionalidad': ['#f5f0ff', '#a366ff'], 
    'default': ['#f7f7f7', '#333333'] 
};

// FIX: Replaced `getColor` with `getNodeColor` which accepts a RoadmapNodeData object. This aligns with component usage and adds support for custom colors, fixing import errors.
export function getNodeColor(node: RoadmapNodeData | null | undefined, isLight = false): string {
    if (node?.customColor) {
        return isLight ? node.customColor.light : node.customColor.dark;
    }
    const key = node?.category || 'default';
    const [light, dark] = CATEGORY_COLORS[key] || CATEGORY_COLORS['default'];
    return isLight ? light : dark;
}
