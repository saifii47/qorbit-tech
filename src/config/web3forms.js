// Mail Service for Qorbit Tech
// Direct Hostinger SMTP via Vercel Serverless Function (/api/contact) + Web3Forms fallback

export const MAIL_CONFIG = {
  // Primary: Vercel Serverless API with Hostinger SMTP
  apiContactUrl: '/api/contact',
  // Optional Backup: Web3Forms
  web3FormsKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  web3FormsUrl: 'https://api.web3forms.com/submit',
  recipientEmail: 'info@qorbittech.com',
};

/**
 * Submit form data directly to Hostinger Mail via Vercel Serverless Function
 * @param {Object} data - Key-value pairs of form fields
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendWeb3FormsSubmission(data) {
  // 1. Primary Method: Direct Vercel Serverless Endpoint (/api/contact) with Hostinger SMTP
  try {
    const response = await fetch(MAIL_CONFIG.apiContactUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (response.ok && result?.success) {
      return {
        success: true,
        message: result.message || 'Your message has been sent directly to info@qorbittech.com!',
      };
    }

    // If serverless endpoint returned a specific message
    if (result && !result.success && result.message) {
      // If Hostinger password is not set on Vercel yet, try fallback
      console.warn('Vercel API notice:', result.message);
    }
  } catch (err) {
    console.warn('/api/contact fetch error, trying Web3Forms fallback...', err);
  }

  // 2. Secondary Fallback: Web3Forms (if access key is configured)
  const accessKey = MAIL_CONFIG.web3FormsKey.trim();
  if (accessKey && accessKey !== 'YOUR_ACCESS_KEY_HERE' && accessKey !== 'your_web3forms_access_key_here') {
    try {
      const payload = {
        access_key: accessKey,
        to_email: MAIL_CONFIG.recipientEmail,
        ...data,
      };

      const response = await fetch(MAIL_CONFIG.web3FormsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          message: 'Your message has been sent directly to info@qorbittech.com!',
        };
      }
    } catch (err) {
      console.error('Web3Forms fallback error:', err);
    }
  }

  return {
    success: false,
    message: 'Hostinger email password set nahi hai. Kripya .env / Vercel mein HOSTINGER_EMAIL_PASSWORD set karein.',
  };
}
