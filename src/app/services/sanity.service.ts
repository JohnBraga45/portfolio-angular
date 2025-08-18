import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface SanityProject {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  content: any[];
  image: any;
  gallery?: any[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  publishedAt: string;
  sortOrder?: number;
}

export interface SanityBio {
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

export interface SanitySkill {
  _id: string;
  name: string;
  category: string;
  level: number;
  icon?: any;
  sortOrder?: number;
}

export interface SanityContact {
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
export class SanityService {
  private client: SanityClient;
  private builder: any;

  constructor() {
    // Configuração do Sanity - substitua pelos seus dados do projeto
    this.client = createClient({
      projectId: environment.sanity.projectId,
      dataset: environment.sanity.dataset,
      useCdn: false, // Desabilitado para desenvolvimento
      apiVersion: environment.sanity.apiVersion,
      // Token será necessário para operações de escrita
      token: environment.sanity.token
    });

    this.builder = imageUrlBuilder(this.client);
  }

  // Método para gerar URLs de imagens do Sanity
  urlFor(source: any) {
    return this.builder.image(source);
  }

  // Buscar todos os projetos
  getProjects(): Observable<SanityProject[]> {
    const query = `*[_type == "project"] | order(sortOrder asc, publishedAt desc) {
      _id,
      title,
      slug,
      description,
      content,
      image,
      gallery,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      category,
      publishedAt,
      sortOrder
    }`;
    
    return from(this.client.fetch(query).catch(error => {
      console.warn('Erro ao buscar projetos do Sanity:', error);
      console.log('Verifique se o projeto Sanity tem dados ou se o token de API está configurado.');
      throw error;
    }));
  }

  // Buscar projetos em destaque
  getFeaturedProjects(): Observable<SanityProject[]> {
    const query = `*[_type == "project" && featured == true] | order(sortOrder asc, publishedAt desc) {
      _id,
      title,
      slug,
      description,
      content,
      image,
      gallery,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      category,
      publishedAt,
      sortOrder
    }`;
    
    return from(this.client.fetch(query));
  }

  // Buscar projeto por slug
  getProjectBySlug(slug: string): Observable<SanityProject | null> {
    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      image,
      gallery,
      technologies,
      liveUrl,
      githubUrl,
      featured,
      category,
      publishedAt,
      sortOrder
    }`;
    
    return from(this.client.fetch(query, { slug }));
  }

  // Buscar biografia
  getBio(): Observable<SanityBio> {
    const query = `*[_type == "bio"][0] {
      _id,
      name,
      title,
      description,
      image,
      resume,
      education,
      certifications,
      softSkills
    }`;
    
    return from(this.client.fetch(query));
  }

  // Buscar habilidades
  getSkills(): Observable<SanitySkill[]> {
    const query = `*[_type == "skill"] | order(sortOrder asc, level desc) {
      _id,
      name,
      category,
      level,
      icon,
      sortOrder
    }`;
    
    return from(this.client.fetch(query));
  }

  // Buscar informações de contato
  getContact(): Observable<SanityContact> {
    const query = `*[_type == "contact"][0] {
      _id,
      email,
      phone,
      location,
      socialLinks
    }`;
    
    return from(this.client.fetch(query));
  }

  // Criar novo projeto (requer token de escrita)
  createProject(project: Partial<SanityProject>): Observable<any> {
    const doc = {
      _type: 'project',
      ...project,
      publishedAt: new Date().toISOString()
    };
    
    return from(this.client.create(doc));
  }

  // Atualizar projeto existente (requer token de escrita)
  updateProject(id: string, project: Partial<SanityProject>): Observable<any> {
    return from(this.client.patch(id).set(project).commit());
  }

  // Deletar projeto (requer token de escrita)
  deleteProject(id: string): Observable<any> {
    return from(this.client.delete(id));
  }

  // Upload de imagem (requer token de escrita)
  uploadImage(file: File): Observable<any> {
    return from(this.client.assets.upload('image', file));
  }

  // Testar conexão com o Sanity
  testConnection(): Observable<boolean> {
    // Fazer uma consulta simples para verificar conectividade
    const query = `*[_type in ["project", "bio", "skill", "contact"]][0...1]`;
    return from(this.client.fetch(query)).pipe(
      map(() => true), // Se a consulta funcionar, retorna true
      catchError(() => of(false)) // Se der erro, retorna false
    );
  }
}