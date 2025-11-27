"use client";

import { useMemo } from "react";

export function ProgressRing({
  value = 50,
  size = 40,
  stroke = 3,
}: {
  value?: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = useMemo(
    () => circumference - (value / 100) * circumference,
    [circumference, value]
  );

  return (
    <svg width={size} height={size} className='inline-block'>
      <defs>
        <linearGradient id='ringGrad' x1='0' x2='1'>
          <stop offset='0%' stopColor='#06B6D4' stopOpacity='1' />
          <stop offset='100%' stopColor='#8B5CF6' stopOpacity='1' />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        stroke='rgba(255,255,255,0.06)'
        fill='transparent'
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        stroke='url(#ringGrad)'
        strokeLinecap='round'
        fill='transparent'
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset: offset,
          transition: "stroke-dashoffset 300ms ease",
        }}
      />
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='central'
        className='text-xs font-mono text-white/70'
        style={{ fontSize: size * 0.28 }}
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}
