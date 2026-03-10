import { useState } from "react";
import "./GlowButton.css";

function GlowButton({
  children,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const [pressed, setPressed] = useState(false);

  const isDisabled = disabled || loading;

  return (
    <button
      className={`glow-wrapper ${isDisabled ? "disabled" : ""} ${className}`}
      onMouseDown={() => !isDisabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {/* Ambient hover glow */}
      <span className="ambient-glow" />

      <span className={`glow-inner ${pressed ? "pressed" : ""}`}>
        <span className="label">
          {children}
        </span>

        {loading ? (
          <span className="spinner" />
        ) : (
          <span className="arrow">→</span>
        )}

        {/* glass reflection */}
        <span className="reflection" />
      </span>
    </button>
  );
}

export default GlowButton;
