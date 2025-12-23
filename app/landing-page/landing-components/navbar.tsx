'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function LandingNavbar() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const setFromUser = (nextUser: User | null) => {
      if (!isMounted) return;
      setUser(nextUser);
      if (nextUser) {
        const name = nextUser.user_metadata?.username || nextUser.email?.split('@')[0] || null;
        setUsername(name);
      } else {
        setUsername(null);
      }
    };

    // Get current session + user
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setFromUser(session.user);
      }

      const { data: { user: fetchedUser } } = await supabase.auth.getUser();
      setFromUser(fetchedUser ?? session?.user ?? null);
      setLoadingUser(false);
    };

    loadSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setFromUser(session.user);
      } else {
        setFromUser(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const maskedId = user?.id ? `${user.id.slice(0, 4)}...${user.id.slice(-4)}` : null;

  return (
    <nav className="w-full bg-black border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/home" className="cursor-pointer">
          <Image src="/omz-group-logo.svg" alt="ÖMZ Group" width={40} height={40} priority />
        </Link>
      </div>
      
      {/* Screen Dimensions - Center */}
      {/* <div className="absolute left-1/2 transform -translate-x-1/2 text-white/60 text-xs font-mono">
        {dimensions.width}px × {dimensions.height}px
      </div> */}

      <div className="flex items-center gap-4 relative">
        {username ? (
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white/80 text-sm hover:text-white transition"
          >
            {username}
          </button>
        ) : (
          <Link href="/partner-login" className="text-white/80 text-sm hover:text-white transition">
            Partner Login
          </Link>
        )}
        <button
          onClick={() => setShowWaitlist(true)}
          className="bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition rounded-lg"
        >
          Join the waitlist
        </button>

        {menuOpen && username && (
          <div className="absolute top-[110%] right-0 bg-black text-white rounded-2xl shadow-lg border border-white/10 min-w-[220px] px-4 py-3 z-50">
            <div className="text-xs text-gray-300 mb-2">
              UID: {maskedId ?? '—'}
            </div>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setMenuOpen(false);
                setUser(null);
                setUsername(null);
                router.push('/landing-page');
              }}
              className="w-full bg-white text-black border border-white/10 rounded-xl px-3 py-2 text-sm font-medium hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showWaitlist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowWaitlist(false)} />
          <div className="relative z-10 w-full max-w-2xl px-6">
            <div className="bg-[#0b0b0b] text-white rounded-2xl shadow-2xl border border-white/10 p-6 md:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Join the waitlist</h2>
                  <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                    By submitting this information, you will be included in our waitlist. Once ready, we will promptly contact you to initiate the setup process.
                  </p>
                </div>
                <button
                  onClick={() => setShowWaitlist(false)}
                  className="text-gray-400 hover:text-white transition ml-4"
                  aria-label="Close waitlist modal"
                >
                  ×
                </button>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowWaitlist(false);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">First name</label>
                    <input
                      placeholder="Ava"
                      className="w-full rounded-md bg-[#111] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Last name</label>
                    <input
                      placeholder="Davis"
                      className="w-full rounded-md bg-[#111] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Company email</label>
                  <input
                    type="email"
                    placeholder="ava@example.com"
                    className="w-full rounded-md bg-[#111] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">
                    Do you have a live docs website? <span className="text-gray-500 text-xs">If so, please indicate below</span>
                  </label>
                  <input
                    placeholder="docs.example.com"
                    className="w-full rounded-md bg-[#111] border border-gray-800 text-white px-3 py-2 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-300">Are there content writers on your team?</p>
                  <div className="flex items-center gap-4 text-sm text-gray-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="writers" className="form-radio" />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="writers" className="form-radio" />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black rounded-md py-3 font-medium hover:bg-gray-100 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

