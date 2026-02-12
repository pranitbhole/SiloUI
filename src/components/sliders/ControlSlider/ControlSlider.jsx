import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./ControlSlider.css";

function ControlSlider({
  label = "System Control",
  min = 0,
  max = 100,
  step = 5,
  value,
  defaultValue = 50,
  onChange,
  dangerThreshold = 80,
  unit = "",
}) {
  const trackRef = useRef(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? value : internalValue;

  const rawX = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 250, damping: 25 });

  // 🔥 FIX: useTransform instead of .to()
  const widthTransform = useTransform(springX, (v) => `${v}%`);
  const leftTransform = useTransform(springX, (v) => `${v}%`);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  useEffect(() => {
    rawX.set(percentage);
  }, [percentage]);

  const snapToStep = (val) => {
    const snapped = Math.round(val / step) * step;
    return Math.max(min, Math.min(max, snapped));
  };

  const updateFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));

    const valueFromPercent = min + percent * (max - min);
    const snappedValue = snapToStep(valueFromPercent);

    const snappedPercent =
      ((snappedValue - min) / (max - min)) * 100;

    rawX.set(snappedPercent);

    if (isControlled) {
      onChange && onChange(snappedValue);
    } else {
      setInternalValue(snappedValue);
      onChange && onChange(snappedValue);
    }
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

  const danger = currentValue >= dangerThreshold;

  return (
    <div className="glass-slider">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className={`slider-value ${danger ? "danger" : ""}`}>
          {currentValue}{unit}
        </span>
      </div>

      <div
        ref={trackRef}
        className="slider-track"
        onMouseDown={handleMouseDown}
      >
        {/* Fill */}
        <motion.div
          className={`slider-fill ${danger ? "danger" : ""}`}
          style={{ width: widthTransform }}
        >
          <div className="energy-pulse" />
        </motion.div>

        {/* Handle */}
        <motion.div
          className={`slider-handle ${danger ? "danger" : ""}`}
          style={{ left: leftTransform }}
        />
      </div>
    </div>
  );
}

export default ControlSlider;
