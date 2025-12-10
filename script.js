// --- Datos Mockeados de Parqueaderos ---
const PARQUEADEROS = [
    {
        id: 1,
        nombre: "Parqueadero Central Bogotá",
        direccion: "Carrera 7 # 32-15, Centro",
        imgUrl: "https://images.unsplash.com/photo-1543781297-c81119777085", // Placeholder
        rating: 4.7,
        precioHora: 5000,
        descripcion: "El más seguro del centro, con vigilancia 24/7 y cámaras. Cerca a la Torre Colpatria.",
        horas: "24/7",
        seguridad: "Cámaras, Guardia y Control de Acceso",
        reseñas: [
            { autor: "Carlos M.", texto: "Excelente servicio, rápido y seguro. ¡Volvería a reservar!", rating: 5 },
            { autor: "Luisa F.", texto: "Muy bien ubicado. El pago con Parkea fue instantáneo.", rating: 5 }
        ]
    },
    {
        id: 2,
        nombre: "Estacionamiento Seguro Medellín",
        direccion: "Calle 10 # 43B-30, El Poblado",
        imgUrl: "https://images.unsplash.com/photo-1588661706689-d12c82ed15a6", // Placeholder
        rating: 4.5,
        precioHora: 6500,
        descripcion: "Perfecto para viajes de negocios. Espacios amplios y cubiertos en la zona de El Poblado.",
        horas: "Lun-Vie: 6am - 10pm",
        seguridad: "Cámaras HD y Personal de Vigilancia",
        reseñas: [
            { autor: "Andrés G.", texto: "Un poco caro, pero vale la pena por la ubicación y seguridad.", rating: 4 },
            { autor: "Valentina P.", texto: "Todo el proceso fue muy fácil desde la app. Recomendado.", rating: 5 }
        ]
    },
    {
        id: 3,
        nombre: "Parkeo Norte Cali",
        direccion: "Avenida 3AN # 32-50, Cali",
        imgUrl: "https://images.unsplash.com/photo-1544463583-4a1e9444c114", // Placeholder
        rating: 4.2,
        precioHora: 4000,
        descripcion: "Tarifa económica y excelente cobertura en el norte de Cali. Ideal para compras.",
        horas: "24/7",
        seguridad: "Personal de Soporte en Sitios, Iluminación LED",
        reseñas: [
            { autor: "Marta E.", texto: "Necesitaba un lugar rápido y lo encontré aquí. ¡Genial!", rating: 4 }
        ]
    },
    {
        id: 4,
        nombre: "Parqueadero Aeropuerto BOG",
        direccion: "Vía de Acceso al Aeropuerto, Bogotá",
        imgUrl: "https://images.unsplash.com/photo-1595995209731-ac0084f70438", // Placeholder
        rating: 4.9,
        precioHora: 8000,
        descripcion: "Reserva tu cupo de larga estadía en el aeropuerto con nuestro aliado estratégico.",
        horas: "24/7",
        seguridad: "Vigilancia Armada, Cámaras en todos los niveles",
        reseñas: [
            { autor: "Javier R.", texto: "Larga estadía sin problemas. Muy confiables.", rating: 5 },
            { autor: "Sofía Q.", texto: "La mejor opción para el aeropuerto en términos de reserva anticipada.", rating: 5 }
        ]
    }
];

let parqueaderoSeleccionado = null; // Variable global para guardar la selección

// --- Funciones de Navegación y Renderizado ---

/**
 * Muestra una sección y oculta las demás.
 * @param {string} sectionId - El ID de la sección a mostrar.
 */
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('d-none');
    });

    // Mostrar la sección solicitada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll al inicio de la sección

        // Renderizado específico al entrar a ciertas secciones
        if (sectionId === 'parqueaderos') {
            renderParqueaderos();
        }
    }
}

/**
 * Genera el HTML de las estrellas de rating.
 * @param {number} rating - Puntuación de 0 a 5.
 * @returns {string} HTML con los íconos de estrellas.
 */
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '⭐';
    }
    if (hasHalfStar) {
        starsHtml += '🌟'; // O un ícono de media estrella si tuvieras uno mejor
    }
    return starsHtml;
}

/**
 * Renderiza la lista de parqueaderos en la sección 'parqueaderos'.
 */
