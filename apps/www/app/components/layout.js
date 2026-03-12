"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./components-layout.css";

const COMPONENTS = {
  "Buttons": [
    { slug: "reactor-button", name: "Reactor Button" },
    { slug: "glow-button", name: "Glow Button" },
    
  ],
  "Badges": [
    { slug: "bomb-timer", name: "Bomb Timer" },
    { slug: "reactor-badge", name: "Reactor Badge" },
    { slug: "status-badge", name: "Status Badge" },
    { slug: "tactical-hex-badge", name: "Tactical Hex Badge" }
  ],
  "Cards": [
    { slug: "reactor-card", name: "Reactor Card" },
    { slug: "stack-carousel", name: "Stack Carousel" }
  ],
  "Menus": [
    { slug: "radial-command-menu", name: "Radial Command Menu" }
  ],
  "Panels": [
    { slug: "core-console", name: "Core Console" },
    { slug: "weapon-module-panel", name: "Weapon Module Panel" }
  ],
  "Sliders": [
    { slug: "control-slider", name: "Control Slider" }
  ],
  "Toggles": [
    { slug: "reactor-toggle", name: "Reactor Toggle" }
  ]
};

export default function ComponentsLayout({ children }) {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState(Object.keys(COMPONENTS));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleCategory = (category) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="docs-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12"/>
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18"/>
            )}
          </svg>
        </button>
        <span className="mobile-title">SiloUI</span>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">SiloUI</h1>
        </div>

        <nav className="sidebar-nav">
          {Object.entries(COMPONENTS).map(([category, components]) => {
            const isOpen = openCategories.includes(category);
            return (
              <div key={category} className="nav-category">
                <button
                  className="category-header"
                  onClick={() => toggleCategory(category)}
                >
                  <span>{category}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="chevron"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {isOpen && (
                  <div className="category-items">
                    {components.map((comp) => (
                      <Link
                        key={comp.slug}
                        href={`/components/${comp.slug}`}
                        className={`nav-item${pathname === `/components/${comp.slug}` ? " active" : ""}`}
                        onClick={closeSidebar}
                      >
                        {comp.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="version">SiloUI v0.1.0</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="docs-main">
        {children}
      </main>
    </div>
  );
}