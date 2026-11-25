import React from 'react';
import { Logo } from './Logo';
import { ArrowUp } from 'lucide-react';
import { CORE_SERVICES } from '../data/servicesData';

interface FooterProps {
  onOpenLeadsManager?: () => void;
  onSelectServiceTitle: (title: string) => void;
  currentPath?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLeadsManager,
  onSelectServiceTitle,
  currentPath = '/'
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B367C] text-white pt-16 pb-12 border-t border-[#1E4A96]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Tier: Brand, Services & Legal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-400/20">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-3.5 inline-block shadow-sm">
              <Logo size="md" showSubtext={true} variant="light" />
            </div>
            <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
              RovianX Solution is a technology and digital solutions company that helps businesses build, transform, and grow digitally. We provide end-to-end digital and technology services under one roof.
            </p>
            <div className="pt-2 text-xs font-mono font-bold tracking-widest text-blue-300">
              IDEAS • TECHNOLOGY • IMPACT
            </div>
          </div>

          {/* Col 2: Engineering & AI Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              Core Engineering
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              {CORE_SERVICES.slice(0, 6).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onSelectServiceTitle(srv.title)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Cloud, Growth & IT Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              Cloud & Strategy
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              {CORE_SERVICES.slice(6, 11).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => onSelectServiceTitle(srv.title)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal Compliance */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-300">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li>
                <a
                  href="/privacy-policy/"
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions/"
                  className={`transition-colors cursor-pointer text-left block ${
                    currentPath === '/terms-and-conditions/' || currentPath === '/terms-and-conditions'
                      ? 'text-white font-bold underline underline-offset-4 decoration-blue-300'
                      : 'hover:text-white'
                  }`}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/refund-cancellation-policy/"
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Refund & Cancellation Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy/"
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200">
          <div>
            &copy; {new Date().getFullYear()} RovianX Solution. All rights reserved. Build. Transform. Grow.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
