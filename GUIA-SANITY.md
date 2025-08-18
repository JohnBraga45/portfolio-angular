# Guia de Configuração do Sanity CMS

## Problema Atual
O Sanity CMS está configurado corretamente, mas não possui dados. Por isso a aplicação está usando dados locais como fallback.

## Soluções

### 1. Adicionar Dados Manualmente no Sanity Studio

1. **Acesse o Sanity Studio**: http://localhost:3333
2. **Faça login** com sua conta GitHub (já configurado)
3. **Crie os seguintes documentos**:

#### Biografia (Bio)
- Clique em "Biography"
- Preencha os campos:
  - Nome
  - Título profissional
  - Descrição
  - Educação
  - Experiência

#### Projetos (Projects)
- Clique em "Projects"
- Crie novos projetos com:
  - Título
  - Slug (URL amigável)
  - Descrição
  - Conteúdo
  - Tecnologias
  - URLs (live e GitHub)
  - Marcar como "Featured" se destacado
  - Categoria
  - Data de publicação

#### Habilidades (Skills)
- Clique em "Skills"
- Adicione suas habilidades com:
  - Nome da habilidade
  - Categoria
  - Nível (0-100)
  - Descrição

#### Contato (Contact)
- Clique em "Contact"
- Preencha:
  - Email
  - Telefone
  - Localização
  - Links sociais

### 2. Usar Dados de Exemplo

O arquivo `sanity-sample-data.js` contém dados de exemplo que você pode usar como referência para criar seus documentos no Sanity Studio.

### 3. Configurar Token de API (Recomendado)

Para resolver problemas de conexão e permitir operações de escrita, configure um token de API:

#### Obter Token no Sanity Studio:
1. Acesse: https://www.sanity.io/manage/personal/project/0ty1qfst
2. Vá em **API** → **Tokens**
3. Clique em **Add API token**
4. Nome: "Portfolio Token"
5. Permissões: **Editor** (para leitura e escrita)
6. Copie o token gerado

#### Configurar no Projeto:
1. Abra `src/environments/environment.ts`
2. Descomente e adicione o token:

```typescript
export const environment = {
  production: false,
  sanity: {
    projectId: '0ty1qfst',
    dataset: 'production',
    apiVersion: '2023-05-03',
    token: 'seu_token_aqui' // Cole aqui o token obtido
  }
};
```

3. No arquivo `src/app/services/sanity.service.ts`, descomente a linha do token:

```typescript
token: environment.sanity.token
```

### 4. Verificar Conexão

Após adicionar dados:
1. Recarregue a aplicação Angular
2. Verifique se a mensagem "Sanity CMS não configurado" desaparece
3. Os dados do Sanity devem aparecer na aplicação

## Comandos Úteis

```bash
# Iniciar Sanity Studio
npm run sanity:dev

# Iniciar aplicação Angular
ng serve

# Verificar projetos no Sanity
npx sanity documents query "*[_type == 'project']" --project=0ty1qfst --dataset=production
```

## Status Atual

✅ Projeto Sanity configurado (ID: 0ty1qfst)  
✅ Sanity Studio funcionando (http://localhost:3333)  
✅ Usuário autenticado  
❌ Dados não criados ainda  
✅ Fallback para dados locais funcionando  

## Próximos Passos

1. Acesse o Sanity Studio
2. Crie alguns projetos de exemplo
3. Adicione sua biografia
4. Configure suas habilidades
5. Teste a integração na aplicação Angular

Após seguir estes passos, sua aplicação estará totalmente integrada com o Sanity CMS!