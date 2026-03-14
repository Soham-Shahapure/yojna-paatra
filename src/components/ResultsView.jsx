import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle, Frown, RotateCcw } from "lucide-react";

// ── Leaf canvas for diagonal transition ──────────────────────────────────────
function createLeafCanvas(color = "#FF9933") {
  const c = document.createElement("canvas");
  c.width = 48; c.height = 62;
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(24, 60);
  ctx.bezierCurveTo(24, 60, 3, 45, 3, 26);
  ctx.bezierCurveTo(3, 11, 12, 1, 24, 1);
  ctx.bezierCurveTo(36, 1, 45, 11, 45, 26);
  ctx.bezierCurveTo(45, 45, 24, 60, 24, 60);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(24, 60); ctx.lineTo(24, 1);
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 28); ctx.bezierCurveTo(16, 22, 8, 20, 3, 20);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 38); ctx.bezierCurveTo(32, 32, 40, 30, 45, 30);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth = 1; ctx.stroke();
  return c;
}

// ── Diagonal leaf overlay canvas ─────────────────────────────────────────────
function DiagonalLeaf({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    const leafImg = createLeafCanvas("#FF9933");

    // leaf starts top-left, flies to bottom-right
    let x = -60, y = -80;
    const targetX = W + 80, targetY = H + 100;
    const totalDist = Math.hypot(targetX - x, targetY - y);
    let progress = 0;
    let rotation = -0.6;
    let alpha = 0;
    let scale = 2.2;
    let animId;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      progress += 0.022;

      // ease in-out cubic
      const t = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      x = -60 + t * (targetX + 60);
      y = -80 + t * (targetY + 80);
      rotation += 0.055;
      scale = 2.2 + t * 1.2;

      // fade in then out
      if (progress < 0.15) alpha = progress / 0.15;
      else if (progress > 0.75) alpha = 1 - (progress - 0.75) / 0.25;
      else alpha = 1;

      // motion blur trail — draw 4 ghost leaves behind
      for (let i = 3; i >= 1; i--) {
        const trailT = Math.max(0, t - i * 0.03);
        const tx = -60 + trailT * (targetX + 60);
        const ty = -80 + trailT * (targetY + 80);
        ctx.save();
        ctx.globalAlpha = (alpha * (0.15 - i * 0.04));
        ctx.translate(tx, ty);
        ctx.rotate(rotation - i * 0.06);
        ctx.scale(scale * 0.95, scale * 0.95);
        ctx.drawImage(leafImg, -24, -31);
        ctx.restore();
      }

      // main leaf
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.drawImage(leafImg, -24, -31);
      ctx.restore();

      if (progress >= 1) {
        cancelAnimationFrame(animId);
        onDone();
        return;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [onDone]);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      pointerEvents: "none", width: "100%", height: "100%",
    }} />
  );
}

// ── Mini wheat SVG ────────────────────────────────────────────────────────────
const MiniWheat = ({ style }) => (
  <svg viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M15 56 Q14 40 15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="15" cy="7"  rx="4" ry="6.5" fill="currentColor" opacity="0.9" transform="rotate(-10 15 7)"/>
    <ellipse cx="10" cy="18" rx="3.5" ry="6" fill="currentColor" opacity="0.7" transform="rotate(-28 10 18)"/>
    <ellipse cx="20" cy="18" rx="3.5" ry="6" fill="currentColor" opacity="0.7" transform="rotate(28 20 18)"/>
    <ellipse cx="9"  cy="29" rx="3" ry="5"   fill="currentColor" opacity="0.5" transform="rotate(-22 9 29)"/>
    <ellipse cx="21" cy="29" rx="3" ry="5"   fill="currentColor" opacity="0.5" transform="rotate(22 21 29)"/>
  </svg>
);

