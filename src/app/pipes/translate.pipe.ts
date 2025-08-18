import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Para reagir a mudanças de idioma
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription?: Subscription;
  private lastKey?: string;
  private lastValue?: string;

  constructor(private translationService: TranslationService) {}

  transform(key: string): string {
    if (this.lastKey !== key) {
      this.lastKey = key;
      this.cleanup();
      
      this.subscription = this.translationService.currentLocale$.subscribe(() => {
        this.lastValue = this.translationService.translate(key);
      });
    }
    
    return this.lastValue || this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private cleanup(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}