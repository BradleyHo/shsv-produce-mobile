import React from 'react';

const ProduceAnimations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating produce SVG animations */}
      <svg className="absolute w-full h-full">
        <defs>
          {/* Apple */}
          <path id="apple" d="M15,5 C15,5 17,2 21,2 C25,2 27,5 27,5 C27,5 30,3 33,5 C36,7 35,11 35,11 L33,28 C32,32 28,35 24,35 C20,35 16,32 15,28 L13,11 C13,11 12,7 15,5" />
          
          {/* Carrot */}
          <path id="carrot" d="M20,2 C18,2 16,3 15,5 L5,35 C4,37 5,40 7,40 C9,40 10,38 11,36 L21,6 C22,4 21,2 20,2" />
          
          {/* Broccoli */}
          <g id="broccoli">
            <circle cx="20" cy="15" r="10" />
            <circle cx="15" cy="12" r="6" />
            <circle cx="25" cy="12" r="6" />
            <rect x="18" y="25" width="4" height="15" />
          </g>
        </defs>

        {/* Animation instances */}
        {[...Array(5)].map((_, i) => (
          <g key={i} className={`animate-float-${i + 1}`}>
            <use 
              href="#apple" 
              fill="#ff6b6b" 
              transform={`translate(${i * 100}, 0) scale(0.5)`}
              className="animate-bounce"
            />
            <use 
              href="#carrot" 
              fill="#ffa94d" 
              transform={`translate(${50 + i * 100}, 50) scale(0.5)`}
              className="animate-bounce"
            />
            <use 
              href="#broccoli" 
              fill="#51cf66" 
              transform={`translate(${100 + i * 100}, 100) scale(0.5)`}
              className="animate-bounce"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default ProduceAnimations;