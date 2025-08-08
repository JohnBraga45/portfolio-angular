# 🚀 Guia Rápido de Deploy

Este guia te ajudará a fazer o deploy do seu portfólio em minutos!

## 🎯 Opção 1: Vercel (Mais Fácil)

### Passo 1: Preparar o projeto
```bash
# Certifique-se de que o build funciona
npm run build:prod
```

### Passo 2: Deploy via GitHub
1. Faça push do seu código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Conecte seu repositório GitHub
5. Vercel detectará automaticamente as configurações
6. Clique em "Deploy"

### Passo 3: Configurar domínio (opcional)
1. No dashboard do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruído

**✅ Pronto! Seu site estará online em segundos.**

---

## 🎯 Opção 2: Netlify

### Método A: Drag & Drop (Super Rápido)
1. Execute: `npm run build:prod`
2. Acesse [netlify.com](https://netlify.com)
3. Arraste a pasta `dist/portfolio-angular` para o Netlify
4. Pronto!

### Método B: Via GitHub (Recomendado)
1. Faça push para GitHub
2. No Netlify, clique "New site from Git"
3. Conecte seu repositório
4. Configurações automáticas (já configuradas no `netlify.toml`)
5. Deploy!

---

## 🎯 Opção 3: GitHub Pages

### Passo 1: Ativar GitHub Pages
1. Vá em Settings do seu repositório
2. Scroll até "Pages"
3. Source: "GitHub Actions"

### Passo 2: Push para main
```bash
git add .
git commit -m "Deploy setup"
git push origin main
```

**O GitHub Actions fará o deploy automaticamente!**

---

## 🔧 Comandos Úteis

```bash
# Testar build local
npm run build:prod
npm run preview

# Deploy direto (se CLI instalado)
npm run deploy:vercel
npm run deploy:netlify

# Adicionar novo projeto
npm run add-project

# Analisar performance
npm run analyze
```

---

## 🚨 Troubleshooting

### Build falha?
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build:prod
```

### Formulário de contato não funciona?
1. Configure EmailJS em `src/app/services/email.service.ts`
2. Adicione suas credenciais:
   - Service ID
   - Template ID
   - Public Key

### Imagens não carregam?
- Certifique-se de que estão em `src/assets/images/`
- Use caminhos relativos: `assets/images/projeto.jpg`

---

## 📊 Checklist Pré-Deploy

- [ ] Build funciona localmente (`npm run build:prod`)
- [ ] Todas as imagens estão em `assets/`
- [ ] EmailJS configurado (se usando formulário)
- [ ] Informações pessoais atualizadas em `data.service.ts`
- [ ] README.md atualizado
- [ ] Código commitado no GitHub

---

## 🎉 Pós-Deploy

### Configurar Analytics (Opcional)
1. Google Analytics
2. Vercel Analytics
3. Netlify Analytics

### Configurar Domínio Personalizado
1. Compre um domínio
2. Configure DNS para apontar para:
   - Vercel: `cname.vercel-dns.com`
   - Netlify: `seu-site.netlify.app`
   - GitHub Pages: `usuario.github.io`

### Monitoramento
- Configure alertas de uptime
- Monitore performance com Lighthouse
- Acompanhe métricas de visitantes

---

## 🚀 Deploy Automático

Com as configurações incluídas, todo push para `main` fará deploy automático em:
- ✅ Vercel
- ✅ Netlify  
- ✅ GitHub Pages

**Workflow:**
1. Desenvolva localmente
2. Teste com `npm start`
3. Commit e push
4. Deploy automático!

---

## 📞 Precisa de Ajuda?

- 📖 Documentação completa: `README.md`
- 🏠 Guia de hospedagem: `HOSTING_GUIDE.md`
- 📝 Gerenciar projetos: `PROJECT_MANAGEMENT.md`
- 🐛 Issues: Abra uma issue no GitHub

**Boa sorte com seu deploy! 🎉**