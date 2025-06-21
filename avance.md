#index.html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pollería Montiel POS</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <!-- El enlace principal ahora usa data-link para el router -->
        <!--<h1><a href="#/" data-link>Pollería Montiel</a></h1>-->
        <nav class="icon-nav-mobile">
            <a href="#/venta" data-link class="nav-item">
                <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                <span class="nav-label">Venta</span>
            </a>
            <a href="#/productos" data-link class="nav-item">
                <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg></span>
                <span class="nav-label">Productos</span>
            </a>
            <a href="#/clientes" data-link class="nav-item">
                <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></span>
                <span class="nav-label">Clientes</span>
            </a>
            <a href="#/reportes" data-link class="nav-item">
                <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
                <span class="nav-label">Reportes</span>
            </a>
        </nav>
    </header>

    <!-- Contenedor principal donde se cargarán las vistas -->
    <main id="app-container"></main>

    <!-- Footer de la venta, inicialmente oculto -->
    <footer class="pos-footer" id="pos-footer" style="display: none;">
        <button class="btn btn-secondary" id="btn-save-sale">Guardar Venta</button>
        <!-- Enlace a una futura página de pago -->
        <a href="2-ticket.html" id="btn-cobrar" class="btn btn-primario">
            Cobrar <span class="fw-bold" id="total-amount">$0.00</span>
        </a>
    </footer>

    <!-- Modal de producto, siempre presente en el DOM -->
    <div id="product-modal-container" style="display: none;">
        <div class="product-modal-content">
            <div class="modal-header">
                <h3 id="modal-product-name"></h3>
                <button id="modal-close-btn" style="border:none; background:transparent; font-size:1.5em; cursor:pointer;">×</button>
            </div>
            <div class="modal-body" id="modal-body-content"></div>
            <div class="modal-footer">
                <button class="btn btn-secondary" id="modal-cancel-btn" style="background:var(--gris-elemento-claro); border-color:var(--gris-borde-input); color:var(--negro-azabache);">Cancelar</button>
                <button class="btn btn-primario" id="modal-add-to-cart-btn">Añadir al Pedido</button>
            </div>
        </div>
    </div>

    <!-- El script principal se carga como módulo -->
    <script type="module" src="js/app.js"></script>
</body>
</html>
----
#style.css
/* =========================================================================== */
/* 1. abstracts/_variables.css                                                 */
/* =========================================================================== */
:root {
    --blanco: #ffffff;
    --negro-azabache: #1C1C1E;
    --gris-fondo-claro: #F9F9F9;
    --gris-elemento-claro: #FFFFFF;
    --gris-borde-sutil: #E5E5EA;
    --gris-borde-input: #D1D1D6;
    --gris-hover-sutil: #F2F2F7;
    --gris-texto-secundario: #8A8A8E;
    --gris-texto-terciario: #AEAEB2;
    --gris-fondo-deshabilitado: #EFEFF4;
    --amarillo-polleria: #FFC107;
    --amarillo-polleria-hover: #E0A800;
    --amarillo-polleria-focus-ring: rgba(255, 193, 7, 0.3);
    --texto-sobre-amarillo: var(--negro-azabache);
    --verde-exito: #34A853;
    --verde-exito-fondo: #E6F5EA;
    --verde-accion: #4CAF50;
    --texto-sobre-verde: var(--blanco);
    --azul-info: #007AFF;
    --azul-info-fondo: #E5F2FF;
    --rojo-peligro-texto: #D93025;
    --rojo-peligro-fondo: #FCE8E6;
    --fuente-principal: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --tamano-fuente-base: 16px;
    --line-height-base: 1.6;
    --line-height-titulo: 1.25;
    --sombra-sm: 0 2px 4px rgba(0, 0, 0, 0.04);
    --sombra-md: 0 4px 12px rgba(0, 0, 0, 0.06);
    --transicion-suave: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    --radio-borde-m: 10px;
    --radio-borde-l: 16px;
    --radio-borde-pill: 50rem;
    --espacio-s: 0.5rem;
    --espacio-m: 1rem;
    --espacio-l: 1.5rem;
    --espacio-xl: 2rem;
}

