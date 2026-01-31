import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/hooks/useCurrency';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  Zap, 
  Building2, 
  Rocket, 
  HelpCircle,
  Clock,
  Shield,
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Plans() {
  const { t } = useLanguage();
  const { formatPrice, formatYearlyPrice } = useCurrency();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'standard',
      name: t('plans.standard.name'),
      subtitle: t('plans.standard.subtitle'),
      monthlyPrice: 0,
      yearlyPrice: 0,
      yearlySaving: '',
      icon: Zap,
      popular: false,
      cta: t('plans.standard.cta'),
      features: {
        hosting: t('plans.features.hostingFree'),
        domain: t('plans.features.subdomain'),
        domainSetup: t('plans.features.domainConnect'),
        buildType: t('plans.features.landingPage'),
        database: t('plans.features.na'),
        delivery: t('plans.features.delivery48h'),
        scaling: t('plans.features.scaling1'),
        support: t('plans.features.supportEmail'),
        response: t('plans.features.response2d'),
      },
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      subtitle: t('plans.pro.subtitle'),
      monthlyPrice: 49,
      yearlyPrice: 490,
      yearlySaving: t('plans.pro.yearlySaving'),
      icon: Rocket,
      popular: true,
      cta: t('plans.pro.cta'),
      features: {
        hosting: t('plans.features.hostingDb'),
        domain: t('plans.features.customDomain'),
        domainSetup: t('plans.features.domainDone'),
        buildType: t('plans.features.multiPage'),
        database: t('plans.features.db5k'),
        delivery: t('plans.features.delivery48h'),
        scaling: t('plans.features.scalingWeek'),
        support: t('plans.features.supportVideo'),
        response: t('plans.features.response1d'),
      },
    },
    {
      id: 'business',
      name: t('plans.business.name'),
      subtitle: t('plans.business.subtitle'),
      monthlyPrice: 149,
      yearlyPrice: 1390,
      yearlySaving: t('plans.business.yearlySaving'),
      icon: Building2,
      popular: false,
      cta: t('plans.business.cta'),
      features: {
        hosting: t('plans.features.hostingFull'),
        domain: t('plans.features.customDomain'),
        domainSetup: t('plans.features.domainDone'),
        buildType: t('plans.features.fullSystem'),
        database: t('plans.features.db50k'),
        delivery: t('plans.features.delivery5d'),
        scaling: t('plans.features.scalingUnlimited'),
        support: t('plans.features.supportDedicated'),
        response: t('plans.features.responseSameDay'),
      },
    },
  ];

  const addOns = [
    { name: t('addons.seo'), price: 15, period: t('plans.month'), icon: Sparkles },
    { name: t('addons.copywriting'), price: 50, period: t('addons.perPage'), icon: Sparkles },
    { name: t('addons.speedAudit'), price: 0, period: t('addons.freeProBusiness'), icon: Sparkles },
    { name: t('addons.branding'), price: 99, period: t('addons.oneTime'), icon: Sparkles },
    { name: t('addons.social'), price: 25, period: t('addons.perSite'), icon: Sparkles },
    { name: t('addons.analytics'), price: 20, period: t('addons.oneTime'), icon: Sparkles },
    { name: t('addons.extraPage'), price: 30, period: t('addons.perPage'), icon: Sparkles },
    { name: t('addons.prioritySupport'), price: 20, period: t('plans.month'), icon: Sparkles },
    { name: t('addons.landingPage'), price: 40, period: t('addons.oneTime'), icon: Sparkles },
  ];

  const featureRows = [
    { key: 'hosting', label: t('plans.table.hosting'), tooltip: t('plans.table.hostingTip') },
    { key: 'domain', label: t('plans.table.domain'), tooltip: t('plans.table.domainTip') },
    { key: 'domainSetup', label: t('plans.table.domainSetup'), tooltip: t('plans.table.domainSetupTip') },
    { key: 'buildType', label: t('plans.table.buildType'), tooltip: t('plans.table.buildTypeTip') },
    { key: 'database', label: t('plans.table.database'), tooltip: t('plans.table.databaseTip') },
    { key: 'delivery', label: t('plans.table.delivery'), tooltip: t('plans.table.deliveryTip') },
    { key: 'scaling', label: t('plans.table.scaling'), tooltip: t('plans.table.scalingTip') },
    { key: 'support', label: t('plans.table.support'), tooltip: t('plans.table.supportTip') },
    { key: 'response', label: t('plans.table.response'), tooltip: t('plans.table.responseTip') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-hero">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                {t('plans.badge')}
              </Badge>
              <h1 className="heading-section mb-4">
                {t('plans.pageTitle')}
              </h1>
              <p className="text-lg text-muted-foreground text-balance mb-6">
                {t('plans.pageSubtitle')}
              </p>
              
              {/* Currency Switcher */}
              <div className="flex justify-center">
                <CurrencySwitcher />
              </div>
            </div>

            {/* Plans Cards */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16">
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
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                        <plan.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">
                          {plan.monthlyPrice === 0 ? t('plans.free') : formatPrice(plan.monthlyPrice)}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-muted-foreground">/{t('plans.month')}</span>
                        )}
                      </div>
                      {plan.yearlyPrice > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(plan.yearlyPrice)}/{t('plans.year')} <span className="text-primary font-medium">({plan.yearlySaving})</span>
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      onClick={() => navigate('/request')}
                      size="lg"
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

            {/* Detailed Comparison Table */}
            <div className="max-w-6xl mx-auto mb-20">
              <h2 className="heading-section text-center mb-8">{t('plans.compareTitle')}</h2>
              
              <div className="overflow-x-auto rounded-2xl border border-border/50 shadow-card">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 font-semibold">{t('plans.table.feature')}</th>
                      {plans.map((plan) => (
                        <th key={plan.id} className="p-4 text-center font-semibold min-w-[160px]">
                          <div className="flex flex-col items-center gap-1">
                            <plan.icon className={`h-5 w-5 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                            <span>{plan.name}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows.map((row, idx) => (
                      <tr key={row.key} className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{row.label}</span>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                {row.tooltip}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                        {plans.map((plan) => (
                          <td key={plan.id} className="p-4 text-center">
                            {plan.features[row.key as keyof typeof plan.features] === t('plans.features.na') ? (
                              <X className="h-5 w-5 text-muted-foreground mx-auto" />
                            ) : (
                              <span className="text-sm">{plan.features[row.key as keyof typeof plan.features]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Pricing Rows */}
                    <tr className="bg-primary/5 border-t border-primary/20">
                      <td className="p-4 font-semibold">{t('plans.table.monthly')}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="p-4 text-center font-bold text-lg">
                          {plan.monthlyPrice === 0 ? t('plans.free') : formatPrice(plan.monthlyPrice)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-primary/5">
                      <td className="p-4 font-semibold">{t('plans.table.yearly')}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          {plan.yearlyPrice === 0 ? (
                            t('plans.free')
                          ) : (
                            <div>
                              <span className="font-bold text-lg">{formatPrice(plan.yearlyPrice)}</span>
                              <p className="text-xs text-primary">{plan.yearlySaving}</p>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="max-w-5xl mx-auto mb-20">
              <div className="text-center mb-10">
                <h2 className="heading-section mb-4">{t('addons.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('addons.subtitle')}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {addOns.map((addon, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-card transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{addon.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary">
                        {addon.price === 0 ? t('plans.free') : formatPrice(addon.price)}
                      </span>
                      <p className="text-xs text-muted-foreground">{addon.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anti-DIY Philosophy Section */}
            <div className="max-w-4xl mx-auto mb-20">
              <Card className="overflow-hidden border-primary/20 shadow-gold">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <HeartHandshake className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                        {t('plans.antiDiy.title')}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {t('plans.antiDiy.desc')}
                      </p>
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{t('plans.antiDiy.delivery')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>{t('plans.antiDiy.support')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Version Note */}
            <div className="text-center mb-12">
              <p className="text-sm text-muted-foreground">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded mr-2">v.1.0.1</span>
                {t('plans.versionNote')}
              </p>
            </div>

            {/* Final CTA */}
            <div className="text-center">
              <h2 className="heading-section mb-4">{t('plans.cta.title')}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                {t('plans.cta.subtitle')}
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/request')}
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                {t('plans.cta.button')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
