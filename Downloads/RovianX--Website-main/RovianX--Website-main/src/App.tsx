import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ServiceModal } from './components/ServiceModal';
import { ScopeEstimator } from './components/ScopeEstimator';
import { EngagementModels } from './components/EngagementModels';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { LeadsManagerModal } from './components/LeadsManagerModal';
import { Footer } from './components/Footer';
import { TermsAndConditions } from './components/TermsAndConditions';
import { LegalPage } from './components/LegalPages';
import { AboutPage } from './components/AboutPage';
import { CORE_SERVICES } from './data/servicesData';
import { ServiceItem, ServiceCategory, ClientLead } from './types';
import { AdminBlogPage, BlogPage } from './components/BlogPages';
import { HomeAboutIntro } from './components/HomeAboutIntro';
import { NewBlogArticlePage } from './components/NewBlogArticlePage';
import { StudentHubLandingPage } from './components/StudentHubLandingPage';
import { StudentProjectSubmissionPage } from './components/StudentProjectSubmissionPage';

const INITIAL_SEEDED_LEADS: ClientLead[] = [
  {
    id: 'RX-2026-1048',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    fullName: 'David Sterling',
    email: 'd.sterling@vanguardtech.io',
    phone: '+1 (415) 890-2134',
    companyName: 'Vanguard Tech Partners',
    companyWebsite: 'vanguardtech.io',
    selectedServices: ['Software & App Development', 'Cloud & DevOps', 'AI & Machine Learning'],
    engagementModel: 'Project-Based Work',
    budgetRange: '₹1,50,000 - ₹5,00,000',
    timeline: '1 - 3 Months',
    projectDescription: 'We are looking to modernize our legacy portal into a scalable modern React/Node architecture with an integrated AI document search assistant. Please provide your estimated sprint delivery schedule.',
    status: 'new'
  },
  {
    id: 'RX-2026-9281',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(), // 1 day ago
    fullName: 'Sarah Lin',
    email: 'sarah@luminahealth.com',
    phone: '+1 (212) 745-9830',
    companyName: 'Lumina Health Systems',
    companyWebsite: 'luminahealth.com',
    selectedServices: ['Website Services', 'SEO & Online Growth', 'UI/UX & Design'],
    engagementModel: 'Monthly Services & Dedicated Pods',
    budgetRange: '₹50,000 - ₹1,50,000',
    timeline: 'Immediate (< 1 Month)',
    projectDescription: 'Looking for continuous monthly maintenance, Core Web Vitals optimization, and patient portal UX refinement under a predictable SLA retainer.',
    status: 'contacted'
  }
];

