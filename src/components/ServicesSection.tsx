import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function ServicesSection() {
  const { t, isRTL } = useLanguage();

  const starterFeatures = [
    t('services.starter.feature1'),
    t('services.starter.feature2'),
    t('services.starter.feature3'),
    t('services.starter.feature4'),
  ];

  const proFeatures = [
    t('services.pro.feature1'),
    t('services.pro.feature2'),
    t('services.pro.feature3'),
    t('services.pro.feature4'),
    t('services.pro.feature5'),
  ];

  return (
    <section id="services" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('services.title')}
          </h2>
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('services.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Starter Tier */}
          <div className="card-hover bg-card rounded-3xl p-8 border border-border flex flex-col">
            <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`font-display text-2xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {t('services.starter.title')}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">$0.99</span>
                <span className="text-muted-foreground">{t('services.starter.period')}</span>
              </div>
            </div>

            <ul className={`space-y-4 mb-8 flex-grow ${isRTL ? 'text-right' : ''}`}>
              {starterFeatures.map((feature, index) => (
                <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="premium" size="xl" className="w-full">
              {t('services.starter.cta')}
            </Button>
          </div>

          {/* Pro Tier */}
          <div className="relative card-hover bg-gradient-card rounded-3xl p-8 border-2 border-primary/30 flex flex-col">
            {/* Popular Badge */}
            <div className={`absolute -top-4 ${isRTL ? 'left-8' : 'right-8'} flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-gold`}>
              <Crown className="w-4 h-4" />
              {t('services.popular')}
            </div>

            <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
              <h3 className={`font-display text-2xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {t('services.pro.title')}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-gradient-gold">
                  $4.99
                </span>
                <span className="text-muted-foreground">{t('services.pro.period')}</span>
              </div>
            </div>

            <ul className={`space-y-4 mb-8 flex-grow ${isRTL ? 'text-right' : ''}`}>
              {proFeatures.map((feature, index) => (
                <li key={index} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className={`text-foreground ${isRTL ? 'font-arabic' : ''}`}>{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="xl" className="w-full">
              {t('services.pro.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
