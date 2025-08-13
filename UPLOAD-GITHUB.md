# 📤 Como Fazer Upload do Projeto para o GitHub

## 🎯 Pré-requisitos

✅ **Repositório Git já inicializado** (feito)
✅ **Arquivos commitados** (feito)
✅ **Conta no GitHub** (necessário)

## 🚀 Passos para Upload

### 1. Criar Repositório no GitHub

1. Acesse [GitHub.com](https://github.com)
2. Faça login na sua conta
3. Clique no botão **"+"** no canto superior direito
4. Selecione **"New repository"**
5. Configure o repositório:
   - **Repository name:** `bg-autoparts`
   - **Description:** `Landing page profissional para BG-autoparts - Importação de peças automóveis`
   - **Visibility:** Public ou Private (sua escolha)
   - ❌ **NÃO** marque "Add a README file" (já temos um)
   - ❌ **NÃO** adicione .gitignore (já temos um)
   - ❌ **NÃO** escolha uma licença (já configurado)
6. Clique em **"Create repository"**

### 2. Conectar Repositório Local ao GitHub

Após criar o repositório no GitHub, você verá uma página com instruções. Use os comandos abaixo:

```bash
# Adicionar o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/bg-autoparts.git

# Verificar se foi adicionado corretamente
git remote -v

# Fazer o primeiro push
git push -u origin master
```

**⚠️ Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub**

### 3. Comandos Completos

Execute estes comandos no terminal (PowerShell) dentro da pasta do projeto:

```powershell
# 1. Adicionar repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/bg-autoparts.git

# 2. Verificar conexão
git remote -v

# 3. Fazer upload dos arquivos
git push -u origin master
```

### 4. Autenticação

Se for solicitado login:

**Opção 1: Token de Acesso (Recomendado)**
1. Vá em GitHub → Settings → Developer settings → Personal access tokens
2. Gere um novo token com permissões de repositório
3. Use o token como senha quando solicitado

**Opção 2: GitHub CLI**
```bash
# Instalar GitHub CLI (se não tiver)
winget install GitHub.cli

# Fazer login
gh auth login

# Criar e fazer push do repositório
gh repo create bg-autoparts --public --source=. --remote=origin --push
```

## 🔧 Comandos Úteis

### Verificar Status
```bash
git status
git log --oneline
git remote -v
```

### Fazer Updates Futuros
```bash
# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das mudanças"

# Enviar para GitHub
git push
```

### Clonar em Outro Local
```bash
git clone https://github.com/SEU_USUARIO/bg-autoparts.git
```

## 📋 Checklist de Verificação

- [ ] Repositório criado no GitHub
- [ ] Remote origin adicionado
- [ ] Push realizado com sucesso
- [ ] Arquivos visíveis no GitHub
- [ ] README.md sendo exibido corretamente
- [ ] .gitignore funcionando (arquivos sensíveis não enviados)

## 🌐 Configurar GitHub Pages (Opcional)

Para hospedar o site gratuitamente no GitHub:

1. Vá ao repositório no GitHub
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: master / (root)
5. Save

Seu site estará disponível em:
`https://SEU_USUARIO.github.io/bg-autoparts`

## 🆘 Problemas Comuns

### Erro de Autenticação
```bash
# Configurar credenciais globalmente
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

### Repositório já existe
```bash
# Remover remote existente
git remote remove origin

# Adicionar novamente
git remote add origin https://github.com/SEU_USUARIO/bg-autoparts.git
```

### Forçar push (cuidado!)
```bash
git push --force-with-lease origin master
```

## 📞 Suporte

Se encontrar problemas:
1. Verifique a documentação do GitHub
2. Use `git --help` para ajuda
3. Consulte [GitHub Docs](https://docs.github.com)

---

**✅ Projeto pronto para upload!**  
*Todos os arquivos estão commitados e prontos para serem enviados ao GitHub.*