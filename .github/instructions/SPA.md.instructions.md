---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.
La interaccion con el usuario debe ser en español.
Actua como desarrollador full stack 
Estamos trabajando en el de la interfaz un punto de venta para una carnicería de cortes de pollo fresco. La pollería se llama Pollería Montiel.
#Diseño. Utiliza los siguientes estilos para crear un diseño unico para la interfaz movil del Sistema. Crea las interfaces para los siguientes usuarios: Cajera de 40 años, Tablajera de 50 años, Repartidora de 40 años, Administradora de 50 años.
/* =========================================================================== */
/* 1. abstracts/_variables.css                                                 */
/* =========================================================================== */
:root {
    /* Colores Primarios y Neutros */
    --blanco: #ffffff;
    --negro-azabache: #1C1C1E; /* Para texto principal, casi negro */
    --gris-fondo-claro: #F9F9F9;
    --gris-elemento-claro: #FFFFFF;
    --gris-borde-sutil: #E5E5EA;
    --gris-borde-input: #D1D1D6;
    --gris-hover-sutil: #F2F2F7;
    --gris-texto-secundario: #8A8A8E;
    --gris-texto-terciario: #AEAEB2;
    --gris-fondo-deshabilitado: #EFEFF4;

    /* Color de Acento "Pollería Montiel" - AMARILLO DORADO */
    --amarillo-polleria: #FFC107;
    --amarillo-polleria-hover: #E0A800;
    --amarillo-polleria-focus-ring: rgba(255, 193, 7, 0.3);
    --texto-sobre-amarillo: var(--negro-azabache); /* Texto oscuro sobre el amarillo */

    /* Colores de Alerta y Acción Semánticos */
    --verde-exito: #34A853; /* Para alertas de éxito */
    --verde-exito-fondo: #E6F5EA;
    --verde-accion: #4CAF50; /* Un verde para botones de acción de éxito/confirmación */
    --texto-sobre-verde: var(--blanco);

    --azul-info: #007AFF;
    --azul-info-fondo: #E5F2FF;

    --rojo-peligro-texto: #D93025;
    --rojo-peligro-fondo: #FCE8E6;

    /* Fuentes y Tipografía */
    --fuente-principal: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --tamano-fuente-base: 16px;
    --line-height-base: 1.6;
    --line-height-titulo: 1.25;
    --letter-spacing-titulo-grande: -0.015em;

    /* Sombras */
    --sombra-xs: 0 1px 2px rgba(0, 0, 0, 0.03);
    --sombra-sm: 0 2px 4px rgba(0, 0, 0, 0.04);
    --sombra-md: 0 4px 12px rgba(0, 0, 0, 0.06);
    --sombra-lg: 0 10px 24px rgba(0, 0, 0, 0.07);

    /* Transiciones */
    --transicion-suave: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --transicion-rapida: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

    /* Radios de borde */
    --radio-borde-s: 6px;
    --radio-borde-m: 10px;
    --radio-borde-l: 16px;
    --radio-borde-pill: 50rem; /* Para formas de píldora */

    /* Espaciado (basado en un sistema de 4px) */
    --espacio-xs: 0.25rem; /* 4px */
    --espacio-s: 0.5rem;  /* 8px */
    --espacio-m: 1rem;    /* 16px */
    --espacio-l: 1.5rem;  /* 24px */
    --espacio-xl: 2rem;   /* 32px */
    --espacio-xxl: 3rem;  /* 48px */
    --espacio-xxxl: 4rem; /* 64px */

    /* Breakpoints (puntos de ruptura para diseño responsivo) */
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
}

/* =========================================================================== */
/* 2. base/_reset.css                                                          */
/* =========================================================================== */
/* Reseteo Básico */
*,
*::before,
*::after {
    box-sizing: border-box; /* Incluye padding y border en el ancho/alto total */
    margin: 0;             /* Elimina los márgenes predeterminados */
    padding: 0;            /* Elimina los paddings predeterminados */
}

/* Estilos Globales para HTML y Body */
html {
    scroll-behavior: smooth; /* Habilita el desplazamiento suave para los anclas */
    font-size: var(--tamano-fuente-base); /* Establece el tamaño de fuente base */
}

body {
    font-family: var(--fuente-principal); /* Fuente principal de la aplicación */
    line-height: var(--line-height-base); /* Altura de línea base para legibilidad */
    background-color: var(--gris-fondo-claro); /* Color de fondo general */
    color: var(--negro-azabache); /* Color de texto principal */
    -webkit-font-smoothing: antialiased; /* Suavizado de fuente para Webkit */
    -moz-osx-font-smoothing: grayscale; /* Suavizado de fuente para Firefox */
    overflow-x: hidden; /* Previene el desbordamiento horizontal */
}

/* Estilo de la barra de desplazamiento (para navegadores Webkit como Chrome/Safari) */
body::-webkit-scrollbar {
    width: 8px; /* Ancho de la barra de desplazamiento vertical */
}
body::-webkit-scrollbar-track {
    background: var(--gris-fondo-claro); /* Fondo de la pista de la barra */
}
body::-webkit-scrollbar-thumb {
    background-color: var(--amarillo-polleria-hover); /* Color del "pulgar" de la barra */
    border-radius: var(--radio-borde-pill); /* Bordes redondeados para el pulgar */
}
body::-webkit-scrollbar-thumb:hover {
    background-color: var(--amarillo-polleria); /* Color al pasar el ratón */
}

/* Asegura que las imágenes y videos sean responsivos */
img,
video {
    max-width: 100%; /* No excede el ancho de su contenedor */
    height: auto;    /* Mantiene la relación de aspecto */
    display: block;  /* Evita espacio adicional debajo de las imágenes */
}

/* Soporte para Movimiento Reducido */
/* Deshabilita animaciones y transiciones para usuarios con preferencias de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }
    *,
    ::after,
    ::before {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
        transition-delay: 0ms !important;
    }
    /* Clases específicas que podrían tener animaciones si se definen */
    .animated,
    .fade-in-element {
        animation: none !important;
    }
}

/* =========================================================================== */
/* 3. base/_typography.css                                                     */
/* =========================================================================== */
/* Estilos de encabezados */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--fuente-principal);
    line-height: var(--line-height-titulo);
    color: var(--negro-azabache);
    margin-top: var(--espacio-l); /* Espacio superior para encabezados */
    margin-bottom: var(--espacio-m); /* Espacio inferior para encabezados */
    font-weight: 700; /* Por defecto más audaz */
}

h1 {
    font-size: 2.2em;
    letter-spacing: var(--letter-spacing-titulo-grande);
}

h2 {
    font-size: 2em;
    letter-spacing: var(--letter-spacing-titulo-grande);
}

h3 {
    font-size: 1.5em;
    font-weight: 600; /* Ligeramente menos audaz que H1/H2 */
}

h4 {
    font-size: 1.2em;
    font-weight: 600;
}

h5 {
    font-size: 1.1em;
    font-weight: 500;
}

h6 {
    font-size: 1em;
    font-weight: 500;
    color: var(--gris-texto-secundario); /* Puede ser más sutil */
}

