import React from 'react';
import { 
  ArrowRight, 
  ArrowUpRight
} from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onExploreServices: () => void;
  onSelectCategory?: (category: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices
}) => {
  return (
    <section id="overview" className="relative overflow-hidden border-b border-slate-200/80 bg-white pb-16 pt-28 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#0B367C 1px, transparent 1px), linear-gradient(90deg, #0B367C 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-slate-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col items-start lg:col-span-6">
          <div className="max-w-xl">
            <p className="mb-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.28em] text-[#2563EB] sm:text-xs">
              ROVIANX SOLUTIONS
            </p>
            <h1 className="mb-6 max-w-lg font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Digital Solutions
              <br />
              <span className="text-[#0B367C]">for a Smarter Future.</span>
            </h1>
            <p className="mb-8 max-w-md font-sans text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              We build modern digital experiences and technology solutions that help businesses move forward.
            </p>

            <div className="flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0B367C] px-6 py-3.5 font-sans text-sm font-semibold tracking-normal text-white shadow-sm transition-all duration-150 hover:bg-[#08295E] hover:shadow"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 font-sans text-sm font-semibold tracking-normal text-slate-600 transition-colors hover:text-[#0B367C]"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 flex w-full items-center justify-center lg:col-span-6 lg:mt-0 lg:translate-y-8">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};
