import { useRef } from "react";
import "./ReactorBadge.css";

function ReactorBadge({
  label,
  status = "default",
  size = "md",
  icon,
  animated = true,
  glowIntensity = 1,
  pulseStrength = 1,
  loading = false
}) {
  const badgeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!animated) return;

    const el = badgeRef.current;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 10;
    const moveY = (y - rect.height / 2) / 10;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const resetPosition = () => {
    if (badgeRef.current) badgeRef.current.style.transform = "translate(0,0)";
  };

  return (
    <span
      ref={badgeRef}
      className={`reactor-badge ${status} ${size}`}
      style={{
        "--glow": glowIntensity,
        "--pulse-strength": pulseStrength
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
    >
      <span className="glass-noise"></span>
      <span className="animated-border"></span>

      {/* DOT */}
      <span
        className={`badge-dot ${
          status === "danger" && animated ? "dot-pulse" : ""
        }`}
      ></span>

      {loading ? (
        <span className="loader"></span>
      ) : (
        icon && <span className="badge-icon">{icon}</span>
      )}

      <span className="badge-text">{label}</span>
    </span>
  );
}

export default ReactorBadge;
