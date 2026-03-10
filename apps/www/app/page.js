"use client";
import Link from "next/link";

const COMPONENTS = [
  { slug: "glow-button",         name: "Glow Button",         category: "Buttons",  desc: "Button with animated glow effect" },
  { slug: "reactor-button",      name: "Reactor Button",       category: "Buttons",  desc: "Reactor-style button animation" },
  { slug: "bomb-timer",          name: "Bomb Timer",           category: "Badges",   desc: "Countdown badge with animation" },
  { slug: "reactor-badge",       name: "Reactor Badge",        category: "Badges",   desc: "Reactor-styled badge" },
  { slug: "status-badge",        name: "Status Badge",         category: "Badges",   desc: "Status indicator badge" },
  { slug: "tactical-hex-badge",  name: "Tactical Hex Badge",   category: "Badges",   desc: "Hexagonal tactical badge" },
  { slug: "reactor-card",        name: "Reactor Card",         category: "Cards",    desc: "Card with reactor animation" },
  { slug: "stack-carousel",      name: "Stack Carousel",       category: "Cards",    desc: "Stacked card carousel" },
  { slug: "radial-command-menu", name: "Radial Command Menu",  category: "Menus",    desc: "Radial command menu" },
  { slug: "core-console",        name: "Core Console",         category: "Panels",   desc: "Core console panel" },
  { slug: "weapon-module-panel", name: "Weapon Module Panel",  category: "Panels",   desc: "Weapon module panel" },
  { slug: "control-slider",      name: "Control Slider",       category: "Sliders",  desc: "Futuristic control slider" },
  { slug: "reactor-toggle",      name: "Reactor Toggle",       category: "Toggles",  desc: "Reactor-style toggle" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Top navbar ── */}
      <header style={{
        height: 52, borderBottom: "1px solid var(--border)",
        background: "var(--bg-2)", display: "flex", alignItems: "center",
        padding: "0 40px", gap: 12, position: "sticky", top: 0, zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 24, height: 24, background: "var(--accent)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "var(--text-hi)", letterSpacing: "0.05em" }}>
            SILOUI
          </span>
        </div>
        <div style={{ flex: 1 }} />
        <Link href="/components/glow-button" style={{ fontSize: 12, color: "var(--text-dim)", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
        >Components</Link>
        <a href="https://github.com/yourusername/siloui" target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-dim)", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </header>

      {/* ── Hero ── */}
      <div className="home-hero">
        <div className="home-eyebrow">
          <span className="home-eyebrow-dot" />
          Open Source · Copy &amp; Paste · React + JS
        </div>
        <h1 className="home-title">
          Components built<br />
          for <span className="home-title-outline">modern</span> UIs
        </h1>
        <p className="home-sub">
          Animated, production-ready React components.<br />
          No package to install — copy the code, own it completely.
        </p>
        <div className="home-actions">
          <Link href="/components/glow-button" className="home-btn-primary">
            Browse Components
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a href="https://github.com/yourusername/siloui" target="_blank" rel="noopener noreferrer" className="home-btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
        <div className="home-install">
          <span className="home-install-prompt">$</span>
          <code>npx siloui add glow-button</code>
        </div>
      </div>

      {/* ── Component grid ── */}
      <div className="home-grid-section">
        <div className="home-section-label">
          <span className="home-section-line" />
          All Components · {COMPONENTS.length}
        </div>
        <div className="comp-grid">
          {COMPONENTS.map((c) => (
            <Link key={c.slug} href={`/components/${c.slug}`} className="comp-grid-item">
              <span className="comp-grid-cat">{c.category}</span>
              <span className="comp-grid-name">{c.name}</span>
              <span className="comp-grid-desc">{c.desc}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}