// ── Scheme card ───────────────────────────────────────────────────────────────
function SchemeCard({ scheme, onViewDetails, language, index, triggerLeaf }) {
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isMarathi = language === "mr";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150 + index * 160);
    return () => clearTimeout(t);
  }, [index]);

  const handleClick = () => {
    setPressed(true);
    // trigger diagonal leaf, then navigate
    triggerLeaf(() => onViewDetails(scheme));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "100%", textAlign: "left",
        background: "#fff",
        border: "none", borderRadius: 20,
        padding: "0", cursor: "pointer",
        position: "relative", overflow: "hidden",
        // pop-in
        opacity: mounted ? 1 : 0,
        transform: mounted
          ? "translateY(0) scale(1)"
          : "translateY(28px) scale(0.97)",
        transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
        boxShadow: pressed
          ? "0 2px 8px rgba(0,0,0,0.08)"
          : "0 4px 18px rgba(0,0,0,0.08)",
        fontFamily: "'Noto Serif','Georgia',serif",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px) scale(1.005)";
        e.currentTarget.style.boxShadow = "0 10px 32px rgba(27,67,50,0.14)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.08)";
      }}
    >
      {/* saffron left accent */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: "linear-gradient(to bottom, #FACC15, #F97316)",
        borderRadius: "20px 0 0 20px",
      }} />

      {/* faint wheat watermark */}
      <div style={{
        position: "absolute", right: -4, bottom: -8,
        width: 48, color: "#1B4332", opacity: 0.04, pointerEvents: "none",
      }}>
        <MiniWheat style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={{ padding: "18px 18px 16px 22px" }}>
        {/* top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
          <h2 style={{
            fontSize: 16, fontWeight: 900, color: "#1a2e22",
            lineHeight: 1.3, flex: 1, margin: 0,
          }}>
            {scheme.name[language]}
          </h2>
          {/* eligible badge */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#f0fdf4", color: "#1B4332",
            fontSize: 11, fontWeight: 800,
            padding: "4px 10px", borderRadius: 999,
            border: "1px solid rgba(27,67,50,0.15)",
            flexShrink: 0, marginTop: 2,
          }}>
            <CheckCircle size={12} />
            {isMarathi ? "पात्र" : "Eligible"}
          </span>
        </div>

        {/* benefit amount */}
        <div style={{
          fontSize: 20, fontWeight: 900,
          background: "linear-gradient(135deg, #FF8C00, #FACC15)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", marginBottom: 12,
        }}>
          {scheme.benefitAmount[language]}
        </div>

        {/* divider + CTA */}
        <div style={{
          borderTop: "1px solid #f0f0f0", paddingTop: 12,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1B4332" }}>
            {isMarathi ? "माहिती पहा" : "View Details"}
          </span>
          {/* animated arrow */}
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "linear-gradient(135deg, #1B4332, #40916c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FACC15", fontSize: 14, fontWeight: 900,
          }}>→</div>
        </div>
      </div>
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ResultsView({
  eligibleSchemes = [],
  onViewDetails,
  onReset,
  language = "mr",
}) {
  const isMarathi = language === "mr";
  const hasSchemes = eligibleSchemes.length > 0;
  const [headerVisible, setHeaderVisible] = useState(false);
  const [leafCallback, setLeafCallback] = useState(null); // fn to call after leaf

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const triggerLeaf = useCallback((cb) => {
    setLeafCallback(() => cb);
  }, []);

  const handleLeafDone = useCallback(() => {
    if (leafCallback) {
      leafCallback();
      setLeafCallback(null);
    }
  }, [leafCallback]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f0fdf4 0%, #f9fafb 55%, #f0fdf4 100%)",
      fontFamily: "'Noto Serif','Georgia',serif",
      paddingBottom: 110,
      position: "relative",
      overflow: "hidden",
    }}>

      {/* diagonal leaf overlay — shown when a card is clicked */}
      {leafCallback && <DiagonalLeaf onDone={handleLeafDone} />}

      {/* ghost wheat corners */}
      {[
        { bottom: 80, left: -20, flip: false },
        { bottom: 60, right: -16, flip: true },
      ].map((s, i) => (
        <div key={i} style={{
          position: "fixed",
          bottom: s.bottom,
          ...(s.flip ? { right: s.right } : { left: s.left }),
          width: 110, color: "#1B4332", opacity: 0.04,
          pointerEvents: "none", zIndex: 0,
          transform: s.flip ? "scaleX(-1)" : undefined,
        }}>
          <MiniWheat style={{ width: "100%", height: "auto" }} />
        </div>
      ))}

      {/* ── Header banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%)",
        padding: "36px 24px 28px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
        {/* yellow top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #FACC15 30%, #FDE68A 50%, #FACC15 70%, transparent)",
        }} />
        {/* corner wheat */}
        {[{ left: 8, flip: false }, { right: 8, flip: true }].map((s, i) => (
          <div key={i} style={{
            position: "absolute", bottom: -4,
            ...(s.flip ? { right: s.right } : { left: s.left }),
            width: 36, color: "#FACC15", opacity: 0.15,
            transform: s.flip ? "scaleX(-1)" : undefined,
            pointerEvents: "none",
          }}>
            <MiniWheat style={{ width: "100%", height: "auto" }} />
          </div>
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          {hasSchemes ? (
            <>
              {/* animated check circle */}
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #FACC15, #F59E0B)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
                boxShadow: "0 0 0 8px rgba(250,204,21,0.15), 0 8px 24px rgba(250,204,21,0.35)",
                animation: "resultsBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both",
              }}>
                <CheckCircle size={32} color="#1a2e22" strokeWidth={2.5} />
              </div>
              <h1 style={{
                fontSize: 20, fontWeight: 900, color: "#fff",
                margin: "0 0 6px", lineHeight: 1.3,
              }}>
                {isMarathi ? "अभिनंदन! " : "Congratulations! "}
                <span style={{ color: "#FACC15" }}>{eligibleSchemes.length}</span>
                {isMarathi ? " योजना सापडल्या 🎉" : " schemes found 🎉"}
              </h1>
              <p style={{ fontSize: 13, color: "rgba(200,235,216,0.72)", margin: 0 }}>
                {isMarathi ? "खालील योजनांची माहिती पहा" : "Tap any scheme to view full details"}
              </p>
            </>
          ) : (
            <>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px", color: "rgba(255,255,255,0.5)",
              }}>
                <Frown size={32} strokeWidth={1.8} />
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>
                {isMarathi ? "सध्या कोणतीही योजना सापडली नाही" : "No schemes found"}
              </h1>
              <p style={{ fontSize: 13, color: "rgba(200,235,216,0.6)", margin: 0 }}>
                {isMarathi ? "तुमची माहिती तपासून पुन्हा प्रयत्न करा" : "Check your details and try again"}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Scheme cards ── */}
      <div style={{
        padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: 14,
        position: "relative", zIndex: 1,
      }}>
        {eligibleSchemes.map((scheme, i) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            onViewDetails={onViewDetails}
            language={language}
            index={i}
            triggerLeaf={triggerLeaf}
          />
        ))}
      </div>

      {/* ── Fixed reset CTA ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "10px 16px 22px",
        background: "linear-gradient(to top, #f0fdf4 75%, transparent)",
        zIndex: 10,
        animation: "ctaSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s both",
      }}>
        <button
          onClick={onReset}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 28px rgba(27,67,50,0.18)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
          }}
          style={{
            width: "100%", padding: "15px",
            background: "#fff",
            color: "#1B4332", fontWeight: 900, fontSize: 15,
            border: "2px solid rgba(27,67,50,0.15)",
            borderRadius: 14, cursor: "pointer",
            fontFamily: "inherit", letterSpacing: "0.03em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}>
          <RotateCcw size={16} />
          {isMarathi ? "पुन्हा तपासा" : "Check Again"}
        </button>
      </div>

      <style>{`
        @keyframes resultsBounce {
          from { opacity: 0; transform: scale(0.3) rotate(-15deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes ctaSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}