"use client";

import { useState, useEffect } from "react";
import { FlipResult } from "../types";

interface MultiFlipProps {
  results: FlipResult[];
  isVisible: boolean;
  onClose: () => void;
}

export default function MultiFlip({
  results,
  isVisible,
  onClose,
}: MultiFlipProps) {
  const [visibleResults, setVisibleResults] = useState<FlipResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isVisible && results.length > 0) {
      setVisibleResults([]);
      setCurrentIndex(0);

      const interval = setInterval(() => {
        if (currentIndex < results.length) {
          setVisibleResults((prev) => [...prev, results[currentIndex]]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 50); // Tốc độ hiển thị kết quả

      return () => clearInterval(interval);
    }
  }, [isVisible, results, currentIndex]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-purple-800">
            Kết quả xóc {results.length} lần
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-4 flex-grow">
          <div className="grid grid-cols-8 gap-2">
            {visibleResults.map((result, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold animate-bounce-in ${
                  result === "heads"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {result === "heads" ? "X" : "N"}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between text-sm">
            <span className="text-green-600 font-semibold">
              Sấp: {results.filter((r) => r === "heads").length}
            </span>
            <span className="text-blue-600 font-semibold">
              Ngửa: {results.filter((r) => r === "tails").length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
