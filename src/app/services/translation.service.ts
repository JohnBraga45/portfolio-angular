import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Translation {
  [key: string]: string;
}

export interface Translations {
  [locale: string]: Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLocale = new BehaviorSubject<string>('en');
  public currentLocale$ = this.currentLocale.asObservable();

  private translations: Translations = {
    pt: {
      // Navigation
      'nav.home': 'Início',
      'nav.about': 'Sobre',
      'nav.projects': 'Projetos',
      'nav.contact': 'Contato',
      'nav.language': 'Idioma',
      
      // Hero Section
      'hero.greeting': 'Olá, eu sou',
      'hero.title': 'Desenvolvedor Frontend',
      'hero.subtitle': 'Angular & React',
      'hero.description': 'Especialista em desenvolvimento frontend com foco em Angular e React. Criando experiências digitais modernas e responsivas.',
      'hero.cta.projects': 'Ver Projetos',
      'hero.cta.contact': 'Entre em Contato',
      
      // About Section
      'about.title': 'Sobre Mim',
      'about.subtitle': 'Conheça mais sobre minha formação, certificações e habilidades interpessoais.',
      'about.description': 'Desenvolvedor frontend apaixonado por tecnologia e inovação. Especializado em Angular e React, com experiência em TypeScript, JavaScript e desenvolvimento de interfaces modernas.',
      'about.education': 'Educação',
      'about.certifications': 'Certificações',
      'about.skills': 'Habilidades Interpessoais',
      'about.noInfo': 'Informações não encontradas',
      'about.noInfoDesc': 'As informações sobre educação e certificações serão exibidas aqui quando estiverem disponíveis.',
      
      // Bio Data
      'bio.name': 'Dionísio Braga',
      'bio.title': 'Desenvolvedor Frontend | Angular & React |',
      'bio.description': '🚀 Desenvolvedor Frontend apaixonado por criar experiências digitais excepcionais.\n\n💻 **Especialidades:**\n• Angular, TypeScript, JavaScript\n• HTML5, CSS3, SCSS, Tailwind CSS\n• Responsive Design & UX/UI\n• APIs REST e integração de dados\n\n🎯 **Diferenciais:**\n• Código limpo e bem documentado\n• Foco em performance e acessibilidade\n• Experiência com metodologias ágeis\n• Sempre atualizado com as últimas tecnologias',
      'bio.downloadCV': 'Download CV',
      
      // Education
      'education.degree1': 'Graduação em Inteligência Artificial e Automação Digital (Em andamento)',
      'education.institution1': 'Unifecaf - Remoto no Brasil',
      'education.period1': '2024 – Presente',
      'education.degree2': 'Bacharelado em Engenharia Informática (Incompleto)',
      'education.institution2': 'Universidade Deolinda Rodrigues',
      'education.period2': '2021 – 2024',
      'education.degree3': 'Ensino Médio em Informática',
      'education.institution3': 'ETESAL - ALPEGA',
      'education.period3': '2017 – 2020',
      
      // Certifications
      'cert.title1': 'Introdução a Cloud e DevOps',
      'cert.provider1': 'Concluído',
      'cert.year1': '2024',
      'cert.title2': 'React and TypeScript',
      'cert.provider2': 'Udemy',
      'cert.year2': '2022',
      'cert.title3': 'Java',
      'cert.provider3': 'RocketSeat',
      'cert.year3': '2022',
      'cert.title4': 'Full-Stack Development',
      'cert.provider4': 'Udemy',
      'cert.year4': '2022',
      
      // Soft Skills
      'softSkill.teamwork': 'Trabalho em equipe',
      'softSkill.communication': 'Comunicação',
      'softSkill.timeManagement': 'Gestão de tempo',
      'softSkill.attention': 'Atenção aos detalhes',
      'softSkill.learning': 'Aprendizado contínuo',
      
      // About section
      'about.noEducation': 'Informações de educação serão exibidas aqui.',
       'about.noCertifications': 'Certificações serão exibidas aqui.',
       
       // Projects Section
      'projects.title': 'Meus Projetos',
      'projects.subtitle': 'Aqui estão alguns dos projetos que desenvolvi, demonstrando minhas habilidades e experiência em diferentes tecnologias.',
      'projects.featured': 'Destaque',
      'projects.viewProject': 'Ver Projeto',
      'projects.details': 'Detalhes',
      'projects.showAll': 'Ver Todos os Projetos',
      'projects.showLess': 'Ver Menos',
      'projects.noProjects': 'Nenhum projeto encontrado',
      'projects.noProjectsDesc': 'Os projetos serão exibidos aqui quando estiverem disponíveis.',
      
      // Static Projects Data
      'project.bgParts.title': 'Landing Page - BG Parts',
      'project.bgParts.description': 'Landing page profissional para BG Parts - empresa especializada na importação de peças automóveis usadas originais para Angola. Deploy disponível via Vercel.',
      'project.cryptoDashboard.title': 'Dashboard de Criptomoedas',
      'project.cryptoDashboard.description': 'Dashboard completo de criptomoedas com preços em tempo real, gráficos interativos, portfolio tracker e alertas personalizados. Desenvolvido com Angular 17, TypeScript e Tailwind CSS.',
      'project.sistemaPna.title': 'Sistema PNA - Interface Administrativa',
      'project.sistemaPna.description': 'Interface administrativa desenvolvida para a Polícia Nacional de Angola usando Angular',
      'project.connectSolution.title': 'ConnectSolution - Plataforma Web',
      'project.connectSolution.description': 'Soluções web e mobile com design responsivo e alta performance (Freelance)',
      'project.fieldBright.title': 'FieldBright - Interface Next.js',
      'project.fieldBright.description': 'Interface moderna desenvolvida com Next.js focada em performance e SEO (Remoto - Brasil)',
      
      // Contact Section
      'contact.title': 'Contato',
      'contact.subtitle': 'Vamos conversar sobre seu próximo projeto! Entre em contato comigo através do formulário ou pelas redes sociais.',
      'contact.description': 'Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato!',
      'contact.form.title': 'Envie uma Mensagem',
      'contact.form.name': 'Nome',
      'contact.form.email': 'E-mail',
      'contact.form.subject': 'Assunto',
      'contact.form.message': 'Mensagem',
      'contact.form.send': 'Enviar Mensagem',
      'contact.form.sending': 'Enviando...',
      'contact.form.success': 'Mensagem enviada com sucesso!',
      'contact.form.error': 'Erro ao enviar mensagem. Tente novamente.',
      'contact.info.title': 'Informações de Contato',
      'contact.social.title': 'Redes Sociais',
      
      // Footer
      'footer.rights': 'Todos os direitos reservados.',
      'footer.made': 'Feito com',
      'footer.and': 'e',
      
      // Skills Section
      'skills.title': 'Minhas Skills',
      'skills.subtitle': 'Aqui estão as tecnologias e ferramentas que domino, organizadas por categoria e nível de proficiência.',
      'skills.summary': 'Resumo das Habilidades',
      'skills.total': 'Total de Skills',
      'skills.advanced': 'Avançado',
      'skills.proficient': 'Proficiente',
      'skills.categories': 'Categorias'
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'nav.language': 'Language',
      
      // Hero Section
      'hero.greeting': 'Hello, I\'m',
      'hero.title': 'Frontend Developer',
      'hero.subtitle': 'Angular & React',
      'hero.description': 'Frontend development specialist focused on Angular and React. Creating modern and responsive digital experiences.',
      'hero.cta.projects': 'View Projects',
      'hero.cta.contact': 'Get in Touch',
      
      // About Section
      'about.title': 'About Me',
      'about.subtitle': 'Learn more about my education, certifications and interpersonal skills.',
      'about.description': 'Frontend developer passionate about technology and innovation. Specialized in Angular and React, with experience in TypeScript, JavaScript and modern interface development.',
      'about.education': 'Education',
      'about.certifications': 'Certifications',
      'about.skills': 'Interpersonal Skills',
      'about.noInfo': 'Information not found',
      'about.noInfoDesc': 'Information about education and certifications will be displayed here when available.',
      
      // Bio Data
      'bio.name': 'Dionísio Braga',
      'bio.title': 'Frontend Developer | Angular & React |',
      'bio.description': '🚀 Frontend Developer passionate about creating exceptional digital experiences.\n\n💻 **Specialties:**\n• Angular, TypeScript, JavaScript\n• HTML5, CSS3, SCSS, Tailwind CSS\n• Responsive Design & UX/UI\n• REST APIs and data integration\n\n🎯 **Differentials:**\n• Clean and well-documented code\n• Focus on performance and accessibility\n• Experience with agile methodologies\n• Always updated with the latest technologies',
      'bio.downloadCV': 'Download CV',
      
      // Education
      'education.degree1': 'Bachelor\'s in Artificial Intelligence and Digital Automation (In progress)',
      'education.institution1': 'Unifecaf - Remote in Brazil',
      'education.period1': '2024 – Present',
      'education.degree2': 'Bachelor\'s in Computer Engineering (Incomplete)',
      'education.institution2': 'Deolinda Rodrigues University',
      'education.period2': '2021 – 2024',
      'education.degree3': 'High School in Computer Science',
      'education.institution3': 'ETESAL - ALPEGA',
      'education.period3': '2017 – 2020',
      
      // Certifications
      'cert.title1': 'Introduction to Cloud and DevOps',
      'cert.provider1': 'Completed',
      'cert.year1': '2024',
      'cert.title2': 'React and TypeScript',
      'cert.provider2': 'Udemy',
      'cert.year2': '2022',
      'cert.title3': 'Java',
      'cert.provider3': 'RocketSeat',
      'cert.year3': '2022',
      'cert.title4': 'Full-Stack Development',
      'cert.provider4': 'Udemy',
      'cert.year4': '2022',
      
      // Soft Skills
      'softSkill.teamwork': 'Teamwork',
      'softSkill.communication': 'Communication',
      'softSkill.timeManagement': 'Time management',
      'softSkill.attention': 'Attention to detail',
      'softSkill.learning': 'Continuous learning',
      
      // About section
      'about.noEducation': 'Education information will be displayed here.',
       'about.noCertifications': 'Certifications will be displayed here.',
       
       // Projects Section
      'projects.title': 'My Projects',
      'projects.subtitle': 'Here are some of the projects I\'ve developed, showcasing my skills and experience with different technologies.',
      'projects.featured': 'Featured',
      'projects.viewProject': 'View Project',
      'projects.details': 'Details',
      'projects.showAll': 'View All Projects',
      'projects.showLess': 'Show Less',
      'projects.noProjects': 'No projects found',
      'projects.noProjectsDesc': 'Projects will be displayed here when available.',
      
      // Static Projects Data
      'project.bgParts.title': 'Landing Page - BG Parts',
      'project.bgParts.description': 'Professional landing page for BG Parts - company specialized in importing original used automotive parts to Angola. Deploy available via Vercel.',
      'project.cryptoDashboard.title': 'Cryptocurrency Dashboard',
      'project.cryptoDashboard.description': 'Complete cryptocurrency dashboard with real-time prices, interactive charts, portfolio tracker and custom alerts. Developed with Angular 17, TypeScript and Tailwind CSS.',
      'project.sistemaPna.title': 'PNA System - Administrative Interface',
      'project.sistemaPna.description': 'Administrative interface developed for the National Police of Angola using Angular',
      'project.connectSolution.title': 'ConnectSolution - Web Platform',
      'project.connectSolution.description': 'Web and mobile solutions with responsive design and high performance (Freelance)',
      'project.fieldBright.title': 'FieldBright - Next.js Interface',
      'project.fieldBright.description': 'Modern interface developed with Next.js focused on performance and SEO (Remote - Brazil)',
      
      // Contact Section
      'contact.title': 'Get in Touch',
      'contact.subtitle': 'Let\'s talk about your next project! Contact me through the form or social media.',
      'contact.description': 'I\'m always open to new opportunities and interesting projects. Get in touch!',
      'contact.form.title': 'Send a Message',
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Message',
      'contact.form.send': 'Send Message',
      'contact.form.sending': 'Sending...',
      'contact.form.success': 'Message sent successfully!',
      'contact.form.error': 'Error sending message. Please try again.',
      'contact.info.title': 'Contact Information',
      'contact.social.title': 'Social Media',
      
      // Footer
      'footer.rights': 'All rights reserved.',
      'footer.made': 'Made with',
      'footer.and': 'and',
      
      // Skills Section
      'skills.title': 'My Skills',
      'skills.subtitle': 'Here are the technologies and tools I master, organized by category and proficiency level.',
      'skills.summary': 'Skills Summary',
      'skills.total': 'Total Skills',
      'skills.advanced': 'Advanced',
      'skills.proficient': 'Proficient',
      'skills.categories': 'Categories'
    }
  };

