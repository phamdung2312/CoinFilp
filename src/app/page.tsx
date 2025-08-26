"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { FlipResult, FlipStats, HistoryItem } from "./types";
import Coin from "./component/Coin";
import Controls from "./component/Controls";
import Stats from "./component/Stats";
import History from "./component/History";
import MultiFlip from "./component/MultiFlip";
import WelcomeMessage from "./component/WelcomeMessage";

export default function CoinFlip() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<FlipResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState<FlipStats>({ heads: 0, tails: 0 });
  const [flipCount, setFlipCount] = useState(10);
  const [showMultiResults, setShowMultiResults] = useState(false);
  const [multiResults, setMultiResults] = useState<FlipResult[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const flipCoin = (count = 1) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);
    const results: FlipResult[] = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.random() > 0.5 ? "heads" : "tails");
    }
    setTimeout(
      () => {
        if (count === 1) {
          setResult(results[0]);
        } else {
          setMultiResults(results);
          setShowMultiResults(true);
        }
        setIsFlipping(false);
        const newResults: HistoryItem[] = results.map((result) => ({
          result,
          time: new Date(),
        }));
        const newHistory = [...newResults, ...history];
        setHistory(newHistory);
        setStats({
          heads: newHistory.filter((item) => item.result === "heads").length,
          tails: newHistory.filter((item) => item.result === "tails").length,
        });
      },
      count === 1 ? 3000 : 1000
    );
  };

  const handleMultiFlip = () => {
    if (flipCount > 0 && flipCount <= 500) {
      flipCoin(flipCount);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setStats({ heads: 0, tails: 0 });
    setResult(null);
    setShowMultiResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Tung Đồng Xu</title>
        <meta name="description" content="Mô phỏng tung đồng xu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showWelcome && <WelcomeMessage />}
      <main className="flex flex-col items-center justify-center w-full max-w-md flex-1 text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-6 animate-pulse">
          Tung Đồng Xu
        </h1>
        <Coin
          isFlipping={isFlipping}
          result={result}
          onClick={() => flipCoin(1)}
        />
        {result && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md mb-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-purple-800">
              Kết quả: {result === "heads" ? "Mặt SẤP" : "Mặt NGỬA"}
            </h2>
          </div>
        )}
        <Controls
          isFlipping={isFlipping}
          onFlip={flipCoin}
          onMultiFlip={handleMultiFlip}
          flipCount={flipCount}
          setFlipCount={setFlipCount}
          onClearHistory={clearHistory}
        />
        <Stats stats={stats} history={history} />
        <History history={history} />
      </main>
      <style jsx global>{`
        @keyframes rotate {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(1800deg);
          }
        }
        @keyframes rotate-to-tails {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }
        @keyframes shine {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulse-once {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: white;
          }
        }
        .animate-rotate {
          animation: rotate 3s cubic-bezier(0.4, 2.5, 0.6, 0.5) forwards;
        }
        .animate-rotate-to-tails {
          animation: rotate-to-tails 0.5s ease-out forwards;
        }
        .animate-shine {
          animation: shine 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
        .animate-pulse-once {
          animation: pulse-once 0.3s ease-out;
        }
        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end),
            blink-caret 0.75s step-end infinite;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
