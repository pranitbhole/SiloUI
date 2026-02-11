import React, { useState } from "react";
import GlowButton from "./GlowButton";

const variants = [
  { name: "orange", color: "#DE732C" },
  { name: "blue", color: "#126fff" },
  { name: "green", color: "#176635" }
];

function GlowButtonDemo() {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "#0f1115"
      }}
    >
      {/* Color selector circles */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        {variants.map((variant, i) => (
          <div
            key={i}
            onClick={() => setSelectedVariant(variant)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: variant.color,
              cursor: "pointer",
              boxShadow:
                selectedVariant.name === variant.name
                  ? `0 0 15px ${variant.color}`
                  : "0 0 8px rgba(255,255,255,0.3)"
            }}
          />
        ))}
      </div>

      <GlowButton variant={selectedVariant.name}>
        New
      </GlowButton>
    </div>
  );
}

export default GlowButtonDemo;
