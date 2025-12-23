'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
  const params = useSearchParams();
  const id = params.get('id');

  const [values, setValues] = useState<string[]>(Array(6).fill(''));
  const [confirmed, setConfirmed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(i: number, v: string) {
    if (!/^\d?$/.test(v)) return;

    const next = [...values];
    next[i] = v;
    setValues(next);

    if (v && i < 5) {
      document.getElementById(`code-${i + 1}`)?.focus();
    }
  }

  async function handleConfirm() {
    if (!id || values.some(v => v === '') || loading) return;

    setLoading(true);
    const code = values.join('');

    const res = await fetch('/api/confirm-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, code }),
    });

    setLoading(false);
    if (res.ok) setConfirmed(true);
  }

  useEffect(() => {
    if (confirmed) {
      const t = setTimeout(() => setShowText(true), 2000);
      return () => clearTimeout(t);
    }
  }, [confirmed]);

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="bg-white w-[420px] px-10 py-8 shadow-2xl flex flex-col items-center">

        {!confirmed ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-medium text-black mb-1">
                Confirm your email
              </h2>
              <p className="text-sm text-black/60">
                You received the code in your email
              </p>
            </div>

            <div className="flex gap-3 mb-6">
              {values.map((v, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  value={v}
                  onChange={(e) => handleChange(i, e.target.value)}
                  className={`
                    w-12 h-14 text-xl text-center outline-none
                    font-bold text-black
                    border transition-all duration-300
                    ${v
                      ? 'border-transparent shadow-[0_0_12px_rgba(248,138,164,0.7)]'
                      : 'border-black/20'
                    }
                  `}
                />
              ))}
            </div>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-black text-white py-3 text-sm mb-3 disabled:opacity-40"
            >
              {loading ? 'Confirming…' : 'Confirm'}
            </button>

            <p className="text-xs text-black/70 text-center leading-relaxed mb-4">
              By entering the code, you confirm that you accept our Terms &
              Conditions and Privacy Policy.
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-6 mt-6 mb-6">

              {/* CIRCLE */}
              <div className="relative w-28 h-28">
                <svg
                  className="absolute inset-0 rotate-[-90deg]"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="#22c55e"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="289"
                    className="circle-anim"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {showText && (
                <>
                  <p className="text-3xl font-medium text-transparent bg-clip-text animate-gradient">
                    The World is yours
                  </p>

                  <a
                    href="https://buy.stripe.com/test_6oU00i4SkggNbn343tgIo01"
                    className="mt-4"
                  >
                    <span
                      style={{
                        background:
                          'linear-gradient(90deg,#39E34D 0%,#77DB30 50%,#52E3B3 100%)',
                      }}
                      className="px-8 py-3 text-sm font-semibold text-black rounded-full hover:opacity-90 transition"
                    >
                      START NOW
                    </span>
                  </a>
                </>
              )}
            </div>
          </>
        )}

        <div className="text-xs text-black/40">
          © 2025 ÖMZ-Group. All rights reserved.
        </div>
      </div>

      {/* 🔒 SSR-SAFE CSS */}
      <style jsx>{`
        .circle-anim {
          stroke-dashoffset: 289;
          animation: circle 2s linear forwards;
        }

        @keyframes circle {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-gradient {
          background-image: linear-gradient(
            270deg,
            #ffa6bf,
            #f88aa4,
            #623f6a,
            #715289
          );
          background-size: 600% 600%;
          animation: gradientMove 6s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
