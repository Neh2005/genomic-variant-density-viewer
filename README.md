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
      margin-bottom: 0.3em;
    }

    ul {
      margin-left: 20px;
    }

    .section {
      margin-bottom: 32px;
    }

    .example {
      background-color: #f3f4f6;
      padding: 12px;
      border-radius: 6px;
      font-family: monospace;
      font-size: 0.9rem;
    }
  </style>
</head>

<body>

  <h1>🧬 Genomic Variant Density Viewer</h1>
  <p><strong>Rust + WebAssembly prototype for genomic data visualisation</strong></p>

  <p>
    This project is an interactive, browser-based prototype for visualising
    <strong>genomic variant density</strong> across chromosomes using
    <strong>Rust compiled to WebAssembly (WASM)</strong> and a lightweight
    JavaScript frontend.
  </p>

  <p>
    The goal is to explore how modern web technologies can support
    large-scale genomic data visualisation while keeping all computation
    client-side.
  </p>

  <div class="section">
    <h2>✨ Features</h2>
    <ul>
      <li>Interactive histogram of genomic variant density</li>
      <li>Chromosome selection for focused exploration</li>
      <li>Adjustable bin sizes (100 kb – 1 Mb)</li>
      <li>High-performance binning using Rust and WebAssembly</li>
      <li>Automatic adaptive rendering for large datasets</li>
      <li>Zoom (click-to-enlarge) and horizontal scrolling</li>
      <li>JavaScript vs WASM performance comparison</li>
      <li>Tooltips showing variant counts per bin</li>
    </ul>
  </div>

  <div class="section">
    <h2>🧠 Design Rationale</h2>

    <h3>Why Rust + WebAssembly?</h3>
    <p>
      Genomic datasets can be large, and repeated binning operations can become
      computationally expensive in JavaScript alone. Rust provides predictable
      performance, memory safety, and efficient numerical computation.
    </p>

    <p>
      By compiling Rust to WebAssembly, this project performs CPU-intensive
      binning in WASM while keeping the user interface responsive in the browser.
    </p>

    <h3>Adaptive Rendering Strategy</h3>
    <p>
      A key challenge was visualising very large datasets on a limited screen
      width. When the number of genomic bins exceeds available screen pixels,
      traditional rendering leads to sparse or misleading charts.
    </p>

    <p>
      This project automatically switches rendering strategy:
    </p>

    <ul>
      <li>
        <strong>Small datasets (≤ 10,000 rows):</strong>
        Full-resolution rendering with one bar per bin
      </li>
      <li>
        <strong>Large datasets (&gt; 10,000 rows):</strong>
        Dynamic bin aggregation so each bar maps to at least one screen pixel
      </li>
    </ul>

    <p>
      This approach mirrors techniques used in professional genome browsers such
      as Ensembl and UCSC.
    </p>
  </div>

  <div class="section">
    <h2>🧪 Performance Comparison</h2>
    <p>
      For each interaction, the application measures and displays the time taken
      to compute genomic bins using:
    </p>
    <ul>
      <li>Rust compiled to WebAssembly</li>
      <li>Pure JavaScript</li>
    </ul>

    <p>
      This allows direct comparison of performance trade-offs within the same
      application.
    </p>
  </div>

  <div class="section">
    <h2>🗂️ Project Structure</h2>
    <p>
      The project is organised into a frontend and a WebAssembly module:
    </p>
    <ul>
      <li><strong>web/</strong> – HTML, CSS, and JavaScript frontend</li>
      <li><strong>wasm/</strong> – Rust code compiled to WebAssembly</li>
      <li><strong>data/</strong> – Example datasets and generators</li>
    </ul>
  </div>

  <div class="section">
    <h2>▶️ Running the Project</h2>
    <p>
      The WebAssembly module is built using Rust tooling and then loaded by the
      frontend. The frontend is served locally using a modern JavaScript
      development server.
    </p>

    <p>
      Once running, users can upload a CSV file, select a chromosome, adjust bin
      sizes, and explore variant density interactively in the browser.
    </p>
  </div>

  <div class="section">
    <h2>📁 Input Data Format</h2>
    <p>
      The application expects a CSV file with at least the following columns:
    </p>

    <div class="example">
      chromosome,position<br>
      chr1,123456<br>
      chr1,789012<br>
      chr2,345678
    </div>
  </div>

  <div class="section">
    <h2>🔐 Data Privacy</h2>
    <p>
      All data processing happens entirely in the browser. There is no backend,
      no database, and no persistence of uploaded data.
    </p>
  </div>

  <div class="section">
    <h2>🌱 Motivation</h2>
    <p>
      This project reflects my interest in genomics and computational biology,
      supported by an academic background in biology at A-level, and my desire to
      apply modern web engineering techniques to scientific data.
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
