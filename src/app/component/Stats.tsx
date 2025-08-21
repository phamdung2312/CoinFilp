"use client";

import { FlipStats, HistoryItem } from "../types";

interface StatsProps {
  stats: FlipStats;
  history: HistoryItem[];
}

export default function Stats({ stats, history }: StatsProps) {
  const total = history.length;
  const headsPercentage =
    total > 0 ? Math.round((stats.heads / total) * 100) : 0;
  const tailsPercentage =
    total > 0 ? Math.round((stats.tails / total) * 100) : 0;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-xl font-bold text-purple-800 mb-4">Thống kê</h3>
      <div className="flex justify-between mb-2">
        <div className="text-green-600 font-semibold">Sấp: {stats.heads}</div>
        <div className="text-blue-600 font-semibold">Ngửa: {stats.tails}</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: total > 0 ? `${(stats.heads / total) * 100}%` : "0%",
          }}
        ></div>
      </div>
      <div className="text-sm text-gray-600">
        Tổng số lần tung: {total} • Sấp: {headsPercentage}% • Ngửa:{" "}
        {tailsPercentage}%
      </div>
    </div>
  );
}
