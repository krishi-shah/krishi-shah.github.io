import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WorkSection from '@/components/WorkSection';
import RecognitionSection from '@/components/RecognitionSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import WritingSection from '@/components/WritingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorBuild from '@/components/CursorBuild';
import Effects from '@/components/Effects';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <RecognitionSection />
        <ProcessSection />
        <AboutSection />
        <ExperienceSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
      <CursorBuild />
      <Effects />
    </>
  );
}
