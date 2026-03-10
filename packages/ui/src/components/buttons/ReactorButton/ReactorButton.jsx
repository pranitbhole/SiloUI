import "./ReactorButton.css";

function ReactorButton({ children, variant = "blue" }) {
  return (
    <button className={`reactor-btn ${variant}`}>
      <span className="reactor-core"></span>
      <span className="reactor-text">{children}</span>
      <span className="reactor-ring"></span>
    </button>
  );
}

export default ReactorButton;
