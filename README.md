# 🧬 Genomic Variant Density Viewer

**Rust + WebAssembly prototype for genomic data visualisation**

An interactive, browser-based prototype for visualising **genomic variant density** across chromosomes using **Rust compiled to WebAssembly (WASM)** and a lightweight JavaScript frontend.

The goal of this project is to explore how modern web technologies can support **large-scale genomic data visualisation** while keeping all computation **client-side**.

---

## ✨ Features

- Interactive histogram of genomic variant density  
- Chromosome selection for focused exploration  
- Adjustable bin sizes (100 kb – 1 Mb)  
- High-performance binning using Rust and WebAssembly  
- Automatic adaptive rendering for large datasets  
- Zoom (click-to-enlarge) and horizontal scrolling  
- JavaScript vs WASM performance comparison  
- Tooltips showing variant counts per bin  

---

## 🧠 Design Rationale

### Why Rust + WebAssembly?

Genomic datasets can be large, and repeated binning operations can become computationally expensive in JavaScript alone. Rust provides:

- Predictable performance  
- Memory safety  
- Efficient numerical computation  

By compiling Rust to WebAssembly, this project performs CPU-intensive binning in WASM while keeping the user interface responsive in the browser.

---

### Adaptive Rendering Strategy

A key challenge was visualising very large datasets on a limited screen width. When the number of genomic bins exceeds available screen pixels, traditional rendering leads to sparse or misleading charts.

This project automatically switches rendering strategy:

- **Small datasets (≤ 10,000 rows)**  
  → Full-resolution rendering with one bar per bin  

- **Large datasets (> 10,000 rows)**  
  → Dynamic bin aggregation so each bar maps to at least one screen pixel  

This approach mirrors techniques used in professional genome browsers such as **Ensembl** and **UCSC**.

---

## 🧪 Performance Comparison

For each interaction, the application measures and displays the time taken to compute genomic bins using:

- Rust compiled to WebAssembly  
- Pure JavaScript  

This allows direct comparison of performance trade-offs within the same application.

---

## ▶️ Running the Project Locally

### Prerequisites

- Node.js (v18+ recommended)
- Rust (stable)
- wasm-pack

Install wasm-pack if needed:

    cargo install wasm-pack

### Build the WebAssembly module

    cd wasm
    wasm-pack build --target web

### Run the frontend

    cd ../web
    npm install
    npm run dev

Open the local URL shown in the terminal (usually http://localhost:5173).

---

## 📁 Input Data Format

The application expects a CSV file with at least the following columns:

    chromosome,position
    chr1,123456
    chr1,789012
    chr2,345678

Large public datasets (for example, ClinVar) can be used directly.

---

## 🔐 Data Privacy

All data processing happens entirely in the browser.

- No backend
- No database
- No persistence of uploaded data

This makes the tool suitable for exploratory analysis without data governance concerns.

---

## 🌱 Motivation

This project reflects my interest in genomics and computational biology, supported by an academic background in biology at A-level, and my desire to apply modern web engineering techniques to scientific data.
