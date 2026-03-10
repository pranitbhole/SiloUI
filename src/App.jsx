import RadialCommandMenu from "./components/menu/RadialCommandMenu";
function App() {
  return (
    <div style={{
      height: "100vh",
      background: "#0b0f14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <RadialCommandMenu
        items={[
          { label: "SCAN" },
          { label: "DEPLOY"},
          { label: "LOCK"},
          { label: "POWER" },
          { label: "ALERT"},
          { label: "MAP"},
        ]}
      />
    </div>
  );
}

export default App;
