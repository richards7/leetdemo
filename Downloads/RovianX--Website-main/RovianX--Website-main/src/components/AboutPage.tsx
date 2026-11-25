import React, { useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  Globe2,
  Layers3,
  MessageCircle,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { COMPANY_PILLARS, CORE_SERVICES, WORK_PROCESS_STEPS } from '../data/servicesData';

interface AboutPageProps {
  onNavigateHome: (sectionId?: string) => void;
}

const ABOUT_DESCRIPTION =
  'Learn how ROVIANX Solutions helps startups, growing businesses, and established organizations turn digital requirements into practical technology solutions.';

const faqItems = [
  {
    question: 'What services does ROVIANX Solutions provide?',
    answer:
      'ROVIANX provides website services, software and app development, UI/UX and design, cloud and DevOps, AI and machine learning, data and database solutions, digital marketing, SEO and online growth, business solutions, IT and technical support, and content services.',
  },
  {
    question: 'How does ROVIANX approach a new project?',
    answer:
      'A new project starts with discovery and strategic scoping. ROVIANX works to understand business goals, users, requirements, and success measures before moving through design, engineering, quality assurance, launch, and ongoing improvement.',
  },
  {
    question: 'Can ROVIANX build custom websites and applications?',
    answer:
      'Yes. The service offering includes business websites, e-commerce experiences, landing pages, custom web applications, mobile applications, internal workflow tools, APIs, and software modernization.',
  },
  {
    question: 'Does ROVIANX provide AI solutions?',
    answer:
      'Yes. AI and machine learning services include knowledge-base assistants, document intelligence, virtual assistants, recommendation and classification systems, and AI-enabled workflow automation.',
  },
  {
    question: 'How do I start a project with ROVIANX?',
    answer:
      'Use the project consultation form on the Contact section to share your requirements. ROVIANX can then review the brief and discuss the appropriate scope, delivery approach, and engagement model.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'There is no single timeline for every project. Delivery depends on the scope, technical requirements, feedback cadence, and selected engagement model. A clearer estimate is prepared after the initial requirements and scope discussion.',
  },
  {
    question: 'Can ROVIANX work with startups and growing businesses?',
    answer:
      'Yes. The documented engagement models include project-based work for defined initiatives, monthly services for ongoing needs, and custom enterprise solutions for more complex modernization and architecture work.',
  },
];

function SectionIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#2563EB]">{eyebrow}</p>
      <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{children}</p>
    </div>
  );
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About ROVIANX Solutions | Digital & Technology Solutions';

    const description = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (description) description.content = ABOUT_DESCRIPTION;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.rovianx.in/about/';

    const structuredData = document.createElement('script');
    structuredData.id = 'about-page-faq-schema';
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(structuredData);

    return () => {
      structuredData.remove();
    };
  }, []);

  return (
    <article className="bg-[#F8FAFC] text-slate-900">
      <section className="relative overflow-hidden bg-[#020B19] py-24 text-white sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(37,99,235,0.28),transparent_38%),linear-gradient(115deg,#020B19_20%,#0B367C_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div className="max-w-3xl">
            <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.3em] text-blue-200">About ROVIANX</p>
            <h1 className="max-w-2xl font-sans text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-6xl">
              About ROVIANX Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
              ROVIANX Solutions is an India-registered digital and technology solutions provider. We help businesses turn ideas, operational requirements, and modernization goals into useful digital experiences and practical technology systems.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigateHome('contact')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3.5 text-sm font-semibold text-[#08295E] transition-colors hover:bg-blue-50"
              >
                Discuss a Project
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="/#services"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-7">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#06172D]/80 p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">ROVIANX / SYSTEM</p>
                  <p className="mt-2 text-sm font-semibold text-white">Ideas into useful technology</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                  <Network className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {COMPANY_PILLARS.map((pillar, index) => (
                  <div key={pillar.title} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                    <span className="font-mono text-[10px] font-bold text-blue-300">0{index + 1}</span>
                    <span className="text-sm font-semibold text-slate-100">{pillar.title}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-300" />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
                <div>
                  <p className="font-mono text-2xl font-bold text-white">{CORE_SERVICES.length}</p>
                  <p className="mt-1 text-xs text-slate-400">service capabilities</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-white">{WORK_PROCESS_STEPS.length}</p>
                  <p className="mt-1 text-xs text-slate-400">delivery stages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionIntro eyebrow="Who We Are" title="Technology shaped around real business needs">
              ROVIANX is an end-to-end digital and technology solutions provider focused on practical business outcomes. The work spans strategy, design, engineering, infrastructure, growth, and ongoing technical support, with each engagement defined around the client&apos;s requirements.
            </SectionIntro>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">
              The aim is straightforward: make technology more useful to the people and organizations relying on it. That can mean creating a new digital presence, replacing manual workflows, building a custom application, introducing AI, or improving the reliability of an existing system.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {COMPANY_PILLARS.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Sparkles className="mb-4 h-5 w-5 text-[#2563EB]" />
                <h3 className="font-sans text-lg font-bold text-slate-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro eyebrow="What We Do" title="From requirements to working digital solutions">
            ROVIANX helps translate business ideas and operational requirements into clear roadmaps, human-centered experiences, resilient software, and connected digital workflows. The engagement can begin with a defined deliverable or a broader transformation challenge.
          </SectionIntro>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Clarify the need', text: 'Understand goals, users, constraints, and the problem worth solving.', icon: Compass },
              { title: 'Shape the solution', text: 'Turn requirements into an actionable scope, architecture, and experience.', icon: Layers3 },
              { title: 'Build with care', text: 'Develop, integrate, test, and document the resulting digital system.', icon: Code2 },
              { title: 'Keep improving', text: 'Support launch, performance, infrastructure, and future iterations.', icon: Rocket },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="mb-6 h-6 w-6 text-[#0B367C]" />
                <h3 className="font-sans text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-services" className="border-y border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro eyebrow="Our Services" title="Capabilities that cover the digital lifecycle">
            The following services are the 11 capabilities currently defined in the ROVIANX service catalog. They can be selected individually or combined into a broader delivery plan.
          </SectionIntro>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <article key={service.id} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-blue-300 hover:bg-blue-50/30">
                <h3 className="font-sans text-lg font-bold text-slate-900">{service.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#0B367C]">{service.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.shortDescription}</p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Business value</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{service.businessImpact}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/#services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#2563EB] hover:underline">
              View the service catalog
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionIntro eyebrow="Who We Help" title="A practical partner for different stages of growth">
              ROVIANX works with startups launching an MVP, small and growing businesses improving their digital operations, and established organizations modernizing legacy workflows or building more capable systems.
            </SectionIntro>
            <div className="space-y-3">
              {[
                'Startups turning a validated idea into a website, application, or MVP.',
                'Growing businesses that need dependable technology and ongoing digital support.',
                'Established organizations modernizing legacy operations and distributed systems.',
                'Teams that need a defined digital deliverable without building a full internal function.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#0B367C] p-7 text-white sm:p-9">
            <Network className="mb-6 h-7 w-7 text-blue-200" />
            <h3 className="font-sans text-2xl font-bold">Problems we solve</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-blue-100">
              <li>Outdated websites and digital experiences that make it harder to earn trust or generate inquiries.</li>
              <li>Manual workflows that slow teams down and create avoidable operational friction.</li>
              <li>New product or software ideas that need a clear scope and a dependable path to launch.</li>
              <li>AI, data, or infrastructure requirements that need to connect to real business processes.</li>
              <li>Growing systems that need better design, performance, security, or ongoing technical care.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about-process" className="border-y border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro eyebrow="How We Work" title="A clear path from discovery to continuous improvement">
            The delivery process is organized into four documented stages. The exact scope and level of support can vary by project, but the intent is to keep decisions, progress, and handover understandable throughout.
          </SectionIntro>
          <div className="grid gap-4 lg:grid-cols-4">
            {WORK_PROCESS_STEPS.map((step, index) => (
              <div key={step.step} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span className="font-mono text-sm font-bold text-[#2563EB]">{step.step}</span>
                <h3 className="mt-4 font-sans text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{step.summary}</p>
                <p className="mt-5 border-t border-slate-200 pt-4 text-xs font-semibold uppercase tracking-wide text-[#0B367C]">{step.deliverable}</p>
                {index < WORK_PROCESS_STEPS.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 rounded-full bg-white text-[#2563EB] lg:block" />}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="/#process" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#2563EB] hover:underline">
              See the detailed process
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <SectionIntro eyebrow="Our Expertise" title="Disciplines that work together">
            ROVIANX combines product thinking, design, engineering, infrastructure, data, and growth capabilities so a digital initiative can be considered as a connected system rather than a collection of disconnected tasks.
          </SectionIntro>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Web and application engineering', text: 'Responsive websites, custom software, mobile applications, APIs, and workflow tools.', icon: Code2 },
              { title: 'UI/UX and brand design', text: 'User flows, prototypes, design systems, interfaces, and brand identity assets.', icon: Layers3 },
              { title: 'AI and data systems', text: 'Knowledge assistants, document intelligence, automation, databases, migrations, and analytics.', icon: Database },
              { title: 'Cloud and DevOps', text: 'Cloud architecture, deployment pipelines, containers, monitoring, and technical maintenance.', icon: Network },
              { title: 'Digital growth', text: 'Digital marketing, SEO, content, conversion-focused experiences, and audience growth support.', icon: Sparkles },
              { title: 'Business technology', text: 'Digital transformation roadmaps, integrations, support workflows, and online operations.', icon: ShieldCheck },
            ].map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="mt-1 h-6 w-6 shrink-0 text-[#0B367C]" />
                <div>
                  <h3 className="font-sans text-lg font-bold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionIntro eyebrow="Why ROVIANX" title="Technology should make the next decision easier">
              Businesses consider ROVIANX when they need a partner who can understand the requirement, connect the right disciplines, and keep delivery tied to a useful outcome.
            </SectionIntro>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Requirement-led planning',
                'Customized solutions',
                'User-focused design',
                'Scalable engineering',
                'Transparent communication',
                'End-to-end support',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-9">
            <Users className="mb-5 h-7 w-7 text-[#0B367C]" />
            <h3 className="font-sans text-2xl font-bold text-slate-900">Our Team</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              ROVIANX brings together the skills a project needs across strategy, design, engineering, AI, cloud, data, growth, content, and technical support. The public business information does not list individual team members, so this page does not invent names, titles, qualifications, or photographs.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Instead, each engagement is shaped around the capabilities and level of involvement required for the work being discussed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro eyebrow="Projects / Results" title="Work is scoped around the problem in front of you">
              The current public site does not publish a verified project portfolio, named case studies, or performance metrics. We do not add invented examples or results here.
            </SectionIntro>
            <a href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#2563EB] hover:underline">
              Discuss a relevant project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Business websites and e-commerce experiences',
              'Custom software and mobile applications',
              'AI assistants and workflow automation',
              'Cloud, DevOps, data, and database foundations',
              'Digital growth, SEO, and content systems',
              'Ongoing technical support and modernization',
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold leading-relaxed text-slate-700">{item}</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">A potential project format, not a published case-study claim.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionIntro eyebrow="Areas We Serve" title="Chennai-based digital and technology delivery">
              ROVIANX serves businesses from Chennai, Tamil Nadu, bringing together digital strategy, design, engineering, infrastructure, and growth capabilities for practical technology delivery.
            </SectionIntro>
            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-relaxed text-[#0B367C] shadow-sm">
              <Globe2 className="mt-0.5 h-5 w-5 shrink-0" />
              <span>Projects are discussed according to the client&apos;s requirements, scope, and the capabilities needed for delivery.</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-[#020B19] p-7 text-white shadow-2xl shadow-slate-900/10 sm:p-10">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(147,197,253,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.16)_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-blue-200">SERVICE FOOTPRINT</span>
                <span className="rounded-full border border-blue-300/30 bg-blue-300/10 px-2.5 py-1 font-mono text-[10px] font-bold text-blue-200">INDIA</span>
              </div>
              <div className="flex min-h-[220px] flex-col justify-center py-8">
                <MapPinIcon />
                <p className="mt-5 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">Chennai</p>
                <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Tamil Nadu</p>
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 pt-5 text-sm text-slate-300">
                <ShieldCheck className="h-4 w-4 text-blue-300" />
                <span>Digital delivery shaped around your requirements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <SectionIntro eyebrow="Frequently Asked Questions" title="A few practical answers before you begin">
            These answers reflect the current service catalog, engagement models, and documented delivery process.
          </SectionIntro>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqItems.map((item) => (
              <details key={item.question} className="group p-5 sm:p-6">
                <summary className="cursor-pointer list-none pr-8 font-sans text-base font-bold text-slate-900 marker:hidden sm:text-lg">
                  {item.question}
                  <span className="float-right text-xl font-normal text-[#2563EB] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B367C] py-20 text-white sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Start a conversation</p>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">Have an idea you want to turn into a digital solution?</h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100 sm:text-lg">
              Share what you are trying to build, improve, or modernize. The existing project consultation form is the place to begin a practical conversation about your requirements.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateHome('contact')}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#08295E] transition-colors hover:bg-blue-50"
          >
            Contact ROVIANX
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </section>
    </article>
  );
};

function MapPinIcon() {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 text-blue-200">
      <Globe2 className="h-7 w-7" />
    </div>
  );
}
