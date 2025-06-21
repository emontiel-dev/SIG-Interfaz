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

