import TacticalHexBadge from "./components/badges/TacticalHexBadge";

function App() {
  return (
    <div
      style={{
        background: "#0b0f14",
        minHeight: "100vh",
        display: "flex",
        gap: "40px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TacticalHexBadge
        label="REACTOR A"
        status="STABLE"
        variant="safe"
        details="Core temperature holding at 640°C. No anomalies detected."
        pulse
      />

      
    </div>
  );
}

export default App;
