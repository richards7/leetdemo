import React from 'react';
import { Cloud, Code2, Cpu, TrendingUp } from 'lucide-react';

const capabilityCards = [
  { title: 'Web Development', detail: 'React • Web Apps', icon: Code2, position: 'left-0 top-2', animation: 'animate-hero-float-1', color: 'text-[#0B367C]', badge: 'Build' },
  { title: 'AI Solutions', detail: 'Agents • Automation', icon: Cpu, position: 'right-0 top-2', animation: 'animate-hero-float-2', color: 'text-[#2563EB]', badge: 'Think' },
  { title: 'Cloud & DevOps', detail: 'Cloud • CI/CD', icon: Cloud, position: 'bottom-2 left-0', animation: 'animate-hero-float-3', color: 'text-[#0B367C]', badge: 'Scale' },
  { title: 'Digital Growth', detail: 'SEO • Reach', icon: TrendingUp, position: 'bottom-2 right-0', animation: 'animate-hero-float-4', color: 'text-emerald-600', badge: 'Grow' },
];

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative mx-auto h-[390px] w-full max-w-[570px] select-none sm:h-[470px]" aria-label="ROVIANX technology ecosystem">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/70 sm:h-64 sm:w-64" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/80 sm:h-96 sm:w-96" />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 570 470" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-connection-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#2563EB" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#0B367C" stopOpacity="0.45" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {[
          ['M285 235 C225 205 170 145 105 78', '0s'],
          ['M285 235 C345 205 400 145 465 78', '0.75s'],
          ['M285 235 C225 265 170 325 105 392', '1.5s'],
          ['M285 235 C345 265 400 325 465 392', '2.25s'],
        ].map(([path, delay]) => (
          <React.Fragment key={path}>
            <path d={path} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 5" />
            <path d={path} stroke="url(#hero-connection-gradient)" strokeWidth="2" strokeDasharray="6 22" className="animate-hero-line" style={{ animationDelay: delay }} />
          </React.Fragment>
        ))}
        <circle cx="285" cy="235" r="4" fill="#0B367C" />
        <circle cx="285" cy="235" r="9" stroke="#2563EB" strokeOpacity="0.5" />
        <circle cx="105" cy="78" r="4" fill="#2563EB" />
        <circle cx="465" cy="78" r="4" fill="#2563EB" />
        <circle cx="105" cy="392" r="4" fill="#0B367C" />
        <circle cx="465" cy="392" r="4" fill="#0B367C" />
      </svg>

      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 animate-hero-float-center">
        <div className="animate-hero-pulse absolute -inset-4 rounded-3xl bg-blue-400/20 blur-xl" />
        <div className="relative flex w-36 flex-col items-center rounded-3xl border border-blue-200/90 bg-white/95 px-4 py-4 shadow-xl shadow-blue-950/10 backdrop-blur-md sm:w-44 sm:px-6 sm:py-5">
          <div className="mb-2 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0B367C]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />ROVIANX CORE</div>
          <div className="flex h-20 items-center justify-center sm:h-24">
            <svg viewBox="0 0 120 110" className="h-20 w-24 sm:h-24 sm:w-28" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="hero-x-left" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#0B367C" /><stop offset="1" stopColor="#1E3A8A" /></linearGradient>
                <linearGradient id="hero-x-right" x1="1" y1="0" x2="0" y2="1"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#60A5FA" /></linearGradient>
              </defs>
              <polygon points="10,5 38,5 110,105 82,105" fill="url(#hero-x-left)" />
              <polygon points="110,5 82,5 10,105 38,105" fill="url(#hero-x-right)" opacity="0.9" />
            </svg>
          </div>
          <span className="font-sans text-sm font-extrabold tracking-tight text-[#0B367C]">RovianX</span>
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.25em] text-slate-500">Solutions</span>
        </div>
      </div>

      {capabilityCards.map(({ title, detail, icon: Icon, position, animation, color, badge }) => (
        <div key={title} className={`absolute z-10 ${position} ${animation}`}>
          <div className="w-36 rounded-2xl border border-slate-200/90 bg-white/90 p-3 shadow-lg shadow-blue-950/10 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-blue-300 sm:w-44 sm:p-3.5">
            <div className="mb-2 flex items-center justify-between gap-2"><div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 ${color}`}><Icon className="h-4 w-4" /></div><span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-slate-500">{badge}</span></div>
            <h3 className="truncate font-sans text-[11px] font-bold text-slate-900 sm:text-[13px]">{title}</h3>
            <p className="mt-0.5 truncate font-sans text-[9px] text-slate-500 sm:text-[10px]">{detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
