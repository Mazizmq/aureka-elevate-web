import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function CTASection() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-charcoal-light to-background" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-narrow relative z-10 text-center">
        <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
          {t('cta.title')}
        </h2>
        <p className={`text-xl text-muted-foreground mb-10 max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
          {t('cta.subtitle')}
        </p>
        <Button variant="hero" size="xl" className="group">
          {t('cta.button')}
          <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
        </Button>
      </div>
    </section>
  );
}
