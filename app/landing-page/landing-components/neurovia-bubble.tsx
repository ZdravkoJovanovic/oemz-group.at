'use client';

export default function NeuroviaBubble() {
  return (
    <div className="bubble">
      <span className="text">Let me handle the paperwork.</span>
      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: 18%;
          left: 8%;
          color: #ffffff;
          padding: 14px 18px;
          border-radius: 14px 18px 16px 16px;
          max-width: 220px;
          font-size: 14px;
          line-height: 1.4;
          background:
            linear-gradient(#050505, #050505) padding-box,
            linear-gradient(135deg, #f9c4e8, #d9b3ff, #8ad4ff, #63c4ff) border-box;
          border: 2px solid transparent;
          box-shadow:
            0 8px 18px rgba(5, 5, 5, 0.45),
            0 0 12px rgba(5, 5, 5, 0.28);
          animation: bob 6s ease-in-out infinite;
        }

        .text {
          display: block;
          font-family: var(--font-geist-sans);
        }

        .bubble::after {
          content: '';
          position: absolute;
          right: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 22px;
          background:
            linear-gradient(#050505, #050505) padding-box,
            linear-gradient(135deg, #f9c4e8, #d9b3ff, #8ad4ff, #63c4ff) border-box;
          border: 2px solid transparent;
          clip-path: polygon(0 0, 100% 50%, 0 100%);
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25));
        }

        @keyframes bob {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-0.5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}

