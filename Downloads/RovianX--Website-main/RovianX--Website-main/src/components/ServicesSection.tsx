import React, { useState } from 'react';
import { CORE_SERVICES } from '../data/servicesData';
import { ServiceItem, ServiceCategory } from '../types';
import { 
  Megaphone, 
  Globe, 
  Code, 
  Palette, 
  Cloud, 
  TrendingUp, 
  Briefcase, 
  LifeBuoy, 
  FileText, 
  Cpu, 
  Database,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle,
  ExternalLink,
  SlidersHorizontal
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onInquireService: (serviceTitle: string) => void;
  activeCategory: ServiceCategory;
  onCategoryChange: (category: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onInquireService,
  activeCategory,
  onCategoryChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Icon resolver
  const renderIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Megaphone': return <Megaphone className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Cloud': return <Cloud className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'LifeBuoy': return <LifeBuoy className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Database': return <Database className={className} />;
      default: return <Code className={className} />;
    }
  };

  const categories = [
    { id: 'all' as ServiceCategory, label: 'All Services (11)' },
    { id: 'software' as ServiceCategory, label: 'Software & Web' },
    { id: 'ai-data' as ServiceCategory, label: 'AI & Data Intelligence' },
    { id: 'cloud-enterprise' as ServiceCategory, label: 'Cloud, DevOps & IT' },
    { id: 'growth-design' as ServiceCategory, label: 'Growth, SEO & Design' },
  ];

  const filteredServices = CORE_SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight flex items-center gap-3">
              <span>Our 11 Core Capabilities</span>
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2563EB]" />
              </span>
            </h2>
            <p className="font-sans font-normal text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Practical services for building, improving, and growing digital products and business systems.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capability or tech..."
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C] shadow-2xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4.5 py-2.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0B367C] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid (Optimized, uncluttered cards with deep-dive modal on click) */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <p className="text-base font-medium">No capabilities match your query &quot;{searchQuery}&quot;.</p>
            <button 
              onClick={() => { setSearchQuery(''); onCategoryChange('all'); }}
              className="mt-3 text-sm font-bold text-[#0B367C] underline cursor-pointer"
            >
              Reset filter to show all 11 services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onSelectService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectService(service);
                  }
                }}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0B367C] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-6 group cursor-pointer"
              >
                <div>
                  {/* Top Bar: Icon & Category badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50/90 border border-blue-100 text-[#0B367C] group-hover:bg-[#0B367C] group-hover:text-white transition-all flex items-center justify-center shrink-0 group-hover:scale-105">
                      {renderIcon(service.iconName, 'w-6 h-6')}
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                      {service.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#0B367C] transition-colors mb-2 line-clamp-1">
                    {service.title}
                  </h3>

                  {/* Brief Summary */}
                  <p className="font-sans font-normal text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {service.shortDescription}
                  </p>

                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <span className="font-sans text-xs sm:text-sm font-semibold tracking-normal text-[#0B367C] group-hover:text-[#2563EB] flex items-center gap-1.5 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onInquireService(service.title);
                    }}
                    className="font-sans text-xs font-semibold tracking-normal text-slate-700 hover:text-white bg-slate-100 hover:bg-[#0B367C] px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                  >
                    Quick Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
