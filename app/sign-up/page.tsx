'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [showFeatures, setShowFeatures] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const router = useRouter();

  const features = [
    {
      title: 'Access to NEUROVIA AI',
      description: 'Increase your productivity and accelerate sales development.',
    },
    {
      title: 'First 2 MLM levels unlocked',
      description: 'Access the first two tiers of your multi-level marketing system.',
    },
    {
      title: 'Custom commission rates',
      description: 'Set your own commission percentages for your team members.',
    },
    {
      title: 'Automated workflows',
      description: 'Save time with MLM integrations and automated commissions.',
    },
    {
      title: 'Community support',
      description: 'Connect with partners worldwide for instant feedback and insights.',
    },
  ];

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
              Create your free account
            </h1>

            <p className="text-white/80 text-sm md:text-base leading-relaxed text-left" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Explore our core features for individuals and organizations.
            </p>

            <button
              onClick={() => setShowFeatures(!showFeatures)}
              className="flex items-center gap-2 text-white hover:text-white/80 transition text-sm text-left"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              See what's included
              <span className={`transition-transform duration-200 ${showFeatures ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
          </div>

          {showFeatures && (
            <div className="space-y-6 mt-6 max-w-2xl">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <path
                      d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                      fill="white"
                    />
                  </svg>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

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
        {/* Top Right - Sign In Link */}
        <div className="absolute top-6 right-6">
          <Link href="/partner-login" className="text-sm text-gray-600 hover:text-gray-900 transition" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Already Europe Partner? Sign in →
          </Link>
        </div>

        <div className="w-full max-w-sm px-8 py-6">
          <h1 className="text-2xl font-semibold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Sign up for ÖMZ Group
          </h1>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);

              // Validation
              if (!email || !password || !username) {
                setError('Please fill in all required fields');
                setLoading(false);
                return;
              }

              if (password.length < 8) {
                setError('Password must be at least 8 characters long');
                setLoading(false);
                return;
              }

              // Username validation
              const usernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
              if (!usernameRegex.test(username)) {
                setError('Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen');
                setLoading(false);
                return;
              }

              try {
                const { data, error: signUpError } = await supabase.auth.signUp({
                  email: email.trim(),
                  password: password,
                  options: {
                    data: {
                      username: username.trim(),
                      full_name: username.trim(),
                      display_name: username.trim(),
                    },
                    emailRedirectTo: `${window.location.origin}/landing-page`,
                  },
                });

                if (signUpError) {
                  throw signUpError;
                }

                // If Supabase is configured to require email confirmation, session may be null.
                // Attempt a direct sign-in to ensure we have a session and metadata available for the navbar.
                let authedUser = data.user;
                if (!data.session) {
                  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password,
                  });

                  if (signInError) {
                    throw signInError;
                  }

                  authedUser = signInData.user ?? authedUser;

                  // Ensure metadata persists after immediate sign-in
                  if (authedUser) {
                    await supabase.auth.updateUser({
                      data: {
                        username: username.trim(),
                        full_name: username.trim(),
                        display_name: username.trim(),
                      },
                    });
                  }
                }

                if (authedUser) {
                  // Success - redirect to landing page
                  router.push('/landing-page');
                } else {
                  setError('Failed to create account. Please try again.');
                }
              } catch (err: any) {
                console.error('Sign up error:', err);
                setError(err.message || 'An error occurred while creating your account');
              } finally {
                setLoading(false);
              }
            }}
            className="space-y-4"
          >
            {/* OAuth Buttons */}
            <button
              type="button"
              onClick={() => setShowServiceModal(true)}
              className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-900"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              onClick={() => setShowServiceModal(true)}
              className="w-full flex items-center justify-center gap-2.5 px-3 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition text-gray-900"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.156-.183-4.354 1.675-5.496 1.675zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.334.104 2.703-.688 3.559-1.701"/>
              </svg>
              Continue with Apple
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>or</span>
              </div>
            </div>

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
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              />
              <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter.
              </p>
            </div>

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Username<span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              />
              <p className="mt-1 text-xs text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
              </p>
            </div>

            {/* Email Preferences */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Email preferences
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  Receive occasional product updates and announcements
                </span>
              </label>
            </div>

            {error && (
              <div className="text-red-600 text-sm" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-4 py-2.5 rounded-md font-medium hover:bg-gray-800 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {loading ? 'Creating account...' : 'Create account'}
              {!loading && <span>→</span>}
            </button>

            <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              By creating an account, you agree to the{' '}
              <a
                href="#"
                className="hover:underline"
                style={{
                  background: 'linear-gradient(90deg, #fea6bd 0%, #f07389 25%, #62406c 75%, #715289 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Terms of Service
              </a>.
              For more information about ÖMZ Group's privacy practices, see the{' '}
              <a
                href="#"
                className="hover:underline"
                style={{
                  background: 'linear-gradient(90deg, #fea6bd 0%, #f07389 25%, #62406c 75%, #715289 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Privacy Statement
              </a>.
              We'll occasionally send you account-related emails.
            </p>
          </form>
        </div>
      </div>

      {/* Service Unavailable Modal */}
      {showServiceModal && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
          <div className="bg-black border border-gray-700 rounded-lg shadow-lg px-6 py-4 max-w-sm">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                This service is currently unavailable
              </p>
              <button
                onClick={() => setShowServiceModal(false)}
                className="text-gray-400 hover:text-white transition flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        body {
          background: #000000;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

