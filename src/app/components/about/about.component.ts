import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAdapterService } from '../../services/data-adapter.service';
import { Bio } from '../../services/data.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
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
      }
    });
  }

  getImageUrl(image: any): string {
    if (!image) {
      return '/assets/linkedin.jpg';
    }
    
    if (typeof image === 'string') {
      return image;
    }
    
    // For Sanity images, the URL is already processed by DataAdapter
    return image;
  }
}