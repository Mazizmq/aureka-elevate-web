import { MessageSquare, GitFork, Rocket, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const steps = [
  { icon: MessageSquare, key: 'step1' },
  { icon: GitFork, key: 'step2' },
  { icon: Rocket, key: 'step3' },
  { icon: HeartHandshake, key: 'step4' },
];

export function HowItWorksSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className={`font-display text-4xl md:text-5xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {t('howItWorks.title')}
          </h2>
          <p className={`text-muted-foreground text-lg max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRTL ? 'direction-rtl' : ''}`}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.key}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-12 ${isRTL ? 'right-full' : 'left-full'} w-full h-px bg-gradient-to-r ${isRTL ? 'from-primary/20 to-transparent' : 'from-transparent to-primary/20'}`} />
                )}
                
                <div className="card-hover bg-card rounded-2xl p-8 border border-border h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-gold">
                    {isRTL ? steps.length - index : index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`font-display text-xl font-semibold mb-3 ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t(`howItWorks.${step.key}.title`)}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {t(`howItWorks.${step.key}.desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
