"use client";

import { useEffect, useRef, useState } from "react";

function speakBooleanFlag() {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  // Cancel anything already queued so rapid clicks feel snappy
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance("boolean flag");
  utterance.rate = 1.1;
  utterance.pitch = 1.0;

  synth.speak(utterance);
}

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

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
    speakBooleanFlag();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #f5fff9 0, #e0ffe9 45%, #c7f5ff 100%)",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
        color: "#022c22",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
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
