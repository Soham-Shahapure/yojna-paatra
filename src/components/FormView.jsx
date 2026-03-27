import { useState, useEffect, useCallback } from "react";
import { User, IndianRupee, Map } from "lucide-react";

// ── Elegant Saffron Leaf Flurry Transition ────────────────────────────────────
function ElegantLeafFlurry({ onDone }) {
  useEffect(() => {
    // Wait for the background wipe to finish before switching the page
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  // Increased to 40 leaves, slowed down, wider drift for an elegant sweep
  const leaves = Array.from({ length: 40 }).map((_, i) => {
    const size = 20 + ((i * 17) % 55); // 20px to 75px
    const left = -5 + ((i * 23) % 110); // -5% to 105% across screen
    const delay = ((i * 7) % 50) / 100; // 0s to 0.5s stagger delay
    const duration = 1.4 + ((i * 11) % 60) / 100; // 1.4s to 2.0s duration (slower)
    const spin = (i % 2 === 0 ? 1 : -1) * (180 + ((i * 13) % 360)); 
    const drift = (i % 2 === 0 ? 1 : -1) * (20 + ((i * 19) % 120)); // Wider drift
    return { size, left, delay, duration, spin, drift, id: i };
  });

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      pointerEvents: "none", overflow: "hidden"
    }}>
      {/* Smooth fade to app background color */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#f0fdf4",
        animation: "bgFadeOut 1.2s ease-in forwards"
      }} />

      {/* 3D Swirling Saffron Leaves */}
      {leaves.map((leaf) => (
        <svg key={leaf.id} viewBox="0 0 64 64" style={{
          position: "absolute",
          bottom: "-20%",
          left: `${leaf.left}%`,
          width: `${leaf.size}px`,
          height: `${leaf.size}px`,
          "--drift": `${leaf.drift}px`,
          "--spin": `${leaf.spin}deg`,
          filter: "drop-shadow(0 10px 15px rgba(234, 88, 12, 0.4))",
          animation: `leafFlurry ${leaf.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${leaf.delay}s both`
        }}>
          <defs>
            <linearGradient id={`gradFlurry${leaf.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={leaf.id % 2 === 0 ? "#FACC15" : "#F97316"} />
              <stop offset="100%" stopColor={leaf.id % 3 === 0 ? "#EA580C" : "#F59E0B"} />
            </linearGradient>
          </defs>
          {/* Leaf Body */}
          <path d="M32 60 C32 60 4 45 4 25 C4 12 13 2 32 2 C51 2 60 12 60 25 C60 45 32 60 32 60 Z" fill={`url(#gradFlurry${leaf.id})`} />
          {/* Main Vein */}
          <path d="M32 60 L32 2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          {/* Side Veins */}
          <path d="M32 45 L20 35 M32 30 L22 22 M32 15 L26 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M32 45 L44 35 M32 30 L42 22 M32 15 L38 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

const CONTENT = {
  mr: {
    title: "माहिती भरा",
    subtitle: "तुमची माहिती भरा, योग्य योजना शोधा",
    ageLabel: "तुमचे वय किती आहे?",
    agePlaceholder: "उदा. ३५",
    incomeLabel: "वार्षिक उत्पन्न",
    incomeOptions: [
      { value: "",       label: "-- निवडा --" },
      { value: "<1L",    label: "१ लाखापेक्षा कमी" },
      { value: "1-2.5L", label: "१ ते २.५ लाख" },
      { value: ">2.5L",  label: "२.५ लाखापेक्षा जास्त" },
    ],
    landLabel: "शेतजमीन किती आहे?",
    landOptions: [
      { value: "",      label: "-- निवडा --" },
      { value: "None",  label: "जमीन नाही (Landless)" },
      { value: "<5",    label: "५ एकरापेक्षा कमी" },
      { value: ">5",    label: "५ एकरापेक्षा जास्त" },
    ],
    cta: "माझ्यासाठी योजना शोधा →",
    step: "पाऊल",
    complete: "पूर्ण",
  },
  en: {
    title: "Fill Your Details",
    subtitle: "Answer 3 quick questions to find your schemes",
    ageLabel: "What is your age?",
    agePlaceholder: "e.g. 35",
    incomeLabel: "Annual Income",
    incomeOptions: [
      { value: "",       label: "-- Select --" },
      { value: "<1L",    label: "Less than ₹1 Lakh" },
      { value: "1-2.5L", label: "₹1 to ₹2.5 Lakhs" },
      { value: ">2.5L",  label: "More than ₹2.5 Lakhs" },
    ],
    landLabel: "Land Holding",
    landOptions: [
      { value: "",      label: "-- Select --" },
      { value: "None",  label: "No Land (Landless)" },
      { value: "<5",    label: "Less than 5 Acres" },
      { value: ">5",    label: "More than 5 Acres" },
    ],
    cta: "Find Schemes for Me →",
    step: "Step",
    complete: "complete",
  },
};

// ── Tiny wheat SVG watermark ──────────────────────────────────────────────────
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

// ── Animated progress bar ─────────────────────────────────────────────────────
function ProgressBar({ filled, total }) {
  return (
    <div style={{ display: "flex", gap: "clamp(4px, 1.5vw, 6px)", justifyContent: "center", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: "clamp(4px, 1.5vw, 5px)", borderRadius: 99,
          width: i < filled ? "clamp(20px, 6vw, 28px)" : "clamp(6px, 2vw, 8px)",
          background: i < filled
            ? "linear-gradient(90deg, #FACC15, #F59E0B)"
            : "rgba(255,255,255,0.2)",
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: i < filled ? "0 0 8px rgba(250,204,21,0.6)" : "none",
        }} />
      ))}
    </div>
  );
}

// ── Field card with staggered pop-in ─────────────────────────────────────────
function FieldCard({ icon, label, stepLabel, filled, children, animDelay, focusedField, fieldKey }) {
  const [mounted, setMounted] = useState(false);
  const isFocused = focusedField === fieldKey;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), animDelay);
    return () => clearTimeout(t);
  }, [animDelay]);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 20,
      padding: "clamp(14px, 4vw, 20px) clamp(14px, 4vw, 20px) clamp(12px, 3.5vw, 18px)",
      position: "relative",
      overflow: "hidden",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
      transition: "opacity 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
      boxShadow: isFocused
        ? "0 12px 36px rgba(27,67,50,0.18), 0 0 0 2.5px #FACC15"
        : filled
          ? "0 6px 24px rgba(27,67,50,0.13), 0 0 0 2px rgba(27,67,50,0.15)"
          : "0 2px 12px rgba(0,0,0,0.06)",
      willChange: mounted ? "auto" : "transform, opacity" 
    }}>

      {/* left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        borderRadius: "20px 0 0 20px",
        background: isFocused
          ? "linear-gradient(to bottom, #FACC15, #F59E0B)"
          : filled
            ? "linear-gradient(to bottom, #FACC15, #F59E0B)"
            : "#e5e7eb",
        transition: "background 0.3s ease",
      }} />

      {/* faint wheat watermark */}
      <div style={{
        position: "absolute", right: -6, bottom: -10,
        width: "clamp(40px, 12vw, 52px)", color: "#1B4332", opacity: 0.04, pointerEvents: "none",
      }}>
        <MiniWheat style={{ width: "100%", height: "auto" }} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 3vw, 12px)", marginBottom: "clamp(10px, 3.5vw, 14px)", paddingLeft: 8 }}>
        <div style={{
          width: "clamp(34px, 10vw, 42px)", height: "clamp(34px, 10vw, 42px)", borderRadius: 13, flexShrink: 0,
          background: filled || isFocused
            ? "linear-gradient(135deg, #1B4332, #40916c)"
            : "#f3f4f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: filled || isFocused ? "#FACC15" : "#9ca3af",
          transition: "all 0.3s ease",
          boxShadow: filled || isFocused ? "0 4px 12px rgba(27,67,50,0.25)" : "none",
          animation: isFocused ? "iconPulse 1.8s ease-in-out infinite" : "none",
        }}>
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: "clamp(9px, 2.5vw, 10px)", fontWeight: 800, letterSpacing: "0.1em",
            textTransform: "uppercase", marginBottom: 2,
            color: filled || isFocused ? "#F59E0B" : "#9ca3af",
            transition: "color 0.3s ease",
          }}>
            {stepLabel}
          </div>
          <div style={{ fontSize: "clamp(13px, 4vw, 15px)", fontWeight: 800, color: "#1a2e22" }}>{label}</div>
        </div>

        {/* animated tick */}
        <div style={{
          width: "clamp(22px, 6vw, 26px)", height: "clamp(22px, 6vw, 26px)", borderRadius: "50%",
          background: "linear-gradient(135deg, #FACC15, #F59E0B)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(11px, 3vw, 13px)", color: "#1a2e22", fontWeight: 900,
          boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
          transform: filled ? "scale(1) rotate(0deg)" : "scale(0) rotate(-90deg)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          willChange: "transform" 
        }}>✓</div>
      </div>

      <div style={{ paddingLeft: 8 }}>{children}</div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function FormView({
  userData = { age: "", income: "", land: "" },
  onFormChange = () => {},
  onSubmit = () => {},
  language = "mr",
}) {
  const t = CONTENT[language] || CONTENT.mr;
  const [focusedField, setFocusedField] = useState(null);
  const [bursting, setBursting] = useState(false);

  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const filledCount = [
    userData.age !== "",
    userData.income !== "",
    userData.land !== "",
  ].filter(Boolean).length;

  const allFilled = filledCount === 3;

  const handleSubmit = useCallback(() => {
    if (!allFilled) return;
    setBursting(true);
  }, [allFilled]);

  const baseInputStyle = {
    width: "100%", borderRadius: 12,
    border: "2px solid #e5e7eb",
    background: "#f9fafb",
    padding: "clamp(10px, 3.5vw, 13px) clamp(12px, 4vw, 16px)",
    fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 700,
    color: "#1a2e22", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
    appearance: "none", WebkitAppearance: "none",
  };

  const onFocus = (field) => setFocusedField(field);
  const onBlur  = () => setFocusedField(null);

  return (
    <div style={{
      minHeight: "100dvh", /* FIXED: 100dvh prevents the button from hiding under the mobile browser bar */
      background: "linear-gradient(170deg, #f0fdf4 0%, #f9fafb 55%, #f0fdf4 100%)",
      fontFamily: "'Noto Serif', 'Georgia', serif",
      paddingBottom: "clamp(80px, 15vh, 110px)",
      position: "relative",
      overflow: "hidden",
      /* REMOVED the animation from here so position: fixed works properly */
    }}>

      {/* NEW: Flurry overlay sits OUTSIDE the transformed container */}
      {bursting && <ElegantLeafFlurry onDone={onSubmit} />}

      {/* FIXED: We wrap the page content in this div so the animation doesn't break fixed positioning */}
      <div style={{ animation: "pageFadeIn 0.4s ease-out both" }}>
        
        {/* ghost wheat — 3 stalks each bottom corner */}
        {[
          { bottom: 60,  left: -18,  width: 120, opacity: 0.045, flip: false },
          { bottom: 55,  left: 16,   width: 90,  opacity: 0.030, flip: false },
          { bottom: 50,  left: 44,   width: 70,  opacity: 0.020, flip: false },
          { bottom: 60,  right: -18, width: 120, opacity: 0.045, flip: true  },
          { bottom: 55,  right: 16,  width: 90,  opacity: 0.030, flip: true  },
          { bottom: 50,  right: 44,  width: 70,  opacity: 0.020, flip: true  },
        ].map((s, i) => (
          <div key={i} style={{
            position: "fixed", bottom: s.bottom,
            ...(s.flip ? { right: s.right } : { left: s.left }),
            width: s.width, color: "#1B4332", opacity: s.opacity,
            pointerEvents: "none", zIndex: 0,
            transform: s.flip ? "scaleX(-1)" : undefined,
          }}>
            <MiniWheat style={{ width: "100%", height: "auto" }} />
          </div>
        ))}

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%)",
          padding: "clamp(28px, 6vw, 38px) clamp(16px, 4vw, 24px) clamp(20px, 5vw, 30px)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: headerVisible ? "auto" : "transform, opacity" 
        }}>
          {/* dot grid */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.055,
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }} />

          {/* yellow top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: "linear-gradient(90deg, transparent, #FACC15 30%, #FDE68A 50%, #FACC15 70%, transparent)",
          }} />

          {/* corner wheat */}
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
              willChange: "transform" 
            }}>
              <MiniWheat style={{ width: "100%", height: "100%" }} />
            </div>
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "clamp(20px, 6vw, 26px)", marginBottom: 8 }}>📋</div>
            <h1 style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 900, color: "#fff", margin: "0 0 6px" }}>
              {t.title}
            </h1>
            <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "rgba(200,235,216,0.72)", margin: "0 0 20px" }}>
              {t.subtitle}
            </p>
            <ProgressBar filled={filledCount} total={3} />
            <div style={{
              fontSize: "clamp(10px, 2.5vw, 11px)", color: "rgba(250,204,21,0.7)",
              marginTop: 8, fontWeight: 700, letterSpacing: "0.06em",
            }}>
              {filledCount} / 3 {t.complete}
            </div>
          </div>
        </div>

        {/* ── Fields ── */}
        <div style={{
          padding: "clamp(12px, 3vw, 20px) clamp(12px, 3vw, 16px)",
          display: "flex", flexDirection: "column", gap: "clamp(10px, 2.5vw, 14px)",
          position: "relative", zIndex: 1,
        }}>

          <FieldCard
            icon={<User size={18} />}
            label={t.ageLabel}
            stepLabel={`${t.step} 1 / 3`}
            filled={userData.age !== ""}
            animDelay={200}
            focusedField={focusedField}
            fieldKey="age"
          >
            <input
              type="number" inputMode="numeric"
              placeholder={t.agePlaceholder}
              min={1} max={120}
              value={userData.age}
              onChange={e => onFormChange("age", e.target.value)}
              onFocus={() => onFocus("age")}
              onBlur={onBlur}
              style={{
                ...baseInputStyle,
                borderColor: focusedField === "age"
                  ? "#FACC15"
                  : userData.age ? "#1B4332" : "#e5e7eb",
                boxShadow: focusedField === "age"
                  ? "0 0 0 3px rgba(250,204,21,0.2)"
                  : "none",
                background: focusedField === "age" ? "#fffbeb" : "#f9fafb",
              }}
            />
          </FieldCard>

          <FieldCard
            icon={<IndianRupee size={18} />}
            label={t.incomeLabel}
            stepLabel={`${t.step} 2 / 3`}
            filled={userData.income !== ""}
            animDelay={380}
            focusedField={focusedField}
            fieldKey="income"
          >
            <div style={{ position: "relative" }}>
              <select
                value={userData.income}
                onChange={e => onFormChange("income", e.target.value)}
                onFocus={() => onFocus("income")}
                onBlur={onBlur}
                style={{
                  ...baseInputStyle,
                  paddingRight: "clamp(30px, 8vw, 40px)",
                  borderColor: focusedField === "income"
                    ? "#FACC15"
                    : userData.income ? "#1B4332" : "#e5e7eb",
                  boxShadow: focusedField === "income"
                    ? "0 0 0 3px rgba(250,204,21,0.2)"
                    : "none",
                  background: focusedField === "income" ? "#fffbeb" : "#f9fafb",
                }}
              >
                {t.incomeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div style={{
                position: "absolute", right: "clamp(10px, 3vw, 14px)", top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none", color: "#9ca3af", fontSize: 11,
              }}>▼</div>
            </div>
          </FieldCard>

          <FieldCard
            icon={<Map size={18} />}
            label={t.landLabel}
            stepLabel={`${t.step} 3 / 3`}
            filled={userData.land !== ""}
            animDelay={560}
            focusedField={focusedField}
            fieldKey="land"
          >
            <div style={{ position: "relative" }}>
              <select
                value={userData.land}
                onChange={e => onFormChange("land", e.target.value)}
                onFocus={() => onFocus("land")}
                onBlur={onBlur}
                style={{
                  ...baseInputStyle,
                  paddingRight: "clamp(30px, 8vw, 40px)",
                  borderColor: focusedField === "land"
                    ? "#FACC15"
                    : userData.land ? "#1B4332" : "#e5e7eb",
                  boxShadow: focusedField === "land"
                    ? "0 0 0 3px rgba(250,204,21,0.2)"
                    : "none",
                  background: focusedField === "land" ? "#fffbeb" : "#f9fafb",
                }}
              >
                {t.landOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div style={{
                position: "absolute", right: "clamp(10px, 3vw, 14px)", top: "50%", transform: "translateY(-50%)",
                pointerEvents: "none", color: "#9ca3af", fontSize: 11,
              }}>▼</div>
            </div>
          </FieldCard>

        </div>
      </div> {/* <-- End of animated wrapper */}

      {/* FIXED: Restored the env(safe-area-inset-bottom) padding you had previously! */}
      {/* ── Fixed CTA ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        paddingTop: "clamp(8px, 2vw, 10px)",
        paddingLeft: "clamp(12px, 3.5vw, 16px)",
        paddingRight: "clamp(12px, 3.5vw, 16px)",
        paddingBottom: "calc(clamp(16px, 5vw, 22px) + env(safe-area-inset-bottom, 24px))",
        background: "linear-gradient(to top, #f0fdf4 75%, transparent)",
        zIndex: 10,
        animation: "ctaSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.75s both",
        willChange: "transform, opacity" 
      }}>
        <button
          onClick={handleSubmit}
          disabled={!allFilled}
          onMouseEnter={e => {
            if (!allFilled) return;
            e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(250,204,21,0.5)";
          }}
          onMouseLeave={e => {
            if (!allFilled) return;
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = allFilled
              ? "0 6px 20px rgba(250,204,21,0.3)" : "none";
          }}
          style={{
            width: "100%", padding: "clamp(12px, 3.5vw, 16px)",
            background: allFilled
              ? "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)"
              : "#e5e7eb",
            color: allFilled ? "#1a2e22" : "#9ca3af",
            fontWeight: 900, fontSize: "clamp(14px, 4vw, 16px)",
            border: "none", borderRadius: 14,
            cursor: allFilled ? "pointer" : "not-allowed",
            fontFamily: "inherit", letterSpacing: "0.04em",
            boxShadow: allFilled ? "0 6px 20px rgba(250,204,21,0.3)" : "none",
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}>
          {allFilled
            ? t.cta
            : (language === "mr"
                ? `${3 - filledCount} प्रश्न बाकी आहेत`
                : `${3 - filledCount} fields remaining`)}
        </button>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes pageFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgFadeOut {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes leafFlurry {
          0% { transform: translateY(0) translateX(0) rotate(0deg) scale(0.5); opacity: 0; }
          10% { opacity: 1; scale: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-120dvh) translateX(var(--drift)) rotate(var(--spin)) scale(1.1); opacity: 0; }
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 4px 12px rgba(27,67,50,0.25); }
          50%       { box-shadow: 0 4px 20px rgba(250,204,21,0.45), 0 0 0 4px rgba(250,204,21,0.12); }
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
      `}</style>
    </div>
  );
}