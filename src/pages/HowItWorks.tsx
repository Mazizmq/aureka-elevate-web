import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, MessageCircle, Wrench, Rocket, HeartHandshake, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: Globe,
    titleKey: 'hiw.step1.title',
    descKey: 'hiw.step1.desc',
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-500',
  },
  {
    icon: MessageCircle,
    titleKey: 'hiw.step2.title',
    descKey: 'hiw.step2.desc',
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-500',
  },
  {
    icon: Wrench,
    titleKey: 'hiw.step3.title',
    descKey: 'hiw.step3.desc',
    color: 'from-amber-500/20 to-amber-600/20',
    iconColor: 'text-amber-500',
  },
  {
    icon: Rocket,
    titleKey: 'hiw.step4.title',
    descKey: 'hiw.step4.desc',
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconColor: 'text-emerald-500',
  },
  {
    icon: HeartHandshake,
    titleKey: 'hiw.step5.title',
    descKey: 'hiw.step5.desc',
    color: 'from-rose-500/20 to-rose-600/20',
    iconColor: 'text-rose-500',
  },
];

export default function HowItWorks() {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="container-narrow">
            <h1 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('hiw.title')}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto mb-8 ${isRTL ? 'font-arabic' : ''}`}>
              {t('hiw.subtitle')}
            </p>
            
            {/* 24-Hour Promise */}
            <div className={`inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-5 h-5 text-primary" />
              <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>{t('hiw.promise')}</span>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute top-0 bottom-0 w-0.5 bg-border hidden md:block ${isRTL ? 'right-8' : 'left-8'}`} />
              
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={index} className={`relative flex gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                        <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                      </div>
                      {/* Step Number */}
                      <div className={`absolute -bottom-2 ${isRTL ? '-left-2' : '-right-2'} w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 pt-2 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className={`font-display text-2xl font-semibold mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                        {t(step.titleKey)}
                      </h3>
                      <p className={`text-muted-foreground leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                        {t(step.descKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section-padding bg-muted/50">
          <div className="container-wide max-w-4xl">
            <h2 className={`font-display text-3xl font-bold text-center mb-12 ${isRTL ? 'font-arabic' : ''}`}>
              {t('hiw.included.title')}
            </h2>
            
            <div className={`grid md:grid-cols-2 gap-6 ${isRTL ? 'direction-rtl' : ''}`}>
              {[
                'hiw.included.item1',
                'hiw.included.item2',
                'hiw.included.item3',
                'hiw.included.item4',
                'hiw.included.item5',
                'hiw.included.item6',
              ].map((key, index) => (
                <div key={index} className={`flex items-center gap-3 bg-card p-4 rounded-xl border border-border ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className={isRTL ? 'font-arabic' : ''}>{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding text-center">
          <div className="container-narrow">
            <h2 className={`font-display text-3xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {t('hiw.cta.title')}
            </h2>
            <p className={`text-muted-foreground mb-8 ${isRTL ? 'font-arabic' : ''}`}>
              {t('hiw.cta.subtitle')}
            </p>
            <Button variant="hero" size="xl" onClick={() => navigate('/')}>
              {t('hiw.cta.button')}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
