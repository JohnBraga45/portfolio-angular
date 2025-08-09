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
      // 🆕 Dashboard de Criptomoedas
      {
        _id: 'crypto-dashboard-2025',
        title: 'Dashboard de Criptomoedas',
        slug: { current: 'crypto-dashboard' },
        description: 'Dashboard completo com preços em tempo real, gráficos de tendências e portfolio tracker',
        content: `
          <h2>Sobre o Projeto</h2>
          <p>Dashboard completo de criptomoedas desenvolvido com Angular, oferecendo uma experiência moderna e intuitiva para acompanhar o mercado crypto.</p>
          
          <h3>Funcionalidades Principais</h3>
          <ul>
            <li>📊 <strong>Preços em Tempo Real</strong> - Cotações atualizadas via CoinGecko API</li>
            <li>📈 <strong>Gráficos de Tendências</strong> - Visualização interativa com Chart.js</li>
            <li>💼 <strong>Portfolio Tracker</strong> - Acompanhe seus investimentos</li>
            <li>🔔 <strong>Alertas de Preço</strong> - Notificações personalizadas</li>
            <li>🌙 <strong>Modo Escuro/Claro</strong> - Interface adaptável</li>
            <li>📱 <strong>Design Responsivo</strong> - Funciona em todos os dispositivos</li>
          </ul>
          
          <h3>Tecnologias Utilizadas</h3>
          <p>Desenvolvido com Angular 17, TypeScript e Tailwind CSS. Integração com CoinGecko API para dados em tempo real e Chart.js para visualizações interativas.</p>
          
          <h3>Destaques Técnicos</h3>
          <ul>
            <li>Arquitetura modular e escalável</li>
            <li>Gerenciamento de estado reativo com RxJS</li>
            <li>Otimização de performance com lazy loading</li>
            <li>Testes unitários e de integração</li>
          </ul>
        `,
        image: {
          asset: {
            url: '/assets/projects/crypto-dashboard.jpg'
          }
        },
        gallery: [],
        technologies: ['Angular', 'TypeScript', 'CoinGecko API', 'Chart.js', 'Tailwind CSS', 'RxJS'],
        liveUrl: '/crypto-dashboard',
        githubUrl: 'https://github.com/JohnBraga45/portfolio-angular/tree/feature/test-preview',
        featured: true,
        category: 'web'
      },
      {
         _id: 'project1',
         title: 'Sistema PNA - Interface Administrativa',
         slug: { current: 'sistema-pna-interface' },
         description: 'Interface administrativa desenvolvida para a Polícia Nacional de Angola usando Angular',
         content: 'Sistema completo de gestão administrativa desenvolvido para o Departamento de Telecom & IT da PNA (Abr 2022 – Dez 2024). Desenvolvimento e manutenção de interfaces dinâmicas e responsivas usando Angular, HTML e CSS. Melhoria da usabilidade e acessibilidade dos sistemas com práticas modernas de front-end. Colaboração próxima com equipes backend para otimização de integrações via API e performance geral.',
         image: null,
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
         content: 'Projeto freelance desenvolvido entre Jun 2020 – Dez 2020. Desenvolvimento de soluções web e mobile focadas em design responsivo e performance de UI. Integração de recursos com React Native para experiências mobile aprimoradas. Suporte técnico e resolução de problemas para clientes empresariais.',
         image: null,
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
         content: 'Projeto desenvolvido remotamente para empresa brasileira (Jan 2021 – Dez 2021). Desenvolvimento de interfaces com Next.js e React.js, com foco em performance e SEO. Criação de componentes reutilizáveis com HTML, CSS e styled-components. Implementação de best practices para otimização de carregamento e experiência do usuário.',
         image: null,
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
      title: 'Frontend Developer',
      description: 'Frontend Developer com sólida experiência no desenvolvimento de interfaces web escaláveis e de alto desempenho utilizando HTML, CSS (incluindo animações) e JavaScript. Apaixonado por entregar experiências envolventes ao usuário e otimizar a performance do front-end. Histórico comprovado de colaboração em equipes multifuncionais para desenvolver aplicações responsivas centradas no usuário.',
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
          year: 2024
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
      email: 'dionisiobraga551&#64;gmail.com',
      phone: '+351 920 797 741',
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