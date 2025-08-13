// Configuração do EmailJS para Produção
// Este arquivo contém as configurações necessárias para integrar o EmailJS

// INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Acesse https://www.emailjs.com e crie uma conta gratuita
// 2. Conecte seu serviço de email (Gmail, Outlook, etc.)
// 3. Crie um template de email
// 4. Obtenha suas credenciais e substitua os valores abaixo

const EMAILJS_CONFIG = {
    // Public Key do EmailJS (encontrada em Account > General)
    publicKey: 'YOUR_PUBLIC_KEY_HERE',
    
    // Service ID (encontrado em Email Services)
    serviceId: 'YOUR_SERVICE_ID_HERE',
    
    // Template ID (encontrado em Email Templates)
    templateId: 'YOUR_TEMPLATE_ID_HERE'
};

// Template sugerido para o EmailJS:
// Assunto: Nova solicitação de orçamento - {{car_brand}}
// Conteúdo:
/*
Nova solicitação de orçamento recebida:

Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{phone}}
Marca do veículo: {{car_brand}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada através do formulário de contato do site BG-autoparts.
*/

// Exportar configuração (se usando módulos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}

// Disponibilizar globalmente
if (typeof window !== 'undefined') {
    window.EMAILJS_CONFIG = EMAILJS_CONFIG;
}