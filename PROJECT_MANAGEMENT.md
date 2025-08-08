# 📁 Gerenciamento de Projetos do Portfólio

## 🎯 Visão Geral

Este guia explica como adicionar, editar e gerenciar projetos no seu portfólio Angular de forma eficiente e organizada.

---

## 🚀 Métodos para Adicionar Projetos

### 1. **Script Automatizado** ⭐ (Recomendado)

```bash
# Executar o assistente interativo
node scripts/add-project.js
```

**Vantagens:**
- ✅ Interface interativa
- ✅ Validação automática
- ✅ Gera código pronto
- ✅ Previne erros

### 2. **Template Manual**

1. Abra `src/app/templates/project-template.ts`
2. Copie o `PROJECT_TEMPLATE`
3. Preencha os dados
4. Adicione ao `data.service.ts`

### 3. **Edição Direta**

Edite diretamente o array de projetos em `src/app/services/data.service.ts`

---

## 📋 Estrutura de um Projeto

```typescript
interface Project {
  _id: string;              // ⚠️ OBRIGATÓRIO: ID único
  title: string;            // ⚠️ OBRIGATÓRIO: Nome do projeto
  slug: { current: string }; // ⚠️ OBRIGATÓRIO: URL amigável
  description: string;      // ⚠️ OBRIGATÓRIO: Descrição breve
  content: string;          // ⚠️ OBRIGATÓRIO: Descrição detalhada
  image: { asset: { url: string } }; // ⚠️ OBRIGATÓRIO: Imagem principal
  gallery?: any[];          // 🔧 OPCIONAL: Galeria de imagens
  technologies: string[];   // ⚠️ OBRIGATÓRIO: Array de tecnologias
  liveUrl?: string;         // 🔧 OPCIONAL: URL do projeto
  githubUrl?: string;       // 🔧 OPCIONAL: URL do repositório
  featured: boolean;        // 🔧 OPCIONAL: Destacar na home
  category: string;         // ⚠️ OBRIGATÓRIO: Categoria
}
```

---

## 🗂️ Categorias Disponíveis

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| `web` | Aplicações web | Sites, SPAs, PWAs |
| `mobile` | Apps móveis | React Native, Flutter |
| `desktop` | Apps desktop | Electron, .NET |
| `api` | APIs e serviços | REST, GraphQL |
| `library` | Bibliotecas | NPM packages, SDKs |
| `game` | Jogos | Unity, HTML5 games |
| `ai-ml` | IA e ML | Python, TensorFlow |

---

## 🛠️ Tecnologias Populares

### Frontend
- Angular, React, Vue.js
- TypeScript, JavaScript
- HTML5, CSS3, Sass
- Tailwind CSS, Bootstrap

### Backend
- Node.js, Express, NestJS
- Python, Django, Flask
- Java, Spring Boot
- C#, .NET

### Database
- MongoDB, PostgreSQL
- MySQL, Firebase
- Redis, Supabase

### Cloud & Deploy
- Vercel, Netlify, Heroku
- AWS, Google Cloud, Azure
- Docker, Kubernetes

---

## 📸 Gerenciamento de Imagens

### Estrutura de Pastas
```
src/assets/
├── projects/
│   ├── projeto-1.jpg
│   ├── projeto-2.jpg
│   └── galeria/
│       ├── projeto-1-1.jpg
│       ├── projeto-1-2.jpg
│       └── projeto-1-3.jpg
└── profile-photo.svg
```

### Especificações de Imagem
- **Formato**: JPG, PNG, WebP
- **Tamanho**: 400x300px (proporção 4:3)
- **Peso**: Máximo 500KB
- **Qualidade**: 80-90%

### Otimização
```bash
# Usando ImageMagick
magick input.jpg -resize 400x300^ -gravity center -extent 400x300 -quality 85 output.jpg

# Usando online: tinypng.com, squoosh.app
```

---

## 🔄 Workflow Completo

### 1. **Preparação**
```bash
# Criar branch para novo projeto
git checkout -b feature/projeto-novo

# Instalar dependências (se necessário)
npm install
```

