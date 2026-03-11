import React from 'react';

interface CosmosLogoProps {
  height?: number;
  className?: string;
  dotColor?: string;
  oColor?: string;
}

const GOLD = '#C9943A';

const CosmosLogo: React.FC<CosmosLogoProps> = ({ height = 90, className = '', dotColor = '#ffffff', oColor }) => {
  const oFill = oColor || GOLD;
  const dotStyle = {
    fill: 'none',
    stroke: dotColor,
    strokeWidth: 3.5,
    strokeDasharray: '0.1 5.8',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  // All letters: 44 tall, ~38-40 wide, spaced 54 apart
  const s = 54;
  const x = (i: number) => i * s;
  const cy = 22; // vertical center for all letters
  const oR = 20; // O radius → 40 wide × 40 tall, centered at 22

  return (
    <svg
      viewBox="-2 -2 334 84"
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cosmos Angré"
    >
      {/* C — circular arc, 44 tall */}
      <path
        d="M 37,5 A 22,22 0 1,0 37,39"
        transform={`translate(${x(0)},0)`}
        {...dotStyle}
      />

      {/* First O — circle outline, same height */}
      <circle cx={x(1) + 20} cy={cy} r={oR} fill="none" stroke={oFill} strokeWidth={2} />

      {/* S — 44 tall, ~38 wide */}
      <path
        d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36"
        transform={`translate(${x(2)},0)`}
        {...dotStyle}
      />

      {/* M — 44 tall, 40 wide */}
      <path
        d="M 0,44 L 0,0 L 20,26 L 40,0 L 40,44"
        transform={`translate(${x(3)},0)`}
        {...dotStyle}
      />

      {/* Second O — filled circle, same height */}
      <circle cx={x(4) + 20} cy={cy} r={oR} fill={oFill} />

      {/* S — same path */}
      <path
        d="M 34,8 C 32,2 26,0 19,0 C 10,0 1,4 1,12 C 1,19 9,22 19,22 C 29,22 37,25 37,33 C 37,40 30,44 21,44 C 15,44 5,42 2,36"
        transform={`translate(${x(5)},0)`}
        {...dotStyle}
      />

      {/* ANGRÉ — below, spanning from M to last S */}
      <text
        x={(x(3) + x(5) + 38) / 2}
        y={74}
        textAnchor="middle"
        fontFamily="'Inter', 'Helvetica Neue', sans-serif"
        fontSize={22}
        fontWeight={600}
        letterSpacing={10}
        fill={oFill}
      >
        ANGR&#xC9;
      </text>
    </svg>
  );
};

export default CosmosLogo;
