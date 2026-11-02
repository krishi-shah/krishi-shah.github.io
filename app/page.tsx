import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Ribbons from '@/components/Ribbons';
import WorkSection from '@/components/WorkSection';
import NumbersWall from '@/components/NumbersWall';
import RecognitionSection from '@/components/RecognitionSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import WritingSection from '@/components/WritingSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorBuild from '@/components/CursorBuild';
import Effects from '@/components/Effects';
import CommandBar from '@/components/CommandBar';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ribbons />
        <WorkSection />
        <NumbersWall />
        <RecognitionSection />
        <ProcessSection />
        <AboutSection />
        <ExperienceSection />
        <WritingSection />
        <Ribbons />
        <ContactSection />
      </main>
      <Footer />
      <CursorBuild />
      <Effects />
      <CommandBar />
    </>
  );
}
