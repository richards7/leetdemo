import React from 'react';
import { ArrowRight, Compass, Cpu, Sparkles } from 'lucide-react';

interface HomeAboutIntroProps {
  onDiscover: () => void;
}

export const HomeAboutIntro: React.FC<HomeAboutIntroProps> = ({ onDiscover }) => {
  return (
    <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">About ROVIANX</p>
          <h2 className="max-w-md font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ideas shaped into practical digital solutions.
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            We turn ideas into practical digital solutions through thoughtful design, modern technology, and business-focused development.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onDiscover}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0B367C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#08295E]"
            >
              Discover ROVIANX
              <ArrowRight className="h-4 w-4" />
            </button>
            <div className="hidden items-center gap-5 text-xs font-semibold text-slate-500 sm:flex">
              <span className="inline-flex items-center gap-1.5"><Compass className="h-4 w-4 text-[#2563EB]" /> Clear direction</span>
              <span className="inline-flex items-center gap-1.5"><Cpu className="h-4 w-4 text-[#2563EB]" /> Modern technology</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-[#2563EB]" /> Useful outcomes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
