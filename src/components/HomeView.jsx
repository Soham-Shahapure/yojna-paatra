import { useEffect, useState, useRef, useCallback } from "react";

// ── Cinematic Intro Logo (Recreated from your uploaded image) ─────────────────
const IntroLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
    {/* The 3D Green Circle */}
    <div style={{
      width: 140, height: 140,
      borderRadius: '50%',
      background: 'linear-gradient(145deg, #184430, #2c7150)',
      boxShadow: '0 0 0 10px #f4f7f5, 0 15px 35px rgba(0,0,0,0.15), inset 0 5px 15px rgba(0,0,0,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Plant Icon */}
      <svg viewBox="0 0 60 80" width="55" height="75" fill="white">
        <rect x="28" y="16" width="4" height="54" rx="2" />
        <ellipse cx="30" cy="16" rx="7" ry="12" />
        <ellipse cx="16" cy="30" rx="6" ry="11" transform="rotate(-40 16 30)" />
        <ellipse cx="44" cy="30" rx="6" ry="11" transform="rotate(40 44 30)" />
        <ellipse cx="14" cy="46" rx="6" ry="11" transform="rotate(-30 14 46)" />
        <ellipse cx="46" cy="46" rx="6" ry="11" transform="rotate(30 46 46)" />
        <ellipse cx="18" cy="62" rx="5" ry="10" transform="rotate(-20 18 62)" />
        <ellipse cx="42" cy="62" rx="5" ry="10" transform="rotate(20 42 62)" />
      </svg>
    </div>

    {/* Typography Section */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ width: 45, height: 1.5, background: '#a0b3a6' }} />
      <span style={{
        fontFamily: "'Noto Serif', 'Georgia', serif",
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: '0.15em',
        color: '#1a4331'
      }}>YOJNA-PAATRA</span>
      <div style={{ width: 45, height: 1.5, background: '#a0b3a6' }} />
    </div>
  </div>
);

// ── Card logo mark ────────────────────────────────────────────────────────────
const CardLogoMark = () => (
  <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:36, height:36 }}>
    <path d="M28 46 L28 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="28" cy="13" rx="5" ry="8"  fill="white" opacity="0.95" transform="rotate(-10 28 13)"/>
    <ellipse cx="21" cy="24" rx="4" ry="7"  fill="white" opacity="0.8"  transform="rotate(-28 21 24)"/>
    <ellipse cx="35" cy="24" rx="4" ry="7"  fill="white" opacity="0.8"  transform="rotate(28 35 24)"/>
    <ellipse cx="19" cy="34" rx="3" ry="6"  fill="white" opacity="0.6"  transform="rotate(-22 19 34)"/>
    <ellipse cx="37" cy="34" rx="3" ry="6"  fill="white" opacity="0.6"  transform="rotate(22 37 34)"/>
    <path d="M28 24 L21 24" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M28 24 L35 24" stroke="white" strokeWidth="1" opacity="0.5"/>
    <path d="M28 34 L19 34" stroke="white" strokeWidth="1" opacity="0.4"/>
    <path d="M28 34 L37 34" stroke="white" strokeWidth="1" opacity="0.4"/>
  </svg>
);

// ── Wheat stalk ───────────────────────────────────────────────────────────────
const WheatStalk = ({ style }) => (
  <svg viewBox="0 0 60 160" fill="none" style={style}>
    <path d="M30 155 Q28 120 30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <ellipse cx="30" cy="18" rx="7" ry="13" fill="currentColor" opacity="0.85" transform="rotate(-8 30 18)"/>
    <ellipse cx="20" cy="38" rx="6" ry="11" fill="currentColor" opacity="0.7"  transform="rotate(-28 20 38)"/>
    <ellipse cx="40" cy="38" rx="6" ry="11" fill="currentColor" opacity="0.7"  transform="rotate(28 40 38)"/>
    <ellipse cx="16" cy="60" rx="5" ry="10" fill="currentColor" opacity="0.55" transform="rotate(-22 16 60)"/>
    <ellipse cx="44" cy="60" rx="5" ry="10" fill="currentColor" opacity="0.55" transform="rotate(22 44 60)"/>
  </svg>
);

// ── Leaf SVG ──────────────────────────────────────────────────────────────────
const LeafSVG = ({ color }) => (
  <svg viewBox="0 0 32 42" fill="none" style={{ width:"100%", height:"100%" }}>
    <path d="M16 40 C16 40 2 30 2 17 C2 8 8 1 16 1 C24 1 30 8 30 17 C30 30 16 40 16 40Z" fill={color}/>
    <path d="M16 40 C16 28 16 12 16 1" stroke="rgba(255,255,255,0.28)" strokeWidth="1" strokeLinecap="round"/>
    <path d="M16 20 C12 16 7 15 2 15"  stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M16 28 C20 24 25 23 30 23" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinecap="round"/>
  </svg>
);

