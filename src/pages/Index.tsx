import { Header } from '@/components/Header';
import { NewHeroSection } from '@/components/NewHeroSection';
import { HumanGuidedSection } from '@/components/HumanGuidedSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PricingMiniTable } from '@/components/PricingMiniTable';
import { LabsSection } from '@/components/LabsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <NewHeroSection />
        <HumanGuidedSection />
        <HowItWorksSection />
        <PricingMiniTable />
        <LabsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
