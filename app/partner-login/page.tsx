'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function PartnerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex">
      {/* Left Side - Black with subtle OMZ fade at bottom */}
      <div className="w-1/2 bg-black relative overflow-hidden">
        {/* Gradient Fade from Bottom - soft OMZ colors into black */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[65%]"
          style={{
            background:
              'linear-gradient(to top, rgba(250,166,189,0.35) 0%, rgba(240,115,137,0.35) 30%, rgba(98,64,108,0.35) 60%, rgba(0,0,0,0.7) 90%, #000 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center px-10 py-16">
          <div className="max-w-xl flex flex-col items-start gap-3">
            <h1 className="text-white text-3xl md:text-4xl font-semibold text-left" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Partner Login
            </h1>

            <p className="text-white/80 text-sm md:text-base leading-relaxed text-left" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Sign in to your partner account to access your dashboard and manage your network.
            </p>
          </div>

          {/* ÖMZ Logo - Bottom Right */}
          <div className="absolute bottom-6 right-6">
            <Link href="/landing-page" className="cursor-pointer">
              <Image src="/omz-group-logo.svg" alt="ÖMZ Group" width={120} height={120} />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Light White */}
      <div className="w-1/2 bg-white flex items-center justify-center relative">
        {/* Sign Up Link - Top Right */}
        <Link
          href="/sign-up"
          className="absolute top-6 right-6 text-sm text-gray-600 hover:text-gray-900 transition"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Don't have an account? Sign up →
        </Link>

        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Sign in to your account
          </h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setLoading(true);

              if (!email.trim()) {
                setError('Email is required');
                setLoading(false);
                return;
              }

              if (!password) {
                setError('Password is required');
                setLoading(false);
                return;
              }

              try {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                  email: email.trim(),
                  password: password,
                });

                if (signInError) {
                  throw signInError;
                }

                if (data.user) {
                  // Success - redirect to landing page
                  router.push('/landing-page');
                } else {
                  setError('Failed to sign in. Please try again.');
                }
              } catch (err: any) {
                console.error('Sign in error:', err);
                setError(err.message || 'An error occurred while signing in');
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Password<span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-4 py-2.5 rounded-md hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        body {
          background: #000000;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