const FALLING_LEAVES = [
  { id:0,  left:"2%",   size:15, duration:11, delay:0,   drift:55,  rot:320,  color:"#FF9933" },
  { id:1,  left:"8%",   size:20, duration:15, delay:4,   drift:40,  rot:-280, color:"#FFB347" },
  { id:2,  left:"13%",  size:12, duration:9,  delay:7,   drift:70,  rot:440,  color:"#FF8C00" },
  { id:3,  left:"22%",  size:18, duration:13, delay:2,   drift:-45, rot:-360, color:"#FFA500" },
  { id:4,  left:"31%",  size:14, duration:10, delay:9,   drift:60,  rot:290,  color:"#FF9933" },
  { id:5,  left:"42%",  size:22, duration:16, delay:1,   drift:-55, rot:-410, color:"#FFB347" },
  { id:6,  left:"51%",  size:11, duration:8,  delay:5.5, drift:80,  rot:500,  color:"#FFCC80" },
  { id:7,  left:"62%",  size:19, duration:14, delay:3,   drift:-70, rot:-330, color:"#FF8C00" },
  { id:8,  left:"71%",  size:13, duration:10, delay:8,   drift:50,  rot:370,  color:"#FFA500" },
  { id:9,  left:"80%",  size:21, duration:12, delay:0.5, drift:-60, rot:-420, color:"#FF9933" },
  { id:10, left:"88%",  size:16, duration:9,  delay:6,   drift:45,  rot:310,  color:"#FFB347" },
  { id:11, left:"94%",  size:24, duration:17, delay:2.5, drift:-35, rot:-260, color:"#FF8C00" },
];

const LEAF_COLORS = ["#FF9933","#FFB347","#FF8C00","#FFA500","#FFCC80","#F97316","#FB923C","#FDBA74"];

function makeLeafImg(color) {
  const c = document.createElement("canvas");
  c.width = 32; c.height = 42;
  const ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(16,40); ctx.bezierCurveTo(16,40,2,30,2,17);
  ctx.bezierCurveTo(2,8,8,1,16,1);
  ctx.bezierCurveTo(24,1,30,8,30,17);
  ctx.bezierCurveTo(30,30,16,40,16,40);
  ctx.fillStyle = color; ctx.fill();
  ctx.beginPath(); ctx.moveTo(16,40); ctx.lineTo(16,1);
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth=1; ctx.stroke();
  return c;
}

class BurstParticle {
  constructor(x, y, imgs) {
    this.x = x; this.y = y;
    this.img = imgs[Math.floor(Math.random() * imgs.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.5 + Math.random() * 7;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 4;
    this.gravity = 0.08 + Math.random() * 0.07;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.28;
    this.scale = 0.5 + Math.random() * 1.4;
    this.alpha = 1;
    this.decay = 0.004 + Math.random() * 0.006;
    this.alive = true;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += this.gravity; this.vx *= 0.982;
    this.rotation += this.rotSpeed;
    this.alpha -= this.decay;
    if (this.alpha <= 0) this.alive = false;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.img, -16, -21);
    ctx.restore();
  }
}

function CTAExplosionCanvas({ onDone }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;
    const imgs = LEAF_COLORS.map(makeLeafImg);
    const cx = W / 2, cy = H / 2 + 80;
    let particles = Array.from({ length: 140 }, () =>
      new BurstParticle(cx + (Math.random()-0.5)*W*0.55, cy + (Math.random()-0.5)*30, imgs)
    );
    let overlay = 0, frame = 0, animId;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      particles = particles.filter(p => p.alive);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      if (frame > 50) {
        overlay = Math.min(1, overlay + 0.042);
        ctx.fillStyle = `rgba(240,253,244,${overlay})`;
        ctx.fillRect(0, 0, W, H);
      }
      if (overlay >= 1) { cancelAnimationFrame(animId); onDone(); return; }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [onDone]);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:9999, pointerEvents:"none", width:"100%", height:"100%" }} />;
}

const CONTENT = {
  mr: { headline: "सरकारी योजना शोधा", subtitle: "तुमच्यासाठी योग्य सरकारी मदत — मोफत आणि सोपे.", cta: "सुरू करा →", footer: "मोफत · कागदपत्रे नाहीत · सुरक्षित" },
  en: { headline: "Find Schemes You Deserve", subtitle: "Government support made for farmers like you — free and simple.", cta: "Get Started →", footer: "Free · No Documents · Secure" },
};

