// Configuração de Produção - BG-autoparts
// Este arquivo contém configurações específicas para o ambiente de produção

// Configuração do EmailJS para Produção
const PRODUCTION_CONFIG = {
    // EmailJS Configuration
    emailjs: {
        // Substitua pelos valores reais do seu painel EmailJS
        publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
        serviceId: 'YOUR_EMAILJS_SERVICE_ID', 
        templateId: 'YOUR_EMAILJS_TEMPLATE_ID',
        
        // Email de destino para receber as mensagens
        destinationEmail: 'info@bg-autoparts.ao'
    },
    
    // Configurações do Site
    site: {
        name: 'BG-autoparts',
        domain: 'https://bg-autoparts.ao',
        owner: 'Benilson Gunza',
        description: 'Importação de peças automóveis usadas originais para Angola'
    },
    
    // Configurações de Performance
    performance: {
        // Cache em segundos (1 dia)
        cacheTime: 86400,
        
        // Compressão de imagens
        imageOptimization: true,
        
        // Minificação de CSS/JS
        minification: true
    },
    
    // Configurações de SEO
    seo: {
        keywords: [
            'peças automóveis',
            'Angola', 
            'Peugeot',
            'Citroën',
            'Fiat',
            'Nissan',
            'Renault',
            'Volkswagen',
            'peças usadas',
            'importação',
            'Benilson Gunza'
        ],
        
        // Estrutura de dados para Google
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'AutoPartsStore',
            'name': 'BG-autoparts',
            'description': 'Importação de peças automóveis usadas originais para Angola',
            'url': 'https://bg-autoparts.ao',
            'telephone': '+244-XXX-XXX-XXX',
            'email': 'info@bg-autoparts.ao',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'AO',
                'addressLocality': 'Angola'
            },
            'openingHours': 'Mo-Fr 08:00-18:00',
            'paymentAccepted': 'Cash, Transfer',
            'priceRange': '$$'
        }
    },
    
    // Configurações de Analytics (opcional)
    analytics: {
        // Google Analytics ID (se configurado)
        googleAnalyticsId: 'GA_MEASUREMENT_ID',
        
        // Facebook Pixel ID (se configurado)
        facebookPixelId: 'FB_PIXEL_ID'
    },
    
    // Configurações de Segurança
    security: {
        // Rate limiting para formulário (submissões por minuto)
        formRateLimit: 3,
        
        // Validação de origem
        allowedOrigins: [
            'https://bg-autoparts.ao',
            'https://www.bg-autoparts.ao'
        ]
    }
};

// Função para aplicar configurações de produção
function applyProductionConfig() {
    // Aplicar configurações do EmailJS
    if (typeof EMAILJS_CONFIG !== 'undefined') {
        EMAILJS_CONFIG.publicKey = PRODUCTION_CONFIG.emailjs.publicKey;
        EMAILJS_CONFIG.serviceId = PRODUCTION_CONFIG.emailjs.serviceId;
        EMAILJS_CONFIG.templateId = PRODUCTION_CONFIG.emailjs.templateId;
    }
    
    // Adicionar dados estruturados para SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(PRODUCTION_CONFIG.seo.structuredData);
    document.head.appendChild(script);
    
    // Configurar meta tags dinâmicas
    updateMetaTags();
}

// Função para atualizar meta tags
function updateMetaTags() {
    // Atualizar URL canônica
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = PRODUCTION_CONFIG.site.domain;
    
    // Atualizar Open Graph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = PRODUCTION_CONFIG.site.domain;
    }
}

// Aplicar configurações quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyProductionConfig);
} else {
    applyProductionConfig();
}

// Exportar configuração
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PRODUCTION_CONFIG;
}

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
    window.PRODUCTION_CONFIG = PRODUCTION_CONFIG;
}