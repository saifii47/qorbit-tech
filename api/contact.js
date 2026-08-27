import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, first_name, last_name, email, phone, message, subject, botcheck } = req.body || {};

    // Spam honeypot
    if (botcheck) {
      return res.status(200).json({ success: true, message: 'Message sent!' });
    }

    const senderName = (name || `${first_name || ''} ${last_name || ''}`).trim() || 'Website Visitor';

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    // Hostinger SMTP Configuration
    const hostingerUser = process.env.HOSTINGER_EMAIL_USER || 'info@qorbittech.com';
    const hostingerPass = process.env.HOSTINGER_EMAIL_PASSWORD || process.env.EMAIL_PASSWORD;
    const recipient = process.env.RECIPIENT_EMAIL || 'info@qorbittech.com';

    if (!hostingerPass) {
      return res.status(500).json({
        success: false,
        message: 'Hostinger email password missing: Please add HOSTINGER_EMAIL_PASSWORD in .env or Vercel Environment Variables.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.HOSTINGER_SMTP_HOST || 'smtp.hostinger.com',
      port: 465,
      secure: true, // SSL port 465
      auth: {
        user: hostingerUser,
        pass: hostingerPass,
      },
    });

    const emailSubject = subject || `New Inquiry from ${senderName} - Qorbit Tech`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 30px 15px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
          <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 25px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 700;">🚀 New Lead Submission</h1>
            <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">Qorbit Tech Website Notification</p>
          </div>
          <div style="padding: 30px;">
            <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
              <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Full Name:</span>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px; font-weight: 600;">${senderName}</p>
            </div>
            <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
              <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email Address:</span>
              <p style="margin: 4px 0 0; color: #2563eb; font-size: 16px; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            </div>
            <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
              <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Phone Number:</span>
              <p style="margin: 4px 0 0; color: #111827; font-size: 16px; font-weight: 600;">${phone || 'Not provided'}</p>
            </div>
            <div style="margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">
              <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Subject:</span>
              <p style="margin: 4px 0 0; color: #111827; font-size: 15px;">${emailSubject}</p>
            </div>
            <div style="margin-top: 20px;">
              <span style="color: #6b7280; font-size: 13px; font-weight: 600; text-transform: uppercase;">Message:</span>
              <div style="margin-top: 8px; background: #f9fafb; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 6px; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message || 'No additional message provided.'}</div>
            </div>
          </div>
          <div style="background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px;">
            Delivered securely via Hostinger SMTP directly to info@qorbittech.com
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Qorbit Tech Website" <${hostingerUser}>`,
      to: recipient,
      replyTo: `"${senderName}" <${email}>`,
      subject: emailSubject,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent directly to info@qorbittech.com!',
    });
  } catch (error) {
    console.error('Error sending email via Hostinger SMTP:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send email via Hostinger SMTP.',
    });
  }
}
