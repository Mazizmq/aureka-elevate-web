import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="py-16 border-t border-border">
      <div className="container-wide">
        <div className={`grid md:grid-cols-4 gap-12 mb-12 ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold">
                <span className="text-primary-foreground font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                Aureka<span className="text-gold">Web</span>
              </span>
            </a>
            <p className={`text-muted-foreground max-w-xs ${isRTL ? 'font-arabic text-right' : ''}`}>
              {t('footer.tagline')}
            </p>
          </div>

          {/* Services */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className={`font-semibold mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t('footer.services')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-gold transition-colors">{t('services.free.title')}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t('services.concierge.title')}</a></li>
              <li><a href="#labs" className="hover:text-gold transition-colors">{t('nav.labs')}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className={isRTL ? 'text-right' : ''}>
            <h4 className={`font-semibold mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t('footer.company')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-gold transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className={`text-muted-foreground text-sm ${isRTL ? 'font-arabic' : ''}`}>
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6 text-muted-foreground text-sm">
            <a href="#" className="hover:text-gold transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-gold transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
