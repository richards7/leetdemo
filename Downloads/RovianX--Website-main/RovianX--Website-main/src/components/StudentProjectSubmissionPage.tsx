import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Loader2, Send } from 'lucide-react';
import { STUDENT_PROJECT_THEMES } from '../data/studentProjectThemes';

interface StudentProjectSubmissionPageProps {
  onBackToHub: () => void;
}

export const StudentProjectSubmissionPage: React.FC<StudentProjectSubmissionPageProps> = ({ onBackToHub }) => {
  const [theme, setTheme] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Student Project Proposal Submission | RovianX Solutions';
    return () => { document.title = previousTitle; };
  }, []);

  const selectedTheme = theme ? STUDENT_PROJECT_THEMES[theme] : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!teamName.trim() || !teamLead.trim() || !teamMembers.trim() || !theme || !focusArea || !projectTitle.trim() || !projectDescription.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    if (projectDescription.trim().length < 30) {
      setError('Project description must be at least 30 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/student-projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: teamName.trim(),
          teamLead: teamLead.trim(),
          teamMembers: teamMembers.trim(),
          theme,
          projectFocusArea: focusArea,
          projectTitle: projectTitle.trim(),
          projectDescription: projectDescription.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });
      const data = await response.json().catch(() => ({ error: 'Unable to read the server response.' }));
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'Submission could not be completed.');
      }

      setSuccess('Your project proposal was submitted successfully. Thank you for sharing your idea!');
      setTeamName('');
      setTeamLead('');
      setTeamMembers('');
      setTheme('');
      setFocusArea('');
      setProjectTitle('');
      setProjectDescription('');
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#392EDB] focus:ring-4 focus:ring-[#392EDB]/10';

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#F8FAFC] px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#EEF4FF] to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <button type="button" onClick={onBackToHub} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0B367C] hover:text-[#392EDB]">
          <ArrowLeft className="h-4 w-4" /> Back to Student Hub
        </button>
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#392EDB] shadow-sm">36-Hour Hackathon</div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Student Project Proposal Submission</h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">Tell us about your team, the challenge you’re exploring, and the solution you want to build.</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold text-slate-950">Choose a theme</h2>
            <p className="mt-1 text-sm text-slate-500">The selected theme shows its description and intended beneficiaries.</p>
            {selectedTheme ? (
              <div className="mt-5 rounded-xl border border-blue-100 bg-[#F7F9FF] p-4">
                <p className="text-sm font-bold text-[#0B367C]">{theme}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedTheme.description}</p>
                <div className="mt-4 border-t border-blue-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Who can benefit</p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">{selectedTheme.beneficiaries}</p>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-500">Select a theme to view its description and intended beneficiaries.</div>
            )}
          </aside>

          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,.06)] sm:p-7">
            {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}
            {success && <div role="status" className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />{success}</div>}

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">Team Name *
                <input className={inputClass} value={teamName} onChange={(event) => setTeamName(event.target.value)} placeholder="e.g. Innovators" required />
              </label>
              <label className="text-sm font-semibold text-slate-700">Team Lead *
                <input className={inputClass} value={teamLead} onChange={(event) => setTeamLead(event.target.value)} placeholder="Full name" required />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Team Members *
                <input className={inputClass} value={teamMembers} onChange={(event) => setTeamMembers(event.target.value)} placeholder="Names separated by commas" required />
              </label>
              <label className="text-sm font-semibold text-slate-700">Theme *
                <select className={inputClass} value={theme} onChange={(event) => { setTheme(event.target.value); setFocusArea(''); }} required>
                  <option value="">Select a theme</option>
                  {Object.keys(STUDENT_PROJECT_THEMES).map((name) => <option key={name} value={name}>{name}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Project Focus Area *
                <select className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400`} value={focusArea} onChange={(event) => setFocusArea(event.target.value)} disabled={!theme} required>
                  <option value="">{theme ? 'Select a focus area' : 'Select a theme first'}</option>
                  {selectedTheme?.focusAreas.map((area) => <option key={area} value={area}>{area}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Project Title *
                <input className={inputClass} value={projectTitle} onChange={(event) => setProjectTitle(event.target.value)} placeholder="A clear, memorable title" required />
              </label>
              <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Project Description *
                <textarea className={`${inputClass} min-h-36 resize-y`} value={projectDescription} onChange={(event) => setProjectDescription(event.target.value)} placeholder="Describe the problem, your solution, intended users, and expected impact (minimum 30 characters)." minLength={30} required />
                <span className="mt-1.5 block text-right text-xs font-normal text-slate-400">{projectDescription.length} characters</span>
              </label>
            </div>

            <button type="submit" disabled={submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#392EDB] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-[#2E25B8] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting proposal...</> : <>Submit Project <Send className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
