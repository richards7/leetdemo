import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface LeadEmailData {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite?: string;
  selectedServices: string[];
  engagementModel: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
  status?: string;
}

interface EmailResult {
  success: boolean;
  message: string;
  error?: string;
}

interface SmtpError {
  code?: string | number;
  responseCode?: string | number;
  command?: string;
  response?: string;
  message?: string;
}

const NOTIFY_EMAIL = 'rovianxsolution@gmail.com';

function getSmtpErrorDetails(error: SmtpError): string {
  const details = [
    error.code ? `code=${error.code}` : '',
    error.responseCode ? `responseCode=${error.responseCode}` : '',
    error.command ? `command=${error.command}` : '',
    error.response ? `response=${error.response}` : '',
    error.message ? `message=${error.message}` : '',
  ].filter(Boolean).join('; ');

  return details.slice(0, 1000) || 'Unknown SMTP error.';
}

function getGmailTransporter(): {
  transporter?: Transporter;
  error?: string;
} {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, '');

  if (!gmailUser || !gmailAppPassword) {
    const missing = [
      !gmailUser ? 'GMAIL_USER' : '',
      !gmailAppPassword ? 'GMAIL_APP_PASSWORD' : '',
    ].filter(Boolean).join(', ');

    return { error: `Missing required environment variable(s): ${missing}.` };
  }

  return {
    transporter: nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    }),
  };
}

export async function verifyGmailSmtp(): Promise<EmailResult> {
  const { transporter, error } = getGmailTransporter();
  if (!transporter) {
    console.error('Gmail SMTP verification failed:', error);
    return {
      success: false,
      message: 'Gmail SMTP verification failed.',
      error,
    };
  }

  try {
    await transporter.verify();
    console.log('Gmail SMTP verification succeeded.');
    return {
      success: true,
      message: 'Gmail SMTP connection verified successfully.',
    };
  } catch (err) {
    const details = getSmtpErrorDetails(err as SmtpError);
    console.error('Gmail SMTP verification failed:', details);
    return {
      success: false,
      message: 'Gmail SMTP verification failed.',
      error: details,
    };
  } finally {
    transporter.close();
  }
}

/**
 * Sends a notification email to rovianxsolution@gmail.com
 * whenever a new contact form submission is received.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<EmailResult> {
  const gmailUser = process.env.GMAIL_USER?.trim();
  const { transporter, error } = getGmailTransporter();
  if (!transporter || !gmailUser) {
    console.error('Email notification failed:', error);
    return {
      success: false,
      message: 'Email notification failed before SMTP connection.',
      error,
    };
  }

  const formattedDate = new Date(lead.createdAt || new Date()).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const servicesStr = Array.isArray(lead.selectedServices)
    ? lead.selectedServices.join(', ') || 'None specified'
    : lead.selectedServices || 'None specified';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; margin: 0; padding: 0; }
    .wrapper { max-width: 620px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(11,54,124,0.12); }
    .header { background: linear-gradient(135deg, #0B367C 0%, #1E4BA8 100%); padding: 32px 36px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
    .header p { color: #93C5FD; margin: 6px 0 0; font-size: 13px; }
    .badge { display: inline-block; background: #2563EB; color: white; border-radius: 6px; padding: 3px 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; margin-top: 12px; }
    .body { padding: 28px 36px; }
    .section-title { font-size: 11px; font-weight: 700; color: #2563EB; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0 10px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; }
    .field { display: flex; margin-bottom: 10px; }
    .label { width: 160px; min-width: 160px; font-size: 13px; color: #64748B; font-weight: 600; }
    .value { font-size: 13px; color: #1E293B; font-weight: 500; word-break: break-word; }
    .desc-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #374151; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
    .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 18px 36px; text-align: center; font-size: 11px; color: #94A3B8; }
    .ref { font-family: monospace; font-size: 12px; color: #0B367C; background: #EFF6FF; padding: 2px 8px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>🔔 New Consultation Inquiry</h1>
      <p>${formattedDate}</p>
      <span class="badge">REF: ${lead.id}</span>
    </div>
    <div class="body">

      <div class="section-title">Contact Details</div>
      <div class="field"><span class="label">Full Name</span><span class="value">${lead.fullName}</span></div>
      <div class="field"><span class="label">Email</span><span class="value">${lead.email}</span></div>
      <div class="field"><span class="label">Phone / WhatsApp</span><span class="value">${lead.phone}</span></div>
      <div class="field"><span class="label">Company</span><span class="value">${lead.companyName || 'N/A'}</span></div>
      <div class="field"><span class="label">Website</span><span class="value">${lead.companyWebsite || 'N/A'}</span></div>

      <div class="section-title">Project Details</div>
      <div class="field"><span class="label">Services Requested</span><span class="value">${servicesStr}</span></div>
      <div class="field"><span class="label">Engagement Model</span><span class="value">${lead.engagementModel || 'N/A'}</span></div>
      <div class="field"><span class="label">Budget Range</span><span class="value">${lead.budgetRange || 'N/A'}</span></div>
      <div class="field"><span class="label">Timeline</span><span class="value">${lead.timeline || 'N/A'}</span></div>

      <div class="section-title">Project Brief</div>
      <div class="desc-box">${lead.projectDescription || 'No description provided.'}</div>

    </div>
    <div class="footer">
      This notification was sent automatically by <strong>RovianX Solutions</strong> &middot; <span class="ref">${lead.id}</span>
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await transporter.verify();
    console.log('Gmail SMTP verification succeeded before notification send.');

    await transporter.sendMail({
      from: `"RovianX Solutions" <${gmailUser}>`,
      to: NOTIFY_EMAIL,
      subject: `🔔 New Inquiry from ${lead.fullName} — ${lead.companyName || 'Individual'} [${lead.id}]`,
      html: htmlBody,
      text: `New Inquiry\n\nName: ${lead.fullName}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCompany: ${lead.companyName}\nServices: ${servicesStr}\nBudget: ${lead.budgetRange}\nTimeline: ${lead.timeline}\nBrief: ${lead.projectDescription}\n\nRef: ${lead.id}`,
    });

    return {
      success: true,
      message: `Notification email sent to ${NOTIFY_EMAIL}`,
    };
  } catch (err) {
    const details = getSmtpErrorDetails(err as SmtpError);
    console.error('Gmail SMTP notification failed:', details);

    return {
      success: false,
      message: 'Failed to send notification email.',
      error: details,
    };
  } finally {
    transporter.close();
  }
}
