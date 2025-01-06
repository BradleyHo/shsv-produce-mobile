import React from 'react';

const ProduceIcon = ({ path, color, delay }) => (
  <div 
    className={`absolute animate-float opacity-20`}
    style={{
      animation: `float 3s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      {path}
    </svg>
  </div>
);

const HeaderAnimations = () => {
  const produceItems = [
    {
      path: "M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 0 0-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8-3.582-8-8-8zm0 2c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z",
      color: "#ff6b6b",
      positions: [
        { top: '10%', left: '5%', delay: 0 },
        { top: '20%', right: '10%', delay: 1 },
      ]
    },
    {
      path: "M7 3h10l5 5v10l-5 5H7l-5-5V8z",
      color: "#51cf66",
      positions: [
        { top: '15%', left: '15%', delay: 0.5 },
        { top: '25%', right: '15%', delay: 1.5 },
      ]
    },
    // Add more produce shapes as needed
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {produceItems.map((item, itemIndex) => (
        item.positions.map((pos, posIndex) => (
          <div
            key={`${itemIndex}-${posIndex}`}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
            }}
          >
            <ProduceIcon 
              path={item.path}
              color={item.color}
              delay={pos.delay}
            />
          </div>
        ))
      ))}
    </div>
  );
};

export default HeaderAnimations;