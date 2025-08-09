import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { CryptoService } from '../../services/crypto.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

Chart.register(...registerables);

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  image: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
}

@Component({
  selector: 'app-crypto-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <!-- Header -->
      <header class="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div class="container mx-auto px-4 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🚀 Crypto Dashboard
              </h1>
              <p class="text-gray-400 mt-1">Acompanhe o mercado de criptomoedas em tempo real</p>
            </div>
            <div class="flex items-center space-x-4">
              <button 
                (click)="toggleTheme()"
                class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                {{ isDarkMode ? '☀️' : '🌙' }}
              </button>
              <div class="text-right">
                <p class="text-sm text-gray-400">Última atualização</p>
                <p class="text-xs text-green-400">{{ lastUpdate | date:'HH:mm:ss' }}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="container mx-auto px-4 py-8">
        <!-- Market Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div *ngFor="let crypto of topCryptos" 
               class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img [src]="crypto.image" [alt]="crypto.name" class="w-10 h-10 rounded-full">
                <div>
                  <h3 class="font-semibold">{{ crypto.name }}</h3>
                  <p class="text-sm text-gray-400 uppercase">{{ crypto.symbol }}</p>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-2xl font-bold">
                {{ crypto.current_price | currency:'USD':'symbol':'1.2-2' }}
              </p>
              <p [class]="crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'" 
                 class="text-sm font-medium">
                {{ crypto.price_change_percentage_24h >= 0 ? '+' : '' }}{{ crypto.price_change_percentage_24h | number:'1.2-2' }}% (24h)
              </p>
              <p class="text-xs text-gray-400">
                Cap: {{ formatMarketCap(crypto.market_cap) }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Price Chart -->
          <div class="lg:col-span-2">
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold">📈 Gráfico de Preços</h2>
                <select 
                  [(ngModel)]="selectedCrypto" 
                  (change)="updateChart()"
                  class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
                  <option *ngFor="let crypto of topCryptos" [value]="crypto.id">
                    {{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})
                  </option>
                </select>
              </div>
              <div class="relative h-80">
                <canvas #priceChart></canvas>
              </div>
            </div>
          </div>

          <!-- Portfolio Tracker -->
          <div class="space-y-6">
            <!-- Portfolio Summary -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 class="text-xl font-bold mb-4">💼 Meu Portfólio</h2>
              <div class="space-y-4">
                <div class="text-center p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg">
                  <p class="text-sm text-gray-400">Valor Total</p>
                  <p class="text-2xl font-bold text-green-400">
                    {{ getTotalPortfolioValue() | currency:'USD':'symbol':'1.2-2' }}
                  </p>
                  <p [class]="getTotalPortfolioChange() >= 0 ? 'text-green-400' : 'text-red-400'" 
                     class="text-sm">
                    {{ getTotalPortfolioChange() >= 0 ? '+' : '' }}{{ getTotalPortfolioChange() | number:'1.2-2' }}%
                  </p>
                </div>
                
                <div *ngFor="let item of portfolio" 
                     class="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <img [src]="item.image" [alt]="item.name" class="w-8 h-8 rounded-full">
                    <div>
                      <p class="font-medium">{{ item.symbol.toUpperCase() }}</p>
                      <p class="text-xs text-gray-400">{{ item.amount }} {{ item.symbol.toUpperCase() }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-medium">{{ (item.amount * item.currentPrice) | currency:'USD':'symbol':'1.2-2' }}</p>
                    <p [class]="getItemChange(item) >= 0 ? 'text-green-400' : 'text-red-400'" 
                       class="text-xs">
                      {{ getItemChange(item) >= 0 ? '+' : '' }}{{ getItemChange(item) | number:'1.2-2' }}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Price Alerts -->
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 class="text-xl font-bold mb-4">🔔 Alertas de Preço</h2>
              
              <!-- Add Alert Form -->
              <div class="mb-4 p-4 bg-gray-700/50 rounded-lg">
                <div class="space-y-3">
                  <select 
                    [(ngModel)]="newAlert.symbol" 
                    class="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white">
                    <option value="">Selecionar moeda</option>
                    <option *ngFor="let crypto of topCryptos" [value]="crypto.symbol">
                      {{ crypto.name }} ({{ crypto.symbol.toUpperCase() }})
                    </option>
                  </select>
                  
                  <div class="flex space-x-2">
                    <select 
                      [(ngModel)]="newAlert.condition" 
                      class="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white">
                      <option value="above">Acima de</option>
                      <option value="below">Abaixo de</option>
                    </select>
                    <input 
                      type="number" 
                      [(ngModel)]="newAlert.targetPrice" 
                      placeholder="Preço alvo"
                      class="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white">
                  </div>
                  
                  <button 
                    (click)="addAlert()" 
                    [disabled]="!newAlert.symbol || !newAlert.targetPrice"
                    class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded px-4 py-2 font-medium transition-colors">
                    Adicionar Alerta
                  </button>
                </div>
              </div>

              <!-- Active Alerts -->
              <div class="space-y-2">
                <div *ngFor="let alert of alerts" 
                     class="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p class="font-medium">{{ alert.symbol.toUpperCase() }}</p>
                    <p class="text-sm text-gray-400">
                      {{ alert.condition === 'above' ? 'Acima de' : 'Abaixo de' }} 
                      {{ alert.targetPrice | currency:'USD':'symbol':'1.2-2' }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button 
                      (click)="toggleAlert(alert.id)" 
                      [class]="alert.isActive ? 'text-green-400' : 'text-gray-400'"
                      class="hover:text-white transition-colors">
                      {{ alert.isActive ? '🔔' : '🔕' }}
                    </button>
                    <button 
                      (click)="removeAlert(alert.id)" 
                      class="text-red-400 hover:text-red-300 transition-colors">
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div *ngIf="alerts.length === 0" class="text-center py-4 text-gray-400">
                  Nenhum alerta configurado
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Market Table -->
        <div class="mt-8">
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 class="text-xl font-bold mb-6">📊 Top 20 Criptomoedas</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-700">
                    <th class="text-left py-3 px-4">#</th>
                    <th class="text-left py-3 px-4">Moeda</th>
                    <th class="text-right py-3 px-4">Preço</th>
                    <th class="text-right py-3 px-4">24h %</th>
                    <th class="text-right py-3 px-4">Market Cap</th>
                    <th class="text-right py-3 px-4">Volume</th>
                    <th class="text-center py-3 px-4">7d</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let crypto of allCryptos; let i = index" 
                      class="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                    <td class="py-3 px-4 text-gray-400">{{ i + 1 }}</td>
                    <td class="py-3 px-4">
                      <div class="flex items-center space-x-3">
                        <img [src]="crypto.image" [alt]="crypto.name" class="w-8 h-8 rounded-full">
                        <div>
                          <p class="font-medium">{{ crypto.name }}</p>
                          <p class="text-sm text-gray-400 uppercase">{{ crypto.symbol }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-right font-medium">
                      {{ crypto.current_price | currency:'USD':'symbol':'1.2-2' }}
                    </td>
                    <td class="py-3 px-4 text-right" 
                        [class]="crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'">
                      {{ crypto.price_change_percentage_24h >= 0 ? '+' : '' }}{{ crypto.price_change_percentage_24h | number:'1.2-2' }}%
                    </td>
                    <td class="py-3 px-4 text-right text-gray-300">
                      {{ formatMarketCap(crypto.market_cap) }}
                    </td>
                    <td class="py-3 px-4 text-right text-gray-300">
                      {{ formatMarketCap(crypto.total_volume) }}
                    </td>
                    <td class="py-3 px-4 text-center">
                      <div class="w-16 h-8 mx-auto">
                        <canvas [id]="'sparkline-' + crypto.id" class="w-full h-full"></canvas>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .container {
      max-width: 1400px;
    }
    
    canvas {
      max-width: 100%;
      height: auto;
    }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: #374151;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #6b7280;
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `]
})
export class CryptoDashboardComponent implements OnInit, OnDestroy {
  topCryptos: CryptoCurrency[] = [];
  allCryptos: CryptoCurrency[] = [];
  portfolio: PortfolioItem[] = [];
  alerts: PriceAlert[] = [];
  
  selectedCrypto = 'bitcoin';
  isDarkMode = true;
  lastUpdate = new Date();
  
  newAlert = {
    symbol: '',
    targetPrice: 0,
    condition: 'above' as 'above' | 'below'
  };
  
  private chart: Chart | null = null;
  private subscription: Subscription = new Subscription();
  
  constructor(private cryptoService: CryptoService) {}
  
  ngOnInit() {
    this.loadInitialData();
    this.setupAutoRefresh();
    this.loadPortfolio();
    this.loadAlerts();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.chart) {
      this.chart.destroy();
    }
  }
  
  private loadInitialData() {
    this.cryptoService.getTopCryptos(4).subscribe(data => {
      this.topCryptos = data;
      this.updatePortfolioPrices();
    });
    
    this.cryptoService.getTopCryptos(20).subscribe(data => {
      this.allCryptos = data;
      this.createSparklines();
    });
    
    this.updateChart();
  }
  
  private setupAutoRefresh() {
    // Atualizar a cada 30 segundos
    this.subscription.add(
      interval(30000).pipe(
        switchMap(() => this.cryptoService.getTopCryptos(4))
      ).subscribe(data => {
        this.topCryptos = data;
        this.lastUpdate = new Date();
        this.updatePortfolioPrices();
        this.checkAlerts();
      })
    );
  }
  
  private loadPortfolio() {
    // Portfolio de exemplo - em uma aplicação real, isso viria de um serviço
    this.portfolio = [
      {
        id: '1',
        symbol: 'btc',
        name: 'Bitcoin',
        amount: 0.5,
        purchasePrice: 40000,
        currentPrice: 43250,
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
      },
      {
        id: '2',
        symbol: 'eth',
        name: 'Ethereum',
        amount: 2.5,
        purchasePrice: 2400,
        currentPrice: 2650,
        image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
      },
      {
        id: '3',
        symbol: 'ada',
        name: 'Cardano',
        amount: 1000,
        purchasePrice: 0.50,
        currentPrice: 0.485,
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png'
      }
    ];
  }
  
  private loadAlerts() {
    // Carregar alertas salvos do localStorage
    const savedAlerts = localStorage.getItem('cryptoAlerts');
    if (savedAlerts) {
      this.alerts = JSON.parse(savedAlerts);
    }
  }
  
  private saveAlerts() {
    localStorage.setItem('cryptoAlerts', JSON.stringify(this.alerts));
  }
  
  updateChart() {
    this.cryptoService.getCryptoHistory(this.selectedCrypto, 7).subscribe(data => {
      this.createPriceChart(data);
    });
  }
  
  private createPriceChart(data: any) {
    if (typeof document === 'undefined') return;
    
    const canvas = document.querySelector('#priceChart') as HTMLCanvasElement;
    if (!canvas) return;
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const prices = data.prices.map((price: [number, number]) => price[1]);
    const labels = data.prices.map((price: [number, number]) => 
      new Date(price[0]).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
    );
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Preço (USD)',
          data: prices,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: '#374151'
            },
            ticks: {
              color: '#9ca3af'
            }
          },
          y: {
            grid: {
              color: '#374151'
            },
            ticks: {
              color: '#9ca3af',
              callback: function(value) {
                return '$' + Number(value).toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  
  private createSparklines() {
    setTimeout(() => {
      if (typeof document === 'undefined') return;
      
      this.allCryptos.forEach(crypto => {
        if (crypto.sparkline_in_7d?.price) {
          const canvas = document.getElementById(`sparkline-${crypto.id}`) as HTMLCanvasElement;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: crypto.sparkline_in_7d.price.map((_, i) => i),
                  datasets: [{
                    data: crypto.sparkline_in_7d.price,
                    borderColor: crypto.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    x: { display: false },
                    y: { display: false }
                  },
                  elements: {
                    point: { radius: 0 }
                  }
                }
              });
            }
          }
        }
      });
    }, 100);
  }
  
  private updatePortfolioPrices() {
    this.portfolio.forEach(item => {
      const crypto = this.topCryptos.find(c => c.symbol === item.symbol);
      if (crypto) {
        item.currentPrice = crypto.current_price;
      }
    });
  }
  
  getTotalPortfolioValue(): number {
    return this.portfolio.reduce((total, item) => 
      total + (item.amount * item.currentPrice), 0
    );
  }
  
  getTotalPortfolioChange(): number {
    const currentValue = this.getTotalPortfolioValue();
    const purchaseValue = this.portfolio.reduce((total, item) => 
      total + (item.amount * item.purchasePrice), 0
    );
    return ((currentValue - purchaseValue) / purchaseValue) * 100;
  }
  
  getItemChange(item: PortfolioItem): number {
    return ((item.currentPrice - item.purchasePrice) / item.purchasePrice) * 100;
  }
  
  formatMarketCap(value: number): string {
    if (value >= 1e12) {
      return '$' + (value / 1e12).toFixed(2) + 'T';
    } else if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(2) + 'B';
    } else if (value >= 1e6) {
      return '$' + (value / 1e6).toFixed(2) + 'M';
    }
    return '$' + value.toLocaleString();
  }
  
  addAlert() {
    if (this.newAlert.symbol && this.newAlert.targetPrice > 0) {
      const alert: PriceAlert = {
        id: Date.now().toString(),
        symbol: this.newAlert.symbol,
        targetPrice: this.newAlert.targetPrice,
        condition: this.newAlert.condition,
        isActive: true
      };
      
      this.alerts.push(alert);
      this.saveAlerts();
      
      // Reset form
      this.newAlert = {
        symbol: '',
        targetPrice: 0,
        condition: 'above'
      };
    }
  }
  
  removeAlert(id: string) {
    this.alerts = this.alerts.filter(alert => alert.id !== id);
    this.saveAlerts();
  }
  
  toggleAlert(id: string) {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.isActive = !alert.isActive;
      this.saveAlerts();
    }
  }
  
  private checkAlerts() {
    this.alerts.filter(alert => alert.isActive).forEach(alert => {
      const crypto = this.topCryptos.find(c => c.symbol === alert.symbol);
      if (crypto) {
        const shouldTrigger = alert.condition === 'above' 
          ? crypto.current_price >= alert.targetPrice
          : crypto.current_price <= alert.targetPrice;
          
        if (shouldTrigger) {
          this.showNotification(alert, crypto);
          alert.isActive = false; // Desativar após disparar
          this.saveAlerts();
        }
      }
    });
  }
  
  private showNotification(alert: PriceAlert, crypto: CryptoCurrency) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Alerta de Preço - ${crypto.name}`, {
        body: `${crypto.symbol.toUpperCase()} está ${alert.condition === 'above' ? 'acima' : 'abaixo'} de $${alert.targetPrice}. Preço atual: $${crypto.current_price}`,
        icon: crypto.image
      });
    }
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // Em uma aplicação real, isso mudaria o tema globalmente
  }
  
  // Solicitar permissão para notificações
  requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}