/* Estilos de párrafos */
p {
    margin-bottom: var(--espacio-m); /* Espacio entre párrafos */
    font-size: 1em;
    line-height: var(--line-height-base);
}

/* Último párrafo de un contenedor sin margen inferior */
p:last-child {
    margin-bottom: 0;
}

/* Estilos de enlaces */
a {
    text-decoration: none; /* Sin subrayado por defecto */
    color: var(--amarillo-polleria); /* Color de acento */
    transition: color var(--transicion-rapida); /* Transición suave al pasar el ratón */
}

a:hover,
a:focus-visible {
    color: var(--amarillo-polleria-hover); /* Cambio de color al interactuar */
    outline: none; /* Elimina el contorno de foco predeterminado */
}

/* Estilos para listas */
ul, ol {
    margin-left: var(--espacio-xl); /* Indentación para listas */
    margin-bottom: var(--espacio-m);
    padding: 0; /* Asegura que no haya padding adicional */
}

ul {
    list-style: disc; /* Viñetas por defecto */
}

ol {
    list-style: decimal; /* Números por defecto */
}

li {
    margin-bottom: var(--espacio-s); /* Espacio entre ítems de lista */
    line-height: var(--line-height-base);
}

/* Último ítem de lista sin margen inferior */
li:last-child {
    margin-bottom: 0;
}

/* Estilos para texto en negrita y cursiva */
strong, b {
    font-weight: 700; /* Más audaz */
}

em, i {
    font-style: italic; /* Cursiva */
}

/* Pequeño texto o notas */
small {
    font-size: 0.85em;
    color: var(--gris-texto-secundario);
}

/* =========================================================================== */
/* 4. components/_header-nav.css                                               */
/* =========================================================================== */
/* --- Encabezado (Header) --- */
header {
    background: var(--gris-elemento-claro);
    color: var(--negro-azabache);
    padding: var(--espacio-m) var(--espacio-m) var(--espacio-xs) var(--espacio-m);
    text-align: center;
    border-bottom: 1px solid var(--gris-borde-sutil);
    position: sticky; /* Permanece fijo en la parte superior */
    top: 0;
    z-index: 1000; /* Asegura que esté por encima de otros elementos */
    box-shadow: var(--sombra-sm); /* Sombra sutil para el encabezado */
}

header h1 {
    font-size: 1.8em; /* Tamaño de fuente para el título principal */
    font-weight: 700;
    color: var(--negro-azabache);
    margin-bottom: var(--espacio-s);
    line-height: var(--line-height-titulo);
    letter-spacing: var(--letter-spacing-titulo-grande);
}

/* --- Navegación Móvil (con Iconos) --- */
.icon-nav-mobile {
    display: flex;
    justify-content: space-around; /* Distribuye los ítems uniformemente */
    align-items: flex-start;
    padding-bottom: var(--espacio-xs);
    width: 100%; /* Ocupa todo el ancho disponible */
}

.icon-nav-mobile .nav-item {
    display: flex;
    flex-direction: column; /* Icono encima del texto */
    align-items: center;
    text-decoration: none;
    color: var(--gris-texto-secundario);
    padding: var(--espacio-xs) var(--espacio-s);
    border-radius: var(--radio-borde-s);
    transition: color var(--transicion-rapida), background-color var(--transicion-rapida);
    flex: 1; /* Permite que los ítems se expandan equitativamente */
    text-align: center;
    min-width: 0; /* Previene desbordamiento con textos largos */
    position: relative; /* Necesario para el indicador activo */
}

.icon-nav-mobile .nav-icon {
    margin-bottom: 2px;
    line-height: 1; /* Alineación del icono */
}

.icon-nav-mobile .nav-icon svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.8; /* Grosor del trazo del icono */
    color: var(--gris-texto-secundario);
    transition: color var(--transicion-rapida);
}

.icon-nav-mobile .nav-label {
    font-size: 0.7em;
    font-weight: 500;
    letter-spacing: 0.2px;
    line-height: 1.2;
}

/* Efectos al pasar el ratón o enfocar */
.icon-nav-mobile .nav-item:hover,
.icon-nav-mobile .nav-item:focus-visible {
    background-color: var(--gris-hover-sutil);
    outline: none; /* Elimina el contorno de foco predeterminado */
}

.icon-nav-mobile .nav-item:hover .nav-icon svg,
.icon-nav-mobile .nav-item:hover .nav-label {
    color: var(--amarillo-polleria); /* Cambio de color al pasar el ratón */
}

/* Estilo para el enlace activo en la navegación móvil */
.icon-nav-mobile .nav-item.active-link .nav-icon svg,
.icon-nav-mobile .nav-item.active-link .nav-label {
    color: var(--amarillo-polleria);
    font-weight: 600;
}

/* Indicador activo animado para navegación móvil */
.icon-nav-mobile .nav-item.active-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 25%;
    width: 50%;
    height: 3px; /* Grosor del indicador */
    background-color: var(--amarillo-polleria);
    border-radius: var(--radio-borde-pill);
    animation: fadeInUnderline 0.3s ease-out forwards; /* Animación de aparición */
}

/* Keyframe para la animación del subrayado */
@keyframes fadeInUnderline {
    from {
        transform: scaleX(0);
        opacity: 0;
    }
    to {
        transform: scaleX(1);
        opacity: 1;
    }
}


/* --- Navegación de Escritorio --- */
.desktop-nav {
    display: none; /* Oculta por defecto en móvil */
    background: var(--gris-elemento-claro);
    padding: var(--espacio-s) 0;
    border-bottom: 1px solid var(--gris-borde-sutil);
    box-shadow: var(--sombra-xs); /* Sombra sutil para la barra de navegación */
}

.desktop-nav ul {
    list-style: none; /* Elimina las viñetas */
    display: flex;
    justify-content: center; /* Centra los ítems */
    gap: var(--espacio-l); /* Espacio entre los ítems de navegación */
    max-width: 1200px; /* Ancho máximo para centrado */
    margin: 0 auto; /* Centra la lista */
    padding: 0;
}

.desktop-nav a {
    display: block;
    padding: var(--espacio-s) var(--espacio-m);
    color: var(--negro-azabache);
    text-decoration: none;
    text-transform: none;
    font-size: 0.95em;
    border-radius: var(--radio-borde-m);
    font-weight: 500;
    transition: var(--transicion-suave);
    letter-spacing: 0.3px;
    position: relative;
    overflow: hidden; /* Oculta el desbordamiento para el efecto de línea */
}

/* Animación de la línea inferior para navegación de escritorio */
.desktop-nav a::before {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    width: 0; /* Ancho inicial de la línea */
    height: 2px;
    background-color: var(--amarillo-polleria);
    transition: width var(--transicion-suave), background-color var(--transicion-suave);
    transform: translateX(-50%); /* Centra la línea */
    border-radius: 1px;
}

/* Efectos al pasar el ratón, activo o enfocar */
.desktop-nav a:hover,
.desktop-nav a:active,
.desktop-nav a:focus-visible {
    color: var(--amarillo-polleria);
    background-color: var(--gris-hover-sutil);
    outline: none;
}

.desktop-nav a:hover::before,
.desktop-nav a:active::before,
.desktop-nav a:focus-visible::before {
    width: 70%; /* La línea se extiende más al interactuar */
}

