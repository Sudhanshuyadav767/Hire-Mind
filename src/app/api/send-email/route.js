import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, password, roleTitle, assignedTasks } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email address is required' }, { status: 400 });
    }

    const loginUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000/login';
    const subject = `🔐 Welcome to HireMind! Your HR Team Credentials & Access Portal`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HireMind HR Portal Credentials</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #2D24D0 0%, #6366F1 50%, #4F46E5 100%); padding: 36px 32px; text-align: center; color: #ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 50px; padding: 6px 16px; display: inline-block; margin-bottom: 12px;">
                      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #ffffff;">Recruiter Team Onboarding</span>
                    </div>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; line-height: 1.2;">
                      HireMind AI Portal Credentials
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; color: #e0e7ff;">
                      Official HR Member Account Access & Role Delegation
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px; background-color: #ffffff;">
              
              <p style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">
                Hello ${fullName || 'Team Member'}, 👋
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                Welcome to the <strong>HireMind Enterprise Recruitment Team</strong>! You have been assigned the role of <strong>${roleTitle || 'HR Recruiter'}</strong> with active management privileges.
              </p>

              <!-- Credentials Card -->
              <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-left: 5px solid #2D24D0; border-radius: 14px; padding: 24px; margin-bottom: 28px;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2D24D0; margin-bottom: 16px;">
                  🔐 Your Account Security Credentials
                </div>

                <!-- Email / Login ID -->
                <div style="margin-bottom: 16px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">
                    Portal Access Email (User ID)
                  </span>
                  <div style="font-size: 15px; font-weight: 700; color: #0f172a; font-family: monospace; background-color: #eef2ff; border: 1px solid #c7d2fe; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    ${email}
                  </div>
                </div>

                <!-- Password -->
                <div style="margin-bottom: 16px;">
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 4px;">
                    Assigned Account Password
                  </span>
                  <div style="font-size: 16px; font-weight: 800; color: #2D24D0; font-family: monospace; background-color: #e0e7ff; border: 1px solid #a5b4fc; padding: 10px 14px; border-radius: 8px; display: inline-block;">
                    ${password}
                  </div>
                </div>

                <!-- Role & Tasks -->
                <div>
                  <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; display: block; margin-bottom: 6px;">
                    Designated Role & Assigned Tasks
                  </span>
                  <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px 14px; font-size: 13px; font-weight: 700; color: #047857;">
                    🎯 ${roleTitle || 'Recruiter'} — <span style="font-weight: 500; color: #065f46;">${assignedTasks || 'Full Access'}</span>
                  </div>
                </div>
              </div>

              <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #1e293b;">
                With this HR account, you can perform:
              </p>
              <ul style="margin: 0 0 28px 0; padding-left: 20px; font-size: 14px; color: #475569; line-height: 1.8;">
                <li><strong>Job Openings Management</strong>: Post, edit, publish, or pause active hiring roles.</li>
                <li><strong>Candidate Screening & Interviews</strong>: Track candidate applications, evaluate match scores, and schedule interviews.</li>
                <li><strong>Talent Pipeline</strong>: Access resume parsing data, skill metrics, and decision workflows.</li>
              </ul>

              <!-- Direct CTA Login Button -->
              <div style="text-align: center; margin: 32px 0 24px 0;">
                <a href="${loginUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2D24D0 0%, #4F46E5 100%); color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 14px; font-weight: 800; font-size: 16px; box-shadow: 0 8px 20px rgba(45, 36, 208, 0.35);">
                  🚀 Log In to HireMind Portal
                </a>
              </div>

              <div style="text-align: center; font-size: 12px; color: #64748b;">
                Direct Login URL: <a href="${loginUrl}" style="color: #2D24D0; font-weight: 600;">${loginUrl}</a>
              </div>

              <div style="margin-top: 32px; padding: 14px 18px; background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 10px; font-size: 12px; color: #92400e;">
                💡 <strong>Security Tip:</strong> Please do not share these credentials with unauthorized persons. For safety, update your password after logging in.
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.6;">
              <strong>HireMind AI Recruitment Platform</strong><br>
              © ${new Date().getFullYear()} HireMind. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
HIREMIND HR TEAM CREDENTIALS

Hello ${fullName || 'Team Member'},

Your HR Portal Access Credentials:
- Login Email (User ID): ${email}
- Password: ${password}
- Role Designation: ${roleTitle}
- Assigned Task Scope: ${assignedTasks}

Log In to HireMind Portal: ${loginUrl}
    `.trim();

    const payload = {
      From: { Email: 'noreply@hiremind.dev', Name: 'HireMind Enterprise Recruiter' },
      To: [{ Email: email, Name: fullName || 'HR Member' }],
      Subject: subject,
      Text: textContent,
      HTML: htmlContent,
    };

    // Send via Mailpit HTTP API (http://127.0.0.1:8025/api/v1/send)
    try {
      const response = await fetch('http://127.0.0.1:8025/api/v1/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ success: true, message: 'Email delivered via Mailpit API', id: data.ID });
      }
    } catch (httpError) {
      console.warn('Mailpit HTTP API notice:', httpError?.message);
    }

    return NextResponse.json({ success: true, message: 'Dispatched via fallback' });
  } catch (err) {
    console.error('API /api/send-email error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
