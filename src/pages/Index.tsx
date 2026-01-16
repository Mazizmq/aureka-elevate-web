import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { ServicesSection } from '@/components/ServicesSection';
import { LabsSection } from '@/components/LabsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ServicesSection />
        <LabsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
