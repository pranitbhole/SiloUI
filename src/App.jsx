import RadialCommandMenu from "./components/menu/RadialCommandMenu";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0b1117",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RadialCommandMenu
        items={[
          { label: "PISTOLS" },
          { label: "SMGS" },
          { label: "RIFLES" },
          { label: "HEAVY" },
          { label: "GEAR" },
          { label: "GRENADES" },
        ]}
      />
    </div>
  );
}

export default App;
