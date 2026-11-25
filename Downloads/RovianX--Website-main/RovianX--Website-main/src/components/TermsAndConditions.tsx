import React, { useEffect } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  Building2,
  Calendar
} from 'lucide-react';

interface TermsAndConditionsProps {
  onBackToHome: () => void;
  onNavigateToContact: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  onBackToHome,
  onNavigateToContact
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms & Conditions | ROVIANX Solutions';
    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (description) description.content = 'Terms governing use of the RovianX website and its digital technology services.';
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.rovianx.in/terms-and-conditions/';
  }, []);

  const sections = [
    {
      num: 1,
      id: 'about-rovianx',
      title: 'About RovianX',
      content: (
        <div className="space-y-3">
          <p>
            RovianX is a professional digital technology and software solutions enterprise operating as a registered <strong>Proprietorship</strong> in <strong>India</strong>. We partner with startups, growing enterprises, and established businesses to conceptualize, design, engineer, and deploy high-impact digital solutions.
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs sm:text-sm text-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="font-mono font-bold uppercase text-slate-500 block text-[11px]">Business Name</span>
              <span className="font-semibold text-slate-900">RovianX</span>
            </div>
            <div>
              <span className="font-mono font-bold uppercase text-slate-500 block text-[11px]">Business Structure</span>
              <span className="font-semibold text-slate-900">Proprietorship</span>
            </div>
            <div>
              <span className="font-mono font-bold uppercase text-slate-500 block text-[11px]">Country of Registration</span>
              <span className="font-semibold text-slate-900">India</span>
            </div>
            <div>
              <span className="font-mono font-bold uppercase text-slate-500 block text-[11px]">Official Website</span>
              <a href="https://www.rovianx.in" className="text-[#0B367C] font-semibold hover:underline">www.rovianx.in</a>
            </div>
            <div className="sm:col-span-2">
              <span className="font-mono font-bold uppercase text-slate-500 block text-[11px]">Registered Address</span>
              <span className="font-medium text-slate-800">18, New Street, T.R. Pattinam, Karaikal, Puducherry, India</span>
            </div>
          </div>
          <p>
            By accessing or using our website, submitting an inquiry, or commissioning technology services with RovianX, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions.
          </p>
        </div>
      )
    },
    {
      num: 2,
      id: 'our-services',
      title: 'Our Services',
      content: (
        <div className="space-y-3">
          <p>
            RovianX delivers full-spectrum digital technology and engineering solutions. Our capabilities include, but are not limited to, the following core domains:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
            {[
              'Website Development',
              'Software & App Development',
              'AI & Machine Learning',
              'UI/UX Design',
              'Cloud & DevOps',
              'Digital Marketing',
              'SEO',
              'Business Solutions',
              'IT & Technical Support',
              'Data & Database Solutions',
              'Content Services'
            ].map((serviceName) => (
              <div key={serviceName} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0B367C] shrink-0" />
                <span>{serviceName}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-600 text-xs sm:text-sm pt-1">
            Services are executed according to individual Statements of Work (SOW), commercial proposals, or service agreements mutually agreed between RovianX and the client.
          </p>
        </div>
      )
    },
    {
      num: 3,
      id: 'project-scope',
      title: 'Project Scope',
      content: (
        <p>
          Each commercial engagement is strictly defined by an agreed project proposal, specification document, or Statement of Work. Any request for new features, modifications, design alterations, or deliverables not expressly specified within the agreed documentation shall be deemed out of scope. Out-of-scope requests require a formal written change request and may result in adjusted timelines and supplementary engineering fees.
        </p>
      )
    },
    {
      num: 4,
      id: 'project-estimates',
      title: 'Project Estimates',
      content: (
        <p>
          Estimates provided via our interactive Scope Estimator, preliminary discussions, or exploratory calls are good-faith approximations designed for budget planning and initial scoping. They do not constitute a binding financial or temporal contract. Binding commitments are established solely through a mutually signed or written project agreement following technical discovery.
        </p>
      )
    },
    {
      num: 5,
      id: 'client-responsibilities',
      title: 'Client Responsibilities',
      content: (
        <p>
          To maintain planned delivery cadences, clients agree to provide timely cooperation, including necessary brand assets, API credentials, domain/hosting authorizations, third-party access tokens, clear functional requirements, and milestone review approvals. The client shall designate an authorized point of contact with decision-making authority for the duration of the engagement.
        </p>
      )
    },
    {
      num: 6,
      id: 'client-caused-delays',
      title: 'Client-Caused Delays',
      content: (
        <p>
          Project delivery schedules are directly contingent upon prompt client responsiveness. Delays in furnishing required feedback, review approvals, source materials, or technical credentials will automatically extend project milestones and scheduled launch dates proportionally. RovianX shall not be held liable for missed target deadlines arising from client-induced delays.
        </p>
      )
    },
    {
      num: 7,
      id: 'payments',
      title: 'Payments',
      content: (
        <div className="space-y-2">
          <p>
            Project advance payments are calibrated based on the specific scope, technical requirements, and nature of the individual project. An agreed advance retainer is required prior to project kickoff.
          </p>
          <p>
            The remaining balance is due upon project completion and deliverable presentation, unless a milestone-based installment schedule has been expressly executed in writing.
          </p>
          <p>
            Payments are accepted exclusively through recognized, secure digital transaction methods, including verified bank wire transfers, UPI, NEFT/RTGS, or authorized digital payment gateways. All invoices are payable within the net timeframe specified on the commercial invoice.
          </p>
        </div>
      )
    },
    {
      num: 8,
      id: 'cancellation',
      title: 'Cancellation of a Project',
      content: (
        <p>
          Either party may initiate project cancellation through written notice in accordance with the project contract. In the event that a client cancels a project after commencement of work, the client shall remain fully responsible and liable for payment corresponding to all work completed, development hours expended, third-party costs incurred, and scheduled engineering allocation up to the effective cancellation date.
        </p>
      )
    },
    {
      num: 9,
      id: 'refunds',
      title: 'Refunds',
      content: (
        <p>
          Refunds may be evaluated and provided depending on the specific project stage, deliverables completed, and applicable circumstances assessed on a case-by-case basis. Advance payments allocated toward executed discovery, technical architecture, wireframing, or logged development sprints are non-refundable once work has been performed and delivered.
        </p>
      )
    },
    {
      num: 10,
      id: 'revisions',
      title: 'Revisions',
      content: (
        <p>
          Revisions are provided strictly according to the agreed project scope and milestone specifications. Standard project deliverables include a designated number of iterative revision rounds during design and staging phases. Revisions exceeding the agreed scope or requiring fundamental structural redesigns will be quoted and billed at standard change order rates.
        </p>
      )
    },
    {
      num: 11,
      id: 'intellectual-property',
      title: 'Intellectual Property',
      content: (
        <p>
          Upon receipt of full and final payment for all outstanding project invoices, complete ownership of the customized project deliverables, source code, visual designs, and brand assets created specifically for the client shall transfer to the client. RovianX retains ownership of its pre-existing proprietary frameworks, software utilities, boilerplate libraries, and general technical know-how developed independently of the client engagement.
        </p>
      )
    },
    {
      num: 12,
      id: 'client-materials',
      title: 'Client Materials',
      content: (
        <p>
          The client represents and warrants that all text, logos, trademarks, media, documentation, and data provided to RovianX are owned by the client or that the client holds all necessary licenses and permissions to use them. The client agrees to indemnify and hold RovianX harmless from any third-party claims or intellectual property liabilities arising from materials supplied by the client.
        </p>
      )
    },
    {
      num: 13,
      id: 'third-party-services',
      title: 'Third-Party Services',
      content: (
        <p>
          Modern digital solutions frequently integrate third-party services, APIs, hosting environments (e.g., AWS, GCP, Vercel), payment gateways, or plugins. RovianX is not liable for performance interruptions, pricing updates, rate limits, API deprecations, or policy modifications imposed by external third-party providers. All recurring subscription fees for third-party tools remain the sole responsibility of the client.
        </p>
      )
    },
    {
      num: 14,
      id: 'availability',
      title: 'Website and Service Availability',
      content: (
        <p>
          While RovianX endeavors to maintain the continuous availability and security of its public website and staging environments, access is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We reserve the right to modify, suspend, or update our website or staging servers at any time for scheduled maintenance, security upgrades, or technical enhancements without prior liability.
        </p>
      )
    },
    {
      num: 15,
      id: 'security',
      title: 'Security',
      content: (
        <p>
          RovianX implements recognized enterprise security standards, data sanitization protocols, and secure coding practices across all custom software. While we enforce stringent safeguards, clients acknowledge that no digital system or internet transmission is completely impervious to zero-day vulnerabilities. Clients are encouraged to adopt robust administrative passwords and conduct periodic internal security audits.
        </p>
      )
    },
    {
      num: 16,
      id: 'confidentiality',
      title: 'Confidentiality',
      content: (
        <p>
          Both RovianX and the client agree to protect and treat as confidential all non-public technical, commercial, strategic, and proprietary information disclosed during the collaboration. Neither party shall disclose such proprietary information to unauthorized third parties without prior written consent, except where disclosure is mandated by applicable law or judicial decree.
        </p>
      )
    },
    {
      num: 17,
      id: 'portfolio-and-marketing',
      title: 'Portfolio and Marketing',
      content: (
        <p>
          RovianX takes pride in the engineering rigor of our work. RovianX may showcase completed projects, case studies, client logos, and non-confidential deliverables within our professional portfolio, case studies, and marketing materials solely with prior client approval or as mutually agreed in writing.
        </p>
      )
    },
    {
      num: 18,
      id: 'prohibited-use',
      title: 'Prohibited Use',
      content: (
        <p>
          You agree not to use the RovianX website, communication portals, or commissioned solutions for any unlawful, harassing, infringing, or malicious activities. Prohibited behavior includes attempting to breach server security, distribute unsolicited spam or malware, reverse-engineer proprietary components, or transmit material that violates Indian or international regulations.
        </p>
      )
    },
    {
      num: 19,
      id: 'limitation-of-liability',
      title: 'Limitation of Liability',
      content: (
        <p>
          To the maximum extent permitted by applicable law, RovianX, its proprietor, contractors, and affiliates shall not be liable for any indirect, consequential, punitive, incidental, or special damages, including lost revenue, lost profits, business interruption, or loss of data arising from the use of or inability to use our services. Our aggregate liability for any proven direct claim shall not exceed the total fees paid by the client to RovianX under the specific contract giving rise to the dispute.
        </p>
      )
    },
    {
      num: 20,
      id: 'force-majeure',
      title: 'Force Majeure',
      content: (
        <p>
          Neither party shall be held in breach of contractual obligations if execution is prevented or delayed by events beyond reasonable human control, including acts of God, extreme weather, warfare, public utility outages, telecommunications failures, strikes, government restrictions, pandemics, or widespread cyber warfare.
        </p>
      )
    },
    {
      num: 21,
      id: 'termination',
      title: 'Termination',
      content: (
        <p>
          RovianX reserves the right to suspend or terminate service delivery, client accounts, or project access immediately upon written notice if the client commits a material breach of these Terms, engages in unlawful conduct, or defaults on agreed payment schedules. Termination shall not waive any outstanding financial liabilities accrued prior to the termination date.
        </p>
      )
    },
    {
      num: 22,
      id: 'changes-to-terms',
      title: 'Changes to Services and Terms',
      content: (
        <p>
          RovianX reserves the right to update, modify, or revise these Terms & Conditions at our discretion to reflect legislative updates, technological advancements, or revised operational models. When revisions occur, the updated document will be published on this page with an updated &quot;Last Updated&quot; date. Continued engagement with our website or services signifies acceptance of the amended Terms.
        </p>
      )
    },
    {
      num: 23,
      id: 'privacy',
      title: 'Privacy',
      content: (
        <p>
          Your privacy is paramount to us. Information collected through our consultation forms, Scope Estimator, and inquiries is processed in accordance with the RovianX Privacy Policy and applicable data protection regulations. We do not sell or lease client contact information to external marketing brokers.
        </p>
      )
    },
    {
      num: 24,
      id: 'governing-law',
      title: 'Governing Law',
      content: (
        <p>
          These Terms & Conditions and any commercial agreements entered into with RovianX shall be governed by, interpreted, and construed in accordance with the applicable laws of <strong>India</strong>. Any disputes, controversies, or legal claims arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in <strong>Karaikal / Puducherry, India</strong>, unless an alternate dispute resolution or arbitration framework is expressly stipulated in the signed client agreement.
        </p>
      )
    },
    {
      num: 25,
      id: 'severability',
      title: 'Severability',
      content: (
        <p>
          Should any provision of these Terms be adjudicated invalid, unlawful, or unenforceable by a court of competent jurisdiction, such provision shall be enforced to the maximum extent permissible, and the remaining provisions of these Terms shall continue in full force and legal effect.
        </p>
      )
    },
    {
      num: 26,
      id: 'entire-agreement',
      title: 'Entire Agreement',
      content: (
        <p>
          These Terms & Conditions, together with any formally executed Statements of Work, commercial proposals, or confidentiality agreements, constitute the entire agreement between the client and RovianX concerning the subject matter herein, superseding all prior oral or written representations, negotiations, or understandings.
        </p>
      )
    },
    {
      num: 27,
      id: 'contact-us',
      title: 'Contact Us',
      content: (
        <div className="space-y-4">
          <p>
            If you have any questions, inquiries, or clarifications regarding these Terms & Conditions, please contact us directly:
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 text-sm space-y-3">
            <div className="font-bold text-slate-900 text-base">
              RovianX (Proprietorship)
            </div>
            <div className="flex items-start gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-[#0B367C] shrink-0 mt-0.5" />
              <span>18, New Street, T.R. Pattinam, Karaikal, Puducherry, India</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Mail className="w-4 h-4 text-[#0B367C] shrink-0" />
              <a href="mailto:rovianxsolution@gmail.com" className="text-[#0B367C] font-semibold hover:underline">
                rovianxsolution@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-[#0B367C] shrink-0" />
              <a href="tel:+917010539310" className="text-slate-800 hover:text-[#0B367C] font-medium">
                +91 7010539310
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Globe className="w-4 h-4 text-[#0B367C] shrink-0" />
              <a href="https://www.rovianx.in" className="text-[#0B367C] font-semibold hover:underline">
                www.rovianx.in
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900 py-10 sm:py-14 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Top Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#08295E] hover:underline cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>← Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="border-b border-slate-200 pb-8 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0B367C] font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>LEGAL & COMPLIANCE</span>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mb-3">
            TERMS & CONDITIONS
          </h1>

          <p className="font-sans text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-4">
            These terms govern your use of the RovianX website and our digital technology services.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-600" />
            <span>Last Updated: 11 September 2026</span>
          </div>
        </div>

        {/* Table of Contents Quick Navigation */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-5 mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0B367C] mb-3 flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Table of Contents</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="hover:text-[#0B367C] hover:underline truncate block"
              >
                <span className="font-mono text-slate-400 mr-1">{sec.num}.</span>
                {sec.title}
              </a>
            ))}
          </div>
        </div>

        {/* 27 Clearly Separated Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 border-b border-slate-100 pb-8 last:border-b-0"
            >
              <h2 className="font-sans font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight mb-3 flex items-baseline gap-2">
                <span className="font-mono text-sm text-[#0B367C] font-bold">
                  {section.num}.
                </span>
                <span>{section.title}</span>
              </h2>
              
              <div className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom Callout & Navigation */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="bg-gradient-to-r from-blue-50/70 to-slate-50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-sans font-extrabold text-xl text-slate-900">
                Have questions about these Terms?
              </h3>
              <p className="font-sans text-sm text-slate-600">
                Our team is here to assist with any contractual or technical scoping inquiries.
              </p>
            </div>

            <button
              type="button"
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-[#0B367C] hover:bg-[#08295E] text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Contact RovianX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 text-center sm:text-left">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B367C] hover:text-[#08295E] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Home</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
