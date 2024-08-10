"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";
interface CircularProgressBarProps {
  size: number;
  solved: number;
  total: number;
  strokeWidth: number;
}

export function AnimatedCircularProgressBarDemo({ size, solved, total, strokeWidth }:any) {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (solved / total) * 100;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        stroke="#00aaff"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={center}
        cy={center}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text

        x={center}
        y={center}
        textAnchor="middle"
        dy=".3em"
        fontSize="1em"
        fill="red"
      >
        {`${solved}/${total}`}
      </text>
    </svg>
  );
}

export default AnimatedCircularProgressBarDemo;