### 2. **Adicionar Projeto**
```bash
# Método 1: Script automatizado
node scripts/add-project.js

# Método 2: Template manual
# Editar src/app/templates/project-template.ts
```

### 3. **Adicionar Imagens**
```bash
# Copiar imagens para assets
cp projeto-novo.jpg src/assets/projects/

# Otimizar se necessário
# Usar ferramentas online ou ImageMagick
```

### 4. **Atualizar Código**
```bash
# Adicionar projeto ao data.service.ts
# Copiar código gerado pelo script ou template
```

### 5. **Testar Localmente**
```bash
# Iniciar servidor de desenvolvimento
ng serve

# Verificar:
# - Projeto aparece na lista
# - Imagens carregam corretamente
# - Links funcionam
# - Responsividade OK
```

### 6. **Deploy**
```bash
# Commit das mudanças
git add .
git commit -m "feat: adicionar projeto [NOME]"

# Push para GitHub
git push origin feature/projeto-novo

# Criar Pull Request
# Merge para main
# Deploy automático via Vercel/Netlify
```

---

## 📊 Scripts Úteis

```bash
# Adicionar novo projeto
npm run add-project

# Validar projetos
npm run validate-projects

# Otimizar imagens
npm run optimize-images

# Build de produção
npm run build:prod

# Preview local do build
npm run preview

# Análise do bundle
npm run analyze
```

---

## ✅ Checklist de Qualidade

### Antes de Adicionar
- [ ] Projeto está finalizado ou em estado apresentável
- [ ] Imagens estão otimizadas
- [ ] Links estão funcionando
- [ ] Descrição está clara e concisa
- [ ] Tecnologias estão corretas

### Após Adicionar
- [ ] Projeto aparece na lista
- [ ] Imagem carrega corretamente
- [ ] Links externos funcionam
- [ ] Página de detalhes está OK
- [ ] Responsividade funciona
- [ ] Performance está boa

### Antes do Deploy
- [ ] Teste em diferentes navegadores
- [ ] Teste em dispositivos móveis
- [ ] Verificar console por erros
- [ ] Validar HTML/CSS
- [ ] Testar velocidade de carregamento

---

## 🐛 Troubleshooting

### Imagem não carrega
```typescript
// Verificar caminho da imagem
image: {
  asset: {
    url: '/assets/projects/nome-correto.jpg' // ✅
    // url: 'assets/projects/nome-correto.jpg' // ❌ sem barra inicial
  }
}
```

### Projeto não aparece
```typescript
// Verificar se está no array de projetos
const mockProjects: Project[] = [
  // ... outros projetos
  novoProject, // ✅ Adicionar aqui
];
```

### Erro de compilação
```bash
# Verificar sintaxe TypeScript
ng lint

# Verificar tipos
ng build --configuration production
```

### Performance lenta
```bash
# Analisar bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/portfolio-angular/stats.json

# Otimizar imagens
# Usar lazy loading
# Minificar código
```

---

## 📈 Métricas e Analytics

### Google Analytics
- Configurar eventos para cliques em projetos
- Monitorar páginas mais visitadas
- Acompanhar tempo de permanência

### Core Web Vitals
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

### Ferramentas
- Google PageSpeed Insights
- Lighthouse
- GTmetrix
- WebPageTest

---

## 🔮 Futuras Melhorias

### Funcionalidades Planejadas
- [ ] Sistema de tags
- [ ] Filtros avançados
- [ ] Busca por tecnologia
- [ ] Ordenação personalizada
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Blog integrado

### Integrações
- [ ] CMS headless (Strapi, Contentful)
- [ ] GitHub API para projetos automáticos
- [ ] Google Analytics 4
- [ ] Newsletter
- [ ] Comentários (Disqus)

---

## 📞 Suporte

**Dúvidas ou problemas?**
- 📧 Email: dionisiobraga551&#64;gmail.com
- 🐛 Issues: GitHub Issues
- 📖 Docs: Consultar documentação oficial

---

**🎯 Mantenha seu portfólio sempre atualizado!**