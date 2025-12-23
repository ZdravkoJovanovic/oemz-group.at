import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { id, code } = await req.json();

    if (!id || !code) {
      return NextResponse.json(
        { error: 'Missing id or code' },
        { status: 400 }
      );
    }

    /* ============================
       FETCH MEMBER
    ============================ */
    const { data: member, error: fetchError } = await supabase
      .from('team_members')
      .select('confirmation_code, email_confirmed')
      .eq('id', id)
      .single();

    if (fetchError || !member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    if (member.email_confirmed) {
      return NextResponse.json(
        { error: 'Email already confirmed' },
        { status: 400 }
      );
    }

    if (member.confirmation_code !== code) {
      return NextResponse.json(
        { error: 'Invalid confirmation code' },
        { status: 401 }
      );
    }

    /* ============================
       UPDATE MEMBER
    ============================ */
    const { error: updateError } = await supabase
      .from('team_members')
      .update({
        email_confirmed: true,
        confirmation_code: null,
      })
      .eq('id', id);

    if (updateError) {
      return NextResponse.json(
        { error: 'Update failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ confirm-mail error:', err);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
