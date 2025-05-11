document.addEventListener('DOMContentLoaded', function() {
    // Datos de restaurantes
    const restaurants = [
        {
            id: 1,
            name: "Trattoria Bella",
            image: "./images/italiano.png",
            cuisine: "Italiana",
            location: "Calle 85 #12-45",
            rating: 4.9,
            badge: "Recomendado",
            reviews: [
                {
                    user: "María G.",
                    date: "Hace 2 días",
                    rating: 5,
                    comment: "La mejor pasta que he probado en años!",
                    image: "images/maria.png"
                },
                {
                    user: "Carlos R.",
                    date: "Hace 1 semana",
                    rating: 4,
                    comment: "Excelente servicio, el tiramisú es increíble.",
                    image: "images/carlos.png"
                }
            ]
        },
        {
            id: 2,
            name: "Sakura Sushi",
            image: "images/japones.png",
            cuisine: "Japonés",
            location: "Carrera 45 #72-30",
            rating: 4.5,
            badge: "",
            reviews: [
                {
                    user: "Ana L.",
                    date: "Hace 3 días",
                    rating: 5,
                    comment: "El sushi más fresco de la ciudad.",
                    image: "images/mujer.png"
                }
            ]
        },
        {
            id: 3,
            name: "El Asador",
            image: "images/tomahawk.png",
            cuisine: "Carnes",
            location: "Avenida 30 #45-67",
            rating: 4.8,
            badge: "Nuevo",
            reviews: [
                {
                    user: "Pedro M.",
                    date: "Ayer",
                    rating: 5,
                    comment: "Los mejores cortes de carne que he probado.",
                    image: "images/pedro.png"
                }
            ]
        }
    ];

    // Función para renderizar estrellas
    function renderRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '★'.repeat(fullStars);
        stars += hasHalfStar ? '½' : '';
        stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
        return stars;
    }

    // Función para generar las cards de restaurantes
    function renderRestaurants() {
        const container = document.getElementById('restaurantsContainer');
        container.innerHTML = '';

        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';
            card.innerHTML = `
                <div class="restaurant-card">
                    ${restaurant.badge ? `<div class="restaurant-badge">${restaurant.badge}</div>` : ''}
                    <img src="${restaurant.image}" class="restaurant-img" alt="${restaurant.name}">
                    <div class="restaurant-body p-4">
                        <div class="d-flex justify-content-between align-items-start">
                            <h3 class="h5 fw-bold">${restaurant.name}</h3>
                            <div class="rating">
                                <span class="text-warning">${renderRating(restaurant.rating)}</span>
                                <span class="ms-1">${restaurant.rating}</span>
                            </div>
                        </div>
                        <p class="text-muted mb-2"><i class="fas fa-utensils me-2"></i>${restaurant.cuisine}</p>
                        <p class="text-muted mb-3"><i class="fas fa-map-marker-alt me-2"></i>${restaurant.location}</p>
                        
                        <div class="restaurant-reviews">
                            <h6 class="mb-3"><i class="fas fa-comments me-2"></i>Últimas opiniones</h6>
                            ${restaurant.reviews.map(review => `
                                <div class="review-card">
                                    <div class="d-flex align-items-center mb-2">
                                        <img src="${review.image}" class="rounded-circle me-2" width="30" alt="${review.user}">
                                        <div>
                                            <strong class="d-block">${review.user}</strong>
                                            <small class="text-muted">${review.date}</small>
                                        </div>
                                    </div>
                                    <div class="rating-small text-warning mb-1">${renderRating(review.rating)}</div>
                                    <p class="review-text-small">"${review.comment}"</p>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="d-grid mt-3">
                            <a href="reservation.html?id=${restaurant.id}" class="btn btn-primary">Reservar ahora</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Función para buscar restaurantes
    function searchRestaurants() {
        const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
        const filtered = restaurants.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.cuisine.toLowerCase().includes(searchTerm) ||
            restaurant.location.toLowerCase().includes(searchTerm)
        );
        
        // Actualizar vista con resultados filtrados
        const container = document.getElementById('restaurantsContainer');
        container.innerHTML = '';
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                    <h4 class="text-muted">No se encontraron resultados</h4>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
        } else {
            restaurants.forEach(restaurant => {
                if (filtered.includes(restaurant)) {
                    const card = document.createElement('div');
                    card.className = 'col-md-6 col-lg-4';
                    // ... (misma lógica de generación de cards)
                    container.appendChild(card);
                }
            });
        }
    }

    // Event listeners
    document.getElementById('searchButton').addEventListener('click', searchRestaurants);
    document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRestaurants();
        }
    });

    // Inicializar la vista
    renderRestaurants();

    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});