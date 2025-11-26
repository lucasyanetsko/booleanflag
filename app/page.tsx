"use client";

import { useEffect, useRef, useState } from "react";

function speakBooleanFlag(voice?: SpeechSynthesisVoice | null) {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  // Cancel anything already queued so rapid clicks feel snappy
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance("boolean flag");
  utterance.rate = 1.1;
  utterance.pitch = 1.0;

  if (voice) {
    utterance.voice = voice;
  }

  synth.speak(utterance);
}

function RubberChickens() {
  const count = 14;
  const chickens = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      <style jsx global>{`
        @keyframes chicken-fall {
          0% {
            transform: translate3d(0, -120%, 0) rotate(-10deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 120vh, 0) rotate(18deg);
            opacity: 0;
          }
        }

        .rubber-chicken {
          position: fixed;
          top: -80px;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0 10px 12px rgba(15, 23, 42, 0.35));
          animation-name: chicken-fall;
          animation-timing-function: cubic-bezier(0.4, 0.7, 0.2, 1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }
      `}</style>
      {chickens.map((i) => {
        const left = (i / count) * 100;
        const delay = (i * 0.7) % 6;
        const duration = 7 + (i % 4);
        const scale = 0.7 + ((i % 3) * 0.15);

        return (
          <span
            key={i}
            className="rubber-chicken"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              transformOrigin: "50% 0%",
              fontSize: `${40 * scale}px`,
            }}
            aria-hidden="true"
          >
            🐔
          </span>
        );
      })}
    </>
  );
}

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;

    const pickVoice = () => {
      const voices = synth.getVoices();
      if (!voices || voices.length === 0) return;

      const lowerIncludes = (str: string, match: string) =>
        str.toLowerCase().includes(match);

      const australian =
        voices.find(
          (v) =>
            lowerIncludes(v.lang || "", "en-au") ||
            lowerIncludes(v.name || "", "australia"),
        ) || null;

      const englishFallback =
        voices.find((v) =>
          (v.lang || "").toLowerCase().startsWith("en-"),
        ) || voices[0];

      setVoice(australian || englishFallback || null);
    };

    pickVoice();
    synth.addEventListener("voiceschanged", pickVoice);

    return () => synth.removeEventListener("voiceschanged", pickVoice);
  }, []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        el.click();
      }
    };

    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, []);

  const handleClick = () => {
    setClicks((c) => c + 1);
    speakBooleanFlag(voice);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #f5fff9 0, #e0ffe9 45%, #c7f5ff 100%)",
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#022c22",
        padding: "32px 16px",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 2,
      }}
    >
      <RubberChickens />
      <h1
        style={{
          marginBottom: 32,
          fontSize: "clamp(32px, 4vw, 40px)",
          letterSpacing: 0.03,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background:
              "conic-gradient(from 160deg, #10b981, #22c55e, #a3e635, #22c55e, #10b981)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 4px rgba(34,197,94,0.18)",
          }}
        >
          <span style={{ fontSize: 18 }}>◎</span>
        </span>
        Boolean Flag
      </h1>

      <p
        style={{
          marginBottom: 40,
          maxWidth: 520,
          textAlign: "center",
          fontSize: 16,
          lineHeight: 1.5,
          color: "#064e3b",
        }}
      >
        Tap the flag and let your browser chant <strong>“boolean flag”</strong> on
        every click. Turn a simple boolean into a tiny ritual.
      </p>

      <button
        ref={btnRef}
        onClick={handleClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
        onMouseEnter={() => setIsHover(true)}
        onBlur={() => setIsHover(false)}
        style={{
          position: "relative",
          border: "none",
          cursor: "pointer",
          padding: 0,
          background: "transparent",
          outline: "none",
        }}
        aria-label="Boolean flag button that says boolean flag when clicked"
      >
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: "999px",
            backgroundColor: "#ecfdf5",
            boxShadow: isActive
              ? "0 14px 40px rgba(4,120,87,0.35) inset"
              : "0 24px 70px rgba(15,118,110,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: isActive
              ? "translateY(4px) scale(0.97)"
              : isHover
              ? "translateY(-2px) scale(1.02)"
              : "translateY(0) scale(1)",
            transition:
              "transform 150ms cubic-bezier(0.2, 0.7, 0.4, 1), box-shadow 150ms ease, background-color 150ms ease",
          }}
        >
          <div
            style={{
              width: 200,
              height: 130,
              borderRadius: 999,
              background:
                "linear-gradient(135deg, #0f766e 0%, #22c55e 40%, #a3e635 100%)",
              boxShadow:
                "0 12px 30px rgba(15,118,110,0.65), 0 0 0 1px rgba(240,253,250,0.9) inset",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: -40,
                right: -40,
                top: -60,
                bottom: -60,
                opacity: 0.45,
                background:
                  "radial-gradient(circle at 0% 0%, rgba(240,253,250,0.92) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(34,197,94,0.5) 0, transparent 55%)",
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 1,
                fontWeight: 800,
                letterSpacing: 0.15,
                textTransform: "uppercase",
                fontSize: 26,
                color: "#ecfdf5",
                textShadow:
                  "0 2px 4px rgba(15,23,42,0.45), 0 0 18px rgba(16,185,129,0.9)",
              }}
            >
              boolean
              <span style={{ opacity: 0.75 }}> flag</span>
            </span>
          </div>
        </div>
      </button>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
          color: "#047857",
          fontSize: 14,
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            borderRadius: 999,
            backgroundColor: "rgba(240,253,250,0.9)",
            boxShadow: "0 10px 30px rgba(15,118,110,0.12)",
            border: "1px solid rgba(52,211,153,0.6)",
          }}
        >
          <strong style={{ fontWeight: 700 }}>Clicks</strong>: {clicks}
        </div>
        <span style={{ opacity: 0.7 }}>Your browser might ask to use speech.</span>
      </div>

      <footer
        style={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          fontSize: 12,
          color: "rgba(15,118,110,0.75)",
        }}
      >
        <span style={{ pointerEvents: "auto" }}>
          Built for fun, inspired by the lizard button.
        </span>
      </footer>
    </main>
  );
}
