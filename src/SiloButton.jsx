import "./SiloButton.css";

function SiloButton({ children, variant = "primary", onClick }) {
  return (
    <button 
      className={`silo-btn ${variant}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SiloButton;
