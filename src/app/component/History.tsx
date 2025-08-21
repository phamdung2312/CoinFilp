"use client";

import { useState } from "react";
import { HistoryItem } from "../types";

interface HistoryProps {
  history: HistoryItem[];
}

export default function History({ history }: HistoryProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const currentItems = history.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  if (history.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-purple-800">
          Lịch sử tung đồng xu
        </h3>
        <span className="text-sm text-gray-500">{history.length} kết quả</span>
      </div>

      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-2">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-50">
            <tr>
              <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                STT
              </th>
              <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                Kết quả
              </th>
              <th className="py-2 px-3 text-left text-sm font-semibold text-gray-700">
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => {
              const globalIndex =
                history.length - ((page - 1) * itemsPerPage + index);
              return (
                <tr
                  key={globalIndex}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } transition-colors duration-200 hover:bg-purple-50`}
                >
                  <td className="py-2 px-3 text-sm text-gray-700">
                    {globalIndex}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold animate-pulse-once ${
                        item.result === "heads"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.result === "heads" ? "X" : "N"}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-sm text-gray-600">
                    {item.time.toLocaleTimeString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-md bg-purple-100 text-purple-800 disabled:opacity-50"
            >
              ←
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum =
                page <= 3
                  ? i + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + i
                  : page - 2 + i;

              if (pageNum > totalPages || pageNum < 1) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    page === pageNum
                      ? "bg-purple-600 text-white"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-md bg-purple-100 text-purple-800 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
