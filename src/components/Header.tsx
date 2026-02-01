import { useState, useCallback } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'EN', fullName: 'English' },
  { code: 'ar', name: 'AR', fullName: 'العربية' },
  { code: 'de', name: 'DE', fullName: 'Deutsch' },
  { code: 'fr', name: 'FR', fullName: 'Français' },
  { code: 'es', name: 'ES', fullName: 'Español' },
] as const;

const navLinks = [
  { id: 'how-it-works', labelKey: 'nav.howItWorks', href: '/how-it-works' },
  { id: 'services', labelKey: 'nav.services', href: '/#services' },
  { id: 'plans', labelKey: 'nav.plans', href: '/plans' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = languages.find(l => l.code === language);

  const handleNavClick = useCallback((href: string) => {
    if (href.startsWith('/#')) {
      // Hash navigation - go to home and scroll
      const sectionId = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  }, [navigate, location.pathname]);

  const handleLogoClick = useCallback(() => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border/40">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2.5 group focus-ring rounded-lg"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <span className="text-primary-foreground font-display font-bold text-base">A</span>
            </div>
            <span className="font-display text-lg font-semibold text-foreground">
              Aureka<span className="text-primary">Web</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-1 py-0.5"
              >
                {t(link.labelKey)}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className={`hidden md:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Currency Switcher */}
            <CurrencySwitcher variant="compact" />

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 h-9 px-3 text-muted-foreground hover:text-foreground">
                  <Globe className="w-4 h-4" />
                  <span>{currentLang?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-card border-border min-w-[120px]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`cursor-pointer ${language === lang.code ? 'bg-accent' : ''}`}
                  >
                    <span>{lang.fullName}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons */}
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="h-9 text-muted-foreground hover:text-foreground">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/request">
              <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('nav.getStarted')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground focus-ring rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in shadow-lg">
          <div className="container-wide py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left py-3 px-4 text-foreground hover:bg-accent rounded-lg transition-colors focus-ring"
              >
                {t(link.labelKey)}
              </button>
            ))}
            
            <div className="border-t border-border my-3 pt-3">
              {/* Currency & Theme Row */}
              <div className="flex items-center justify-between py-2 px-4">
                <span className="text-sm text-muted-foreground">Currency & Theme</span>
                <div className="flex items-center gap-2">
                  <CurrencySwitcher variant="compact" />
                  <ThemeToggle />
                </div>
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
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors focus-ring ${
                    language === lang.code 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col gap-2 pt-3 px-4">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-center">
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/request" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-center bg-primary hover:bg-primary/90">
                  {t('nav.getStarted')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
