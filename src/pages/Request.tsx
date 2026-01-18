import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, ArrowLeft, Clock, User as UserIcon, Building, Heart } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(5, 'Phone number is required').max(20),
  entityType: z.enum(['individual', 'business', 'ngo']),
  websiteGoal: z.string().min(1, 'Please select a goal'),
  preferredLanguage: z.string().min(1, 'Please select a language'),
  stylePreference: z.string().min(1, 'Please select a style'),
  consent: z.literal(true, { errorMap: () => ({ message: 'You must agree to continue' }) }),
});

type FormData = z.infer<typeof formSchema>;

const entityTypes = [
  { value: 'individual', icon: UserIcon, labelKey: 'request.entity.individual' },
  { value: 'business', icon: Building, labelKey: 'request.entity.business' },
  { value: 'ngo', icon: Heart, labelKey: 'request.entity.ngo' },
];

const websiteGoals = [
  { value: 'showcase', labelKey: 'request.goal.showcase' },
  { value: 'services', labelKey: 'request.goal.services' },
  { value: 'contact', labelKey: 'request.goal.contact' },
  { value: 'information', labelKey: 'request.goal.information' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Español' },
];

const styles = [
  { value: 'modern', labelKey: 'request.style.modern' },
  { value: 'classic', labelKey: 'request.style.classic' },
  { value: 'minimal', labelKey: 'request.style.minimal' },
  { value: 'colorful', labelKey: 'request.style.colorful' },
];

export default function Request() {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const savedIdea = sessionStorage.getItem('websiteIdea') || '';
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    entityType: 'individual' as 'individual' | 'business' | 'ngo',
    websiteGoal: '',
    preferredLanguage: language,
    stylePreference: '',
    consent: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
      }
    });
  }, []);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (currentStep: number): boolean => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      1: ['fullName', 'email', 'phone'],
      2: ['entityType', 'websiteGoal'],
      3: ['preferredLanguage', 'stylePreference', 'consent'],
    };

    const fieldsToValidate = stepFields[currentStep] || [];
    const partialSchema = z.object(
      Object.fromEntries(
        fieldsToValidate.map(field => [field, (formSchema.shape as any)[field]])
      )
    );

    const result = partialSchema.safeParse(
      Object.fromEntries(fieldsToValidate.map(field => [field, formData[field]]))
    );

    if (!result.success) {
      const newErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormData;
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      // For now, just show success - we'll add database later
      toast({
        title: t('request.success.title'),
        description: t('request.success.desc'),
      });
      sessionStorage.removeItem('websiteIdea');
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: t('request.error.title'),
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container-narrow max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
                {t('request.step')} {step} / 3
              </span>
              <div className={`flex items-center gap-2 text-sm text-primary ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4" />
                <span className={isRTL ? 'font-arabic' : ''}>{t('request.promise')}</span>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Saved Idea */}
            {savedIdea && step === 1 && (
              <div className={`mb-6 p-4 bg-accent rounded-xl ${isRTL ? 'text-right font-arabic' : ''}`}>
                <p className="text-sm text-muted-foreground mb-1">{t('request.yourIdea')}:</p>
                <p className="font-medium">"{savedIdea}"</p>
              </div>
            )}

            {/* Step 1: Contact Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className={`font-display text-2xl font-bold mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t('request.step1.title')}
                </h2>
                
                <div className="space-y-2">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.fullName')}</Label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder={t('request.fullNamePlaceholder')}
                    className={isRTL ? 'text-right font-arabic' : ''}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.email')}</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t('request.emailPlaceholder')}
                    className={isRTL ? 'text-right' : ''}
                    dir="ltr"
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.phone')}</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t('request.phonePlaceholder')}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Website Details */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className={`font-display text-2xl font-bold mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t('request.step2.title')}
                </h2>

                <div className="space-y-3">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.entityType')}</Label>
                  <div className={`grid grid-cols-3 gap-3 ${isRTL ? 'direction-rtl' : ''}`}>
                    {entityTypes.map((entity) => (
                      <button
                        key={entity.value}
                        type="button"
                        onClick={() => updateField('entityType', entity.value as any)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.entityType === entity.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <entity.icon className={`w-6 h-6 mx-auto mb-2 ${formData.entityType === entity.value ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span className={`text-sm block ${isRTL ? 'font-arabic' : ''}`}>
                          {t(entity.labelKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.websiteGoal')}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {websiteGoals.map((goal) => (
                      <button
                        key={goal.value}
                        type="button"
                        onClick={() => updateField('websiteGoal', goal.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${isRTL ? 'text-right font-arabic' : ''} ${
                          formData.websiteGoal === goal.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {t(goal.labelKey)}
                      </button>
                    ))}
                  </div>
                  {errors.websiteGoal && <p className="text-sm text-destructive">{errors.websiteGoal}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className={`font-display text-2xl font-bold mb-6 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {t('request.step3.title')}
                </h2>

                <div className="space-y-3">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.preferredLanguage')}</Label>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        type="button"
                        onClick={() => updateField('preferredLanguage', lang.value)}
                        className={`px-4 py-2 rounded-full border-2 transition-all ${
                          formData.preferredLanguage === lang.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className={isRTL ? 'font-arabic' : ''}>{t('request.stylePreference')}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {styles.map((style) => (
                      <button
                        key={style.value}
                        type="button"
                        onClick={() => updateField('stylePreference', style.value)}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${isRTL ? 'text-right font-arabic' : ''} ${
                          formData.stylePreference === style.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {t(style.labelKey)}
                      </button>
                    ))}
                  </div>
                  {errors.stylePreference && <p className="text-sm text-destructive">{errors.stylePreference}</p>}
                </div>

                {/* Consent */}
                <div className={`p-4 bg-accent rounded-xl ${isRTL ? 'text-right' : ''}`}>
                  <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => updateField('consent', checked as boolean)}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className={`text-sm text-muted-foreground cursor-pointer ${isRTL ? 'font-arabic' : ''}`}>
                      {t('request.consent')}
                    </label>
                  </div>
                  {errors.consent && <p className="text-sm text-destructive mt-2">{errors.consent}</p>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className={`flex justify-between mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {step > 1 ? (
                <Button variant="ghost" onClick={handleBack} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  {t('request.back')}
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button variant="hero" onClick={handleNext} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('request.next')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              ) : (
                <Button variant="hero" onClick={handleSubmit} disabled={loading} className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {loading ? t('request.submitting') : t('request.submit')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
