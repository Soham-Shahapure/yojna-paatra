import { useEffect, useState } from "react";
 
// ── Wheat stalk SVG (for edge decoration) ─────────────────────────────────────
const WheatStalk = ({ style }) => (
  <svg viewBox="0 0 60 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    {/* stem */}
    <path d="M30 155 Q28 120 30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    {/* top grain */}
    <ellipse cx="30" cy="18" rx="7" ry="13" fill="currentColor" opacity="0.85" transform="rotate(-8 30 18)"/>
    {/* left grains */}
    <ellipse cx="20" cy="38" rx="6" ry="11" fill="currentColor" opacity="0.7" transform="rotate(-28 20 38)"/>
    <ellipse cx="16" cy="60" rx="5" ry="10" fill="currentColor" opacity="0.55" transform="rotate(-22 16 60)"/>
    <ellipse cx="18" cy="82" rx="4" ry="8"  fill="currentColor" opacity="0.4"  transform="rotate(-18 18 82)"/>
    {/* right grains */}
    <ellipse cx="40" cy="38" rx="6" ry="11" fill="currentColor" opacity="0.7" transform="rotate(28 40 38)"/>
    <ellipse cx="44" cy="60" rx="5" ry="10" fill="currentColor" opacity="0.55" transform="rotate(22 44 60)"/>
    <ellipse cx="42" cy="82" rx="4" ry="8"  fill="currentColor" opacity="0.4"  transform="rotate(18 42 82)"/>
    {/* small side stems */}
    <path d="M30 38 Q22 34 20 38" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M30 38 Q38 34 40 38" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    <path d="M30 60 Q18 56 16 60" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
    <path d="M30 60 Q42 56 44 60" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
  </svg>
);
 
// ── Leaf SVG — organic teardrop shape ─────────────────────────────────────────
const LeafSVG = ({ color }) => (
  <svg viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "100%" }}>
    <path
      d="M16 40 C16 40 2 30 2 17 C2 8 8 1 16 1 C24 1 30 8 30 17 C30 30 16 40 16 40Z"
      fill={color}
    />
    {/* midrib */}
    <path d="M16 40 C16 28 16 12 16 1"
      stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round"/>
    {/* veins */}
    <path d="M16 20 C12 16 7 15 2 15"
      stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M16 28 C20 24 25 23 30 23"
      stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="round"/>
  </svg>
);
 
// ── Logo mark SVG ─────────────────────────────────────────────────────────────
const LogoMark = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: 36, height: 36 }}>
    {/* circle bg handled by parent */}
    {/* wheat stalk */}
    <path d="M28 46 L28 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    {/* top grain */}
    <ellipse cx="28" cy="13" rx="5" ry="8" fill="white" opacity="0.95" transform="rotate(-10 28 13)"/>
    {/* left */}
    <ellipse cx="21" cy="24" rx="4" ry="7" fill="white" opacity="0.8" transform="rotate(-28 21 24)"/>
    <ellipse cx="19" cy="34" rx="3" ry="6" fill="white" opacity="0.6" transform="rotate(-22 19 34)"/>
    {/* right */}
    <ellipse cx="35" cy="24" rx="4" ry="7" fill="white" opacity="0.8" transform="rotate(28 35 24)"/>
    <ellipse cx="37" cy="34" rx="3" ry="6" fill="white" opacity="0.6" transform="rotate(22 37 34)"/>
    {/* side lines */}
    <path d="M28 24 L21 24" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M28 24 L35 24" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M28 34 L19 34" stroke="white" strokeWidth="1" opacity="0.4"/>
    <path d="M28 34 L37 34" stroke="white" strokeWidth="1" opacity="0.4"/>
  </svg>
);
 
// ── Leaves config — varied speeds, sizes, paths for organic feel ──────────────
const LEAVES = [
  // left cluster
  { id:0,  left:"2%",   size:15, duration:11, delay:0,    drift:55,   rot:320,  color:"#FF9933" },
  { id:1,  left:"8%",   size:20, duration:15, delay:4,    drift:40,   rot:-280, color:"#FFB347" },
  { id:2,  left:"13%",  size:12, duration:9,  delay:7,    drift:70,   rot:440,  color:"#FF8C00" },
  // centre-left
  { id:3,  left:"22%",  size:18, duration:13, delay:2,    drift:-45,  rot:-360, color:"#FFA500" },
  { id:4,  left:"31%",  size:14, duration:10, delay:9,    drift:60,   rot:290,  color:"#FF9933" },
  // centre
  { id:5,  left:"42%",  size:22, duration:16, delay:1,    drift:-55,  rot:-410, color:"#FFB347" },
  { id:6,  left:"51%",  size:11, duration:8,  delay:5.5,  drift:80,   rot:500,  color:"#FFCC80" },
  // centre-right
  { id:7,  left:"62%",  size:19, duration:14, delay:3,    drift:-70,  rot:-330, color:"#FF8C00" },
  { id:8,  left:"71%",  size:13, duration:10, delay:8,    drift:50,   rot:370,  color:"#FFA500" },
  // right cluster
  { id:9,  left:"80%",  size:21, duration:12, delay:0.5,  drift:-60,  rot:-420, color:"#FF9933" },
  { id:10, left:"88%",  size:16, duration:9,  delay:6,    drift:45,   rot:310,  color:"#FFB347" },
  { id:11, left:"94%",  size:24, duration:17, delay:2.5,  drift:-35,  rot:-260, color:"#FF8C00" },
  // stragglers for depth
  { id:12, left:"17%",  size:10, duration:8,  delay:11,   drift:65,   rot:480,  color:"#FFCC80" },
  { id:13, left:"56%",  size:17, duration:13, delay:3.5,  drift:-50,  rot:-300, color:"#FF9933" },
  { id:14, left:"76%",  size:13, duration:11, delay:7.5,  drift:55,   rot:340,  color:"#FFA500" },
];
 
