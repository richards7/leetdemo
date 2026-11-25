import React from 'react';
import { ENGAGEMENT_MODELS } from '../data/servicesData';
import { EngagementModel } from '../types';
import { 
  Check, 
  ArrowRight, 
  Calendar, 
  Layers, 
  Cpu, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

interface EngagementModelsProps {
  onSelectModel: (modelTitle: string) => void;
}

export const EngagementModels: React.FC<EngagementModelsProps> = ({
  onSelectModel
}) => {
  return (
    <section id="engagement-models" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            How We Partner With Your Organization
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Every business has distinct operational rhythms. Whether you require deterministic milestone delivery, dedicated monthly capacity, or co-engineered custom enterprise architecture, we adapt to your commercial model.
          </p>
        </div>

        {/* 3 Model Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ENGAGEMENT_MODELS.map((model, idx) => {
            const isFeatured = idx === 1; // Monthly Services as popular retainer

            return (
              <div
                key={model.id}
                id={`engagement-model-${model.id}`}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 relative ${
                  isFeatured 
                    ? 'bg-[#0B367C] text-white shadow-xl ring-2 ring-[#0B367C]' 
                    : 'bg-slate-50 border border-slate-200/90 text-slate-900 hover:border-slate-300'
                }`}
              >
                {/* Popular Tag for Retainer */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-xs">
                    Most Popular for Growth
                  </div>
                )}

                <div>
                  {/* Title & Description */}
                  <h3 className={`font-sans font-bold text-xl mb-2.5 ${
                    isFeatured ? 'text-white' : 'text-slate-900'
                  }`}>
                    {model.title}
                  </h3>

                  <p className={`font-sans font-normal text-sm leading-relaxed mb-5 ${
                    isFeatured ? 'text-blue-100' : 'text-slate-600'
                  }`}>
                    {model.description}
                  </p>

                  {/* Ideal For Box */}
                  <div className={`p-3 rounded-xl mb-6 font-sans text-xs leading-relaxed ${
                    isFeatured ? 'bg-white/10 text-slate-100' : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    <strong className={`block text-[11px] uppercase tracking-wide mb-1 font-bold ${
                      isFeatured ? 'text-blue-200' : 'text-[#0B367C]'
                    }`}>
                      Ideal Scenario:
                    </strong>
                    {model.idealFor}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 mb-8">
                    <span className={`block text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isFeatured ? 'text-blue-200' : 'text-slate-500'
                    }`}>
                      Key Inclusions:
                    </span>
                    {model.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 font-sans font-normal text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isFeatured ? 'bg-blue-500 text-white' : 'bg-blue-100 text-[#0B367C]'
                        }`}>
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className={isFeatured ? 'text-slate-200' : 'text-slate-700'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <button
                  onClick={() => onSelectModel(model.title)}
                  className={`w-full py-3 px-4 rounded-xl font-sans text-sm font-semibold tracking-normal transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-white text-[#0B367C] hover:bg-slate-100 shadow-sm'
                      : 'bg-[#0B367C] text-white hover:bg-[#08295E] shadow-xs'
                  }`}
                >
                  <span>{model.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
