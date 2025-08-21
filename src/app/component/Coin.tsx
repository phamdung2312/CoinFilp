"use client";

import { useEffect, useState } from "react";
import { FlipResult } from "../types";

interface CoinProps {
  isFlipping: boolean;
  result: FlipResult | null;
  onClick: () => void;
}

export default function Coin({ isFlipping, result, onClick }: CoinProps) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isFlipping) {
      setShowResult(false);
    } else if (result) {
      const timer = setTimeout(() => setShowResult(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isFlipping, result]);

  return (
    <div className="relative w-48 h-48 mb-8 cursor-pointer" onClick={onClick}>
      <div
        className={`relative w-full h-full preserve-3d ${
          isFlipping ? "animate-rotate" : ""
        } ${showResult && result === "tails" ? "animate-rotate-to-tails" : ""}`}
      >
        <div className="absolute w-full h-full rounded-full backface-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center border-8 border-yellow-600 shadow-xl">
          <span className="text-6xl font-bold text-yellow-800 drop-shadow-md">
            S
          </span>
        </div>
        <div className="absolute w-full h-full rounded-full backface-hidden rotate-y-180 bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center border-8 border-yellow-600 shadow-xl">
          <span className="text-6xl font-bold text-yellow-800 drop-shadow-md">
            N
          </span>
        </div>
      </div>

      {/* Hiệu ứng ánh sáng */}
      <div
        className={`absolute inset-0 rounded-full bg-white opacity-0 ${
          isFlipping ? "animate-shine" : ""
        }`}
      ></div>
    </div>
  );
}