  constructor() {
    // Initialize with default language
    this.setLocale('en');
  }

  setLocale(locale: string): void {
    if (this.translations[locale]) {
      this.currentLocale.next(locale);
      // Only save to localStorage if we're in the browser
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('portfolio-language', locale);
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
      }
    }
  }

  getCurrentLocale(): string {
    return this.currentLocale.value;
  }

  translate(key: string): string {
    const locale = this.getCurrentLocale();
    return this.translations[locale]?.[key] || key;
  }

  getTranslation(key: string): Observable<string> {
    return new Observable(observer => {
      const subscription = this.currentLocale$.subscribe(locale => {
        observer.next(this.translations[locale]?.[key] || key);
      });
      
      return () => subscription.unsubscribe();
    });
  }

  getSupportedLocales(): string[] {
    return Object.keys(this.translations);
  }

  getLocaleDisplayName(locale: string): string {
    const names: { [key: string]: string } = {
      'pt': 'Português',
      'en': 'English'
    };
    return names[locale] || locale;
  }

  initializeLanguage(): void {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Load saved language from localStorage or detect browser language
      const savedLanguage = localStorage.getItem('portfolio-language');
      if (savedLanguage && this.getSupportedLocales().includes(savedLanguage)) {
        this.setLocale(savedLanguage);
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0];
        const supportedLang = this.getSupportedLocales().includes(browserLang) ? browserLang : 'pt';
        this.setLocale(supportedLang);
      }
    }
  }
}