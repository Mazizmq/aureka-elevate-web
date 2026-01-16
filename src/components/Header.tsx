import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold group-hover:shadow-elevated transition-shadow duration-300">
              <span className="text-primary-foreground font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Aureka<span className="text-gold">Web</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors underline-gold">
              {t('nav.howItWorks')}
            </a>
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors underline-gold">
              {t('nav.services')}
            </a>
            <a href="#labs" className="text-muted-foreground hover:text-foreground transition-colors underline-gold">
              {t('nav.labs')}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang?.flag}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`gap-2 cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm">
              {t('nav.login')}
            </Button>
            <Button variant="hero" size="sm">
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container-wide py-6 space-y-4">
            <a href="#how-it-works" className="block py-2 text-foreground">
              {t('nav.howItWorks')}
            </a>
            <a href="#services" className="block py-2 text-foreground">
              {t('nav.services')}
            </a>
            <a href="#labs" className="block py-2 text-foreground">
              {t('nav.labs')}
            </a>
            <div className="pt-4 border-t border-border space-y-3">
              {/* Language Options */}
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-gold text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
              <Button variant="ghost" className="w-full justify-center">
                {t('nav.login')}
              </Button>
              <Button variant="hero" className="w-full justify-center">
                {t('nav.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
