"use client";

interface ControlsProps {
  isFlipping: boolean;
  onFlip: (count: number) => void;
  onMultiFlip: (count: number) => void;
  flipCount: number;
  setFlipCount: (count: number) => void;
  onClearHistory: () => void;
}

export default function Controls({
  isFlipping,
  onFlip,
  onMultiFlip,
  flipCount,
  setFlipCount,
  onClearHistory,
}: ControlsProps) {
  return (
    <div className="flex flex-col gap-4 w-full mb-6">
      <button
        onClick={() => onFlip(1)}
        disabled={isFlipping}
        className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
          isFlipping
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-xl"
        }`}
      >
        {isFlipping ? "Đang tung..." : "TUNG 1 LẦN"}
      </button>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">
          Xóc nhiều lần
        </h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="range"
            min="1"
            max="500"
            value={flipCount}
            onChange={(e) => setFlipCount(parseInt(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            disabled={isFlipping}
          />
          <span className="w-16 px-2 py-1 bg-purple-100 text-purple-800 font-bold rounded-md">
            {flipCount}
          </span>
        </div>
        <button
          onClick={() => onMultiFlip(flipCount)}
          disabled={isFlipping || flipCount < 1}
          className={`w-full px-4 py-2 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isFlipping || flipCount < 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
          }`}
        >
          XÓC {flipCount} LẦN
        </button>
      </div>

      <button
        onClick={onClearHistory}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors transform hover:scale-105"
      >
        XÓA LỊCH SỬ
      </button>
    </div>
  );
}
