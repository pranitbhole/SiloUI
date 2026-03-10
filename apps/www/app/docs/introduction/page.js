import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="doc-page">
      <div className="page-header">
        <div className="page-label">Getting Started</div>
        <h1 className="page-title">Introduction</h1>
        <p className="page-desc">What is SiloUI and how does it work?</p>
      </div>
      <div className="doc-body">
        <p>
          <strong>SiloUI</strong> is a collection of animated, production-ready React components.
          Unlike traditional component libraries, there is <strong>no npm package to install</strong>.
          Instead, you copy the component code directly into your project — you own it entirely.
        </p>
        <p>
          This approach is inspired by{" "}
          <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">shadcn/ui</a>.
          The components are not distributed as a dependency — they are source files you paste into
          your codebase and modify however you like.
        </p>
        <h2>Why this approach?</h2>
        <ul>
          <li><strong>You own the code.</strong> Every file lives in your project. No black boxes.</li>
          <li><strong>No version conflicts.</strong> No worrying about library updates breaking your UI.</li>
          <li><strong>Full customization.</strong> Edit anything — colors, animations, behaviour.</li>
          <li><strong>No bundle bloat.</strong> Only include exactly what you use.</li>
        </ul>
        <h2>How it works</h2>
        <p>Each component has a <code>.jsx</code> file and a <code>.css</code> file. The CLI fetches these from the registry and writes them into your project.</p>
        <div className="step-cards">
          {[
            { n: "1", title: "Run init",        desc: "Sets up a components.json config in your project root." },
            { n: "2", title: "Add a component", desc: "CLI downloads the files into your components folder." },
            { n: "3", title: "Import & use",    desc: "Import like any regular component. Customize freely." },
          ].map((s) => (
            <div key={s.n} className="step-card">
              <div className="step-n">{s.n}</div>
              <div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <h2>Requirements</h2>
        <ul>
          <li>React 18+</li>
          <li>Tailwind CSS <em>(some components)</em></li>
          <li>Framer Motion <em>(animated components — installed automatically by CLI)</em></li>
        </ul>
        <div className="next-links">
          <Link href="/docs/installation" className="next-link">
            <div className="next-label">Next</div>
            <div className="next-title">Installation →</div>
          </Link>
        </div>
      </div>
    </div>
  );
}