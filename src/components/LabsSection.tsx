import { Sparkles, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LabsSection() {
  const { t, isRTL } = useLanguage();

  const features = [
    { icon: Sparkles, key: 'ai' },
    { icon: Cpu, key: 'deploy' },
  ];

  return (
    <section id="labs" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">{t('labs.coming')}</span>
          </div>
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('labs.title')}
          </h2>
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('labs.subtitle')}
          </p>
        </div>

        {/* Feature Cards */}
        <div className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto ${isRTL ? 'direction-rtl' : ''}`}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.key}
                className="group relative card-hover bg-card rounded-2xl p-8 border border-border overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  
                  <h3 className={`font-display text-xl font-semibold mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t(`labs.${feature.key}.title`)}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t(`labs.${feature.key}.desc`)}
                  </p>
                </div>
                
                {/* Shimmer border */}
                <div className="absolute inset-0 rounded-2xl border border-gold/0 group-hover:border-gold/20 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