/* Estilo para el enlace activo en la navegación de escritorio */
.desktop-nav a.active-link {
    color: var(--amarillo-polleria);
    font-weight: 600;
    background-color: transparent; /* Fondo transparente para el activo */
}

.desktop-nav a.active-link::before {
    width: 80%; /* La línea es más prominente en el activo */
    background-color: var(--amarillo-polleria);
}


/* --- Media Queries para Adaptación a Escritorio --- */
@media (min-width: var(--breakpoint-md)) {
    header {
        padding: var(--espacio-l) var(--espacio-xl);
        text-align: left;
        display: flex; /* Utiliza flexbox para alinear título y navegación */
        align-items: center;
        justify-content: space-between; /* Espacia el título y la navegación */
    }

    header h1 {
        font-size: 2em;
        margin-bottom: 0; /* Elimina el margen inferior en escritorio */
    }

    .icon-nav-mobile {
        display: none; /* Oculta la navegación móvil en escritorio */
    }

    .desktop-nav {
        display: block; /* Muestra la navegación de escritorio */
    }
}

/* =========================================================================== */
/* 5. components/_buttons.css                                                  */
/* =========================================================================== */
.btn {
    display: block; /* Ocupa el 100% del ancho por defecto (mobile-first) */
    width: 100%;
    padding: 14px var(--espacio-l); /* Mayor padding para mejor área de clic */
    font-size: 1em; /* Tamaño de fuente legible */
    border: 1px solid transparent; /* Borde transparente por defecto */
    border-radius: var(--radio-borde-m); /* Bordes redondeados */
    cursor: pointer; /* Cursor de puntero al pasar el ratón */
    text-decoration: none; /* Sin subrayado para enlaces tipo botón */
    font-weight: 600; /* Texto audaz */
    text-align: center;
    margin-bottom: var(--espacio-m); /* Espacio inferior entre botones */
    transition: var(--transicion-suave), transform 0.1s ease; /* Transiciones para suavizar efectos */
    text-transform: none; /* No fuerza mayúsculas */
    letter-spacing: 0.5px; /* Mayor espaciado entre letras para legibilidad */
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent; /* Elimina el resalte de toque en iOS */
    box-shadow: var(--sombra-xs); /* Sombra sutil por defecto */
}

/* El último botón de un grupo no necesita margen inferior */
.btn:last-child {
    margin-bottom: 0;
}

/* Efectos al pasar el ratón (hover) */
.btn:hover:not(:disabled) {
    transform: translateY(-2px); /* Ligeramente elevado */
    filter: brightness(1.08); /* Ligeramente más brillante */
    box-shadow: var(--sombra-sm); /* Sombra más pronunciada */
}

/* Efectos al hacer clic (active) */
.btn:active:not(:disabled) {
    transform: translateY(0px) scale(0.99); /* Efecto de "presionado" */
    filter: brightness(0.95); /* Ligeramente más oscuro */
    box-shadow: var(--sombra-xs); /* Sombra vuelve al estado normal */
}

/* Efectos al enfocar (focus-visible) para accesibilidad */
.btn:focus-visible:not(:disabled) {
    outline: 3px solid var(--amarillo-polleria-focus-ring); /* Anillo de foco más visible */
    outline-offset: 2px;
}

/* Estilos para botones deshabilitados */
.btn:disabled {
    background-color: var(--gris-fondo-deshabilitado) !important;
    color: var(--gris-texto-terciario) !important;
    border-color: var(--gris-fondo-deshabilitado) !important;
    cursor: not-allowed; /* Cursor de "no permitido" */
    box-shadow: none !important;
    transform: none !important;
    filter: none !important;
}

/* --- Variantes de Botones --- */

/* Botón Primario (Default si no se especifica otra variante) */
.btn-primario,
.btn:not(.btn-secondary):not(.btn-texto):not(.btn-danger):not(.btn-outline-danger):not(.btn-success) {
    background-color: var(--amarillo-polleria);
    color: var(--texto-sobre-amarillo);
    border-color: var(--amarillo-polleria);
}
.btn-primario:hover:not(:disabled),
.btn:not(.btn-secondary):not(.btn-texto):not(.btn-danger):not(.btn-outline-danger):not(.btn-success):hover:not(:disabled) {
    background-color: var(--amarillo-polleria-hover);
    border-color: var(--amarillo-polleria-hover);
    color: var(--texto-sobre-amarillo);
}

/* Botón Secundario */
.btn-secondary {
    background-color: var(--gris-texto-secundario);
    color: var(--blanco);
    border-color: var(--gris-texto-secundario);
}
.btn-secondary:hover:not(:disabled) {
    background-color: var(--negro-azabache);
    border-color: var(--negro-azabache);
    color: var(--blanco);
}

/* Botón de Texto (similar a un enlace, sin fondo sólido) */
.btn-texto {
    background-color: transparent;
    color: var(--amarillo-polleria);
    border-color: transparent;
    padding-left: var(--espacio-s); /* Menor padding lateral */
    padding-right: var(--espacio-s);
    font-weight: 500;
    box-shadow: none; /* Sin sombra */
}
.btn-texto:hover:not(:disabled) {
    background-color: var(--gris-hover-sutil);
    transform: none; /* Sin efecto de elevación */
    filter: none;
    box-shadow: none;
}
.btn-texto:active:not(:disabled) {
    background-color: #E5E5EA; /* Color de fondo al presionar */
    transform: none;
    filter: none;
    box-shadow: none;
}

/* Botón de Peligro (para acciones destructivas) */
.btn-danger {
    background-color: var(--rojo-peligro-texto);
    color: var(--blanco);
    border-color: var(--rojo-peligro-texto);
}
.btn-danger:hover:not(:disabled) {
    background-color: #C5221F; /* Tono más oscuro al pasar el ratón */
    border-color: #C5221F;
}

/* Botón de Peligro con Borde (Outline Danger) */
.btn-outline-danger {
    background-color: transparent;
    color: var(--rojo-peligro-texto);
    border: 1.5px solid var(--rojo-peligro-texto); /* Borde más grueso */
    box-shadow: none;
}
.btn-outline-danger:hover:not(:disabled) {
    background-color: var(--rojo-peligro-texto); /* Relleno al pasar el ratón */
    color: var(--blanco);
    box-shadow: var(--sombra-xs);
}

/* Botón de Éxito (para acciones de confirmación/éxito) */
.btn-success {
    background-color: var(--verde-accion);
    color: var(--texto-sobre-verde);
    border-color: var(--verde-accion);
}
.btn-success:hover:not(:disabled) {
    background-color: #388E3C; /* Tono más oscuro al pasar el ratón */
    border-color: #388E3C;
}

/* Utilidad para hacer que un botón ocupe todo el ancho */
.btn-block {
    width: 100%;
    display: block;
}

/* Contenedor para grupos de botones o acciones de formulario */
.form-actions {
    display: flex;
    flex-direction: column; /* Por defecto en columna para móvil */
    gap: var(--espacio-m); /* Espacio entre botones */
    margin-top: var(--espacio-l);
}

