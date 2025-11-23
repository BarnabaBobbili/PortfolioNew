import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { HeroSection } from "@/components/hero";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { About } from "@/components/ui/About";
import { Work } from "@/components/ui/Work";
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
        <InfiniteMarquee text="CREATIVE DEVELOPER" baseVelocity={2} />
        <Contact />
      </div>
    </main>
  );
}
