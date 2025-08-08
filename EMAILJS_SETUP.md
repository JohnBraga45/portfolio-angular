# Configuração do EmailJS para Formulário de Contato

Para que o formulário de contato funcione e envie e-mails para `dionisiobraga551@gmail.com`, você precisa configurar o EmailJS. Siga os passos abaixo:

## 1. Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Confirme seu e-mail

## 2. Configurar Serviço de E-mail

1. No dashboard do EmailJS, vá para "Email Services"
2. Clique em "Add New Service"
3. Escolha seu provedor de e-mail (Gmail, Outlook, etc.)
4. Configure com suas credenciais
5. Anote o **Service ID** (ex: `service_xxxxxxx`)

## 3. Criar Template de E-mail

1. Vá para "Email Templates"
2. Clique em "Create New Template"
3. Configure o template com os seguintes campos:

**Template Settings:**
- Template Name: `Contact Form`
- Template ID: `template_contact` (ou anote o ID gerado)

**Template Content:**

**Subject:** {{subject}} - Mensagem do Portfolio

**HTML Content:**
```html
<div 
  style=" 
    font-family: system-ui, sans-serif, Arial; 
    font-size: 14px; 
    color: #333; 
    padding: 14px 8px; 
    background-color: #f5f5f5; 
  " 
> 
  <div style="max-width: 600px; margin: auto; background-color: #fff"> 
    <div style="border-top: 6px solid #458500; padding: 16px"> 
      <span 
        style=" 
          font-size: 18px; 
          vertical-align: middle; 
          color: #458500;
        " 
      > 
        <strong>📧 Nova Mensagem do Portfolio</strong> 
      </span> 
    </div> 
    <div style="padding: 0 16px"> 
      <p style="font-size: 16px; margin-bottom: 20px;">Você recebeu uma nova mensagem através do formulário de contato do seu portfolio.</p> 
      
      <div 
        style=" 
          background-color: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        " 
      > 
        <table style="width: 100%; border-collapse: collapse"> 
          <tr> 
            <td style="padding: 8px 0; font-weight: bold; color: #458500; width: 100px;">Nome:</td> 
            <td style="padding: 8px 0;">{{from_name}}</td> 
          </tr> 
          <tr> 
            <td style="padding: 8px 0; font-weight: bold; color: #458500;">E-mail:</td> 
            <td style="padding: 8px 0;">{{from_email}}</td> 
          </tr> 
          <tr> 
            <td style="padding: 8px 0; font-weight: bold; color: #458500;">Assunto:</td> 
            <td style="padding: 8px 0;">{{subject}}</td> 
          </tr> 
        </table>
      </div>
      
      <div 
        style=" 
          border-left: 4px solid #458500;
          padding: 16px;
          background-color: #f8f9fa;
          margin-bottom: 20px;
        " 
      > 
        <h3 style="margin: 0 0 10px 0; color: #333;">Mensagem:</h3>
        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
      </div>
      
      <div style="padding: 20px 0; border-top: 1px solid #eee; text-align: center;"> 
        <p style="margin: 0; color: #666; font-size: 12px;">
          Esta mensagem foi enviada através do formulário de contato do portfolio.<br>
          Para responder, utilize o e-mail: {{from_email}}
        </p>
      </div>
    </div> 
  </div> 
</div>
```

**Settings:**
- To Email: `dionisiobraga551@gmail.com`
- From Name: `{{from_name}}`
- Reply To: `{{from_email}}`

4. Teste o template e salve

## 4. Obter Chave Pública

1. Vá para "Account" > "General"
2. Copie sua **Public Key**

## 5. Atualizar Configurações no Código

Edite o arquivo `src/app/services/email.service.ts` e substitua:

```typescript
private serviceId = 'SEU_SERVICE_ID_AQUI'; // Ex: service_xxxxxxx
private templateId = 'template_contact'; // Ou o ID do seu template
private publicKey = 'SUA_PUBLIC_KEY_AQUI'; // Sua chave pública
```

## 6. Testar o Formulário

1. Inicie o servidor: `ng serve`
2. Acesse o formulário de contato
3. Preencha e envie uma mensagem de teste
4. Verifique se o e-mail chegou em `dionisiobraga551@gmail.com`

## Limites da Conta Gratuita

- 200 e-mails por mês
- Perfeito para um portfolio pessoal

## Alternativa: Backend Próprio

Se preferir usar um backend próprio, o serviço já inclui o método `sendEmailViaBackend()` que você pode implementar com Node.js, PHP, Python, etc.

## Troubleshooting

- **E-mails não chegam**: Verifique spam/lixo eletrônico
- **Erro 403**: Verifique se a Public Key está correta
- **Erro 404**: Verifique se Service ID e Template ID estão corretos
- **CORS Error**: EmailJS funciona apenas em HTTPS em produção

## Segurança

- A Public Key pode ser exposta no frontend
- Configure rate limiting no EmailJS para evitar spam
- Considere adicionar reCAPTCHA para proteção extra