// Base de datos de productos
const products = [
    {
        id: 1,
        name: "Rare Beauty Soft Pinch Liquid Blush",
        price: 2000000,
        originalPrice: 2500000,
        category: "rare beauty",
        image: "",
        description: "Colorete líquido de larga duración con un acabado natural y suave.",
        stock: 15,
        featured: true
    },
    {
        id: 2,
        name: "Rare Beauty Perfect Strokes Matte Eyeliner",
        price: 999,
        originalPrice: 1099,
        category: "rare beauty",
        image: "",
        description: "Delineador líquido de punta fina para una aplicación precisa y duradera",
        stock: 25,
        featured: true
    },
    {
        id: 3,
        name: "Rare Beauty Positive Light Liquid Luminizer",
        price: 1299,
        originalPrice: 1499,
        category: "rare beauty",
        image: "",
        description: "Iluminador líquido que aporta un brillo radiante y fresco a la piel.",
        stock: 12,
        featured: false
    },
    {
        id: 4,
        name: "Rare Beauty Stay Vulnerable Melting Blush",
        price: 799,
        originalPrice: 899,
        category: "rare beauty",
        image: "",
        description: "Colorete cremoso que se funde perfectamente con la piel para un look natural.",
        stock: 30,
        featured: true
    },
    {
        id: 5,
        name: "Rare Beauty Brow Power Universal Pencil",
        price: 249,
        originalPrice: 279,
        category: "rare beauty",
        image: "",
        description: "Lápiz para cejas con fórmula suave y tono universal que se adapta a todos.",
        stock: 50,
        featured: false
    },
    {
        id: 6,
        name: "Huda Beauty FauxFilter Foundation",
        price: 599,
        originalPrice: 699,
        category: "huda beauty",
        image: "",
        description: "Base de maquillaje con alta cobertura y acabado mate para un look impecable",
        stock: 20,
        featured: true
    },
    {
        id: 7,
        name: "Huda Beauty Desert Dusk Eyeshadow Palette",
        price: 79,
        originalPrice: 99,
        category: "huda beauty",
        image: "",
        description: "Paleta de sombras con tonos cálidos y acabados mate y metálicos.",
        stock: 40,
        featured: false
    },
    {
        id: 8,
        name: "Huda Beauty Power Bullet Matte Lipstick",
        price: 149,
        originalPrice: 179,
        category: "huda beauty",
        image: "",
        description: "Labial mate de alta pigmentación con una fórmula cremosa y duradera.",
        stock: 25,
        featured: false
    },
    {
        id: 9,
        name: "Huda Beauty Legit Lashes Mascara",
        price: 699,
        originalPrice: 799,
        category: "huda beauty",
        image: "",
        description: "Máscara de pestañas que aporta volumen y definición sin grumos.",
        stock: 18,
        featured: false
    },
    {
        id: 10,
        name: "Huda Beauty Tantour Contour & Bronzer Cream",
        price: 699,
        originalPrice: 799,
        category: "huda beauty",
        image: "",
        description: "Crema para contorno y bronceado que ofrece un acabado natural y modulable.",
        stock: 22,
        featured: false
    }
];

// Función para obtener todos los productos
function getAllProducts() {
    return products;
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Función para obtener un producto por ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Función para filtrar productos
function filterProducts(category = '', priceRange = '', searchTerm = '') {
    let filteredProducts = products;

    // Filtrar por categoría (normalizamos a minúsculas)
    if (category) {
        const categoryLower = category.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === categoryLower
        );
    }

    // Filtrar por rango de precio
    if (priceRange) {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.price;
            switch (priceRange) {
                case '0-500':
                    return price >= 0 && price <= 500;
                case '500-1000':
                    return price > 500 && price <= 1000;
                case '1000+':
                    return price > 1000;
                default:
                    return true;
            }
        });
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    }

    return filteredProducts;
}

// Función para crear HTML de tarjeta de producto
function createProductCard(product) {
    const discountPercentage = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card product-card h-100">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text flex-grow-1">${product.description}</p>
                    <div class="price-section mb-3">
                        <span class="price">$${product.price}</span>
                        ${product.originalPrice ? `<span class="original-price ms-2">$${product.originalPrice}</span>` : ''}
                        ${discountPercentage > 0 ? `<span class="badge bg-danger ms-2">${discountPercentage}% OFF</span>` : ''}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Stock: ${product.stock}</small>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i>Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para renderizar productos en el grid
function renderProducts(productsToRender, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No se encontraron productos que coincidan con los filtros seleccionados.
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
}

// Función para renderizar productos destacados
function renderFeaturedProducts() {
    const featuredProducts = getFeaturedProducts().slice(0, 3); // Solo mostrar 3 productos destacados
    renderProducts(featuredProducts, 'featuredProducts');
}
