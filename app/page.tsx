import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { HeroSection } from "@/components/hero";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { About } from "@/components/ui/About";
import { Work } from "@/components/ui/Work";
import { Publications } from "@/components/ui/Publications";
import { Education } from "@/components/ui/Education";
import { Contact } from "@/components/ui/Contact";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <SceneCanvas />

      <div className="relative z-10">
        <HeroSection />
        <About />
        <Work />
        <InfiniteMarquee text="CREATIVE DEVELOPER • RESEARCHER • ENGINEER" baseVelocity={2} />
        <Publications />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
