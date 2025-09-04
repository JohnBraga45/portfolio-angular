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
















import { MapPin, Mail, Globe, Linkedin, Code, Smartphone, Monitor, Zap, Star, Award } from 'lucide-react';
import { QRCodeGenerator } from './QRCodeGenerator';
import profileImage from 'figma:asset/5fb6ea65bfabdb3adaec161e753a41d6518d0a27.png';

export function CVPrintVersion() {
  return (
    <div className="bg-white text-black min-h-screen print:min-h-0">
      <div className="max-w-[210mm] mx-auto p-6 print:p-4">
        {/* Header with modern gradient design */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg mb-6 print:rounded-none">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Dionísio Braga - Frontend Developer Profile"
                className="w-20 h-20 rounded-lg object-cover border-2 border-white/20"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">DIONÍSIO BRAGA</h1>
                <div className="text-blue-100 text-lg mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    <span>Frontend Developer & AI Automation Specialist</span>
                  </div>
                </div>
              
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Setúbal, Portugal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>dionisiobraga551@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>dionisiobraga.vercel.app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>+351 920 797 741</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" />
                    <span>linkedin.com/in/dionísio-braga/</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="text-center ml-6">
              <QRCodeGenerator url="https://dionisiobraga.vercel.app" size={70} />
              <p className="text-xs mt-1 text-blue-100">Portfolio Online</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="col-span-2 space-y-5">
            {/* Professional Profile */}
            <section>
              <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">PROFESSIONAL PROFILE</h2>
              <p className="text-sm leading-relaxed text-gray-700 mb-4">
                Frontend Developer with <strong>4+ years experience</strong> in Angular and React.js, developing modern interfaces integrated with APIs. Expertise in UI/UX and systems integration. Currently specializing in <strong>Artificial Intelligence and Digital Automation</strong>, deepening skills in Generative AI, No-Code, and Digital Process Automation. Goal: combine frontend excellence with intelligent automation to deliver scalable, high-impact solutions.
              </p>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 p-2 rounded">
                  <div className="text-lg font-bold text-blue-600">4+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <div className="text-lg font-bold text-green-600">15+</div>
                  <div className="text-xs text-gray-600">Projects Delivered</div>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <div className="text-lg font-bold text-purple-600">40%</div>
                  <div className="text-xs text-gray-600">Performance Boost</div>
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <div className="text-lg font-bold text-orange-600">3</div>
                  <div className="text-xs text-gray-600">Tech Stacks</div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-4 text-blue-800">PROFESSIONAL EXPERIENCE</h2>
              
              <div className="space-y-4">
                <div className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-1"></div>
                  <h3 className="font-bold text-base">Frontend Developer</h3>
                  <p className="text-blue-600 text-sm font-medium">National Police of Angola (PNA) • Apr 2022 – Dec 2024</p>
                  <ul className="text-sm space-y-1 mt-2 text-gray-700">
                    <li>• Developed dynamic and responsive interfaces using <strong>Angular, HTML5, CSS3</strong></li>
                    <li>• Optimized <strong>REST API integrations</strong> and improved performance by 40%</li>
                    <li>• Collaborated with backend teams on enterprise-level applications</li>
                  </ul>
                </div>

                <div className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-1"></div>
                  <h3 className="font-bold text-base">Frontend Developer</h3>
                  <p className="text-blue-600 text-sm font-medium">FieldBright (Remote - Brazil) • Jan 2021 – Dec 2021</p>
                  <ul className="text-sm space-y-1 mt-2 text-gray-700">
                    <li>• Built high-performance UIs with <strong>Next.js and React.js</strong>, focusing on SEO</li>
                    <li>• Created reusable UI component library with <strong>styled-components</strong></li>
                    <li>• Implemented <strong>Redux state management</strong> for complex applications</li>
                  </ul>
                </div>

                <div className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-1"></div>
                  <h3 className="font-bold text-base">Web Developer (Freelance)</h3>
                  <p className="text-blue-600 text-sm font-medium">ConnectSolution • Jun 2020 – Dec 2020</p>
                  <ul className="text-sm space-y-1 mt-2 text-gray-700">
                    <li>• Delivered responsive web and mobile solutions with optimal UX</li>
                    <li>• Enhanced mobile experience using <strong>React Native</strong></li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Technical Skills */}
            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">TECH STACK</h2>
              
              <div className="space-y-3 text-xs">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold mb-2 flex items-center gap-1">
                    <Monitor className="w-3 h-3 text-blue-600" />
                    Frontend
                  </h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>React.js</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-14"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Angular</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-14"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>TypeScript</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-12"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Next.js</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold mb-2 flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-green-600" />
                    Mobile & Design
                  </h4>
                  <p className="text-xs">React Native, Figma, Responsive Design, Material UI, Bootstrap</p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold mb-2 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-orange-600" />
                    Tools & Performance
                  </h4>
                  <p className="text-xs">Git, Docker, CI/CD, Firebase, Jest, SEO optimization, Code splitting</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">EDUCATION</h2>
              <div className="space-y-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <h4 className="font-bold">AI & Digital Automation</h4>
                  <p className="text-blue-600">2025 - Ongoing</p>
                </div>
                <div>
                  <h4 className="font-bold">Computer Engineering</h4>
                  <p className="text-gray-600">Bachelor's • 2021-2024</p>
                </div>
                <div>
                  <h4 className="font-bold">Computer Science</h4>
                  <p className="text-gray-600">Technical • 2017-2021</p>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">CERTIFICATIONS</h2>
              <div className="space-y-2 text-xs">
                <div>• <strong>React & TypeScript</strong> - Udemy</div>
                <div>• <strong>Java Programming</strong> - RocketSeat</div>
                <div>• <strong>Full-Stack Development</strong> - Udemy</div>
              </div>
            </section>

            {/* Languages & Soft Skills */}
            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">LANGUAGES</h2>
              <div className="text-xs space-y-1">
                <div><strong>Portuguese:</strong> Native</div>
                <div><strong>English:</strong> Professional</div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">KEY PROJECTS</h2>
              <div className="space-y-2 text-xs">
                <div className="bg-blue-50 p-2 rounded">
                  <h4 className="font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    Enterprise Dashboard
                  </h4>
                  <p>Angular + REST API integration</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <h4 className="font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    E-commerce Platform
                  </h4>
                  <p>React.js + Redux + Next.js</p>
                </div>
                <div className="bg-purple-50 p-2 rounded">
                  <h4 className="font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    Mobile App Suite
                  </h4>
                  <p>React Native + TypeScript</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-3 text-blue-800">SOFT SKILLS</h2>
              <div className="text-xs space-y-1">
                <div>• Teamwork & Communication</div>
                <div>• Time Management</div>
                <div>• Attention to Detail</div>
                <div>• Continuous Learning</div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t-2 border-blue-600">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-600" />
                Available for immediate start
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-green-600" />
                Open to remote opportunities
              </span>
              <span className="flex items-center gap-1">
                <Code className="w-3 h-3 text-purple-600" />
                Passionate about clean code
              </span>
            </div>
             
          </div>
        </div>
      </div>
    </div>
  );
}