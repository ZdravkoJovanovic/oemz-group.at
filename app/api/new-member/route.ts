import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateConfirmationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      age,
      phone,
      registrator,
      confirm,
      agb,
    } = body;

    if (!email || !firstName || !lastName || !confirm || !agb) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const confirmationCode = generateConfirmationCode();

    /* ============================
       SUPABASE INSERT + RETURN ID
    ============================ */
    const { data, error } = await supabase
      .from('team_members')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        age: age ? Number(age) : null,
        phone,
        registrator,
        email_confirmed: false,
        confirmation_code: confirmationCode,
        agb_accepted: true,
        info_confirmed: true,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error(error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }

    const confirmationUrl = `http://localhost:3000/confirmation?id=${data.id}`;

    /* ============================
       EMAIL (DESIGN UNVERÄNDERT)
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
            
            <tr>
              <td style="background:#050505;padding:30px;text-align:center;">
                <img
                  src="https://xn--mz-group-m4a.at/OEMZ-Group-Black.png"
                  alt="ÖMZ Group"
                  width="160"
                />
              </td>
            </tr>

            <tr>
              <td style="padding:40px;color:#111111;">
                <h1 style="font-size:22px;">Welcome to ÖMZ Group</h1>

                <p style="color:#555;font-size:14px;">
                  Hello <strong>${firstName} ${lastName}</strong>,<br />
                  please confirm your email address.
                </p>

                <!-- CONFIRMATION CODE -->
                <div style="background:#f0f0f0;border-radius:6px;padding:20px;text-align:center;margin-bottom:20px;">
                  <div style="font-size:26px;letter-spacing:6px;font-weight:600;">
                    ${confirmationCode}
                  </div>
                </div>

                <!-- CONFIRMATION LINK -->
                <div style="text-align:center;margin-bottom:30px;">
                  <a
                    href="${confirmationUrl}"
                    style="
                      display:inline-block;
                      padding:14px 26px;
                      background:#050505;
                      color:#ffffff;
                      text-decoration:none;
                      font-size:14px;
                    "
                  >
                    Confirm your email
                  </a>
                </div>

                <p style="font-size:13px;color:#777;">
                  Or copy this link:<br />
                  ${confirmationUrl}
                </p>

                <p style="font-size:14px;color:#555;">
                  Best regards,<br />
                  <strong>ÖMZ Group</strong>
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#f0f0f0;padding:20px;text-align:center;font-size:12px;color:#777;">
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

    await resend.emails.send({
      from: 'ÖMZ Group <noreply@xn--mz-group-m4a.at>',
      to: email,
      subject: 'Confirm your email',
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
