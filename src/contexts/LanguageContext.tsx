import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'de' | 'fr' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.howItWorks': 'How It Works',
    'nav.services': 'Services',
    'nav.labs': 'Labs',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started Free',
    
    // Hero
    'hero.headline': 'Elegant Web Presence.',
    'hero.headlineAccent': 'Zero Barriers.',
    'hero.subheadline': 'Get a premium, human-guided website with free hosting and maintenance. We handle the technical crossroads so you can focus on your vision.',
    'hero.cta.primary': 'Launch Your Free Site',
    'hero.cta.secondary': 'See How We Scale',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'From vision to live site in four guided steps',
    'howItWorks.step1.title': 'Share Your Vision',
    'howItWorks.step1.desc': 'Tell us about your brand, goals, and aesthetic preferences. No technical knowledge required.',
    'howItWorks.step2.title': 'Guided Decisions',
    'howItWorks.step2.desc': 'Our experts guide you through architecture, design, and feature choices at every crossroad.',
    'howItWorks.step3.title': 'We Build & Deploy',
    'howItWorks.step3.desc': 'Your site is crafted with premium design, security, and performance. Then deployed for free.',
    'howItWorks.step4.title': 'Ongoing Support',
    'howItWorks.step4.desc': 'Free hosting, maintenance, and standard updates. Upgrade anytime for priority support.',
    
    // Services
    'services.title': 'Choose Your Path',
    'services.subtitle': 'Start free, scale when ready',
    'services.free.title': 'Free Forever',
    'services.free.price': '$0',
    'services.free.period': '/month',
    'services.free.feature1': 'Professional website design',
    'services.free.feature2': 'Free hosting included',
    'services.free.feature3': 'Standard maintenance',
    'services.free.feature4': 'SSL security certificate',
    'services.free.feature5': 'Basic support',
    'services.free.cta': 'Start Free',
    'services.concierge.title': 'Concierge',
    'services.concierge.price': '$49',
    'services.concierge.period': '/month',
    'services.concierge.feature1': 'Everything in Free',
    'services.concierge.feature2': 'Unlimited design edits',
    'services.concierge.feature3': 'Priority human support',
    'services.concierge.feature4': 'Advanced features',
    'services.concierge.feature5': 'Custom integrations',
    'services.concierge.cta': 'Upgrade to Concierge',
    
    // Labs
    'labs.title': 'Labs',
    'labs.subtitle': 'The future of guided web creation',
    'labs.ai.title': 'AI-Assisted Design',
    'labs.ai.desc': 'Smart design suggestions powered by machine learning, tailored to your brand.',
    'labs.deploy.title': 'Intelligent Deployment',
    'labs.deploy.desc': 'AI-optimized infrastructure for maximum performance and reliability.',
    'labs.coming': 'Coming Soon',
    
    // CTA
    'cta.title': 'Ready to Begin?',
    'cta.subtitle': 'Your premium web presence starts today. Free.',
    'cta.button': 'Launch Your Free Site',
    
    // Footer
    'footer.tagline': 'Premium websites. Zero barriers.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2025 Aureka Solutions. All rights reserved.',
  },
  ar: {
    // Navigation
    'nav.howItWorks': 'كيف يعمل',
    'nav.services': 'الخدمات',
    'nav.labs': 'المختبرات',
    'nav.login': 'تسجيل الدخول',
    'nav.getStarted': 'ابدأ مجاناً',
    
    // Hero
    'hero.headline': 'حضور رقمي أنيق.',
    'hero.headlineAccent': 'بلا عوائق.',
    'hero.subheadline': 'احصل على موقع احترافي مع إرشاد بشري، واستضافة وصيانة مجانية. نتولى المفترقات التقنية لتتمكن من التركيز على رؤيتك.',
    'hero.cta.primary': 'أطلق موقعك المجاني',
    'hero.cta.secondary': 'اكتشف كيف نتوسع',
    
    // How It Works
    'howItWorks.title': 'كيف يعمل',
    'howItWorks.subtitle': 'من الرؤية إلى موقع حي في أربع خطوات موجهة',
    'howItWorks.step1.title': 'شارك رؤيتك',
    'howItWorks.step1.desc': 'أخبرنا عن علامتك التجارية وأهدافك وتفضيلاتك الجمالية. لا تحتاج إلى معرفة تقنية.',
    'howItWorks.step2.title': 'قرارات موجهة',
    'howItWorks.step2.desc': 'خبراؤنا يرشدونك خلال الهندسة والتصميم واختيار الميزات في كل مفترق.',
    'howItWorks.step3.title': 'نبني وننشر',
    'howItWorks.step3.desc': 'موقعك يُصمم بجودة عالية وأمان وأداء. ثم يُنشر مجاناً.',
    'howItWorks.step4.title': 'دعم مستمر',
    'howItWorks.step4.desc': 'استضافة وصيانة وتحديثات مجانية. ترقية في أي وقت للدعم المميز.',
    
    // Services
    'services.title': 'اختر مسارك',
    'services.subtitle': 'ابدأ مجاناً، توسع عندما تكون جاهزاً',
    'services.free.title': 'مجاني للأبد',
    'services.free.price': '$0',
    'services.free.period': '/شهرياً',
    'services.free.feature1': 'تصميم موقع احترافي',
    'services.free.feature2': 'استضافة مجانية',
    'services.free.feature3': 'صيانة قياسية',
    'services.free.feature4': 'شهادة SSL',
    'services.free.feature5': 'دعم أساسي',
    'services.free.cta': 'ابدأ مجاناً',
    'services.concierge.title': 'الكونسيرج',
    'services.concierge.price': '$49',
    'services.concierge.period': '/شهرياً',
    'services.concierge.feature1': 'كل ما في المجاني',
    'services.concierge.feature2': 'تعديلات تصميم غير محدودة',
    'services.concierge.feature3': 'دعم بشري مميز',
    'services.concierge.feature4': 'ميزات متقدمة',
    'services.concierge.feature5': 'تكاملات مخصصة',
    'services.concierge.cta': 'ترقية للكونسيرج',
    
    // Labs
    'labs.title': 'المختبرات',
    'labs.subtitle': 'مستقبل إنشاء المواقع الموجه',
    'labs.ai.title': 'تصميم بمساعدة الذكاء الاصطناعي',
    'labs.ai.desc': 'اقتراحات تصميم ذكية مدعومة بالتعلم الآلي، مصممة لعلامتك.',
    'labs.deploy.title': 'نشر ذكي',
    'labs.deploy.desc': 'بنية تحتية محسنة بالذكاء الاصطناعي لأقصى أداء وموثوقية.',
    'labs.coming': 'قريباً',
    
    // CTA
    'cta.title': 'مستعد للبدء؟',
    'cta.subtitle': 'حضورك الرقمي المميز يبدأ اليوم. مجاناً.',
    'cta.button': 'أطلق موقعك المجاني',
    
    // Footer
    'footer.tagline': 'مواقع احترافية. بلا عوائق.',
    'footer.services': 'الخدمات',
    'footer.company': 'الشركة',
    'footer.legal': 'قانوني',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'الشروط',
    'footer.about': 'عنا',
    'footer.contact': 'تواصل',
    'footer.copyright': '© 2025 أوريكا سولوشنز. جميع الحقوق محفوظة.',
  },
  de: {
    'nav.howItWorks': 'So funktioniert es',
    'nav.services': 'Dienste',
    'nav.labs': 'Labs',
    'nav.login': 'Anmelden',
    'nav.getStarted': 'Kostenlos starten',
    'hero.headline': 'Elegante Web-Präsenz.',
    'hero.headlineAccent': 'Keine Barrieren.',
    'hero.subheadline': 'Erhalten Sie eine Premium-Website mit menschlicher Begleitung, kostenlosem Hosting und Wartung. Wir übernehmen die technischen Weggabelungen.',
    'hero.cta.primary': 'Starten Sie kostenlos',
    'hero.cta.secondary': 'Skalierung entdecken',
    'howItWorks.title': 'So funktioniert es',
    'howItWorks.subtitle': 'Von der Vision zur Live-Website in vier geführten Schritten',
    'howItWorks.step1.title': 'Teilen Sie Ihre Vision',
    'howItWorks.step1.desc': 'Erzählen Sie uns von Ihrer Marke, Zielen und Vorlieben. Keine technischen Kenntnisse erforderlich.',
    'howItWorks.step2.title': 'Geführte Entscheidungen',
    'howItWorks.step2.desc': 'Unsere Experten begleiten Sie durch Architektur-, Design- und Feature-Entscheidungen.',
    'howItWorks.step3.title': 'Wir bauen & deployen',
    'howItWorks.step3.desc': 'Ihre Website wird mit Premium-Design, Sicherheit und Performance erstellt. Dann kostenlos deployed.',
    'howItWorks.step4.title': 'Laufende Unterstützung',
    'howItWorks.step4.desc': 'Kostenloses Hosting, Wartung und Standard-Updates. Jederzeit upgraden für Priority-Support.',
    'services.title': 'Wählen Sie Ihren Weg',
    'services.subtitle': 'Starten Sie kostenlos, skalieren Sie bei Bedarf',
    'services.free.title': 'Für immer kostenlos',
    'services.free.price': '0€',
    'services.free.period': '/Monat',
    'services.free.feature1': 'Professionelles Website-Design',
    'services.free.feature2': 'Kostenloses Hosting inklusive',
    'services.free.feature3': 'Standard-Wartung',
    'services.free.feature4': 'SSL-Sicherheitszertifikat',
    'services.free.feature5': 'Basis-Support',
    'services.free.cta': 'Kostenlos starten',
    'services.concierge.title': 'Concierge',
    'services.concierge.price': '49€',
    'services.concierge.period': '/Monat',
    'services.concierge.feature1': 'Alles aus Free',
    'services.concierge.feature2': 'Unbegrenzte Design-Änderungen',
    'services.concierge.feature3': 'Priority Human Support',
    'services.concierge.feature4': 'Erweiterte Funktionen',
    'services.concierge.feature5': 'Individuelle Integrationen',
    'services.concierge.cta': 'Upgrade zu Concierge',
    'labs.title': 'Labs',
    'labs.subtitle': 'Die Zukunft der geführten Web-Erstellung',
    'labs.ai.title': 'KI-gestütztes Design',
    'labs.ai.desc': 'Intelligente Design-Vorschläge durch maschinelles Lernen, auf Ihre Marke zugeschnitten.',
    'labs.deploy.title': 'Intelligente Bereitstellung',
    'labs.deploy.desc': 'KI-optimierte Infrastruktur für maximale Leistung und Zuverlässigkeit.',
    'labs.coming': 'Demnächst',
    'cta.title': 'Bereit zu starten?',
    'cta.subtitle': 'Ihre Premium-Web-Präsenz beginnt heute. Kostenlos.',
    'cta.button': 'Starten Sie kostenlos',
    'footer.tagline': 'Premium-Websites. Keine Barrieren.',
    'footer.services': 'Dienste',
    'footer.company': 'Unternehmen',
    'footer.legal': 'Rechtliches',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
    'footer.about': 'Über uns',
    'footer.contact': 'Kontakt',
    'footer.copyright': '© 2025 Aureka Solutions. Alle Rechte vorbehalten.',
  },
  fr: {
    'nav.howItWorks': 'Comment ça marche',
    'nav.services': 'Services',
    'nav.labs': 'Labs',
    'nav.login': 'Connexion',
    'nav.getStarted': 'Commencer gratuitement',
    'hero.headline': 'Présence web élégante.',
    'hero.headlineAccent': 'Zéro barrière.',
    'hero.subheadline': 'Obtenez un site premium avec accompagnement humain, hébergement et maintenance gratuits. Nous gérons les carrefours techniques.',
    'hero.cta.primary': 'Lancez votre site gratuit',
    'hero.cta.secondary': 'Découvrez notre évolutivité',
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.subtitle': 'De la vision au site en quatre étapes guidées',
    'howItWorks.step1.title': 'Partagez votre vision',
    'howItWorks.step1.desc': 'Parlez-nous de votre marque, objectifs et préférences. Aucune connaissance technique requise.',
    'howItWorks.step2.title': 'Décisions guidées',
    'howItWorks.step2.desc': 'Nos experts vous guident à chaque carrefour d\'architecture, design et fonctionnalités.',
    'howItWorks.step3.title': 'Nous construisons & déployons',
    'howItWorks.step3.desc': 'Votre site est créé avec design premium, sécurité et performance. Puis déployé gratuitement.',
    'howItWorks.step4.title': 'Support continu',
    'howItWorks.step4.desc': 'Hébergement, maintenance et mises à jour gratuits. Upgradez pour un support prioritaire.',
    'services.title': 'Choisissez votre voie',
    'services.subtitle': 'Commencez gratuitement, évoluez quand vous êtes prêt',
    'services.free.title': 'Gratuit pour toujours',
    'services.free.price': '0€',
    'services.free.period': '/mois',
    'services.free.feature1': 'Design de site professionnel',
    'services.free.feature2': 'Hébergement gratuit inclus',
    'services.free.feature3': 'Maintenance standard',
    'services.free.feature4': 'Certificat SSL',
    'services.free.feature5': 'Support de base',
    'services.free.cta': 'Commencer gratuitement',
    'services.concierge.title': 'Concierge',
    'services.concierge.price': '49€',
    'services.concierge.period': '/mois',
    'services.concierge.feature1': 'Tout de Gratuit',
    'services.concierge.feature2': 'Modifications design illimitées',
    'services.concierge.feature3': 'Support humain prioritaire',
    'services.concierge.feature4': 'Fonctionnalités avancées',
    'services.concierge.feature5': 'Intégrations personnalisées',
    'services.concierge.cta': 'Passer à Concierge',
    'labs.title': 'Labs',
    'labs.subtitle': 'L\'avenir de la création web guidée',
    'labs.ai.title': 'Design assisté par IA',
    'labs.ai.desc': 'Suggestions de design intelligentes par machine learning, adaptées à votre marque.',
    'labs.deploy.title': 'Déploiement intelligent',
    'labs.deploy.desc': 'Infrastructure optimisée par IA pour performance et fiabilité maximales.',
    'labs.coming': 'Bientôt',
    'cta.title': 'Prêt à commencer?',
    'cta.subtitle': 'Votre présence web premium commence aujourd\'hui. Gratuit.',
    'cta.button': 'Lancez votre site gratuit',
    'footer.tagline': 'Sites premium. Zéro barrière.',
    'footer.services': 'Services',
    'footer.company': 'Entreprise',
    'footer.legal': 'Légal',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions',
    'footer.about': 'À propos',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2025 Aureka Solutions. Tous droits réservés.',
  },
  es: {
    'nav.howItWorks': 'Cómo funciona',
    'nav.services': 'Servicios',
    'nav.labs': 'Labs',
    'nav.login': 'Iniciar sesión',
    'nav.getStarted': 'Empezar gratis',
    'hero.headline': 'Presencia web elegante.',
    'hero.headlineAccent': 'Sin barreras.',
    'hero.subheadline': 'Obtén un sitio premium con guía humana, hosting y mantenimiento gratis. Nosotros manejamos las encrucijadas técnicas.',
    'hero.cta.primary': 'Lanza tu sitio gratis',
    'hero.cta.secondary': 'Descubre cómo escalamos',
    'howItWorks.title': 'Cómo funciona',
    'howItWorks.subtitle': 'De la visión al sitio en vivo en cuatro pasos guiados',
    'howItWorks.step1.title': 'Comparte tu visión',
    'howItWorks.step1.desc': 'Cuéntanos sobre tu marca, objetivos y preferencias. No se requiere conocimiento técnico.',
    'howItWorks.step2.title': 'Decisiones guiadas',
    'howItWorks.step2.desc': 'Nuestros expertos te guían en cada encrucijada de arquitectura, diseño y funcionalidades.',
    'howItWorks.step3.title': 'Construimos & desplegamos',
    'howItWorks.step3.desc': 'Tu sitio se crea con diseño premium, seguridad y rendimiento. Luego se despliega gratis.',
    'howItWorks.step4.title': 'Soporte continuo',
    'howItWorks.step4.desc': 'Hosting, mantenimiento y actualizaciones gratis. Actualiza para soporte prioritario.',
    'services.title': 'Elige tu camino',
    'services.subtitle': 'Empieza gratis, escala cuando estés listo',
    'services.free.title': 'Gratis para siempre',
    'services.free.price': '$0',
    'services.free.period': '/mes',
    'services.free.feature1': 'Diseño de sitio profesional',
    'services.free.feature2': 'Hosting gratis incluido',
    'services.free.feature3': 'Mantenimiento estándar',
    'services.free.feature4': 'Certificado SSL',
    'services.free.feature5': 'Soporte básico',
    'services.free.cta': 'Empezar gratis',
    'services.concierge.title': 'Concierge',
    'services.concierge.price': '$49',
    'services.concierge.period': '/mes',
    'services.concierge.feature1': 'Todo de Gratis',
    'services.concierge.feature2': 'Ediciones de diseño ilimitadas',
    'services.concierge.feature3': 'Soporte humano prioritario',
    'services.concierge.feature4': 'Funciones avanzadas',
    'services.concierge.feature5': 'Integraciones personalizadas',
    'services.concierge.cta': 'Actualizar a Concierge',
    'labs.title': 'Labs',
    'labs.subtitle': 'El futuro de la creación web guiada',
    'labs.ai.title': 'Diseño asistido por IA',
    'labs.ai.desc': 'Sugerencias de diseño inteligentes con machine learning, adaptadas a tu marca.',
    'labs.deploy.title': 'Despliegue inteligente',
    'labs.deploy.desc': 'Infraestructura optimizada por IA para máximo rendimiento y fiabilidad.',
    'labs.coming': 'Próximamente',
    'cta.title': '¿Listo para empezar?',
    'cta.subtitle': 'Tu presencia web premium comienza hoy. Gratis.',
    'cta.button': 'Lanza tu sitio gratis',
    'footer.tagline': 'Sitios premium. Sin barreras.',
    'footer.services': 'Servicios',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.about': 'Nosotros',
    'footer.contact': 'Contacto',
    'footer.copyright': '© 2025 Aureka Solutions. Todos los derechos reservados.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('aureka-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('aureka-lang') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
