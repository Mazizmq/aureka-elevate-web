import { useState, useCallback } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';
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

const navLinks = [
  { id: 'how-it-works', labelKey: 'nav.howItWorks' },
  { id: 'human-guided', labelKey: 'nav.humanGuided' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'labs', labelKey: 'nav.labs' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container-wide">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 group focus-ring rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-gold group-hover:shadow-elevated transition-shadow duration-300">
              <span className="text-primary-foreground font-display font-bold text-lg">A</span>
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Aureka<span className="text-primary">Web</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-muted-foreground hover:text-foreground transition-colors underline-gold focus-ring rounded px-1 py-0.5"
              >
                {t(link.labelKey)}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 focus-ring">
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

            <Button variant="ghost" size="sm" className="focus-ring">
              {t('nav.login')}
            </Button>
            <Button variant="hero" size="sm" className="focus-ring">
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground focus-ring rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border animate-fade-in shadow-elevated">
          <div className="container-wide py-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors focus-ring"
              >
                {t(link.labelKey)}
              </button>
            ))}
            
            <div className="border-t border-border my-4 pt-4">
              {/* Theme Toggle in Mobile */}
              <div className="flex items-center justify-between py-2 px-4">
                <span className="text-muted-foreground">{t('nav.theme')}</span>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Language Selection */}
            <div className="flex flex-wrap gap-2 px-4 py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors focus-ring ${
                    language === lang.code 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 pt-4 px-4">
              <Button variant="ghost" className="w-full justify-center focus-ring">
                {t('nav.login')}
              </Button>
              <Button variant="hero" className="w-full justify-center focus-ring">
                {t('nav.getStarted')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
