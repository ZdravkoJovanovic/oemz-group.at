'use client';

export default function HeroSection() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-start px-12 lg:px-20">
      <div className="flex flex-col gap-8 max-w-3xl">
        {/* Headline */}
        <h1
          className="text-white text-6xl lg:text-7xl font-bold leading-tight"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Your fastest path
          <br />
          to recurring sales
        </h1>

        {/* Sub-headline */}
        <p
          className="text-white/80 text-lg lg:text-xl max-w-2xl"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          Launch a performance-driven network for utilities, insurance, telecom or loans. NEUROVIA, our in-house AI co-pilot, accelerates onboarding, product switching and payouts so your teams can sell and scale faster.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <a
            href="/sign-up"
            className="bg-white text-black px-7 py-4 text-base font-medium hover:opacity-90 transition flex items-center gap-2 rounded"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            Get Started for Free
            <span className="pixel-arrow" aria-hidden="true" />
          </a>
        </div>
      </div>
      <style jsx>{`
        .pixel-arrow {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: currentColor;
          box-shadow:
            6px 0 0 currentColor,
            10px 0 0 currentColor,
            6px -4px 0 currentColor,
            6px 4px 0 currentColor,
            10px -4px 0 currentColor,
            10px 4px 0 currentColor,
            14px 0 0 currentColor;
        }
      `}</style>
    </div>
  );
}

