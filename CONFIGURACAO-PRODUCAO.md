# Configuração para Produção - BG-autoparts

Este guia contém todas as instruções necessárias para configurar o site BG-autoparts para produção, incluindo a integração com EmailJS e hospedagem na PetroHost.

## 📧 Configuração do EmailJS

### Passo 1: Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com](https://www.emailjs.com)
2. Clique em "Create Free Account"
3. Faça o registro com seu email
4. Confirme sua conta através do email recebido

### Passo 2: Conectar Serviço de Email

1. No painel do EmailJS, vá para **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Para Gmail:
   - Clique em "Connect Account"
   - Faça login com sua conta Gmail
   - Autorize o EmailJS
5. Defina um **Service ID** (ex: `gmail_service`)
6. Clique em **Create Service**

### Passo 3: Criar Template de Email

1. Vá para **Email Templates**
2. Clique em **Create New Template**
3. Configure o template:

**Configurações do Template:**
```
Template Name: BG-autoparts Contact Form
Template ID: bg_contact_template
```

**Assunto do Email:**
```
Nova solicitação de orçamento - {{car_brand}}
```

**Conteúdo do Email:**
```html
<h2>Nova solicitação de orçamento</h2>

<p><strong>Dados do cliente:</strong></p>
<ul>
  <li><strong>Nome:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Telefone:</strong> {{phone}}</li>
  <li><strong>Marca do veículo:</strong> {{car_brand}}</li>
</ul>

<p><strong>Mensagem:</strong></p>
<p>{{message}}</p>

<hr>
<p><em>Esta mensagem foi enviada através do formulário de contato do site BG-autoparts.</em></p>
```

4. Clique em **Save**

### Passo 4: Obter Credenciais

1. Vá para **Account** > **General**
2. Copie sua **Public Key**
3. Anote o **Service ID** criado no Passo 2
4. Anote o **Template ID** criado no Passo 3

### Passo 5: Configurar o Site

1. Abra o arquivo `script.js`
2. Localize a seção `EMAILJS_CONFIG`
3. Substitua os valores:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'sua_public_key_aqui',
    serviceId: 'seu_service_id_aqui',
    templateId: 'seu_template_id_aqui'
};
```

## 🌐 Hospedagem na PetroHost

### Informações da PetroHost

**Site:** [https://petrohost.ao](https://petrohost.ao)
**Suporte:** 24/7
**Localização:** Angola

### Planos Recomendados

Para o site BG-autoparts, recomendamos:

**Plano M** - 4.500 Kz/mês
- 10GB de armazenamento
- Largura de banda ilimitada
- 10 contas de email
- 5 bancos de dados MySQL
- SSL gratuito
- Integração WordPress
- Suporte 24/7

### Processo de Hospedagem

#### Passo 1: Contratar Hospedagem

1. Acesse [https://petrohost.ao](https://petrohost.ao)
2. Escolha o plano desejado
3. Registre um domínio (ex: `bg-autoparts.ao`)
4. Complete o pagamento
5. Aguarde as credenciais de acesso por email

#### Passo 2: Configurar cPanel

1. Acesse o cPanel através do link fornecido
2. Faça login com as credenciais recebidas
3. Localize o **File Manager**

#### Passo 3: Upload dos Arquivos

1. No File Manager, navegue para a pasta `public_html`
2. Delete os arquivos padrão (se houver)
3. Faça upload de todos os arquivos do site:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `emailjs-config.js` (opcional)
   - Pasta `images/` (se houver)

#### Passo 4: Configurar Email Corporativo

1. No cPanel, vá para **Email Accounts**
2. Crie a conta: `info@bg-autoparts.ao`
3. Configure uma senha segura
4. Configure o email no EmailJS (se necessário)

#### Passo 5: Configurar SSL

1. No cPanel, vá para **SSL/TLS**
2. Ative o SSL gratuito
3. Force HTTPS para todo o site

## ✅ Checklist de Produção

### Antes do Deploy

- [ ] EmailJS configurado e testado
- [ ] Todas as credenciais atualizadas
- [ ] Formulário de contato funcionando
- [ ] Site responsivo em todos os dispositivos
- [ ] Imagens otimizadas
- [ ] Links funcionando corretamente

### Após o Deploy

- [ ] Site acessível via domínio
- [ ] HTTPS funcionando
- [ ] Formulário enviando emails
- [ ] Email corporativo configurado
- [ ] Teste em diferentes navegadores
- [ ] Teste em dispositivos móveis

## 🔧 Manutenção

### Monitoramento

- Verifique regularmente se os emails estão sendo recebidos
- Monitore o limite de emails do EmailJS (200/mês no plano gratuito)
- Faça backup regular dos arquivos

### Atualizações

- Mantenha o EmailJS SDK atualizado
- Monitore a performance do site
- Atualize conteúdo conforme necessário

## 📞 Suporte

### EmailJS
- Documentação: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Suporte: através do painel de controle

### PetroHost
- Suporte 24/7
- WhatsApp, Email e Telefone
- Base de conhecimento no site

## 💡 Dicas Importantes

1. **Segurança:** Nunca exponha suas credenciais do EmailJS em repositórios públicos
2. **Backup:** Faça backup regular de todos os arquivos
3. **Performance:** Monitore a velocidade de carregamento do site
4. **SEO:** Configure meta tags e descrições apropriadas
5. **Analytics:** Considere adicionar Google Analytics para monitoramento

---

**Desenvolvido para BG-autoparts**  
*Benilson Gunza - Peças Gunza automóvel*