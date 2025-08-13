// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.about-content, .brand-card, .category-card, .contact-content');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Configuração do EmailJS
// IMPORTANTE: Substitua estas configurações pelas suas próprias do painel EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY', // Substitua pela sua Public Key do EmailJS
    serviceId: 'YOUR_SERVICE_ID', // Substitua pelo seu Service ID
    templateId: 'YOUR_TEMPLATE_ID' // Substitua pelo seu Template ID
};

// Contact form handling with EmailJS integration
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');
const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;

// Inicializar EmailJS quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS com a Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
});

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            marca: formData.get('marca'),
            mensagem: formData.get('mensagem')
        };
        
        // Validate form
        if (!validateForm(data)) {
            showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Disable form and show loading
        setLoadingState(true);
        
        try {
            // Verificar se EmailJS está disponível
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS não está carregado');
            }
            
            // Preparar dados para o EmailJS
            const templateParams = {
                from_name: data.nome,
                from_email: data.email,
                phone: data.telefone,
                car_brand: data.marca,
                message: data.mensagem,
                to_email: 'info@bg-autoparts.ao' // Email de destino
            };
            
            // Enviar email usando EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('Email enviado com sucesso:', response);
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
            
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            
            // Verificar se é erro de configuração
            if (error.text && error.text.includes('Public Key')) {
                showMessage('Erro de configuração. Verifique as credenciais do EmailJS.', 'error');
            } else if (error.message && error.message.includes('EmailJS não está carregado')) {
                showMessage('Serviço de email não disponível. Tente novamente mais tarde.', 'error');
            } else {
                showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
            }
        } finally {
            setLoadingState(false);
        }
    });
}

function validateForm(data) {
    return data.nome && data.email && data.telefone && data.marca && data.mensagem;
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

function setLoadingState(loading) {
    if (loading) {
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-flex';
        }
    } else {
        if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) btnText.style.display = 'inline';
            if (btnLoading) btnLoading.style.display = 'none';
        }
    }
}

// Add loading animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Add hover effects to cards
const cards = document.querySelectorAll('.brand-card, .category-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('4.8')) {
                    animateCounter(stat, 4.8);
                } else if (text.includes('5.000')) {
                    animateCounter(stat, 5000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add search functionality (placeholder)
function searchParts(query) {
    // This would typically connect to a backend API
    console.log('Searching for:', query);
    // For now, just show an alert
    alert(`Procurando por: ${query}`);
}

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

// Add loading state for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add scroll to top functionality
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
`;

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTop);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.style.opacity = '1';
        scrollToTop.style.visibility = 'visible';
    } else {
        scrollToTop.style.opacity = '0';
        scrollToTop.style.visibility = 'hidden';
    }
});

// Add hover effect to scroll to top button
scrollToTop.addEventListener('mouseenter', () => {
    scrollToTop.style.transform = 'scale(1.1)';
});

scrollToTop.addEventListener('mouseleave', () => {
    scrollToTop.style.transform = 'scale(1)';
});