/* Resto de estilos... (Reset, Tipografía, Botones, etc.) */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: var(--tamano-fuente-base); }
body { font-family: var(--fuente-principal); line-height: var(--line-height-base); background-color: var(--gris-fondo-claro); color: var(--negro-azabache); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
h1, h2, h3 { font-family: var(--fuente-principal); line-height: var(--line-height-titulo); color: var(--negro-azabache); margin-bottom: var(--espacio-m); font-weight: 700; }
a { text-decoration: none; color: var(--amarillo-polleria); }
header { background: var(--gris-elemento-claro); padding: var(--espacio-m) var(--espacio-m) var(--espacio-s) var(--espacio-m); text-align: center; border-bottom: 1px solid var(--gris-borde-sutil); position: sticky; top: 0; z-index: 1000; box-shadow: var(--sombra-sm); }
header h1 { font-size: 1.8em; margin-bottom: var(--espacio-s); }
header h1 a { color: var(--negro-azabache); }
.icon-nav-mobile { display: flex; justify-content: space-around; }
.nav-item { display: flex; flex-direction: column; align-items: center; text-decoration: none; color: var(--gris-texto-secundario); padding: var(--espacio-s); flex: 1; position: relative; }
.nav-icon svg { width: 24px; height: 24px; stroke-width: 1.8; color: var(--gris-texto-secundario); }
.nav-label { font-size: 0.7em; }
.nav-item.active-link .nav-icon svg, .nav-item.active-link .nav-label { color: var(--amarillo-polleria); font-weight: 600; }
.nav-item.active-link::after { content: ''; position: absolute; bottom: 0; left: 25%; width: 50%; height: 3px; background-color: var(--amarillo-polleria); border-radius: var(--radio-borde-pill); }
main { padding: var(--espacio-l); padding-bottom: 120px; }
.btn { display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 14px var(--espacio-l); font-size: 1em; border: 1px solid transparent; border-radius: var(--radio-borde-m); cursor: pointer; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: var(--espacio-m); transition: var(--transicion-suave); }
.btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--sombra-md); }
.btn-primario { background-color: var(--amarillo-polleria); color: var(--texto-sobre-amarillo); }
.btn-secondary { background-color: var(--gris-texto-secundario); color: var(--blanco); }
.card { background-color: var(--gris-elemento-claro); border-radius: var(--radio-borde-l); border: 1px solid var(--gris-borde-sutil); box-shadow: var(--sombra-sm); margin-bottom: var(--espacio-l); cursor: pointer; }
.card:hover { transform: translateY(-3px); box-shadow: var(--sombra-md); }
.card-body { padding: var(--espacio-l); }
.d-flex { display: flex; }
.justify-content-between { justify-content: space-between; }
.align-items-center { align-items: center; }
.fw-bold { font-weight: 700; }
.mb-0 { margin-bottom: 0; }
.text-right { text-align: right; }
.text-gris-secundario { color: var(--gris-texto-secundario); }
.text-negro-azabache { color: var(--negro-azabache); }
.text-success { color: var(--verde-exito); }
.badge { display: inline-block; padding: .35em .7em; font-size: .75em; font-weight: 700; line-height: 1; color: var(--blanco); text-align: center; white-space: nowrap; vertical-align: middle; border-radius: var(--radio-borde-m); text-transform: uppercase; }
.badge-amarillo-polleria { background-color: var(--amarillo-polleria); color: var(--texto-sobre-amarillo); }
.badge-azul { background-color: var(--azul-info); color: var(--blanco); }
.badge-gris { background-color: var(--gris-texto-secundario); color: var(--blanco); }
.form-group { margin-bottom: var(--espacio-l); }
.form-group label { display: block; margin-bottom: var(--espacio-s); font-weight: 600; font-size: 0.9em; }
.form-group input[type="search"], .form-group input[type="number"] { width: 100%; padding: 14px var(--espacio-m); border: 1px solid var(--gris-borde-input); border-radius: var(--radio-borde-m); font-size: 1em; background-color: var(--gris-elemento-claro); }
.search-results { max-height: 200px; overflow-y: auto; background: var(--blanco); border: 1px solid var(--gris-borde-sutil); border-top: none; border-radius: 0 0 var(--radio-borde-m) var(--radio-borde-m); position: absolute; width: 100%; z-index: 999; box-shadow: var(--sombra-md); }
.search-result-item { padding: var(--espacio-m); cursor: pointer; }
.search-result-item:hover { background: var(--gris-hover-sutil); }
.table-container { overflow-x: auto; margin-bottom: var(--espacio-xl); border-radius: var(--radio-borde-l); background-color: var(--gris-elemento-claro); box-shadow: var(--sombra-sm); }
table { width: 100%; border-collapse: separate; border-spacing: 0; }
th, td { padding: var(--espacio-m); text-align: left; font-size: .95em; vertical-align: middle; }
th { background-color: var(--gris-hover-sutil); color: var(--gris-texto-secundario); font-weight: 600; text-transform: uppercase; font-size: .8em; white-space: nowrap; border-bottom: 1px solid var(--gris-borde-sutil); }
td { color: var(--negro-azabache); border-bottom: 1px solid var(--gris-borde-sutil); }
tbody tr:last-child td { border-bottom: none; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: var(--espacio-s); margin-top: var(--espacio-l); }
.product-btn { padding: var(--espacio-s); font-size: .8em; height: 80px; display: flex; flex-direction: column; justify-content: center; align-items: center; line-height: 1.2; border: 1px solid var(--gris-borde-input); background: var(--blanco); border-radius: var(--radio-borde-m); cursor: pointer; transition: var(--transicion-suave); }
.product-btn:hover { transform: translateY(-3px); box-shadow: var(--sombra-md); }
.product-btn span { font-size: 1.4em; font-weight: 700; color: var(--amarillo-polleria); }
.pos-footer { position: fixed; bottom: 0; left: 0; right: 0; background: var(--gris-elemento-claro); padding: var(--espacio-m); border-top: 1px solid var(--gris-borde-sutil); box-shadow: 0 -4px 12px rgba(0,0,0,.06); display: flex; gap: var(--espacio-m); z-index: 1000; }
#product-modal-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 2000; padding: var(--espacio-m); }
.product-modal-content { background-color: var(--blanco); border-radius: var(--radio-borde-l); box-shadow: var(--sombra-md); width: 100%; max-width: 500px; max-height: 90vh; display: flex; flex-direction: column; }
.modal-header { padding: var(--espacio-m) var(--espacio-l); border-bottom: 1px solid var(--gris-borde-sutil); display: flex; justify-content: space-between; align-items: center; }
.modal-header h3 { margin: 0; }
.modal-body { padding: var(--espacio-l); overflow-y: auto; }
.modal-footer { padding: var(--espacio-m) var(--espacio-l); border-top: 1px solid var(--gris-borde-sutil); display: flex; gap: var(--espacio-m); }
.personalization-group { margin-bottom: var(--espacio-l); border: 1px solid var(--gris-borde-sutil); border-radius: var(--radio-borde-m); padding: var(--espacio-m); }
.personalization-group h4 { margin-top: 0; margin-bottom: var(--espacio-s); font-size: 1em; color: var(--gris-texto-secundario); font-weight: 600; }
.checkbox-label { display: flex; align-items: center; padding: var(--espacio-s); border-radius: var(--radio-borde-m); cursor: pointer; margin-bottom: var(--espacio-xs); }
.checkbox-label:hover { background-color: var(--gris-hover-sutil); }
.checkbox-label input { margin-right: var(--espacio-s); width: 1.2em; height: 1.2em; accent-color: var(--amarillo-polleria); }
---
#clientes.js
export const listaClientes = [
    { nombre: 'Juan Pérez', telefono: '5512345678', tipoPrecio: 'leal', badgeClass: 'badge-azul' },
    { nombre: 'Taquería El Güero', telefono: '5522334455', tipoPrecio: 'cocina', badgeClass: 'badge-gris' },
    { nombre: 'Ana García', telefono: '5587654321', tipoPrecio: 'publico', badgeClass: 'badge-amarillo-polleria' },
    { nombre: 'Super Pollo Feliz', rfc: 'SPF010101XYZ', tipoPrecio: 'mayoreo', badgeClass: 'badge-gris' }
];
---
#productos.js
// --- Archivo: polleria-montiel-pos/js/data/productos.js ---

