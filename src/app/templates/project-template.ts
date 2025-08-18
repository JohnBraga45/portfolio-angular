// 📝 Template para Adicionar Novos Projetos
// Copie este template e preencha com os dados do seu projeto

import { Project } from '../services/data.service';

// 🎯 Categorias Disponíveis
export enum ProjectCategory {
  WEB = 'web',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  API = 'api',
  LIBRARY = 'library',
  GAME = 'game',
  AI_ML = 'ai-ml'
}

// 📊 Status do Projeto
export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
  PLANNED = 'planned',
  ARCHIVED = 'archived'
}

// 🛠️ Tecnologias Populares
export const POPULAR_TECHNOLOGIES = {
  FRONTEND: [
    'Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript',
    'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Bootstrap'
  ],
  BACKEND: [
    'Node.js', 'Express', 'NestJS', 'Python', 'Django',
    'Flask', 'Java', 'Spring Boot', 'C#', '.NET'
  ],
  DATABASE: [
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase',
    'Redis', 'SQLite', 'Supabase'
  ],
  CLOUD: [
    'AWS', 'Google Cloud', 'Azure', 'Vercel',
    'Netlify', 'Heroku', 'Docker'
  ],
  MOBILE: [
    'React Native', 'Flutter', 'Ionic', 'Xamarin',
    'Swift', 'Kotlin', 'Cordova'
  ],
  TOOLS: [
    'Git', 'GitHub', 'GitLab', 'Webpack', 'Vite',
    'Jest', 'Cypress', 'Figma', 'Adobe XD'
  ]
};

// 📋 Template do Projeto
export const PROJECT_TEMPLATE: Partial<Project> = {
  _id: '', // ⚠️ OBRIGATÓRIO: ID único (ex: 'ecommerce-app-2024')
  title: '', // ⚠️ OBRIGATÓRIO: Nome do projeto
  slug: { current: '' }, // ⚠️ OBRIGATÓRIO: URL amigável (ex: 'ecommerce-app')
  description: '', // ⚠️ OBRIGATÓRIO: Descrição breve (máx 150 caracteres)
  content: '', // ⚠️ OBRIGATÓRIO: Descrição detalhada
  image: { asset: { url: '' } }, // ⚠️ OBRIGATÓRIO: Imagem principal
  gallery: [], // 🔧 OPCIONAL: Galeria de imagens
  technologies: [], // ⚠️ OBRIGATÓRIO: Array de tecnologias
  liveUrl: '', // 🔧 OPCIONAL: URL do projeto online
  githubUrl: '', // 🔧 OPCIONAL: URL do repositório
  featured: false, // 🔧 OPCIONAL: Destacar na home?
  category: ProjectCategory.WEB // ⚠️ OBRIGATÓRIO: Categoria
};

// 🎨 Exemplo de Projeto Completo
export const EXAMPLE_PROJECT: Project = {
  _id: 'ecommerce-angular-2024',
  title: 'E-commerce Angular',
  slug: { current: 'ecommerce-angular' },
  description: 'Plataforma de e-commerce moderna com Angular, TypeScript e integração de pagamentos.',
  content: `
    <h2>Sobre o Projeto</h2>
    <p>Este é um e-commerce completo desenvolvido com Angular 17, featuring:</p>
    <ul>
      <li>🛒 Carrinho de compras dinâmico</li>
      <li>💳 Integração com Stripe para pagamentos</li>
      <li>👤 Sistema de autenticação</li>
      <li>📱 Design responsivo</li>
      <li>🔍 Busca e filtros avançados</li>
    </ul>
    
    <h3>Funcionalidades</h3>
    <p>O sistema inclui painel administrativo, gestão de produtos, controle de estoque e relatórios de vendas.</p>
    
    <h3>Tecnologias Utilizadas</h3>
    <p>Frontend em Angular com TypeScript, backend em Node.js, banco MongoDB e deploy na Vercel.</p>
  `,
  image: {
    asset: {
      url: 'assets/projects/ecommerce-angular.svg'
    },
    images: [
      { asset: { url: 'assets/projects/ecommerce-home.svg' } },
      { asset: { url: 'assets/projects/ecommerce-product.svg' } },
      { asset: { url: 'assets/projects/ecommerce-cart.svg' } }
  ],
  technologies: [
    'Angular', 'TypeScript', 'Tailwind CSS', 'Node.js',
    'Express', 'MongoDB', 'Stripe', 'JWT', 'Vercel'
  ],
  liveUrl: 'https://ecommerce-angular.vercel.app',
  githubUrl: 'https://github.com/dionisiobraga/ecommerce-angular',
  featured: true,
  category: ProjectCategory.WEB
};

// 📝 Instruções de Uso:
/*
1. Copie o PROJECT_TEMPLATE
2. Preencha todos os campos obrigatórios (⚠️)
3. Adicione campos opcionais conforme necessário (🔧)
4. Salve as imagens em src/assets/projects/
5. Adicione o projeto no array de projetos em data.service.ts
6. Teste localmente com ng serve
7. Faça commit e push para deploy automático

Dicas:
- Use IDs únicos e descritivos
- Otimize imagens (WebP, máx 500KB)
- Mantenha descrições concisas mas informativas
- Teste links antes de publicar
- Use tecnologias do POPULAR_TECHNOLOGIES quando possível
*/

// 🚀 Função Helper para Criar Projeto
export function createProject(data: Partial<Project>): Project {
  const requiredFields = ['_id', 'title', 'slug', 'description', 'content', 'image', 'technologies', 'category'];
  
  for (const field of requiredFields) {
    if (!data[field as keyof Project]) {
      throw new Error(`Campo obrigatório '${field}' não foi preenchido`);
    }
  }
  
  return {
    ...PROJECT_TEMPLATE,
    ...data
  } as Project;
}

// 🎯 Função para Validar Projeto
export function validateProject(project: Project): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!project._id) errors.push('ID é obrigatório');
  if (!project.title) errors.push('Título é obrigatório');
  if (!project.description) errors.push('Descrição é obrigatória');
  if (!project.technologies?.length) errors.push('Pelo menos uma tecnologia é obrigatória');
  if (!project.category) errors.push('Categoria é obrigatória');
  
  if (project.description && project.description.length > 150) {
    errors.push('Descrição deve ter no máximo 150 caracteres');
  }
  
  if (project.liveUrl && !isValidUrl(project.liveUrl)) {
    errors.push('URL do projeto inválida');
  }
  
  if (project.githubUrl && !isValidUrl(project.githubUrl)) {
    errors.push('URL do GitHub inválida');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// 🔗 Helper para validar URLs
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}