// MyWeb Burger - JavaScript Personalizado

document.addEventListener('DOMContentLoaded', function() {
    console.log('MyWeb Burger carregado!');
    
    // Inicializar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Adicionar efeito de digitação no título
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Contador animado
    const counters = document.querySelectorAll('.stats h3');
    const speed = 200;
    
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.textContent.replace('+', ''));
            const count = +counter.innerText.replace('+', '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + '+';
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    };
    
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animar contadores quando a seção de stats for visível
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.menu-card, .feature-card, .stats').forEach(el => {
        observer.observe(el);
    });
    
    // Carregar dinamicamente os itens do menu
    const menuItems = [
        {
            name: "Double Cheese",
            description: "Dois blends de 150g, queijo duplo, bacon crocante e molho especial.",
            price: "R$ 39,90",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 5
        },
        {
            name: "Chicken Crispy",
            description: "Filé de frango empanado, alface, tomate e maionese de ervas.",
            price: "R$ 27,90",
            image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 4
        },
        {
            name: "Mega Bacon",
            description: "Triplo bacon, blend 250g, queijo cheddar e barbecue.",
            price: "R$ 42,90",
            image: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            rating: 5
        }
    ];
    
    // Função para adicionar mais itens ao menu
    function loadMoreMenuItems() {
        const menuContainer = document.querySelector('#menu .row');
        
        menuItems.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            
            const ratingStars = Array(item.rating).fill('<i class="bi bi-star-fill text-warning"></i>').join('') +
                              Array(5 - item.rating).fill('<i class="bi bi-star text-warning"></i>').join('');
            
            col.innerHTML = `
                <div class="card menu-card h-100">
                    <div class="card-img-container">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <span class="badge price-badge">${item.price}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text text-muted">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="rating">${ratingStars}</div>
                            <button class="btn btn-sm btn-primary add-to-cart" data-item='${JSON.stringify(item)}'>
                                <i class="bi bi-cart-plus"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            menuContainer.appendChild(col);
        });
    }
    
    // Botão "Ver Mais" no menu
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'btn btn-outline-primary mt-5';
    loadMoreBtn.innerHTML = '<i class="bi bi-arrow-down-circle me-2"></i>Ver Mais Itens';
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.style.margin = '2rem auto';
    
    loadMore