/* Media Query para escritorio: Los botones de acción vuelven a ser en fila */
@media (min-width: var(--breakpoint-md)) {
    .btn {
        display: inline-block; /* Vuelve a ser inline-block */
        width: auto; /* Ancho automático según contenido */
        padding: 14px var(--espacio-l); /* Mantener padding */
        font-size: 1em; /* Mantener tamaño de fuente */
    }

    .btn.btn-block { /* Pero la clase .btn-block aún puede forzar el 100% de ancho */
        display: block;
        width: 100%;
    }

    .form-actions {
        flex-direction: row; /* En fila para escritorio */
        flex-wrap: wrap; /* Permite que los botones se envuelvan si no caben */
        justify-content: flex-start; /* Alinea a la izquierda */
    }

    .form-actions .btn {
        margin-bottom: 0; /* Elimina el margen inferior entre ellos en fila */
    }
}

/* =========================================================================== */
/* 6. components/_forms.css                                                    */
/* =========================================================================== */
/* --- Contenedor de Grupo de Formulario --- */
.form-group {
    margin-bottom: var(--espacio-l); /* Espacio entre grupos de formulario */
    position: relative; /* Para posicionamiento de iconos o indicadores */
}

/* --- Etiquetas de Formulario (Labels) --- */
.form-group label {
    display: block; /* Cada label en su propia línea */
    margin-bottom: var(--espacio-s);
    font-weight: 600; /* Texto de etiqueta audaz */
    color: var(--negro-azabache);
    font-size: 0.95em;
}

/* Indicador de campo requerido */
.required-indicator {
    color: var(--rojo-peligro-texto);
    margin-left: var(--espacio-xs);
    font-weight: 600;
    font-size: 1em;
}

/* --- Estilos para Inputs de Texto, Número, Fecha, Email, Textareas y Selects --- */
.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="date"],
.form-group input[type="email"],
.form-group textarea,
.form-group select {
    width: 100%; /* Ocupa todo el ancho disponible */
    padding: 14px var(--espacio-m); /* Padding generoso */
    border: 1px solid var(--gris-borde-input); /* Borde sutil */
    border-radius: var(--radio-borde-m); /* Bordes redondeados */
    font-size: 1em;
    font-family: var(--fuente-principal);
    background-color: var(--gris-elemento-claro); /* Fondo claro */
    color: var(--negro-azabache);
    transition: border-color var(--transicion-rapida), box-shadow var(--transicion-rapida);
    appearance: none; /* Restablece estilos de apariencia nativos del navegador */
    -webkit-appearance: none;
    -moz-appearance: none;
}

/* Estilo específico para Select (con icono de flecha personalizado) */
.form-group select {
    /* Icono SVG para la flecha del select */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%238A8A8E' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M2 6l6 4 6-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right var(--espacio-m) center; /* Posiciona el icono a la derecha */
    background-size: 1em; /* Tamaño del icono */
    padding-right: calc(var(--espacio-m) * 2.5 + 5px); /* Espacio extra para el icono */
}

/* Estados de foco para inputs, textareas y selects */
.form-group input:focus-visible,
.form-group textarea:focus-visible,
.form-group select:focus-visible {
    outline: none; /* Elimina el contorno predeterminado */
    border-color: var(--amarillo-polleria); /* Borde de color de acento */
    box-shadow: 0 0 0 4px var(--amarillo-polleria-focus-ring); /* "Glow" de foco */
}

/* Estilo para el placeholder */
.form-group ::placeholder {
    color: var(--gris-texto-secundario);
    opacity: 0.7;
}

/* Estilo para Textarea (altura mínima y redimensionable) */
.form-group textarea {
    min-height: 120px;
    resize: vertical; /* Permite redimensionar solo verticalmente */
}

/* --- Estilos para Checkboxes y Radios --- */
.form-group input[type="checkbox"],
.form-group input[type="radio"] {
    width: 1.25em; /* Tamaño más grande para facilitar el toque */
    height: 1.25em;
    margin-right: var(--espacio-s);
    vertical-align: middle; /* Alinea con el texto adyacente */
    accent-color: var(--amarillo-polleria); /* Color de acento para navegadores que lo soporten */
    cursor: pointer;
    position: relative;
    top: -1px; /* Ajuste fino de alineación */
    border: 1px solid var(--gris-borde-input);
    border-radius: var(--radio-borde-s); /* Cuadrado para checkbox */
    appearance: none; /* Elimina la apariencia nativa */
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: background-color var(--transicion-rapida), border-color var(--transicion-rapida);
}

.form-group input[type="radio"] {
    border-radius: 50%; /* Redondo para radio button */
}

/* Estilos para checkbox/radio marcados */
.form-group input[type="checkbox"]:checked,
.form-group input[type="radio"]:checked {
    background-color: var(--amarillo-polleria);
    border-color: var(--amarillo-polleria);
    /* Icono SVG para el checkmark del checkbox */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='white' d='M6.293 11.293a1 1 0 0 1-1.414 0L2.707 9.121A1 1 0 0 1 4.12 7.707l1.586 1.586L11.879 3.12a1 1 0 0 1 1.414 1.414L6.293 11.293z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
}

/* Icono para radio button marcado */
.form-group input[type="radio"]:checked {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle fill='white' cx='8' cy='8' r='3'/%3E%3C/svg%3E");
}

/* Estado de foco para checkboxes/radios */
.form-group input[type="checkbox"]:focus-visible,
.form-group input[type="radio"]:focus-visible {
    outline: 3px solid var(--amarillo-polleria-focus-ring);
    outline-offset: 2px;
}

/* Labels para checkboxes y radios (inline) */
.form-group label.checkbox-label,
.form-group label.radio-label {
    font-weight: 400; /* Menos audaz que los labels de input */
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    color: var(--negro-azabache);
    cursor: pointer;
    margin-bottom: 0;
    font-size: 1em;
}

/* --- Estilos para Campos Deshabilitados --- */
.form-group input:disabled,
.form-group textarea:disabled,
.form-group select:disabled {
    background-color: var(--gris-fondo-deshabilitado);
    color: var(--gris-texto-terciario);
    cursor: not-allowed;
    border-color: var(--gris-borde-sutil);
}

.form-group input[type="checkbox"]:disabled,
.form-group input[type="radio"]:disabled {
    background-color: var(--gris-fondo-deshabilitado);
    border-color: var(--gris-borde-sutil);
}

.form-group input[type="checkbox"]:disabled:checked,
.form-group input[type="radio"]:disabled:checked {
    background-color: var(--gris-texto-terciario); /* Color más tenue cuando marcado y deshabilitado */
    border-color: var(--gris-texto-terciario);
}


/* --- Estructuras de Formulario para Layout --- */

/* Fila de formulario para organizar inputs en una línea (útil en escritorio) */
.form-row {
    display: flex;
    flex-direction: column; /* Por defecto en columna para mobile */
    gap: var(--espacio-l); /* Espacio entre elementos en la fila */
    margin-bottom: var(--espacio-l);
}
.form-row .form-group {
    margin-bottom: 0; /* Elimina el margen inferior si es parte de un form-row */
}

