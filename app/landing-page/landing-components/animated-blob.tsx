'use client';

export default function AnimatedBlob() {
  return (
    <div className="blob-wrapper">
      <div className="blob" />
      <style jsx>{`
        .blob-wrapper {
          position: relative;
          width: min(520px, 70vw);
          height: min(520px, 70vw);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .blob {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f9c4e8 0%, #d9b3ff 32%, #8ad4ff 68%, #63c4ff 100%);
          filter: blur(3px)
            drop-shadow(0 0 18px rgba(255, 255, 255, 0.24))
            drop-shadow(0 0 14px rgba(111, 207, 255, 0.2));
          animation: morph 16s ease-in-out infinite alternate, float 12s ease-in-out infinite;
          opacity: 0.9;
          box-shadow:
            inset 0 0 14px rgba(255, 255, 255, 0.28),
            inset 0 0 20px rgba(255, 255, 255, 0.14);
        }

        @keyframes morph {
          0% {
            border-radius: 50% 48% 52% 50%;
            transform: scale(1) rotate(0deg);
          }
          25% {
            border-radius: 52% 45% 55% 48%;
            transform: scale(1.04) rotate(3deg);
          }
          50% {
            border-radius: 48% 54% 50% 56%;
            transform: scale(0.99) rotate(-3deg);
          }
          75% {
            border-radius: 55% 50% 46% 52%;
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            border-radius: 50% 48% 52% 50%;
            transform: scale(1.01) rotate(-2deg);
          }
        }

        @keyframes float {
          0% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0px, -18px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

