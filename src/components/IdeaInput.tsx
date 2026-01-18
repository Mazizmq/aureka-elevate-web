import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
}

const exampleIdeas = [
  { key: 'example.clinic', fallback: 'Website for my clinic' },
  { key: 'example.nonprofit', fallback: 'Website for a non-profit organization' },
  { key: 'example.business', fallback: 'Landing page for my business' },
];

export function IdeaInput({ onSubmit }: IdeaInputProps) {
  const [idea, setIdea] = useState('');
  const { t, isRTL } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setIdea(example);
    onSubmit(example);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-card border-2 border-border hover:border-primary/50 focus-within:border-primary rounded-2xl shadow-lg transition-all duration-300">
            <Sparkles className="w-5 h-5 text-primary mx-4 flex-shrink-0" />
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={t('hero.input.placeholder')}
              className={`flex-1 py-5 bg-transparent text-lg text-foreground placeholder:text-muted-foreground focus:outline-none ${isRTL ? 'font-arabic text-right' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className={`m-2 ${isRTL ? 'mr-0' : 'ml-0'}`}
              disabled={!idea.trim()}
            >
              <span className="hidden sm:inline">{t('hero.input.submit')}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </form>

      {/* Example Ideas */}
      <div className={`mt-6 flex flex-wrap justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <span className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
          {t('hero.input.examples')}:
        </span>
        {exampleIdeas.map((example, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(t(example.key) || example.fallback)}
            className={`text-sm px-3 py-1 rounded-full bg-secondary hover:bg-accent text-secondary-foreground transition-colors ${isRTL ? 'font-arabic' : ''}`}
          >
            "{t(example.key) || example.fallback}"
          </button>
        ))}
      </div>
    </div>
  );
}
