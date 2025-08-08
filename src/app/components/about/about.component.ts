import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Bio } from '../../services/data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  bio: Bio | null = null;
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadBio();
  }

  private loadBio() {
    this.dataService.getBio().subscribe({
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
    
    return this.dataService.getImageUrl(image);
  }
}