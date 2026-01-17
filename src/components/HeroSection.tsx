import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px), 
                           linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-narrow relative z-10 text-center">
        <div className="stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
            <Heart className="w-4 h-4 text-gold" />
            <span className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
              {t('hero.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('hero.headline')}
            <br />
            <span className="text-gradient-gold">{t('hero.headlineAccent')}</span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('hero.subheadline')}
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button variant="hero" size="xl" className="group">
              {t('hero.cta.primary')}
              <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Button>
            <Button variant="heroOutline" size="xl">
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Trust Indicator */}
          <p className={`mt-8 text-sm text-muted-foreground/70 ${isRTL ? 'font-arabic' : ''}`}>
            ✓ No credit card required • ✓ Real human support • ✓ Free forever option
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
