import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TacticalHexBadge.css";

function TacticalHexBadge({
  label = "NODE A",
  status = "STABLE",
  variant = "info",
  details = "System operating within normal parameters.",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hex-wrapper">
      <motion.div
        className={`hex-badge ${variant} ${
          variant === "critical" ? "glitch" : ""
        }`}
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="inner-border" />
        <div className="corner-rotor" />
        <div className="scan-line" />

        <div className="hex-content">
          <span className="hex-label">{label}</span>
          <span className="hex-status">{status}</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="hex-details"
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {details}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TacticalHexBadge;
