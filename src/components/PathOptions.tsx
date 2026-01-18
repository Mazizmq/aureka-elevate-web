import { MessageCircle, Calendar, ClipboardList, ArrowLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PathOptionsProps {
  idea: string;
  onBack: () => void;
  onSelectPath: (path: 'chat' | 'meeting' | 'questions') => void;
  recommendedPath?: 'chat' | 'meeting' | 'questions';
}

export function PathOptions({ idea, onBack, onSelectPath, recommendedPath = 'questions' }: PathOptionsProps) {
  const { t, isRTL } = useLanguage();

  const paths = [
    {
      id: 'chat' as const,
      icon: MessageCircle,
      titleKey: 'paths.chat.title',
      descKey: 'paths.chat.desc',
      badgeKey: 'paths.chat.badge',
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
    },
    {
      id: 'meeting' as const,
      icon: Calendar,
      titleKey: 'paths.meeting.title',
      descKey: 'paths.meeting.desc',
      badgeKey: 'paths.meeting.badge',
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
    },
    {
      id: 'questions' as const,
      icon: ClipboardList,
      titleKey: 'paths.questions.title',
      descKey: 'paths.questions.desc',
      badgeKey: 'paths.questions.badge',
      color: 'from-emerald-500/20 to-emerald-600/20',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Back Button & Idea Display */}
      <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <button
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          <span className={isRTL ? 'font-arabic' : ''}>{t('paths.back')}</span>
        </button>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className={`text-sm text-muted-foreground mb-1 ${isRTL ? 'font-arabic' : ''}`}>
            {t('paths.yourIdea')}:
          </p>
          <p className={`text-lg font-medium ${isRTL ? 'font-arabic' : ''}`}>"{idea}"</p>
        </div>
      </div>

      {/* Recommendation */}
      <div className={`mb-8 text-center ${isRTL ? 'font-arabic' : ''}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm">
            {t('paths.recommendation')}: <strong>{t(`paths.${recommendedPath}.title`)}</strong>
          </span>
        </div>
      </div>

      {/* Path Cards */}
      <div className={`grid md:grid-cols-3 gap-6 ${isRTL ? 'direction-rtl' : ''}`}>
        {paths.map((path) => (
          <div
            key={path.id}
            className={`relative group cursor-pointer ${path.id === recommendedPath ? 'ring-2 ring-primary ring-offset-2 ring-offset-background rounded-2xl' : ''}`}
            onClick={() => onSelectPath(path.id)}
          >
            {path.id === recommendedPath && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {t('paths.recommended')}
                </span>
              </div>
            )}
            <div className={`h-full bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg ${isRTL ? 'text-right' : ''}`}>
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`}>
                <path.icon className={`w-7 h-7 ${path.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {t(path.titleKey)}
              </h3>

              {/* Description */}
              <p className={`text-muted-foreground text-sm mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {t(path.descKey)}
              </p>

              {/* Badge */}
              <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 bg-accent rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-3 h-3" />
                <span className={isRTL ? 'font-arabic' : ''}>{t(path.badgeKey)}</span>
              </div>

              {/* CTA */}
              <Button variant="premium" className="w-full mt-6">
                {t('paths.select')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 24-Hour Promise */}
      <div className={`mt-10 text-center ${isRTL ? 'font-arabic' : ''}`}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium">{t('paths.promise')}</span>
        </div>
      </div>
    </div>
  );
}
