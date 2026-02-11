import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = ["Dashboard", "Members", "Resources", "Control Room"];

  return (
    <nav className="navbar">
      <div className="logo">☢ SiloUI</div>

      <ul className="nav-links">
        {menuItems.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