export default function App() {
  // Modal & Navigation States
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [isLeadsManagerOpen, setIsLeadsManagerOpen] = useState(false);

  // Dedicated Route State (/ or /terms-and-conditions)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p === '/blog' || p === '/blog/') return '/blog';
      if (p.startsWith('/blog/')) return p;
      if (p === '/admin/blog' || p === '/admin/blog/') return '/admin/blog';
      if (p === '/admin/blog/new' || p === '/admin/blog/new/') return '/admin/blog/new';
      if (p === '/student-hub/submit' || p === '/student-hub/submit/') return '/student-hub/submit/';
      if (p === '/student-hub' || p === '/student-hub/') return '/student-hub/';
      if (p === '/about' || p === '/about/') return '/about/';
      if (p === '/terms-and-conditions' || p === '/terms-and-conditions/' || window.location.hash === '#/terms-and-conditions') {
        return '/terms-and-conditions/';
      }
      if (p === '/privacy-policy' || p === '/privacy-policy/') return '/privacy-policy/';
      if (p === '/refund-cancellation-policy' || p === '/refund-cancellation-policy/') return '/refund-cancellation-policy/';
      if (p === '/cookie-policy' || p === '/cookie-policy/') return '/cookie-policy/';
    }
    return '/';
  });

  // Browser History & URL synchronization
  useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname;
      if (p === '/blog' || p === '/blog/') { setCurrentPath('/blog'); return; }
      if (p.startsWith('/blog/')) { setCurrentPath(p); return; }
      if (p === '/admin/blog' || p === '/admin/blog/') { setCurrentPath('/admin/blog'); return; }
      if (p === '/admin/blog/new' || p === '/admin/blog/new/') { setCurrentPath('/admin/blog/new'); return; }
      if (p === '/student-hub/submit' || p === '/student-hub/submit/') { setCurrentPath('/student-hub/submit/'); return; }
      if (p === '/student-hub' || p === '/student-hub/') { setCurrentPath('/student-hub/'); return; }
      if (p === '/about' || p === '/about/') {
        setCurrentPath('/about/');
      } else if (p === '/terms-and-conditions' || p === '/terms-and-conditions/' || window.location.hash === '#/terms-and-conditions') {
        setCurrentPath('/terms-and-conditions/');
      } else if (p === '/privacy-policy' || p === '/privacy-policy/') {
        setCurrentPath('/privacy-policy/');
      } else if (p === '/refund-cancellation-policy' || p === '/refund-cancellation-policy/') {
        setCurrentPath('/refund-cancellation-policy/');
      } else if (p === '/cookie-policy' || p === '/cookie-policy/') {
        setCurrentPath('/cookie-policy/');
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string, sectionId?: string) => {
    if (path === '/blog' || path === '/admin/blog' || path === '/admin/blog/new') {
      window.history.pushState({}, '', `${path}/`);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path === '/student-hub' || path === '/student-hub/submit') {
      const studentHubPath = path === '/student-hub/submit' ? '/student-hub/submit/' : '/student-hub/';
      try {
        window.history.pushState({}, '', studentHubPath);
      } catch {
        window.location.hash = `#${studentHubPath}`;
      }
      setCurrentPath(studentHubPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path === '/about') {
      const aboutPath = '/about/';
      try {
        window.history.pushState({}, '', aboutPath);
      } catch {
        window.location.hash = `#${aboutPath}`;
      }
      setCurrentPath(aboutPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (path === '/terms-and-conditions' || path === '/privacy-policy' || path === '/refund-cancellation-policy' || path === '/cookie-policy') {
      const legalPath = `${path}/`;
      try {
        window.history.pushState({}, '', legalPath);
      } catch {
        window.location.hash = `#${legalPath}`;
      }
      setCurrentPath(legalPath);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to home ('/')
    try {
      const targetUrl = sectionId ? `/#${sectionId}` : '/';
      window.history.pushState({}, '', targetUrl);
    } catch {
      window.location.hash = sectionId ? `#${sectionId}` : '';
    }
    setCurrentPath('/');

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Prefilled contact form states (populated only when user explicitly applies from Estimator or Service clicks)
  const [prefilledServices, setPrefilledServices] = useState<string[]>([]);
  const [prefilledModel, setPrefilledModel] = useState<string>('');
  const [prefilledBrief, setPrefilledBrief] = useState<string>('');

  // Leads persistence
  const [leads, setLeads] = useState<ClientLead[]>(() => {
    try {
      const stored = localStorage.getItem('rovianx_client_leads');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Safe fallback
    }
    return INITIAL_SEEDED_LEADS;
  });

  // Persist leads whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem('rovianx_client_leads', JSON.stringify(leads));
    } catch {
      // Safe fallback
    }
  }, [leads]);

  // Handlers
  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForModal(service);
  };

  const handleInquireService = (serviceTitle: string) => {
    setPrefilledServices([serviceTitle]);
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectModel = (modelTitle: string) => {
    setPrefilledModel(modelTitle);
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyScopeToContact = (scopeData: {
    services: string[];
    model: string;
    timeline: string;
    generatedBrief: string;
  }) => {
    setPrefilledServices(scopeData.services);
    setPrefilledModel(scopeData.model);
    setPrefilledBrief(scopeData.generatedBrief);
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLeadSubmitted = (newLead: ClientLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, newStatus: ClientLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  const handleSelectServiceTitle = (title: string) => {
    const found = CORE_SERVICES.find((s) => s.title.toLowerCase() === title.toLowerCase());
    if (found) {
      setSelectedServiceForModal(found);
    } else {
      handleInquireService(title);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Header with Navigation and Leads Trigger */}
      {!currentPath.startsWith('/admin/blog') && <Header
        currentPath={currentPath}
        onNavigateHome={(sectionId) => navigateTo('/', sectionId)}
        onOpenEstimator={() => {
          if (currentPath !== '/') {
            navigateTo('/', 'estimator');
          } else {
            const el = document.getElementById('estimator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenLeadsManager={() => setIsLeadsManagerOpen(true)}
        leadsCount={leads.length}
      />}

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPath === '/about/' || currentPath === '/about' ? (
          <AboutPage onNavigateHome={(sectionId) => navigateTo('/', sectionId)} />
        ) : currentPath === '/terms-and-conditions/' || currentPath === '/terms-and-conditions' ? (
          <TermsAndConditions
            onBackToHome={() => navigateTo('/')}
            onNavigateToContact={() => navigateTo('/', 'contact')}
          />
        ) : currentPath === '/privacy-policy/' ? (
          <LegalPage type="privacy" onBackToHome={() => navigateTo('/')} />
        ) : currentPath === '/refund-cancellation-policy/' ? (
          <LegalPage type="refund" onBackToHome={() => navigateTo('/')} />
        ) : currentPath === '/cookie-policy/' ? (
          <LegalPage type="cookie" onBackToHome={() => navigateTo('/')} />
        ) : currentPath === '/admin/blog' ? (
          <AdminBlogPage onHome={() => navigateTo('/')} onNew={() => navigateTo('/admin/blog/new')} />
        ) : currentPath === '/admin/blog/new' ? (
          <div className="blog-admin-reference"><NewBlogArticlePage onBack={() => navigateTo('/admin/blog')} /></div>
        ) : currentPath === '/student-hub/submit/' ? (
          <StudentProjectSubmissionPage onBackToHub={() => navigateTo('/student-hub')} />
        ) : currentPath === '/student-hub/' || currentPath === '/student-hub' ? (
          <StudentHubLandingPage onSubmitIdea={() => navigateTo('/student-hub/submit')} />
        ) : currentPath === '/blog' ? (
          <BlogPage onHome={() => navigateTo('/')} />
        ) : currentPath.startsWith('/blog/category/') ? (
          <BlogPage categorySlug={currentPath.replace(/^\/blog\/category\//, '').replace(/\/$/, '')} onHome={() => navigateTo('/blog')} />
        ) : currentPath.startsWith('/blog/') ? (
          <BlogPage slug={currentPath.replace(/^\/blog\//, '').replace(/\/$/, '')} onHome={() => navigateTo('/blog')} />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onExploreServices={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectCategory={(category) => {
                setActiveCategory(category);
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <HomeAboutIntro onDiscover={() => navigateTo('/about')} />

            {/* 11 Core Services Catalog with Deep-Dive capability */}
            <ServicesSection
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onSelectService={handleSelectService}
              onInquireService={handleInquireService}
            />

            {/* Interactive Solution Configurator & Scope Estimator */}
            <ScopeEstimator onApplyScopeToContact={handleApplyScopeToContact} />

            {/* How We Work With You: 3 Engagement Models */}
            <EngagementModels onSelectModel={handleSelectModel} />

            {/* Delivery Process & Philosophy: Ideas • Technology • Impact */}
            <ProcessSection />

            {/* Client Consultation Intake & Communication Hub */}
            <ContactSection
              onLeadSubmitted={handleLeadSubmitted}
              onOpenLeadsManager={() => setIsLeadsManagerOpen(true)}
              prefilledServices={prefilledServices}
              prefilledModel={prefilledModel}
              prefilledBrief={prefilledBrief}
            />
          </>
        )}
      </main>

      {/* Corporate Footer with Legal Navigation */}
      {!currentPath.startsWith('/admin/blog') && <Footer
        currentPath={currentPath}
        onOpenLeadsManager={() => setIsLeadsManagerOpen(true)}
        onSelectServiceTitle={handleSelectServiceTitle}
      />}

      {/* Detailed Service Deep-Dive Dialog Modal */}
      {selectedServiceForModal && (
        <ServiceModal
          service={selectedServiceForModal}
          onClose={() => setSelectedServiceForModal(null)}
          onInquireService={handleInquireService}
        />
      )}

      {/* Client Leads & Inquiries Manager Modal for Business Owner */}
      <LeadsManagerModal
        leads={leads}
        isOpen={isLeadsManagerOpen}
        onClose={() => setIsLeadsManagerOpen(false)}
        onUpdateStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
      />

    </div>
  );
}
