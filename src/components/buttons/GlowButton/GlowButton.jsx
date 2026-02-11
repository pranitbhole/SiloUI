import "./GlowButton.css";

function GlowButton({ children, variant = "orange" }) {
  return (
    <button className={`glow-btn ${variant}`}>
      <span className="glow-content">
        {children}
        <span className="arrow">⌄</span>
      </span>
    </button>
  );
}

export default GlowButton;
