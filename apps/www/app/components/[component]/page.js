"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const REGISTRY_META = {
  "glow-button":         { name: "Glow Button",         category: "Buttons",  deps: ["framer-motion", "clsx", "tailwind-merge"] },
  "reactor-button":      { name: "Reactor Button",       category: "Buttons",  deps: [] },
  "bomb-timer":          { name: "Bomb Timer",           category: "Badges",   deps: [] },
  "reactor-badge":       { name: "Reactor Badge",        category: "Badges",   deps: [] },
  "status-badge":        { name: "Status Badge",         category: "Badges",   deps: [] },
  "tactical-hex-badge":  { name: "Tactical Hex Badge",   category: "Badges",   deps: [] },
  "reactor-card":        { name: "Reactor Card",         category: "Cards",    deps: [] },
  "stack-carousel":      { name: "Stack Carousel",       category: "Cards",    deps: [] },
  "radial-command-menu": { name: "Radial Command Menu",  category: "Menus",    deps: ["framer-motion"] },
  "core-console":        { name: "Core Console",         category: "Panels",   deps: [] },
  "weapon-module-panel": { name: "Weapon Module Panel",  category: "Panels",   deps: [] },
  "control-slider":      { name: "Control Slider",       category: "Sliders",  deps: [] },
  "reactor-toggle":      { name: "Reactor Toggle",       category: "Toggles",  deps: [] },
};

// ══════════════════════════════════════════════════════════════════════════════
// LIVE PREVIEW COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

// ── GlowButton Preview ────────────────────────────────────────────────────────
function GlowButtonPreview() {
  const [pressed, setPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => { setLoading(true); setTimeout(() => setLoading(false), 1800); };
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <button className="glow-wrapper" onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)} onMouseLeave={() => setPressed(false)} onClick={handleClick} disabled={loading}>
        <span className="ambient-glow" />
        <span className={`glow-inner${pressed ? " pressed" : ""}`}>
          <span className="label">{loading ? "Loading..." : "Click me"}</span>
          {loading ? <span className="spinner" /> : <span className="arrow">→</span>}
          <span className="reflection" />
        </span>
      </button>
      <button className="glow-wrapper disabled" disabled>
        <span className="ambient-glow" />
        <span className="glow-inner"><span className="label">Disabled</span><span className="arrow">→</span><span className="reflection" /></span>
      </button>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>Click the button to see loading state</p>
    </div>
  );
}

// ── ReactorButton Preview ─────────────────────────────────────────────────────
function ReactorButtonPreview() {
  const variants = [{ name: "orange", color: "#DE732C" }, { name: "blue", color: "#126fff" }, { name: "green", color: "#176635" }];
  const [selected, setSelected] = useState(variants[1]);
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
        {variants.map((v) => (
          <button key={v.name} onClick={() => setSelected(v)} style={{ width: 28, height: 28, borderRadius: "50%", background: v.color, cursor: "pointer", border: "2px solid transparent", boxShadow: selected.name === v.name ? `0 0 16px ${v.color}` : "none", transition: "all 0.2s", outline: "none" }} title={v.name} />
        ))}
      </div>
      <button className={`reactor-btn ${selected.name}`}>
        <span className="reactor-core" /><span className="reactor-text">Launch</span><span className="reactor-ring" />
      </button>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>Click the color swatches to change variant</p>
    </div>
  );
}

// ── BombTimer Preview ─────────────────────────────────────────────────────────
function BombTimerPreview() {
  const [timeLeft, setTimeLeft] = useState(25);
  const [booting, setBooting] = useState(true);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => setBooting(false), 1500);
    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    if (booting || exploded) return;
    if (timeLeft <= 0) { setExploded(true); return; }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, booting, exploded]);

  const formatDigits = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return [Math.floor(mins / 10), mins % 10, ":", Math.floor(secs / 10), secs % 10];
  };

  const state = timeLeft <= 10 ? "critical" : timeLeft <= 15 ? "warning" : "normal";

  const SevenSegDigit = ({ value }) => {
    const segs = {
      0: ["a","b","c","d","e","f"], 1: ["b","c"], 2: ["a","b","g","e","d"], 3: ["a","b","g","c","d"],
      4: ["f","g","b","c"], 5: ["a","f","g","c","d"], 6: ["a","f","g","c","d","e"],
      7: ["a","b","c"], 8: ["a","b","c","d","e","f","g"], 9: ["a","b","c","d","f","g"]
    };
    return (
      <div className="digit">
        {["a","b","c","d","e","f","g"].map((s) => (
          <div key={s} className={`segment ${s}${segs[value]?.includes(s) ? " on" : ""}`} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "20px 0" }}>
      <div className={`bomb-board ${state}`}>
        {exploded && <div className="explosion-flash" />}
        <div className="wires">
          <div className="wire red" /><div className="wire blue" /><div className="wire yellow" />
        </div>
        <div className="lcd-container">
          <div className="lcd-screen">
            {booting ? (
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#8cff72", textShadow: "0 0 6px #8cff72", letterSpacing: "0.1em" }}>INITIALIZING...</div>
            ) : (
              <div className="lcd-digits">
                {formatDigits().map((c, i) => c === ":" ? <div key={i} className="colon">:</div> : <SevenSegDigit key={i} value={c} />)}
              </div>
            )}
            <div className="lcd-noise" />
          </div>
        </div>
        <div className="side-bumps">
          <div className="bump" /><div className="bump" /><div className="bump" /><div className="bump" />
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>Countdown timer with realistic PCB styling</p>
    </div>
  );
}

// ── RadialCommandMenu Preview ─────────────────────────────────────────────────
function RadialCommandMenuPreview() {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  const items = [
    { label: "FILE", onClick: () => setSelected("File") },
    { label: "EDIT", onClick: () => setSelected("Edit") },
    { label: "VIEW", onClick: () => setSelected("View") },
    { label: "CODE", onClick: () => setSelected("Code") },
    { label: "RUN", onClick: () => setSelected("Run") },
    { label: "HELP", onClick: () => setSelected("Help") }
  ];

  const SIZE = 360;
  const CENTER = SIZE / 2;
  const INNER_RADIUS = 80;
  const OUTER_RADIUS = 160;

  const polarToCartesian = (cx, cy, radius, angle) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle)
  });

  const describeArc = (startAngle, endAngle) => {
    const startOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, startAngle);
    const endOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, endAngle);
    const startInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, endAngle);
    const endInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, startAngle);
    const largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
    return `M ${startOuter.x} ${startOuter.y} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y} L ${startInner.x} ${startInner.y} A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${endInner.x} ${endInner.y} Z`;
  };

  const describeOuterArc = (startAngle, endAngle) => {
    const HIGHLIGHT_RADIUS = OUTER_RADIUS + 12;
    const start = polarToCartesian(CENTER, CENTER, HIGHLIGHT_RADIUS, startAngle);
    const end = polarToCartesian(CENTER, CENTER, HIGHLIGHT_RADIUS, endAngle);
    const largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;
    return `M ${start.x} ${start.y} A ${HIGHLIGHT_RADIUS} ${HIGHLIGHT_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const sliceAngle = (2 * Math.PI) / items.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "40px 20px" }}>
      <div
        className="radial-wrapper"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setActiveIndex(null); }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          className="radial-svg"
          style={{
            position: "absolute",
            transform: hovered ? "scale(1)" : "scale(0.8)",
            opacity: hovered ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          {items.map((item, index) => {
            const start = index * sliceAngle - Math.PI / 2;
            const end = start + sliceAngle;
            const isActive = activeIndex === index;
            return (
              <g key={index}>
                <path
                  d={describeArc(start, end)}
                  className={`radial-slice${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={item.onClick}
                />
                {isActive && (
                  <path
                    d={describeOuterArc(start, end)}
                    className="radial-highlight"
                    style={{ strokeDasharray: 1000, strokeDashoffset: 0 }}
                  />
                )}
                <text
                  x={polarToCartesian(CENTER, CENTER, (INNER_RADIUS + OUTER_RADIUS) / 2, start + sliceAngle / 2).x}
                  y={polarToCartesian(CENTER, CENTER, (INNER_RADIUS + OUTER_RADIUS) / 2, start + sliceAngle / 2).y}
                  className="radial-label"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="radial-core">MENU</div>
      </div>
      {selected && (
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textAlign: "center" }}>
          Selected: <strong>{selected}</strong>
        </p>
      )}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Hover over center to reveal menu
      </p>
    </div>
  );
}

