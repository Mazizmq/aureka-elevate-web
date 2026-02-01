import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const placeholders = [
  'hero.placeholder.idea',
  'hero.placeholder.business',
  'hero.placeholder.broken',
  'hero.placeholder.system',
  'hero.placeholder.improve',
  'hero.placeholder.chaos',
];

export function MinimalHero() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  // Rotate placeholders every 4 seconds with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaceholderVisible(false);
      
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsPlaceholderVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sessionStorage.setItem('websiteIdea', input.trim());
      navigate('/request');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-minimal" />
      
      {/* Very subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px), 
                           linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center">
        {/* Logo Mark */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-display font-bold text-xl">A</span>
            </div>
            <span className="font-display text-2xl font-semibold text-foreground">
              Aureka<span className="text-primary">Web</span>
            </span>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="relative mb-8">
          <div className="relative group">
            {/* Subtle glow on focus */}
            <div className="absolute -inset-1 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex items-center bg-card border border-border/60 hover:border-border focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 rounded-2xl shadow-sm transition-all duration-300">
              <Search className="w-5 h-5 text-muted-foreground/60 ml-5 flex-shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 py-5 px-4 bg-transparent text-lg text-foreground focus:outline-none ${isRTL ? 'font-arabic text-right' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              {/* Animated placeholder overlay */}
              {!input && (
                <div 
                  className={`absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300 ${
                    isPlaceholderVisible ? 'opacity-100' : 'opacity-0'
                  } ${isRTL ? 'left-auto right-14 font-arabic' : ''}`}
                >
                  <span className="text-lg text-muted-foreground/50">
                    {t(placeholders[placeholderIndex])}
                  </span>
                </div>
              )}
              <div className="pr-2">
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Search className={`w-5 h-5 ${isRTL ? 'rotate-0' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Human Support Signal - Option A: Minimal Text */}
        <p className={`text-sm text-muted-foreground/60 tracking-wide ${isRTL ? 'font-arabic' : ''}`}>
          {t('hero.humanSignal')}
        </p>

        {/* Subtle animated indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/60"></span>
          </span>
          <span className={`text-xs text-muted-foreground/50 ${isRTL ? 'font-arabic' : ''}`}>
            {t('hero.humanOnline')}
          </span>
        </div>
      </div>
    </section>
  );
}