export default function HomeView({ onStart, language, setLanguage }) {
  // Intro Animation States
  const [introVisible, setIntroVisible] = useState(false);
  const [introZooming, setIntroZooming] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  
  // Main App States
  const [cardVisible, setCardVisible] = useState(false);
  const [exploding, setExploding]     = useState(false);
  
  const t = CONTENT[language] || CONTENT.mr;

  // The JioStar Cinematic Sequence
  useEffect(() => {
    // Step 1: Small pop-in fade (Trigger almost instantly)
    const t1 = setTimeout(() => setIntroVisible(true), 100);

    // Step 2: Hold for 1.5 seconds, then zoom towards the camera and fade out
    const t2 = setTimeout(() => setIntroZooming(true), 1600);

    // Step 3: Remove the intro overlay completely and pop up the main card
    const t3 = setTimeout(() => {
      setIntroDone(true);
      setCardVisible(true);
    }, 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleCTA = useCallback(() => setExploding(true), []);

  return (
    <div style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", fontFamily: "'Noto Serif','Georgia',serif",
      padding: "24px 20px",
    }}>

      {/* ── CINEMATIC INTRO OVERLAY ── */}
      {!introDone && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100000,
          backgroundColor: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: introZooming ? 0 : 1, // Fades out the white background
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease-in-out',
        }}>
          <div style={{
            transform: introVisible 
              ? (introZooming ? 'scale(5)' : 'scale(1)') // Zooms massively into the camera
              : 'scale(0.8)', // Starts slightly small
            opacity: introVisible 
              ? (introZooming ? 0 : 1) // Fades out during the zoom
              : 0, 
            transition: introZooming
              ? 'transform 0.6s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.5s ease-in'
              : 'transform 0.8s cubic-bezier(0.34, 1.46, 0.64, 1), opacity 0.8s ease',
          }}>
            <IntroLogo />
          </div>
        </div>
      )}

      {/* BG farm photo */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:`url('https://images.unsplash.com/photo-1625246333195-58197bd47d72?w=1600&auto=format&fit=crop&q=80')`,
        backgroundSize:"cover", backgroundPosition:"center 55%",
      }} />

      {/* Dark overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:1,
        background:"linear-gradient(165deg,rgba(5,20,11,0.88) 0%,rgba(12,42,24,0.80) 50%,rgba(5,16,10,0.90) 100%)",
      }} />

      {/* Gold top bar */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:3, zIndex:10,
        background:"linear-gradient(90deg,transparent,#FF9933 30%,#FACC15 50%,#FF9933 70%,transparent)",
      }} />

      {/* ── Wheat stalks — always visible ── */}
      {[
        { left:"-8px",  height:220, opacity:0.18, delay:"0s",   dur:"4.5s" },
        { left:"28px",  height:180, opacity:0.13, delay:"0.8s", dur:"5.5s" },
        { left:"58px",  height:150, opacity:0.10, delay:"1.4s", dur:"4s"   },
      ].map((s,i) => (
        <div key={`wl${i}`} style={{
          position:"absolute", bottom:0, left:s.left, zIndex:2,
          height:s.height, width:s.height*0.38,
          color:"#FF9933", opacity:s.opacity, transformOrigin:"bottom center",
          animation:`wheatSway ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:"none",
        }}>
          <WheatStalk style={{ width:"100%", height:"100%" }} />
        </div>
      ))}
      {[
        { right:"-8px",  height:240, opacity:0.18, delay:"0.4s", dur:"5s"   },
        { right:"26px",  height:195, opacity:0.13, delay:"1.2s", dur:"4.5s" },
        { right:"54px",  height:160, opacity:0.10, delay:"0s",   dur:"6s"   },
      ].map((s,i) => (
        <div key={`wr${i}`} style={{
          position:"absolute", bottom:0, right:s.right, zIndex:2,
          height:s.height, width:s.height*0.38,
          color:"#FF9933", opacity:s.opacity, transformOrigin:"bottom center",
          transform:"scaleX(-1)",
          animation:`wheatSway ${s.dur} ease-in-out ${s.delay} infinite`,
          pointerEvents:"none",
        }}>
          <WheatStalk style={{ width:"100%", height:"100%" }} />
        </div>
      ))}

      {/* ── Falling leaves — start immediately on app open ── */}
      {FALLING_LEAVES.map(leaf => (
        <div key={leaf.id} style={{
          position:"absolute", top:"-55px", left:leaf.left,
          width:leaf.size, height:leaf.size*1.3,
          zIndex:3, pointerEvents:"none",
          animation:`leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
          "--drift":`${leaf.drift}px`, "--rot":`${leaf.rot}deg`,
        }}>
          <LeafSVG color={leaf.color} />
        </div>
      ))}

      {/* CTA explosion */}
      {exploding && <CTAExplosionCanvas onDone={onStart} />}

      {/* ── Main Card — scales from centre after Intro completes ── */}
      <div style={{
        position:"relative", zIndex:5, width:"100%", maxWidth:400,
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
        transition: cardVisible
          ? "opacity 0.7s cubic-bezier(0.34,1.46,0.64,1), transform 0.7s cubic-bezier(0.34,1.46,0.64,1)"
          : "none",
        pointerEvents: cardVisible ? "auto" : "none",
      }}>
        <div style={{
          background:"#ffffff", borderRadius:22,
          padding:"36px 34px 32px",
          boxShadow:"0 28px 72px rgba(0,0,0,0.48), 0 2px 8px rgba(0,0,0,0.12)",
          textAlign:"center",
        }}>
          {/* Logo inside card */}
          <div style={{ marginBottom:20 }}>
            <div style={{
              width:80, height:80, borderRadius:"50%",
              background:"linear-gradient(145deg,#1B4332 0%,#2d6a4f 60%,#3a7a5c 100%)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 14px",
              boxShadow:"0 0 0 6px rgba(27,67,50,0.10), 0 10px 28px rgba(27,67,50,0.38)",
              position:"relative",
            }}>
              <div style={{ position:"absolute", inset:-4, borderRadius:"50%", border:"1.5px solid rgba(250,204,21,0.3)" }} />
              <CardLogoMark />
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
              <div style={{ height:1, width:28, background:"linear-gradient(to right,transparent,#c8d8ce)" }} />
              <span style={{ fontSize:12, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:"#2d6a4f" }}>
                Yojna-Paatra
              </span>
              <div style={{ height:1, width:28, background:"linear-gradient(to left,transparent,#c8d8ce)" }} />
            </div>
          </div>

          <h1 style={{ fontSize:"clamp(22px,5vw,32px)", fontWeight:900, color:"#1a2e22", lineHeight:1.22, margin:"0 0 10px" }}>
            {t.headline}
          </h1>
          <p style={{ fontSize:14, color:"#6b8f7a", lineHeight:1.65, margin:"0 0 28px" }}>
            {t.subtitle}
          </p>

          {/* Language toggle */}
          <div style={{ display:"inline-flex", background:"#f1f5f2", borderRadius:10, padding:4, marginBottom:24, border:"1px solid #e2ebe5" }}>
            {["mr","en"].map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} style={{
                padding:"8px 24px", borderRadius:7, border:"none",
                fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit",
                transition:"all 0.2s ease",
                background: language===lang ? "#1B4332" : "transparent",
                color:       language===lang ? "#ffffff" : "#7a9485",
                boxShadow:   language===lang ? "0 2px 10px rgba(27,67,50,0.28)" : "none",
              }}>
                {lang==="mr" ? "मराठी" : "English"}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleCTA}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(255,140,0,0.52)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(255,140,0,0.36)"; }}
            style={{
              width:"100%", padding:"15px",
              background:"linear-gradient(135deg,#FF8C00,#e05500)",
              color:"#fff", fontWeight:900, fontSize:16,
              border:"none", borderRadius:12, cursor:"pointer",
              fontFamily:"inherit", letterSpacing:"0.04em",
              boxShadow:"0 6px 20px rgba(255,140,0,0.36)",
              transition:"transform 0.2s ease, box-shadow 0.2s ease",
            }}>
            {t.cta}
          </button>

          <p style={{ fontSize:11, color:"#a8bfb3", marginTop:14, letterSpacing:"0.04em" }}>
            {t.footer}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes leafFall {
          0%   { transform:translateY(-60px) translateX(0px) rotate(0deg) scale(1); opacity:0; }
          6%   { opacity:0.8; }
          40%  { transform:translateY(38vh) translateX(calc(var(--drift)*0.4)) rotate(calc(var(--rot)*0.4)) scale(0.95); }
          85%  { opacity:0.55; }
          100% { transform:translateY(106vh) translateX(var(--drift)) rotate(var(--rot)) scale(0.75); opacity:0; }
        }
        @keyframes wheatSway {
          0%,100% { transform:rotate(5deg) translateX(0px);  }
          40%      { transform:rotate(8deg) translateX(2px);  }
          70%      { transform:rotate(1deg) translateX(-2px); }
        }
      `}</style>
    </div>
  );
}