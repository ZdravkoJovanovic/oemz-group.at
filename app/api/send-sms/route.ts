import { NextResponse } from "next/server";
import Twilio from "twilio";

const SID = process.env.TWILIO_ACCOUNT_SID!;
const TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const FROM = process.env.TWILIO_FROM!;

if (!SID || !TOKEN || !FROM) {
  console.warn("Missing TWILIO env vars");
}

const client = Twilio(SID, TOKEN);

export async function POST(req: Request) {
  try {
    const { phone, message } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ error: "phone and message required" }, { status: 400 });
    }

    // normalize: expect full international number (e.g. +43664xxxxxxx)
    const to = phone.startsWith("+") ? phone : `+43${phone.replace(/^0+/, "")}`;

    const msg = await client.messages.create({
      body: message,
      from: FROM,
      to,
    });

    return NextResponse.json({ ok: true, sid: msg.sid });
  } catch (err: any) {
    console.error("send-sms error", err);
    return NextResponse.json({ error: err.message || "unknown" }, { status: 500 });
  }
}