// ── ReactorCard Preview ───────────────────────────────────────────────────────
function ReactorCardPreview() {
  const variants = [
    { name: "orange", color: "#DE732C" },
    { name: "blue",   color: "#126fff" },
    { name: "green",  color: "#176635" }
  ];
  const [selected, setSelected] = useState(variants[0]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, padding: "40px 20px" }}>
      
      {/* Variant selector */}
      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
        {variants.map((v) => (
          <button
            key={v.name}
            onClick={() => setSelected(v)}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: v.color,
              cursor: "pointer",
              border: "2px solid transparent",
              boxShadow: selected.name === v.name ? `0 0 16px ${v.color}` : "none",
              transition: "all 0.2s",
              outline: "none"
            }}
            title={v.name}
          />
        ))}
      </div>

      {/* Reactor card */}
      <div className={`reactor-card ${selected.name}`}>
        <div className="reactor-card-border" />
        <div className="reactor-card-core" />
        <div className="reactor-card-content">
          <div className="reactor-card-header">
            <h3>Fusion Reactor Core</h3>
            <span className="reactor-status">ONLINE</span>
          </div>
          <div className="reactor-card-body">
            High-output energy module with quantum-stable plasma containment and automated cooling systems.
          </div>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Click the color swatches to change variant
      </p>
    </div>
  );
}

// ── CoreConsole Preview ───────────────────────────────────────────────────────
function CoreConsolePreview() {
  const [power, setPower] = useState(65);
  const [radiation, setRadiation] = useState(32);
  const [systemOn, setSystemOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadiation((r) => {
        let next = r + (Math.random() * 4 - 2);
        return Math.max(0, Math.min(100, next));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const needleRotation = power * 1.8 - 90;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "20px" }}>
      <div className="console-panel">
        <div className="panel-header">REACTOR CONTROL SECTOR B-12</div>
        <div className="panel-grid">
          
          {/* Analog gauge */}
          <div className="panel-module">
            <div className="gauge-container">
              <div className="gauge-face">
                <div className="gauge-needle" style={{ transform: `rotate(${needleRotation}deg)` }} />
                <div className="gauge-pivot" />
              </div>
              <div className="module-label">POWER OUTPUT</div>
            </div>
          </div>

          {/* CRT screen */}
          <div className="panel-module crt-module">
            <div className="crt-screen">
              <div className="scanline" />
              <div className="crt-content">
                RADIATION
                <div className="crt-value">{Math.round(radiation)}%</div>
              </div>
            </div>
          </div>

          {/* Toggle lever */}
          <div className="panel-module">
            <div className="safety-guard">
              <div className="glass-cover" />
              <div className={`lever${systemOn ? " on" : ""}`} onClick={() => setSystemOn(!systemOn)} />
            </div>
            <div className="module-label">MAIN SYSTEM</div>
          </div>

        </div>

        {/* Emergency button */}
        <div className="emergency-strip">
          <button className="industrial-shutdown" onClick={() => { setPower(0); setSystemOn(false); }}>
            EMERGENCY SCRAM
          </button>
        </div>

        {/* Rivets */}
        <div className="rivet tl" /><div className="rivet tr" /><div className="rivet bl" /><div className="rivet br" />
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Click the lever or emergency button to interact
      </p>
    </div>
  );
}

// ── StatusBadge Preview ───────────────────────────────────────────────────────
function StatusBadgePreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "40px 20px", alignItems: "center" }}>
      
      {/* Variants */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 16 }}>VARIANTS</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <div className="status-badge info"><span className="badge-dot" /><span>ONLINE</span></div>
          <div className="status-badge safe"><span className="badge-dot" /><span>SECURE</span></div>
          <div className="status-badge warning"><span className="badge-dot" /><span>CAUTION</span></div>
          <div className="status-badge critical"><span className="badge-dot" /><span>ALERT</span></div>
        </div>
      </div>

      {/* Sizes */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 16 }}>SIZES</p>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
          <div className="status-badge info sm"><span className="badge-dot" /><span>SMALL</span></div>
          <div className="status-badge safe"><span className="badge-dot" /><span>MEDIUM</span></div>
          <div className="status-badge warning lg"><span className="badge-dot" /><span>LARGE</span></div>
        </div>
      </div>

      {/* Effects */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 16 }}>EFFECTS</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <div className="status-badge info pulse"><span className="badge-dot" /><span>PULSE</span></div>
          <div className="status-badge safe shimmer"><span className="badge-dot" /><span>SHIMMER</span></div>
          <div className="status-badge critical pulse shimmer"><span className="badge-dot" /><span>BOTH</span></div>
        </div>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Status indicators with variants, sizes, and effects
      </p>
    </div>
  );
}

// ── ReactorBadge Preview ──────────────────────────────────────────────────────
function ReactorBadgePreview() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const badges = [
    { label: "ONLINE", status: "success", color: "#00ff9d" },
    { label: "WARNING", status: "warning", color: "#ffb800" },
    { label: "CRITICAL", status: "danger", color: "#ff3c3c" },
    { label: "STANDBY", status: "default", color: "#aaa" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "40px 20px", alignItems: "center" }}>
      
      {/* Status variants */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 20 }}>STATUS VARIANTS</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {badges.map((badge, i) => (
            <span
              key={badge.status}
              className={`reactor-badge ${badge.status} md`}
              style={{ "--glow": 1, "--pulse-strength": 1, color: badge.color }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="glass-noise" />
              <span className="animated-border" />
              <span className={`badge-dot${badge.status === "danger" ? " dot-pulse" : ""}`} />
              <span className="badge-text">{badge.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 20 }}>SIZES</p>
        <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
          <span className="reactor-badge success sm" style={{ "--glow": 1, color: "#00ff9d" }}>
            <span className="glass-noise" /><span className="animated-border" />
            <span className="badge-dot" /><span className="badge-text">SMALL</span>
          </span>
          <span className="reactor-badge success md" style={{ "--glow": 1, color: "#00ff9d" }}>
            <span className="glass-noise" /><span className="animated-border" />
            <span className="badge-dot" /><span className="badge-text">MEDIUM</span>
          </span>
          <span className="reactor-badge success lg" style={{ "--glow": 1, color: "#00ff9d" }}>
            <span className="glass-noise" /><span className="animated-border" />
            <span className="badge-dot" /><span className="badge-text">LARGE</span>
          </span>
        </div>
      </div>

      {/* With loader */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 20 }}>LOADING STATE</p>
        <span className="reactor-badge warning md" style={{ "--glow": 1, color: "#ffb800" }}>
          <span className="glass-noise" /><span className="animated-border" />
          <span className="loader" />
          <span className="badge-text">LOADING</span>
        </span>
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Hover badges to see shimmer effect and animated borders
      </p>
    </div>
  );
}

