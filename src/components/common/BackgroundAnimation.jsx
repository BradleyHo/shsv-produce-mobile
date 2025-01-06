import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        {/* Simple vegetable outlines that fade in/out gently */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24"
            style={{
              top: `${20 + i * 25}%`,
              left: `${10 + i * 30}%`,
              animation: `gentle-fade ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            </svg>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes gentle-fade {
          0%, 100% { opacity: 0.01; transform: translateY(0); }
          50% { opacity: 0.03; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;