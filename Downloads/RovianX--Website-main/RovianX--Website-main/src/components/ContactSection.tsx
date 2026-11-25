import React, { useState, useEffect } from 'react';
import { CORE_SERVICES, ENGAGEMENT_MODELS } from '../data/servicesData';
import { ClientLead } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  ArrowRight,
  MapPin,
  Plus
} from 'lucide-react';

interface ContactSectionProps {
  onLeadSubmitted: (newLead: ClientLead) => void;
  onOpenLeadsManager?: () => void;
  prefilledServices?: string[];
  prefilledModel?: string;
  prefilledBrief?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onLeadSubmitted,
  prefilledServices = [],
  prefilledModel = '',
  prefilledBrief = ''
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherServiceText, setOtherServiceText] = useState('');
  const [engagementModel, setEngagementModel] = useState('Project-Based Work');
  const [budgetRange, setBudgetRange] = useState('₹50,000 - ₹1,50,000');
  const [timeline, setTimeline] = useState('1 - 3 Months');
  const [projectDescription, setProjectDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<ClientLead | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Sync prefilled data when user clicks "Inquire About This Service" or "Apply Scope"
  useEffect(() => {
    if (prefilledServices.length > 0) {
      setSelectedServices(prefilledServices);
    }
  }, [prefilledServices]);

  useEffect(() => {
    if (prefilledModel) {
      setEngagementModel(prefilledModel);
    }
  }, [prefilledModel]);

  useEffect(() => {
    if (prefilledBrief) {
      setProjectDescription(prefilledBrief);
    }
  }, [prefilledBrief]);

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter(s => s !== title));
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation: Full Name
    if (!fullName.trim()) {
      setFormError('Please provide your full name.');
      return;
    }

    // Validation: Email
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please provide a valid business email address.');
      return;
    }

    // Validation: Exactly 10 digits for Phone Number (reject 4, 8, or any non-10 digit numbers)
    const pureDigits = phone.replace(/\D/g, '');
    if (pureDigits.length === 0) {
      setFormError('Please fill in your 10-digit mobile or WhatsApp number.');
      return;
    }
    if (pureDigits.length !== 10) {
      setFormError(`Phone number must be exactly 10 digits. You have entered ${pureDigits.length} digits. Please fill in the full 10-digit number.`);
      return;
    }

    // Validation: If Other Services is selected, require user to fill what other service they need
    if (isOtherSelected && !otherServiceText.trim()) {
      setFormError('Please fill in the details for "Other Services" or deselect the option.');
      return;
    }

    setIsSubmitting(true);

    // Final list of services including custom specified other service
    const finalServices = [...selectedServices];
    if (isOtherSelected && otherServiceText.trim()) {
      finalServices.push(`Other: ${otherServiceText.trim()}`);
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newLead: ClientLead = {
      id: `RX-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: pureDigits,
      companyName: companyName.trim() || 'Undisclosed Entity',
      companyWebsite: companyWebsite.trim(),
      selectedServices: finalServices,
      engagementModel,
      budgetRange,
      timeline,
      projectDescription: projectDescription.trim() || 'Standard consultation requested.',
      status: 'new'
    };

    try {
      // POST lead to the backend API which handles Google Sheets synchronization
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      });

      const resData = await response.json().catch(() => ({}));

      const isSynced = Boolean(resData?.syncedToGoogleSheets);
      const leadWithSync: ClientLead = {
        ...newLead,
        syncedToGoogleSheets: isSynced
      };

      onLeadSubmitted(leadWithSync);
      setSubmittedLead(leadWithSync);
    } catch (networkErr) {
      // Graceful fallback to client storage if offline or server warming up
      onLeadSubmitted(newLead);
      setSubmittedLead(newLead);
    } finally {
      setIsSubmitting(false);

      // Clear input fields
      setFullName('');
      setEmail('');
      setPhone('');
      setCompanyName('');
      setCompanyWebsite('');
      setProjectDescription('');
      setIsOtherSelected(false);
      setOtherServiceText('');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Start Your Digital Transformation
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Provide your initiative specifications below. Our technical partner team will review your requirements, prepare an architectural assessment, and contact you within 4 business hours.
          </p>
        </div>

        {/* Main Grid: Form + Communication Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form / Success state */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 shadow-sm">
            
            {submittedLead ? (
              <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B367C]">
                    Inquiry Reference: {submittedLead.id}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Thank You, {submittedLead.fullName}!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                    Your project details have been successfully recorded in our client communications system. Our solution architect is reviewing your brief.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left max-w-lg mx-auto text-xs text-slate-700 space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Recipient:</span>
                    <span className="font-bold text-slate-900">{submittedLead.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Selected Capabilities:</span>
                    <span className="font-bold text-slate-900">{submittedLead.selectedServices.join(', ')}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-medium">Model & Timeline:</span>
                    <span className="font-bold text-slate-900">{submittedLead.engagementModel} ({submittedLead.timeline})</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500 font-medium">Response SLA:</span>
                    <span className="font-bold text-emerald-600">Guaranteed within 4 Hours</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center pt-4">
                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-[#0B367C] hover:bg-[#08295E] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                    {formError}
                  </div>
                )}

                {/* Personal & Business Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Business Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>

                    <div className="relative flex items-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg select-none">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                        <span>+91</span>
                      </span>

                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        required
                        value={phone}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(digitsOnly);
                          if (formError) setFormError(null);
                        }}
                        placeholder="Enter 10-digit mobile number"
                        className={`w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white border rounded-r-lg focus:outline-none transition-colors ${
                          phone.length === 10
                            ? 'border-emerald-500 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500'
                            : phone.length > 0
                            ? 'border-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-400'
                            : 'border-slate-300 focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]'
                        }`}
                      />
                    </div>

                    {/* Inline real-time validation indicator */}
                    {phone.length > 0 && phone.length < 10 && (
                      <p className="mt-1 text-[11px] font-medium text-amber-600">
                        ⚠ Please enter all 10 digits ({phone.length}/10 entered — needs {10 - phone.length} more)
                      </p>
                    )}
                    {phone.length === 10 && (
                      <p className="mt-1 text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Valid 10-digit mobile number</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Technologies Inc."
                      className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]"
                    />
                  </div>
                </div>

                {/* Services Selection Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Services Required {selectedServices.length + (isOtherSelected ? 1 : 0) > 0 ? `(${selectedServices.length + (isOtherSelected ? 1 : 0)} Selected)` : ''}
                    </label>
                    <span className="text-[11px] text-slate-500">Multi-select applicable areas</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CORE_SERVICES.map((srv) => {
                      const isChecked = selectedServices.includes(srv.title);
                      return (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() => toggleService(srv.title)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-[#0B367C] text-white border-[#0B367C]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {srv.title}
                        </button>
                      );
                    })}

                    {/* Other Services Chip */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsOtherSelected(!isOtherSelected);
                        if (formError) setFormError(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isOtherSelected
                          ? 'bg-[#0B367C] text-white border-[#0B367C] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Other Services</span>
                    </button>
                  </div>

                  {/* Input field to fill custom / other services */}
                  {isOtherSelected && (
                    <div className="mt-3 p-3.5 bg-blue-50/70 border border-blue-200/90 rounded-xl space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B367C]">
                        Specify Other Services / Custom Requirements <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={otherServiceText}
                        onChange={(e) => {
                          setOtherServiceText(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="e.g. ERP Integration, Custom AI Bot, Legacy Code Migration, etc."
                        className="w-full px-3.5 py-2 text-xs text-slate-900 bg-white border border-blue-300 rounded-lg focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]"
                      />
                      <p className="text-[11px] text-slate-500">
                        Please specify the customized service or specialized engineering deliverable required.
                      </p>
                    </div>
                  )}
                </div>

                {/* Project Description Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Brief & Technical Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe your objectives, current tech stack, desired deliverables, and target launch dates..."
                    className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B367C] focus:ring-1 focus:ring-[#0B367C]"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Strict NDA & confidentiality standard applied automatically.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 bg-[#0B367C] hover:bg-[#08295E] text-white font-sans text-sm font-semibold tracking-normal rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Recording Request...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Direct Channels & Lead Inbox Access */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Communication Channels Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B367C] mb-4">
                Direct Contact Desk
              </h3>

              {/* Direct Quick Action Icon Buttons - Enlarged */}
              <div className="grid grid-cols-2 gap-4 my-4">
                {/* Email Direct */}
                <a
                  href="mailto:rovianxsolution@gmail.com?subject=Consultation%20Inquiry%20-%20RovianX"
                  title="Email: rovianxsolution@gmail.com"
                  aria-label="Send Email to rovianxsolution@gmail.com"
                  className="h-24 sm:h-28 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-[#0B367C] hover:bg-[#0B367C] hover:text-white hover:border-[#0B367C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                >
                  <Mail className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
                </a>

                {/* Phone Call Direct */}
                <a
                  href="tel:+917010539310"
                  title="Call: +91 70105 39310"
                  aria-label="Call +91 70105 39310"
                  className="h-24 sm:h-28 rounded-2xl bg-blue-50/80 border border-blue-200/90 text-[#0B367C] hover:bg-[#0B367C] hover:text-white hover:border-[#0B367C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                >
                  <Phone className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/917010539310"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp: +91 70105 39310"
                  aria-label="Chat on WhatsApp +91 70105 39310"
                  className="h-24 sm:h-28 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                >
                  <WhatsAppIcon className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
                </a>

                {/* Location Map Direct */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=18+New+Street+T.R.Pattinam+Karaikal"
                  target="_blank"
                  rel="noreferrer"
                  title="Location: 18, New Street, T.R.Pattinam, Karaikal"
                  aria-label="Open Office Location on Google Maps"
                  className="h-24 sm:h-28 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-[#0B367C] hover:text-white hover:border-[#0B367C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
                >
                  <MapPin className="w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs mt-4">
                <div className="flex items-center gap-2 text-[#0B367C] font-bold mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Response Commitment</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  We maintain an average first-response time within business hours. For urgent project deployments, message our direct WhatsApp channel.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
