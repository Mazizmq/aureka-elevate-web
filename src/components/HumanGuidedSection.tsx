import { Heart, Users, Shield, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  { icon: Heart, key: 'human' },
  { icon: Users, key: 'manager' },
  { icon: Shield, key: 'worry' },
  { icon: Headphones, key: 'support' },
];

export function HumanGuidedSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="human-guided" className="section-padding relative overflow-hidden bg-card/30">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t('humanGuided.title')}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t('humanGuided.subtitle')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 ${isRTL ? 'direction-rtl' : ''}`}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.key}
                className="group card-hover bg-background rounded-2xl p-6 border border-border text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gold" />
                </div>
                
                {/* Content */}
                <h3 className={`font-display text-lg font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                  {t(`humanGuided.${feature.key}.title`)}
                </h3>
                <p className={`text-muted-foreground text-sm leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {t(`humanGuided.${feature.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reassurance Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl px-8 py-6 border border-gold/20">
            <p className={`text-lg md:text-xl font-display italic text-foreground ${isRTL ? 'font-arabic' : ''}`}>
              "{t('humanGuided.quote')}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
