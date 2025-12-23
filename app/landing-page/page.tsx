'use client';

import { useState } from 'react';
import TopBanner from './landing-components/top-banner';
import LandingNavbar from './landing-components/navbar';
import HeroSection from './landing-components/hero-section';
import AnimatedBlob from './landing-components/animated-blob';
import NeuroviaBubble from './landing-components/neurovia-bubble';

export default function LandingPage() {
  const [showEcosystemNotice, setShowEcosystemNotice] = useState(false);
  const dotPattern = `data:image/svg+xml,%3Csvg width='48' height='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='dot' x='0' y='0' width='48' height='48' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='24' cy='24' r='2' fill='rgba(255,255,255,0.18)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23dot)'/%3E%3C/svg%3E`;

  return (
    <div className="h-screen w-screen flex flex-col relative">
      {/* Top Banner with Gradient */}
      <TopBanner onExploreClick={() => setShowEcosystemNotice(true)} />
      
      {/* Navigation Bar */}
      <LandingNavbar />
      
      {/* Main Content Area - Black with Dots */}
      <div className="flex-1 bg-black relative flex">
        {/* Dot Pattern Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("${dotPattern}")`,
            backgroundSize: '56px 56px',
            opacity: 0.85,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />
        
        {/* Left Half - Hero Section */}
        <div className="w-[60%] relative z-10 flex justify-center items-center">
          <HeroSection />
        </div>
        
        {/* Right Half - Animated Blob */}
        <div className="w-[40%] relative z-10 flex items-center justify-center">
          <AnimatedBlob />
          <NeuroviaBubble />
        </div>
      </div>

      <style jsx global>{`
        body {
          background: #000000;
          overflow: hidden;
        }
      `}</style>

      {showEcosystemNotice && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
          <div className="bg-black text-white border border-white/10 rounded-2xl shadow-lg px-5 py-4 max-w-sm">
            <p className="text-sm leading-relaxed">
              Please join the waitlist first. Access to the ecosystem is granted after approval.
            </p>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowEcosystemNotice(false)}
                className="text-xs text-gray-300 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

