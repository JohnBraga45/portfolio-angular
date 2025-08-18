import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  _id: string;
  title: string;
  slug: { current: string } | string;
  description: string;
  content: any[] | string;
  image: any;
  gallery?: any[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
}

export interface Bio {
  _id: string;
  name: string;
  title: string;
  description: string;
  image: any;
  resume?: any;
  education?: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications?: {
    title: string;
    provider: string;
    year: number;
  }[];
  softSkills?: string[];
}

export interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon?: any;
}

export interface Contact {
  _id: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {}

  // Get all projects
  getProjects(): Observable<Project[]> {
    // Projetos baseados na experiência do Dionísio Braga
    const mockProjects: Project[] = [
      // 🆕 Landing Page BG Parts
      {
        _id: 'landing-page-bg-parts-2025',
        title: 'Landing Page - BG Parts',
        slug: { current: 'landing-page-bg-parts' },
        description: 'Landing page profissional para BG Parts - empresa especializada na importação de peças automóveis usadas originais para Angola. Deploy disponível via Vercel.',
        content: `
          <h2>Sobre o Projeto</h2>
          <p>Landing page moderna e responsiva desenvolvida para a BG Parts, empresa especializada na importação de peças automóveis usadas originais para Angola.</p>
          
          <h3>Funcionalidades</h3>
          <ul>
            <li>🚗 Apresentação dos serviços da empresa</li>
            <li>📱 Design totalmente responsivo</li>
            <li>📧 Formulário de contato integrado via EmailJS</li>
            <li>⚡ Performance otimizada</li>
            <li>🎨 Interface moderna e profissional</li>
          </ul>
          
          <h3>Deploy na Vercel</h3>
          <p><strong>Para fazer o deploy desta landing page na Vercel:</strong></p>
          <ol>
            <li>📁 Certifique-se que o arquivo index.html está na raiz do repositório</li>
            <li>🔗 Acesse <a href="https://vercel.com" target="_blank">vercel.com</a> e faça login com GitHub</li>
            <li>➕ Clique em "Add New" → "Project"</li>
            <li>📂 Selecione o repositório GitHub da landing page</li>
            <li>⚙️ Configure o projeto (Vercel detecta automaticamente HTML/CSS/JS)</li>
            <li>🚀 Clique em "Deploy" - o site ficará disponível em poucos segundos!</li>
          </ol>
          <p>💡 <strong>Dica:</strong> A Vercel faz deploy automático a cada push no GitHub!</p>
          
          <h3>Tecnologias Utilizadas</h3>
          <p>Desenvolvida com HTML5, CSS3, JavaScript vanilla e integração EmailJS para formulário de contato funcional.</p>
        `,
        image: {
           asset: {
             url: '/assets/projects/bg-parts-landing.svg'
           }
         },
        gallery: [],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS', 'Responsive Design'],
        liveUrl: 'https://landing-page-b-gparts.vercel.app/',
        githubUrl: 'https://github.com/JohnBraga45/landingPage_BGparts',
        featured: true,
        category: 'web'
      },
      // 🆕 Dashboard de Criptomoedas
      {
        _id: 'crypto-dashboard-2025',
        title: 'Dashboard de Criptomoedas',
        slug: { current: 'crypto-dashboard' },
        description: 'Dashboard completo de criptomoedas com preços em tempo real, gráficos interativos, portfolio tracker e alertas personalizados. Desenvolvido com Angular 17, TypeScript e Tailwind CSS.',
        content: 'Dashboard moderno e intuitivo para acompanhar o mercado de criptomoedas. Oferece preços em tempo real via CoinGecko API, gráficos de tendências com Chart.js, gerenciamento de portfólio, alertas de preço personalizados e design responsivo. Arquitetura escalável com Angular 17, TypeScript e Tailwind CSS.',
        image: {
          asset: {
            url: '/assets/projects/crypto-dashboard.svg'
          }
        },
        gallery: [],
        technologies: ['Angular', 'TypeScript', 'CoinGecko API', 'Chart.js', 'Tailwind CSS', 'RxJS'],
        liveUrl: 'https://crypto-dashboard-chi-six.vercel.app/',
        githubUrl: 'https://github.com/JohnBraga45/crypto-dashboard',
        featured: true,
        category: 'web'
      },
      {
         _id: 'project1',
         title: 'Sistema PNA - Interface Administrativa',
         slug: { current: 'sistema-pna-interface' },
         description: 'Interface administrativa desenvolvida para a Polícia Nacional de Angola usando Angular',
         content: `
          <h2>Sobre o Projeto</h2>
          <p>Sistema completo de gestão administrativa desenvolvido para o Departamento de Telecom & IT da PNA (Abr 2022 – Dez 2024).</p>
          
          <h3>🖥️ Interface Administrativa</h3>
          <p>O sistema apresenta uma interface moderna e intuitiva com:</p>
          <ul>
            <li>📊 Dashboard com métricas em tempo real</li>
            <li>👥 Gestão completa de usuários e permissões</li>
            <li>📋 Sistema de relatórios personalizáveis</li>
            <li>🔒 Controle de segurança e auditoria</li>
            <li>⚙️ Configurações administrativas avançadas</li>
          </ul>
          
          <h3>🎨 Design e Usabilidade</h3>
          <p>Interface desenvolvida com foco na experiência do usuário:</p>
          <ul>
            <li>🎯 Design responsivo para diferentes dispositivos</li>
            <li>🔍 Sistema de busca e filtros avançados</li>
            <li>📈 Visualização de dados com gráficos e estatísticas</li>
            <li>🚀 Performance otimizada para grandes volumes de dados</li>
          </ul>
          
          <h3>💼 Impacto Organizacional</h3>
          <p>O sistema revolucionou a gestão administrativa da PNA, proporcionando maior eficiência e controle nos processos internos.</p>
        `,
         image: {
           asset: {
             url: '/assets/projects/sistema-pna-screenshot.svg'
           }
         },
         gallery: [],
         technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'REST APIs', 'Responsive Design'],
         liveUrl: undefined,
         githubUrl: undefined,
         featured: true,
         category: 'Web Development'
       },
      {
         _id: 'project2',
         title: 'ConnectSolution - Plataforma Web',
         slug: { current: 'connectsolution-platform' },
         description: 'Soluções web e mobile com design responsivo e alta performance (Freelance)',
         content: `
          <h2>Sobre o Projeto</h2>
          <p>Plataforma completa de soluções digitais desenvolvida como projeto freelance (Jun 2020 – Dez 2020).</p>
          
          <h3>🌐 Soluções Web & Mobile</h3>
          <p>A ConnectSolution oferece uma experiência integrada:</p>
          <ul>
            <li>🚀 Landing page moderna com design responsivo</li>
            <li>📱 Aplicações mobile nativas com React Native</li>
            <li>⚡ Performance otimizada em todas as plataformas</li>
            <li>🎨 Interface intuitiva e experiência excepcional</li>
            <li>📊 Dashboard com métricas de performance</li>
          </ul>
          
          <h3>🔧 Funcionalidades Principais</h3>
          <ul>
            <li>💼 Portfolio interativo de projetos</li>
            <li>📈 Estatísticas de satisfação do cliente (98%)</li>
            <li>🛠️ Suporte técnico 24/7</li>
            <li>📋 Sistema de gestão de projetos</li>
            <li>🎯 Foco em resultados mensuráveis</li>
          </ul>
          
          <h3>🏆 Resultados Alcançados</h3>
          <p>Mais de 50 projetos entregues com alta satisfação do cliente e suporte contínuo para empresas de diversos segmentos.</p>
        `,
         image: {
           asset: {
             url: '/assets/projects/connectsolution-screenshot.svg'
           }
         },
         gallery: [],
         technologies: ['React Native', 'JavaScript', 'CSS3', 'Responsive Design', 'Mobile Development'],
         liveUrl: undefined,
         githubUrl: undefined,
         featured: true,
         category: 'Mobile Development'
       },
      {
         _id: 'project3',
         title: 'FieldBright - Interface Next.js',
         slug: { current: 'fieldbright-interface' },
         description: 'Interface moderna desenvolvida com Next.js focada em performance e SEO (Remoto - Brasil)',
         content: `
          <h2>Sobre o Projeto</h2>
          <p>Interface moderna desenvolvida remotamente para empresa brasileira (Jan 2021 – Dez 2021) com foco em performance e SEO.</p>
          
          <h3>⚡ Performance Excepcional</h3>
          <p>O projeto FieldBright foi otimizado para máxima performance:</p>
          <ul>
            <li>🎯 Score Lighthouse: 95/100 em Performance</li>
            <li>🔍 Score SEO: 98/100 para melhor indexação</li>
            <li>🚀 Carregamento ultra-rápido com SSR e SSG</li>
            <li>📱 Design totalmente responsivo</li>
            <li>♿ Acessibilidade otimizada (WCAG)</li>
          </ul>
          
          <h3>🛠️ Tecnologias Avançadas</h3>
          <ul>
            <li>▲ Next.js com Server-Side Rendering</li>
            <li>⚛️ React.js com componentes reutilizáveis</li>
            <li>📘 TypeScript para código mais seguro</li>
            <li>💅 Styled Components para CSS-in-JS</li>
            <li>🔧 Webpack e otimizações de bundle</li>
          </ul>
          
          <h3>📈 Resultados de SEO</h3>
          <p>Interface otimizada para motores de busca com meta tags dinâmicas, sitemap automático e estrutura semântica perfeita.</p>
        `,
         image: {
           asset: {
             url: '/assets/projects/fieldbright-screenshot.svg'
           }
         },
         gallery: [],
         technologies: ['Next.js', 'React.js', 'TypeScript', 'Styled Components', 'SEO', 'Performance Optimization'],
         liveUrl: undefined,
         githubUrl: undefined,
         featured: false,
         category: 'Web Development'
       }
    ];
    return from([mockProjects]);
  }

  // Get featured projects
  getFeaturedProjects(): Observable<Project[]> {
    return this.getProjects().pipe(
      map(projects => projects.filter(project => project.featured))
    );
  }

  // Get single project by slug
  getProject(slug: string): Observable<Project> {
    return this.getProjects().pipe(
      map(projects => {
        const project = projects.find(p => {
          const projectSlug = typeof p.slug === 'string' ? p.slug : p.slug.current;
          return projectSlug === slug;
        });
        return project || projects[0]; // Return first project if slug not found
      })
    );
  }

  // Get bio information
  getBio(): Observable<Bio> {
    // Dados completos do Dionísio Braga
    const mockBio: Bio = {
      _id: 'bio1',
      name: 'Dionísio Braga',
      title: 'Desenvolvedor Frontend | Angular & React |',
      description: '🚀 Desenvolvedor Frontend apaixonado por criar experiências digitais excepcionais.\n\n💻 **Especialidades:**\n• Angular, TypeScript, JavaScript\n• HTML5, CSS3, SCSS, Tailwind CSS\n• Responsive Design & UX/UI\n• APIs REST e integração de dados\n\n🎯 **Diferenciais:**\n• Código limpo e otimizado\n• Soluções inovadoras e eficientes\n• Foco em performance e usabilidade\n\n📚 Atualmente cursando IA e Automação Digital, sempre em busca de novas tecnologias para entregar valor excepcional aos projetos.',
      image: '/assets/linkedin.jpg',
      resume: null,
      education: [
        {
          degree: 'Graduação em Inteligência Artificial e Automação Digital (Em andamento)',
          institution: 'Unifecaf - Remoto no Brasil',
          period: '2024 – Presente'
        },
        {
          degree: 'Bacharelado em Engenharia Informática (Incompleto)',
          institution: 'Universidade Deolinda Rodrigues',
          period: '2021 – 2024'
        },
        {
          degree: 'Ensino Médio em Informática',
          institution: 'ETESAL - ALPEGA',
          period: '2017 – 2020'
        }
      ],
      certifications: [
        {
          title: 'Introdução a Cloud e DevOps',
          provider: 'Concluído',
          year: 2025
        },
        {
          title: 'React and TypeScript',
          provider: 'Udemy',
          year: 2022
        },
        {
          title: 'Java',
          provider: 'RocketSeat',
          year: 2022
        },
        {
          title: 'Full-Stack Development',
          provider: 'Udemy',
          year: 2022
        }
      ],
      softSkills: ['Trabalho em equipe', 'Comunicação', 'Gestão de tempo', 'Atenção aos detalhes', 'Aprendizado contínuo']
    };
    return from([mockBio]);
  }

  // Get skills
  getSkills(): Observable<Skill[]> {
    // Habilidades reais do Dionísio Braga
    const mockSkills: Skill[] = [
      { _id: 's1', name: 'HTML5', category: 'Frontend', level: 95, icon: null },
      { _id: 's2', name: 'CSS3', category: 'Frontend', level: 95, icon: null },
      { _id: 's3', name: 'JavaScript', category: 'Programming', level: 90, icon: null },
      { _id: 's4', name: 'TypeScript', category: 'Programming', level: 88, icon: null },
      { _id: 's5', name: 'Angular', category: 'Frontend', level: 90, icon: null },
      { _id: 's6', name: 'React.js', category: 'Frontend', level: 85, icon: null },
      { _id: 's7', name: 'Next.js', category: 'Frontend', level: 80, icon: null },
      { _id: 's8', name: 'React Native', category: 'Mobile', level: 75, icon: null },
      { _id: 's9', name: 'Figma', category: 'Design', level: 80, icon: null },
      { _id: 's10', name: 'Git', category: 'Tools', level: 85, icon: null },
      { _id: 's11', name: 'Docker', category: 'DevOps', level: 70, icon: null },
      { _id: 's12', name: 'Firebase', category: 'Backend', level: 75, icon: null },
      { _id: 's13', name: 'MySQL', category: 'Database', level: 70, icon: null }
    ];
    return from([mockSkills]);
  }

  // Get contact information
  getContact(): Observable<Contact> {
    // Dados reais do Dionísio Braga
    const mockContact: Contact = {
      _id: 'contact1',
      email: 'dionisiobraga551@gmail.com',
      phone: '+351 920797741',
      location: 'Setúbal, Portugal',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/dionísio-braga/' }
      ]
    };
    return from([mockContact]);
  }

  getImageUrl(imageRef: any): string {
    if (!imageRef) return '/assets/linkedin.jpg';
    if (typeof imageRef === 'string') return imageRef;
    // Return placeholder for any other type
    return '/assets/linkedin.jpg';
  }

  getProjectBySlug(slug: string): Observable<Project | null> {
    return this.getProjects().pipe(
      map(projects => projects.find(p => {
        const projectSlug = typeof p.slug === 'string' ? p.slug : p.slug.current;
        return projectSlug === slug;
      }) || null)
    );
  }
}