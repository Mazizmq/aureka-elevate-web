import { useCurrency, Currency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

export function CurrencySwitcher() {
  const { currency, setCurrency, currencies } = useCurrency();

  const currencyLabels: Record<Currency, string> = {
    USD: 'USD ($)',
    EUR: 'EUR (€)',
    SAR: 'SAR (ر.س)',
    EGP: 'EGP (ج.م)',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:border-primary/50">
          <Globe className="h-4 w-4" />
          <span>{currency}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {currencies.map((curr) => (
          <DropdownMenuItem
            key={curr.code}
            onClick={() => setCurrency(curr.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>{currencyLabels[curr.code]}</span>
            {currency === curr.code && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
