"use client";

import Hero from "@/components/Hero";
import FallingPixelsDivider from "@/components/FallingPixelsDivider";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import WorksSection from "@/components/WorksSection";
import ExpEduSection from "@/components/ExpEduSection";
import ServicesSection from "@/components/ServicesSection";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import DashedAnimation from "@/animations/DashedAnimation";
import NeoReveal from "@/animations/NeoReveal";

export default function Home() {
  return (
    <div>
      <Hero />
      <FallingPixelsDivider />

      <NeoReveal direction="right">
        <AboutSection />
      </NeoReveal>
      <DashedAnimation />

      <div id="tech" className="scroll-mt-32">
        <NeoReveal direction="left">
          <TechStack />
        </NeoReveal>
      </div>
      <DashedAnimation />

      <NeoReveal direction="up">
        <WorksSection />
      </NeoReveal>
      
      <NeoReveal direction="right">
        <ExpEduSection />
      </NeoReveal>
      
      <NeoReveal direction="down">
        <ServicesSection />
      </NeoReveal>

      <div className="my-30 flex flex-col gap-5">
        <Marquee />
        <Marquee isReversed={true} />
      </div>

      <div id="contact" className="scroll-mt-32">
        <NeoReveal direction="up">
          <Contact />
        </NeoReveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-black dark:border-white py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-departure-mono font-bold uppercase tracking-widest text-[10px] text-foreground/60">
          © {new Date().getFullYear()} HtooMyatDev. All rights reserved.
        </p>
        <p className="font-departure-mono font-bold uppercase tracking-widest text-[10px] text-foreground/60">
          Built with Next.js / GSAP / Tailwind CSS
        </p>
      </div>
    </div>
  );
}
