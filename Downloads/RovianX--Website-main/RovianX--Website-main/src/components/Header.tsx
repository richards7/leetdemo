import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenEstimator: () => void;
  onOpenLeadsManager: () => void;
  leadsCount: number;
  currentPath?: string;
  onNavigateHome?: (sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEstimator,
  onOpenLeadsManager,
  leadsCount,
  currentPath = '/',
  onNavigateHome
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalMenuOpen, setLegalMenuOpen] = useState(false);
  const legalMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (legalMenuRef.current && !legalMenuRef.current.contains(event.target as Node)) {
        setLegalMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLegalMenuOpen(false);
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId?: string) => {
    if (currentPath !== '/') {
      e.preventDefault();
      onNavigateHome?.(sectionId);
    }
  };

  const navLinks = [
    { label: 'About Us', href: '/about/' },
    { label: 'Services', href: '#services', sectionId: 'services' },
    { label: 'How We Work', href: '#engagement-models', sectionId: 'engagement-models' },
    { label: 'Process', href: '#process', sectionId: 'process' },
    { 
      label: 'Scope Estimator', 
      href: '#estimator', 
      isAction: true, 
      onClick: () => {
        if (currentPath !== '/') {
          onNavigateHome?.('estimator');
        } else {
          onOpenEstimator();
        }
      } 
    },
    { label: 'Blog', href: '/blog/' },
    { label: 'Student Hub', href: '/student-hub/' },
    { label: 'Contact', href: '#contact', sectionId: 'contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'Refund & Cancellation Policy', href: '/refund-cancellation-policy/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' },
  ];

  const isHome = currentPath === '/';

  return (
    <header className={`${isHome ? 'absolute left-0 right-0 top-0' : 'sticky top-0 border-b border-slate-200/80 bg-white/95'} z-40 px-3 pt-2 transition-all duration-200 sm:px-6 sm:pt-3`}>
      {/* Floating navigation shell */}
      <div className={`${isHome ? 'border-white bg-white shadow-[0_10px_28px_rgba(15,23,42,0.12)]' : 'border-slate-200 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.08)]'} mx-auto max-w-[1440px] rounded-2xl border backdrop-blur-xl`}>
        <div className="mx-auto flex min-h-[68px] items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a 
          href="#" 
          id="header-logo-link"
          onClick={(e) => {
            if (currentPath !== '/') {
              e.preventDefault();
              onNavigateHome?.();
            }
          }}
          className="flex min-w-0 items-center transition-opacity hover:opacity-95 focus:outline-none"
        >
          <Logo size="md" showSubtext={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            link.isAction ? (
              <button
                key={link.label}
                onClick={link.onClick}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-2 font-sans text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-[#0B367C] xl:px-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{link.label}</span>
              </button>
            ) : (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => link.href.startsWith('/') ? undefined : handleNavClick(e, link.sectionId)}
                className="rounded-lg px-2.5 py-2 font-sans text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-[#0B367C] xl:px-3"
              >
                {link.label}
              </a>
            )
          ))}
          <div ref={legalMenuRef} className="relative">
            <button
              type="button"
              aria-expanded={legalMenuOpen}
              aria-haspopup="menu"
              onClick={() => setLegalMenuOpen((open) => !open)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-2 font-sans text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-100/80 hover:text-[#0B367C] xl:px-3"
            >
              <span>Legal</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${legalMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              role="menu"
              aria-hidden={!legalMenuOpen}
              className={`absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-950/10 transition-all duration-200 ${legalMenuOpen ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible -translate-y-1 scale-95 opacity-0'}`}
            >
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  role="menuitem"
                  onClick={() => setLegalMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-left font-sans text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#0B367C]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Right side CTAs */}
        <div className="hidden items-center gap-2 border-l border-slate-300/80 pl-4 sm:flex lg:pl-5">
          {/* Primary Consultation Action Button */}
          <a
            id="header-start-project-btn"
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="flex items-center gap-1.5 rounded-xl bg-[#392EDB] px-4 py-2.5 font-sans text-sm font-semibold tracking-normal text-white shadow-sm transition-all hover:bg-[#2e24bf] hover:shadow"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-[1440px] rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-xl lg:hidden">
          <div className="flex flex-col gap-1 mb-5">
            {navLinks.map((link) => (
              link.isAction ? (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    link.onClick?.();
                  }}
                  className="px-3 py-2.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>{link.label}</span>
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (!link.href.startsWith('/')) handleNavClick(e, link.sectionId);
                  }}
                  className="px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 rounded-md"
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="rounded-md">
              <button
                type="button"
                aria-expanded={legalMenuOpen}
                onClick={() => setLegalMenuOpen((open) => !open)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                <span>Legal</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${legalMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden pl-3 transition-all duration-200 ${legalMenuOpen ? 'max-h-60 pt-1 opacity-100' : 'max-h-0 opacity-0'}`}>
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setLegalMenuOpen(false);
                      setMobileMenuOpen(false);
                    }}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0B367C]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, 'contact');
              }}
              className="w-full py-2.5 px-4 text-sm font-bold text-center text-white bg-[#0B367C] hover:bg-[#08295E] rounded-lg shadow-sm block"
            >
              Start a Project / Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
