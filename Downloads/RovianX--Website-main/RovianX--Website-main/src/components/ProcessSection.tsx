import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Activity,
  Server,
  Code2,
  GitBranch,
  CloudCheck,
  FileCheck,
  Sparkles,
  ArrowDown
} from 'lucide-react';

interface ProcessStage {
  id: string;
  stepNumber: string;
  shortLabel: string;
  title: string;
  description: string;
  deliverable: string;
  icon: React.ElementType;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: 'discover',
    stepNumber: '01',
    shortLabel: 'DISCOVER',
    title: 'DISCOVERY & STRATEGY',
    description: 'Understand your business goals, users, technical requirements, and success metrics.',
    deliverable: 'Technical Specification & Architecture Blueprint',
    icon: Compass,
  },
  {
    id: 'design',
    stepNumber: '02',
    shortLabel: 'DESIGN',
    title: 'DESIGN & PROTOTYPING',
    description: 'Turn concepts into high-fidelity experiences, prototypes, and refined design systems.',
    deliverable: 'Interactive Prototype & Design System',
    icon: Layers,
  },
  {
    id: 'build',
    stepNumber: '03',
    shortLabel: 'BUILD',
    title: 'ENGINEERING & QUALITY',
    description: 'Build, test, integrate, and continuously improve with production-ready engineering practices.',
    deliverable: 'Tested, Production-Ready Codebase',
    icon: Cpu,
  },
  {
    id: 'launch',
    stepNumber: '04',
    shortLabel: 'LAUNCH',
    title: 'LAUNCH & SCALE',
    description: 'Deploy securely, optimize performance, monitor production, and continuously evolve the platform.',
    deliverable: 'Live Production Platform & Handover Documentation',
    icon: Rocket,
  },
];

