import "./ReactorCard.css";

function ReactorCard({ title, status = "ONLINE", children, variant = "orange" }) {
  return (
    <div className={`reactor-card ${variant}`}>
      
      {/* Animated Border */}
      <div className="reactor-card-border"></div>

      {/* Energy Background */}
      <div className="reactor-card-core"></div>

      <div className="reactor-card-content">
        
        <div className="reactor-card-header">
          <h3>{title}</h3>
          <span className="reactor-status">{status}</span>
        </div>

        <div className="reactor-card-body">
          {children}
        </div>

      </div>
    </div>
  );
}

export default ReactorCard;
