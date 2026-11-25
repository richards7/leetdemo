import React from 'react';
import { ServiceItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  Code2,
  Briefcase
} from 'lucide-react';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onInquireService
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="bg-[#0B367C] px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-blue-200">
              Detailed Service Breakdown
            </div>
            <h3 className="font-sans font-bold text-xl text-white mt-0.5">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Tagline & Deep Dive */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B367C] mb-1">
              Scope & Purpose
            </h4>
            <p className="text-base font-semibold text-slate-900 mb-2">
              {service.tagline}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Business Impact Banner */}
          <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-4">
            <div className="flex items-start gap-2.5">
              <Zap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0B367C] block text-xs uppercase tracking-wide mb-0.5">
                  Business Impact & Commercial ROI
                </span>
                <p className="text-slate-800 font-medium text-xs leading-relaxed">
                  {service.businessImpact}
                </p>
              </div>
            </div>
          </div>

          {/* Core Deliverables Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B367C] mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Core Key Deliverables Included</span>
            </h4>
            <ul className="grid grid-cols-1 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-[#0B367C] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology & Tools Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B367C] mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#2563EB]" />
              <span>Standard Enterprise Tooling & Tech Stack</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono font-medium bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Typical Artifacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B367C] mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-slate-600" />
              <span>Standard Documentation & Handover Artifacts</span>
            </h4>
            <div className="space-y-1.5">
              {service.sampleDeliverables.map((artifact, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0B367C]" />
                  <span>{artifact}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 font-sans text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close Overview
          </button>

          <button
            onClick={() => {
              onInquireService(service.title);
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 font-sans text-sm font-semibold tracking-normal text-white bg-[#0B367C] hover:bg-[#08295E] rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
