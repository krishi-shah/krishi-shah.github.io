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
import AskSection from '@/components/AskSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import CursorBuild from '@/components/CursorBuild';
import Effects from '@/components/Effects';
import CommandBar from '@/components/CommandBar';
import KonamiSwarm from '@/components/KonamiSwarm';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
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
        <AskSection />
        <ContactSection />
      </main>
      <Footer />
      <CursorBuild />
      <Effects />
      <CommandBar />
      <KonamiSwarm />
    </>
  );
}
