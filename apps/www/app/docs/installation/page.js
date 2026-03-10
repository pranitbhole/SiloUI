import Link from "next/link";

function CodeBlock({ code, label = "terminal" }) {
  return (
    <div className="install-code-block">
      <div className="install-code-label">{label}</div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export default function InstallationPage() {
  return (
    <div className="doc-page">
      <div className="page-header">
        <div className="page-label">Getting Started</div>
        <h1 className="page-title">Installation</h1>
        <p className="page-desc">How to add SiloUI components to your project.</p>
      </div>
      <div className="doc-body">
        <h2>Step 1 — Init your project</h2>
        <p>Run the init command inside your React project. This creates a <code>components.json</code> file that tells the CLI where to put files and what aliases you use.</p>
        <CodeBlock code="npx siloui init" />
        <p>You will be prompted to configure:</p>
        <ul>
          <li>TypeScript or JavaScript</li>
          <li>Where your Tailwind config lives</li>
          <li>Your global CSS file path</li>
          <li>Import alias for components (e.g. <code>@/components</code>)</li>
        </ul>

        <h2>Step 2 — Add a component</h2>
        <p>Pick any component from the sidebar and run the add command. The CLI downloads the <code>.jsx</code> and <code>.css</code> files and installs any required dependencies automatically.</p>
        <CodeBlock code="npx siloui add glow-button" />
        <p>To add multiple components at once:</p>
        <CodeBlock code="npx siloui add glow-button reactor-card bomb-timer" />

        <h2>Step 3 — Import and use</h2>
        <p>After adding, the component lives in your <code>components/ui/</code> folder. Import and use it like any regular component.</p>
        <CodeBlock
          code={`import GlowButton from "@/components/ui/GlowButton/GlowButton"\nimport "@/components/ui/GlowButton/GlowButton.css"\n\nexport default function App() {\n  return <GlowButton>Launch</GlowButton>\n}`}
          label="jsx"
        />

        <h2>Manual installation</h2>
        <p>Don&apos;t want to use the CLI? Every component page has a <strong>Source</strong> tab where you can copy the code directly and paste it into your project.</p>

        <div className="info-box">
          <div className="info-icon">ℹ</div>
          <div>
            <strong>Note on CSS imports</strong><br />
            Each component ships with its own CSS file. Make sure to import both the <code>.jsx</code> and the <code>.css</code> — the CLI does this for you, but if you copy manually remember to import the stylesheet.
          </div>
        </div>

        <div className="next-links">
          <Link href="/docs/introduction" className="next-link">
            <div className="next-label">← Previous</div>
            <div className="next-title">Introduction</div>
          </Link>
          <Link href="/components/glow-button" className="next-link">
            <div className="next-label">Next →</div>
            <div className="next-title">Browse Components</div>
          </Link>
        </div>
      </div>
    </div>
  );
}