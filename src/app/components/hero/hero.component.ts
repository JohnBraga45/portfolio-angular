import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAdapterService } from '../../services/data-adapter.service';
import { Bio } from '../../services/data.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  bio: Bio | null = null;
  isLoading = true;

  constructor(private dataAdapter: DataAdapterService) {}

  ngOnInit() {
    this.loadBio();
  }

  private loadBio() {
    this.dataAdapter.getBio().subscribe({
      next: (bio) => {
        this.bio = bio;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bio:', error);
        this.isLoading = false;
        // Fallback data for demo purposes
        this.bio = {
          _id: 'demo',
          name: 'Seu Nome',
          title: 'Desenvolvedor Full Stack',
          description: 'Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais.',
          image: null
        };
      }
    });
  }

  getImageUrl(image: any): string {
    if (!image) {
      return '/assets/linkedin.jpg';
    }
    
    // Check if it's already a string URL
    if (typeof image === 'string') {
      return image;
    }
    
    // For Sanity images, the URL is already processed by DataAdapter
    return image;
  }

  scrollToSection(sectionId: string) {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