// ── ControlSlider Preview ─────────────────────────────────────────────────────
function ControlSliderPreview() {
  const [value, setValue] = useState(50);
  const trackRef = useRef(null);

  const min = 0;
  const max = 100;
  const step = 5;
  const dangerThreshold = 80;
  const percentage = ((value - min) / (max - min)) * 100;
  const danger = value >= dangerThreshold;

  const snapToStep = (val) => {
    const snapped = Math.round(val / step) * step;
    return Math.max(min, Math.min(max, snapped));
  };

  const updateFromClientX = (clientX) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    const valueFromPercent = min + percent * (max - min);
    const snappedValue = snapToStep(valueFromPercent);
    setValue(snappedValue);
  };

  const handleMouseDown = (e) => {
    updateFromClientX(e.clientX);
    const move = (e) => updateFromClientX(e.clientX);
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: "40px 20px", alignItems: "center" }}>
      
      <div className="glass-slider">
        <div className="slider-header">
          <span className="slider-label">System Control</span>
          <span className={`slider-value${danger ? " danger" : ""}`}>{value}%</span>
        </div>
        <div ref={trackRef} className="slider-track" onMouseDown={handleMouseDown}>
          <div className={`slider-fill${danger ? " danger" : ""}`} style={{ width: `${percentage}%` }}>
            <div className="energy-pulse" />
          </div>
          <div className={`slider-handle${danger ? " danger" : ""}`} style={{ left: `${percentage}%` }} />
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", marginBottom: 8 }}>
          Danger threshold: {dangerThreshold}%
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
          Drag the slider to see color change
        </p>
      </div>
    </div>
  );
}

// ── ReactorToggle Preview ─────────────────────────────────────────────────────
function ReactorTogglePreview() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);

  const toggles = [
    { state: toggle1, setState: setToggle1, label: "Reactor System", color: "#00ffae" },
    { state: toggle2, setState: setToggle2, label: "Cooling System", color: "#3d8bff" },
    { state: toggle3, setState: setToggle3, label: "Alert System", color: "#ff5c5c" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: "40px 20px", alignItems: "center" }}>
      
      {toggles.map((t, i) => (
        <div key={i} className="reactor-toggle-wrapper">
          <span className={`toggle-label${t.state ? " active" : ""}`} style={t.state ? { color: t.color, textShadow: `0 0 10px ${t.color}` } : {}}>
            {t.label}
          </span>
          <div
            className={`reactor-toggle${t.state ? " active" : ""}`}
            style={{ "--color": t.color }}
            onClick={() => t.setState(!t.state)}
          >
            <div className="toggle-energy" />
            <div className="toggle-sweep" />
            <span className="toggle-status on-text" style={{ color: t.color, textShadow: t.state ? `0 0 4px ${t.color}, 0 0 8px ${t.color}` : "none" }}>ON</span>
            <span className="toggle-status off-text">OFF</span>
            <div className="toggle-core" style={t.state ? { background: `radial-gradient(circle at 30% 30%, ${t.color}, #006b4a)`, boxShadow: `0 0 15px ${t.color}, 0 4px 10px rgba(0,0,0,0.6)` } : {}} />
          </div>
        </div>
      ))}

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginTop: 16 }}>
        Click toggles to see animated transitions
      </p>
    </div>
  );
}