// ── Bilingual content ─────────────────────────────────────────────────────────
const CONTENT = {
  mr: {
    headline: "सरकारी योजना शोधा",
    subtitle: "तुमच्यासाठी योग्य सरकारी मदत — मोफत आणि सोपे.",
    cta: "सुरू करा →",
    footer: "मोफत · कागदपत्रे नाहीत · सुरक्षित",
  },
  en: {
    headline: "Find Schemes You Deserve",
    subtitle: "Government support made for farmers like you — free and simple.",
    cta: "Get Started →",
    footer: "Free · No Documents · Secure",
  },
};
 
// ── Component ─────────────────────────────────────────────────────────────────
export default function HomeView({ onStart, language, setLanguage }) {
  const [visible, setVisible] = useState(false);
  const t = CONTENT[language] || CONTENT.mr;
 
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);
 
  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontFamily: "'Noto Serif', 'Georgia', serif",
      padding: "24px 20px",
    }}>
 
      {/* ── BG: farm/tractor photo ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-58197bd47d72?w=1600&auto=format&fit=crop&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
      }} />
 
      {/* ── Overlay ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(165deg, rgba(5,20,11,0.82) 0%, rgba(12,42,24,0.70) 50%, rgba(5,16,10,0.86) 100%)",
      }} />
 
      {/* ── Edge wheat stalks — LEFT ── */}
      {[
        { bottom: "0%", left: "-8px",  height: 220, opacity: 0.18, delay: "0s",   dur: "4.5s", tilt: "rotate(8deg)"  },
        { bottom: "0%", left: "28px",  height: 180, opacity: 0.13, delay: "0.8s", dur: "5.5s", tilt: "rotate(5deg)"  },
        { bottom: "0%", left: "58px",  height: 150, opacity: 0.10, delay: "1.4s", dur: "4s",   tilt: "rotate(3deg)"  },
      ].map((s, i) => (
        <div key={`wl${i}`} style={{
          position: "absolute", bottom: s.bottom, left: s.left, zIndex: 2,
          height: s.height, width: s.height * 0.38,
          color: "#FF9933", opacity: s.opacity,
          transform: s.tilt, transformOrigin: "bottom center",
          animation: `wheatSway ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: "none",
        }}>
          <WheatStalk style={{ width: "100%", height: "100%" }} />
        </div>
      ))}
 
      {/* ── Edge wheat stalks — RIGHT ── */}
      {[
        { bottom: "0%", right: "-8px",  height: 240, opacity: 0.18, delay: "0.4s", dur: "5s",   tilt: "rotate(-6deg)"  },
        { bottom: "0%", right: "26px",  height: 195, opacity: 0.13, delay: "1.2s", dur: "4.5s", tilt: "rotate(-4deg)"  },
        { bottom: "0%", right: "54px",  height: 160, opacity: 0.10, delay: "0s",   dur: "6s",   tilt: "rotate(-2deg)"  },
      ].map((s, i) => (
        <div key={`wr${i}`} style={{
          position: "absolute", bottom: s.bottom, right: s.right, zIndex: 2,
          height: s.height, width: s.height * 0.38,
          color: "#FF9933", opacity: s.opacity,
          transform: s.tilt, transformOrigin: "bottom center",
          animation: `wheatSway ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents: "none",
        }}>
          <WheatStalk style={{ width: "100%", height: "100%" }} />
        </div>
      ))}
 
      {/* ── Gold top bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 10,
        background: "linear-gradient(90deg, transparent, #FF8C00 30%, #FFD700 50%, #FF8C00 70%, transparent)",
      }} />
 
      {/* ── Falling leaves ── */}
      {LEAVES.map((leaf) => (
        <div key={leaf.id} style={{
          position: "absolute", top: "-55px", left: leaf.left,
          width: leaf.size, height: leaf.size * 1.3,
          zIndex: 3, pointerEvents: "none",
          animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
          "--drift": `${leaf.drift}px`,
          "--rot": `${leaf.rot}deg`,
        }}>
          <LeafSVG color={leaf.color} />
        </div>
      ))}
 
      {/* ── Card ── */}
      <div style={{
        position: "relative", zIndex: 5,
        width: "100%", maxWidth: 400,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
      }}>
        <div style={{
          background: "#ffffff",
          borderRadius: 22,
          padding: "42px 34px 34px",
          boxShadow: "0 28px 72px rgba(0,0,0,0.48), 0 2px 8px rgba(0,0,0,0.12)",
          textAlign: "center",
        }}>
 
          {/* ── Upgraded logo ── */}
          <div style={{ marginBottom: 22 }}>
            {/* Icon circle with inner glow */}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(145deg, #1B4332 0%, #2d6a4f 60%, #52b788 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 14px",
              boxShadow: "0 0 0 6px rgba(27,67,50,0.10), 0 10px 28px rgba(27,67,50,0.38)",
              position: "relative",
            }}>
              {/* subtle ring */}
              <div style={{
                position: "absolute", inset: -4, borderRadius: "50%",
                border: "1.5px solid rgba(82,183,136,0.3)",
              }} />
              <LogoMark />
            </div>
 
            {/* Wordmark */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <div style={{ height: 1, width: 28, background: "linear-gradient(to right, transparent, #c8d8ce)" }} />
              <span style={{
                fontSize: 12, fontWeight: 800, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#2d6a4f",
              }}>
                Yojna-Paatra
              </span>
              <div style={{ height: 1, width: 28, background: "linear-gradient(to left, transparent, #c8d8ce)" }} />
            </div>
          </div>
 
          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 900,
            color: "#1a2e22", lineHeight: 1.22,
            margin: "0 0 10px",
          }}>
            {t.headline}
          </h1>
 
          {/* Subtitle */}
          <p style={{
            fontSize: 14, color: "#6b8f7a", lineHeight: 1.65,
            margin: "0 0 28px",
          }}>
            {t.subtitle}
          </p>
 
          {/* Language toggle */}
          <div style={{
            display: "inline-flex",
            background: "#f1f5f2",
            borderRadius: 10, padding: 4,
            marginBottom: 24,
            border: "1px solid #e2ebe5",
          }}>
            {["mr", "en"].map((lang) => (
              <button key={lang} onClick={() => setLanguage(lang)} style={{
                padding: "8px 24px", borderRadius: 7, border: "none",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
                background: language === lang ? "#1B4332" : "transparent",
                color: language === lang ? "#ffffff" : "#7a9485",
                boxShadow: language === lang ? "0 2px 10px rgba(27,67,50,0.28)" : "none",
              }}>
                {lang === "mr" ? "मराठी" : "English"}
              </button>
            ))}
          </div>
 
          {/* CTA */}
          <button
            onClick={onStart}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 14px 36px rgba(255,140,0,0.52)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,140,0,0.36)";
            }}
            style={{
              width: "100%", padding: "15px",
              background: "linear-gradient(135deg, #FF8C00, #e05500)",
              color: "#fff", fontWeight: 900, fontSize: 16,
              border: "none", borderRadius: 12, cursor: "pointer",
              fontFamily: "inherit", letterSpacing: "0.04em",
              boxShadow: "0 6px 20px rgba(255,140,0,0.36)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}>
            {t.cta}
          </button>
 
          {/* Footer micro text */}
          <p style={{
            fontSize: 11, color: "#a8bfb3",
            marginTop: 14, letterSpacing: "0.04em",
          }}>
            {t.footer}
          </p>
 
        </div>
      </div>
 
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes leafFall {
          0%   { transform: translateY(-60px) translateX(0px) rotate(0deg) scale(1);    opacity: 0;    }
          6%   { opacity: 0.8; }
          40%  { transform: translateY(38vh)  translateX(calc(var(--drift)*0.4)) rotate(calc(var(--rot)*0.4)) scale(0.95); }
          85%  { opacity: 0.55; }
          100% { transform: translateY(106vh) translateX(var(--drift)) rotate(var(--rot)) scale(0.75); opacity: 0; }
        }
 
        @keyframes wheatSway {
          0%,100% { transform-origin: bottom center; transform: rotate(var(--base-tilt, 5deg))   translateX(0px);   }
          40%      { transform: rotate(calc(var(--base-tilt, 5deg) + 3deg)) translateX(2px);  }
          70%      { transform: rotate(calc(var(--base-tilt, 5deg) - 4deg)) translateX(-2px); }
        }
      `}</style>
    </div>
  );
}
 
