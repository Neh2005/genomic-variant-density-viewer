<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Genomic Variant Density Viewer</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
      line-height: 1.6;
      max-width: 900px;
      margin: auto;
      padding: 24px;
      color: #1f2937;
      background-color: #ffffff;
    }

    h1, h2, h3 {
      color: #111827;
    }

    h1 {
      margin-bottom: 0.2em;
    }

    code, pre {
      background-color: #f3f4f6;
      padding: 4px 6px;
      border-radius: 4px;
      font-family: monospace;
    }

    pre {
      padding: 12px;
      overflow-x: auto;
    }

    ul {
      margin-left: 20px;
    }

    .section {
      margin-bottom: 32px;
    }
  </style>
</head>

<body>

  <h1>🧬 Genomic Variant Density Viewer (Rust + WebAssembly)</h1>

  <p>
    An interactive, browser-based prototype for visualising
    <strong>genomic variant density</strong> across chromosomes using
    <strong>Rust compiled to WebAssembly (WASM)</strong> and a lightweight
    JavaScript frontend.
  </p>

  <p>
    This project explores how modern web technologies can support
    large-scale genomic data visualisation while keeping all computation
    client-side.
  </p>

  <div class="section">
    <h2>✨ Features</h2>
    <ul>
      <li>Interactive histogram of variant density</li>
      <li>Chromosome selection</li>
      <li>Adjustable bin sizes (100 kb – 1 Mb)</li>
      <li>High-performance binning in Rust (WASM)</li>
      <li>Adaptive rendering for large datasets</li>
      <li>Zoom (click-to-enlarge) and horizontal scrolling</li>
      <li>JavaScript vs WASM performance comparison</li>
      <li>Tooltips showing variant counts per bin</li>
    </ul>
  </div>

  <div class="section">
    <h2>🧠 Design Rationale</h2>

    <h3>Why Rust + WebAssembly?</h3>
    <p>
      Genomic datasets can be large, and repeated binning operations
      become expensive in JavaScript alone. Rust provides predictable
      performance, memory safety, and efficient numerical computation.
    </p>

    <p>
      By compiling Rust to WebAssembly, this project performs CPU-intensive
      binning in WASM while keeping the UI responsive in the browser.
    </p>

    <h3>Adaptive Rendering Strategy</h3>
    <p>
      Large datasets often contain more bins than available screen pixels.
      To avoid sub-pixel rendering artefacts, this project automatically
      switches rendering strategies:
    </p>

    <ul>
      <li>
        <strong>Small datasets (≤ 10,000 rows):</strong>
        Full-resolution rendering (one bar per bin)
      </li>
      <li>
        <strong>Large datasets (&gt; 10,000 rows):</strong>
        Dynamic bin aggregation so each bar maps to at least one screen pixel
      </li>
    </ul>

    <p>
      This approach mirrors techniques used in professional genome browsers
      such as Ensembl and UCSC.
    </p>
  </div>

  <div class="section">
    <h2>🧪 Performance Comparison</h2>
    <p>
      For each update, the application measures and displays:
    </p>
    <ul>
      <li>Rust/WASM binning time</li>
      <li>JavaScript binning time</li>
    </ul>
    <p>
      This enables direct comparison of performance trade-offs within the
      same application.
    </p>
  </div>

  <div class="section">
    <h2>🗂️ Project Structure</h2>
    <pre>
genomic-variant-viewer/
├── web/          Frontend (HTML, CSS, JavaScript)
├── wasm/         Rust → WebAssembly module
├── data/         Example datasets / generators
└── README.html
    </pre>
  </div>

  <div class="section">
    <h2>▶️ How to Run Locally</h2>

    <h3>Prerequisites</h3>
    <ul>
      <li>Node.js (v18+ recommended)</li>
      <li>Rust (stable)</li>
      <li>wasm-pack</li>
    </ul>

    <pre>
cargo install wasm-pack
    </pre>

    <h3>Build the WASM module</h3>
    <pre>
cd wasm
wasm-pack build --target web
    </pre>

    <h3>Run the frontend</h3>
    <pre>
cd ../web
npm install
npm run dev
    </pre>
  </div>

  <div class="section">
    <h2>📁 Input Data Format</h2>
    <p>The application expects a CSV file with at least:</p>
    <pre>
chromosome,position
chr1,123456
chr1,789012
chr2,345678
    </pre>
  </div>

  <div class="section">
    <h2>🔐 Data Privacy</h2>
    <p>
      All processing happens entirely in the browser.
      No backend, no database, and no data persistence.
    </p>
  </div>

  <div class="section">
    <h2>🌱 Motivation</h2>
    <p>
      This project reflects my interest in genomics and computational biology,
      supported by an academic background in biology at A-level, and my desire
      to apply modern web engineering techniques to scientific data.
    </p>
  </div>

  <div class="section">
    <h2>🚀 Future Improvements</h2>
    <ul>
      <li>Zoom slider for finer control</li>
      <li>Axis labels with genomic coordinates</li>
      <li>Support for additional variant annotations</li>
      <li>Integration with public genomic APIs</li>
    </ul>
  </div>

</body>
</html>
