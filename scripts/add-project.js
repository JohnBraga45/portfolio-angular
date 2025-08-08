#!/usr/bin/env node

/**
 * 🚀 Script para Adicionar Novos Projetos
 * 
 * Uso:
 * node scripts/add-project.js
 * 
 * Este script guia você através do processo de adicionar um novo projeto
 * ao portfólio de forma interativa.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuração do readline para input interativo
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Helper para colorir texto
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Categorias disponíveis
const CATEGORIES = {
  '1': 'web',
  '2': 'mobile',
  '3': 'desktop',
  '4': 'api',
  '5': 'library',
  '6': 'game',
  '7': 'ai-ml'
};

// Tecnologias populares
const TECHNOLOGIES = {
  frontend: ['Angular', 'React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Sass', 'Tailwind CSS', 'Bootstrap'],
  backend: ['Node.js', 'Express', 'NestJS', 'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET'],
  database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis', 'SQLite', 'Supabase'],
  cloud: ['AWS', 'Google Cloud', 'Azure', 'Vercel', 'Netlify', 'Heroku', 'Docker'],
  mobile: ['React Native', 'Flutter', 'Ionic', 'Xamarin', 'Swift', 'Kotlin', 'Cordova'],
  tools: ['Git', 'GitHub', 'GitLab', 'Webpack', 'Vite', 'Jest', 'Cypress', 'Figma', 'Adobe XD']
};

// Função para fazer perguntas
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Função para validar URL
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Função para gerar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Função para gerar ID único
function generateId(title) {
  const slug = generateSlug(title);
  const year = new Date().getFullYear();
  return `${slug}-${year}`;
}

// Função principal
async function addProject() {
  console.log(colorize('\n🚀 Assistente para Adicionar Novo Projeto', 'cyan'));
  console.log(colorize('=' .repeat(50), 'blue'));
  
  try {
    // Coletar informações básicas
    const title = await question(colorize('\n📝 Título do projeto: ', 'yellow'));
    if (!title.trim()) {
      throw new Error('Título é obrigatório!');
    }
    
    const description = await question(colorize('📄 Descrição breve (máx 150 chars): ', 'yellow'));
    if (!description.trim()) {
      throw new Error('Descrição é obrigatória!');
    }
    if (description.length > 150) {
      throw new Error('Descrição muito longa! Máximo 150 caracteres.');
    }
    
    // Categoria
    console.log(colorize('\n📂 Escolha a categoria:', 'yellow'));
    Object.entries(CATEGORIES).forEach(([key, value]) => {
      console.log(`  ${key}. ${value}`);
    });
    
    const categoryChoice = await question(colorize('Categoria (1-7): ', 'yellow'));
    const category = CATEGORIES[categoryChoice];
    if (!category) {
      throw new Error('Categoria inválida!');
    }
    
    // Tecnologias
    console.log(colorize('\n🛠️ Tecnologias populares:', 'yellow'));
    Object.entries(TECHNOLOGIES).forEach(([category, techs]) => {
      console.log(colorize(`\n${category.toUpperCase()}:`, 'magenta'));
      console.log(`  ${techs.join(', ')}`);
    });
    
    const technologies = await question(colorize('\n🔧 Tecnologias usadas (separadas por vírgula): ', 'yellow'));
    const techArray = technologies.split(',').map(t => t.trim()).filter(t => t);
    if (techArray.length === 0) {
      throw new Error('Pelo menos uma tecnologia é obrigatória!');
    }
    
    // URLs opcionais
    let liveUrl = await question(colorize('🌐 URL do projeto online (opcional): ', 'yellow'));
    if (liveUrl && !isValidUrl(liveUrl)) {
      console.log(colorize('⚠️ URL inválida, deixando em branco', 'red'));
      liveUrl = '';
    }
    
    let githubUrl = await question(colorize('📱 URL do GitHub (opcional): ', 'yellow'));
    if (githubUrl && !isValidUrl(githubUrl)) {
      console.log(colorize('⚠️ URL inválida, deixando em branco', 'red'));
      githubUrl = '';
    }
    
    // Featured
    const featuredInput = await question(colorize('⭐ Destacar na home? (s/n): ', 'yellow'));
    const featured = featuredInput.toLowerCase().startsWith('s');
    
    // Gerar dados do projeto
    const projectId = generateId(title);
    const slug = generateSlug(title);
    
    const projectData = {
      _id: projectId,
      title: title.trim(),
      slug: { current: slug },
      description: description.trim(),
      content: `
        <h2>Sobre o Projeto</h2>
        <p>${description.trim()}</p>
        
        <h3>Tecnologias Utilizadas</h3>
        <p>Este projeto foi desenvolvido utilizando: ${techArray.join(', ')}.</p>
        
        <h3>Funcionalidades</h3>
        <ul>
          <li>Funcionalidade 1</li>
          <li>Funcionalidade 2</li>
          <li>Funcionalidade 3</li>
        </ul>
        
        <p><em>Edite este conteúdo em data.service.ts para adicionar mais detalhes.</em></p>
      `,
      image: {
        asset: {
          url: `/assets/projects/${slug}.jpg`
        }
      },
      gallery: [],
      technologies: techArray,
      liveUrl: liveUrl || undefined,
      githubUrl: githubUrl || undefined,
      featured: featured,
      category: category
    };
    
    // Mostrar resumo
    console.log(colorize('\n📋 Resumo do Projeto:', 'green'));
    console.log(colorize('=' .repeat(30), 'blue'));
    console.log(`ID: ${projectData._id}`);
    console.log(`Título: ${projectData.title}`);
    console.log(`Categoria: ${projectData.category}`);
    console.log(`Tecnologias: ${projectData.technologies.join(', ')}`);
    console.log(`Featured: ${projectData.featured ? 'Sim' : 'Não'}`);
    if (projectData.liveUrl) console.log(`URL: ${projectData.liveUrl}`);
    if (projectData.githubUrl) console.log(`GitHub: ${projectData.githubUrl}`);
    
    const confirm = await question(colorize('\n✅ Confirmar adição? (s/n): ', 'green'));
    if (!confirm.toLowerCase().startsWith('s')) {
      console.log(colorize('❌ Operação cancelada.', 'red'));
      return;
    }
    
    // Gerar código para adicionar ao data.service.ts
    const projectCode = `
    // 🆕 ${projectData.title}
    {
      _id: '${projectData._id}',
      title: '${projectData.title}',
      slug: { current: '${projectData.slug.current}' },
      description: '${projectData.description}',
      content: \`${projectData.content}\`,
      image: {
        asset: {
          url: '${projectData.image.asset.url}'
        }
      },
      gallery: [],
      technologies: [${projectData.technologies.map(t => `'${t}'`).join(', ')}],
      ${projectData.liveUrl ? `liveUrl: '${projectData.liveUrl}',` : ''}
      ${projectData.githubUrl ? `githubUrl: '${projectData.githubUrl}',` : ''}
      featured: ${projectData.featured},
      category: '${projectData.category}'
    },`;
    
    // Salvar em arquivo temporário
    const tempFile = path.join(__dirname, '..', 'temp-project.txt');
    fs.writeFileSync(tempFile, projectCode);
    
    console.log(colorize('\n🎉 Projeto criado com sucesso!', 'green'));
    console.log(colorize('\n📝 Próximos passos:', 'yellow'));
    console.log('1. Adicione a imagem em: src/assets/projects/' + slug + '.jpg');
    console.log('2. Copie o código de temp-project.txt');
    console.log('3. Cole no array de projetos em data.service.ts');
    console.log('4. Delete o arquivo temp-project.txt');
    console.log('5. Teste com: ng serve');
    console.log('6. Faça commit e push para deploy');
    
    console.log(colorize('\n📄 Código gerado salvo em: temp-project.txt', 'cyan'));
    
  } catch (error) {
    console.log(colorize(`\n❌ Erro: ${error.message}`, 'red'));
  } finally {
    rl.close();
  }
}

// Executar script
if (require.main === module) {
  addProject();
}

module.exports = { addProject };