function renderParqueaderos() {
    const grid = document.getElementById('parqueaderosGrid');
    if (!grid) return;
    grid.innerHTML = ''; // Limpiar contenido anterior

    PARQUEADEROS.forEach(p => {
        const cardHtml = `
            <div class="col">
                <div class="card parqueadero-card shadow h-100" onclick="selectParqueadero(${p.id})">
                    <img src="${p.imgUrl}" class="card-img-top" alt="Imagen de ${p.nombre}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold" style="color: var(--parkea-blue);">${p.nombre}</h5>
                        <p class="card-text mb-1"><small class="text-muted">${p.direccion}</small></p>
                        <p class="card-text mb-1"><span class="rating-stars">${getRatingStars(p.rating)}</span> ${p.rating}/5</p>
                        <p class="card-text fw-bold text-success">Precio: $${p.precioHora.toLocaleString('es-CO')} COP/h</p>
                    </div>
                    <div class="card-footer text-center">
                         <small class="text-primary">Clic para ver detalles y reservar</small>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHtml);
    });
}

/**
 * Selecciona un parqueadero y navega a la sección 'seleccion'.
 * @param {number} id - ID del parqueadero seleccionado.
 */
function selectParqueadero(id) {
    parqueaderoSeleccionado = PARQUEADEROS.find(p => p.id === id);

    if (parqueaderoSeleccionado) {
        renderSeleccionDetalle();
        showSection('seleccion');
    } else {
        alert('Error: Parqueadero no encontrado.');
    }
}

/**
 * Renderiza los detalles del parqueadero seleccionado en la sección 'seleccion'.
 */
function renderSeleccionDetalle() {
    const container = document.getElementById('detalleParqueadero');
    if (!container || !parqueaderoSeleccionado) return;

    // Calculamos un monto ficticio (ej. 4 horas) para el pago
    const horasSimuladas = 4;
    const totalPagar = parqueaderoSeleccionado.precioHora * horasSimuladas;

    const detalleHtml = `
        <div class="col-md-6 mb-4">
            <img src="${parqueaderoSeleccionado.imgUrl}" class="img-fluid rounded shadow-sm" alt="Foto del ${parqueaderoSeleccionado.nombre}">
        </div>
        <div class="col-md-6">
            <h3 class="fw-bold" style="color: var(--parkea-blue);">${parqueaderoSeleccionado.nombre}</h3>
            <p class="lead">${parqueaderoSeleccionado.direccion}</p>
            <hr>
            
            <h5 class="fw-bold text-success">Detalles de la Reserva:</h5>
            <p class="mb-1"><strong>Calificación:</strong> <span class="rating-stars">${getRatingStars(parqueaderoSeleccionado.rating)}</span> ${parqueaderoSeleccionado.rating}/5 (Basado en ${parqueaderoSeleccionado.reseñas.length} reseñas)</p>
            <p class="mb-1"><strong>Descripción:</strong> ${parqueaderoSeleccionado.descripcion}</p>
            <p class="mb-1"><strong>Horas Disponibles:</strong> ${parqueaderoSeleccionado.horas}</p>
            <p class="mb-4"><strong>Seguridad:</strong> ${parqueaderoSeleccionado.seguridad}</p>
            
            <hr>
            
            <h4 class="fw-bold text-danger">Total Ficticio a Pagar (4 horas):</h4>
            <h2 class="fw-bolder" id="montoSeleccion">$${totalPagar.toLocaleString('es-CO')} COP</h2>
            <button class="btn btn-lg btn-success mt-3 w-100" onclick="navigateToPago(${totalPagar})">Reservar y Pagar Ahora</button>
        </div>
        <div class="col-12 mt-4">
            <h5 class="fw-bold" style="color: var(--parkea-blue);">Reseñas Destacadas</h5>
            ${parqueaderoSeleccionado.reseñas.map(r => `
                <div class="border-start border-3 border-secondary ps-3 mb-2">
                    <p class="mb-0 fst-italic">"${r.texto}"</p>
                    <small class="text-muted">- ${r.autor}</small>
                </div>
            `).join('')}
        </div>
    `;
    container.innerHTML = detalleHtml;
}

/**
 * Navega a la sección de pago y actualiza el monto.
 * @param {number} total - Monto total a pagar.
 */
function navigateToPago(total) {
    localStorage.setItem('montoParkea', total);
    const montoElement = document.getElementById('montoTotal');
    if (montoElement) {
        montoElement.textContent = `$${total.toLocaleString('es-CO')} COP`;
    }
    showSection('pago');
}


// --- Event Listeners y Lógica de Formulario ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar la sección Home al cargar
    showSection('home');
    
    // 2. Manejo del Formulario de Registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('regEmail').value;
            const pass = document.getElementById('regPass').value;
            const passConfirm = document.getElementById('regPassConfirm').value;
            
            // Validación Mock
            if (pass !== passConfirm) {
                alert('Error: Las contraseñas no coinciden.');
                return;
            }
            if (pass.length < 6) {
                 alert('Error: La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            // Simulación de éxito
            alert(`✅ Registro exitoso para ${email}. ¡Bienvenido a Parkea!`);
            registroForm.reset();
            showSection('home'); // Redirigir a Home simulado
        });
    }

    // 3. Manejo del Formulario de Pago
    const pagoForm = document.getElementById('pagoForm');
    if (pagoForm) {
        pagoForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const monto = localStorage.getItem('montoParkea') || 'N/A';
            
            // Validación simple de campos requeridos (el patrón HTML ya ayuda)
            if (!pagoForm.checkValidity()) {
                alert('Por favor, completa todos los campos del formulario de pago correctamente.');
                return;
            }

            // Simulación de éxito
            alert(`💳 Pago exitoso por $${monto.toLocaleString('es-CO')} COP. ¡Tu reserva ha sido confirmada! Gracias por usar Parkea.`);
            localStorage.removeItem('montoParkea'); // Limpiar la variable
            pagoForm.reset();
            showSection('home'); // Redirigir a Home simulado
        });
    }

    // 4. Inicializar el renderizado de parqueaderos (aunque se llama de nuevo en showSection)
    // Esto asegura que estén cargados en memoria
    renderParqueaderos();
});