const fs = require('fs-extra')
const path = require('path')

// Path to your actual components
const COMPONENTS_ROOT = path.join(__dirname, '../../../packages/ui/src/components')
const REGISTRY_PATH = path.join(__dirname, '../public/registry')

// ─── REGISTRY DEFINITION ────────────────────────────────────────────────────
// Each component lists ALL its files (jsx + css)
// The "folder" is the subfolder inside components/category/
const registry = [
  // ── BUTTONS ────────────────────────────────────────────────────────────────
  {
    name: 'glow-button',
    category: 'buttons',
    description: 'Button with animated glow effect',
    dependencies: ['framer-motion', 'clsx'],
    files: [
      { src: 'buttons/GlowButton/GlowButton.jsx', dest: 'GlowButton.jsx' },
      { src: 'buttons/GlowButton/GlowButton.css', dest: 'GlowButton.css' },
    ],
  },
  {
    name: 'reactor-button',
    category: 'buttons',
    description: 'Button with reactor-style animation',
    dependencies: ['framer-motion'],
    files: [
      { src: 'buttons/ReactorButton/ReactorButton.jsx', dest: 'ReactorButton.jsx' },
      { src: 'buttons/ReactorButton/ReactorButton.css', dest: 'ReactorButton.css' },
    ],
  },

  // ── BADGES ─────────────────────────────────────────────────────────────────
  {
    name: 'bomb-timer',
    category: 'badges',
    description: 'Countdown timer badge with bomb animation',
    dependencies: ['framer-motion'],
    files: [
      { src: 'badges/BombTimer/BombTimer.jsx', dest: 'BombTimer.jsx' },
      { src: 'badges/BombTimer/BombTimer.css', dest: 'BombTimer.css' },
    ],
  },
  {
    name: 'reactor-badge',
    category: 'badges',
    description: 'Reactor-styled badge',
    dependencies: ['framer-motion'],
    files: [
      { src: 'badges/ReactorBadge/ReactorBadge.jsx', dest: 'ReactorBadge.jsx' },
      { src: 'badges/ReactorBadge/ReactorBadge.css', dest: 'ReactorBadge.css' },
    ],
  },
  {
    name: 'status-badge',
    category: 'badges',
    description: 'Status indicator badge',
    files: [
      { src: 'badges/StatusBadge/StatusBadge.jsx', dest: 'StatusBadge.jsx' },
      { src: 'badges/StatusBadge/StatusBadge.css', dest: 'StatusBadge.css' },
    ],
  },
  {
    name: 'tactical-hex-badge',
    category: 'badges',
    description: 'Hexagonal tactical badge',
    files: [
      { src: 'badges/TacticalHexBadge/TacticalHexBadge.jsx', dest: 'TacticalHexBadge.jsx' },
      { src: 'badges/TacticalHexBadge/TacticalHexBadge.css', dest: 'TacticalHexBadge.css' },
    ],
  },

  // ── CARDS ──────────────────────────────────────────────────────────────────
  {
    name: 'reactor-card',
    category: 'cards',
    description: 'Card with reactor animation',
    dependencies: ['framer-motion'],
    files: [
      { src: 'cards/ReactorCard/ReactorCard.jsx', dest: 'ReactorCard.jsx' },
      { src: 'cards/ReactorCard/ReactorCard.css', dest: 'ReactorCard.css' },
    ],
  },
  {
    name: 'stack-carousel',
    category: 'cards',
    description: 'Stacked card carousel',
    dependencies: ['framer-motion'],
    files: [
      { src: 'cards/StackCarousel/StackCarousel.jsx', dest: 'StackCarousel.jsx' },
      { src: 'cards/StackCarousel/StackCarousel.css', dest: 'StackCarousel.css' },
    ],
  },

  // ── MENUS ──────────────────────────────────────────────────────────────────
  {
    name: 'radial-command-menu',
    category: 'menus',
    description: 'Radial command menu',
    dependencies: ['framer-motion'],
    files: [
      { src: 'menu/RadialCommandMenu/RadialCommandMenu.jsx', dest: 'RadialCommandMenu.jsx' },
      { src: 'menu/RadialCommandMenu/RadialCommandMenu.css', dest: 'RadialCommandMenu.css' },
    ],
  },

  // ── PANELS ─────────────────────────────────────────────────────────────────
  {
    name: 'core-console',
    category: 'panels',
    description: 'Core console panel',
    files: [
      { src: 'panels/CoreConsole/CoreConsole.jsx', dest: 'CoreConsole.jsx' },
      { src: 'panels/CoreConsole/CoreConsole.css', dest: 'CoreConsole.css' },
    ],
  },
  {
    name: 'weapon-module-panel',
    category: 'panels',
    description: 'Weapon module control panel',
    files: [
      { src: 'panels/WeaponModulePanel/WeaponModulePanel.jsx', dest: 'WeaponModulePanel.jsx' },
      { src: 'panels/WeaponModulePanel/WeaponModulePanel.css', dest: 'WeaponModulePanel.css' },
    ],
  },

  // ── SLIDERS ────────────────────────────────────────────────────────────────
  {
    name: 'control-slider',
    category: 'sliders',
    description: 'Futuristic control slider',
    files: [
      { src: 'sliders/ControlSlider/ControlSlider.jsx', dest: 'ControlSlider.jsx' },
      { src: 'sliders/ControlSlider/ControlSlider.css', dest: 'ControlSlider.css' },
    ],
  },

  // ── TOGGLES ────────────────────────────────────────────────────────────────
  {
    name: 'reactor-toggle',
    category: 'toggles',
    description: 'Reactor-style toggle switch',
    dependencies: ['framer-motion'],
    files: [
      { src: 'toggles/ReactorToggle/ReactorToggle.jsx', dest: 'ReactorToggle.jsx' },
      { src: 'toggles/ReactorToggle/ReactorToggle.css', dest: 'ReactorToggle.css' },
    ],
  },
]

