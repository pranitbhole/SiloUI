export const registry = [
  // ── BUTTONS ──────────────────────────────────────────────────────────────
  {
    name: "glow-button",
    type: "components:ui",
    description: "Button with animated glow effect",
    dependencies: ["framer-motion", "clsx"],
    files: [
      "components/buttons/GlowButton/GlowButton.jsx",
      "components/buttons/GlowButton/GlowButton.css",
    ],
    category: "buttons",
  },
  {
    name: "reactor-button",
    type: "components:ui",
    description: "Button with reactor-style animation",
    dependencies: ["framer-motion"],
    files: [
      "components/buttons/ReactorButton/ReactorButton.jsx",
      "components/buttons/ReactorButton/ReactorButton.css",
    ],
    category: "buttons",
  },

  // ── BADGES ───────────────────────────────────────────────────────────────
  {
    name: "bomb-timer",
    type: "components:ui",
    description: "Countdown timer badge with bomb animation",
    dependencies: ["framer-motion"],
    files: [
      "components/badges/BombTimer/BombTimer.jsx",
      "components/badges/BombTimer/BombTimer.css",
    ],
    category: "badges",
  },
  {
    name: "reactor-badge",
    type: "components:ui",
    description: "Reactor-styled badge",
    dependencies: ["framer-motion"],
    files: [
      "components/badges/ReactorBadge/ReactorBadge.jsx",
      "components/badges/ReactorBadge/ReactorBadge.css",
    ],
    category: "badges",
  },
  {
    name: "status-badge",
    type: "components:ui",
    description: "Status indicator badge",
    files: [
      "components/badges/StatusBadge/StatusBadge.jsx",
      "components/badges/StatusBadge/StatusBadge.css",
    ],
    category: "badges",
  },
  {
    name: "tactical-hex-badge",
    type: "components:ui",
    description: "Hexagonal tactical badge",
    files: [
      "components/badges/TacticalHexBadge/TacticalHexBadge.jsx",
      "components/badges/TacticalHexBadge/TacticalHexBadge.css",
    ],
    category: "badges",
  },

  // ── CARDS ─────────────────────────────────────────────────────────────────
  {
    name: "reactor-card",
    type: "components:ui",
    description: "Card with reactor animation",
    dependencies: ["framer-motion"],
    files: [
      "components/cards/ReactorCard/ReactorCard.jsx",
      "components/cards/ReactorCard/ReactorCard.css",
    ],
    category: "cards",
  },
  {
    name: "stack-carousel",
    type: "components:ui",
    description: "Stacked card carousel",
    dependencies: ["framer-motion"],
    files: [
      "components/cards/StackCarousel/StackCarousel.jsx",
      "components/cards/StackCarousel/StackCarousel.css",
    ],
    category: "cards",
  },

  // ── MENUS ─────────────────────────────────────────────────────────────────
  {
    name: "radial-command-menu",
    type: "components:ui",
    description: "Radial command menu",
    dependencies: ["framer-motion"],
    files: [
      "components/menu/RadialCommandMenu/RadialCommandMenu.jsx",
      "components/menu/RadialCommandMenu/RadialCommandMenu.css",
    ],
    category: "menus",
  },

  // ── PANELS ────────────────────────────────────────────────────────────────
  {
    name: "core-console",
    type: "components:ui",
    description: "Core console panel",
    files: [
      "components/panels/CoreConsole/CoreConsole.jsx",
      "components/panels/CoreConsole/CoreConsole.css",
    ],
    category: "panels",
  },
  {
    name: "weapon-module-panel",
    type: "components:ui",
    description: "Weapon module control panel",
    files: [
      "components/panels/WeaponModulePanel/WeaponModulePanel.jsx",
      "components/panels/WeaponModulePanel/WeaponModulePanel.css",
    ],
    category: "panels",
  },

  // ── SLIDERS ───────────────────────────────────────────────────────────────
  {
    name: "control-slider",
    type: "components:ui",
    description: "Futuristic control slider",
    files: [
      "components/sliders/ControlSlider/ControlSlider.jsx",
      "components/sliders/ControlSlider/ControlSlider.css",
    ],
    category: "sliders",
  },

  // ── TOGGLES ───────────────────────────────────────────────────────────────
  {
    name: "reactor-toggle",
    type: "components:ui",
    description: "Reactor-style toggle switch",
    dependencies: ["framer-motion"],
    files: [
      "components/toggles/ReactorToggle/ReactorToggle.jsx",
      "components/toggles/ReactorToggle/ReactorToggle.css",
    ],
    category: "toggles",
  },
]