/* Grupo de formulario en línea (label y input en la misma línea) */
.form-group-inline {
    display: flex;
    flex-direction: column; /* Por defecto apilado en móvil */
    flex-wrap: wrap;
    align-items: flex-start; /* Alineación inicial */
    gap: var(--espacio-s);
    margin-bottom: var(--espacio-m);
}
.form-group-inline label {
    margin-bottom: var(--espacio-xs); /* Menor margen para el label en línea */
    flex-basis: auto; /* Permite que el label no crezca demasiado */
    text-align: left;
    padding-right: 0;
}
.form-group-inline input,
.form-group-inline select,
.form-group-inline textarea {
    flex-grow: 1; /* Permite que los inputs llenen el espacio restante */
    width: 100%; /* Ocupa el ancho completo en móvil */
}
.form-group-inline label.checkbox-label {
    flex-basis: auto;
    text-align: left;
    padding-right: var(--espacio-xs);
    margin-bottom: 0;
}
.form-group-inline input[type="checkbox"] {
    margin-left: 0;
    width: auto;
    flex-grow: 0;
}


/* --- Media Queries para Adaptación a Escritorio --- */
@media (min-width: var(--breakpoint-md)) {
    .form-row {
        flex-direction: row; /* Vuelve a fila en escritorio */
    }
    .form-row .form-group {
        flex: 1; /* Cada grupo ocupa el mismo espacio en la fila */
        margin-bottom: 0;
    }
    .form-group-inline {
        flex-direction: row; /* En fila para escritorio */
        align-items: center; /* Centra verticalmente */
    }
    .form-group-inline label {
        margin-bottom: 0;
        flex-basis: 150px; /* Ancho fijo para el label */
        flex-grow: 0;
        text-align: right; /* Alinea el texto del label a la derecha */
        padding-right: var(--espacio-s);
    }
    .form-group-inline input,
    .form-group-inline select,
    .form-group-inline textarea {
        flex-grow: 1;
        width: auto; /* Ancho automático, crecerá según flex-grow */
    }
}

/* =========================================================================== */
/* 7. components/_cards.css                                                    */
/* =========================================================================== */
/* --- Estilo Base para Tarjetas (Card Component) --- */
.card {
    background-color: var(--gris-elemento-claro); /* Fondo blanco */
    border-radius: var(--radio-borde-l); /* Bordes generosamente redondeados */
    border: 1px solid var(--gris-borde-sutil); /* Borde sutil */
    box-shadow: none; /* Sin sombra por defecto */
    margin-bottom: var(--espacio-l); /* Espacio entre tarjetas */
    overflow: hidden; /* Asegura que el contenido (ej. imágenes) respete el radio de borde */
    transition: transform var(--transicion-suave), box-shadow var(--transicion-suave); /* Transiciones para efectos interactivos */
}

/* Variante de tarjeta con sombra elevada */
.card-elevated {
    box-shadow: var(--sombra-md);
}

/* Efecto de elevación al pasar el ratón */
.card:hover {
    transform: translateY(-5px); /* Ligeramente elevado */
    box-shadow: var(--sombra-lg); /* Sombra más pronunciada */
}

/* Contenedor para el contenido interno de la tarjeta */
.card-body {
    padding: var(--espacio-l); /* Padding interno */
}

/* Línea horizontal dentro de la tarjeta (si aplica) */
.card > hr {
    border: none;
    border-top: 1px solid var(--gris-borde-sutil);
    margin: var(--espacio-l) 0;
}

/* --- Estilos para Tarjetas de Producto --- */
.product-card .product-image {
    width: 100%;
    height: 220px; /* Altura fija para la imagen del producto */
    object-fit: cover; /* Recorta la imagen para cubrir el área */
    border-bottom: 1px solid var(--gris-borde-sutil);
    filter: brightness(0.95); /* Ligero oscurecimiento para mejor contraste del texto si hay overlay */
    transition: filter var(--transicion-suave);
}

/* Efecto al pasar el ratón sobre la imagen del producto */
.product-card:hover .product-image {
    filter: brightness(1); /* Elimina el oscurecimiento */
}

.product-card .product-title {
    font-size: 1.2em;
    font-weight: 700;
    color: var(--negro-azabache);
    margin-bottom: var(--espacio-xs); /* Menor margen para el título del producto */
}

.product-card .product-description {
    font-size: 0.95em;
    color: var(--gris-texto-secundario);
    margin-bottom: var(--espacio-s);
    min-height: 3em; /* Asegura espacio para 2 líneas de descripción */
    display: -webkit-box; /* Para truncar texto */
    -webkit-line-clamp: 2; /* Mostrar máximo 2 líneas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis; /* Añade puntos suspensivos si el texto es muy largo */
}

.product-card .product-price {
    font-size: 1.15em;
    font-weight: 700;
    color: var(--negro-azabache);
    margin-bottom: var(--espacio-m);
}

/* =========================================================================== */
/* 8. components/_alerts.css                                                   */
/* =========================================================================== */
/* Contenedor de la lista de mensajes */
.flash-messages {
    margin-bottom: var(--espacio-l);
    list-style: none; /* Elimina las viñetas de la lista */
    padding: 0;
}

/* Estilo base para cada mensaje de alerta */
.alert {
    display: flex;
    align-items: center; /* Alinea verticalmente el contenido y el icono */
    gap: var(--espacio-m); /* Espacio entre el icono y el texto */
    padding: var(--espacio-m) var(--espacio-l);
    margin-bottom: var(--espacio-m);
    border-left: 5px solid; /* Borde de color para indicar tipo de alerta */
    border-radius: var(--radio-borde-m); /* Bordes redondeados */
    font-size: 0.95em;
    font-weight: 500;
    position: relative;
    box-shadow: var(--sombra-xs); /* Sombra sutil */
}

/* Estilo del icono dentro de la alerta */
.alert .icon {
    flex-shrink: 0; /* Previene que el icono se encoja */
    line-height: 1;
}
.alert .icon svg {
    width: 1.3em;
    height: 1.3em;
    stroke-width: 2; /* Grosor del trazo del icono SVG */
    color: currentColor; /* El color del icono será el mismo que el texto del alert */
    vertical-align: middle;
}

/* --- Variantes de Alerta --- */

/* Alerta de éxito (verde) */
.alert-success {
    background-color: var(--verde-exito-fondo);
    color: var(--verde-exito);
    border-color: var(--verde-exito);
}

/* Alerta de peligro/error (rojo) */
.alert-danger {
    background-color: var(--rojo-peligro-fondo);
    color: var(--rojo-peligro-texto);
    border-color: var(--rojo-peligro-texto);
}

/* Alerta de advertencia (amarillo) */
.alert-warning {
    background-color: rgba(255, 193, 7, 0.15); /* Fondo ligeramente transparente del amarillo */
    color: #B38600; /* Color de texto más oscuro para contraste */
    border-color: var(--amarillo-polleria);
}

/* Alerta de información (azul) */
.alert-info {
    background-color: var(--azul-info-fondo);
    color: var(--azul-info);
    border-color: var(--azul-info);
}

