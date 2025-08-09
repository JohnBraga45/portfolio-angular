import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CryptoCurrency } from '../components/crypto-dashboard/crypto-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coingecko.com/api/v3';
  
  // Dados mock para fallback quando a API não estiver disponível
  private mockData: CryptoCurrency[] = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 43250.00,
      price_change_percentage_24h: 2.45,
      market_cap: 847200000000,
      total_volume: 28500000000,
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      sparkline_in_7d: {
        price: [41000, 41500, 42000, 42500, 43000, 43500, 43250]
      }
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 2650.00,
      price_change_percentage_24h: 1.85,
      market_cap: 318700000000,
      total_volume: 15200000000,
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      sparkline_in_7d: {
        price: [2500, 2550, 2600, 2620, 2640, 2660, 2650]
      }
    },
    {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      current_price: 0.485,
      price_change_percentage_24h: -0.75,
      market_cap: 17100000000,
      total_volume: 850000000,
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      sparkline_in_7d: {
        price: [0.50, 0.49, 0.48, 0.485, 0.487, 0.486, 0.485]
      }
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      current_price: 315.50,
      price_change_percentage_24h: 3.20,
      market_cap: 47200000000,
      total_volume: 1800000000,
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      sparkline_in_7d: {
        price: [300, 305, 310, 312, 314, 316, 315.50]
      }
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      current_price: 98.75,
      price_change_percentage_24h: 5.40,
      market_cap: 44800000000,
      total_volume: 2100000000,
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      sparkline_in_7d: {
        price: [90, 92, 94, 96, 97, 99, 98.75]
      }
    },
    {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      current_price: 0.62,
      price_change_percentage_24h: -1.20,
      market_cap: 33500000000,
      total_volume: 1200000000,
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      sparkline_in_7d: {
        price: [0.65, 0.64, 0.63, 0.62, 0.61, 0.62, 0.62]
      }
    },
    {
      id: 'polkadot',
      symbol: 'dot',
      name: 'Polkadot',
      current_price: 7.85,
      price_change_percentage_24h: 2.10,
      market_cap: 10200000000,
      total_volume: 420000000,
      image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
      sparkline_in_7d: {
        price: [7.50, 7.60, 7.70, 7.75, 7.80, 7.85, 7.85]
      }
    },
    {
      id: 'dogecoin',
      symbol: 'doge',
      name: 'Dogecoin',
      current_price: 0.085,
      price_change_percentage_24h: 4.80,
      market_cap: 12100000000,
      total_volume: 890000000,
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      sparkline_in_7d: {
        price: [0.080, 0.081, 0.082, 0.083, 0.084, 0.085, 0.085]
      }
    },
    {
      id: 'avalanche-2',
      symbol: 'avax',
      name: 'Avalanche',
      current_price: 36.20,
      price_change_percentage_24h: 1.50,
      market_cap: 14800000000,
      total_volume: 650000000,
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      sparkline_in_7d: {
        price: [35, 35.5, 36, 36.1, 36.2, 36.3, 36.20]
      }
    },
    {
      id: 'chainlink',
      symbol: 'link',
      name: 'Chainlink',
      current_price: 14.85,
      price_change_percentage_24h: 0.90,
      market_cap: 8700000000,
      total_volume: 380000000,
      image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
      sparkline_in_7d: {
        price: [14.50, 14.60, 14.70, 14.75, 14.80, 14.85, 14.85]
      }
    },
    {
      id: 'polygon',
      symbol: 'matic',
      name: 'Polygon',
      current_price: 0.92,
      price_change_percentage_24h: -0.50,
      market_cap: 9200000000,
      total_volume: 420000000,
      image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
      sparkline_in_7d: {
        price: [0.95, 0.94, 0.93, 0.92, 0.91, 0.92, 0.92]
      }
    },
    {
      id: 'litecoin',
      symbol: 'ltc',
      name: 'Litecoin',
      current_price: 72.50,
      price_change_percentage_24h: 1.20,
      market_cap: 5400000000,
      total_volume: 280000000,
      image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
      sparkline_in_7d: {
        price: [70, 71, 72, 72.2, 72.4, 72.5, 72.50]
      }
    },
    {
      id: 'uniswap',
      symbol: 'uni',
      name: 'Uniswap',
      current_price: 6.85,
      price_change_percentage_24h: 2.80,
      market_cap: 5100000000,
      total_volume: 180000000,
      image: 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
      sparkline_in_7d: {
        price: [6.50, 6.60, 6.70, 6.75, 6.80, 6.85, 6.85]
      }
    },
    {
      id: 'stellar',
      symbol: 'xlm',
      name: 'Stellar',
      current_price: 0.115,
      price_change_percentage_24h: -1.80,
      market_cap: 3200000000,
      total_volume: 95000000,
      image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
      sparkline_in_7d: {
        price: [0.120, 0.118, 0.116, 0.115, 0.114, 0.115, 0.115]
      }
    },
    {
      id: 'vechain',
      symbol: 'vet',
      name: 'VeChain',
      current_price: 0.028,
      price_change_percentage_24h: 3.50,
      market_cap: 2100000000,
      total_volume: 85000000,
      image: 'https://assets.coingecko.com/coins/images/1167/large/VeChain-Logo-768x725.png',
      sparkline_in_7d: {
        price: [0.026, 0.027, 0.027, 0.028, 0.028, 0.028, 0.028]
      }
    },
    {
      id: 'filecoin',
      symbol: 'fil',
      name: 'Filecoin',
      current_price: 5.20,
      price_change_percentage_24h: 0.80,
      market_cap: 2800000000,
      total_volume: 120000000,
      image: 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png',
      sparkline_in_7d: {
        price: [5.10, 5.15, 5.18, 5.20, 5.19, 5.20, 5.20]
      }
    },
    {
      id: 'tron',
      symbol: 'trx',
      name: 'TRON',
      current_price: 0.105,
      price_change_percentage_24h: 2.40,
      market_cap: 9400000000,
      total_volume: 320000000,
      image: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png',
      sparkline_in_7d: {
        price: [0.100, 0.102, 0.103, 0.104, 0.105, 0.105, 0.105]
      }
    },
    {
      id: 'ethereum-classic',
      symbol: 'etc',
      name: 'Ethereum Classic',
      current_price: 26.80,
      price_change_percentage_24h: -0.30,
      market_cap: 3900000000,
      total_volume: 180000000,
      image: 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
      sparkline_in_7d: {
        price: [27, 26.9, 26.8, 26.7, 26.8, 26.8, 26.80]
      }
    },
    {
      id: 'monero',
      symbol: 'xmr',
      name: 'Monero',
      current_price: 158.50,
      price_change_percentage_24h: 1.10,
      market_cap: 2900000000,
      total_volume: 95000000,
      image: 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png',
      sparkline_in_7d: {
        price: [155, 156, 157, 158, 158.2, 158.5, 158.50]
      }
    }
  ];

  constructor(private http: HttpClient) {}

  /**
   * Busca as top criptomoedas
   * @param limit Número de moedas para retornar
   */
  getTopCryptos(limit: number = 10): Observable<CryptoCurrency[]> {
    const url = `${this.baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=24h`;
    
    return this.http.get<CryptoCurrency[]>(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando dados mock:', error);
        return of(this.mockData.slice(0, limit));
      })
    );
  }

  /**
   * Busca dados históricos de uma criptomoeda
   * @param coinId ID da moeda
   * @param days Número de dias
   */
  getCryptoHistory(coinId: string, days: number = 7): Observable<any> {
    const url = `${this.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando dados mock para histórico:', error);
        
        // Gerar dados mock para o gráfico
        const mockPrices = [];
        const basePrice = this.getMockPrice(coinId);
        const now = Date.now();
        
        for (let i = days; i >= 0; i--) {
          const timestamp = now - (i * 24 * 60 * 60 * 1000);
          const variation = (Math.random() - 0.5) * 0.1; // Variação de ±5%
          const price = basePrice * (1 + variation);
          mockPrices.push([timestamp, price]);
        }
        
        return of({ prices: mockPrices });
      })
    );
  }

  /**
   * Busca informações detalhadas de uma criptomoeda
   * @param coinId ID da moeda
   */
  getCryptoDetails(coinId: string): Observable<any> {
    const url = `${this.baseUrl}/coins/${coinId}`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando dados mock para detalhes:', error);
        const mockCrypto = this.mockData.find(crypto => crypto.id === coinId);
        return of(mockCrypto || this.mockData[0]);
      })
    );
  }

  /**
   * Busca preços de múltiplas criptomoedas
   * @param coinIds Array de IDs das moedas
   */
  getMultiplePrices(coinIds: string[]): Observable<any> {
    const ids = coinIds.join(',');
    const url = `${this.baseUrl}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando dados mock para preços:', error);
        
        const mockPrices: any = {};
        coinIds.forEach(id => {
          const crypto = this.mockData.find(c => c.id === id);
          if (crypto) {
            mockPrices[id] = {
              usd: crypto.current_price,
              usd_24h_change: crypto.price_change_percentage_24h
            };
          }
        });
        
        return of(mockPrices);
      })
    );
  }

  /**
   * Busca lista de todas as criptomoedas disponíveis
   */
  getAllCoins(): Observable<any[]> {
    const url = `${this.baseUrl}/coins/list`;
    
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando lista mock:', error);
        return of(this.mockData.map(crypto => ({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name
        })));
      })
    );
  }

  /**
   * Busca tendências do mercado
   */
  getMarketTrends(): Observable<any> {
    const url = `${this.baseUrl}/search/trending`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando tendências mock:', error);
        return of({
          coins: this.mockData.slice(0, 7).map(crypto => ({
            item: {
              id: crypto.id,
              name: crypto.name,
              symbol: crypto.symbol,
              market_cap_rank: Math.floor(Math.random() * 100) + 1,
              thumb: crypto.image
            }
          }))
        });
      })
    );
  }

  /**
   * Busca dados globais do mercado
   */
  getGlobalMarketData(): Observable<any> {
    const url = `${this.baseUrl}/global`;
    
    return this.http.get(url).pipe(
      catchError(error => {
        console.warn('API CoinGecko indisponível, usando dados globais mock:', error);
        return of({
          data: {
            active_cryptocurrencies: 13000,
            markets: 750,
            total_market_cap: {
              usd: 1750000000000
            },
            total_volume: {
              usd: 85000000000
            },
            market_cap_percentage: {
              btc: 48.5,
              eth: 18.2
            }
          }
        });
      })
    );
  }

  /**
   * Função auxiliar para obter preço mock baseado no ID
   */
  private getMockPrice(coinId: string): number {
    const crypto = this.mockData.find(c => c.id === coinId);
    return crypto ? crypto.current_price : 1000;
  }

  /**
   * Simula dados em tempo real (para demonstração)
   */
  getRealtimePrice(coinId: string): Observable<number> {
    const basePrice = this.getMockPrice(coinId);
    
    // Simula variação de preço em tempo real
    return new Observable(observer => {
      const interval = setInterval(() => {
        const variation = (Math.random() - 0.5) * 0.02; // Variação de ±1%
        const newPrice = basePrice * (1 + variation);
        observer.next(newPrice);
      }, 5000); // Atualiza a cada 5 segundos
      
      return () => clearInterval(interval);
    });
  }

  /**
   * Converte valor entre moedas
   */
  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
    // Implementação simplificada - em produção usaria API de conversão
    if (fromCurrency === 'usd' && toCurrency === 'brl') {
      return of(amount * 5.2); // Taxa mock USD para BRL
    }
    if (fromCurrency === 'brl' && toCurrency === 'usd') {
      return of(amount / 5.2); // Taxa mock BRL para USD
    }
    return of(amount); // Mesma moeda
  }

  /**
   * Calcula indicadores técnicos simples
   */
  calculateTechnicalIndicators(prices: number[]): any {
    if (prices.length < 2) return null;
    
    const sma7 = prices.slice(-7).reduce((a, b) => a + b, 0) / Math.min(7, prices.length);
    const sma30 = prices.slice(-30).reduce((a, b) => a + b, 0) / Math.min(30, prices.length);
    
    const currentPrice = prices[prices.length - 1];
    const previousPrice = prices[prices.length - 2];
    
    return {
      sma7,
      sma30,
      trend: currentPrice > sma7 ? 'bullish' : 'bearish',
      momentum: ((currentPrice - previousPrice) / previousPrice) * 100,
      support: Math.min(...prices.slice(-30)),
      resistance: Math.max(...prices.slice(-30))
    };
  }
}