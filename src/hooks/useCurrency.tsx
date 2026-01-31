import { useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'SAR' | 'EGP';

interface CurrencyData {
  symbol: string;
  rate: number;
  code: Currency;
}

const currencies: Record<Currency, CurrencyData> = {
  USD: { symbol: '$', rate: 1, code: 'USD' },
  EUR: { symbol: '€', rate: 0.92, code: 'EUR' },
  SAR: { symbol: 'SAR', rate: 3.75, code: 'SAR' },
  EGP: { symbol: 'EGP', rate: 50.85, code: 'EGP' },
};

// Map country codes to currencies
const countryToCurrency: Record<string, Currency> = {
  US: 'USD',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  SA: 'SAR',
  AE: 'SAR',
  KW: 'SAR',
  QA: 'SAR',
  BH: 'SAR',
  OM: 'SAR',
  EG: 'EGP',
};

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        // Try to detect from IP
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && countryToCurrency[countryCode]) {
          setCurrency(countryToCurrency[countryCode]);
        }
      } catch (error) {
        // Default to USD if detection fails
        console.log('Currency detection failed, defaulting to USD');
      } finally {
        setIsLoading(false);
      }
    };

    // Check for saved preference first
    const saved = localStorage.getItem('aureka-currency') as Currency;
    if (saved && currencies[saved]) {
      setCurrency(saved);
      setIsLoading(false);
    } else {
      detectCurrency();
    }
  }, []);

  const changeCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('aureka-currency', newCurrency);
  };

  const formatPrice = (usdPrice: number): string => {
    const converted = usdPrice * currencies[currency].rate;
    const symbol = currencies[currency].symbol;
    
    // Format based on currency
    if (currency === 'EGP' || currency === 'SAR') {
      return `${Math.round(converted)} ${symbol}`;
    }
    
    return `${symbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
  };

  const formatYearlyPrice = (monthlyUsdPrice: number, monthsToSave: number = 0): string => {
    const yearlyPrice = monthlyUsdPrice * 12 - (monthlyUsdPrice * monthsToSave);
    return formatPrice(yearlyPrice);
  };

  return {
    currency,
    setCurrency: changeCurrency,
    formatPrice,
    formatYearlyPrice,
    currencies: Object.values(currencies),
    isLoading,
  };
}
