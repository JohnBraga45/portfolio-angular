import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAdapterService } from '../../services/data-adapter.service';
import { Skill } from '../../services/data.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillCategories: { [key: string]: Skill[] } = {};
  isLoading = true;

  constructor(private dataAdapter: DataAdapterService) {}

  ngOnInit() {
    this.loadSkills();
  }

  private loadSkills() {
    this.dataAdapter.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.organizeSkillsByCategory();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading skills:', error);
        this.loadFallbackSkills();
      }
    });
  }

  private loadFallbackSkills() {
    // Fallback data for demo purposes
    this.skills = [
      { _id: '1', name: 'Angular', category: 'Frontend', level: 90 },
      { _id: '2', name: 'React', category: 'Frontend', level: 85 },
      { _id: '3', name: 'TypeScript', category: 'Frontend', level: 88 },
      { _id: '4', name: 'JavaScript', category: 'Frontend', level: 92 },
      { _id: '5', name: 'HTML/CSS', category: 'Frontend', level: 95 },
      { _id: '6', name: 'TailwindCSS', category: 'Frontend', level: 87 },
      { _id: '7', name: 'Node.js', category: 'Backend', level: 82 },
      { _id: '8', name: 'Express.js', category: 'Backend', level: 80 },
      { _id: '9', name: 'MongoDB', category: 'Database', level: 78 },
      { _id: '10', name: 'PostgreSQL', category: 'Database', level: 75 },
      { _id: '11', name: 'Git', category: 'Tools', level: 90 },
      { _id: '12', name: 'Docker', category: 'Tools', level: 70 },
      { _id: '13', name: 'AWS', category: 'Cloud', level: 65 },
      { _id: '14', name: 'Firebase', category: 'Cloud', level: 80 }
    ];
    this.organizeSkillsByCategory();
    this.isLoading = false;
  }

  private organizeSkillsByCategory() {
    this.skillCategories = this.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as { [key: string]: Skill[] });
  }

  getCategoryKeys(): string[] {
    return Object.keys(this.skillCategories);
  }

  getSkillLevelColor(level: number): string {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    if (level >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  }

  getSkillLevelText(level: number): string {
    if (level >= 90) return 'Avançado';
    if (level >= 80) return 'Proficiente';
    if (level >= 70) return 'Intermediário';
    if (level >= 60) return 'Básico';
    return 'Iniciante';
  }

  getAdvancedSkillsCount(): number {
    return this.skills.filter(s => s.level >= 90).length;
  }

  getProficientSkillsCount(): number {
    return this.skills.filter(s => s.level >= 70 && s.level < 90).length;
  }

  getCategoriesCount(): number {
    return Object.keys(this.skillCategories).length;
  }
}
