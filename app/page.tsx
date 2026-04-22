import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SkillsMarquee from '@/components/SkillsMarquee';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ResumeSection from '@/components/ResumeSection';
import WritingSection from '@/components/WritingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingNav from '@/components/FloatingNav';
import CustomCursor from '@/components/CustomCursor';
import InteractiveParticles from '@/components/InteractiveParticles';

export default function Home() {
  return (
    <>
      <InteractiveParticles />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main className="relative z-10">
        <Hero />
        <SkillsMarquee />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ResumeSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}
