# Configuração do Sanity CMS para Portfolio

Este guia explica como configurar e usar o Sanity CMS para gerenciar o conteúdo do seu portfolio Angular.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Sanity.io](https://www.sanity.io/)
- Portfolio Angular funcionando

## 🚀 Configuração Inicial

### 1. Criar Projeto no Sanity

1. Acesse [sanity.io](https://www.sanity.io/) e faça login
2. Clique em "Create new project"
3. Escolha um nome para o projeto (ex: "portfolio-cms")
4. Selecione o dataset "production"
5. Anote o **Project ID** que será gerado

### 2. Configurar o Projeto Local

1. **Atualizar configurações do Sanity:**
   
   Edite o arquivo `sanity.config.js` e substitua:
   ```javascript
   projectId: 'your-project-id', // Substitua pelo seu Project ID
   ```
   
   Edite o arquivo `src/app/services/sanity.service.ts` e substitua:
   ```typescript
   projectId: 'your-project-id', // Substitua pelo seu Project ID
   ```

2. **Fazer login no Sanity CLI:**
   ```bash
   npx sanity login
   ```

3. **Inicializar o Studio:**
   ```bash
   npm run sanity:start
   ```
   
   O Sanity Studio será aberto em `http://localhost:3333`

## 📝 Usando o CMS

### Acessar o Studio

```bash
npm run sanity:start
```

O Studio será aberto em `http://localhost:3333` onde você pode:

- ✅ Gerenciar projetos
- ✅ Atualizar biografia
- ✅ Adicionar/editar habilidades
- ✅ Configurar informações de contato

### Estrutura do Conteúdo

#### 📁 **Projects (Projetos)**
- **Title**: Nome do projeto
- **Slug**: URL amigável (gerada automaticamente)
- **Description**: Descrição breve
- **Content**: Conteúdo rico com texto e imagens
- **Main Image**: Imagem principal
- **Gallery**: Galeria de imagens
- **Technologies**: Array de tecnologias usadas
- **Live URL**: Link do projeto em produção
- **GitHub URL**: Link do repositório
- **Featured**: Marcar como projeto em destaque
- **Category**: Categoria (web, mobile, desktop, backend, other)

#### 👤 **Biography (Biografia)**
- **Name**: Nome completo
- **Professional Title**: Título profissional
- **Description**: Descrição pessoal
- **Profile Image**: Foto de perfil
- **Resume**: Arquivo PDF do currículo
- **Education**: Formação acadêmica
- **Certifications**: Certificações
- **Soft Skills**: Habilidades interpessoais

#### 🛠️ **Skills (Habilidades)**
- **Skill Name**: Nome da habilidade
- **Category**: Categoria (frontend, backend, database, etc.)
- **Level**: Nível de 1 a 100
- **Icon**: Ícone da tecnologia

#### 📞 **Contact (Contato)**
- **Email**: Email principal
- **Phone**: Telefone (opcional)
- **Location**: Localização
- **Social Links**: Links das redes sociais

## 🔄 Migração de Dados

O sistema inclui um adaptador que permite:

1. **Usar dados locais** quando o Sanity não está configurado
2. **Migrar gradualmente** para o Sanity
3. **Fallback automático** em caso de erro

### Alternar entre Fontes de Dados

No `DataAdapterService`, você pode alternar entre Sanity e dados locais:

```typescript
// Para usar Sanity
dataAdapter.toggleDataSource(true);

// Para usar dados locais
dataAdapter.toggleDataSource(false);
```

## 🌐 Deploy do Studio

### Deploy Gratuito no Sanity

```bash
npm run sanity:deploy
```

Isso criará uma URL pública para o seu Studio (ex: `https://portfolio-cms.sanity.studio`)

### Configurar Domínio Personalizado

1. No painel do Sanity, vá em "Settings" > "API"
2. Adicione seu domínio em "CORS Origins"
3. Configure o domínio personalizado se desejar

## 🔐 Configurações de Segurança

### Tokens de API

Para operações de escrita (criar/editar/deletar), você precisa de um token:

1. No painel do Sanity, vá em "Settings" > "API" > "Tokens"
2. Crie um novo token com permissões de "Editor"
3. Adicione o token no `sanity.service.ts`:

```typescript
token: 'seu-token-aqui' // Para operações de escrita
```

### CORS

Configure os domínios permitidos em "Settings" > "API" > "CORS Origins":
- `http://localhost:4200` (desenvolvimento)
- `https://seu-portfolio.com` (produção)

## 📱 Comandos Úteis

```bash
# Iniciar o Studio
npm run sanity:start

# Build do Studio
npm run sanity:build

# Deploy do Studio
npm run sanity:deploy

# Verificar configuração
npx sanity check

# Gerenciar datasets
npx sanity dataset list
npx sanity dataset create staging
```

## 🎨 Personalização do Studio

O arquivo `sanity.config.js` permite personalizar:

- **Estrutura de navegação**
- **Campos personalizados**
- **Validações**
- **Previews**
- **Plugins adicionais**

## 🔧 Troubleshooting

### Problemas Comuns

1. **"Project not found"**
   - Verifique se o Project ID está correto
   - Confirme se você tem acesso ao projeto

2. **CORS errors**
   - Adicione seu domínio nas configurações de CORS
   - Verifique se a URL está correta

3. **Token inválido**
   - Regenere o token no painel do Sanity
   - Verifique as permissões do token

### Logs e Debug

Para debug, ative logs no console:

```typescript
// No sanity.service.ts
useCdn: false, // Para dados sempre frescos
```

## 📚 Recursos Adicionais

- [Documentação Oficial do Sanity](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🎯 Próximos Passos

1. Configure seu Project ID
2. Inicie o Studio e adicione conteúdo
3. Teste a integração com o Angular
4. Configure o deploy do Studio
5. Adicione validações personalizadas se necessário

---

**Dica**: Comece adicionando um projeto simples no Studio para testar a integração antes de migrar todos os dados!