import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, MessageCircle, Wrench, Shield, AlertCircle } from 'lucide-react';

export default function SLA() {
  const { t, isRTL } = useLanguage();

  const sections = [
    {
      icon: Clock,
      titleKey: 'sla.response.title',
      items: [
        'sla.response.item1',
        'sla.response.item2',
        'sla.response.item3',
      ],
    },
    {
      icon: Wrench,
      titleKey: 'sla.changes.title',
      items: [
        'sla.changes.item1',
        'sla.changes.item2',
        'sla.changes.item3',
      ],
    },
    {
      icon: Shield,
      titleKey: 'sla.scope.title',
      items: [
        'sla.scope.item1',
        'sla.scope.item2',
        'sla.scope.item3',
        'sla.scope.item4',
      ],
    },
    {
      icon: AlertCircle,
      titleKey: 'sla.limits.title',
      items: [
        'sla.limits.item1',
        'sla.limits.item2',
        'sla.limits.item3',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="section-padding text-center">
          <div className="container-narrow">
            <h1 className={`font-display text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {t('sla.title')}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t('sla.subtitle')}
            </p>
          </div>
        </section>

        {/* Sections */}
        <section className="section-padding">
          <div className="container-wide max-w-4xl">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-8">
                  <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className={`font-display text-2xl font-semibold ${isRTL ? 'font-arabic' : ''}`}>
                      {t(section.titleKey)}
                    </h2>
                  </div>
                  
                  <ul className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                          {t(item)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section className="section-padding">
          <div className="container-narrow text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className={`font-display text-2xl font-semibold mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                {t('sla.promise.title')}
              </h3>
              <p className={`text-muted-foreground max-w-xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
                {t('sla.promise.desc')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