/* =========================================================================== */
/* 9. components/_badges.css                                                   */
/* =========================================================================== */
.badge {
    display: inline-block; /* Permite que los badges se alineen en la misma línea */
    padding: 0.35em 0.7em; /* Padding vertical y horizontal */
    font-size: 0.75em;
    font-weight: 700; /* Texto audaz */
    line-height: 1; /* Altura de línea compacta */
    color: var(--blanco); /* Color de texto blanco por defecto */
    text-align: center;
    white-space: nowrap; /* Evita que el texto del badge se rompa en varias líneas */
    vertical-align: middle; /* Alinea verticalmente con el texto adyacente */
    border-radius: var(--radio-borde-s); /* Bordes ligeramente redondeados */
    text-transform: uppercase; /* Texto en mayúsculas */
    letter-spacing: 0.7px; /* Mayor espaciado entre letras */
    margin-right: var(--espacio-xs); /* Espacio entre badges */
    box-shadow: var(--sombra-xs); /* Sombra sutil */
}

/* El último badge de un grupo no necesita margen a la derecha */
.badge:last-child {
    margin-right: 0;
}

/* --- Variantes de Badges --- */

.badge-amarillo-polleria {
    background-color: var(--amarillo-polleria);
    color: var(--texto-sobre-amarillo);
}

.badge-rojo {
    background-color: var(--rojo-peligro-texto);
    color: var(--blanco);
}

.badge-verde {
    background-color: var(--verde-exito);
    color: var(--blanco);
}

.badge-gris {
    background-color: var(--gris-texto-secundario);
    color: var(--blanco);
}

.badge-azul {
    background-color: var(--azul-info);
    color: var(--blanco);
}

/* =========================================================================== */
/* 10. components/_tables.css                                                  */
/* =========================================================================== */
/* Contenedor para hacer que las tablas sean responsivas en pantallas pequeñas */
.table-container {
    overflow-x: auto; /* Permite desplazamiento horizontal si la tabla es más ancha que el contenedor */
    -webkit-overflow-scrolling: touch; /* Mejora el scroll en dispositivos iOS */
    margin-bottom: var(--espacio-xl);
    border: 1px solid var(--gris-borde-sutil);
    border-radius: var(--radio-borde-l); /* Bordes redondeados para el contenedor */
    background-color: var(--gris-elemento-claro);
    box-shadow: var(--sombra-sm); /* Sombra sutil para la tabla */
}

table {
    width: 100%; /* Ocupa todo el ancho del contenedor */
    border-collapse: separate; /* Permite usar border-spacing */
    border-spacing: 0; /* Elimina el espacio entre celdas por defecto */
}

/* Estilos para encabezados de tabla (<th>) y celdas de datos (<td>) */
th,
td {
    padding: var(--espacio-m) var(--espacio-l); /* Padding interno */
    text-align: left;
    font-size: 0.95em;
    vertical-align: middle; /* Alineación vertical del contenido */
}

/* Estilos específicos para los encabezados de tabla */
th {
    background-color: var(--gris-hover-sutil); /* Fondo para los encabezados */
    color: var(--gris-texto-secundario);
    font-weight: 600;
    text-transform: uppercase; /* Texto en mayúsculas */
    font-size: 0.8em;
    letter-spacing: 0.5px;
    white-space: nowrap; /* Evita que el texto del encabezado se rompa */
    border-bottom: 1px solid var(--gris-borde-sutil); /* Borde inferior */
}

/* Estilos específicos para las celdas de datos */
td {
    color: var(--negro-azabache);
    border-bottom: 1px solid var(--gris-borde-sutil); /* Borde inferior para cada celda */
}

/* La última fila del cuerpo de la tabla no necesita borde inferior */
tbody tr:last-child td {
    border-bottom: none;
}

/* Efecto de resaltado al pasar el ratón sobre una fila de tabla */
tbody tr:hover {
    background-color: var(--gris-hover-sutil);
    transition: var(--transicion-rapida);
}


/* --- Media Queries para Adaptación a Escritorio --- */
@media (min-width: var(--breakpoint-md)) {
    th,
    td {
        font-size: 1em; /* Tamaño de fuente ligeramente más grande en escritorio */
        white-space: normal; /* Permite que el texto se rompa en varias líneas */
        padding: var(--espacio-m) var(--espacio-l);
    }
    th {
        font-size: 0.85em; /* Ligeramente más grande que en móvil */
    }
}

/* =========================================================================== */
/* 11. components/_semantic-elements.css                                       */
/* =========================================================================== */
/* --- Blockquotes (Citas en Bloque) --- */
blockquote {
    margin: var(--espacio-l) 0 var(--espacio-l) var(--espacio-xs);
    padding: var(--espacio-m) var(--espacio-l);
    border-left: 4px solid var(--amarillo-polleria); /* Borde decorativo */
    background-color: var(--gris-hover-sutil); /* Fondo sutil */
    font-style: italic;
    color: var(--gris-texto-secundario);
    border-radius: 0 var(--radio-borde-s) var(--radio-borde-s) 0; /* Solo el lado derecho redondeado */
    box-shadow: var(--sombra-xs); /* Sombra sutil */
}
blockquote p {
    margin-bottom: var(--espacio-s);
}
blockquote p:last-child {
    margin-bottom: 0; /* Elimina el margen inferior del último párrafo */
}

/* --- Mark (Texto Resaltado) --- */
mark {
    background-color: rgba(255, 193, 7, 0.25); /* Fondo semitransparente amarillo */
    color: #B38600; /* Color de texto que contrasta bien */
    padding: 0.1em 0.5em; /* Padding para el resaltado */
    border-radius: var(--radio-borde-s); /* Bordes ligeramente redondeados */
}

/* --- Código en Línea, Teclado, Preformateado y Salida de Programa --- */
code,
kbd,
pre,
samp {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* Fuente monoespaciada */
    font-size: 0.9em;
    background-color: var(--gris-hover-sutil);
    padding: 0.2em 0.5em; /* Padding para distinguirlos */
    border-radius: var(--radio-borde-s);
    color: var(--negro-azabache);
    border: 1px solid var(--gris-borde-sutil);
}

kbd {
    box-shadow: var(--sombra-xs); /* Sombra para simular una tecla */
}

pre {
    display: block; /* Ocupa todo el ancho */
    padding: var(--espacio-m);
    margin: 0 0 var(--espacio-l);
    overflow: auto; /* Permite desplazamiento si el contenido es muy largo */
    white-space: pre-wrap; /* Mantiene saltos de línea y espacios */
    word-wrap: break-word; /* Rompe palabras largas para evitar desbordamiento */
    border: 1px solid var(--gris-borde-sutil);
    border-radius: var(--radio-borde-m);
    background-color: var(--gris-hover-sutil);
    box-shadow: var(--sombra-xs);
}

pre code {
    padding: 0; /* Elimina padding adicional dentro de pre */
    background-color: transparent; /* Fondo transparente */
    border-radius: 0;
    border: none;
    color: inherit; /* Hereda el color del padre */
}

/* --- Figure y Figcaption (Imágenes con Leyenda) --- */
figure {
    margin: 0 0 var(--espacio-l); /* Espacio inferior para la figura */
}
figcaption {
    font-size: 0.85em;
    color: var(--gris-texto-secundario);
    margin-top: var(--espacio-s);
    text-align: center; /* Centra el texto de la leyenda */
}