export const ProcessSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const handleStageClick = (index: number) => {
    setActiveStageIndex(index);
    const cardEl = document.getElementById(`process-stage-${index}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  /**
   * Minimal, light, consulting-grade preview graphics for each stage.
   * Strictly avoids dark backgrounds, heavy terminals, gaming UI, or neon effects.
   */
  const renderStageVisual = (stageIndex: number, isHovered: boolean) => {
    switch (stageIndex) {
      case 0:
        // 01 — DISCOVERY & STRATEGY
        // Architecture blueprint: API schema, Database model, UI flows
        return (
          <div className="relative h-28 w-full bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-blue-300 group-hover:bg-blue-50/30 transition-all duration-200">
            {/* Subtle architectural grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#0B367C 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }}
            />

            {/* Top status bar */}
            <div className="relative flex items-center justify-between z-10">
              <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                System Scope
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#0B367C] bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                Blueprint v1.0
              </span>
            </div>

            {/* Connected architecture nodes */}
            <div className="relative flex items-center justify-between px-1 z-10">
              {/* API Node */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-[10px] font-mono font-bold text-[#0B367C] shadow-2xs group-hover:border-[#0B367C] transition-colors">
                  API
                </div>
                <span className="text-[9px] text-slate-500 font-sans font-medium mt-1">Schema</span>
              </div>

              {/* Connecting line */}
              <div className="flex-1 mx-1.5 h-px bg-slate-300 relative">
                <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45" />
              </div>

              {/* Database Node */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-[10px] font-mono font-bold text-[#0B367C] shadow-2xs group-hover:border-[#0B367C] transition-colors">
                  DB
                </div>
                <span className="text-[9px] text-slate-500 font-sans font-medium mt-1">Model</span>
              </div>

              {/* Connecting line */}
              <div className="flex-1 mx-1.5 h-px bg-slate-300 relative">
                <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 border-t border-r border-slate-400 rotate-45" />
              </div>

              {/* UI Flow Node */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-[10px] font-mono font-bold text-[#0B367C] shadow-2xs group-hover:border-[#0B367C] transition-colors">
                  UI
                </div>
                <span className="text-[9px] text-slate-500 font-sans font-medium mt-1">Flows</span>
              </div>
            </div>

            {/* Bottom validation note */}
            <div className="relative flex items-center justify-between text-[10px] text-slate-500 z-10 pt-1.5 border-t border-slate-200/70">
              <span className="font-sans">Feasibility & Architecture</span>
              <span className="text-emerald-700 font-semibold font-mono">100% Aligned</span>
            </div>
          </div>
        );

      case 1:
        // 02 — DESIGN & PROTOTYPING
        // Clean high-fidelity design system & prototype canvas
        return (
          <div className="relative h-28 w-full bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-blue-300 group-hover:bg-blue-50/30 transition-all duration-200">
            {/* Mini viewport window frame */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-[10px] font-mono text-slate-400 ml-1">canvas.figma</span>
              </div>
              {/* Color swatches */}
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0B367C]" />
                <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                <span className="w-2 h-2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* Minimalist interactive interface mockup */}
            <div className="relative h-11 bg-white rounded-lg border border-slate-200/90 p-2 flex items-center justify-between shadow-2xs">
              <div className="flex flex-col gap-1 w-3/5">
                <div className="h-1.5 w-16 bg-slate-300 rounded" />
                <div className="h-1 w-24 bg-slate-200 rounded" />
              </div>

              <div className="px-2 py-0.5 bg-[#0B367C] rounded text-[9px] font-semibold text-white shadow-2xs group-hover:bg-[#2563EB] transition-colors">
                Action
              </div>

              {/* Elegant clean design cursor */}
              <div className="absolute right-9 bottom-1.5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5 pointer-events-none">
                <svg className="w-3.5 h-3.5 text-slate-800 drop-shadow-xs fill-slate-800" viewBox="0 0 24 24">
                  <path d="M3 3l7 18 3-7 7-3L3 3z" />
                </svg>
              </div>
            </div>

            {/* Bottom design system status */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/70">
              <span className="font-sans">Ergonomic UX System</span>
              <span className="text-[#0B367C] font-semibold font-mono">60 FPS Ready</span>
            </div>
          </div>
        );

      case 2:
        // 03 — ENGINEERING & QUALITY
        // Clean light CI/CD testing pipeline & automated suites
        return (
          <div className="relative h-28 w-full bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-blue-300 group-hover:bg-blue-50/30 transition-all duration-200">
            {/* Pipeline Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
                <Code2 className="w-3.5 h-3.5 text-[#0B367C]" />
                <span className="font-semibold">test:suite</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
                PASS
              </span>
            </div>

            {/* Pipeline stages checklist */}
            <div className="space-y-1.5 bg-white p-1.5 rounded-lg border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-600">Lint • Build • Security</span>
                <span className="text-emerald-600 font-bold">100%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0B367C] to-emerald-500 rounded-full w-full" />
              </div>
            </div>

            {/* Bottom code reliability metric */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/70">
              <span className="font-sans">Continuous Integration</span>
              <span className="text-emerald-700 font-semibold font-mono">Zero Regressions</span>
            </div>
          </div>
        );

      case 3:
        // 04 — LAUNCH & SCALE
        // Clean light cloud deployment, 99.99% uptime & monitoring
        return (
          <div className="relative h-28 w-full bg-slate-50/90 rounded-xl p-3 border border-slate-200/80 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-blue-300 group-hover:bg-blue-50/30 transition-all duration-200">
            {/* Status title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold text-slate-800">Production Live</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0B367C] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                v1.0.0
              </span>
            </div>

            {/* Cloud edge monitoring display */}
            <div className="bg-white p-2 rounded-lg border border-slate-200/80 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0B367C]">
                  <CloudCheck className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold text-slate-800 leading-tight">Global Edge</span>
                  <span className="text-[9px] font-mono text-slate-400">DNS & SSL Ready</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] font-mono font-bold text-[#0B367C]">99.99%</div>
                <div className="text-[9px] font-sans text-slate-400">SLA Uptime</div>
              </div>
            </div>

            {/* Bottom continuous evolution SLA */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-200/70">
              <span className="font-sans">24/7 Monitoring Active</span>
              <span className="text-emerald-700 font-semibold font-mono">Healthy</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* ============================================================ */}
        {/* HERO SECTION                                                 */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          {/* Main Heading with RovianX blue accent */}
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.15] mb-4">
            From Idea to <span className="text-[#0B367C]">Production.</span>
          </h2>

          {/* Supporting text */}
          <p className="font-sans text-lg sm:text-xl font-medium text-slate-700 leading-snug mb-3">
            A proven process built for clarity, speed, and scale.
          </p>

          {/* Supporting statement */}
          <p className="font-sans text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From discovery and strategy to engineering, launch, and continuous improvement, every stage is designed to move your business forward.
          </p>
        </div>

        {/* ============================================================ */}
        {/* PROCESS TIMELINE (Connected 4-Stage Journey)                 */}
        {/* ============================================================ */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2.5 px-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
            {PROCESS_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => handleStageClick(idx)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider transition-all cursor-pointer select-none focus:outline-none ${
                      isActive
                        ? 'bg-[#0B367C] text-white shadow-xs'
                        : 'text-slate-600 hover:text-[#0B367C] hover:bg-white'
                    }`}
                  >
                    <span>{stage.stepNumber}</span>
                    <span>{stage.shortLabel}</span>
                  </button>

                  {idx < PROCESS_STAGES.length - 1 && (
                    <span className="text-slate-300 font-mono text-xs select-none">
                      →
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* FOUR PROCESS STAGES (Refined Cards)                          */}
        {/* ============================================================ */}
        {/* Mobile vertical connecting timeline indicator */}
        <div className="relative">
          {/* Thin vertical connecting line visible strictly on mobile */}
          <div className="md:hidden absolute left-6 top-8 bottom-8 w-px bg-slate-200 z-0" />

          {/* Cards Grid: 4 columns on desktop, clean vertical stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STAGES.map((stage, idx) => {
              const isSelected = activeStageIndex === idx;
              const IconComponent = stage.icon;

              return (
                <div
                  key={stage.id}
                  id={`process-stage-${idx}`}
                  onClick={() => setActiveStageIndex(idx)}
                  onMouseEnter={() => setActiveStageIndex(idx)}
                  className={`group bg-white rounded-xl border p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                    isSelected
                      ? 'border-blue-300 shadow-md ring-1 ring-blue-100 -translate-y-1'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300 hover:shadow-sm hover:-translate-y-0.5'
                  }`}
                >
                  {/* Subtle top accent indicator for active stage */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-t transition-colors ${
                    isSelected ? 'bg-[#0B367C]' : 'bg-transparent group-hover:bg-slate-200'
                  }`} />

                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        {/* Number badge */}
                        <span className={`font-mono text-xl font-extrabold tracking-tight transition-colors ${
                          isSelected ? 'text-[#0B367C]' : 'text-slate-400 group-hover:text-[#0B367C]'
                        }`}>
                          {stage.stepNumber}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                          STAGE
                        </span>
                      </div>

                      {/* Icon container */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 text-[#0B367C]' 
                          : 'bg-slate-50 text-slate-500 group-hover:text-[#0B367C] group-hover:bg-blue-50/60'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Small Clean Interface Illustration */}
                    {renderStageVisual(idx, isSelected)}

                    {/* Stage Title */}
                    <h3 className={`font-sans font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug transition-colors ${
                      isSelected ? 'text-[#0B367C]' : 'group-hover:text-[#0B367C]'
                    }`}>
                      {stage.title}
                    </h3>

                    {/* Concise Stage Description */}
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {stage.description}
                    </p>
                  </div>

                  {/* Key Outcome Handover Section */}
                  <div className="pt-3.5 border-t border-slate-100">
                    <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Key Outcome:
                    </span>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0B367C] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs font-semibold text-[#0B367C] leading-snug">
                        {stage.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* FINAL SECTION (Simple Professional CTA)                     */}
        {/* ============================================================ */}
        <div className="mt-16 lg:mt-20 pt-12 border-t border-slate-200/80">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-2.5">
              Ready to build what&apos;s next?
            </h3>
            <p className="font-sans text-sm sm:text-base text-slate-600 mb-6">
              Let&apos;s turn your idea into a scalable digital solution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {/* Primary button */}
              <a
                id="process-start-project-cta"
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 font-sans text-sm font-semibold text-white bg-[#0B367C] hover:bg-[#08295E] rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              {/* Secondary button */}
              <a
                id="process-talk-team-cta"
                href="#contact"
                className="w-full sm:w-auto px-5 py-3 font-sans text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Talk to Our Team</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
