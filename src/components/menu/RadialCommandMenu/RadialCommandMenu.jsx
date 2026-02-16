import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./RadialCommandMenu.css";

const SIZE = 360;
const CENTER = SIZE / 2;
const INNER_RADIUS = 80;
const OUTER_RADIUS = 160;

function polarToCartesian(cx, cy, radius, angle) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function describeArc(startAngle, endAngle) {
  const startOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, startAngle);
  const endOuter = polarToCartesian(CENTER, CENTER, OUTER_RADIUS, endAngle);

  const startInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, endAngle);
  const endInner = polarToCartesian(CENTER, CENTER, INNER_RADIUS, startAngle);

  const largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

  return `
    M ${startOuter.x} ${startOuter.y}
    A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}
    L ${startInner.x} ${startInner.y}
    A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}
    Z
  `;
}

function describeOuterArc(startAngle, endAngle) {
  const HIGHLIGHT_RADIUS = OUTER_RADIUS + 12;

  const start = polarToCartesian(CENTER, CENTER, HIGHLIGHT_RADIUS, startAngle);
  const end = polarToCartesian(CENTER, CENTER, HIGHLIGHT_RADIUS, endAngle);

  const largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

  return `
    M ${start.x} ${start.y}
    A ${HIGHLIGHT_RADIUS} ${HIGHLIGHT_RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}
  `;
}


function RadialCommandMenu({ items = [] }) {
  const [hovered, setHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const sliceAngle = (2 * Math.PI) / items.length;

  return (
    <div
      className="radial-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActiveIndex(null);
      }}
    >
      <motion.svg
        width={SIZE}
        height={SIZE}
        className="radial-svg"
        animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
      >
        {items.map((item, index) => {
          const start = index * sliceAngle - Math.PI / 2;
          const end = start + sliceAngle;

          return (
                      <g key={index}>
            <path
              d={describeArc(start, end)}
              className={`radial-slice ${
                activeIndex === index ? "active" : ""
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={item.onClick}
            />

            {/* Outer C-shaped highlight */}
            {activeIndex === index && (
              <motion.path
                d={describeOuterArc(start, end)}
                className="radial-highlight"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}

            <text
              x={
                polarToCartesian(
                  CENTER,
                  CENTER,
                  (INNER_RADIUS + OUTER_RADIUS) / 2,
                  start + sliceAngle / 2
                ).x
              }
              y={
                polarToCartesian(
                  CENTER,
                  CENTER,
                  (INNER_RADIUS + OUTER_RADIUS) / 2,
                  start + sliceAngle / 2
                ).y
              }
              className="radial-label"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {item.label}
            </text>
          </g>

          );
        })}
      </motion.svg>

      {/* Center Core */}
      <div className="radial-core">
        MENU
      </div>
    </div>
  );
}

export default RadialCommandMenu;
