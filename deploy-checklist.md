# Checklist de Deploy - BG-autoparts

## 🚀 Preparação para Produção

### 1. Otimização de Arquivos

#### CSS
- [ ] Remover comentários desnecessários
- [ ] Minificar CSS (opcional)
- [ ] Verificar compatibilidade cross-browser

#### JavaScript
- [ ] Configurar credenciais do EmailJS
- [ ] Testar funcionalidade do formulário
- [ ] Remover console.logs de debug

#### HTML
- [ ] Validar HTML5
- [ ] Otimizar meta tags
- [ ] Verificar links internos

### 2. Configuração do EmailJS

#### Credenciais Necessárias
```javascript
// Substitua no arquivo script.js
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY',     // Da seção Account
    serviceId: 'YOUR_SERVICE_ID',     // Da seção Email Services  
    templateId: 'YOUR_TEMPLATE_ID'    // Da seção Email Templates
};
```

#### Template do EmailJS
**Variáveis a usar no template:**
- `{{from_name}}` - Nome do cliente
- `{{from_email}}` - Email do cliente
- `{{phone}}` - Telefone do cliente
- `{{car_brand}}` - Marca do veículo
- `{{message}}` - Mensagem do cliente
- `{{to_email}}` - Email de destino (info@bg-autoparts.ao)

### 3. Estrutura de Arquivos para Upload

```
bg-autoparts/
├── index.html
├── styles.css
├── script.js
├── CONFIGURACAO-PRODUCAO.md
└── deploy-checklist.md
```

### 4. Configurações de Hospedagem

#### PetroHost - Plano Recomendado
- **Plano M**: 4.500 Kz/mês
- **Recursos**: 10GB, SSL, Email corporativo
- **Domínio sugerido**: bg-autoparts.ao

#### Configurações do Servidor
- [ ] Upload para pasta `public_html`
- [ ] Configurar SSL/HTTPS
- [ ] Criar email: info@bg-autoparts.ao
- [ ] Configurar redirecionamento www

### 5. Testes Pós-Deploy

#### Funcionalidade
- [ ] Site carrega corretamente
- [ ] Menu de navegação funciona
- [ ] Formulário envia emails
- [ ] Responsividade em mobile
- [ ] Velocidade de carregamento

#### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

#### SEO Básico
- [ ] Title tags configuradas
- [ ] Meta descriptions
- [ ] Alt text nas imagens
- [ ] Sitemap.xml (opcional)

### 6. Monitoramento

#### EmailJS
- Limite gratuito: 200 emails/mês
- Monitorar uso no dashboard
- Upgrade se necessário

#### Performance
- Velocidade de carregamento
- Uptime do servidor
- Funcionamento do formulário

### 7. Backup e Segurança

- [ ] Backup dos arquivos originais
- [ ] Credenciais seguras
- [ ] SSL ativo
- [ ] Emails de teste funcionando

---

## 📋 Comandos Úteis

### Validação HTML
```bash
# Usar validador online: https://validator.w3.org/
```

### Teste de Performance
```bash
# Usar: https://pagespeed.web.dev/
```

### Teste de Responsividade
```bash
# Usar: https://responsivedesignchecker.com/
```

---

## ✅ Status do Deploy

- [ ] Arquivos preparados
- [ ] EmailJS configurado
- [ ] Hospedagem contratada
- [ ] Upload realizado
- [ ] Testes concluídos
- [ ] Site em produção

**Data do Deploy:** ___________  
**URL do Site:** ___________  
**Responsável:** ___________