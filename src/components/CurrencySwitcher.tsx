import { useCurrency, Currency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check } from 'lucide-react';

interface CurrencySwitcherProps {
  variant?: 'default' | 'compact';
}

export function CurrencySwitcher({ variant = 'default' }: CurrencySwitcherProps) {
  const { currency, setCurrency, currencies } = useCurrency();

  const currencyLabels: Record<Currency, string> = {
    USD: 'USD',
    EUR: 'EUR',
    SAR: 'SAR',
    EGP: 'EGP',
  };

  const currencySymbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    SAR: 'ر.س',
    EGP: 'ج.م',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1.5 h-9 px-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <span className="font-medium">{currency}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] bg-card border-border">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{currencyLabels[curr.code]} ({currencySymbols[curr.code]})</span>
            {currency === curr.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
