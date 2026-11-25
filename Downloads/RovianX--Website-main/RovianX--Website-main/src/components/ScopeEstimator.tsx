import React, { useState } from 'react';
import { 
  Globe, 
  Code2, 
  Cpu, 
  Palette, 
  Cloud, 
  Megaphone, 
  TrendingUp, 
  Briefcase, 
  LifeBuoy, 
  Database, 
  FileText,
  Check, 
  ArrowRight, 
  ArrowLeft,
  Clock, 
  Users, 
  ShieldCheck,
  Send,
  Sparkles,
  Layers,
  Award,
  Lock,
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

interface ScopeEstimatorProps {
  onApplyScopeToContact: (scopeData: {
    services: string[];
    model: string;
    timeline: string;
    generatedBrief: string;
  }) => void;
}

interface EstimatorServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ESTIMATOR_SERVICES: EstimatorServiceItem[] = [
  {
    id: 'website-services',
    title: 'Website Services',
    description: 'Business websites, e-commerce stores, landing pages, and ongoing maintenance.',
    icon: Globe
  },
  {
    id: 'software-app-dev',
    title: 'Software & App Development',
    description: 'Custom web apps, mobile apps, business automation, and enterprise software.',
    icon: Code2
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    description: 'Intelligent agents, custom RAG systems, LLM integrations, and AI automation.',
    icon: Cpu
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Design',
    description: 'Interactive Figma prototypes, user journeys, design systems, and brand identity.',
    icon: Palette
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    description: 'AWS/GCP infrastructure, Docker containerization, CI/CD, and 99.9% uptime SLA.',
    icon: Cloud
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Targeted PPC campaigns, multi-channel social management, and audience growth.',
    icon: Megaphone
  },
  {
    id: 'seo-online-growth',
    title: 'SEO & Online Growth',
    description: 'Technical search engine optimization, Core Web Vitals, and organic rank dominance.',
    icon: TrendingUp
  },
  {
    id: 'business-solutions',
    title: 'Business Solutions',
    description: 'Digital workflow transformation, process automation, CRM, and payments.',
    icon: Briefcase
  },
  {
    id: 'it-tech-support',
    title: 'IT & Technical Support',
    description: 'Managed cloud domains, DNS, enterprise email, and tier-3 technical support.',
    icon: LifeBuoy
  },
  {
    id: 'data-database',
    title: 'Data & Database Solutions',
    description: 'Database architecture, zero-downtime data migration, ETL, and BI dashboards.',
    icon: Database
  },
  {
    id: 'content-services',
    title: 'Content Services',
    description: 'Authoritative technical copywriting, thought leadership articles, and landing copy.',
    icon: FileText
  }
];

const STEPS = [
  { id: 1, number: '01', title: 'Capabilities', subtitle: 'Select Services' },
  { id: 2, number: '02', title: 'Project Stage', subtitle: 'Maturity Level' },
  { id: 3, number: '03', title: 'Timeline & Priority', subtitle: 'Delivery Pace' },
  { id: 4, number: '04', title: 'Project Scope', subtitle: 'Synthesis & Review' }
];

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  onApplyScopeToContact
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [stage, setStage] = useState<'mvp' | 'redesign' | 'enterprise' | null>(null);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'accelerated' | 'multi-phase' | null>(null);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter(s => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  // Heuristic estimation calculations
  const hasSelections = selectedServices.length > 0;
  const sprintCount = hasSelections 
    ? Math.max(2, Math.ceil(selectedServices.length * 0.8) + (stage === 'enterprise' ? 4 : stage === 'redesign' ? 2 : 1))
    : 0;

  const weeksDuration = !hasSelections
    ? 0
    : timelineSpeed === 'accelerated' 
      ? Math.max(3, Math.round(sprintCount * 1.5))
      : timelineSpeed === 'multi-phase'
        ? Math.round(sprintCount * 3)
        : Math.round(sprintCount * 2);

  const recommendedModel = !hasSelections
    ? 'Awaiting capability selection'
    : selectedServices.length >= 4 
      ? 'Monthly Services & Dedicated Pods' 
      : stage === 'enterprise' 
        ? 'Custom Enterprise Solutions' 
        : 'Project-Based Work';

  const recommendedTeam = !hasSelections
    ? []
    : [
        '1 Dedicated Technical Project Lead',
        `${Math.min(3, Math.max(1, Math.ceil(selectedServices.length / 2)))} Senior Full-Stack Engineers`,
        selectedServices.some(s => s.includes('Design') || s.includes('Website') || s.includes('App')) ? '1 Senior UI/UX Specialist' : null,
        selectedServices.some(s => s.includes('AI') || s.includes('Data')) ? '1 Applied AI / Data Engineer' : null,
        '1 QA & Security Automation Specialist'
      ].filter(Boolean) as string[];

  const handleTransferToBrief = () => {
    if (selectedServices.length === 0) return;

    const brief = `[Auto-Generated from Scope Estimator]
Project Stage: ${stage ? stage.toUpperCase() : 'NOT SPECIFIED'}
Timeline Preference: ${timelineSpeed ? timelineSpeed.toUpperCase() : 'STANDARD'}
Estimated Duration: ~${weeksDuration} weeks (${sprintCount} Sprints)
Selected Core Services (${selectedServices.length}):
${selectedServices.map(s => `- ${s}`).join('\n')}
Recommended Framework: ${recommendedModel}
${customNotes ? `\nClient Specific Requirements / Details:\n${customNotes}` : ''}
`;

    onApplyScopeToContact({
      services: selectedServices,
      model: recommendedModel,
      timeline: `~${weeksDuration} weeks (${timelineSpeed || 'Standard'})`,
      generatedBrief: brief
    });

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 bg-gradient-to-b from-[#0B2545] via-[#07162C] to-[#0B2545] text-white border-b border-blue-950/80 relative overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#60A5FA 1px, transparent 1px), linear-gradient(90deg, #60A5FA 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Soft ambient atmospheric glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* PAGE HEADER                                                  */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15]">
            Plan Your Next <span className="text-[#60A5FA]">Digital Project</span>
          </h2>
          
          <p className="font-sans font-normal text-base sm:text-lg text-slate-300 mt-3 leading-relaxed max-w-2xl mx-auto">
            Tell us what you&apos;re building. We&apos;ll help define the right scope, timeline, and team.
          </p>
        </div>

        {/* ============================================================ */}
        {/* PROGRESS INDICATOR                                           */}
        {/* ============================================================ */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-black/30 rounded-2xl border border-white/10 backdrop-blur-xs">
            {STEPS.map((step) => {
              const isActive = currentStep === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center justify-center text-center py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white shadow-md border border-white text-[#0B367C]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`font-sans text-xs sm:text-sm font-bold leading-tight ${
                    isActive ? 'text-[#0B367C]' : 'text-slate-200'
                  }`}>
                    {step.title}
                  </span>
                  <span className={`font-sans text-[11px] mt-0.5 hidden sm:block ${
                    isActive ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {step.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MAIN TWO-COLUMN LAYOUT (65% Left / 35% Right)                */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT COLUMN: USER INTERACTION (~65% Width)                 */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {/* STEP 01: CAPABILITIES & SERVICE SELECTION */}
            {currentStep === 1 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                      What are you looking to build?
                    </h3>
                    <p className="font-sans text-sm text-slate-500 mt-1">
                      Select one or more services that match your project goals.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1">
                    {selectedServices.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedServices([])}
                        className="text-xs font-medium text-slate-500 hover:text-red-600 transition-colors cursor-pointer px-2.5 py-1 rounded bg-slate-100 hover:bg-red-50"
                      >
                        Clear All ({selectedServices.length})
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedServices(ESTIMATOR_SERVICES.map(s => s.title))}
                        className="text-xs font-medium text-[#0B367C] hover:text-[#08295E] transition-colors cursor-pointer px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100"
                      >
                        Select All (11)
                      </button>
                    )}
                  </div>
                </div>

                {/* 11 Selectable Service Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ESTIMATOR_SERVICES.map((srv) => {
                    const isSelected = selectedServices.includes(srv.title);
                    const IconComponent = srv.icon;

                    return (
                      <div
                        key={srv.id}
                        onClick={() => toggleService(srv.title)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                          isSelected
                            ? 'bg-blue-50/60 border-[#0B367C] shadow-xs ring-1 ring-[#0B367C]/15'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Small Professional Icon */}
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#0B367C] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Title & Short Description */}
                        <div className="flex-1 min-w-0 pr-1">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className={`font-sans font-bold text-sm leading-snug truncate ${
                              isSelected ? 'text-[#0B367C]' : 'text-slate-900'
                            }`}>
                              {srv.title}
                            </h4>

                            {/* Selection Indicator Check */}
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#0B367C] text-white'
                                : 'border border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {srv.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Next Action Footer */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {selectedServices.length} of 11 Services Selected
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    disabled={selectedServices.length === 0}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold transition-all ${
                      selectedServices.length > 0
                        ? 'bg-[#0B367C] hover:bg-[#08295E] text-white cursor-pointer shadow-sm'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Continue to Project Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 02: PROJECT STAGE */}
            {currentStep === 2 && (
              <div>
                <div className="pb-4 mb-6 border-b border-slate-100">
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    What stage is your project in?
                  </h3>
                  <p className="font-sans text-sm text-slate-500 mt-1">
                    Select your current initiative maturity so we can calibrate engineering velocity and dependencies.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'mvp',
                      title: 'Greenfield / MVP',
                      badge: 'Brand New',
                      desc: 'Building an initial version, prototype, or new product launch from the ground up.'
                    },
                    {
                      id: 'redesign',
                      title: 'Modernization & Scaling',
                      badge: 'Refactor / Redesign',
                      desc: 'Upgrading existing codebases, modernizing UI/UX, or migrating architecture.'
                    },
                    {
                      id: 'enterprise',
                      title: 'Enterprise Architecture',
                      badge: 'High Throughput',
                      desc: 'Mission-critical distributed systems, automated CI/CD, and multi-service workflows.'
                    }
                  ].map((item) => {
                    const isSelected = stage === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setStage(item.id as any)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-50/60 border-[#0B367C] ring-1 ring-[#0B367C]/15 shadow-xs'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {item.badge}
                            </span>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-[#0B367C] text-white' : 'border border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <h4 className={`font-sans font-bold text-base mb-1 ${
                            isSelected ? 'text-[#0B367C]' : 'text-slate-900'
                          }`}>
                            {item.title}
                          </h4>
                          <p className="font-sans text-xs text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back / Next Buttons */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Capabilities</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold bg-[#0B367C] hover:bg-[#08295E] text-white cursor-pointer shadow-sm transition-all"
                  >
                    <span>Continue to Timeline & Priority</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 03: TIMELINE & PRIORITY */}
            {currentStep === 3 && (
              <div>
                <div className="pb-4 mb-6 border-b border-slate-100">
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    What is your target timeline & deployment pace?
                  </h3>
                  <p className="font-sans text-sm text-slate-500 mt-1">
                    Select the preferred sprint velocity and scheduling model for your deliverable milestones.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'standard',
                      title: 'Standard Cadence',
                      tag: 'Bi-Weekly Sprints',
                      desc: 'Structured bi-weekly sprints, comprehensive validation, and steady milestone releases.'
                    },
                    {
                      id: 'accelerated',
                      title: 'Accelerated Sprint',
                      tag: 'Fast-Track',
                      desc: 'Dedicated fast-track pod prioritizing rapid time-to-market for pressing commercial deadlines.'
                    },
                    {
                      id: 'multi-phase',
                      title: 'Phased Rollout',
                      tag: 'Milestone Stages',
                      desc: 'Iterative phased rollout with scheduled user testing between key module deployments.'
                    }
                  ].map((item) => {
                    const isSelected = timelineSpeed === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setTimelineSpeed(item.id as any)}
                        className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-blue-50/60 border-[#0B367C] ring-1 ring-[#0B367C]/15 shadow-xs'
                            : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                              {item.tag}
                            </span>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              isSelected ? 'bg-[#0B367C] text-white' : 'border border-slate-300'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>
                          <h4 className={`font-sans font-bold text-base mb-1 ${
                            isSelected ? 'text-[#0B367C]' : 'text-slate-900'
                          }`}>
                            {item.title}
                          </h4>
                          <p className="font-sans text-xs text-slate-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Back / Next Buttons */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Project Stage</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans text-sm font-semibold bg-[#0B367C] hover:bg-[#08295E] text-white cursor-pointer shadow-sm transition-all"
                  >
                    <span>Review Project Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 04: PROJECT SCOPE & BRIEF SUMMARY */}
            {currentStep === 4 && (
              <div>
                <div className="pb-4 mb-6 border-b border-slate-100">
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    Project Scope & Brief Review
                  </h3>
                  <p className="font-sans text-sm text-slate-500 mt-1">
                    Review your tailored initiative configuration and add any specific technical requirements.
                  </p>
                </div>

                {/* Synthesis Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                    <span className="text-[11px] font-mono text-slate-500 block uppercase">Selected Capabilities</span>
                    <span className="font-sans font-bold text-base text-slate-900 mt-0.5 block">
                      {selectedServices.length} Services
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Unified under single pod
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                    <span className="text-[11px] font-mono text-slate-500 block uppercase">Initiative Maturity</span>
                    <span className="font-sans font-bold text-base text-slate-900 mt-0.5 block capitalize">
                      {stage ? stage.replace('-', ' ') : 'Standard Project'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Sprint velocity calibrated
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                    <span className="text-[11px] font-mono text-slate-500 block uppercase">Cadence & SLA</span>
                    <span className="font-sans font-bold text-base text-slate-900 mt-0.5 block capitalize">
                      {timelineSpeed ? timelineSpeed.replace('-', ' ') : 'Standard Sprints'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Bi-weekly milestone demos
                    </span>
                  </div>
                </div>

                {/* Custom Notes / Specific Requirements */}
                <div className="mb-6">
                  <label htmlFor="scope-custom-notes" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Additional Project Notes or Target Deadlines (Optional)
                  </label>
                  <textarea
                    id="scope-custom-notes"
                    rows={4}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="E.g., We plan to launch our MVP before Q3, integrate with Stripe and existing Postgres database, and require an interactive mobile app..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C] text-sm text-slate-800 placeholder-slate-400 bg-white"
                  />
                </div>

                {/* Back / Transfer Buttons */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Timeline</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTransferToBrief}
                    disabled={!hasSelections}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans text-sm font-semibold transition-all ${
                      hasSelections
                        ? 'bg-[#0B367C] hover:bg-[#08295E] text-white cursor-pointer shadow-sm'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Transfer Scope to Consultation Form</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT COLUMN: ROVIANX VALUE PROPOSITION (~35% Width)       */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#0B367C] to-[#082657] border border-blue-400/25 rounded-2xl p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3.5 border-b border-blue-400/20 mb-5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-200">
                ROVIANX VALUE PROPOSITION
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/30 border border-blue-300/30 rounded text-blue-100">
                Enterprise Standards
              </span>
            </div>

            {/* Title & Philosophy */}
            <div className="mb-6">
              <h3 className="font-sans font-extrabold text-xl text-white tracking-tight">
                The RovianX Standard
              </h3>
              <p className="font-sans text-xs text-blue-100/80 mt-1 leading-relaxed">
                Why leading startups and established companies partner with RovianX for end-to-end digital execution.
              </p>
            </div>

            {/* Core Value Pillars */}
            <div className="space-y-4 mb-6">
              
              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">
                    Unified Multi-Disciplinary Delivery
                  </h4>
                  <p className="font-sans text-[11px] text-blue-100/80 mt-0.5 leading-snug">
                    Web, mobile, AI, cloud, and digital growth under one roof—no fragmented contractors or siloed communication.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">
                    Dedicated Senior Engineering Pods
                  </h4>
                  <p className="font-sans text-[11px] text-blue-100/80 mt-0.5 leading-snug">
                    Direct access to principal architects and engineers who take personal ownership of clean code and delivery velocity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">
                    Production-Grade Rigor & CI/CD
                  </h4>
                  <p className="font-sans text-[11px] text-blue-100/80 mt-0.5 leading-snug">
                    Zero-downtime automated pipelines, strict test coverage, and documentation designed to scale without technical debt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 rounded-xl p-3.5 border border-white/10">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">
                    30-Day Post-Launch Warranty
                  </h4>
                  <p className="font-sans text-[11px] text-blue-100/80 mt-0.5 leading-snug">
                    Full post-deployment support, performance monitoring, and guaranteed bug-fixing with 99.9% uptime SLA commitments.
                  </p>
                </div>
              </div>

            </div>

            {/* Dynamic Synthesis Matrix (Non-repeating metrics) */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/10 mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-200 font-sans flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-300" />
                  <span>Target Timeline:</span>
                </span>
                <span className="font-sans font-extrabold text-white">
                  {weeksDuration > 0 ? `~${weeksDuration} Weeks (${sprintCount} Sprints)` : 'Pending Selection'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-200 font-sans flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-300" />
                  <span>Recommended Pod:</span>
                </span>
                <span className="font-sans font-extrabold text-white">
                  {recommendedTeam.length > 0 ? `${recommendedTeam.length} Specialists` : 'Standard Squad'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-200 font-sans flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-300" />
                  <span>Engagement Fit:</span>
                </span>
                <span className="font-sans font-bold text-white text-right max-w-[170px] truncate">
                  {recommendedModel}
                </span>
              </div>
            </div>

            {/* Client Safeguards */}
            <div className="border-t border-blue-400/20 pt-4 mb-6 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-blue-200 font-sans">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Protected by strict mutual NDA and enterprise security</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-blue-200 font-sans">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% intellectual property & clean codebase handover</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleTransferToBrief}
              disabled={!hasSelections}
              className={`w-full py-3.5 px-4 font-sans font-semibold tracking-normal text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 select-none ${
                hasSelections
                  ? 'bg-white hover:bg-slate-100 text-[#0B367C] cursor-pointer'
                  : 'bg-white/20 text-white/50 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{hasSelections ? 'Apply Scope to Consultation' : 'Select Capabilities to Estimate'}</span>
            </button>

            {copiedNotification && (
              <div className="mt-3 text-center text-xs font-bold text-emerald-300 animate-in fade-in">
                ✓ Brief successfully applied to consultation form below!
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
