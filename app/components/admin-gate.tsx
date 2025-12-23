'use client';

import { useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    const run = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      const isAdmin = user?.user_metadata?.admin === true;
      if (!active) return;
      if (!user || !isAdmin) {
        router.replace('/landing-page');
        return;
      }
      setChecked(true);
    };
    run();
    return () => { active = false; };
  }, [router]);

  if (!checked) return null;
  return <>{children}</>;
}

