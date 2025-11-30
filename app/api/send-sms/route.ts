import { NextResponse } from "next/server";
import Twilio from "twilio";

const SID = process.env.TWILIO_ACCOUNT_SID!;
const TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const FROM = process.env.TWILIO_FROM!; // MUST be a Twilio number (+...) or Messaging Service SID (MG...)

if (!SID || !TOKEN) {
  console.warn("Missing TWILIO env vars");
}

const client = Twilio(SID, TOKEN);

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();
    if (!phone || !message) {
      return NextResponse.json({ error: "phone and message required" }, { status: 400 });
    }

    const to = phone.startsWith("+") ? phone : `+43${phone.replace(/^0+/, "")}`;

    if (!FROM) return NextResponse.json({ error: "TWILIO_FROM not set" }, { status: 500 });

    // Prevent sending to same number
    if (FROM === to) {
      return NextResponse.json({ error: "'From' must not equal 'To' — set TWILIO_FROM to a Twilio number or Messaging Service SID" }, { status: 400 });
    }

    const params: any = { body: message, to };
    if (FROM.startsWith("MG")) params.messagingServiceSid = FROM;
    else params.from = FROM;

    const msg = await client.messages.create(params);
    return NextResponse.json({ ok: true, sid: msg.sid });
  } catch (err: any) {
    console.error("send-sms error", err);
    // Twilio error payload has more info — forward best info
    const message = err?.message ?? "unknown";
    const code = err?.code ?? undefined;
    return NextResponse.json({ error: message, code }, { status: 500 });
  }
}