/* --- Details y Summary (Acordeones/Expandibles) --- */
details {
    background-color: var(--gris-elemento-claro);
    border: 1px solid var(--gris-borde-sutil);
    border-radius: var(--radio-borde-l);
    padding: var(--espacio-m);
    margin-bottom: var(--espacio-m);
    box-shadow: var(--sombra-xs);
    transition: background-color var(--transicion-rapida);
}
details:hover {
    background-color: var(--gris-hover-sutil);
}
details[open] {
    padding-bottom: var(--espacio-m); /* Ajuste de padding cuando está abierto */
}

summary {
    font-weight: 600;
    cursor: pointer;
    color: var(--negro-azabache);
    list-style: none; /* Elimina el marcador por defecto del navegador */
    position: relative;
    padding-right: var(--espacio-l); /* Espacio para el icono de expandir/contraer */
    display: flex;
    align-items: center;
    justify-content: space-between; /* Para alinear el icono a la derecha */
}
summary::-webkit-details-marker {
    display: none; /* Elimina el marcador nativo en Webkit */
}
/* Icono personalizado para el summary (flecha) */
summary::after {
    content: '';
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    border-right: 2px solid var(--gris-texto-secundario);
    border-bottom: 2px solid var(--gris-texto-secundario);
    transform: rotate(45deg); /* Flecha apuntando hacia abajo */
    transition: transform var(--transicion-rapida);
    margin-top: -0.1em; /* Ajuste vertical */
}
details[open] summary::after {
    transform: rotate(-135deg); /* Gira la flecha cuando está abierto */
}
summary:hover {
    color: var(--amarillo-polleria);
}
summary:hover::after {
    border-color: var(--amarillo-polleria);
}
details > *:not(summary) {
    margin-top: var(--espacio-m); /* Margen superior para el contenido del details */
    padding-left: 0;
    color: var(--gris-texto-secundario);
    font-size: 0.9em;
}

/* =========================================================================== */
/* 12. layout/_main-layout.css                                                 */
/* =========================================================================== */
/* --- Contenido Principal (Main) --- */
main {
    padding: var(--espacio-l); /* Padding general para el contenido */
    max-width: 1200px; /* Ancho máximo para centrar en pantallas grandes */
    margin: var(--espacio-l) auto; /* Margen superior y centrado horizontal */
}

/* Línea horizontal que separa secciones en el main (si aplica) */
main > hr {
    border: none;
    border-top: 1px solid var(--gris-borde-sutil);
    margin: var(--espacio-l) 0;
}

/* Estilo para los títulos de sección (h2 y h3 dentro de <section>) */
section > h2,
section > h3 {
    margin-bottom: var(--espacio-m);
    color: var(--negro-azabache);
}

section > h2 {
    font-size: 2em; /* Tamaño grande para títulos de sección */
    font-weight: 700;
    letter-spacing: var(--letter-spacing-titulo-grande);
    text-align: center; /* Centra los títulos de sección */
    margin-bottom: var(--espacio-xl); /* Mayor espacio inferior */
}

section > h3 {
    font-size: 1.5em;
    font-weight: 600;
    margin-top: var(--espacio-xxl); /* Mayor espacio superior para subsecciones */
    margin-bottom: var(--espacio-m);
}

section p {
    margin-bottom: var(--espacio-s); /* Espacio entre párrafos dentro de secciones */
}
section ul {
    list-style-position: inside; /* Viñetas dentro del padding */
    padding-left: var(--espacio-xs); /* Pequeña indentación */
}
section ul li {
    margin-bottom: var(--espacio-s);
}

/* --- Pie de Página (Footer) --- */
footer {
    text-align: center;
    padding: var(--espacio-xl) var(--espacio-l);
    background: var(--gris-fondo-claro);
    color: var(--gris-texto-secundario);
    margin-top: var(--espacio-xxl); /* Mayor espacio superior */
    font-size: 0.85em;
    border-top: 1px solid var(--gris-borde-sutil); /* Borde superior */
}


/* --- Media Queries para Adaptación a Escritorio --- */
@media (min-width: var(--breakpoint-md)) {
    html {
        font-size: calc(var(--tamano-fuente-base) + 1px); /* Tamaño de fuente ligeramente más grande */
    }

    main {
        padding: var(--espacio-xl) calc(var(--espacio-xl) * 2); /* Mayor padding lateral */
        margin: var(--espacio-xxl) auto; /* Margen superior y centrado mejorado */
    }

    /* Mayor espacio entre secciones en escritorio */
    main section:not(:first-child) {
        margin-top: var(--espacio-xxxl);
    }

    section > h2 {
        font-size: 2.5em; /* Títulos de sección más grandes */
    }
    section > h3 {
        font-size: 1.8em;
    }
}

@media (min-width: var(--breakpoint-lg)) {
    main {
        max-width: 1400px; /* Aumenta el ancho máximo para pantallas grandes */
    }
}

/* =========================================================================== */
/* 13. layout/_grid.css                                                        */
/* =========================================================================== */
/* --- Grid para Tarjetas de Producto --- */
.product-card-grid {
    display: grid;
    /* Columnas auto-ajustables con un ancho mínimo y máximo */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--espacio-l); /* Espacio entre las tarjetas */
    margin-top: var(--espacio-l);
}

/* --- Grid para Ejemplos de Animaciones --- */
.grid-animaciones {
    display: grid;
    /* Columnas auto-ajustables con un ancho mínimo y máximo */
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); /* Mayor min-width para las tarjetas */
    gap: var(--espacio-m); /* Espacio entre las tarjetas de animación */
}

/* --- Media Queries para Adaptación a Escritorio --- */
@media (min-width: var(--breakpoint-lg)) {
    .product-card-grid {
        /* Tarjetas ligeramente más grandes en pantallas grandes */
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--espacio-xl); /* Mayor espacio entre tarjetas */
    }
}

/* =========================================================================== */
/* 14. base/_utilities.css                                                     */
/* =========================================================================== */
/* --- Márgenes --- */
.m-0 { margin: 0 !important; }
.mt-xs { margin-top: var(--espacio-xs) !important; }
.mb-xs { margin-bottom: var(--espacio-xs) !important; }
.ml-xs { margin-left: var(--espacio-xs) !important; }
.mr-xs { margin-right: var(--espacio-xs) !important; }
.mx-xs { margin-left: var(--espacio-xs) !important; margin-right: var(--espacio-xs) !important; }
.my-xs { margin-top: var(--espacio-xs) !important; margin-bottom: var(--espacio-xs) !important; }

.m-s { margin: var(--espacio-s) !important; }
.mt-s { margin-top: var(--espacio-s) !important; }
.mb-s { margin-bottom: var(--espacio-s) !important; }
.ml-s { margin-left: var(--espacio-s) !important; }
.mr-s { margin-right: var(--espacio-s) !important; }
.mx-s { margin-left: var(--espacio-s) !important; margin-right: var(--espacio-s) !important; }
.my-s { margin-top: var(--espacio-s) !important; margin-bottom: var(--espacio-s) !important; }

