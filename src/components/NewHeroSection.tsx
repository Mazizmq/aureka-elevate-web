import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IdeaInput } from '@/components/IdeaInput';
import { PathOptions } from '@/components/PathOptions';
import { useNavigate } from 'react-router-dom';

export function NewHeroSection() {
  const { t, isRTL } = useLanguage();
  const [idea, setIdea] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleIdeaSubmit = (submittedIdea: string) => {
    setIdea(submittedIdea);
  };

  const handleBack = () => {
    setIdea(null);
  };

  const handleSelectPath = (path: 'chat' | 'meeting' | 'questions') => {
    // Store the idea in sessionStorage for use in the request flow
    if (idea) {
      sessionStorage.setItem('websiteIdea', idea);
    }
    
    // Navigate based on path
    switch (path) {
      case 'chat':
        navigate('/contact?mode=chat');
        break;
      case 'meeting':
        navigate('/contact?mode=meeting');
        break;
      case 'questions':
        navigate('/request');
        break;
    }
  };

  // Simple heuristic for recommendation based on idea content
  const getRecommendedPath = (): 'chat' | 'meeting' | 'questions' => {
    if (!idea) return 'questions';
    const lowerIdea = idea.toLowerCase();
    if (lowerIdea.includes('ngo') || lowerIdea.includes('non-profit') || lowerIdea.includes('organization') || lowerIdea.includes('مؤسسة')) {
      return 'meeting';
    }
    if (lowerIdea.includes('urgent') || lowerIdea.includes('help') || lowerIdea.includes('confused') || lowerIdea.includes('مساعدة')) {
      return 'chat';
    }
    return 'questions';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), 
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-narrow relative z-10 text-center px-4">
        <div className="stagger-children">
          {!idea ? (
            <>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-8">
                <Heart className="w-4 h-4 text-primary" />
                <span className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                  {t('hero.badge')}
                </span>
              </div>

              {/* Headline */}
              <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isRTL ? 'font-arabic' : ''}`}>
                {t('hero.headline')}
                <br />
                <span className="text-gradient-gold">{t('hero.headlineAccent')}</span>
              </h1>

              {/* Subheadline */}
              <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {t('hero.subheadline')}
              </p>

              {/* Input */}
              <IdeaInput onSubmit={handleIdeaSubmit} />

              {/* Trust Indicator */}
              <div className={`mt-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground/70 ${isRTL ? 'flex-row-reverse font-arabic' : ''}`}>
                <span>✓ {t('hero.trust.noCard')}</span>
                <span>✓ {t('hero.trust.human')}</span>
                <span>✓ {t('hero.trust.free')}</span>
              </div>
            </>
          ) : (
            <PathOptions 
              idea={idea} 
              onBack={handleBack} 
              onSelectPath={handleSelectPath}
              recommendedPath={getRecommendedPath()}
            />
          )}
        </div>
      </div>
    </section>
  );
}