// ── WeaponModulePanel Preview ─────────────────────────────────────────────────
function WeaponModulePanelPreview() {
  const modules = [
    { name: "STRIKER", type: "Assault", stats: { damage: 85, accuracy: 70, stability: 60, mobility: 55, penetration: 75 } },
    { name: "PHANTOM", type: "Stealth", stats: { damage: 65, accuracy: 90, stability: 80, mobility: 85, penetration: 50 } },
    { name: "TITAN", type: "Heavy", stats: { damage: 95, accuracy: 50, stability: 40, mobility: 30, penetration: 90 } },
    { name: "RECON", type: "Scout", stats: { damage: 55, accuracy: 95, stability: 85, mobility: 90, penetration: 45 } }
  ];

  const [active, setActive] = useState(modules[0]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, padding: "40px 20px", alignItems: "center" }}>
      
      <div className="weapon-panel">
        <div className="weapon-header">
          <h2>WEAPON MODULE SELECTOR</h2>
          <div className="weapon-sub">TACTICAL CONFIGURATION</div>
        </div>

        <div className="module-grid">
          {modules.map((module, i) => (
            <div
              key={i}
              className={`module-card${active?.name === module.name ? " active" : ""}`}
              onClick={() => setActive(module)}
            >
              <div className="module-glass" />
              <div className="module-content">
                <div className="module-title">{module.name}</div>
                <div className="module-type">{module.type}</div>
              </div>
              <div className="module-led" />
            </div>
          ))}
        </div>

        {active && (
          <div className="stats-panel">
            <div className="stats-content">
              {Object.entries(active.stats).map(([stat, value]) => (
                <div className="stat-row" key={stat}>
                  <span className="stat-label">{stat.toUpperCase()}</span>
                  <div className="stat-bar">
                    <div className="stat-fill" style={{ width: `${value}%` }} />
                  </div>
                  <span className="stat-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Click module cards to see stat changes
      </p>
    </div>
  );
}

// ── StackCarousel Preview ─────────────────────────────────────────────────────
function StackCarouselPreview() {
  const initialCards = [
    { id: 1, variant: "blue", title: "Project Alpha", desc: "Advanced AI research initiative" },
    { id: 2, variant: "green", title: "Project Beta", desc: "Sustainable energy solutions" },
    { id: 3, variant: "orange", title: "Project Gamma", desc: "Quantum computing breakthrough" },
    { id: 4, variant: "blue", title: "Project Delta", desc: "Neural interface development" },
    { id: 5, variant: "green", title: "Project Epsilon", desc: "Autonomous systems research" }
  ];

  const [stack, setStack] = useState(initialCards);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setStack((prev) => {
        const updated = [...prev];
        const first = updated.shift();
        updated.push(first);
        return updated;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const rotateStack = () => {
    setStack((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, padding: "40px 20px", alignItems: "center" }}>
      
      <div 
        className="stack-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {stack.map((card, index) => (
          <div
            key={card.id}
            className={`stack-card ${card.variant}`}
            style={{
              transform: `translateY(${index * 14}px) scale(${1 - index * 0.05})`,
              opacity: index > 4 ? 0 : 1,
              zIndex: stack.length - index,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            onClick={() => index === 0 && rotateStack()}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>{card.desc}</p>
            </div>
            <div style={{ fontSize: 11, opacity: 0.5, fontFamily: "var(--font-mono)" }}>
              {index === 0 ? "Click or hover to pause" : `Card ${index + 1}`}
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Auto-rotates every 3 seconds • Click top card or hover to pause
      </p>
    </div>
  );
}

// ── TacticalHexBadge Preview ──────────────────────────────────────────────────
function TacticalHexBadgePreview() {
  const badges = [
    { label: "NODE A", status: "ONLINE", variant: "info", details: "Primary system node operating at optimal performance." },
    { label: "NODE B", status: "SECURE", variant: "safe", details: "Security protocols active. All systems encrypted." },
    { label: "NODE C", status: "WARNING", variant: "warning", details: "Temperature threshold approaching. Monitoring required." },
    { label: "NODE D", status: "CRITICAL", variant: "critical", details: "System anomaly detected. Immediate attention required." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "40px 20px", alignItems: "center" }}>
      
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {badges.map((badge, i) => (
          <div key={i} className="hex-wrapper">
            <div
              className={`hex-badge ${badge.variant}${badge.variant === "critical" ? " glitch" : ""}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ cursor: "pointer" }}
            >
              <div className="inner-border" />
              <div className="corner-rotor" />
              <div className="scan-line" />
              <div className="hex-content">
                <span className="hex-label">{badge.label}</span>
                <span className="hex-status">{badge.status}</span>
              </div>
            </div>
            {openIndex === i && (
              <div 
                className="hex-details"
                style={{
                  animation: "fadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              >
                {badge.details}
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
        Click hexagons to expand details
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// ── Placeholder Preview ───────────────────────────────────────────────────────
function PlaceholderPreview({ name }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: 32 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--bg-4)", border: "1px solid var(--border-hi)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)", marginBottom: 6 }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6 }}>
          Add your component files to enable<br />live preview for this component.
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = { "glow-button": GlowButtonPreview, "reactor-button": ReactorButtonPreview, "bomb-timer": BombTimerPreview, "radial-command-menu": RadialCommandMenuPreview, "reactor-card": ReactorCardPreview, "core-console": CoreConsolePreview, "status-badge": StatusBadgePreview, "reactor-badge": ReactorBadgePreview, "control-slider": ControlSliderPreview, "reactor-toggle": ReactorTogglePreview, "weapon-module-panel": WeaponModulePanelPreview, "stack-carousel": StackCarouselPreview, "tactical-hex-badge": TacticalHexBadgePreview };

// ══════════════════════════════════════════════════════════════════════════════
// UTILITY COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function CopyBtn({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copy}>
      {copied ? <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>Copied!</> : <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>{label}</>}
    </button>
  );
}

function SourceViewer({ files }) {
  const [active, setActive] = useState(files?.[0]?.name || "");
  if (!files?.length) return null;
  const current = files.find((f) => f.name === active);
  return (
    <div style={{ width: "100%", maxWidth: "var(--preview-max)" }}>
      <div className="file-tabs">{files.map((f) => <button key={f.name} className={`file-tab${active === f.name ? " active" : ""}`} onClick={() => setActive(f.name)}>{f.name}</button>)}</div>
      <div className="source-block"><div className="example-header"><span className="example-filename">{current?.name}</span><CopyBtn text={current?.content || ""} /></div><pre className="example-code"><code>{current?.content}</code></pre></div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function ComponentPage() {
  const params = useParams();
  const slug = params?.component;
  const meta = REGISTRY_META[slug];
  const [tab, setTab] = useState("Preview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true); setError(false);
    fetch(`/registry/styles/default/${slug}.json`).then((r) => { if (!r.ok) throw new Error(); return r.json(); }).then((d) => { setData(d); setLoading(false); }).catch(() => { setError(true); setLoading(false); });
  }, [slug]);

  if (!meta) return <div style={{ padding: "60px 0", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: 13 }}>Component &quot;{slug}&quot; not found.</div>;

  const PreviewComponent = PREVIEWS[slug] || null;
  const importName = meta.name.replace(/\s/g, "");
  const installCmd = `npx siloui add ${slug}`;
  const depsCmd = meta.deps.length ? `npm install ${meta.deps.join(" ")}` : null;
  const utilsCode = `import { clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs));\n}`;
  const usageCode = `import ${importName} from "@/components/ui/${importName}/${importName}"\nimport "@/components/ui/${importName}/${importName}.css"\n\nexport default function Example() {\n  return (\n    <${importName}>\n      Click me\n    </${importName}>\n  )\n}`;

  return (
    <div>
      <div className="comp-header">
        <h1 className="comp-title">{meta.name}</h1>
        <div className="comp-category">Category: <span>{meta.category}</span></div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
        <div className="tab-bar">{["Preview", "Code"].map((t) => <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>)}</div>
      </div>

      {tab === "Preview" && (
        <div className="preview-box"><div className="preview-bg-grid" /><div className="preview-content">{PreviewComponent ? <PreviewComponent /> : <PlaceholderPreview name={meta.name} />}</div><div className="preview-label">{meta.name}</div></div>
      )}

      {tab === "Code" && (
        <div className="example-box">
          {loading ? <div className="loading-dots" style={{ padding: "32px 20px" }}><span className="loading-dot"/><span className="loading-dot"/><span className="loading-dot"/></div> : error ? <div style={{ padding: 20, color: "#f87171", fontFamily: "var(--font-mono)", fontSize: 12 }}>Could not load source. Run <code>npm run build:registry</code> first.</div> : <><div className="example-header"><span className="example-filename">{data?.files?.[0]?.name}</span><CopyBtn text={data?.files?.[0]?.content || ""} /></div><pre className="example-code"><code>{data?.files?.[0]?.content}</code></pre></>}
        </div>
      )}

      <div className="install-section">
        <h2 className="install-heading">Installation</h2>
        <div className="install-step"><div className="install-step-number">1</div><div className="install-step-content"><div className="install-step-title">Run the CLI</div><div className="install-step-desc">This command will add the component files to your project and install dependencies automatically.</div><div className="install-cmd"><code>{installCmd}</code><CopyBtn text={installCmd} /></div></div></div>
        {depsCmd && <div className="install-step"><div className="install-step-number">2</div><div className="install-step-content"><div className="install-step-title">Install dependencies (manual)</div><div className="install-step-desc">If you prefer not to use the CLI, install the dependencies manually:</div><div className="install-cmd"><code>{depsCmd}</code><CopyBtn text={depsCmd} /></div></div></div>}
        {meta.deps.includes("clsx") && <div className="install-step"><div className="install-step-number">{depsCmd ? "3" : "2"}</div><div className="install-step-content"><div className="install-step-title">Add utility file</div><div className="install-step-desc">Create <code>lib/utils.js</code> with the following helper function:</div><div className="example-box"><div className="example-header"><span className="example-filename">lib/utils.js</span><CopyBtn text={utilsCode} /></div><pre className="example-code"><code>{utilsCode}</code></pre></div></div></div>}
        <div className="install-step"><div className="install-step-number">{meta.deps.includes("clsx") ? (depsCmd ? "4" : "3") : (depsCmd ? "3" : "2")}</div><div className="install-step-content"><div className="install-step-title">Copy the component files</div><div className="install-step-desc">If installing manually, copy these files into your project:</div>{loading ? <div className="loading-dots"><span className="loading-dot"/><span className="loading-dot"/><span className="loading-dot"/></div> : error ? <div style={{ color: "#f87171", fontFamily: "var(--font-mono)", fontSize: 12 }}>Could not load source files.</div> : <SourceViewer files={data?.files} />}</div></div>
        <div className="install-step"><div className="install-step-number">{meta.deps.includes("clsx") ? (depsCmd ? "5" : "4") : (depsCmd ? "4" : "3")}</div><div className="install-step-content"><div className="install-step-title">Usage</div><div className="install-step-desc">Import and use the component in your app:</div><div className="example-box"><div className="example-header"><span className="example-filename">Example.jsx</span><CopyBtn text={usageCode} /></div><pre className="example-code"><code>{usageCode}</code></pre></div></div></div>
      </div>

      {/* INJECT STYLES */}
      {slug === "glow-button" && <style>{`.glow-wrapper{position:relative;padding:2px;border-radius:999px;border:none;cursor:pointer;background:linear-gradient(120deg,#5f5fff,#ff6ec4,#ffa94d,#5f5fff);background-size:300% 300%;animation:borderFlow 10s linear infinite;display:inline-block;transition:transform .2s ease}.glow-wrapper.disabled{opacity:.6;cursor:not-allowed}@keyframes borderFlow{0%{background-position:0% 50%}100%{background-position:200% 50%}}.ambient-glow{position:absolute;inset:-20px;border-radius:999px;background:radial-gradient(circle at center,rgba(255,120,80,.25),transparent 70%);opacity:0;transition:opacity .4s ease;z-index:-1;filter:blur(30px)}.glow-wrapper:hover .ambient-glow{opacity:1}.glow-inner{position:relative;display:flex;align-items:center;gap:10px;padding:14px 32px;border-radius:999px;background:#0b0b0b;color:#fff;font-size:16px;font-weight:500;overflow:hidden;transition:transform .15s ease,background .3s ease,box-shadow .25s ease}.glow-inner::before{content:"";position:absolute;inset:0;border-radius:999px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.05);pointer-events:none}.glow-wrapper:hover .glow-inner{background:#111;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),0 10px 25px rgba(0,0,0,.4)}.glow-inner.pressed{transform:scale(.96);box-shadow:inset 0 6px 16px rgba(0,0,0,.7)}.label{letter-spacing:.4px}.arrow{transition:transform .3s ease,opacity .3s ease;opacity:.8}.glow-wrapper:hover .arrow{transform:translateX(5px)}.spinner{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,.3);border-top:2px solid #fff;animation:spin .6s linear infinite;display:inline-block}@keyframes spin{to{transform:rotate(360deg)}}.reflection{position:absolute;top:-50%;left:-30%;width:60%;height:200%;background:linear-gradient(120deg,rgba(255,255,255,.15),transparent);transform:rotate(25deg)translateX(-200%);transition:transform .8s ease;pointer-events:none}.glow-wrapper:hover .reflection{transform:rotate(25deg)translateX(250%)}`}</style>}
      
      {slug === "reactor-button" && <style>{`.reactor-btn{position:relative;padding:18px 40px;border-radius:50px;cursor:pointer;font-size:16px;font-weight:600;color:#fff;overflow:hidden;transition:.3s ease;background:rgba(255,255,255,.05);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.2);box-shadow:inset 0 0 8px rgba(255,255,255,.1),0 0 15px rgba(0,0,0,.4)}.reactor-btn::after{content:"";position:absolute;top:0;left:-50%;width:50%;height:100%;background:linear-gradient(120deg,rgba(255,255,255,.4),rgba(255,255,255,.05));transform:skewX(-20deg);transition:.5s}.reactor-btn:hover::after{left:120%}.reactor-core{position:absolute;width:140px;height:140px;border-radius:50%;filter:blur(50px);opacity:.5;transition:.3s ease;z-index:0}.reactor-ring{position:absolute;inset:-3px;border-radius:50px;border:2px solid transparent;animation:rotateRing 6s linear infinite}.reactor-text{position:relative;z-index:2;font-weight:600;letter-spacing:1px;text-transform:uppercase;background:linear-gradient(90deg,rgba(255,255,255,.9),rgba(255,255,255,.6),rgba(255,255,255,.9));-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:0 0 6px rgba(255,255,255,.4),0 0 12px rgba(255,255,255,.2);transition:.3s ease}.reactor-btn:hover .reactor-text{text-shadow:0 0 10px rgba(255,255,255,.6),0 0 18px rgba(255,255,255,.3)}.reactor-btn:hover{box-shadow:inset 0 0 12px rgba(255,255,255,.15),0 0 25px rgba(255,255,255,.08)}.reactor-btn:hover .reactor-core{opacity:.9}.reactor-btn:active{transform:scale(.97)}.reactor-btn.orange .reactor-core{background:#de732c}.reactor-btn.orange .reactor-ring{border-color:#de732c}.reactor-btn.blue .reactor-core{background:#126fff}.reactor-btn.blue .reactor-ring{border-color:#126fff}.reactor-btn.green .reactor-core{background:#176635}.reactor-btn.green .reactor-ring{border-color:#176635}@keyframes rotateRing{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>}
      
      {slug === "bomb-timer" && <style>{`.bomb-board{position:relative;width:560px;height:190px;border-radius:14px;background:radial-gradient(circle at 20% 10%,rgba(255,255,255,.06),transparent 40%),linear-gradient(145deg,#1f6b34 0%,#14512a 40%,#0f3d1f 100%);box-shadow:0 40px 120px rgba(0,0,0,.9),inset 0 3px 6px rgba(255,255,255,.05),inset 0 -6px 12px rgba(0,0,0,.6);padding:35px 40px;display:flex;align-items:center;justify-content:space-between;transform-style:preserve-3d;perspective:1000px}.bomb-board::before{content:"";position:absolute;inset:0;background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.02)0px,rgba(255,255,255,.02)1px,transparent 1px,transparent 6px);opacity:.3;pointer-events:none}.bomb-board::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 15px 15px,#444 3px,transparent 4px),radial-gradient(circle at calc(100% - 15px)15px,#444 3px,transparent 4px),radial-gradient(circle at 15px calc(100% - 15px),#444 3px,transparent 4px),radial-gradient(circle at calc(100% - 15px)calc(100% - 15px),#444 3px,transparent 4px)}.wires{position:absolute;top:-35px;left:60px;display:flex;gap:25px}.wire{width:6px;height:45px;border-radius:4px;box-shadow:inset 0 -4px 6px rgba(0,0,0,.5)}.wire.red{background:linear-gradient(#ff4d4d,#900)}.wire.blue{background:linear-gradient(#4da6ff,#039)}.wire.yellow{background:linear-gradient(#ffe066,#b38f00)}.lcd-container{position:relative;padding:16px;border-radius:8px;background:linear-gradient(145deg,#1d2a1f,#0f1712);box-shadow:inset 0 4px 6px rgba(255,255,255,.04),inset 0 -6px 10px rgba(0,0,0,.9),0 10px 20px rgba(0,0,0,.6)}.lcd-screen{width:400px;height:90px;border-radius:6px;background:linear-gradient(180deg,#2e3b2f 0%,#1a241b 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-shadow:inset 0 0 25px rgba(0,0,0,.9),inset 0 4px 6px rgba(255,255,255,.03),0 6px 15px rgba(0,0,0,.6)}.lcd-screen::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,.15)0%,rgba(255,255,255,.05)20%,transparent 40%);transform:translateX(-100%);animation:glassSweep 7s linear infinite;pointer-events:none}@keyframes glassSweep{0%{transform:translateX(-100%)}100%{transform:translateX(120%)}}.lcd-digits{display:flex;align-items:center;gap:14px}.digit{position:relative;width:42px;height:75px}.segment{position:absolute;background:#0d2a14;transition:.08s ease}.segment.on{background:#8cff72;box-shadow:0 0 6px #8cff72,0 0 12px rgba(140,255,114,.6)}.segment.a{top:0;left:8px;width:26px;height:6px}.segment.d{bottom:0;left:8px;width:26px;height:6px}.segment.g{top:34px;left:8px;width:26px;height:6px}.segment.f{top:6px;left:0;width:6px;height:28px}.segment.b{top:6px;right:0;width:6px;height:28px}.segment.e{bottom:6px;left:0;width:6px;height:28px}.segment.c{bottom:6px;right:0;width:6px;height:28px}.colon{font-size:42px;color:#8cff72;text-shadow:0 0 8px #8cff72}.lcd-noise{position:absolute;inset:0;background-image:url("https://grainy-gradients.vercel.app/noise.svg");opacity:.08;pointer-events:none}.bomb-board.warning .segment.on{background:#ffb347;box-shadow:0 0 10px #f90}.bomb-board.critical .segment.on{background:#ff3b3b;box-shadow:0 0 15px red}.bomb-board.critical{animation:shake .12s infinite}@keyframes shake{0%{transform:translate(0)}25%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}75%{transform:translate(-1px,2px)}100%{transform:translate(1px,-2px)}}.explosion-flash{position:absolute;inset:0;background:radial-gradient(circle,#fff 0%,#ffccaa 40%,transparent 70%);animation:explode .5s forwards;z-index:50}@keyframes explode{0%{opacity:0;transform:scale(.8)}30%{opacity:1;transform:scale(1.1)}100%{opacity:0;transform:scale(1.4)}}.side-bumps{display:flex;flex-direction:column;gap:14px}.bump{width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#666,#222);box-shadow:inset 0 4px 6px rgba(0,0,0,.9),0 3px 6px rgba(0,0,0,.6);transition:transform .1s ease}.bump:active{transform:translateY(2px)}`}</style>}
      
      {slug === "radial-command-menu" && <style>{`.radial-wrapper{position:relative;width:400px;height:400px;display:flex;align-items:center;justify-content:center}.radial-svg{position:absolute}.radial-slice{fill:#1f252c;stroke:#2f3943;stroke-width:2;cursor:pointer;transition:fill .25s ease,filter .25s ease}.radial-slice:hover,.radial-slice.active{fill:#2f3945;filter:brightness(1.2)}.radial-label{fill:#e4e7eb;font-size:12px;font-weight:600;pointer-events:none;letter-spacing:1px}.radial-core{width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#2a3139,#14191f);border:2px solid #3f4b5a;display:flex;align-items:center;justify-content:center;color:#e4e7eb;font-size:13px;letter-spacing:2px;font-weight:600;z-index:2;box-shadow:0 0 25px rgba(0,0,0,.6),inset 0 0 15px rgba(255,255,255,.05)}.radial-highlight{fill:none;stroke:rgba(220,220,220,.8);stroke-width:6;stroke-linecap:round;filter:drop-shadow(0 0 6px rgba(255,255,255,.5));pointer-events:none}`}</style>}
      
      {slug === "reactor-card" && <style>{`.reactor-card{position:relative;width:340px;padding:28px;border-radius:22px;overflow:hidden;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);transition:.4s ease}.reactor-card-core{position:absolute;width:200px;height:200px;top:-60px;right:-60px;border-radius:50%;filter:blur(80px);opacity:.25;z-index:0;animation:pulseCore 4s ease-in-out infinite}.reactor-card-border{position:absolute;inset:-1px;border-radius:22px;padding:1px;z-index:0;animation:rotateBorder 8s linear infinite}.reactor-card-content{position:relative;z-index:2}.reactor-card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.reactor-card-header h3{font-size:15px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;opacity:.85;color:#e4e7eb;margin:0}.reactor-status{font-size:11px;padding:4px 10px;border-radius:20px;backdrop-filter:blur(10px);background:rgba(255,255,255,.08);letter-spacing:1px;color:#e4e7eb}.reactor-card-body{font-size:14px;opacity:.75;line-height:1.6;color:#e4e7eb}.reactor-card:hover{box-shadow:0 0 40px rgba(255,255,255,.06)}.reactor-card:hover .reactor-card-core{opacity:.45}.reactor-card.orange .reactor-card-core{background:#de732c}.reactor-card.orange .reactor-card-border{background:linear-gradient(130deg,transparent,#de732c,transparent)}.reactor-card.blue .reactor-card-core{background:#126fff}.reactor-card.blue .reactor-card-border{background:linear-gradient(130deg,transparent,#126fff,transparent)}.reactor-card.green .reactor-card-core{background:#176635}.reactor-card.green .reactor-card-border{background:linear-gradient(130deg,transparent,#176635,transparent)}@keyframes rotateBorder{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@keyframes pulseCore{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}`}</style>}
      
      {slug === "core-console" && <style>{`.console-panel{width:700px;padding:40px;background:#2b2f34;border:3px solid #1a1d20;box-shadow:inset 0 2px 4px rgba(255,255,255,.04),inset 0 -4px 8px rgba(0,0,0,.8),0 40px 80px rgba(0,0,0,.8);position:relative}.panel-header{text-align:center;letter-spacing:4px;font-size:12px;color:#8d949b;margin-bottom:30px;font-family:var(--font-mono)}.panel-grid{display:flex;justify-content:space-between;gap:40px}.panel-module{flex:1;text-align:center}.gauge-container{display:flex;flex-direction:column;align-items:center}.gauge-face{width:140px;height:140px;border-radius:50%;background:radial-gradient(circle at center,#111 60%,#000 100%);border:6px solid #3a4046;position:relative}.gauge-face::before{content:"";position:absolute;inset:15px;border-radius:50%;border:2px dashed #555}.gauge-needle{position:absolute;bottom:50%;left:50%;width:3px;height:60px;background:#9eff00;transform-origin:bottom center;transition:transform .4s ease}.gauge-pivot{width:10px;height:10px;background:#333;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.module-label{margin-top:12px;font-size:9px;letter-spacing:2px;color:#6f767d;font-family:var(--font-mono)}.crt-module{display:flex;justify-content:center}.crt-screen{width:160px;height:110px;background:#001100;border:4px solid #1e2226;box-shadow:inset 0 0 40px #00ff0066;position:relative;overflow:hidden}.scanline{position:absolute;width:100%;height:2px;background:#00ff00;opacity:.2;animation:scan 4s linear infinite}@keyframes scan{from{top:0}to{top:100%}}.crt-content{color:#00ff66;font-family:var(--font-mono);text-align:center;padding-top:25px;font-size:11px}.crt-value{font-size:24px;margin-top:8px}.safety-guard{width:70px;height:90px;margin:auto;position:relative;background:#1f2328;border:3px solid #141618}.glass-cover{position:absolute;inset:0;background:rgba(255,0,0,.05);pointer-events:none}.lever{width:8px;height:45px;background:#aaa;position:absolute;bottom:8px;left:50%;transform:translateX(-50%)rotate(-35deg);transform-origin:bottom center;transition:transform .3s ease;cursor:pointer}.lever.on{transform:translateX(-50%)rotate(35deg)}.emergency-strip{margin-top:40px;text-align:center}.industrial-shutdown{background:#3a0000;border:3px solid #600;color:#ff4444;padding:10px 28px;letter-spacing:2px;font-weight:700;cursor:pointer;font-size:11px;font-family:var(--font-mono);transition:background .2s}.industrial-shutdown:hover{background:#5a0000}.rivet{width:10px;height:10px;border-radius:50%;background:radial-gradient(circle,#555 40%,#222 100%);position:absolute}.tl{top:12px;left:12px}.tr{top:12px;right:12px}.bl{bottom:12px;left:12px}.br{bottom:12px;right:12px}`}</style>}
      
      {slug === "status-badge" && <style>{`.status-badge{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:6px 14px;font-size:12px;font-weight:600;letter-spacing:.5px;text-transform:uppercase;position:relative;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08);background:rgba(20,25,30,.8);color:#e6edf3;overflow:hidden}.status-badge.sm{font-size:10px;padding:4px 10px}.status-badge.lg{font-size:14px;padding:8px 18px}.badge-dot{width:8px;height:8px;border-radius:50%;background:currentColor}.status-badge.info{color:#3d8bff;box-shadow:0 0 10px rgba(61,139,255,.25)}.status-badge.safe{color:#2a8f55;box-shadow:0 0 10px rgba(42,143,85,.25)}.status-badge.warning{color:#f08a3c;box-shadow:0 0 10px rgba(240,138,60,.25)}.status-badge.critical{color:#ff4d4d;box-shadow:0 0 10px rgba(255,77,77,.3)}.status-badge.pulse .badge-dot{animation:pulse 1.8s infinite}@keyframes pulse{0%{box-shadow:0 0 0 0 currentColor}70%{box-shadow:0 0 0 8px transparent}100%{box-shadow:0 0 0 0 transparent}}.status-badge.shimmer::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,.15),transparent);transform:translateX(-100%);animation:shimmer 2.5s infinite}@keyframes shimmer{to{transform:translateX(100%)}}`}</style>}
      
      {slug === "reactor-badge" && <style>{`.reactor-badge{position:relative;display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:8px 18px;font-weight:700;letter-spacing:1px;overflow:hidden;cursor:pointer;user-select:none;backdrop-filter:blur(14px);background:rgba(255,255,255,.04);transition:transform .2s ease}.sm{font-size:11px;padding:5px 12px}.md{font-size:13px;padding:7px 16px}.lg{font-size:15px;padding:10px 22px}.badge-dot{width:8px;height:8px;border-radius:50%;background:currentColor;box-shadow:0 0 calc(6px * var(--glow))currentColor;transition:box-shadow .3s ease}.badge-text{color:#fff;text-shadow:0 0 calc(6px * var(--glow))currentColor}.badge-icon{font-size:1em}.loader{width:14px;height:14px;border:2px solid currentColor;border-top:2px solid transparent;border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}.success{color:#00ff9d}.warning{color:#ffb800}.danger{color:#ff3c3c}.default{color:#aaa}.dot-pulse{animation:dotPulse 3s ease-in-out infinite}@keyframes dotPulse{0%{box-shadow:0 0 calc(6px * var(--glow))currentColor,0 0 0 0 rgba(255,60,60,.4)}50%{box-shadow:0 0 calc(12px * var(--glow) * var(--pulse-strength))currentColor,0 0 calc(12px * var(--pulse-strength))rgba(255,60,60,.25)}100%{box-shadow:0 0 calc(6px * var(--glow))currentColor,0 0 0 0 rgba(255,60,60,.4)}}.animated-border{position:absolute;inset:0;border-radius:999px;padding:1px;background:linear-gradient(120deg,transparent,currentColor,transparent);background-size:200% 200%;animation:borderMove 3s linear infinite;mask:linear-gradient(#000 0 0)content-box,linear-gradient(#000 0 0);mask-composite:exclude}@keyframes borderMove{0%{background-position:0% 50%}100%{background-position:200% 50%}}.reactor-badge::after{content:"";position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-20deg);transition:.6s}.reactor-badge:hover::after{left:150%}.glass-noise{position:absolute;inset:0;border-radius:999px;background-image:radial-gradient(rgba(255,255,255,.05)1px,transparent 1px);background-size:3px 3px;opacity:.2;pointer-events:none}`}</style>}
      
      {slug === "control-slider" && <style>{`.glass-slider{width:360px;padding:20px;border-radius:16px;background:rgba(20,25,30,.6);backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),0 20px 50px rgba(0,0,0,.6);color:#d0d6db;font-family:var(--font-geist)}.slider-header{display:flex;justify-content:space-between;margin-bottom:16px}.slider-label{font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:.6;font-family:var(--font-mono)}.slider-value{font-weight:600;color:#5ef0b3;transition:color .3s ease}.slider-value.danger{color:#ff5c5c}.slider-track{position:relative;height:12px;border-radius:999px;background:rgba(255,255,255,.05);backdrop-filter:blur(8px);overflow:hidden;cursor:pointer;box-shadow:inset 0 4px 10px rgba(0,0,0,.6),inset 0 -1px 1px rgba(255,255,255,.05)}.slider-fill{position:absolute;height:100%;border-radius:999px;background:linear-gradient(90deg,#3bf0a4,#1fbf88);overflow:hidden;box-shadow:0 0 12px rgba(59,240,164,.5);transition:background .3s,box-shadow .3s}.slider-fill.danger{background:linear-gradient(90deg,#ff7a5c,#ff3c3c);box-shadow:0 0 14px rgba(255,60,60,.6)}.energy-pulse{position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(255,255,255,.15)0px,rgba(255,255,255,.15)2px,transparent 2px,transparent 10px);animation:pulseMove 2s linear infinite;opacity:.3}@keyframes pulseMove{from{transform:translateX(0)}to{transform:translateX(40px)}}.slider-handle{position:absolute;top:50%;transform:translate(-50%,-50%);width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,#c9d1d8);box-shadow:0 6px 15px rgba(0,0,0,.7),inset 0 3px 6px rgba(255,255,255,.4);transition:background .3s}.slider-handle.danger{background:radial-gradient(circle at 30% 30%,#ffb3b3,#ff3c3c)}`}</style>}
      
      {slug === "reactor-toggle" && <style>{`.reactor-toggle-wrapper{display:flex;align-items:center;gap:20px;margin:25px 0;font-family:var(--font-geist)}.toggle-label{font-size:16px;letter-spacing:1px;color:rgba(255,255,255,.7);transition:all .3s ease}.toggle-label.active{color:var(--color);text-shadow:0 0 10px var(--color)}.reactor-toggle{position:relative;width:90px;height:40px;border-radius:40px;background:rgba(255,255,255,.05);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);cursor:pointer;overflow:hidden;transition:all .4s ease}.reactor-toggle.active{border-color:var(--color);box-shadow:0 0 20px rgba(0,255,170,.2),inset 0 0 10px rgba(0,0,0,.6)}.toggle-energy{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.05),transparent);opacity:0;z-index:0;transition:opacity .3s ease}.reactor-toggle.active .toggle-energy{opacity:1;animation:energyFlow 2s linear infinite}@keyframes energyFlow{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.toggle-sweep{position:absolute;inset:0;background:linear-gradient(120deg,transparent 20%,rgba(255,255,255,.25),transparent 80%);transform:translateX(-100%);z-index:0}.reactor-toggle.active .toggle-sweep{animation:sweepMove 3s ease-in-out infinite}@keyframes sweepMove{0%{transform:translateX(-100%)}50%{transform:translateX(120%)}100%{transform:translateX(120%)}}.toggle-status{position:absolute;top:50%;transform:translateY(-50%);font-size:11px;letter-spacing:1.5px;font-weight:600;pointer-events:none;transition:opacity .3s ease,color .4s ease,text-shadow .5s ease;z-index:1}.on-text{left:10px;color:var(--color);opacity:0;text-shadow:0 0 0 transparent}.off-text{right:10px;color:rgba(255,255,255,.55);opacity:1;text-shadow:0 0 0 transparent}.reactor-toggle.active .on-text{opacity:1;transition-delay:.15s;text-shadow:0 0 4px var(--color),0 0 8px var(--color),0 0 14px rgba(0,255,170,.2)}.reactor-toggle.active .off-text{opacity:0;transition-delay:0s}.reactor-toggle::after{content:"";position:absolute;top:4px;left:4px;width:32px;height:32px;border-radius:50%;backdrop-filter:blur(6px)saturate(140%);background:rgba(255,255,255,.08);box-shadow:inset 0 0 8px rgba(255,255,255,.2),inset 0 0 14px rgba(255,255,255,.15);z-index:2;pointer-events:none;transition:transform .4s cubic-bezier(.34,1.56,.64,1)}.reactor-toggle.active::after{transform:translateX(50px)}.toggle-core{position:absolute;top:4px;left:4px;width:32px;height:32px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fff,#bdbdbd);box-shadow:0 4px 10px rgba(0,0,0,.5),inset 0 2px 6px rgba(255,255,255,.4);transition:all .4s cubic-bezier(.34,1.56,.64,1);z-index:3}.reactor-toggle.active .toggle-core{transform:translateX(50px);background:radial-gradient(circle at 30% 30%,var(--color),#006b4a);box-shadow:0 0 15px var(--color),0 4px 10px rgba(0,0,0,.6)}`}</style>}
      
      {slug === "weapon-module-panel" && <style>{`.weapon-panel{width:700px;padding:30px;border-radius:16px;background:linear-gradient(145deg,#1b2229,#0f1419);box-shadow:0 40px 100px rgba(0,0,0,.9),inset 0 0 40px rgba(255,255,255,.02);color:#e4e9ef;font-family:var(--font-geist);position:relative;overflow:hidden}.weapon-panel::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 60%,rgba(255,255,255,.02));animation:flicker 8s infinite;pointer-events:none}@keyframes flicker{0%,100%{opacity:.1}50%{opacity:.2}}.weapon-header h2{font-size:18px;letter-spacing:2px;margin:0;font-family:var(--font-mono)}.weapon-sub{font-size:10px;opacity:.6;letter-spacing:1px;margin-top:4px}.module-grid{display:flex;gap:16px;margin-top:24px;flex-wrap:wrap}.module-card{width:155px;height:100px;border-radius:12px;background:linear-gradient(145deg,#2a3138,#161c21);border:1px solid rgba(255,255,255,.05);position:relative;cursor:pointer;overflow:hidden;transition:.3s ease;box-shadow:0 20px 40px rgba(0,0,0,.7)}.module-card:hover{box-shadow:0 25px 60px rgba(0,150,255,.25);transform:translateY(-4px)}.module-card.active{border:1px solid rgba(0,180,255,.4);box-shadow:0 0 40px rgba(0,180,255,.4)}.module-glass{position:absolute;inset:0;background:linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.01));backdrop-filter:blur(10px)}.module-content{position:relative;padding:14px;z-index:2}.module-title{font-size:13px;font-weight:600}.module-type{font-size:10px;opacity:.6;margin-top:2px}.module-led{position:absolute;bottom:10px;right:10px;width:8px;height:8px;border-radius:50%;background:#0af;box-shadow:0 0 12px #0af;opacity:0;transition:.3s ease}.module-card.active .module-led{opacity:1}.stats-panel{margin-top:32px;background:linear-gradient(145deg,#141a20,#0e1317);padding:20px;border-radius:12px;box-shadow:inset 0 0 25px rgba(0,0,0,.7)}.stat-row{display:flex;align-items:center;margin-bottom:12px;gap:12px}.stat-label{width:100px;font-size:11px;opacity:.7;font-family:var(--font-mono)}.stat-bar{flex:1;height:8px;background:#0d1116;border-radius:6px;overflow:hidden;box-shadow:inset 0 0 10px rgba(0,0,0,.8)}.stat-fill{height:100%;background:linear-gradient(90deg,#00b4ff,#0078ff);box-shadow:0 0 12px rgba(0,180,255,.6);transition:width .4s cubic-bezier(.34,1.56,.64,1)}.stat-value{width:35px;text-align:right;font-size:11px}`}</style>}
      
      {slug === "stack-carousel" && <style>{`.stack-container{position:relative;width:380px;height:280px}.stack-card{position:absolute;width:100%;height:200px;border-radius:18px;padding:20px;backdrop-filter:blur(14px);background:rgba(15,20,25,.8);box-shadow:0 20px 50px rgba(0,0,0,.6),inset 0 0 0 1px rgba(255,255,255,.06);color:#e4e7eb;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;cursor:pointer;transition:all .4s cubic-bezier(.34,1.56,.64,1)}.stack-card::after{content:"";position:absolute;inset:0;border-radius:18px;background:linear-gradient(120deg,rgba(255,255,255,.12),transparent 40%);opacity:.15;pointer-events:none}.stack-card.blue{background:linear-gradient(135deg,rgba(40,80,180,.6),rgba(10,20,40,.9))}.stack-card.green{background:linear-gradient(135deg,rgba(40,180,120,.6),rgba(10,25,20,.9))}.stack-card.orange{background:linear-gradient(135deg,rgba(255,140,80,.6),rgba(30,15,10,.9))}`}</style>}
      
      {slug === "tactical-hex-badge" && <style>{`.hex-wrapper{display:flex;flex-direction:column;align-items:center;gap:14px}.hex-badge{width:180px;height:104px;position:relative;cursor:pointer;clip-path:polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%);background:linear-gradient(145deg,rgba(20,30,40,.95),rgba(8,12,16,.95));display:flex;align-items:center;justify-content:center;overflow:hidden;will-change:transform;transition:transform .25s ease}.hex-badge:hover{transform:translateY(-6px)}.inner-border{position:absolute;inset:6px;clip-path:inherit;border:1px solid currentColor;opacity:.4;filter:blur(1px);pointer-events:none}.hex-badge.info{color:#3d8bff}.hex-badge.safe{color:#2a8f55}.hex-badge.warning{color:#f08a3c}.hex-badge.critical{color:#ff4d4d}.glitch{animation:flicker 1.5s infinite}@keyframes flicker{0%{opacity:1}5%{opacity:.6}10%{opacity:1}15%{opacity:.7}20%{opacity:1}100%{opacity:1}}.hex-content{text-align:center;z-index:2}.hex-label{display:block;font-size:13px;font-weight:600;letter-spacing:1px;color:#e4e7eb}.hex-status{font-size:11px;opacity:.7;letter-spacing:1px;color:#e4e7eb}.scan-line{position:absolute;top:-60%;left:0;width:100%;height:60%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.18),transparent);pointer-events:none;will-change:transform;animation:scan 2.8s linear infinite}@keyframes scan{0%{transform:translateY(-120%)}100%{transform:translateY(220%)}}.corner-rotor{position:absolute;width:220%;height:220%;border:1px dashed currentColor;border-radius:50%;opacity:.06;animation:rotate 14s linear infinite}@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.hex-details{width:220px;padding:16px;border-radius:12px;background:rgba(15,20,25,.95);border:1px solid rgba(255,255,255,.06);font-size:12px;color:#cfd8e3;backdrop-filter:blur(12px);will-change:transform,opacity;line-height:1.6}`}</style>}
    </div>
  );
} 