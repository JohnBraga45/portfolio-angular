import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="relative inline-block text-left">
      <button
        type="button"
        class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen"
      >
        <span class="mr-2">{{ getCurrentFlag() }}</span>
        {{ translationService.getLocaleDisplayName(translationService.getCurrentLocale()) }}
        <svg class="-mr-1 ml-2 h-5 w-5 transition-transform duration-200" [class.rotate-180]="isOpen" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>

      <div
        *ngIf="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        role="menu"
      >
        <div class="py-1" role="none">
          <button
            *ngFor="let locale of supportedLocales"
            type="button"
            class="group flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            [class.bg-gray-100]="locale === translationService.getCurrentLocale()"
            [class.dark:bg-gray-700]="locale === translationService.getCurrentLocale()"
            (click)="selectLanguage(locale)"
            role="menuitem"
          >
            <span class="mr-3">{{ getFlag(locale) }}</span>
            {{ translationService.getLocaleDisplayName(locale) }}
            <svg
              *ngIf="locale === translationService.getCurrentLocale()"
              class="ml-auto h-4 w-4 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Overlay para fechar o dropdown quando clicar fora -->
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-40"
      (click)="closeDropdown()"
    ></div>
  `,
  styles: [`
    :host {
      position: relative;
    }
    
    .rotate-180 {
      transform: rotate(180deg);
    }
  `]
})
export class LanguageSelectorComponent {
  isOpen = false;
  supportedLocales: string[];

  private flags: { [key: string]: string } = {
    'pt': '🇧🇷',
    'en': '🇺🇸'
  };

  constructor(public translationService: TranslationService) {
    this.supportedLocales = this.translationService.getSupportedLocales();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  selectLanguage(locale: string): void {
    this.translationService.setLocale(locale);
    this.closeDropdown();
  }

  getCurrentFlag(): string {
    return this.getFlag(this.translationService.getCurrentLocale());
  }

  getFlag(locale: string): string {
    return this.flags[locale] || '🌐';
  }
}