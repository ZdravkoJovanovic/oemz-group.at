'use client';

export default function CallToAction() {
  return (
    <div className="flex items-center gap-6">
      <h1 className="text-white text-4xl font-semibold">
        Switch electricity and gas through our Multi Level Marketing ecosystem
      </h1>
      <button className="bg-black text-white px-8 py-4 text-sm font-semibold hover:opacity-90 transition flex items-center gap-2">
        Explore our Ecosystem
        <span className="text-white">→</span>
      </button>
    </div>
  );
}

