import { useState } from "react";
import ReactorButton from "./ReactorButton";

const variants = [
  { name: "orange", color: "#DE732C" },
  { name: "blue", color: "#126fff" },
  { name: "green", color: "#176635" }
];

function ReactorDemo() {
  const [selected, setSelected] = useState(variants[0]);

  return (
    <div
      style={{
        height: "80vh",
        background: "#0f1115",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* Variant Selector */}
      <div
        style={{
          position: "absolute",
          right: "40px",
          top: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        {variants.map((v) => (
          <div
            key={v.name}
            onClick={() => setSelected(v)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: v.color,
              cursor: "pointer",
              boxShadow:
                selected.name === v.name
                  ? `0 0 18px ${v.color}`
                  : "none"
            }}
          />
        ))}
      </div>

      <ReactorButton variant={selected.name}>
        Launch
      </ReactorButton>
    </div>
  );
}

export default ReactorDemo;
