import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WeaponModulePanel.css";

const defaultStats = {
  damage: 0,
  accuracy: 0,
  stability: 0,
  mobility: 0,
  penetration: 0,
};

function WeaponModulePanel({ modules = [] }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (modules.length > 0) {
      setActive(modules[0]);
    }
  }, [modules]);

  if (!modules || modules.length === 0) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        No weapon modules provided.
      </div>
    );
  }

  return (
    <div className="weapon-panel">
      <div className="weapon-header">
        <h2>WEAPON MODULE SELECTOR</h2>
        <div className="weapon-sub">TACTICAL CONFIGURATION</div>
      </div>

      <div className="module-grid">
        {modules.map((module, i) => (
          <motion.div
            key={i}
            className={`module-card ${
              active?.name === module.name ? "active" : ""
            }`}
            onClick={() => setActive(module)}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="module-content">
              <div className="module-title">{module.name}</div>
              <div className="module-type">{module.type}</div>
            </div>
            <div className="module-led" />
          </motion.div>
        ))}
      </div>

      {active && (
        <div className="stats-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              className="stats-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Object.keys(defaultStats).map((stat) => {
                const value = active.stats?.[stat] ?? 0;
                return (
                  <div className="stat-row" key={stat}>
                    <span className="stat-label">
                      {stat.toUpperCase()}
                    </span>

                    <div className="stat-bar">
                      <motion.div
                        className="stat-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ type: "spring", stiffness: 120 }}
                      />
                    </div>

                    <span className="stat-value">{value}</span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default WeaponModulePanel;
