import { useCurrencyContext, Currency } from '@/contexts/CurrencyContext';

interface CurrencyData {
  symbol: string;
  code: Currency;
}

const currencyInfo: Record<Currency, CurrencyData> = {
  USD: { symbol: '$', code: 'USD' },
  EUR: { symbol: '€', code: 'EUR' },
  SAR: { symbol: 'SAR', code: 'SAR' },
  EGP: { symbol: 'EGP', code: 'EGP' },
};

// Fixed price mappings per currency (NOT dynamic conversion)
// These are pre-set prices for each market
const priceTable: Record<Currency, Record<number, number>> = {
  USD: {
    0: 0,
    15: 15,
    20: 20,
    25: 25,
    30: 30,
    40: 40,
    49: 49,
    50: 50,
    99: 99,
    149: 149,
    490: 490,
    1390: 1390,
  },
  EUR: {
    0: 0,
    15: 14,
    20: 18,
    25: 23,
    30: 28,
    40: 37,
    49: 45,
    50: 46,
    99: 89,
    149: 139,
    490: 450,
    1390: 1290,
  },
  SAR: {
    0: 0,
    15: 55,
    20: 75,
    25: 95,
    30: 110,
    40: 150,
    49: 185,
    50: 190,
    99: 370,
    149: 560,
    490: 1840,
    1390: 5200,
  },
  EGP: {
    0: 0,
    15: 750,
    20: 1000,
    25: 1250,
    30: 1500,
    40: 2000,
    49: 2450,
    50: 2500,
    99: 4950,
    149: 7450,
    490: 24500,
    1390: 69500,
  },
};

export type { Currency };

export function useCurrency() {
  const { currency, setCurrency, isLoading } = useCurrencyContext();

  const formatPrice = (usdPrice: number): string => {
    // Look up the fixed price for this currency
    const localPrice = priceTable[currency][usdPrice] ?? Math.round(usdPrice * (currency === 'EGP' ? 50 : currency === 'SAR' ? 3.75 : currency === 'EUR' ? 0.92 : 1));
    const { symbol } = currencyInfo[currency];
    
    if (currency === 'EGP' || currency === 'SAR') {
      return `${localPrice.toLocaleString()} ${symbol}`;
    }
    
    return `${symbol}${localPrice}`;
  };

  const formatYearlyPrice = (yearlyUsdPrice: number): string => {
    return formatPrice(yearlyUsdPrice);
  };

  return {
    currency,
    setCurrency,
    formatPrice,
    formatYearlyPrice,
    currencies: Object.values(currencyInfo),
    isLoading,
  };
}