export const catalogoProductos = [
  // --------------------------------------
  // PECHUGA Y DERIVADOS
  // --------------------------------------
  {
    nombre: 'Pechuga', id: 'pech', tipoVenta: 'peso',
    precios: { publico: 140, cocina: 125, aliado: 120, leal: 115, mayoreo: 140 }, // Mayoreo usa precio público por defecto
    personalizaciones: [
      // Grupo: Corte (Selección única)
      { nombre: 'Entera', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
      { nombre: 'Cortada en 2', id: 'c2', grupo: 'Corte', tipo: 'radio' },
      { nombre: 'Cortada en 3', id: 'c3', grupo: 'Corte', tipo: 'radio' },
      { nombre: 'Cortada en 4', id: 'c4', grupo: 'Corte', tipo: 'radio' },
      { nombre: 'Cortada en 6', id: 'c6', grupo: 'Corte', tipo: 'radio' },
      // Grupo: Extras (Selección múltiple)
      { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
      { nombre: 'Sin Hueso', id: 's/h', grupo: 'Extras', tipo: 'checkbox' },
      // Grupo: Preparación (Selección única)
      { nombre: 'En Pulpa', id: 'pp', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanada para Asar', id: 'asr', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanada para Freir', id: 'fr', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanada para Milanesa', id: 'mil', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Cortada en Fajitas', id: 'fj', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Cortada en Cubos', id: 'cub', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Molida', id: 'mol', grupo: 'Preparacion', tipo: 'radio' },
    ],
    subproductos: [
      {
        nombre: 'Pulpa de Pechuga', id: 'pp_pech', tipoVenta: 'peso', // ID diferente para evitar conflicto con personalización
        precios: { publico: 185, cocina: 175, leal: 185, aliado: 185, mayoreo: 150 }, // Leal y Aliado usan precio público por defecto
        personalizaciones: [
          { nombre: 'Entera', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
          { nombre: 'Aplanada para Asar', id: 'asr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanada para Freir', id: 'fr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanada para Milanesa', id: 'mil', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Cortada en Fajitas', id: 'fj', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Cortada en Cubos', id: 'cub', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Molida', id: 'mol', grupo: 'Preparacion', tipo: 'radio' },
        ],
      },
    ],
  },

  // --------------------------------------
  // ALAS
  // --------------------------------------
  {
    nombre: 'Ala', id: 'al', tipoVenta: 'peso',
    precios: {
      publico: 130, cocina: 120, leal: 115, aliado: 130, mayoreo: 115, // Aliado usa precio público por defecto
      promociones: [{ tipo: 'publico', desde: 10, precio: 120 }] // Se cambió a 'promociones' para consistencia
    },
    personalizaciones: [
      { nombre: 'Cortada en 2', id: 'c2', grupo: 'Corte', tipo: 'radio' },
      { nombre: 'Cortada en 3', id: 'c3', grupo: 'Corte', tipo: 'radio' },
    ],
  },

  // --------------------------------------
  // RETAZO Y DERIVADOS
  // --------------------------------------
  {
    nombre: 'Retazo', id: 'rtz', tipoVenta: 'peso',
    precios: {
      publico: 45, cocina: 45, leal: 45, aliado: 45, mayoreo: 45, // Usan precio público por defecto
      promociones: [{ desde: 3, precio: 33.33 }, { desde: 5, precio: 20 }]
    },
    personalizaciones: [
      { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
      { nombre: 'Cortado', id: 'c', grupo: 'Extras', tipo: 'checkbox' },
    ],
    variantes: [ // Se usa 'variantes' para Retazo con Ala
      {
        nombre: 'Retazo con Ala', id: 'rtz_al', tipoVenta: 'peso',
        precios: { publico: 55, cocina: 55, leal: 55, aliado: 55, mayoreo: 55 }, // Usan precio público por defecto
        personalizaciones: [
          { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
          { nombre: 'Cortado', id: 'c', grupo: 'Extras', tipo: 'checkbox' },
        ],
      },
    ],
    subproductos: [
      {
        nombre: 'Huacal', id: 'h', tipoVenta: 'peso',
        precios: { publico: 45, cocina: 45, leal: 45, aliado: 45, mayoreo: 45 },
        personalizaciones: [
          { nombre: 'Entero', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
          { nombre: 'Cortado', id: 'c', grupo: 'Corte', tipo: 'radio' },
          { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
        ],
      },
      {
        nombre: 'Cadera', id: 'cd', tipoVenta: 'peso',
        precios: { publico: 45, cocina: 45, leal: 45, aliado: 45, mayoreo: 45 },
        personalizaciones: [
          { nombre: 'Entera', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
          { nombre: 'Cortada', id: 'c', grupo: 'Corte', tipo: 'radio' },
          { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
        ],
      },
    ]
  },

  // --------------------------------------
  // PERNILES Y DERIVADOS
  // --------------------------------------
  {
    nombre: 'Perniles', id: 'pm', tipoVenta: 'peso',
    precios: { publico: 100, cocina: 85, aliado: 85, leal: 100, mayoreo: 100 }, // Leal y Mayoreo usan precio público por defecto
    personalizaciones: [
      { nombre: 'Enteras', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
      { nombre: 'Cortadas', id: 'c', grupo: 'Corte', tipo: 'radio' },
      // Grupo: Extras (Selección múltiple)
      { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
      { nombre: 'Sin Hueso', id: 's/h', grupo: 'Extras', tipo: 'checkbox' },
      // Grupo: Preparación (Selección única)
      { nombre: 'En Pulpa', id: 'pp', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanadas para Asar', id: 'asr', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanadas para Freir', id: 'fr', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Aplanadas para Milanesa', id: 'mil', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Cortadas en Fajitas', id: 'fj', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Cortadas en Cubos', id: 'cub', grupo: 'Preparacion', tipo: 'radio' },
      { nombre: 'Molida', id: 'mol', grupo: 'Preparacion', tipo: 'radio' },
    ],
    subproductos: [
      {
        nombre: 'Pulpa de Perniles', id: 'pp_pm', tipoVenta: 'peso',
        precios: { publico: 125, cocina: 125, leal: 125, aliado: 125, mayoreo: 125 },
        personalizaciones: [
          { nombre: 'Molida', id: 'mol', grupo: 'Preparacion', tipo: 'radio' }
        ]
      },
    ],
    especiales: [ // Se usa 'especiales' para Pierna y Muslo
      {
        nombre: 'Pierna', id: 'pg', tipoVenta: 'peso',
        precios: { publico: 105, cocina: 105, leal: 105, aliado: 105, mayoreo: 105 },
        personalizaciones: [
          { nombre: 'Entera', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
          { nombre: 'Cortada', id: 'c', grupo: 'Corte', tipo: 'radio' },
          { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
          { nombre: 'Sin Hueso', id: 's/h', grupo: 'Extras', tipo: 'checkbox' },
          { nombre: 'En Pulpa', id: 'pp', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanada para Asar', id: 'asr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanada para Freir', id: 'fr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanada para Milanesa', id: 'mil', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Molida', id: 'mol', grupo: 'Preparacion', tipo: 'radio' },
        ],
      },
      {
        nombre: 'Muslo', id: 'msl', tipoVenta: 'peso',
        precios: { publico: 100, cocina: 100, leal: 100, aliado: 100, mayoreo: 100 },
        personalizaciones: [
          { nombre: 'Entero', id: 'e', grupo: 'Corte', tipo: 'radio', default: true },
          { nombre: 'Cortado', id: 'c', grupo: 'Corte', tipo: 'radio' },
          { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
          { nombre: 'Sin Hueso', id: 's/h', grupo: 'Extras', tipo: 'checkbox' },
          { nombre: 'En Pulpa', id: 'pp', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanado para Asar', id: 'asr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanado para Freir', id: 'fr', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Aplanado para Milanesa', id: 'mil', grupo: 'Preparacion', tipo: 'radio' },
          { nombre: 'Molido', id: 'mol', grupo: 'Preparacion', tipo: 'radio' },
        ],
      },
    ],
  },

  // --------------------------------------
  // PATAS
  // --------------------------------------
  {
    nombre: 'Patas', id: 'pt', tipoVenta: 'peso',
    precios: { publico: 65, cocina: 65, leal: 65, aliado: 65, mayoreo: 65 }, // Usan precio público por defecto
    personalizaciones: [], // No tiene personalizaciones
  },

  // --------------------------------------
  // MOLLEJA CON HÍGADO Y DERIVADOS
  // --------------------------------------
  {
    nombre: 'Molleja con Hígado', id: 'mhg', tipoVenta: 'peso',
    precios: {
      publico: 40, cocina: 40, leal: 40, aliado: 40, mayoreo: 40, // Usan precio público por defecto
      promociones: [{ desde: 2, precio: 35 }]
    },
    personalizaciones: [
      { nombre: 'Sin grasa', id: 's/g', grupo: 'Extras', tipo: 'checkbox' },
    ],
    especiales: [ // Se usa 'especiales' para Hígado y Molleja
      {
        nombre: 'Hígado', id: 'hg', tipoVenta: 'peso',
        precios: { publico: 35, cocina: 35, leal: 35, aliado: 35, mayoreo: 35 },
        personalizaciones: [], // No tiene personalizaciones
      },
      {
        nombre: 'Molleja', id: 'mlj', tipoVenta: 'peso',
        precios: { publico: 75, cocina: 75, leal: 75, aliado: 75, mayoreo: 75 },
        personalizaciones: [
          { nombre: 'Sin grasa', id: 's/g', grupo: 'Extras', tipo: 'checkbox' },
        ],
      },
    ],
  },

  // --------------------------------------
  // POLLO ENTERO Y DERIVADOS
  // --------------------------------------
  {
    nombre: 'Pollo Entero', id: 'pe', tipoVenta: 'peso',
    precios: {
      publico: 90, cocina: 90, leal: 90, aliado: 90, mayoreo: 90, // Usan precio público por defecto
      promociones: [{ tipo: 'peso', desde: 8, precio: 82 }] // Se especificó 'tipo: peso' para 8kg
    },
    personalizaciones: [
      { nombre: 'Entero', id: 'e', grupo: 'Presentacion', tipo: 'radio', default: true },
      { nombre: 'Destazado, pechuga cortada en 2', id: 'dst2', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga cortada en 4', id: 'dst4', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga cortada en 6', id: 'dst6', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga para asar', id: 'dst_asr', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga para freir', id: 'dst_fr', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga para milanesa', id: 'dst_mil', grupo: 'Presentacion', tipo: 'radio' },
      { nombre: 'Destazado, pechuga para fajitas', id: 'dst_fj', grupo: 'Presentacion', tipo: 'radio' },
    ],
    variantes: [ // Se usa 'variantes' para Canal
      {
        nombre: 'Canal', id: 'cnl', tipoVenta: 'peso',
        precios: { publico: 75, cocina: 75, leal: 75, aliado: 75, mayoreo: 75 }, // Usan precio público por defecto
        personalizaciones: [], // No tiene personalizaciones
      }
    ]
  },

  // --------------------------------------
  // SURTIDA
  // --------------------------------------
  {
    nombre: 'Surtida', id: 'srt', tipoVenta: 'peso',
    precios: {
      publico: 85, cocina: 74, leal: 85, aliado: 85, mayoreo: 85, // Leal, Aliado y Mayoreo usan precio público por defecto
      promociones: [{ desde: 2, precio: 80 }, { desde: 3, precio: 70 }]
    },
    personalizaciones: [
      { nombre: 'Con Huacal', id: '_h', grupo: 'Composicion', tipo: 'checkbox' },
      { nombre: 'Con Cadera', id: '_cd', grupo: 'Composicion', tipo: 'checkbox' },
      { nombre: 'Sin piel', id: 's/p', grupo: 'Extras', tipo: 'checkbox' },
    ]
  },

  // --------------------------------------
  // DESPERDICIO
  // --------------------------------------
  {
    nombre: 'Desperdicio', id: 'dsp', tipoVenta: 'unidad', // Asumo 'unidad' o 'paquete' ya que los precios son fijos y por tipo
    // El precio de Desperdicio es especial, se define por personalización.
    // Aquí se omite el campo 'precios' a nivel de producto principal
    // y se manejan los precios en cada personalización si es necesario
    // o se procesa la lógica de precio en la aplicación.
    // Para simplificar, lo dejo como un objeto de precios base y la lógica
    // de selección de precio se haría en la interfaz/código que usa estos datos.
    precios: { // Mantenemos el formato para consistencia, pero la lógica de uso es particular
      surtido: 15,
      solo_huesos: 20,
      cabezas: 20,
      piezas_lastimadas: 25,
      // Los otros tipos de precio (Cocina, Leal, Aliado, Mayoreo) se usarían del tipo "Surtido" si no se especifica.
      // O se pueden omitir si el "Desperdicio" solo tiene precios fijos por su tipo.
      publico: 15, // Se asigna un precio público por defecto, el "Surtido"
      cocina: 15,
      leal: 15,
      aliado: 15,
      mayoreo: 15,
    },
    personalizaciones: [
      { nombre: 'Surtido', id: 'surtido', grupo: 'Tipo', tipo: 'radio', default: true },
      { nombre: 'Solo Huesos', id: 'solo_huesos', grupo: 'Tipo', tipo: 'radio' },
      { nombre: 'Cabezas', id: 'cabezas', grupo: 'Tipo', tipo: 'radio' },
      { nombre: 'Piezas Lastimadas', id: 'piezas_lastimadas', grupo: 'Tipo', tipo: 'radio' },
    ]
  }
];
---
#app.js
// --- Archivo: polleria-montiel-pos/js/app.js (Refactorizado) ---

// Importar datos externos. Asumimos que existen y están bien estructurados.
// Asegúrate de que 'data/productos.js' y 'data/clientes.js' existan en la misma estructura de directorios.
import { catalogoProductos } from './data/productos.js';
import { listaClientes } from './data/clientes.js';

// --- Constantes para mejorar la legibilidad y mantenibilidad ---
const DEFAULT_CUSTOMER = { nombre: 'Público en General', tipoPrecio: 'publico', badgeClass: 'badge-amarillo-polleria' };
const MIN_CUSTOMER_SEARCH_LENGTH = 2; // Mínimo de caracteres para iniciar la búsqueda de clientes.

/**
 * Clase principal para la aplicación de Punto de Venta (POS) de Pollería Montiel.
 * Encapsula la lógica, el estado y las interacciones de la UI.
 */
class PosApp {
    /**
     * @private
     * @property {object} #state - Estado interno de la aplicación.
     * @property {object} #state.clienteActual - Información del cliente actualmente seleccionado.
     * @property {Array<object>} #state.carrito - Elementos en el carrito de compras.
     * @property {object|null} #state.productoEnModal - Producto seleccionado para el modal, o null si no hay ninguno.
     * @property {string|null} #state.currentView - Nombre de la vista actual activa, o null si ninguna.
     */
    #state = {
        clienteActual: { ...DEFAULT_CUSTOMER }, // Copia para asegurar independencia del objeto DEFAULT_CUSTOMER
        carrito: [],
        productoEnModal: null,
        currentView: null,
    };

    /**
     * @private
     * @property {object} #data - Datos estáticos de la aplicación (productos, clientes).
     * @property {Map<string, object>} #data.productos - Mapa de productos por ID para acceso eficiente y rápido.
     * @property {Array<object>} #data.clientes - Lista completa de todos los clientes.
     */
    #data = {
        productos: new Map(), // Usar un Map para productos facilita la búsqueda por ID.
        clientes: listaClientes,
    };

    /**
     * @private
     * @property {object} #ui - Referencias a elementos del DOM cacheados para evitar búsquedas repetidas.
     */
    #ui = {};

    /**
     * Constructor de la clase PosApp.
     * Se ejecuta al crear una nueva instancia de la aplicación.
     */
    constructor() {
        // Carga los productos desde el catálogo en un mapa para acceso eficiente por ID.
        catalogoProductos.forEach(p => this.#data.productos.set(p.id, p));
        this.#cacheGlobalUI();    // Cacha los elementos UI que están siempre presentes.
        this.#bindGlobalEvents(); // Asigna los eventos a esos elementos globales.
        this.#router();           // Inicia el proceso de carga de la primera vista.
    }

    // --- 1. INICIALIZACIÓN Y CACHEO DE ELEMENTOS UI ---

    /**
     * Cacha las referencias a los elementos UI globales que están siempre presentes en el DOM.
     * Se llama una sola vez al inicio de la aplicación.
     * @private
     */
    #cacheGlobalUI() {
        this.#ui = {
            appContainer: document.getElementById('app-container'),
            posFooter: document.getElementById('pos-footer'),
            modalContainer: document.getElementById('product-modal-container'),
            modalTitle: document.getElementById('modal-product-name'),
            modalBody: document.getElementById('modal-body-content'),
            modalCloseBtn: document.getElementById('modal-close-btn'),
            modalCancelBtn: document.getElementById('modal-cancel-btn'),
            modalAddToCartBtn: document.getElementById('modal-add-to-cart-btn'),
            // Crea y añade un elemento de caja de mensajes al DOM si no existe, para reemplazar `alert()`.
            messageBox: document.getElementById('message-box') || this.#createMessageBox(),
        };
    }

    /**
     * Crea un elemento DIV para mostrar mensajes al usuario (reemplazo de `alert()`).
     * Lo inserta en el `body` del documento.
     * @returns {HTMLElement} El elemento DIV creado para la caja de mensajes.
     * @private
     */
    #createMessageBox() {
        const messageBox = document.createElement('div');
        messageBox.id = 'message-box';
        // Estilos básicos para la caja de mensajes. Se pueden refinar con clases CSS.
        messageBox.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333; /* Color de fondo por defecto */
            color: white; /* Color del texto por defecto */
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            display: none; /* Oculto por defecto */
            opacity: 0; /* Opacidad para la transición */
            transition: opacity 0.3s ease-in-out;
            text-align: center;
            min-width: 250px;
            font-family: 'Inter', sans-serif; /* Usar Inter como se indica en las instrucciones */
        `;
        document.body.appendChild(messageBox);
        return messageBox;
    }

    /**
     * Muestra un mensaje al usuario en la caja de mensajes personalizada.
     * El mensaje se desvanecerá automáticamente después de un tiempo.
     * @param {string} message - El texto del mensaje a mostrar.
     * @param {'info'|'success'|'error'} type - El tipo de mensaje para aplicar estilos (info, success, error).
     * @private
     */
    #showMessage(message, type = 'info') {
        const msgBox = this.#ui.messageBox;
        if (!msgBox) return; // Si la caja de mensajes no existe, no hacemos nada.

        msgBox.textContent = message;
        // Limpiar clases de tipo previas y añadir la actual para estilizado dinámico.
        msgBox.className = ''; // Resetea las clases.
        msgBox.classList.add('message-box'); // Clase base (puedes definirla en tu CSS).
        msgBox.classList.add(`message-box-${type}`); // Clase específica para el tipo (ej: message-box-error).

        // Estilos inline básicos según el tipo de mensaje. Preferiblemente, define estos en CSS.
        if (type === 'error') {
            msgBox.style.backgroundColor = '#dc3545'; // Rojo
        } else if (type === 'success') {
            msgBox.style.backgroundColor = '#28a745'; // Verde
        } else {
            msgBox.style.backgroundColor = '#007bff'; // Azul (info)
        }
        msgBox.style.color = 'white'; // Color del texto claro.

        msgBox.style.display = 'block'; // Muestra el elemento.
        // Pequeño retraso para permitir que 'display: block' se aplique antes de iniciar la transición de opacidad.
        setTimeout(() => msgBox.style.opacity = '1', 10);

        // Ocultar el mensaje después de 3 segundos.
        setTimeout(() => {
            msgBox.style.opacity = '0';
            // Espera a que termine la transición de opacidad antes de cambiar `display`.
            setTimeout(() => msgBox.style.display = 'none', 300);
        }, 3000); // Duración que el mensaje permanece visible.
    }

    /**
     * Cacha las referencias a los elementos UI específicos de la vista de Venta.
     * Estos elementos solo existen después de que 'venta.html' ha sido cargado en el DOM.
     * Se llama cada vez que la vista de venta se carga.
     * @private
     */
    #cacheVentaUI() {
        // Asignación condicional para evitar errores si el elemento no existe en un contexto diferente.
        this.#ui.productGrid = document.getElementById('product-grid-container');
        this.#ui.cartTableBody = document.getElementById('ticket-items-body');
        this.#ui.noItemsRow = document.getElementById('no-items-row'); // Referencia al nodo DOM directamente
        this.#ui.totalAmount = document.getElementById('total-amount');
        this.#ui.customerSearchInput = document.getElementById('customer-search');
        this.#ui.searchResultsContainer = document.getElementById('search-results-container');
        this.#ui.selectedCustomerDiv = document.getElementById('selected-customer');
        this.#ui.customerNameP = document.getElementById('customer-name');
        this.#ui.clientTypeBadge = document.getElementById('client-type-badge');
        this.#ui.clearCustomerBtn = document.getElementById('clear-customer');
    }

    // --- 2. ROUTING Y CARGA DE VISTAS ---

    /**
     * Maneja el enrutamiento de la aplicación basado en el hash de la URL (`#`).
     * Carga la vista HTML correspondiente dinámicamente.
     * @private
     */
    async #router() {
        // Mapeo de rutas de hash a nombres de archivos de vista.
        const routes = {
            '/': 'dashboard',
            '/venta': 'venta',
            '/productos': 'dashboard', // Redirige a dashboard si estas vistas no están implementadas
            '/clientes': 'dashboard',
            '/reportes': 'dashboard',
        };
        // Obtiene el hash actual de la URL (ej. "#/venta" -> "/venta").
        const path = location.hash.slice(1) || '/';
        // Determina el nombre de la vista a cargar, usando 'dashboard' como predeterminado.
        const viewName = routes[path] || 'dashboard';
        await this.#loadView(viewName); // Carga la vista.
    }

    /**
     * Carga el contenido HTML de una vista desde su archivo y lo inserta en el contenedor principal.
     * También maneja la lógica que debe ejecutarse después de cargar la vista.
     * @param {string} viewName - El nombre de la vista (ej. 'venta', 'dashboard').
     * @private
     */
    async #loadView(viewName) {
        // Optimización: Evita recargar la misma vista si ya está activa para mejorar rendimiento.
        if (this.#state.currentView === viewName) return;
        this.#state.currentView = viewName; // Actualiza la vista actual en el estado.

        try {
            // Intenta obtener el HTML de la vista desde el servidor.
            const response = await fetch(`./views/${viewName}.html`);
            if (!response.ok) {
                // Si la respuesta no es exitosa (ej. 404), lanza un error.
                throw new Error(`Vista no encontrada: ${viewName} (Estado HTTP: ${response.status})`);
            }

            // Inserta el HTML de la vista en el contenedor principal de la aplicación.
            this.#ui.appContainer.innerHTML = await response.text();
            // Ajusta la visibilidad del footer inferior de la POS según la vista actual.
            this.#ui.posFooter.style.display = (viewName === 'venta') ? 'flex' : 'none';

            // Ejecuta la lógica post-carga una vez que el HTML está en el DOM.
            this.#afterViewLoad(viewName);
        } catch (error) {
            console.error('Error al cargar la vista:', error);
            // Muestra un mensaje de error amigable en la UI si falla la carga.
            this.#ui.appContainer.innerHTML = `
                <div class="text-center" style="padding: var(--espacio-xl);">
                    <p class="text-danger">Error al cargar la página. Por favor, inténtelo de nuevo.</p>
                    <p class="text-muted">Detalles: ${error.message}</p>
                </div>
            `;
            this.#showMessage(`Error de navegación: ${error.message}`, 'error');
        }
    }

    // --- 3. LÓGICA POST-CARGA DE VISTA ---

    /**
     * Ejecuta la lógica necesaria inmediatamente después de que una vista se ha cargado
     * y su HTML ha sido insertado en el DOM.
     * @param {string} viewName - El nombre de la vista que se acaba de cargar.
     * @private
     */
    #afterViewLoad(viewName) {
        this.#updateActiveNav(); // Actualiza el enlace de navegación activo en el menú.
        // Si la vista recién cargada es 'venta', preparamos todo lo necesario para ella.
        if (viewName === 'venta') {
            this.#cacheVentaUI();    // Cacha los elementos específicos de la vista de venta.
            this.#bindVentaEvents(); // Asigna los eventos a esos elementos de la vista de venta.
            this.#renderVentaView(); // Renderiza el contenido inicial (productos, carrito, info cliente).
        }
    }

    // --- ASIGNACIÓN DE EVENTOS ---

    /**
     * Asigna eventos a los elementos UI globales (aquellos que persisten entre vistas).
     * Se llama una sola vez al inicio.
     * @private
     */
    #bindGlobalEvents() {
        // Escucha cambios en el hash de la URL para activar el router.
        window.addEventListener('hashchange', () => this.#router());

        // Delega los eventos de clic en enlaces con `data-link` al body para el enrutamiento SPA.
        document.body.addEventListener('click', e => {
            const link = e.target.closest('[data-link]'); // Encuentra el enlace más cercano con data-link.
            if (link) {
                e.preventDefault(); // Previene la navegación estándar del navegador.
                // Actualiza el hash de la URL, lo que a su vez dispara el evento 'hashchange' y el router.
                location.hash = new URL(link.href).hash;
            }
        });

        // Eventos para el modal de producto.
        this.#ui.modalCloseBtn?.addEventListener('click', () => this.#closeModal());
        this.#ui.modalCancelBtn?.addEventListener('click', () => this.#closeModal());
        this.#ui.modalAddToCartBtn?.addEventListener('click', () => this.#handleAddToCart());
        // Cerrar el modal al hacer clic en el área oscura fuera del contenido del modal.
        this.#ui.modalContainer?.addEventListener('click', e => {
            if (e.target === this.#ui.modalContainer) this.#closeModal();
        });
    }

    /**
     * Asigna eventos a los elementos UI específicos de la vista de Venta.
     * Se llama solo después de que la vista de venta ha sido cargada y sus elementos están en el DOM.
     * @private
     */
    #bindVentaEvents() {
        // Se utilizan operadores de encadenamiento opcional (`?.`) para mayor seguridad.
        // Maneja clics en los botones de producto en la cuadrícula para abrir el modal.
        this.#ui.productGrid?.addEventListener('click', e => {
            const productBtn = e.target.closest('.product-btn');
            if (productBtn) {
                this.#handleProductSelection(productBtn.dataset.productId);
            }
        });

        // Maneja la entrada de texto en el campo de búsqueda de clientes.
        this.#ui.customerSearchInput?.addEventListener('input', e => this.#handleCustomerSearch(e.target.value));

        // Maneja el clic en el botón para limpiar la selección del cliente.
        this.#ui.clearCustomerBtn?.addEventListener('click', () => this.#clearCustomer());
    }

    // --- 4. RENDERIZADO (DIBUJADO DE CONTENIDO) ---

    /**
     * Renderiza el contenido inicial de la vista de Venta:
     * el catálogo de productos, el carrito y la información del cliente.
     * @private
     */
    #renderVentaView() {
        this.#renderCatalog();
        this.#renderCart();
        this.#renderCustomerInfo();
    }

    /**
     * Actualiza la clase 'active-link' en los elementos de navegación
     * para resaltar la vista actual.
     * @private
     */
    #updateActiveNav() {
        const currentHash = location.hash || '#/'; // Obtiene el hash actual o usa '/' como predeterminado.
        // Itera sobre todos los enlaces de navegación y añade/quita la clase 'active-link' según corresponda.
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === currentHash);
        });
    }

    /**
     * Renderiza el catálogo de productos en la cuadrícula de productos de la vista de venta.
     * @private
     */
    #renderCatalog() {
        if (!this.#ui.productGrid) return; // Guarda de seguridad: Asegura que el elemento exista.

        // Mapea cada producto a un botón HTML y los une en una sola cadena.
        this.#ui.productGrid.innerHTML = [...this.#data.productos.values()].map(producto => `
            <button class="product-btn" data-product-id="${producto.id}">
                ${producto.nombre}
                <span>${producto.id.toUpperCase()}</span>
            </button>
        `).join('');
    }

    /**
     * Renderiza el contenido del carrito de compras, actualiza la tabla de ítems
     * y el monto total.
     * @private
     */
    #renderCart() {
        if (!this.#ui.cartTableBody || !this.#ui.totalAmount) return; // Guarda de seguridad.

        // Calcula el total general sumando los subtotales de cada ítem en el carrito.
        const totalGeneral = this.#state.carrito.reduce((sum, item) => sum + item.subtotal, 0);
        this.#ui.totalAmount.textContent = `$${totalGeneral.toFixed(2)}`; // Muestra el total formateado.

        if (this.#state.carrito.length === 0) {
            // Si el carrito está vacío, vacía el cuerpo de la tabla y añade la fila de "no ítems".
            this.#ui.cartTableBody.innerHTML = ''; // Limpia cualquier contenido previo.
            // Es crucial que `this.#ui.noItemsRow` sea una referencia a un nodo DOM existente.
            if (this.#ui.noItemsRow) {
                 this.#ui.cartTableBody.appendChild(this.#ui.noItemsRow);
            } else {
                 // Fallback si `noItemsRow` no se pudo cachear (ej. si el ID no existe en el HTML).
                 this.#ui.cartTableBody.innerHTML = `<tr><td colspan="2" class="text-center text-muted" id="no-items-row">No hay productos en el carrito.</td></tr>`;
                 // También intentar re-cachear si se crea dinámicamente aquí
                 this.#ui.noItemsRow = document.getElementById('no-items-row');
            }
            return;
        }

        // Si hay ítems en el carrito, los mapea a filas HTML de la tabla.
        this.#ui.cartTableBody.innerHTML = this.#state.carrito.map(item => {
            // Concatena los nombres de las personalizaciones para mostrarlas.
            const personalizacionesTexto = item.personalizaciones.map(p => p.nombre).join(', ');
            return `
                <tr>
                    <td>
                        <strong class="d-block">${item.productoNombre}</strong>
                        <small class="text-gris-secundario">${item.cantidad.toFixed(2)} ${item.tipoVenta} @ $${item.precioUnitario.toFixed(2)}/${item.tipoVenta}</small><br>
                        ${personalizacionesTexto ? `<small class="text-success">${personalizacionesTexto}</small>` : ''}
                    </td>
                    <td style="text-align: right;" class="fw-bold">$${item.subtotal.toFixed(2)}</td>
                </tr>
            `;
        }).join(''); // Une todas las filas HTML.
    }

    /**
     * Renderiza la información del cliente actual en la interfaz de usuario,
     * mostrando su nombre y tipo de precio. También alterna entre el input de búsqueda
     * y el div de cliente seleccionado.
     * @private
     */
    #renderCustomerInfo() {
        // Guardas de seguridad para asegurar que los elementos UI existen.
        if (!this.#ui.customerNameP || !this.#ui.clientTypeBadge || !this.#ui.selectedCustomerDiv || !this.#ui.customerSearchInput) {
            return;
        }

        const { nombre, tipoPrecio, badgeClass } = this.#state.clienteActual;
        this.#ui.customerNameP.textContent = nombre;
        this.#ui.clientTypeBadge.textContent = tipoPrecio.toUpperCase();
        // Actualiza todas las clases del badge para aplicar el estilo correcto.
        this.#ui.clientTypeBadge.className = `badge ${badgeClass}`;

        // Lógica para mostrar/ocultar el input de búsqueda de cliente o el cliente seleccionado.
        if (nombre !== DEFAULT_CUSTOMER.nombre) {
            this.#ui.selectedCustomerDiv.style.display = 'flex'; // Muestra el div del cliente seleccionado.
            this.#ui.customerSearchInput.style.display = 'none'; // Oculta el input de búsqueda.
        } else {
            this.#ui.selectedCustomerDiv.style.display = 'none'; // Oculta el div del cliente seleccionado.
            this.#ui.customerSearchInput.style.display = 'block'; // Muestra el input de búsqueda.
            this.#ui.customerSearchInput.value = ''; // Limpia el valor del input de búsqueda.
        }
    }

    // --- LÓGICA DE NEGOCIO (MODAL, CARRITO, PRECIOS, CLIENTES) ---

    /**
     * Renderiza el contenido dentro del modal de producto, permitiendo al usuario
     * seleccionar cantidad, subproductos y personalizaciones.
     * @param {object} producto - El objeto producto (o subproducto) a mostrar en el modal.
     * @param {string|null} [productoPadreId=null] - El ID del producto padre si el producto actual es un subproducto.
     * @private
     */
    #renderModalContent(producto, productoPadreId = null) {
        // Clona el producto y guarda su referencia en el estado del modal, incluyendo el ID del padre si aplica.
        this.#state.productoEnModal = { ...producto, productoPadreId: productoPadreId || producto.id };

        const precioCliente = this.#getPrecioCliente(this.#state.productoEnModal);
        const tipoVentaTexto = producto.tipoVenta === 'peso' ? 'kg' : 'pz';
        this.#ui.modalTitle.textContent = producto.nombre;

        // --- Generación de HTML para subproductos (variantes/especiales) ---
        const subproductosHTML = (producto.subproductos || []).map(sub =>
            `<button class="btn btn-secondary subproduct-button" data-subproduct-id="${sub.id}" style="margin-bottom: var(--espacio-s); width: 100%; background: #f0f0f0; color: #333; border-color: #ddd;">
                ${sub.nombre}
            </button>`
        ).join('');
        const subproductosGroupHTML = subproductosHTML ? `<div class="personalization-group"><h4>Variantes / Especiales</h4>${subproductosHTML}</div>` : '';

        // --- Agrupación de personalizaciones por su grupo (ej. "Cocción", "Guarniciones") ---
        const gruposPersonalizaciones = (producto.personalizaciones || []).reduce((acc, pers) => {
            (acc[pers.grupo] = acc[pers.grupo] || []).push(pers); return acc;
        }, {});

        // --- Generación de HTML para los grupos de personalizaciones (checkboxes/radios) ---
        const personalizacionesHTML = Object.entries(gruposPersonalizaciones).map(([nombreGrupo, pers]) => `
            <div class="personalization-group"><h4>${nombreGrupo}</h4>
                ${pers.map(p => `
                    <label class="checkbox-label">
                        <input type="${p.tipo}" name="pers_${nombreGrupo.replace(/\s+/g, '_')}" value="${p.id}" ${p.default ? 'checked' : ''}>
                        ${p.nombre}
                    </label>
                `).join('')}
            </div>`
        ).join('');

        // Establece todo el contenido HTML del cuerpo del modal.
        this.#ui.modalBody.innerHTML = `
            ${subproductosGroupHTML}
            <div class="form-group">
                <label for="modal-quantity">Cantidad (${tipoVentaTexto})</label>
                <input type="number" id="modal-quantity" value="1" step="${producto.tipoVenta === 'peso' ? 0.1 : 1}" min="0">
            </div>
            <p>Precio: <strong class="fw-bold">$${typeof precioCliente === 'number' ? precioCliente.toFixed(2) : 'Según selección'} / ${tipoVentaTexto}</strong></p>
            ${personalizacionesHTML}
        `;

        // Asigna eventos de clic a los botones de subproducto recién creados en el modal.
        this.#ui.modalBody.querySelectorAll('.subproduct-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const subId = e.currentTarget.dataset.subproductId;
                this.#handleSubproductSelection(subId); // Maneja la selección del subproducto.
            });
        });

        this.#ui.modalContainer.style.display = 'flex'; // Muestra el modal haciendo visible su contenedor.
        document.getElementById('modal-quantity')?.focus(); // Intenta enfocar el campo de cantidad.
    }

    /**
     * Maneja la selección de un producto principal desde la cuadrícula de productos.
     * Abre el modal de configuración de producto para el producto seleccionado.
     * @param {string} productId - El ID del producto seleccionado.
     * @private
     */
    #handleProductSelection(productId) {
        const producto = this.#data.productos.get(productId);
        if (producto) {
            this.#renderModalContent(producto); // Renderiza el modal con los detalles del producto.
        } else {
            this.#showMessage('Error: Producto no encontrado en el catálogo.', 'error');
            console.error(`Producto con ID ${productId} no encontrado.`);
        }
    }

    /**
     * Maneja la selección de un subproducto dentro del modal.
     * Esto recarga el modal con los detalles del subproducto seleccionado.
     * @param {string} subproductId - El ID del subproducto seleccionado.
     * @private
     */
    #handleSubproductSelection(subproductId) {
        // Asegura que hay un producto en el modal y que tiene un producto padre asociado.
        const productoPadre = this.#data.productos.get(this.#state.productoEnModal?.productoPadreId);
        if (!productoPadre || !productoPadre.subproductos) {
            this.#showMessage('Error: No se pudo encontrar el producto padre para el subproducto.', 'error');
            return;
        }
        // Busca el subproducto dentro de la lista de subproductos del padre.
        const subproducto = productoPadre.subproductos.find(s => s.id === subproductId);
        if (subproducto) {
            this.#renderModalContent(subproducto, productoPadre.id); // Recarga el modal con el subproducto.
        } else {
            this.#showMessage('Error: Subproducto no encontrado.', 'error');
            console.error(`Subproducto con ID ${subproductId} no encontrado en el producto padre.`);
        }
    }

    /**
     * Agrega el producto configurado en el modal al carrito de compras.
     * Realiza validaciones de cantidad y precio antes de añadir.
     * @private
     */
    #handleAddToCart() {
        const producto = this.#state.productoEnModal;
        if (!producto) {
            this.#showMessage('No hay producto seleccionado en el modal para añadir.', 'error');
            return;
        }

        const quantityInput = document.getElementById('modal-quantity');
        if (!quantityInput) {
            this.#showMessage('Error: No se encontró el campo de cantidad del modal.', 'error');
            return;
        }

        const cantidad = parseFloat(quantityInput.value);
        if (isNaN(cantidad) || cantidad <= 0) {
            this.#showMessage("Por favor, ingrese una cantidad válida (mayor que cero).", 'error');
            return;
        }

        // Recopila las personalizaciones seleccionadas (solo los checked/seleccionados).
        const personalizaciones = Array.from(document.querySelectorAll('#modal-body-content input:checked'))
            .map(input => (producto.personalizaciones || []).find(p => p.id === input.value))
            .filter(Boolean); // Filtra cualquier resultado `undefined` si el ID no coincide.

        const precioUnitario = this.#getPrecioCliente(producto, cantidad, personalizaciones);
        if (typeof precioUnitario !== 'number' || isNaN(precioUnitario)) {
            this.#showMessage("No se pudo determinar el precio para este producto. Revise la selección.", 'error');
            return;
        }

        // Agrega el nuevo ítem al carrito.
        this.#state.carrito.push({
            id: Date.now(), // Usar un timestamp como ID único para el ítem en el carrito.
            productoNombre: producto.nombre,
            cantidad,
            tipoVenta: producto.tipoVenta,
            precioUnitario: parseFloat(precioUnitario.toFixed(2)), // Asegura dos decimales para el precio.
            subtotal: parseFloat((cantidad * precioUnitario).toFixed(2)), // Calcula y formatea el subtotal.
            personalizaciones // Guarda las personalizaciones seleccionadas.
        });

        this.#renderCart();   // Actualiza la tabla del carrito en la UI.
        this.#closeModal();   // Cierra el modal de producto.
        this.#showMessage('Producto añadido al carrito exitosamente.', 'success');
    }

    /**
     * Calcula el precio unitario de un producto basándose en el tipo de cliente,
     * la cantidad y las personalizaciones seleccionadas (especialmente para 'dsp').
     * También aplica lógica de promociones si están definidas.
     * @param {object} producto - El objeto producto para el cual calcular el precio.
     * @param {number} [cantidad=1] - La cantidad del producto (usada para promociones por volumen).
     * @param {Array<object>} [personalizaciones=[]] - Lista de personalizaciones seleccionadas (para productos como 'dsp').
     * @returns {number|undefined} El precio unitario calculado como número, o `undefined` si no se puede determinar.
     * @private
     */
    #getPrecioCliente(producto, cantidad = 1, personalizaciones = []) {
        // Lógica específica para el producto "Surtido de Pollo" ('dsp').
        if (producto.id === 'dsp') {
            const tipoSeleccionado = personalizaciones.find(p => p.grupo === 'Tipo');
            // Si hay un tipo de surtido seleccionado y su precio está definido, úsalo.
            if (tipoSeleccionado && producto.precios && typeof producto.precios[tipoSeleccionado.id] === 'number') {
                return producto.precios[tipoSeleccionado.id];
            }
            // Si no se selecciona un tipo específico, o no tiene precio, usa el precio por defecto de 'surtido'.
            return producto.precios?.surtido;
        }

        const tipoCliente = this.#state.clienteActual.tipoPrecio;

        // --- Lógica de promociones ---
        // Verifica si el producto tiene promociones definidas y si son un array.
        if (producto.precios?.promo && Array.isArray(producto.precios.promo)) {
            // Filtra las promociones aplicables: por tipo de cliente (o sin tipo específico) y por cantidad mínima.
            const promosAplicables = producto.precios.promo
                .filter(p => (!p.tipo || p.tipo === tipoCliente) && cantidad >= p.desde)
                // Ordena las promociones de mayor a menor 'desde' para aplicar la promoción con el umbral más alto.
                .sort((a, b) => b.desde - a.desde);

            if (promosAplicables.length > 0) {
                return promosAplicables[0].precio; // Retorna el precio de la promoción más relevante.
            }
        }
        // Si no hay promociones aplicables, retorna el precio según el tipo de cliente
        // o el precio público por defecto si el precio del tipo de cliente no está definido.
        return producto.precios ? (producto.precios[tipoCliente] ?? producto.precios.publico) : undefined;
    }

    /**
     * Maneja la búsqueda de clientes mientras el usuario escribe en el input.
     * Filtra la lista de clientes y muestra los resultados.
     * @param {string} query - El texto de búsqueda introducido por el usuario.
     * @private
     */
    #handleCustomerSearch(query) {
        if (!this.#ui.searchResultsContainer || !this.#ui.customerSearchInput) return;

        this.#ui.searchResultsContainer.innerHTML = ''; // Limpia resultados anteriores.
        this.#ui.searchResultsContainer.style.display = 'none'; // Oculta la lista de resultados por defecto.

        // Solo realiza la búsqueda si la consulta tiene al menos la longitud mínima.
        if (query.length < MIN_CUSTOMER_SEARCH_LENGTH) return;

        // Filtra los clientes cuyos nombres coincidan con la consulta (ignorando mayúsculas/minúsculas).
        const filteredClients = this.#data.clientes.filter(c =>
            c.nombre.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredClients.length > 0) {
            // Genera el HTML para cada resultado de búsqueda.
            this.#ui.searchResultsContainer.innerHTML = filteredClients.map(client =>
                `<div class="search-result-item" data-cliente-nombre="${client.nombre}">${client.nombre} - ${client.tipoPrecio.toUpperCase()}</div>`
            ).join('');

            // Asigna un evento de clic a cada resultado de búsqueda para seleccionar al cliente.
            this.#ui.searchResultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', e => {
                    const nombre = e.target.dataset.clienteNombre;
                    const clienteSeleccionado = this.#data.clientes.find(c => c.nombre === nombre);
                    if (clienteSeleccionado) {
                        this.#selectCustomer(clienteSeleccionado);
                    }
                });
            });
            this.#ui.searchResultsContainer.style.display = 'block'; // Muestra la lista de resultados.
        }
    }

    /**
     * Selecciona un cliente como el cliente actual de la venta y actualiza la UI.
     * @param {object} cliente - El objeto del cliente a seleccionar.
     * @private
     */
    #selectCustomer(cliente) {
        this.#state.clienteActual = { ...cliente }; // Actualiza el cliente actual en el estado (copia profunda).
        if (this.#ui.searchResultsContainer) {
            this.#ui.searchResultsContainer.style.display = 'none'; // Oculta los resultados de búsqueda.
            this.#ui.customerSearchInput.value = ''; // Limpia el input de búsqueda.
        }
        this.#renderCustomerInfo(); // Actualiza la sección de información del cliente en la UI.
        this.#renderCart(); // Vuelve a renderizar el carrito para recalcular precios si el cliente tiene precios especiales.
    }

    /**
     * Restablece el cliente actual a 'Público en General'.
     * @private
     */
    #clearCustomer() {
        this.#selectCustomer(DEFAULT_CUSTOMER); // Llama a #selectCustomer con el cliente por defecto.
        this.#showMessage('Cliente restablecido a "Público en General".', 'info');
    }

    /**
     * Cierra el modal de configuración de producto y reinicia el estado de `productoEnModal`.
     * @private
     */
    #closeModal() {
        this.#ui.modalContainer.style.display = 'none'; // Oculta el contenedor del modal.
        this.#state.productoEnModal = null; // Reinicia el producto en el modal.
    }
}

// Inicializa la aplicación cuando el DOM (Document Object Model) esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => new PosApp());

