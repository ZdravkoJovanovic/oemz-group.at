'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    const evaluate = async (user: { id: string; user_metadata?: Record<string, any> } | null) => {
      if (!active) return;
      if (!user) {
        setAllowed(false);
        setChecked(true);
        router.replace('/landing-page');
        return;
      }

      const metaAdmin = user.user_metadata?.admin === true;
      if (metaAdmin) {
        setAllowed(true);
        setChecked(true);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('is_admin')
        .eq('user_id', user.id)
        .maybeSingle();

      const tableAdmin = data?.is_admin === true;
      if (error || !tableAdmin) {
        setAllowed(false);
        setChecked(true);
        router.replace('/landing-page');
      } else {
        setAllowed(true);
        setChecked(true);
      }
    };

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await evaluate(session?.user ?? null);
    };

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await evaluate(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!checked || !allowed) return null;
  return <>{children}</>;
}


