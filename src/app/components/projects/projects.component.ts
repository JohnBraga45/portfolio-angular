import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataAdapterService } from '../../services/data-adapter.service';
import { Project } from '../../services/data.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  featuredProjects: Project[] = [];
  isLoading = true;
  showAll = false;

  constructor(private dataAdapter: DataAdapterService, private router: Router) {}

  ngOnInit() {
    this.loadProjects();
  }

  private loadProjects() {
    // Load featured projects first
    this.dataAdapter.getFeaturedProjects().subscribe({
      next: (projects) => {
        this.featuredProjects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured projects:', error);
        this.loadFallbackProjects();
      }
    });

    // Load all projects
    this.dataAdapter.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
  }

  private loadFallbackProjects() {
    // Fallback data for demo purposes
    this.featuredProjects = [
      {
        _id: 'demo1',
        title: 'E-commerce Platform',
        slug: { current: 'ecommerce-platform' },
        description: 'Plataforma completa de e-commerce com Angular e Node.js',
        content: [],
        technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
        image: null,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        featured: true,
        category: 'Web Development'
      },
      {
        _id: 'demo2',
        title: 'Task Management App',
        slug: { current: 'task-management' },
        description: 'Aplicativo de gerenciamento de tarefas com recursos avançados',
        content: [],
        technologies: ['React', 'Firebase', 'Material-UI'],
        image: null,
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        featured: true,
        category: 'Mobile Development'

      }
    ];
    this.projects = this.featuredProjects;
    this.isLoading = false;
  }

  getImageUrl(image: any): string {
    if (!image) {
      return 'https://via.placeholder.com/400x300?text=Project+Image';
    }
    
    if (typeof image === 'string') {
      return image;
    }
    
    // For Sanity images, the URL is already processed by DataAdapter
    return image;
  }

  getDisplayedProjects(): Project[] {
    if (this.showAll) {
      return this.projects;
    }
    return this.featuredProjects.length > 0 ? this.featuredProjects : this.projects.slice(0, 6);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  trackByProjectId(index: number, project: Project): string {
    return project._id;
  }

  getProjectSlug(project: Project): string {
    return typeof project.slug === 'string' ? project.slug : project.slug.current;
  }
}
