'use client';

type Props = {
  onExploreClick?: () => void;
};

export default function TopBanner({ onExploreClick }: Props) {
  return (
    <div className="w-full py-2.5 px-6 flex items-center justify-center relative">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #fea6bd 0%, #f07389 25%, #62406c 75%, #715289 100%)',
        }}
      />
      
      {/* Content - Centered */}
      <div className="relative z-10 flex items-center gap-4">
        <span className="text-white text-sm">
          Switch electricity and gas through our Multi Level Marketing ecosystem
        </span>
        <button
          onClick={() => onExploreClick?.()}
          className="bg-black text-white px-4 py-1.5 text-sm font-medium hover:opacity-90 transition flex items-center gap-1"
        >
          Explore our Ecosystem
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

