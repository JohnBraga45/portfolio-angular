import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService, Project } from '../../services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  isLoading = true;
  notFound = false;
  relatedProjects: Project[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadProject(slug);
      }
    });
  }

  private loadProject(slug: string): void {
    this.isLoading = true;
    this.notFound = false;

    this.dataService.getProjectBySlug(slug).subscribe({
      next: (project) => {
        this.project = project;
        if (!this.project) {
          this.notFound = true;
        } else {
          // Load related projects
          this.loadRelatedProjects();
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.notFound = true;
        this.isLoading = false;
      }
    });
  }

  private loadRelatedProjects(): void {
    this.dataService.getProjects()
      .pipe(
        map((projects: Project[]) => projects
          .filter((p: Project) => p._id !== this.project?._id)
          .slice(0, 3)
        )
      )
      .subscribe(relatedProjects => {
        this.relatedProjects = relatedProjects;
      });
  }

  getImageUrl(imageRef: string): string {
    return this.dataService.getImageUrl(imageRef);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  trackByProjectId(index: number, project: Project): string {
    return project._id;
  }
}
