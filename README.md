# BG-autoparts - Landing Page

![BG-autoparts](https://img.shields.io/badge/Status-Produção-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B6B?style=flat&logo=email&logoColor=white)

## 📋 Sobre o Projeto

Landing page profissional para **BG-autoparts** - empresa especializada na importação de peças automóveis usadas originais para Angola. O site apresenta os serviços da empresa de forma moderna e responsiva, com formulário de contato integrado via EmailJS.

### 🚗 Empresa
- **Nome:** BG-autoparts
- **Proprietário:** Benilson Gunza
- **Especialidade:** Importação de peças automóveis usadas originais
- **Localização:** Angola
- **Garantia:** 1 ano em todas as peças
- **Prazo de entrega:** Até 20 dias úteis

## ✨ Funcionalidades

- 🎨 **Design Responsivo** - Otimizado para todos os dispositivos
- 📱 **Mobile First** - Experiência perfeita em smartphones
- 📧 **Formulário de Contato** - Integração com EmailJS para envio de emails
- 🚀 **Performance Otimizada** - Carregamento rápido e eficiente
- 🔍 **SEO Otimizado** - Meta tags e dados estruturados
- 🛡️ **Seguro** - Validação de formulários e proteção contra spam

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com Flexbox e Grid
- **JavaScript ES6+** - Interatividade e funcionalidades
- **EmailJS** - Envio de emails sem backend
- **Google Fonts** - Tipografia (Inter)

## 🚀 Como Usar

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/bg-autoparts.git
cd bg-autoparts
```

2. Inicie um servidor local:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (se tiver instalado)
npx serve .
```

3. Acesse: `http://localhost:8000`

### Configuração do EmailJS

1. Crie uma conta em [EmailJS](https://www.emailjs.com)
2. Configure seu serviço de email
3. Crie um template de email
4. Obtenha suas credenciais:
   - Public Key
   - Service ID
   - Template ID

5. Atualize o arquivo `script.js`:
```javascript
const EMAILJS_CONFIG = {
    publicKey: 'sua_public_key',
    serviceId: 'seu_service_id',
    templateId: 'seu_template_id'
};
```

## 📁 Estrutura do Projeto

```
bg-autoparts/
├── index.html                 # Página principal
├── styles.css                 # Estilos CSS
├── script.js                  # JavaScript principal
├── emailjs-config.js          # Configurações do EmailJS
├── production-config.js       # Configurações de produção
├── CONFIGURACAO-PRODUCAO.md   # Guia de configuração
├── deploy-checklist.md        # Checklist de deploy
├── .gitignore                 # Arquivos ignorados pelo Git
└── README.md                  # Este arquivo
```

## 🌐 Deploy

### Hospedagem Recomendada: PetroHost

- **Plano:** M (4.500 Kz/mês)
- **Domínio:** bg-autoparts.ao
- **Email:** info@bg-autoparts.ao
- **SSL:** Incluído

### Passos para Deploy

1. Siga as instruções em `CONFIGURACAO-PRODUCAO.md`
2. Use o `deploy-checklist.md` como guia
3. Configure o EmailJS com credenciais reais
4. Faça upload dos arquivos via cPanel
5. Configure SSL e email corporativo

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px
- **Mobile Pequeno:** < 480px

## 🎨 Marcas Suportadas

- 🇫🇷 **Peugeot**
- 🇫🇷 **Citroën**
- 🇮🇹 **Fiat**
- 🇯🇵 **Nissan**
- 🇫🇷 **Renault**
- 🇩🇪 **Volkswagen**

## 📞 Contato

- **Email:** info@bg-autoparts.ao
- **Telefone:** +244 XXX XXX XXX
- **Localização:** Angola

## 📄 Licença

Este projeto é propriedade de **Benilson Gunza** e **BG-autoparts**. Todos os direitos reservados.

## 🤝 Contribuição

Para melhorias e sugestões, entre em contato através do formulário no site ou email.

---

**Desenvolvido com ❤️ para BG-autoparts**  
*Benilson Gunza - Peças Gunza automóvel*