// ─── BUILD ───────────────────────────────────────────────────────────────────
async function buildRegistry() {
  console.log('📦 Building component registry...\n')

  let successCount = 0
  let errorCount = 0

  try {
    // Create output directories
    await fs.ensureDir(path.join(REGISTRY_PATH, 'styles/default'))

    // ── index.json ────────────────────────────────────────────────────────────
    const index = registry.map((item) => ({
      name: item.name,
      type: 'components:ui',
      category: item.category,
      description: item.description || '',
    }))

    await fs.writeJson(path.join(REGISTRY_PATH, 'index.json'), index, { spaces: 2 })
    console.log(`✓ index.json  →  ${index.length} components\n`)

    // ── Per-component JSON ────────────────────────────────────────────────────
    for (const item of registry) {
      try {
        const builtFiles = []

        for (const file of item.files) {
          const sourcePath = path.join(COMPONENTS_ROOT, file.src)

          if (!fs.existsSync(sourcePath)) {
            throw new Error(`Missing: packages/ui/src/components/${file.src}`)
          }

          const content = await fs.readFile(sourcePath, 'utf-8')
          builtFiles.push({ name: file.dest, content })
        }

        const payload = {
          name: item.name,
          type: 'components:ui',
          category: item.category,
          description: item.description || '',
          dependencies: item.dependencies || [],
          devDependencies: item.devDependencies || [],
          files: builtFiles,
        }

        const outPath = path.join(REGISTRY_PATH, 'styles/default', `${item.name}.json`)
        await fs.writeJson(outPath, payload, { spaces: 2 })

        console.log(`  ✓  ${item.name}`)
        successCount++
      } catch (err) {
        console.error(`  ✗  ${item.name}: ${err.message}`)
        errorCount++
      }
    }

    console.log(`\n────────────────────────────────`)
    console.log(`  Built:  ${successCount} components`)
    if (errorCount > 0) {
      console.log(`  Failed: ${errorCount} components`)
    }
    console.log(`────────────────────────────────\n`)

    if (errorCount > 0) {
      console.log('⚠  Some components failed. Check that files exist in packages/ui/src/components/\n')
    } else {
      console.log('🎉 Registry built successfully!\n')
    }

  } catch (err) {
    console.error('✗ Fatal error:', err.message)
    process.exit(1)
  }
}

buildRegistry()