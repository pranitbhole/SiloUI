import { motion } from "framer-motion";
import "./StatusBadge.css";

function StatusBadge({
  label = "ACTIVE",
  variant = "info",
  size = "md",
  pulse = false,
  shimmer = false,
}) {
  return (
    <motion.div
      className={`status-badge ${variant} ${size} ${
        pulse ? "pulse" : ""
      } ${shimmer ? "shimmer" : ""}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="badge-dot" />
      <span className="badge-label">{label}</span>
    </motion.div>
  );
}

export default StatusBadge;
