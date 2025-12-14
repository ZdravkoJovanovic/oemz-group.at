import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log('➡️ /api/new-member called');

    const body = await req.json();
    console.log('📦 Body:', body);

    const {
      firstName,
      lastName,
      email,
      age,
      phone,
      registrator,
    } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    /* ============================
       HTML EMAIL TEMPLATE
    ============================ */
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to ÖMZ Group</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f2f2f2;font-family:Arial,Helvetica,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#050505;padding:30px;text-align:center;">
                <img
                  src="https://xn--mz-group-m4a.at/OEMZ-Group-Black.png"
                  alt="ÖMZ Group"
                  width="160"
                  style="display:block;margin:0 auto;"
                />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px;color:#111111;">
                
                <h1 style="margin:0 0 12px 0;font-size:22px;font-weight:600;">
                  Welcome to ÖMZ Group
                </h1>

                <p style="margin:0 0 24px 0;color:#555555;font-size:14px;line-height:1.6;">
                  Hello <strong>${firstName} ${lastName}</strong>,<br />
                  you have been successfully added as a team member.
                </p>

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border-radius:6px;padding:20px;margin-bottom:24px;">
                  <tr>
                    <td style="font-size:14px;color:#333333;">
                      <strong>Member details</strong><br /><br />
                      Age: ${age}<br />
                      Phone: ${phone}<br />
                      Registrator: ${registrator}
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 24px 0;color:#555555;font-size:14px;">
                  If you have any questions, feel free to reply to this email.
                </p>

                <p style="margin:0;color:#555555;font-size:14px;">
                  Best regards,<br />
                  <strong>ÖMZ Group</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f0f0f0;padding:20px;text-align:center;font-size:12px;color:#777777;">
                © ÖMZ Group · All rights reserved
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
</html>
`;

    console.log('📨 Sending email to:', email);

    const result = await resend.emails.send({
      from: 'ÖMZ Group <noreply@xn--mz-group-m4a.at>',
      to: email,
      subject: 'Welcome to ÖMZ Group',
      html,
    });

    console.log('✅ Resend result:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API ERROR:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
