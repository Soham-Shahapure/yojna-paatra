import { useState, useEffect } from "react";
import { CheckCircle2, Play, FileText, Video, PenLine, ExternalLink } from "lucide-react";

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

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DetailsView({ scheme, onBack, language }) {
  const [activeTab, setActiveTab] = useState("documents");
  const [mounted, setMounted]     = useState(false);
  const isMarathi = language === "mr";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const TABS = [
    { key: "documents", label: isMarathi ? "कागदपत्रे"  : "Documents",   icon: FileText },
    { key: "video",     label: isMarathi ? "मार्गदर्शन" : "Video Guide", icon: Video    },
    { key: "apply",     label: isMarathi ? "अर्ज करा"   : "Apply",       icon: PenLine  },
  ];

  const APPLY_STEPS = [
    {
      step: "1",
      title:       isMarathi ? "अधिकृत वेबसाईटला भेट द्या" : "Visit Official Website",
      description: isMarathi ? "खालील बटणावर क्लिक करून अधिकृत पोर्टलवर जा." : "Click the button below to go to the official portal.",
    },
    {
      step: "2",
      title:       isMarathi ? "नोंदणी करा" : "Register",
      description: isMarathi ? "तुमचा आधार क्रमांक आणि मोबाइल नंबर वापरून नोंदणी करा." : "Register using your Aadhaar number and mobile number.",
    },
    {
      step: "3",
      title:       isMarathi ? "अर्ज भरा आणि सबमिट करा" : "Fill and Submit Application",
      description: isMarathi ? "सर्व आवश्यक माहिती भरा, कागदपत्रे अपलोड करा आणि अर्ज सबमिट करा." : "Fill all required details, upload documents, and submit.",
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(170deg, #f0fdf4 0%, #f9fafb 55%, #f0fdf4 100%)",
      fontFamily: "'Noto Serif','Georgia',serif",
      paddingBottom: 110,
      position: "relative",
      opacity: mounted ? 1 : 0,
      transition: "opacity 0.35s ease",
    }}>

      {/* Ghost wheat corners */}
      {[
        { bottom: 55, left: -18,  width: 110, height: 170, opacity: 0.045, flip: false, delay: "0s",   dur: "4.5s" },
        { bottom: 50, left: 28,   width: 85,  height: 135, opacity: 0.030, flip: false, delay: "0.8s", dur: "5.5s" },
        { bottom: 55, right: -18, width: 110, height: 170, opacity: 0.045, flip: true,  delay: "0.4s", dur: "5s"   },
        { bottom: 50, right: 28,  width: 85,  height: 135, opacity: 0.030, flip: true,  delay: "1.2s", dur: "4.5s" },
      ].map((s, i) => (
        <div key={i} style={{
          position: "fixed", bottom: s.bottom,
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

      {/* ── Content — fades in after leaf ── */}
      <div>

        {/* ── Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%)",
          padding: "36px 20px 24px",
          position: "relative", overflow: "hidden",
        }}>
          {/* dot grid */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none", opacity:0.05,
            backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize:"22px 22px",
          }}/>
          {/* yellow top line */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, height:3,
            background:"linear-gradient(90deg,transparent,#FACC15 30%,#FDE68A 50%,#FACC15 70%,transparent)",
          }}/>
          {/* corner wheat */}
          {[{ left: -4, flip:false }, { right: -4, flip:true }].map((s,i) => (
            <div key={i} style={{
              position:"absolute", bottom:-4,
              ...(s.flip ? { right: s.right } : { left: s.left }),
              width: 36, height: 80,
              color:"#FACC15", opacity:0.18,
              transformOrigin:"bottom center",
              animation:`${s.flip?"wheatSwayFlip":"wheatSway"} 4.5s ease-in-out infinite`,
              pointerEvents:"none",
            }}>
              <MiniWheat style={{ width:"100%", height:"100%" }} />
            </div>
          ))}

          <div style={{ position:"relative", zIndex:1 }}>
            {/* Back button */}
            <button onClick={onBack} style={{
              display:"flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.12)", border:"none",
              borderRadius:10, padding:"8px 14px", cursor:"pointer",
              color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:13,
              fontFamily:"inherit", marginBottom:16,
              transition:"background 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.12)"}
            >
              ← {isMarathi ? "मागे" : "Back"}
            </button>

            <h1 style={{
              fontSize: "clamp(18px,4.5vw,26px)", fontWeight:900,
              color:"#fff", lineHeight:1.25, margin:"0 0 16px",
            }}>
              {scheme?.name?.[language]}
            </h1>

            {/* Benefit badge */}
            <div style={{
              display:"inline-block",
              background:"linear-gradient(135deg,#FACC15,#F59E0B)",
              borderRadius:12, padding:"10px 20px",
              boxShadow:"0 4px 16px rgba(250,204,21,0.4)",
            }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#1a2e22", letterSpacing:"0.08em", marginBottom:2 }}>
                {isMarathi ? "मुख्य लाभ" : "MAIN BENEFIT"}
              </div>
              <div style={{ fontSize:22, fontWeight:900, color:"#1a2e22" }}>
                {scheme?.benefitAmount?.[language]}
              </div>
            </div>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div style={{ padding:"16px 16px 8px" }}>
          <div style={{
            display:"flex", gap:6,
            background:"#e8f0eb", borderRadius:16, padding:5,
          }}>
            {TABS.map(tab => {
              const active = activeTab === tab.key;
              const Icon   = tab.icon;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                  flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5,
                  padding:"11px 4px", borderRadius:12, border:"none",
                  fontWeight:700, fontSize:12, cursor:"pointer", fontFamily:"inherit",
                  transition:"all 0.22s ease",
                  background: active ? "#1B4332" : "transparent",
                  color:       active ? "#FACC15" : "#6b8f7a",
                  boxShadow:   active ? "0 3px 10px rgba(27,67,50,0.3)" : "none",
                }}>
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab content ── */}
        <div style={{ padding:"8px 16px" }}>

          {/* Documents */}
          {activeTab === "documents" && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <p style={{ fontSize:15, fontWeight:800, color:"#1a2e22", margin:"0 0 4px" }}>
                {isMarathi ? "आवश्यक कागदपत्रे" : "Required Documents"}
              </p>
              {scheme?.checklist?.[language]?.map((item, i) => (
                <div key={i} style={{
                  display:"flex", alignItems:"flex-start", gap:12,
                  background:"#fff", borderRadius:16, padding:"14px 16px",
                  boxShadow:"0 2px 10px rgba(0,0,0,0.06)",
                  // staggered pop-in
                  animation:`detailPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*80}ms both`,
                }}>
                  <CheckCircle2 size={18} style={{ color:"#1B4332", marginTop:2, flexShrink:0 }} />
                  <span style={{ fontSize:14, color:"#374151", lineHeight:1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Video */}
          {activeTab === "video" && (
            <a href={scheme?.youtubeLink || "#"} target="_blank" rel="noopener noreferrer"
              style={{
                display:"block", borderRadius:20, overflow:"hidden",
                background:"#fff", boxShadow:"0 4px 20px rgba(0,0,0,0.08)",
                textDecoration:"none",
                animation:"detailPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
              }}>
              <div style={{
                aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center",
                background:"linear-gradient(135deg,#0d2b1a,#1B4332)",
                flexDirection:"column", gap:12,
              }}>
                <div style={{
                  width:64, height:64, borderRadius:"50%",
                  background:"linear-gradient(135deg,#FF8C00,#FACC15)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 8px 24px rgba(255,140,0,0.4)",
                }}>
                  <Play size={28} color="#1a2e22" fill="#1a2e22" style={{ marginLeft:3 }} />
                </div>
                <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13, fontWeight:600 }}>
                  {isMarathi ? "व्हिडिओ पहा" : "Watch Video"}
                </span>
              </div>
              <div style={{ padding:"16px 18px" }}>
                <p style={{ fontSize:16, fontWeight:900, color:"#1B4332", margin:"0 0 6px" }}>
                  {isMarathi ? "योजना कशी लागू करावी" : "How to Apply for this Scheme"}
                </p>
                <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, margin:0 }}>
                  {isMarathi
                    ? "या व्हिडिओमध्ये अर्ज प्रक्रिया स्टेप-बाय-स्टेप समजावून सांगितली आहे."
                    : "This video explains the application process step-by-step."}
                </p>
              </div>
            </a>
          )}

          {/* Apply steps */}
          {activeTab === "apply" && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <p style={{ fontSize:15, fontWeight:800, color:"#1a2e22", margin:"0 0 4px" }}>
                {isMarathi ? "ऑनलाइन अर्ज करण्याची प्रक्रिया" : "Online Application Process"}
              </p>
              {APPLY_STEPS.map((item, i) => (
                <div key={item.step} style={{
                  display:"flex", alignItems:"flex-start", gap:14,
                  background:"#fff", borderRadius:16, padding:"16px",
                  boxShadow:"0 2px 10px rgba(0,0,0,0.06)",
                  animation:`detailPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*100}ms both`,
                }}>
                  <div style={{
                    width:40, height:40, borderRadius:"50%", flexShrink:0,
                    background:"linear-gradient(135deg,#1B4332,#40916c)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, fontWeight:900, color:"#FACC15",
                    boxShadow:"0 4px 12px rgba(27,67,50,0.28)",
                  }}>
                    {isMarathi ? ["१","२","३"][i] : item.step}
                  </div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:800, color:"#1a2e22", margin:"0 0 4px" }}>{item.title}</p>
                    <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.6, margin:0 }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* ── Sticky apply CTA ── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0,
        padding:"10px 16px 22px",
        background:"linear-gradient(to top, #f0fdf4 75%, transparent)",
        zIndex:10,
        opacity: 1,
      }}>
        <a href={scheme?.officialLink || "#"} target="_blank" rel="noopener noreferrer"
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            width:"100%", padding:"16px",
            background:"linear-gradient(135deg,#FF8C00,#e05500)",
            color:"#fff", fontWeight:900, fontSize:16,
            borderRadius:14, textDecoration:"none",
            fontFamily:"inherit", letterSpacing:"0.04em",
            boxShadow:"0 6px 20px rgba(255,140,0,0.38)",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(255,140,0,0.52)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(255,140,0,0.38)"; }}
        >
          {isMarathi ? "अधिकृत वेबसाईटवर अर्ज करा" : "Apply on Official Website"}
          <ExternalLink size={18} />
        </a>
      </div>

      <style>{`
        @keyframes detailPopIn {
          from { opacity:0; transform:translateY(16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes wheatSway {
          0%,100% { transform:rotate(4deg) translateX(0px); }
          40%      { transform:rotate(8deg) translateX(2px); }
          70%      { transform:rotate(1deg) translateX(-2px); }
        }
        @keyframes wheatSwayFlip {
          0%,100% { transform:scaleX(-1) rotate(4deg) translateX(0px); }
          40%      { transform:scaleX(-1) rotate(8deg) translateX(2px); }
          70%      { transform:scaleX(-1) rotate(1deg) translateX(-2px); }
        }
      `}</style>
    </div>
  );
}