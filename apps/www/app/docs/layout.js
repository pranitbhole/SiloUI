"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  {
    label: "Buttons",
    items: [
      { name: "Glow Button",    slug: "/components/glow-button" },
      { name: "Reactor Button", slug: "/components/reactor-button" },
    ],
  },
  {
    label: "Badges",
    items: [
      { name: "Bomb Timer",         slug: "/components/bomb-timer" },
      { name: "Reactor Badge",      slug: "/components/reactor-badge" },
      { name: "Status Badge",       slug: "/components/status-badge" },
      { name: "Tactical Hex Badge", slug: "/components/tactical-hex-badge" },
    ],
  },
  {
    label: "Cards",
    items: [
      { name: "Reactor Card",   slug: "/components/reactor-card" },
      { name: "Stack Carousel", slug: "/components/stack-carousel" },
    ],
  },
  {
    label: "Menus",
    items: [{ name: "Radial Command Menu", slug: "/components/radial-command-menu" }],
  },
  {
    label: "Panels",
    items: [
      { name: "Core Console",        slug: "/components/core-console" },
      { name: "Weapon Module Panel", slug: "/components/weapon-module-panel" },
    ],
  },
  {
    label: "Sliders",
    items: [{ name: "Control Slider", slug: "/components/control-slider" }],
  },
  {
    label: "Toggles",
    items: [{ name: "Reactor Toggle", slug: "/components/reactor-toggle" }],
  },
];

export default function DocsLayout({ children }) {
  const pathname = usePathname();
  const [openCats, setOpenCats] = useState(NAV.map((n) => n.label));

  const toggle = (label) =>
    setOpenCats((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  return (
    <div className="app-shell">

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className="sidebar">

        {/* Logo — clicking goes back to homepage */}
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo-link">
            <div className="sidebar-logo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            </div>
            <span className="sidebar-brand">SILOUI</span>
          </Link>
        </div>

        {/* Back to home link */}
        <div className="sidebar-back">
          <Link href="/" className="back-link">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to home
          </Link>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV.map((group) => {
            const isOpen = openCats.includes(group.label);
            return (
              <div key={group.label} className="nav-category">
                <button
                  className="nav-category-btn"
                  onClick={() => toggle(group.label)}
                >
                  {group.label}
                  <svg
                    className={`nav-chevron${isOpen ? " open" : ""}`}
                    width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {isOpen && (
                  <ul className="nav-items">
                    {group.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={item.slug}
                          className={`nav-item-link${pathname === item.slug ? " active" : ""}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">SILOUI v0.1.0</div>
      </aside>

      {/* ── Main ─────────────────────────────────── */}
      <main className="main-content">
        {/* Breadcrumb topbar */}
        <div className="topbar">
          <Link href="/" className="topbar-home">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </Link>
          <span className="topbar-sep">/</span>
          <span className="topbar-current">Components</span>
        </div>

        {/* Content — constrained width */}
        <div className="content-area">
          {children}
        </div>
      </main>

    </div>
  );
}