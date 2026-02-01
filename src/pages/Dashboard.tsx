import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { User } from '@supabase/supabase-js';
import { Plus, Globe, Clock, CheckCircle, AlertCircle, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('dashboard.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container-wide">
          {/* Welcome Header */}
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 ${isRTL ? 'sm:flex-row-reverse text-right' : ''}`}>
            <div>
              <h1 className={`font-display text-3xl font-bold mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {t('dashboard.welcome')}
              </h1>
              <p className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {user?.email}
              </p>
            </div>
            <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Button variant="hero" onClick={() => navigate('/request')} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Plus className="w-4 h-4" />
                {t('dashboard.newRequest')}
              </Button>
              <Button variant="ghost" onClick={handleLogout} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LogOut className="w-4 h-4" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h2 className={`font-display text-2xl font-semibold mb-3 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.empty.title')}
            </h2>
            <p className={`text-muted-foreground max-w-md mx-auto mb-8 ${isRTL ? 'font-arabic' : ''}`}>
              {t('dashboard.empty.desc')}
            </p>
            <Button variant="hero" size="lg" onClick={() => navigate('/request')}>
              {t('dashboard.empty.cta')}
            </Button>
          </div>

          {/* Status Legend */}
          <div className={`mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4 text-amber-500" />
              <span className={isRTL ? 'font-arabic' : ''}>{t('dashboard.status.pending')}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <span className={isRTL ? 'font-arabic' : ''}>{t('dashboard.status.inProgress')}</span>
            </div>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className={isRTL ? 'font-arabic' : ''}>{t('dashboard.status.complete')}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
