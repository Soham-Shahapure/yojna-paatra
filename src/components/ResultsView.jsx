import { useState, useEffect, useRef } from "react";
import { CheckCircle, Frown, RotateCcw } from "lucide-react";

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


// ── Two leaves slide from each side, grow to cover screen ────────────────────
function TwoLeafSlide({ onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    // Leaf size grows large enough to cover the full screen
    // We need the leaf at final scale to be bigger than screen diagonal
    const DIAGONAL = Math.sqrt(W * W + H * H);
    const BASE_SIZE = DIAGONAL * 0.72; // base draw size

    // Helper: draw a leaf onto an offscreen canvas
    function makeLeaf(color1, color2) {
      const off = document.createElement("canvas");
      off.width  = BASE_SIZE;
      off.height = BASE_SIZE * 1.3;
      const lc = off.getContext("2d");
      const lw = BASE_SIZE, lh = BASE_SIZE * 1.3;
      lc.beginPath();
      lc.moveTo(lw*0.5, lh*0.97);
      lc.bezierCurveTo(lw*0.5, lh*0.97, lw*0.04, lh*0.72, lw*0.04, lh*0.38);
      lc.bezierCurveTo(lw*0.04, lh*0.14, lw*0.22, lw*0.02, lw*0.5,  lh*0.02);
      lc.bezierCurveTo(lw*0.78, lh*0.02, lw*0.96, lh*0.14, lw*0.96, lh*0.38);
      lc.bezierCurveTo(lw*0.96, lh*0.72, lw*0.5,  lh*0.97, lw*0.5,  lh*0.97);
      const grad = lc.createRadialGradient(lw*0.5, lh*0.35, 0, lw*0.5, lh*0.35, lw*0.55);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      lc.fillStyle = grad; lc.fill();
      // midrib
      lc.beginPath();
      lc.moveTo(lw*0.5, lh*0.97); lc.lineTo(lw*0.5, lh*0.02);
      lc.strokeStyle = "rgba(255,255,255,0.3)"; lc.lineWidth = lw*0.018; lc.stroke();
      // veins
      [[0.3,0.6],[0.55,0.5],[0.75,0.4]].forEach(([t, vw]) => {
        const vy = lh*t, vwpx = lw*vw*0.42;
        lc.beginPath();
        lc.moveTo(lw*0.5, vy); lc.lineTo(lw*0.5 - vwpx, vy - vwpx*0.22);
        lc.moveTo(lw*0.5, vy); lc.lineTo(lw*0.5 + vwpx, vy - vwpx*0.22);
        lc.strokeStyle = "rgba(255,255,255,0.18)"; lc.lineWidth = lw*0.01; lc.stroke();
      });
      return off;
    }

    const leafL = makeLeaf("#FFCC80", "#FF8C00"); // left — warm orange
    const leafR = makeLeaf("#FFB347", "#e65c00"); // right — deeper saffron

    // Leaves anchor at vertical centre of screen
    const yL = H * 0.38;
    const yR = H * 0.62;

    let progress = 0;
    let animId;

    // ease in-out sine — smooth, unhurried
    const ease = t => -(Math.cos(Math.PI * t) - 1) / 2;

    const draw = () => {
      // ── Speed: 0.012 per frame ≈ ~83 frames ≈ ~1.4 s at 60fps ──────────
      // (original was 0.06 → ~17 frames → ~0.28 s — this is 5× slower)
      progress += 0.012;
      if (progress > 1) { cancelAnimationFrame(animId); onDone(); return; }

      ctx.fillStyle = "#f0fdf4";
      ctx.fillRect(0, 0, W, H);

      const t = ease(progress);

      // ── Opacity: fade in quickly, hold, fade out at end ───────────────
      let alpha;
      if      (progress < 0.06) alpha = progress / 0.06;
      else if (progress > 0.85) alpha = 1 - (progress - 0.85) / 0.15;
      else                      alpha = 1;

      // ── Scale: starts small, grows to fully cover screen ─────────────
      // At t=1 scale reaches ~1.55 so the huge BASE_SIZE leaf fills the frame
      const scale = 0.18 + t * 1.38;

      // ── LEFT leaf: slides in from left, anchored to upper-centre ─────
      // starts offscreen left, moves to screen centre-left
      const xL = -BASE_SIZE * 0.6 + t * (W * 0.42 + BASE_SIZE * 0.6);
      // gentle CCW tilt that straightens as it arrives
      const rotL = -0.45 + t * 0.38;

      // ── RIGHT leaf: slides in from right, anchored to lower-centre ───
      const xR = W + BASE_SIZE * 0.6 - t * (W * 0.42 + BASE_SIZE * 0.6);
      const rotR = 0.45 - t * 0.38;

      // Draw left leaf
      ctx.save();
      ctx.globalAlpha = alpha * 0.93;
      ctx.translate(xL, yL);
      ctx.rotate(rotL);
      ctx.scale(scale, scale);
      ctx.drawImage(leafL, -BASE_SIZE * 0.5, -BASE_SIZE * 0.65);
      ctx.restore();

      // Draw right leaf (flipped horizontally)
      ctx.save();
      ctx.globalAlpha = alpha * 0.93;
      ctx.translate(xR, yR);
      ctx.scale(-scale, scale); // flip
      ctx.rotate(-rotR);
      ctx.drawImage(leafR, -BASE_SIZE * 0.5, -BASE_SIZE * 0.65);
      ctx.restore();

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

// ── Scheme card ───────────────────────────────────────────────────────────────
function SchemeCard({ scheme, onViewDetails, onTriggerLeaf, language, index }) {
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isMarathi = language === "mr";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150 + index * 160);
    return () => clearTimeout(t);
  }, [index]);

  const handleClick = () => {
    setPressed(true);
    onTriggerLeaf(scheme);
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

        <div style={{
          fontSize: 20, fontWeight: 900,
          background: "linear-gradient(135deg, #FF8C00, #FACC15)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text", marginBottom: 12,
        }}>
          {scheme.benefitAmount[language]}
        </div>

        <div style={{
          borderTop: "1px solid #f0f0f0", paddingTop: 12,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1B4332" }}>
            {isMarathi ? "माहिती पहा" : "View Details"}
          </span>
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
  const [pendingNav, setPendingNav]        = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f0fdf4 0%, #f9fafb 55%, #f0fdf4 100%)",
      fontFamily: "'Noto Serif','Georgia',serif",
      paddingBottom: 110,
      position: "relative",
      overflow: "hidden",
    }}>

      {pendingNav && (
        <TwoLeafSlide onDone={() => {
          const scheme = pendingNav;
          setPendingNav(null);
          onViewDetails(scheme);
        }} />
      )}

      {/* ghost wheat corners */}
      {[
        { bottom: 55, left: -18,  width: 130, height: 200, opacity: 0.055, flip: false, delay: "0s",   dur: "4.5s" },
        { bottom: 50, left: 30,   width: 100, height: 160, opacity: 0.035, flip: false, delay: "0.8s", dur: "5.5s" },
        { bottom: 45, left: 68,   width: 80,  height: 130, opacity: 0.022, flip: false, delay: "1.4s", dur: "4s"   },
        { bottom: 55, right: -18, width: 130, height: 200, opacity: 0.055, flip: true,  delay: "0.4s", dur: "5s"   },
        { bottom: 50, right: 30,  width: 100, height: 160, opacity: 0.035, flip: true,  delay: "1.2s", dur: "4.5s" },
        { bottom: 45, right: 68,  width: 80,  height: 130, opacity: 0.022, flip: true,  delay: "0s",   dur: "6s"   },
      ].map((s, i) => (
        <div key={i} style={{
          position: "fixed",
          bottom: s.bottom,
          ...(s.flip ? { right: s.right } : { left: s.left }),
          width: s.width, height: s.height,
          color: "#1B4332", opacity: s.opacity,
          pointerEvents: "none", zIndex: 0,
          transformOrigin: "bottom center",
          animation: `${s.flip ? "wheatSwayFlip" : "wheatSway"} ${s.dur} ease-in-out ${s.delay} infinite`,
        }}>
          <MiniWheat style={{ width: "100%", height: "100%" }} />
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
        transition: "opacity 0.18s ease, transform 0.18s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, transparent, #FACC15 30%, #FDE68A 50%, #FACC15 70%, transparent)",
        }} />
        {[
          { left: -4,  height: 110, opacity: 0.22, flip: false, delay: "0s",   dur: "4s"   },
          { left: 32,  height: 88,  opacity: 0.14, flip: false, delay: "0.7s", dur: "5s"   },
          { left: 64,  height: 70,  opacity: 0.09, flip: false, delay: "1.3s", dur: "3.5s" },
          { right: -4, height: 110, opacity: 0.22, flip: true,  delay: "0.3s", dur: "4.5s" },
          { right: 32, height: 88,  opacity: 0.14, flip: true,  delay: "1s",   dur: "5s"   },
          { right: 64, height: 70,  opacity: 0.09, flip: true,  delay: "0s",   dur: "3.8s" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute", bottom: -4,
            ...(s.flip ? { right: s.right } : { left: s.left }),
            width: s.height * 0.5, height: s.height,
            color: "#FACC15", opacity: s.opacity,
            transformOrigin: "bottom center",
            animation: `wheatSway ${s.dur} ease-in-out ${s.delay} infinite`,
            pointerEvents: "none",
          }}>
            <MiniWheat style={{ width: "100%", height: "100%" }} />
          </div>
        ))}

        <div style={{ position: "relative", zIndex: 1 }}>
          {hasSchemes ? (
            <>
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
            onTriggerLeaf={(scheme) => setPendingNav(scheme)}
            language={language}
            index={i}
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
        @keyframes wheatSway {
          0%,100% { transform: rotate(4deg)  translateX(0px);  }
          40%      { transform: rotate(8deg)  translateX(2px);  }
          70%      { transform: rotate(1deg)  translateX(-2px); }
        }
        @keyframes wheatSwayFlip {
          0%,100% { transform: scaleX(-1) rotate(4deg)  translateX(0px);  }
          40%      { transform: scaleX(-1) rotate(8deg)  translateX(2px);  }
          70%      { transform: scaleX(-1) rotate(1deg)  translateX(-2px); }
        }
      `}</style>
    </div>
  );
}