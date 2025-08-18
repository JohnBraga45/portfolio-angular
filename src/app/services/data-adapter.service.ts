import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SanityService, SanityProject, SanityBio, SanitySkill, SanityContact } from './sanity.service';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataAdapterService {
  private useSanity = false; // Flag para alternar entre Sanity e dados locais
  private sanityCheckCompleted = false;

  constructor(
    private sanityService: SanityService,
    private dataService: DataService
  ) {
    // Verificar se o Sanity está configurado
    this.checkSanityConnection();
  }

  private checkSanityConnection(): void {
    // Verificar se o Sanity está configurado através das variáveis de ambiente
    const hasConfig = environment.sanity?.projectId && environment.sanity?.dataset;
    
    if (hasConfig) {
      // Se tem configuração, assumir que está funcionando inicialmente
      this.useSanity = true;
      console.log('Sanity CMS configurado. Verificando conectividade...');
      
      // Tentar uma consulta simples para verificar conectividade
      this.sanityService.testConnection().pipe(
        catchError(() => of(false))
      ).subscribe(isConnected => {
        this.useSanity = isConnected;
        this.sanityCheckCompleted = true;
        if (this.useSanity) {
          console.log('Sanity CMS conectado e funcionando.');
        } else {
          console.log('Sanity CMS configurado mas sem conectividade. Usando dados locais.');
          this.useSanity = false;
        }
      });
    } else {
      this.useSanity = false;
      this.sanityCheckCompleted = true;
      console.log('Sanity CMS não configurado. Usando dados locais.');
    }
  }

  // Método para alternar entre Sanity e dados locais
  toggleDataSource(useSanity: boolean): void {
    this.useSanity = useSanity;
  }

  // Verificar se está usando Sanity
  isUsingSanity(): boolean {
    return this.useSanity;
  }

  // Buscar projetos (com fallback)
  getProjects(): Observable<any[]> {
    if (this.useSanity) {
      return this.sanityService.getProjects().pipe(
        map(projects => this.convertSanityProjectsToLocal(projects)),
        catchError((error) => {
          console.warn('Erro ao buscar projetos do Sanity:', error);
          return this.dataService.getProjects();
        })
      );
    }
    return this.dataService.getProjects();
  }

  // Buscar projetos em destaque (com fallback)
  getFeaturedProjects(): Observable<any[]> {
    if (this.useSanity) {
      return this.sanityService.getFeaturedProjects().pipe(
        map(projects => this.convertSanityProjectsToLocal(projects)),
        catchError((error) => {
          console.warn('Erro ao buscar projetos em destaque do Sanity:', error);
          return this.dataService.getFeaturedProjects();
        })
      );
    }
    return this.dataService.getFeaturedProjects();
  }

  // Buscar projeto por ID (com fallback)
  getProjectById(id: string): Observable<any | null> {
    if (this.useSanity) {
      return this.sanityService.getProjectBySlug(id).pipe(
        map(project => project ? this.convertSanityProjectToLocal(project) : null),
        catchError(() => {
          console.warn('Erro ao buscar projeto do Sanity. Usando dados locais.');
          return this.dataService.getProject(id);
        })
      );
    }
    return this.dataService.getProject(id);
  }

  // Buscar biografia (com fallback)
  getBio(): Observable<any> {
    // Forçando uso dos dados estáticos locais
    console.log('Usando dados estáticos da biografia.');
    return this.dataService.getBio();
  }

  // Buscar habilidades (com fallback)
  getSkills(): Observable<any[]> {
    if (this.useSanity) {
      return this.sanityService.getSkills().pipe(
        map(skills => this.convertSanitySkillsToLocal(skills)),
        catchError(() => {
          console.warn('Erro ao buscar habilidades do Sanity. Usando dados locais.');
          return this.dataService.getSkills();
        })
      );
    }
    return this.dataService.getSkills();
  }

  // Buscar informações de contato (com fallback)
  getContact(): Observable<any> {
    // Forçando uso dos dados estáticos locais
    console.log('Usando dados estáticos de contacto.');
    return this.dataService.getContact();
  }

  // Métodos de conversão do Sanity para formato local
  private convertSanityProjectsToLocal(projects: SanityProject[]): any[] {
    return projects.map(project => this.convertSanityProjectToLocal(project));
  }

  private convertSanityProjectToLocal(project: SanityProject): any {
    return {
      _id: project._id,
      id: project.slug.current,
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: this.convertBlockContentToHtml(project.content),
      image: project.image ? this.sanityService.urlFor(project.image).width(400).height(300).url() : null,
      gallery: project.gallery ? project.gallery.map(img => this.sanityService.urlFor(img).url()) : [],
      technologies: project.technologies,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
      category: project.category,
      date: project.publishedAt
    };
  }

  private convertSanityBioToLocal(bio: SanityBio): any {
    return {
      name: bio.name,
      title: bio.title,
      description: bio.description,
      image: bio.image ? this.sanityService.urlFor(bio.image).width(300).height(300).url() : null,
      resume: bio.resume,
      education: bio.education || [],
      certifications: bio.certifications || [],
      softSkills: bio.softSkills || []
    };
  }

  private convertSanitySkillsToLocal(skills: SanitySkill[]): any[] {
    return skills.map(skill => ({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon ? this.sanityService.urlFor(skill.icon).width(50).height(50).url() : null
    }));
  }

  private convertSanityContactToLocal(contact: SanityContact): any {
    return {
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      socialLinks: contact.socialLinks || []
    };
  }

  // Converter conteúdo de blocos do Sanity para HTML simples
  private convertBlockContentToHtml(content: any[]): string {
    if (!content || !Array.isArray(content)) return '';
    
    return content.map(block => {
      if (block._type === 'block') {
        const text = block.children?.map((child: any) => child.text).join('') || '';
        switch (block.style) {
          case 'h1': return `<h1>${text}</h1>`;
          case 'h2': return `<h2>${text}</h2>`;
          case 'h3': return `<h3>${text}</h3>`;
          case 'h4': return `<h4>${text}</h4>`;
          default: return `<p>${text}</p>`;
        }
      } else if (block._type === 'image') {
        const imageUrl = this.sanityService.urlFor(block).width(600).url();
        return `<img src="${imageUrl}" alt="Project image" class="w-full rounded-lg my-4" />`;
      }
      return '';
    }).join('');
  }

  // Métodos para gerenciar projetos (apenas quando usando Sanity)
  createProject(project: any): Observable<any> {
    if (!this.useSanity) {
      throw new Error('Criação de projetos só está disponível com Sanity CMS');
    }
    
    const sanityProject = this.convertLocalProjectToSanity(project);
    return this.sanityService.createProject(sanityProject);
  }

  updateProject(id: string, project: any): Observable<any> {
    if (!this.useSanity) {
      throw new Error('Atualização de projetos só está disponível com Sanity CMS');
    }
    
    const sanityProject = this.convertLocalProjectToSanity(project);
    return this.sanityService.updateProject(id, sanityProject);
  }

  deleteProject(id: string): Observable<any> {
    if (!this.useSanity) {
      throw new Error('Exclusão de projetos só está disponível com Sanity CMS');
    }
    
    return this.sanityService.deleteProject(id);
  }

  uploadImage(file: File): Observable<any> {
    if (!this.useSanity) {
      throw new Error('Upload de imagens só está disponível com Sanity CMS');
    }
    
    return this.sanityService.uploadImage(file);
  }

  // Converter projeto local para formato Sanity
  private convertLocalProjectToSanity(project: any): Partial<SanityProject> {
    return {
      title: project.title,
      slug: { current: project.id || project.title.toLowerCase().replace(/\s+/g, '-') },
      description: project.description,
      technologies: project.technologies,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured || false,
      category: project.category || 'web',
      publishedAt: project.date || new Date().toISOString()
    };
  }
}