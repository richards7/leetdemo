import React, { useState, useEffect } from 'react';
import { ClientLead, SheetsStatus } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { 
  X, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Clock, 
  DollarSign, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare,
  Trash2,
  Filter,
  ExternalLink,
  ChevronDown,
  FileSpreadsheet,
  RefreshCw,
  HelpCircle,
  Check
} from 'lucide-react';

interface LeadsManagerModalProps {
  leads: ClientLead[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: ClientLead['status']) => void;
  onDeleteLead: (id: string) => void;
}

export const LeadsManagerModal: React.FC<LeadsManagerModalProps> = ({
  leads,
  isOpen,
  onClose,
  onUpdateStatus,
  onDeleteLead
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);

  // Google Sheets integration state
  const [sheetsStatus, setSheetsStatus] = useState<SheetsStatus | null>(null);
  const [showSheetsPanel, setShowSheetsPanel] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Fetch Google Sheets configuration status
  const fetchSheetsStatus = async () => {
    try {
      const res = await fetch('/api/sheets/status');
      if (res.ok) {
        const data = await res.json();
        setSheetsStatus(data);
      }
    } catch {
      // Backend warming up or running in client-only preview
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSheetsStatus();
    }
  }, [isOpen]);

  const handleSyncAllToSheets = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch('/api/sheets/sync-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads })
      });
      const data = await res.json();
      if (res.ok) {
        setSyncFeedback(`Successfully synced ${data.synced} of ${data.total} inquiries to Google Sheets.`);
        fetchSheetsStatus();
      } else {
        setSyncFeedback(data.error || 'Sync could not be completed. Check credentials.');
      }
    } catch (err: any) {
      setSyncFeedback('Network error while attempting sync.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSearch = searchQuery.trim() === '' ||
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeLead = leads.find(l => l.id === selectedLeadId) || filteredLeads[0];

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Company', 'Services', 'Engagement Model', 'Budget', 'Timeline', 'Status', 'Description'];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.selectedServices.join('; ')}"`,
      `"${l.engagementModel}"`,
      `"${l.budgetRange}"`,
      `"${l.timeline}"`,
      `"${l.status}"`,
      `"${l.projectDescription.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rovianx_client_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[88vh] max-h-[850px]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="bg-[#0B367C] px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 font-bold">
              RX
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-blue-200">
                Enterprise Communications Portal
              </div>
              <h3 className="text-lg font-extrabold text-white">
                Client Inquiries & Contact Manager
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowSheetsPanel(!showSheetsPanel)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                showSheetsPanel
                  ? 'bg-white text-[#0B367C]'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Google Sheets Backend Integration"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Google Sheets</span>
              <span className={`w-2 h-2 rounded-full ${
                sheetsStatus?.configured ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Export all inquiries to CSV format"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Sheets Integration Panel (Collapsible) */}
        {showSheetsPanel && (
          <div className="bg-slate-900 text-slate-100 p-4 sm:p-5 border-b border-slate-700 text-xs shrink-0 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  sheetsStatus?.configured ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Google Sheets Live Backend Sync</span>
                    <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                      sheetsStatus?.configured 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {sheetsStatus?.configured ? 'Active & Connected' : 'Credentials Required'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Customer consultation briefs automatically stream directly into your Google Spreadsheet.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleSyncAllToSheets}
                  disabled={isSyncing}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Inquiries to Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Sync Feedback Toast inside panel */}
            {syncFeedback && (
              <div className="mt-3 p-2.5 rounded bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{syncFeedback}</span>
              </div>
            )}

            {/* Status Details / Guide */}
            {sheetsStatus?.configured ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-1 text-slate-300">
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Target Spreadsheet ID:</span>
                  <a
                    href={`https://docs.google.com/spreadsheets/d/${sheetsStatus.sheetId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-blue-400 hover:underline flex items-center gap-1 mt-0.5 truncate"
                  >
                    <span className="truncate">{sheetsStatus.sheetId}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Service Account Email:</span>
                  <span className="font-mono text-slate-200 block truncate mt-0.5" title={sheetsStatus.clientEmail}>
                    {sheetsStatus.clientEmail}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Tab & Total Synced:</span>
                    <span className="font-bold text-white mt-0.5 block">
                      {sheetsStatus.tabName} ({sheetsStatus.totalSyncedCount} appended)
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800 font-mono">
                    Real-time
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-3 bg-slate-800/60 p-3.5 rounded-lg border border-slate-700 space-y-2">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>How to connect your Google Sheets credentials JSON:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 text-[11px] pt-1">
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/60">
                    <strong className="text-white block mb-1">Step 1: Credentials JSON</strong>
                    Provide your Service Account credentials JSON string in the <code className="text-blue-300 font-mono">GOOGLE_SERVICE_ACCOUNT_JSON</code> environment variable or place <code className="text-blue-300 font-mono">credentials.json</code> in the project.
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/60">
                    <strong className="text-white block mb-1">Step 2: Spreadsheet ID</strong>
                    Set <code className="text-blue-300 font-mono">GOOGLE_SHEET_ID</code> with the ID from your Google Sheets URL (the part between <code className="text-slate-400">/d/</code> and <code className="text-slate-400">/edit</code>).
                  </div>
                  <div className="bg-slate-900/60 p-2.5 rounded border border-slate-700/60">
                    <strong className="text-white block mb-1">Step 3: Share with Editor Access</strong>
                    Open your Google Sheet, click <strong>Share</strong>, and add your service account email address ({sheetsStatus?.clientEmail || 'client_email from your JSON'}) as an <strong>Editor</strong>.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-bar: Stats & Filter controls */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-500">
              Total Inquiries: <strong className="text-slate-900">{leads.length}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {leads.filter(l => l.status === 'new').length} New
            </span>
            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {leads.filter(l => l.status === 'contacted').length} Contacted
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter client or ref..."
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0B367C]"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2 py-1 text-xs bg-white border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:border-[#0B367C]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="in_discovery">In Discovery</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* 2-Column Leads Workbench */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left List: Inquiries List */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100 bg-slate-50/50">
            {filteredLeads.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No inquiries matching filter criteria.
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = activeLead?.id === lead.id;
                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-white border-l-4 border-l-[#0B367C] shadow-xs' 
                        : 'hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#0B367C]">
                        {lead.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        lead.status === 'new'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lead.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-700'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="font-extrabold text-sm text-slate-900 line-clamp-1">
                      {lead.fullName}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1 mb-2">
                      {lead.companyName} • {lead.email}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                        {lead.syncedToGoogleSheets && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5" title="Synced to Google Sheets">
                            <FileSpreadsheet className="w-2.5 h-2.5" />
                            <span>Sheets</span>
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-slate-600 font-mono">
                        {lead.budgetRange}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Detail Pane: Client Details & Direct Contact Handlers */}
          <div className="md:col-span-7 bg-white overflow-y-auto p-6 flex flex-col justify-between">
            {activeLead ? (
              <div className="space-y-6">
                
                {/* Client Profile Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 font-bold block">
                      REFERENCE: {activeLead.id}
                    </span>
                    <h4 className="text-xl font-black text-slate-900">
                      {activeLead.fullName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{activeLead.companyName}</span>
                      {activeLead.companyWebsite && (
                        <a 
                          href={activeLead.companyWebsite.startsWith('http') ? activeLead.companyWebsite : `https://${activeLead.companyWebsite}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0B367C] hover:underline flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Status:</span>
                    <select
                      value={activeLead.status}
                      onChange={(e) => onUpdateStatus(activeLead.id, e.target.value as any)}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#0B367C]"
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_discovery">In Discovery</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="closed">Closed / Handled</option>
                    </select>
                  </div>
                </div>

                {/* Direct Action Communication Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Direct Email Action */}
                  <a
                    href={`mailto:${activeLead.email}?subject=RovianX%20Solutions%20-%20Follow-up%20on%20your%20Inquiry%20${activeLead.id}&body=Hi%20${encodeURIComponent(activeLead.fullName)},%0A%0AThank%20you%20for%20reaching%20out%20to%20RovianX%20Solutions%20regarding%20${encodeURIComponent(activeLead.selectedServices.join(',%20'))}.%0A%0AI%20reviewed%20your%20initiative%20details%20and%20would%20like%20to%20schedule%20a%20brief%20discovery%20call%20this%20week.%0A%0ABest%20regards,%0ARovianX%20Solutions%0AWhatsApp:%20%2B91%2070105%2039310%0AEmail:%20rovianxsolution@gmail.com`}
                    className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#0B367C] hover:bg-[#0B367C] hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold group"
                  >
                    <Mail className="w-4 h-4 text-[#2563EB] group-hover:text-white" />
                    <span>Email {activeLead.email}</span>
                  </a>

                  {/* Direct Phone/WhatsApp Action */}
                  <a
                    href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold group"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                    <span>WhatsApp / Call {activeLead.phone}</span>
                  </a>
                </div>

                {/* Scope & Requirements Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Engagement Model:</span>
                    <span className="font-bold text-slate-800">{activeLead.engagementModel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Budget Allocation:</span>
                    <span className="font-bold text-slate-800">{activeLead.budgetRange}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Timeline Urgency:</span>
                    <span className="font-bold text-slate-800">{activeLead.timeline}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] uppercase block">Received On:</span>
                    <span className="font-bold text-slate-800">{new Date(activeLead.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                {/* Selected Capabilities */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Requested Services ({activeLead.selectedServices.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLead.selectedServices.map(s => (
                      <span key={s} className="px-2.5 py-1 bg-blue-100 text-[#0B367C] font-semibold text-xs rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Brief / Specification */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Client Requirements Specification
                  </span>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans max-h-48 overflow-y-auto">
                    {activeLead.projectDescription}
                  </div>
                </div>

                {/* Lead Removal Option */}
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete inquiry ${activeLead.id}?`)) {
                        onDeleteLead(activeLead.id);
                      }
                    }}
                    className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="text-center py-20 text-slate-400 text-xs">
                Select an inquiry from the left to view details and communicate with the client.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
