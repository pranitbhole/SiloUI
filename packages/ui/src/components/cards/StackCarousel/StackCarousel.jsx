import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./StackCarousel.css";

function StackCarousel({
  cards = [],
  autoPlay = true,
  interval = 3000,
}) {
  const [stack, setStack] = useState(cards);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(() => {
      rotateStack();
    }, interval);

    return () => clearInterval(timer);
  }, [stack, autoPlay, isHovered]);

  const rotateStack = () => {
    setStack((prev) => {
      const updated = [...prev];
      const first = updated.shift();
      updated.push(first);
      return updated;
    });
  };

  return (
    <div
      className="stack-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {stack.map((card, index) => (
        <motion.div
          key={card.id}
          className={`stack-card ${card.variant || ""}`}
          drag={index === 0 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) rotateStack();
          }}
          whileHover={
            index === 0
              ? { scale: 1.02, y: -4 }
              : {}
          }
          animate={{
            y: index * 14,
            scale: 1 - index * 0.05,
            opacity: index > 4 ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
          }}
          style={{
            zIndex: stack.length - index,
          }}
        >
          {card.content}
        </motion.div>
      ))}
    </div>
  );
}

export default StackCarousel;
