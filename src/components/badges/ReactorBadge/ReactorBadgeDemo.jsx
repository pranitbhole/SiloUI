import ReactorBadge from "./ReactorBadge";

function ReactorBadgeDemo() {
  return (
    <div style={{ padding: "40px", background: "#0e1117" }}>
      <ReactorBadge label="Online" status="success" />
      <br /><br />
      <ReactorBadge label="Warning" status="warning" />
      <br /><br />
      <ReactorBadge label="Critical" status="danger" />
    </div>
  );
}

export default ReactorBadgeDemo;
