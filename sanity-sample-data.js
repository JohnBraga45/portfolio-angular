// Script para adicionar dados de exemplo ao Sanity
// Execute este script no Sanity Studio ou use o CLI

const sampleProjects = [
  {
    _type: 'project',
    title: 'Portfolio Website',
    slug: {
      _type: 'slug',
      current: 'portfolio-website'
    },
    description: 'Um site de portfólio moderno e responsivo construído com Angular e Sanity CMS.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Este projeto demonstra a integração entre Angular e Sanity CMS para criar um portfólio dinâmico e facilmente gerenciável.'
          }
        ]
      }
    ],
    technologies: ['Angular', 'TypeScript', 'Sanity CMS', 'Tailwind CSS'],
    liveUrl: 'https://meuportfolio.com',
    githubUrl: 'https://github.com/usuario/portfolio',
    featured: true,
    category: 'Web Development',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'project',
    title: 'E-commerce App',
    slug: {
      _type: 'slug',
      current: 'ecommerce-app'
    },
    description: 'Aplicativo de e-commerce completo com carrinho de compras e sistema de pagamento.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Uma solução completa de e-commerce com funcionalidades avançadas de carrinho e checkout.'
          }
        ]
      }
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://meuapp.com',
    githubUrl: 'https://github.com/usuario/ecommerce',
    featured: false,
    category: 'Full Stack',
    publishedAt: new Date(Date.now() - 86400000).toISOString() // 1 dia atrás
  }
];

const sampleBio = {
  _type: 'bio',
  _id: 'bio',
  name: 'Seu Nome',
  title: 'Desenvolvedor Full Stack',
  description: 'Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais.',
  education: [
    {
      institution: 'Universidade XYZ',
      degree: 'Bacharelado em Ciência da Computação',
      year: '2020-2024'
    }
  ],
  experience: [
    {
      company: 'Tech Company',
      position: 'Desenvolvedor Frontend',
      period: '2023-Presente',
      description: 'Desenvolvimento de aplicações web modernas usando Angular e React.'
    }
  ]
};

const sampleSkills = [
  {
    _type: 'skill',
    name: 'Angular',
    category: 'Frontend',
    level: 90,
    description: 'Framework para desenvolvimento de aplicações web'
  },
  {
    _type: 'skill',
    name: 'TypeScript',
    category: 'Programming Language',
    level: 85,
    description: 'Linguagem de programação tipada baseada em JavaScript'
  },
  {
    _type: 'skill',
    name: 'Node.js',
    category: 'Backend',
    level: 80,
    description: 'Runtime JavaScript para desenvolvimento backend'
  }
];

const sampleContact = {
  _type: 'contact',
  _id: 'contact',
  email: 'seu.email@exemplo.com',
  phone: '+55 11 99999-9999',
  location: 'São Paulo, Brasil',
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/seuusuario'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/seuusuario'
    }
  ]
};

// Para usar este script:
// 1. Abra o Sanity Studio em http://localhost:3333
// 2. Crie manualmente os documentos usando os dados acima como referência
// 3. Ou use o CLI do Sanity para importar os dados

console.log('Dados de exemplo para o Sanity:');
console.log('Projetos:', sampleProjects);
console.log('Bio:', sampleBio);
console.log('Skills:', sampleSkills);
console.log('Contato:', sampleContact);

export { sampleProjects, sampleBio, sampleSkills, sampleContact };