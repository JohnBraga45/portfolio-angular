import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataAdapterService } from '../../services/data-adapter.service';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">Administração do Portfolio</h1>
          
          <!-- Status do CMS -->
          <div class="mb-8 p-4 rounded-lg" [ngClass]="{
            'bg-green-50 border border-green-200': dataAdapter.isUsingSanity(),
            'bg-yellow-50 border border-yellow-200': !dataAdapter.isUsingSanity()
          }">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5" [ngClass]="{
                  'text-green-400': dataAdapter.isUsingSanity(),
                  'text-yellow-400': !dataAdapter.isUsingSanity()
                }" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium" [ngClass]="{
                  'text-green-800': dataAdapter.isUsingSanity(),
                  'text-yellow-800': !dataAdapter.isUsingSanity()
                }">
                  {{ dataAdapter.isUsingSanity() ? 'Sanity CMS Ativo' : 'Usando Dados Locais' }}
                </h3>
                <div class="mt-2 text-sm" [ngClass]="{
                  'text-green-700': dataAdapter.isUsingSanity(),
                  'text-yellow-700': !dataAdapter.isUsingSanity()
                }">
                  <p *ngIf="dataAdapter.isUsingSanity()">
                    O Sanity CMS está configurado e funcionando. Você pode gerenciar o conteúdo através do Studio.
                  </p>
                  <p *ngIf="!dataAdapter.isUsingSanity()">
                    O Sanity CMS não está configurado. Configure o Project ID para ativar o CMS.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Controles -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Alternar Fonte de Dados -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Fonte de Dados</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    name="dataSource" 
                    [checked]="!dataAdapter.isUsingSanity()"
                    (change)="toggleDataSource(false)"
                    class="mr-2">
                  <span>Dados Locais (data.service.ts)</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="radio" 
                    name="dataSource" 
                    [checked]="dataAdapter.isUsingSanity()"
                    (change)="toggleDataSource(true)"
                    class="mr-2">
                  <span>Sanity CMS</span>
                </label>
              </div>
            </div>

            <!-- Estatísticas -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Estatísticas</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div>Projetos: {{ stats.projects }}</div>
                <div>Projetos em Destaque: {{ stats.featuredProjects }}</div>
                <div>Habilidades: {{ stats.skills }}</div>
              </div>
            </div>
          </div>

          <!-- Links Úteis -->
          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 class="text-lg font-semibold text-blue-900 mb-3">Links Úteis</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="http://localhost:3333" 
                target="_blank"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Abrir Sanity Studio
              </a>
              
              <button 
                (click)="refreshData()"
                [disabled]="isRefreshing"
                class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                <svg class="w-4 h-4 mr-2" [ngClass]="{'animate-spin': isRefreshing}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                {{ isRefreshing ? 'Atualizando...' : 'Atualizar Dados' }}
              </button>
            </div>
          </div>

          <!-- Upload de Imagem (apenas com Sanity) -->
          <div *ngIf="dataAdapter.isUsingSanity()" class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Upload de Imagem</h3>
            <div class="flex items-center space-x-4">
              <input 
                type="file" 
                accept="image/*"
                (change)="onFileSelected($event)"
                #fileInput
                class="hidden">
              <button 
                (click)="fileInput.click()"
                class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Selecionar Imagem
              </button>
              <button 
                *ngIf="selectedFile"
                (click)="uploadImage()"
                [disabled]="isUploading"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                {{ isUploading ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
            <p *ngIf="selectedFile" class="mt-2 text-sm text-gray-600">
              Arquivo selecionado: {{ selectedFile.name }}
            </p>
            <p *ngIf="uploadResult" class="mt-2 text-sm text-green-600">
              Upload realizado com sucesso! URL: {{ uploadResult.url }}
            </p>
          </div>

          <!-- Instruções -->
          <div class="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Instruções</h3>
            <div class="text-sm text-gray-600 space-y-2">
              <p><strong>Para usar o Sanity CMS:</strong></p>
              <ol class="list-decimal list-inside space-y-1 ml-4">
                <li>Configure o Project ID no arquivo <code class="bg-gray-200 px-1 rounded">sanity.config.js</code></li>
                <li>Configure o Project ID no arquivo <code class="bg-gray-200 px-1 rounded">sanity.service.ts</code></li>
                <li>Execute <code class="bg-gray-200 px-1 rounded">npm run sanity:start</code> para iniciar o Studio</li>
                <li>Adicione conteúdo através do Studio em <code class="bg-gray-200 px-1 rounded">http://localhost:3333</code></li>
              </ol>
              <p class="mt-4"><strong>Documentação completa:</strong> Consulte o arquivo <code class="bg-gray-200 px-1 rounded">SANITY-CMS-SETUP.md</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: []
})
export class AdminComponent implements OnInit {
  stats = {
    projects: 0,
    featuredProjects: 0,
    skills: 0
  };
  
  isRefreshing = false;
  selectedFile: File | null = null;
  isUploading = false;
  uploadResult: any = null;

  constructor(
    public dataAdapter: DataAdapterService,
    private sanityService: SanityService
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  toggleDataSource(useSanity: boolean) {
    this.dataAdapter.toggleDataSource(useSanity);
    this.loadStats();
  }

  refreshData() {
    this.isRefreshing = true;
    this.loadStats();
    
    setTimeout(() => {
      this.isRefreshing = false;
    }, 1000);
  }

  private loadStats() {
    // Carregar estatísticas
    this.dataAdapter.getProjects().subscribe(projects => {
      this.stats.projects = projects.length;
    });
    
    this.dataAdapter.getFeaturedProjects().subscribe(projects => {
      this.stats.featuredProjects = projects.length;
    });
    
    this.dataAdapter.getSkills().subscribe(skills => {
      this.stats.skills = skills.length;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadResult = null;
    }
  }

  uploadImage() {
    if (!this.selectedFile || !this.dataAdapter.isUsingSanity()) {
      return;
    }

    this.isUploading = true;
    this.dataAdapter.uploadImage(this.selectedFile).subscribe({
      next: (result) => {
        this.uploadResult = result;
        this.isUploading = false;
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Erro no upload:', error);
        this.isUploading = false;
      }
    });
  }
}