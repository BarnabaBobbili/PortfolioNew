import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Hero } from "@/components/ui/Hero";
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
        <Hero />
        <About />
        <Work />
        <InfiniteMarquee text="CREATIVE DEVELOPER" baseVelocity={2} />
        <Contact />
      </div>
    </main>
  );
}
