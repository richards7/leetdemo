import React from 'react';
import { ArrowRight, Award, Lightbulb, Rocket, UsersRound } from 'lucide-react';
import { STUDENT_PROJECT_THEMES } from '../data/studentProjectThemes';

interface StudentHubLandingPageProps {
  onSubmitIdea: () => void;
}

const reasons = [
  {
    icon: Lightbulb,
    title: 'Solve meaningful problems',
    description: 'Turn real-world challenges into thoughtful, practical project ideas.',
  },
  {
    icon: UsersRound,
    title: 'Build together',
    description: 'Bring different skills and perspectives together to shape a shared solution.',
  },
  {
    icon: Rocket,
    title: 'Make an idea tangible',
    description: 'Move from an initial concept toward a project with a clear purpose and impact.',
  },
  {
    icon: Award,
    title: 'Grow through making',
    description: 'Practice collaboration, creative thinking, and learning by doing.',
  },
];

export const StudentHubLandingPage: React.FC<StudentHubLandingPageProps> = ({ onSubmitIdea }) => (
  <div className="bg-[#F8FAFC]">
    <section className="relative isolate overflow-hidden bg-[#071B3A] px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 lg:px-8 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_25%,rgba(57,46,219,0.42),transparent_38%),radial-gradient(ellipse_at_20%_90%,rgba(37,99,235,0.27),transparent_45%)]" />
      <div className="absolute right-[12%] top-32 -z-10 h-48 w-48 rounded-full border border-blue-300/20 sm:h-72 sm:w-72" />
      <div className="absolute right-[18%] top-40 -z-10 h-36 w-36 rounded-full border border-indigo-300/20 sm:h-56 sm:w-56" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-100">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Student Innovation Hub
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">36-Hour Hackathon</h1>
          <p className="mt-4 text-xl font-semibold tracking-wide text-blue-200 sm:text-2xl">Think. Build. Innovate.</p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Bring your ideas to life. Identify real-world problems, collaborate with your team and develop innovative project solutions during our 36-hour hackathon initiative.
          </p>
          <button
            type="button"
            onClick={onSubmitIdea}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#392EDB] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-[#4B42EC] focus:outline-none focus:ring-4 focus:ring-indigo-300/40"
          >
            Submit Your Project Idea <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center sm:max-w-md">
          <div className="absolute inset-5 animate-[spin_48s_linear_infinite] rounded-full border border-dashed border-blue-200/30" />
          <div className="absolute inset-14 rounded-full border border-blue-200/20" />
          <div className="absolute inset-24 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-500/10 blur-xl" />
          <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl shadow-blue-950/40 backdrop-blur-md sm:h-44 sm:w-44">
            <Lightbulb className="h-12 w-12 text-amber-300 sm:h-14 sm:w-14" />
            <span className="mt-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-blue-100">Ideas into impact</span>
          </div>
          <div className="absolute left-2 top-1/4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-blue-100 backdrop-blur">Think</div>
          <div className="absolute right-0 top-1/3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-blue-100 backdrop-blur">Build</div>
          <div className="absolute bottom-8 left-1/4 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold text-blue-100 backdrop-blur">Innovate</div>
        </div>
      </div>
    </section>

    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#392EDB]">The challenge</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">36 hours to explore what’s possible.</h2>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-base leading-8 text-slate-600">
            The Student Hub is a place to share ideas shaped by curiosity and real needs. For this hackathon initiative, teams identify a challenge, collaborate on an approach, and propose a solution that could make a difference. Start with a clear problem and a willingness to learn together.
          </p>
        </div>
      </div>
    </section>

    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#392EDB]">Why participate</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Learn by creating something that matters.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, description }) => (
            <article key={title} className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg">
              <span className="inline-flex rounded-xl bg-blue-50 p-3 text-[#392EDB] transition group-hover:bg-[#392EDB] group-hover:text-white"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#392EDB]">Project themes</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Choose a challenge worth solving.</h2>
          <p className="mt-3 leading-7 text-slate-600">Explore themes that connect student ideas with the needs of people and communities.</p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(STUDENT_PROJECT_THEMES).map(([name, theme]) => (
            <article key={name} className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md">
              <h3 className="font-bold text-slate-900">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{theme.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#0B367C] to-[#392EDB] p-7 text-white shadow-xl sm:p-10 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Have an idea to build?</h2>
          <p className="mt-2 max-w-xl leading-7 text-blue-100">Share your team’s proposal and the real-world challenge you want to address.</p>
        </div>
        <button type="button" onClick={onSubmitIdea} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0B367C] transition hover:-translate-y-0.5 hover:bg-blue-50">
          Submit Your Project Idea <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  </div>
);
