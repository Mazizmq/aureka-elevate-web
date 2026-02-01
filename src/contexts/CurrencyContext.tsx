import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'USD' | 'EUR' | 'SAR' | 'EGP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

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

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && countryToCurrency[countryCode]) {
          setCurrencyState(countryToCurrency[countryCode]);
        }
      } catch (error) {
        console.log('Currency detection failed, defaulting to USD');
      } finally {
        setIsLoading(false);
      }
    };

    // Check for saved preference first
    const saved = localStorage.getItem('aureka-currency') as Currency;
    if (saved && ['USD', 'EUR', 'SAR', 'EGP'].includes(saved)) {
      setCurrencyState(saved);
      setIsLoading(false);
    } else {
      detectCurrency();
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('aureka-currency', newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrencyContext() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
}
