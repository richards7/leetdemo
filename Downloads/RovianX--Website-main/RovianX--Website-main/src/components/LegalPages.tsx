import React, { useEffect } from 'react';
import { ArrowLeft, Cookie, FileCheck2, ShieldCheck } from 'lucide-react';

export type LegalPageType = 'privacy' | 'refund' | 'cookie';

interface LegalPageProps {
  type: LegalPageType;
  onBackToHome: () => void;
}

const pageDetails: Record<LegalPageType, { title: string; description: string; icon: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How RovianX collects, uses, and protects information provided through its website and consultation services.',
    icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    description: 'The RovianX terms for project advances, cancellation, completed work, and refund evaluation.',
    icon: <FileCheck2 className="h-5 w-5 text-blue-600" />,
  },
  cookie: {
    title: 'Cookie Policy',
    description: 'How RovianX uses essential browser storage and limited performance technologies across its website.',
    icon: <Cookie className="h-5 w-5 text-blue-600" />,
  },
};

const pageTitles: Record<LegalPageType, string> = {
  privacy: 'Privacy Policy | ROVIANX Solutions',
  refund: 'Refund & Cancellation Policy | ROVIANX Solutions',
  cookie: 'Cookie Policy | ROVIANX Solutions',
};

function setCanonical(path: string): void {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `https://www.rovianx.in${path}`;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBackToHome }) => {
  const details = pageDetails[type];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[type];
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (description) description.content = details.description;
    setCanonical(`/${type === 'refund' ? 'refund-cancellation-policy' : `${type}-policy`}/`);
  }, [details.description, type]);

  return (
    <article className="min-h-screen bg-white py-10 text-slate-900 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#08295E] hover:underline"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Home
        </button>

        <header className="mb-10 border-b border-slate-200 pb-8">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#0B367C]">
            {details.icon}
            <span>Legal & Compliance</span>
          </div>
          <h1 className="mb-3 font-sans text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {details.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {details.description}
          </p>
        </header>

        {type === 'privacy' && <PrivacyContent />}
        {type === 'refund' && <RefundContent />}
        {type === 'cookie' && <CookieContent />}

        <div className="mt-14 border-t border-slate-200 pt-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B367C] hover:text-[#08295E] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    </article>
  );
};

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-slate-50 p-5 sm:p-6">
      <h2 className="mb-2 font-sans text-lg font-extrabold tracking-tight text-slate-900">{title}</h2>
      <div className="text-sm leading-relaxed text-slate-700 sm:text-base">{children}</div>
    </section>
  );
}

function PrivacyContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
        This Privacy Policy outlines how RovianX (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating as a proprietorship in India, collects, uses, and safeguards personal information gathered through our website (<strong className="text-[#0B367C]">www.rovianx.in</strong>) and consultation services.
      </p>
      <PolicySection title="Information We Collect">
        We collect information you voluntarily provide through our project consultation forms, Scope Estimator, and contact channels—including your name, business email, phone/WhatsApp number, company details, and project requirements.
      </PolicySection>
      <PolicySection title="How We Use Your Information">
        Your information is strictly utilized to prepare project estimates, communicate deliverables, deliver commissioned engineering services, and provide customer support. We do not sell or monetize personal client data to third-party advertisers.
      </PolicySection>
      <PolicySection title="Data Protection & Security">
        We apply industry-standard administrative and technical security measures to maintain the confidentiality and integrity of your inquiries and project documentation.
      </PolicySection>
    </div>
  );
}

function RefundContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
        At RovianX, we pride ourselves on professional execution and transparent commercial terms.
      </p>
      <PolicySection title="Project Advance Payments">
        Project advances are determined based on individual scope and sprint requirements. Advances cover upfront resource allocation, design prototyping, and architecture setup.
      </PolicySection>
      <PolicySection title="Project Cancellation">
        If a client requests project cancellation after work has commenced, the client remains responsible and liable for payment for all work completed, development hours logged, and committed resources up to the cancellation date.
      </PolicySection>
      <PolicySection title="Refund Eligibility">
        Refunds may be evaluated and provided depending on the specific project stage and verifiable circumstances. Completed discovery phases and delivered milestone sprints are non-refundable once approved.
      </PolicySection>
    </div>
  );
}

function CookieContent() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
        RovianX utilizes essential client-side storage technologies (such as session storage and essential cookies) solely to support fundamental website functionality, remember interface preferences, and optimize user experience.
      </p>
      <PolicySection title="Essential Storage">
        Required for core interactive features such as Scope Estimator selections, contact form continuity, and navigation states across the site.
      </PolicySection>
      <PolicySection title="Analytics & Performance">
        Aggregated, non-personally identifiable diagnostic metrics to assess website speed, responsive layout performance, and user interface responsiveness.
      </PolicySection>
      <p className="text-sm leading-relaxed text-slate-600">
        You can configure your browser settings to restrict or delete cookies at any time without impacting basic browsing on our website.
      </p>
    </div>
  );
}
