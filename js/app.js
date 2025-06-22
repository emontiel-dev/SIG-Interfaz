// --- Archivo: polleria-montiel-pos/js/app.js (Versión Final con Auto-Decimal en Cantidad) ---

// Importar datos.
import { catalogoProductos } from './data/productos.js';
import { listaClientes } from './data/clientes.js';

// --- Constantes ---
const DEFAULT_CUSTOMER = { nombre: 'Público en General', tipoPrecio: 'publico', badgeClass: 'badge-amarillo-polleria' };
const MIN_CUSTOMER_SEARCH_LENGTH = 2;
const PRICE_TYPES = [
    { key: "publico", label: "Público" }, { key: "cocina", label: "Cocina" },
    { key: "leal", label: "Leal" }, { key: "aliado", label: "Aliado" }, { key: "mayoreo", label: "Mayoreo" }
];

/**
 * Clase principal para la aplicación de Punto de Venta (POS) de Pollería Montiel.
 */
class PosApp {
    #state = {
        clienteActual: { ...DEFAULT_CUSTOMER },
        carrito: [],
        // Nuevo estado detallado para el modal
        modal: {
            visible: false,
            productoBase: null,      // Producto que se clickeó en el catálogo (ej. 'pm')
            productoActivo: null,    // Producto/variante seleccionado dentro del modal (ej. 'pg')
            precioActivo: 'publico', // Tipo de precio seleccionado
            cantidad: NaN, // Inicia como NaN para indicar que está vacío
            costo: NaN,    // Inicia como NaN para indicar que está vacío
            procesamientos: new Set(), // Usamos un Set para evitar duplicados y fácil manejo
        },
        currentView: null,
    };

    #data = {
        productos: new Map(),
        clientes: listaClientes,
        priceTypes: PRICE_TYPES,
        modalTemplate: null, // Aquí cachearemos el HTML del modal
    };

    #ui = {};

    // Bandera para evitar bucles infinitos al actualizar inputs programáticamente
    #isUpdatingQuantityInput = false;
    #isUpdatingCostInput = false;


    constructor() {
        catalogoProductos.forEach(p => this.#data.productos.set(p.id, p));
        // Precargar la plantilla del modal al iniciar
        this.#loadModalTemplate();
        this.#cacheGlobalUI();
        this.#bindGlobalEvents();
        this.#router();
    }

    // --- 0. PRE-CARGA DE RECURSOS ---
    async #loadModalTemplate() {
        try {
            const response = await fetch('./views/modalProducto.html');
            if (!response.ok) throw new Error('No se pudo cargar la plantilla del modal');
            this.#data.modalTemplate = await response.text();
        } catch (error) {
            console.error(error);
            this.#showMessage("Error crítico: No se pudo cargar la interfaz del modal.", 'error');
        }
    }

    // --- 1. INICIALIZACIÓN Y CACHEO DE UI (con tu sistema de mensajes) ---
    #cacheGlobalUI() {
        this.#ui = {
            appContainer: document.getElementById('app-container'),
            posFooter: document.getElementById('pos-footer'),
            // El contenedor del modal ahora solo es el overlay
            modalOverlay: document.getElementById('product-modal-container'),
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
        // Aplicar la clase base en lugar de estilos inline
        messageBox.classList.add('message-box');
        // Los estilos específicos de posición, sombra, etc., ahora están en la clase .message-box en style.css

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
        msgBox.className = 'message-box'; // Resetea las clases y añade la base.
        msgBox.classList.add(`message-box-${type}`); // Añade la clase específica para el tipo (ej: message-box-error).

        // Eliminar estilos inline de color, ahora definidos en las clases message-box-type
        // msgBox.style.backgroundColor = '#dc3545'; // Rojo
        // msgBox.style.backgroundColor = '#28a745'; // Verde
        // msgBox.style.backgroundColor = '#007bff'; // Azul (info)
        // msgBox.style.color = 'white'; // Color del texto claro.

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

    // --- 2. ROUTING Y CARGA DE VISTAS (sin cambios) ---
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
            // Ajusta la visibilidad del footer inferior de la POS según la vista actual usando una clase.
            if (this.#ui.posFooter) {
                 this.#ui.posFooter.classList.toggle('pos-footer-visible', viewName === 'venta');
                 // Eliminar el estilo inline anterior
                 // this.#ui.posFooter.style.display = (viewName === 'venta') ? 'flex' : 'none';
            }


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

    // --- 3. LÓGICA POST-CARGA (sin cambios) ---
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

        // El evento para cerrar el modal se asigna dinámicamente, pero
        // podemos añadir el listener al overlay que es persistente.
        this.#ui.modalOverlay?.addEventListener('click', e => {
            // Cierra el modal si se hace clic directamente en el fondo oscuro
            if (e.target === this.#ui.modalOverlay) this.#closeModal();
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

    // --- 4. RENDERIZADO (sin cambios en su mayoría) ---
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
                        <small class="text-gris-secundario">${item.cantidad.toFixed(item.tipoVenta === 'peso' ? 3 : 0)} ${item.tipoVenta} @ $${item.precioUnitario.toFixed(2)}/${item.tipoVenta}</small><br>
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

        // Lógica para mostrar/ocultar el input de búsqueda de cliente o el div de cliente seleccionado usando clases.
        if (nombre !== DEFAULT_CUSTOMER.nombre) {
            this.#ui.selectedCustomerDiv.classList.add('customer-selected'); // Muestra el div del cliente seleccionado.
            this.#ui.customerSearchInput.classList.remove('customer-search-active'); // Oculta el input de búsqueda.
            // Eliminar estilos inline anteriores
            // this.#ui.selectedCustomerDiv.style.display = 'flex';
            // this.#ui.customerSearchInput.style.display = 'none';
        } else {
            this.#ui.selectedCustomerDiv.classList.remove('customer-selected'); // Oculta el div del cliente seleccionado.
            this.#ui.customerSearchInput.classList.add('customer-search-active'); // Muestra el input de búsqueda.
            // Eliminar estilos inline anteriores
            // this.#ui.selectedCustomerDiv.style.display = 'none';
            // this.#ui.customerSearchInput.style.display = 'block';

            this.#ui.customerSearchInput.value = ''; // Limpia el valor del input de búsqueda.
        }
    }

    // =========================================================================
    // --- LÓGICA DEL MODAL CORREGIDA Y REFINADA ---
    // =========================================================================

    /**
     * Inicia el proceso de apertura del modal, ahora sin cantidad/costo inicial.
     * @param {string} productId - El ID del producto clickeado en el catálogo.
     */
    #handleProductSelection(productId) {
        const productoBase = this.#data.productos.get(productId);
        if (!productoBase) {
            this.#showMessage(`Producto con ID '${productId}' no encontrado.`, 'error');
            return;
        }

        // Obtener el tipo de precio del cliente actual. Por ahora usamos 'publico'.
        // const tipoPrecioCliente = this.#state.clienteActual.tipoPrecio;
        const tipoPrecioCliente = 'publico';

        // Recopila los IDs de personalización por defecto de CADA GRUPO de personalización
        const defaultProcIds = (productoBase.personalizaciones || [])
            .flatMap(group => group.default || []); // Obtiene los defaults de todos los grupos

        // --- LÓGICA DE INICIALIZACIÓN SIMPLIFICADA ---
        this.#state.modal = {
            visible: true,
            productoBase: productoBase,
            productoActivo: productoBase,
            precioActivo: tipoPrecioCliente, // Cumple con la solicitud de usar 'publico' por defecto
            cantidad: NaN, // Inicia vacío
            costo: NaN,    // Inicia vacío
            procesamientos: new Set(defaultProcIds) // Usar los IDs por defecto encontrados
        };

        this.#renderModal();
    }

    /**
     * Renderiza el modal completo en la UI.
     */
    #renderModal() {
        if (!this.#state.modal.visible) {
            // Oculta el overlay usando una clase
            if (this.#ui.modalOverlay) {
                this.#ui.modalOverlay.classList.remove('modal-visible');
                // Eliminar estilo inline anterior
                // this.#ui.modalOverlay.style.display = 'none';
            }
            this.#ui.modalOverlay.innerHTML = ''; // Limpia el contenido
            return;
        }
        if (!this.#data.modalTemplate) {
            this.#showMessage("La plantilla del modal no está cargada.", 'error');
            return;
        }

        this.#ui.modalOverlay.innerHTML = this.#data.modalTemplate;
        // Muestra el overlay usando una clase
        if (this.#ui.modalOverlay) {
             this.#ui.modalOverlay.classList.add('modal-visible');
             // Eliminar estilo inline anterior
             // this.#ui.modalOverlay.style.display = 'flex';
        }


        this.#cacheModalUI();

        this.#renderModalHeader();
        this.#renderModalProductOptions();
        this.#renderModalPriceOptions();
        this.#renderModalRegistroInputs(); // Renderiza los inputs vacíos
        this.#renderModalProcesamientos();

        this.#bindModalEvents();

        // Foco inicial en el input de costo
        this.#ui.modalCostInput.focus();
        // No seleccionamos el texto si está vacío.
    }

    /**
     * Cacha las referencias a los elementos UI del modal.
     */
    #cacheModalUI() {
        this.#ui.modalTitle = document.getElementById('modal-product-title');
        this.#ui.modalProductSection = document.getElementById('modal-product-section');
        this.#ui.productOptionsContainer = document.getElementById('product-options-container');
        this.#ui.priceOptionsContainer = document.getElementById('price-options-container');
        this.#ui.modalQuantityInput = document.getElementById('modal-quantity');
        this.#ui.modalCostInput = document.getElementById('modal-cost');
        this.#ui.procesamientosSection = document.getElementById('procesamientos-section');
        // Usar querySelector dentro del overlay para encontrar los botones
        this.#ui.modalCancelBtn = this.#ui.modalOverlay.querySelector('.btn-secondary');
        this.#ui.modalAddToCartBtn = this.#ui.modalOverlay.querySelector('.btn-primary');
        this.#ui.modalCloseBtn = this.#ui.modalOverlay.querySelector('.modal-close-btn');
    }

    /**
     * Asigna eventos a los elementos del modal.
     */
    #bindModalEvents() {
        // --- SELECCIÓN DE PRODUCTO/VARIANTE ---
        this.#ui.productOptionsContainer.addEventListener('click', e => {
            const btn = e.target.closest('.btn-variant');
            if (!btn || !btn.dataset.productId) return;
            const nuevoProductoId = btn.dataset.productId;

            // --- Restaurado: Usar #findProductById para encontrar el nuevo producto activo ---
            const nuevoProductoActivo = this.#findProductById(nuevoProductoId);

            if (nuevoProductoActivo) {
                // Actualizar el producto activo en el estado del modal
                this.#state.modal.productoActivo = nuevoProductoActivo;

                // Resetear personalizaciones a los defaults del nuevo producto activo
                const defaultProcIds = (nuevoProductoActivo.personalizaciones || [])
                    .flatMap(group => group.default || []);
                this.#state.modal.procesamientos = new Set(defaultProcIds);

                // --- Restaurado: Resetear cantidad y costo a 0 en el estado ---
                this.#state.modal.cantidad = 0;
                this.#state.modal.costo = 0;

                // --- Restaurado: Re-renderizar el modal completo con el nuevo producto ---
                this.#renderModal();

                // --- Restaurado: Establecer cantidad inicial y calcular costo para el nuevo producto ---
                // Después de re-renderizar y cachear los elementos del modal
                const initialQuantity = nuevoProductoActivo.tipoVenta === 'peso' ? 1.000 : 1;
                // Usar bandera para evitar que la asignación dispare el listener de input
                this.#isUpdatingQuantityInput = true;
                this.#ui.modalQuantityInput.value = initialQuantity.toFixed(nuevoProductoActivo.tipoVenta === 'peso' ? 3 : 0);
                this.#isUpdatingQuantityInput = false;

                this.#state.modal.cantidad = initialQuantity; // Actualizar estado numérico con la cantidad inicial

                this.#updateRegistro('cantidad'); // Calculate initial cost based on initial quantity
                this.#ui.modalCostInput.focus(); // Set focus after update
                this.#ui.modalCostInput.select(); // Select the text for easy overwrite

            } else {
                 this.#showMessage(`Error al cambiar de producto: ID '${nuevoProductoId}' no encontrado.`, 'error');
            }
        });

        // --- SELECCIÓN DE TIPO DE PRECIO ---
        this.#ui.priceOptionsContainer.addEventListener('click', e => {
            const btn = e.target.closest('.btn-variant');
            if (!btn || !btn.dataset.priceType) return;
            this.#state.modal.precioActivo = btn.dataset.priceType;
            this.#renderModalPriceOptions();
            // Recalcula basado en el campo que tenga valor.
            // Si ambos están vacíos (NaN), updateRegistro no hará nada, lo cual es correcto.
            // Pasamos null como source para que #updateRegistro decida qué recalcular
            this.#updateRegistro(null);
        });

        // --- INPUTS DE REGISTRO ---
        // Listener para manejar la entrada de cantidad con auto-decimal para 'peso'
        this.#ui.modalQuantityInput.addEventListener('input', () => {
            // Si la actualización es programática, ignorar este evento
            if (this.#isUpdatingQuantityInput) {
                return;
            }

            const { productoActivo } = this.#state.modal;
            if (!productoActivo) return;

            let value = this.#ui.modalQuantityInput.value;
            let numericalValue;

            if (productoActivo.tipoVenta === 'peso') {
                // Eliminar cualquier caracter no numérico (incluyendo puntos decimales ingresados por error)
                let rawDigits = value.replace(/\D/g, '');

                if (rawDigits === '') {
                    numericalValue = NaN;
                    // Mantener el input vacío si no hay dígitos
                    // No actualizamos el input.value aquí, #updateRegistro lo hará.
                } else {
                    // Calcular el valor numérico insertando el punto decimal 3 posiciones desde la derecha
                    // Ejemplo: '123' -> '0123' -> 0.123; '1234' -> '1.234'
                    const paddedDigits = rawDigits.padStart(4, '0'); // Asegura al menos 4 dígitos para formato X.YYY
                    const integerPart = paddedDigits.slice(0, -3);
                    const decimalPart = paddedDigits.slice(-3);
                    numericalValue = parseFloat(`${integerPart}.${decimalPart}`);

                    // No formateamos el input.value aquí. #updateRegistro lo hará.
                }
            } else { // tipoVenta es 'unidad'
                // Para unidades, parsear como entero
                numericalValue = parseInt(value, 10);
                 // Si el input está vacío, el valor numérico es NaN
                if (value === '') numericalValue = NaN;
                // No modificamos el valor del input aquí, el usuario escribe enteros
            }

            // Actualizar el estado con el valor numérico calculado
            this.#state.modal.cantidad = isNaN(numericalValue) ? NaN : numericalValue;

            // Disparar la actualización del otro campo (costo)
            this.#updateRegistro('cantidad');
        });

        // Listener para prevenir la entrada de caracteres no numéricos en cantidad (solo para peso)
        this.#ui.modalQuantityInput.addEventListener('keydown', (event) => {
            const { productoActivo } = this.#state.modal;
            if (!productoActivo || productoActivo.tipoVenta !== 'peso') {
                // Permitir comportamiento por defecto para productos que no son de peso
                return;
            }

            const key = event.key;
            // Permitir dígitos, Backspace, Delete, teclas de flecha, Tab, Enter, etc.
            // Prevenir cualquier otra tecla que no sea un dígito
            if (!/^\d$/.test(key) &&
                key !== 'Backspace' &&
                key !== 'Delete' &&
                key !== 'ArrowLeft' &&
                key !== 'ArrowRight' &&
                key !== 'Tab' &&
                key !== 'Enter' &&
                !event.metaKey && !event.ctrlKey // Permitir atajos como Ctrl+C, Ctrl+V
               ) {
                event.preventDefault(); // Prevenir la acción por defecto de la tecla
            }
            // Nota: La lógica de formateo y manejo de dígitos brutos ocurre en el evento 'input'.
            // Este keydown es solo para evitar que aparezcan caracteres no deseados en el input.
        });


        // Listener para manejar la entrada de costo (comportamiento estándar)
        this.#ui.modalCostInput.addEventListener('input', () => {
             // Si la actualización es programática, ignorar este evento
            if (this.#isUpdatingCostInput) {
                return;
            }

            const value = this.#ui.modalCostInput.value;
            const numericalValue = parseFloat(value);

            // Actualizar el estado con el valor numérico parseado
            this.#state.modal.costo = isNaN(numericalValue) ? NaN : numericalValue;

            // Disparar la actualización del otro campo (cantidad)
            this.#updateRegistro('costo');
        });


        // --- SELECCIÓN DE PROCESAMIENTOS ---
        this.#ui.procesamientosSection.addEventListener('click', e => {
            const btn = e.target.closest('.btn-variant');
            if (!btn || !btn.dataset.procId) return;
            const procId = btn.dataset.procId;
            const groupInfo = this.#findProcesamientoGroup(this.#state.modal.productoActivo, procId);
            if (!groupInfo) return;

            if (groupInfo.tipo === 'radio') {
                // Eliminar todos los procesamientos de este grupo y añadir solo el seleccionado
                groupInfo.options.forEach(opt => {
                    if (this.#state.modal.procesamientos.has(opt.id)) {
                         this.#state.modal.procesamientos.delete(opt.id);
                    }
                });
                this.#state.modal.procesamientos.add(procId);
            } else { // checkbox
                if (this.#state.modal.procesamientos.has(procId)) {
                    this.#state.modal.procesamientos.delete(procId);
                } else {
                    this.#state.modal.procesamientos.add(procId);
                }
            }
            this.#renderModalProcesamientos();
            // No es necesario recalcular cantidad/costo al cambiar procesamientos
        });

        // --- BOTONES DE ACCIÓN ---
        this.#ui.modalAddToCartBtn.addEventListener('click', () => this.#handleAddToCart());
        this.#ui.modalCancelBtn.addEventListener('click', () => this.#closeModal());
        this.#ui.modalCloseBtn.addEventListener('click', () => this.#closeModal());
    }

    // --- FUNCIONES DE RENDERIZADO DEL MODAL (Refinadas) ---

    #renderModalHeader() {
        this.#ui.modalTitle.textContent = this.#state.modal.productoActivo.nombre;
    }

   #renderModalProductOptions() {
        // Guarda de seguridad por si el elemento no se encuentra
        if (!this.#ui.modalProductSection) return;

        const { productoBase, productoActivo } = this.#state.modal;

        // Unificar subproductos, variantes y especiales en una sola lista de opciones.
        const relatedProducts = [
            productoBase,
            ...(productoBase.subproductos || []),
            ...(productoBase.variantes || []),
            ...(productoBase.especiales || [])
        ];

        // --- LÓGICA CLAVE ---
        // Si hay una o menos opciones, no tiene sentido mostrar la sección.
        if (relatedProducts.length <= 1) {
            // Ocultamos toda la sección usando una clase
            this.#ui.modalProductSection.classList.add('product-options-hidden');
            // Eliminar estilo inline anterior
            // this.#ui.modalProductSection.style.display = 'none';
        } else {
            // Si hay más de una opción, mostramos la sección usando una clase y renderizamos los botones.
            this.#ui.modalProductSection.classList.remove('product-options-hidden');
            // Eliminar estilo inline anterior
            // this.#ui.modalProductSection.style.display = 'block';

            this.#ui.productOptionsContainer.innerHTML = relatedProducts.map(prod => {
                const isActive = prod.id === productoActivo.id;
                return `<button class="btn-variant ${isActive ? 'active' : ''}" data-product-id="${prod.id}">${prod.id.toUpperCase()}</button>`;
            }).join('');
        }
    }

    #renderModalPriceOptions() {
        const producto = this.#state.modal.productoActivo;

        // Guarda de seguridad si no hay producto, precios o el contenedor no existe.
        if (!producto || !producto.precios || !this.#ui.priceOptionsContainer) {
            if (this.#ui.priceOptionsContainer) this.#ui.priceOptionsContainer.innerHTML = '';
            return;
        }

        // --- LÓGICA CLAVE: Filtrar los tipos de precio antes de renderizar ---
        const tiposDePrecioVisibles = this.#data.priceTypes.filter(type => {
            if (type.key === 'publico') return true;
            const precioEspecifico = producto.precios[type.key];
            // Mostrar si el precio es un número válido
            return typeof precioEspecifico === 'number';
        });

        // --- NUEVA LÓGICA DE CLASE DINÁMICA ---
        // Si hay 2 o menos botones, aplica la clase para centrarlos.
        // Puedes ajustar el número '2' según tu preferencia de diseño.
        if (tiposDePrecioVisibles.length <= 2) {
            this.#ui.priceOptionsContainer.classList.add('single-row-center');
        } else {
            this.#ui.priceOptionsContainer.classList.remove('single-row-center');
        }

        // Renderiza los botones como antes
        this.#ui.priceOptionsContainer.innerHTML = tiposDePrecioVisibles.map(type => {
            const precio = this.#getPriceForProduct(producto, type.key);
            const isActive = type.key === this.#state.modal.precioActivo;
            const displayPrice = precio !== null ? `$${precio.toFixed(2)}` : '-';

            // Eliminar estilo inline del span de precio
            // <span style="font-size: 0.9em;">${displayPrice}</span>
            return `
                <button class="btn-variant ${isActive ? 'active' : ''}" data-price-type="${type.key}">
                    <span>${type.label}</span>
                    <span class="price-display-small">${displayPrice}</span>
                </button>
            `;
        }).join('');
    }

    /**
     * Renderiza los inputs de registro, mostrando su valor o dejándolos vacíos.
     */
    #renderModalRegistroInputs() {
        const { productoActivo } = this.#state.modal;

        // Solo actualiza placeholders y steps. Los valores se manejan en #updateRegistro.
        if (productoActivo) {
            const esPorPeso = productoActivo.tipoVenta === 'peso';
            // El placeholder para peso ahora sugiere el formato X.YYY
            this.#ui.modalQuantityInput.placeholder = esPorPeso ? '0.000' : '0';
            // El step para peso permite 3 decimales
            this.#ui.modalQuantityInput.step = esPorPeso ? '0.001' : '1';
            this.#ui.modalCostInput.placeholder = '0.00';
            this.#ui.modalCostInput.step = '0.01';
        }
        // Los valores de los inputs se mantienen tal como el usuario los escribió
        // o como fueron calculados por #updateRegistro.
    }

    #renderModalProcesamientos() {
        const producto = this.#state.modal.productoActivo;
        if (!producto.personalizaciones || producto.personalizaciones.length === 0) {
            this.#ui.procesamientosSection.innerHTML = '';
            return;
        }

        this.#ui.procesamientosSection.innerHTML = producto.personalizaciones.map(group => `
            <div class="personalization-group">
                <h4>${group.grupo}</h4>
                <div class="options-container">
                    ${group.options.map(opt => {
                        const isActive = this.#state.modal.procesamientos.has(opt.id);
                        // Mostrar el ID en mayúsculas como etiqueta del botón.
                        return `<button class="btn-variant ${isActive ? 'active' : ''}" data-proc-id="${opt.id}" title="${opt.nombre}">${opt.id}</button>`;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }

    /**
     * Actualiza y sincroniza los campos de cantidad y costo.
     */
    #updateRegistro(source) {
        const { productoActivo } = this.#state.modal;
        if (!productoActivo) return;

        // Obtiene el precio unitario basado en el producto activo y el tipo de precio seleccionado.
        // No pasamos la cantidad aquí, ya que la promoción se aplica al añadir al carrito.
        const precioUnitarioBase = this.#getPriceCliente(productoActivo);

        // Leer valores numéricos del estado
        let cantidad = this.#state.modal.cantidad;
        let costo = this.#state.modal.costo;

        // Si el precio unitario base no es válido, limpiar inputs y estado, luego salir.
        if (precioUnitarioBase === null || isNaN(precioUnitarioBase) || precioUnitarioBase <= 0) {
            this.#state.modal.cantidad = NaN;
            this.#state.modal.costo = NaN;
            // Usar banderas al limpiar inputs para evitar disparar eventos 'input'
            this.#isUpdatingQuantityInput = true;
            this.#ui.modalQuantityInput.value = '';
            this.#isUpdatingQuantityInput = false;

            this.#isUpdatingCostInput = true;
            this.#ui.modalCostInput.value = '';
            this.#isUpdatingCostInput = false;

            // Solo mostrar mensaje si el usuario estaba activamente escribiendo
            if (source === 'cantidad' || source === 'costo') {
                 this.#showMessage("Precio no disponible para este producto y tipo de cliente.", 'info');
            }
            return;
        }

        if (source === 'cantidad') {
            // La cantidad en el estado ya fue actualizada por el listener del input de cantidad.
            // Calcular el costo basado en la cantidad numérica del estado.
            cost = !isNaN(cantidad) ? cantidad * precioUnitarioBase : NaN;
            this.#state.modal.costo = costo; // Actualizar estado del costo

            // Actualizar el input de costo. Usar bandera.
            this.#isUpdatingCostInput = true;
            this.#ui.modalCostInput.value = !isNaN(cost) ? costo.toFixed(2) : '';
            this.#isUpdatingCostInput = false;

        } else if (source === 'costo') {
            // El costo en el estado ya fue actualizado por el listener del input de costo.
            // Calcular la cantidad basada en el costo numérico del estado.
            cantidad = !isNaN(costo) ? costo / precioUnitarioBase : NaN;
            this.#state.modal.cantidad = cantidad; // Actualizar estado de la cantidad

            // Actualizar el input de cantidad. Usar bandera y formateo según tipoVenta.
            this.#isUpdatingQuantityInput = true;
            if (productoActivo.tipoVenta === 'peso') {
                // Formatear para mostrar siempre 3 decimales para peso
                this.#ui.modalQuantityInput.value = !isNaN(cantidad) ? cantidad.toFixed(3) : '';
            } else { // tipoVenta es 'unidad'
                // Redondear al entero más cercano para unidades
                this.#ui.modalQuantityInput.value = !isNaN(cantidad) ? Math.round(cantidad).toString() : '';
            }
            this.#isUpdatingQuantityInput = false;

            // El input de costo ya fue actualizado por su propio listener.
        }
        // Si source es null (ej. cambio de tipo de precio), recalcular basado en el campo que tenga valor.
        else {
            if (!isNaN(cantidad)) { // Si la cantidad tiene un valor numérico válido en el estado
                cost = cantidad * precioUnitarioBase;
                this.#state.modal.costo = costo;
                this.#isUpdatingCostInput = true;
                this.#ui.modalCostInput.value = !isNaN(cost) ? cost.toFixed(2) : '';
                this.#isUpdatingCostInput = false;
            } else if (!isNaN(costo)) { // Si el costo tiene un valor numérico válido en el estado
                cantidad = costo / precioUnitarioBase;
                this.#state.modal.cantidad = cantidad;
                this.#isUpdatingQuantityInput = true;
                 if (productoActivo.tipoVenta === 'peso') {
                     this.#ui.modalQuantityInput.value = !isNaN(cantidad) ? cantidad.toFixed(3) : '';
                 } else {
                     this.#ui.modalQuantityInput.value = !isNaN(cantidad) ? Math.round(cantidad).toString() : '';
                 }
                this.#isUpdatingQuantityInput = false;
            }
            // Si ambos son NaN, no se hace nada, los inputs quedan vacíos.
        }
    }

    /**
     * Añade el producto configurado al carrito.
     */
    #handleAddToCart() {
        const { productoActivo, procesamientos } = this.#state.modal;

        // Obtiene los valores numéricos finales del estado
        const cantidad = this.#state.modal.cantidad;
        const costo = this.#state.modal.costo;

        if (isNaN(cantidad) || isNaN(costo) || cantidad <= 0 || costo <= 0) {
            this.#showMessage("Ingrese una cantidad o costo válido.", 'error');
            return;
        }

        // Obtiene el precio unitario FINAL, considerando promociones por cantidad.
        const precioUnitarioFinal = this.#getPriceCliente(productoActivo, cantidad);

        if (precioUnitarioFinal === null || isNaN(precioUnitarioFinal) || precioUnitarioFinal <= 0) {
            this.#showMessage("No se pudo determinar un precio válido para añadir al carrito.", 'error');
            return;
        }

        // Verificación final de consistencia entre costo y cantidad/precio
        const costoCalculado = cantidad * precioUnitarioFinal;
        // Usamos una pequeña tolerancia para evitar problemas de coma flotante.
        const tolerance = 0.005; // Por ejemplo, medio centavo
        if (Math.abs(costo - costoCalculado) > tolerance) {
             // Formatear cantidad para el mensaje de error según tipoVenta
             const cantidadFormateada = productoActivo.tipoVenta === 'peso' ? cantidad.toFixed(3) : Math.round(cantidad).toString();
             this.#showMessage(`El costo ingresado ($${costo.toFixed(2)}) no coincide con la cantidad (${cantidadFormateada}) y el precio unitario ($${precioUnitarioFinal.toFixed(2)}). Costo calculado: $${costoCalculado.toFixed(2)}. Por favor, revise.`, 'error');
             return;
        }


        const personalizacionesCompletas = (productoActivo.personalizaciones || [])
            .flatMap(group => group.options)
            .filter(opt => procesamientos.has(opt.id));

        this.#state.carrito.push({
            id: Date.now(), // Usar timestamp como ID único temporal
            productoNombre: productoActivo.nombre,
            cantidad: cantidad,
            tipoVenta: productoActivo.tipoVenta,
            precioUnitario: precioUnitarioFinal, // Usar el precio unitario final (con promo si aplica)
            subtotal: costo, // Usar el costo ingresado/calculado
            personalizaciones: personalizacionesCompletas
        });

        this.#renderCart();
        this.#closeModal();
        this.#showMessage(`${productoActivo.nombre} añadido al pedido.`, 'success');
    }

    // --- LÓGICA DE PRECIOS (Refinada) ---
    /**
     * Obtiene el precio de un producto para un tipo de precio específico,
     * usando el precio público como fallback.
     * @param {object} producto - El objeto producto.
     * @param {string} tipoPrecio - La clave del tipo de precio ('publico', 'cocina', etc.).
     * @returns {number|null} El precio como número, o null si no está definido.
     * @private
     */
    #getPriceForProduct(producto, tipoPrecio) {
        if (!producto || !producto.precios) return null;
        // Retorna el precio específico del tipo, o el precio público si el específico no existe.
        // Si ni el específico ni el público existen, retorna null.
        // Use ?? to handle null, undefined, and the string '-'
        const specificPrice = producto.precios[tipoPrecio];
        if (typeof specificPrice === 'number') return specificPrice;

        const publicPrice = producto.precios.publico;
         if (typeof publicPrice === 'number') return publicPrice;

        return null; // Neither specific nor public price is a valid number
    }

    /**
     * Calcula el precio unitario final de un producto considerando el tipo de cliente activo
     * y las promociones por cantidad.
     * @param {object} producto - El objeto producto activo en el modal.
     * @param {number} [cantidad=1] - La cantidad ingresada (para lógica de promociones).
     * @returns {number|null} El precio unitario calculado, o null si no se puede determinar.
     * @private
     */
    #getPriceCliente(producto, cantidad = 1) {
        const tipoClienteActivo = this.#state.modal.precioActivo;
        // No necesitamos los procesamientos aquí para el precio unitario base,
        // solo para el caso especial de Desperdicio si tuviera precios por variante.

        // Caso especial: Desperdicio y sus variantes.
        // El precio de las variantes de desperdicio es simplemente su precio público definido en el objeto variante.
        // Si el producto activo es una variante de DSP (DSH, CBZ, DSL), usamos su precio público.
        // Si el producto activo es el DSP base, usamos su precio público.
        if (producto.id === 'DSP' || producto.id === 'DSH' || producto.id === 'CBZ' || producto.id === 'DSL') {
             return this.#getPriceForProduct(producto, 'publico');
        }


        // Lógica de promociones: Busca la mejor promoción aplicable por cantidad y tipo de cliente.
        // Solo aplica si el producto tiene promociones definidas.
        if (producto.promociones && Array.isArray(producto.promociones)) {
            const promoAplicable = producto.promociones
                // Filtra promociones que coincidan con el tipo de cliente (o sin tipo) y la cantidad
                .filter(p => (!p.tipo || p.tipo === tipoClienteActivo) && cantidad >= p.desde)
                // Ordena descendente por 'desde' para aplicar la promoción con el umbral más alto
                .sort((a, b) => b.desde - a.desde)[0];
            // Si se encontró una promoción aplicable, retorna su precio.
            if (promoAplicable) return promoAplicable.precio;
        }

        // Si no hay promociones aplicables, retorna el precio base según el tipo de cliente activo.
        return this.#getPriceForProduct(producto, tipoClienteActivo);
    }

    // --- FUNCIONES DE UTILIDAD ---
    /**
     * Busca un producto o subproducto/variante/especial por su ID en todo el catálogo.
     * @param {string} productId - El ID a buscar.
     * @returns {object|null} El objeto producto encontrado, o null si no existe.
     * @private
     */
    #findProductById(productId) {
        // Busca en el catálogo principal
        let found = this.#data.productos.get(productId);
        if (found) return found;

        // If not, search within subproducts/variants/specials of all main products
        for (const producto of this.#data.productos.values()) {
            const allRelated = [
                ...(producto.subproductos || []),
                ...(producto.variantes || []),
                ...(producto.especiales || [])
            ];
            found = allRelated.find(sub => sub.id === productId);
            if (found) return found;
        }
        return null; // Not found anywhere
    }

    /**
     * Encuentra el grupo de personalización al que pertenece un procesamiento por su ID.
     * @param {object} producto - El objeto producto que contiene las personalizaciones.
     * @param {string} procId - El ID del procesamiento a buscar.
     * @returns {object|null} El objeto grupo de personalización, o null si no se encuentra.
     * @private
     */
    #findProcesamientoGroup(producto, procId) {
        if (!producto || !producto.personalizaciones) return null;
        return producto.personalizaciones.find(group =>
            group.options.some(opt => opt.id === procId)
        );
    }

    /**
     * Cierra el modal y reinicia su estado.
     * @private
     */
    #closeModal() {
        this.#state.modal.visible = false;
        // Resetear el estado del modal a sus valores iniciales (vacío)
        this.#state.modal.productoBase = null;
        this.#state.modal.productoActivo = null;
        this.#state.modal.precioActivo = 'publico';
        this.#state.modal.cantidad = NaN;
        this.#state.modal.costo = NaN;
        this.#state.modal.procesamientos = new Set();

        this.#renderModal(); // Llama a render, que se encarga de limpiar y ocultar.
    }

    // --- LÓGICA DE CLIENTES ---
    /**
     * Maneja la búsqueda de clientes mientras el usuario escribe en el input.
     * Filtra la lista de clientes y muestra los resultados.
     * @param {string} query - El texto de búsqueda introducido por el usuario.
     * @private
     */
    #handleCustomerSearch(query) {
        if (!this.#ui.searchResultsContainer || !this.#ui.customerSearchInput) return;

        this.#ui.searchResultsContainer.innerHTML = ''; // Limpia resultados anteriores.
        // Oculta la lista de resultados por defecto usando una clase
        this.#ui.searchResultsContainer.classList.remove('search-results-visible');
        // Eliminar estilo inline anterior
        // this.#ui.searchResultsContainer.style.display = 'none';


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
            // Muestra la lista de resultados usando una clase
            this.#ui.searchResultsContainer.classList.add('search-results-visible');
            // Eliminar estilo inline anterior
            // this.#ui.searchResultsContainer.style.display = 'block';
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
            // Oculta los resultados de búsqueda usando una clase
            this.#ui.searchResultsContainer.classList.remove('search-results-visible');
            // Eliminar estilo inline anterior
            // this.#ui.searchResultsContainer.style.display = 'none';

            this.#ui.customerSearchInput.value = ''; // Limpia el input de búsqueda.
        }
        this.#renderCustomerInfo(); // Actualiza la sección de información del cliente en la UI.
        // No es necesario re-renderizar el carrito aquí si la lógica de precios del modal
        // ya usa el tipo de precio 'publico' por defecto y no el del cliente.
        // Si en el futuro se conecta el precio del cliente, sí sería necesario.
        // this.#renderCart();
    }

    /**
     * Restablece el cliente actual a 'Público en General'.
     * @private
     */
    #clearCustomer() {
        this.#selectCustomer(DEFAULT_CUSTOMER); // Llama a #selectCustomer con el cliente por defecto.
        this.#showMessage('Cliente restablecido a "Público en General".', 'info');
    }
}

// Inicializa la aplicación cuando el DOM (Document Object Model) esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => new PosApp());
