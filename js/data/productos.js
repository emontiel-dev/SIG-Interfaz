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
