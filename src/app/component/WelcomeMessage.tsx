"use client";

import { useEffect, useState } from "react";

export default function WelcomeMessage() {
  const [visible, setVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Deterministic pseudo-random generator based on index to avoid
  // hydration mismatches between server and client.
  const pseudoRandom = (n: number) => {
    // constants chosen to produce a varied fractional output
    const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  const stars = Array.from({ length: 50 }).map((_, i) => {
    const top = `${(pseudoRandom(i * 7 + 1) * 100).toFixed(3)}%`; // đổi 6 -> 3
    const left = `${(pseudoRandom(i * 11 + 3) * 100).toFixed(3)}%`; // đổi 6 -> 3
    const animationDelay = `${(pseudoRandom(i * 13 + 5) * 3).toFixed(3)}s`;
    const opacity = (pseudoRandom(i * 17 + 9) * 0.7 + 0.3).toFixed(3); // ép thành string
    return { top, left, animationDelay, opacity };
  });

  useEffect(() => {
    // Hiệu ứng xuất hiện nội dung sau một khoảng delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Ẩn toàn bộ component sau 5 giây
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative w-full h-full overflow-hidden">
        {/* Hiệu ứng nền sao */}
        <div className="absolute inset-0">
          {stars.map((s, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: s.top,
                left: s.left,
                animationDelay: s.animationDelay,
                opacity: s.opacity,
              }}
            ></div>
          ))}
        </div>

        {/* Nội dung chính */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <div className="text-center px-4">
            {/* Dòng chữ thứ nhất */}
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 transform transition-all duration-1000 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                textShadow:
                  "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
                fontFamily: "'Arial Black', sans-serif",
              }}
            >
              CHÀO MỪNG BẠN PHAM DŨNG
            </h2>

            {/* Dòng chữ thứ hai */}
            <h3
              className={`text-3xl md:text-4xl font-bold mb-8 transform transition-all duration-1000 delay-300 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                textShadow:
                  "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
                fontFamily: "'Arial Black', sans-serif",
              }}
            >
              ĐẾN TRÒ CHƠI TUNG ĐỒNG XU
            </h3>

            {/* Hiệu ứng particles xoay quanh */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 animate-spin-slow">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-yellow-400 rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${
                        i * 30
                      }deg) translate(110px) rotate(-${i * 30}deg)`,
                      animation: "pulse 2s infinite",
                      animationDelay: `${i * 0.2}s`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Đồng xu ở giữa */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-4 border-yellow-300 shadow-lg animate-pulse-gold">
                  <span className="text-2xl font-bold text-yellow-800">X</span>
                </div>
              </div>
            </div>

            {/* Dòng chữ gợi ý */}
            <p
              className={`text-xl md:text-2xl transform transition-all duration-1000 delay-700 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                textShadow: "0 0 5px rgba(255,255,255,0.5)",
              }}
            >
              Hãy thử vận may của bạn!
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-gold {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 215, 0, 0);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
            transform: scale(1);
          }
        }

        .animate-twinkle {
          animation: twinkle 3s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-pulse-gold {
          animation: pulse-gold 2s infinite;
        }
      `}</style>
    </div>
  );
}
