import { useState } from "react";
import "./ReactorToggle.css";

function ReactorToggle({
  label = "Reactor System",
  defaultOn = false,
  color = "#00ffae",
}) {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <div className="reactor-toggle-wrapper">
      {/* Left Label */}
      <span className={`toggle-label ${isOn ? "active" : ""}`}>
        {label}
      </span>

      {/* Toggle Switch */}
      <div
        className={`reactor-toggle ${isOn ? "active" : ""}`}
        style={{ "--color": color }}
        onClick={() => setIsOn(!isOn)}
      >
        {/* Energy flow layer */}
        <div className="toggle-energy" />

        {/* Glass highlight sweep */}
        <div className="toggle-sweep" />

        {/* Status Text */}
        <span className="toggle-status on-text">ON</span>
        <span className="toggle-status off-text">OFF</span>

        {/* Knob */}
        <div className="toggle-core" />
      </div>
    </div>
  );
}

export default ReactorToggle;
