import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Zap, Building2, Rocket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function PricingMiniTable() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'standard',
      name: t('plans.standard.name'),
      price: 0,
      highlight: t('plans.standard.highlight'),
      cta: t('plans.standard.cta'),
      icon: Zap,
      popular: false,
      href: '/request',
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      price: 49,
      highlight: t('plans.pro.highlight'),
      cta: t('plans.pro.cta'),
      icon: Rocket,
      popular: true,
      href: '/request',
    },
    {
      id: 'business',
      name: t('plans.business.name'),
      price: 149,
      highlight: t('plans.business.highlight'),
      cta: t('plans.business.cta'),
      icon: Building2,
      popular: false,
      href: '/request',
    },
  ];

  return (
    <section className="section-padding bg-gradient-hero">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-on-scroll">
          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            {t('plans.badge')}
          </Badge>
          <h2 className="heading-section mb-4">
            {t('plans.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t('plans.subtitle')}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
                plan.popular
                  ? 'border-primary shadow-gold ring-2 ring-primary/20'
                  : 'border-border/50 hover:border-primary/30'
              } animate-on-scroll stagger-${index + 1}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    {t('plans.popular')}
                  </div>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                    <plan.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price === 0 ? t('plans.free') : formatPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/{t('plans.month')}</span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{plan.highlight}</span>
                </div>
                
                <Button 
                  onClick={() => navigate(plan.href)}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Full Plans Link */}
        <div className="text-center animate-on-scroll">
          <Link 
            to="/plans" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            {t('plans.viewFull')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
