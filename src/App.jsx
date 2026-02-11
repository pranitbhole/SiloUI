import ReactorBadgeDemo from "./components/badges/ReactorBadge/ReactorBadgeDemo";
import ReactorButtonDemo from "./components/buttons/ReactorButton/ReactorButton";
import { ReactorToggle } from "./index";

function App() {
  return (
    <div>
      <ReactorToggle
  label="Reactor System"
  size="md"
  glowIntensity={1.2}
  onChange={(state) => console.log("State:", state)}
/>

<ReactorToggle
  label="Emergency Mode"
  size="lg"
  defaultChecked
  glowIntensity={1.6}
/>
    </div>
  )
  
}

export default App