.m-m { margin: var(--espacio-m) !important; }
.mt-m { margin-top: var(--espacio-m) !important; }
.mb-m { margin-bottom: var(--espacio-m) !important; }
.ml-m { margin-left: var(--espacio-m) !important; }
.mr-m { margin-right: var(--espacio-m) !important; }
.mx-m { margin-left: var(--espacio-m) !important; margin-right: var(--espacio-m) !important; }
.my-m { margin-top: var(--espacio-m) !important; peasantry-bottom: var(--espacio-m) !important; }

.m-l { margin: var(--espacio-l) !important; }
.mt-l { margin-top: var(--espacio-l) !important; }
.mb-l { margin-bottom: var(--espacio-l) !important; }
.ml-l { margin-left: var(--espacio-l) !important; }
.mr-l { margin-right: var(--espacio-l) !important; }
.mx-l { margin-left: var(--espacio-l) !important; margin-right: var(--espacio-l) !important; }
.my-l { margin-top: var(--espacio-l) !important; margin-bottom: var(--espacio-l) !important; }

.m-xl { margin: var(--espacio-xl) !important; }
.mt-xl { margin-top: var(--espacio-xl) !important; }
.mb-xl { margin-bottom: var(--espacio-xl) !important; }

.m-xxl { margin: var(--espacio-xxl) !important; }
.mt-xxl { margin-top: var(--espacio-xxl) !important; }
.mb-xxl { margin-bottom: var(--espacio-xxl) !important; }

.m-xxxl { margin: var(--espacio-xxxl) !important; }
.mt-xxxl { margin-top: var(--espacio-xxxl) !important; }
.mb-xxxl { margin-bottom: var(--espacio-xxxl) !important; }


/* --- Paddings --- */
.p-0 { padding: 0 !important; }
.p-xs { padding: var(--espacio-xs) !important; }
.pt-xs { padding-top: var(--espacio-xs) !important; }
.pb-xs { padding-bottom: var(--espacio-xs) !important; }

.p-s { padding: var(--espacio-s) !important; }
.pt-s { padding-top: var(--espacio-s) !important; }
.pb-s { padding-bottom: var(--espacio-s) !important; }

.p-m { padding: var(--espacio-m) !important; }
.pt-m { padding-top: var(--espacio-m) !important; }
.pb-m { padding-bottom: var(--espacio-m) !important; }

.p-l { padding: var(--espacio-l) !important; }
.pt-l { padding-top: var(--espacio-l) !important; }
.pb-l { padding-bottom: var(--espacio-l) !important; }


/* --- Alineación de Texto --- */
.text-left { text-align: left !important; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }
.text-justify { text-align: justify !important; }


/* --- Colores de Texto --- */
.text-amarillo-polleria { color: var(--amarillo-polleria) !important; }
.text-verde-exito { color: var(--verde-exito) !important; }
.text-gris-secundario { color: var(--gris-texto-secundario) !important; }
.text-negro-azabache { color: var(--negro-azabache) !important; }


/* --- Display y Flexbox --- */
.hidden { display: none !important; } /* Oculta un elemento */
.sr-only { /* Oculta visualmente un elemento pero lo mantiene disponible para lectores de pantalla */
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0,0,0,0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}
.sr-only-focusable:active,
.sr-only-focusable:focus { /* Hace que un elemento sr-only sea visible al enfocarse */
    position: static !important;
    width: auto !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: normal !important;
}

.d-block { display: block !important; }
.d-inline-block { display: inline-block !important; }
.d-inline { display: inline !important; }
.d-flex { display: flex !important; }
.d-grid { display: grid !important; }

.flex-column { flex-direction: column !important; }
.justify-content-center { justify-content: center !important; }
.justify-content-between { justify-content: space-between !important; }
.justify-content-end { justify-content: flex-end !important; }
.align-items-center { align-items: center !important; }
.align-items-start { align-items: flex-start !important; }
.flex-grow-1 { flex-grow: 1 !important; } /* Permite que el elemento crezca para ocupar espacio disponible */


/* --- Bordes --- */
.border { border: 1px solid var(--gris-borde-sutil) !important; }
.border-top { border-top: 1px solid var(--gris-borde-sutil) !important; }
.border-bottom { border-bottom: 1px solid var(--gris-borde-sutil) !important; }
.border-0 { border: 0 !important; } /* Elimina todos los bordes */


/* --- Radios de Borde --- */
.rounded-s { border-radius: var(--radio-borde-s) !important; }
.rounded-m { border-radius: var(--radio-borde-m) !important; }
.rounded-l { border-radius: var(--radio-borde-l) !important; }
.rounded-circle { border-radius: 50% !important; }
.rounded-pill { border-radius: var(--radio-borde-pill) !important; }

/* =========================================================================== */
/* 15. animations/_animations.css                                              */
/* =========================================================================== */
/* --- Definición de Keyframes --- */

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
        visibility: hidden; /* Oculta el elemento al finalizar la animación */
    }
}

@keyframes slideInUp {
    from {
        transform: translateY(30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInDown {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideInLeft {
    from {
        transform: translateX(-30px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideInRight {
    from {
        transform: translateX(30px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.03); /* Ligeramente más grande */
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px); /* Rebote hacia arriba */
    }
    60% {
        transform: translateY(-5px); /* Pequeño rebote de vuelta */
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes scaleUp {
    from {
        transform: scale(0.95);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* --- Clases de Utilidad para Aplicar Animaciones --- */

.animated {
    animation-duration: 0.5s; /* Duración por defecto */
    animation-fill-mode: both; /* Mantiene el estado final de la animación */
}

.animate-fadeIn { animation-name: fadeIn; }
.animate-fadeOut { animation-name: fadeOut; }
.animate-slideInUp { animation-name: slideInUp; }
.animate-slideInDown { animation-name: slideInDown; }
.animate-slideInLeft { animation-name: slideInLeft; }
.animate-slideInRight { animation-name: slideInRight; }

.animate-pulse {
    animation-name: pulse;
    animation-duration: 1.2s;
    animation-timing-function: ease-in-out;
}

.animate-bounce {
    animation-name: bounce;
    animation-duration: 1s;
}

.animate-spin {
    animation-name: spin;
    animation-duration: 1s;
    animation-timing-function: linear; /* Velocidad constante */
    animation-iteration-count: infinite; /* Repetición infinita */
}

.animate-scaleUp { animation-name: scaleUp; }

/* Clases para controlar la duración de la animación */
.animate-duration-fast { animation-duration: 0.25s !important; }
.animate-duration-slow { animation-duration: 1s !important; }
.animate-duration-slower { animation-duration: 2s !important; }

/* Clases para controlar el retraso de la animación */
.animate-delay-100ms { animation-delay: 0.1s !important; }
.animate-delay-200ms { animation-delay: 0.2s !important; }
.animate-delay-500ms { animation-delay: 0.5s !important; }
.animate-delay-1s { animation-delay: 1s !important; }

/* Clase para repetición infinita */
.animate-infinite { animation-iteration-count: infinite !important; }

/* Animación específica para elementos que aparecen al cargar */
.fade-in-element {
    animation: fadeIn 0.6s ease-out forwards;
}
---
