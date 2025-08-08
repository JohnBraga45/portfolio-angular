# 🚀 Portfolio Angular

Um portfólio moderno e responsivo desenvolvido com Angular 17, TailwindCSS e TypeScript.

## ✨ Características

- 📱 **Responsivo**: Design adaptável para todos os dispositivos
- 🎨 **Moderno**: Interface limpa com TailwindCSS
- ⚡ **Rápido**: Otimizado para performance
- 📧 **Contato**: Formulário funcional com EmailJS
- 🔧 **Fácil de personalizar**: Estrutura modular e bem documentada
- 🚀 **Deploy automatizado**: CI/CD com GitHub Actions

## 🛠️ Tecnologias

- **Frontend**: Angular 17, TypeScript
- **Estilização**: TailwindCSS, CSS3
- **Email**: EmailJS
- **Build**: Angular CLI
- **Deploy**: Vercel, Netlify, GitHub Pages
- **CI/CD**: GitHub Actions

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

### Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd portfolio-angular

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm start                 # Servidor de desenvolvimento
npm run watch            # Build com watch mode

# Build
npm run build            # Build para desenvolvimento
npm run build:prod       # Build para produção
npm run preview          # Preview da build de produção

# Qualidade de código
npm test                 # Executar testes
npm run lint             # Verificar código
npm run format           # Formatar código
npm run analyze          # Analisar bundle

# Gerenciamento de projetos
npm run add-project      # Adicionar novo projeto (interativo)

# Deploy
npm run deploy:vercel    # Deploy no Vercel
npm run deploy:netlify   # Deploy no Netlify
```

## 🎯 Adicionando Novos Projetos

### Método 1: Script Automatizado (Recomendado)

```bash
npm run add-project
```

O script irá guiá-lo através de um processo interativo para adicionar um novo projeto.

### Método 2: Manual

1. Abra `src/app/services/data.service.ts`
2. Adicione seu projeto ao array `projects`:

```typescript
{
  id: 'projeto-unico-id',
  title: 'Nome do Projeto',
  description: 'Descrição detalhada do projeto...',
  longDescription: 'Descrição mais longa e detalhada...',
  image: 'assets/images/projeto.jpg',
  technologies: ['Angular', 'TypeScript', 'TailwindCSS'],
  category: 'web',
  githubUrl: 'https://github.com/usuario/projeto',
  liveUrl: 'https://projeto.vercel.app',
  featured: false,
  status: 'completed',
  startDate: '2024-01',
  endDate: '2024-02',
  slug: 'projeto-slug'
}
```

3. Adicione a imagem em `src/assets/images/`

## 🌐 Deploy

### Vercel (Recomendado)

1. **Configuração inicial**:
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**:
   ```bash
   npm run deploy:vercel
   ```

3. **Deploy automático**: Push para a branch `main` ativa o deploy automático via GitHub Actions

### Netlify

1. **Via CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   npm run deploy:netlify
   ```

2. **Via interface web**: Conecte seu repositório GitHub no [Netlify](https://netlify.com)

### GitHub Pages

1. Ative GitHub Pages nas configurações do repositório
2. Push para `main` ativa o deploy automático
3. Acesse em `https://usuario.github.io/repositorio`

## 🔧 Configuração

### EmailJS (Formulário de Contato)

1. Crie uma conta em [EmailJS](https://emailjs.com)
2. Configure um serviço de email
3. Atualize as configurações em `src/app/services/email.service.ts`:

```typescript
private serviceId = 'seu_service_id';
private templateId = 'seu_template_id';
private publicKey = 'sua_public_key';
```

### Personalização

- **Cores**: Edite `tailwind.config.js`
- **Informações pessoais**: Edite `src/app/services/data.service.ts`
- **Componentes**: Modifique os arquivos em `src/app/components/`
- **Estilos**: Edite os arquivos `.scss` ou use classes TailwindCSS

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/          # Componentes da aplicação
│   │   ├── header/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── contact/
│   │   └── footer/
│   ├── services/            # Serviços (dados, email)
│   ├── templates/           # Templates para novos projetos
│   └── app.component.*
├── assets/                  # Imagens e recursos estáticos
├── styles/                  # Estilos globais
scripts/                     # Scripts de automação
├── add-project.js          # Script para adicionar projetos
.github/workflows/          # GitHub Actions
├── deploy.yml              # Workflow de deploy
docs/                       # Documentação
├── HOSTING_GUIDE.md        # Guia de hospedagem
├── PROJECT_MANAGEMENT.md   # Gerenciamento de projetos
vercel.json                 # Configuração do Vercel
```

## 🔍 Troubleshooting

### Problemas Comuns

1. **Erro de build**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Problemas com EmailJS**:
   - Verifique as credenciais
   - Confirme se o template está configurado
   - Teste em ambiente local

3. **Deploy falha**:
   - Verifique se o build local funciona
   - Confirme as variáveis de ambiente
   - Verifique os logs do deploy

### Logs e Debug

```bash
# Build com logs detalhados
npm run build:prod -- --verbose

# Analisar bundle
npm run analyze

# Verificar dependências
npm audit
```

## 📊 Performance

- **Lighthouse Score**: 90+ em todas as métricas
- **Bundle Size**: < 500KB (gzipped)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

- **Email**: dionisiobraga551&#64;gmail.com
- **LinkedIn**: [Seu LinkedIn]
- **GitHub**: [Seu GitHub]

---

⭐ **Gostou do projeto? Deixe uma estrela!** ⭐

## 🚀 Próximos Passos

- [ ] Adicionar mais animações
- [ ] Implementar tema escuro/claro
- [ ] Adicionar blog/artigos
- [ ] Integrar com CMS
- [ ] Adicionar PWA
- [ ] Implementar i18n (internacionalização)
- [ ] Adicionar analytics
- [ ] Otimizar SEO

## 📚 Recursos Úteis

- [Angular Documentation](https://angular.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

**Desenvolvido com ❤️ e Angular**
