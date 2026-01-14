import init, { bin_variants_by_chromosome } from "./pkg/genomic_wasm.js";

const LARGE_DATASET_THRESHOLD = 10000;
const BASE_BAR_WIDTH = 4;
const ZOOM_BAR_WIDTH = 10;

async function run() {
  await init();

  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");
  const tooltip = document.getElementById("tooltip");
  const chrSelect = document.getElementById("chromosomeSelect");
  const binSizeSelect = document.getElementById("binSizeSelect");
  const status = document.getElementById("status");
  const perf = document.getElementById("perf");

  let chromosomes = [];
  let positions = [];
  let rawBins = [];
  let displayBins = [];
  let zoomed = false;

  // -------------------------------
  // File upload
  // -------------------------------
  document.getElementById("fileInput").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    status.textContent = "Processing dataset...";
    perf.textContent = "";

    const text = await file.text();
    const rows = text.trim().split("\n").slice(1);

    chromosomes = [];
    positions = [];

    rows.forEach(row => {
      const [chr, pos] = row.split(",");
      chromosomes.push(chr);
      positions.push(Number(pos));
    });

    populateChromosomes();
  });

  function populateChromosomes() {
    const unique = [...new Set(chromosomes)];
    chrSelect.innerHTML = "";

    unique.forEach(chr => {
      const option = document.createElement("option");
      option.value = chr;
      option.textContent = chr;
      chrSelect.appendChild(option);
    });

    chrSelect.disabled = false;
    status.textContent = "Dataset loaded. Adjust bin size or chromosome.";
    updateChart();
  }

  chrSelect.addEventListener("change", updateChart);
  binSizeSelect.addEventListener("change", updateChart);

  // -------------------------------
  // Aggregation for large datasets
  // -------------------------------
  function aggregateBins(bins, maxBars) {
    if (bins.length <= maxBars) return bins;

    const factor = Math.ceil(bins.length / maxBars);
    const out = [];

    for (let i = 0; i < bins.length; i += factor) {
      let sum = 0;
      for (let j = i; j < i + factor && j < bins.length; j++) {
        sum += bins[j];
      }
      out.push(sum);
    }

    return out;
  }

  // -------------------------------
  // Main update
  // -------------------------------
  function updateChart() {
    const selectedChr = chrSelect.value;
    const binSize = Number(binSizeSelect.value);

    const t0 = performance.now();
    rawBins = bin_variants_by_chromosome(
      chromosomes,
      positions,
      selectedChr,
      binSize
    );
    const t1 = performance.now();

    perf.textContent = `WASM computation: ${(t1 - t0).toFixed(2)} ms`;

    status.textContent =
      positions.length > LARGE_DATASET_THRESHOLD
        ? "Large dataset: adaptive aggregated view (click chart to zoom)"
        : "Small dataset: detailed view (click chart to zoom)";

    render();
  }

  // -------------------------------
  // Rendering (FULL WIDTH FIXED)
  // -------------------------------
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!rawBins.length) {
      status.textContent = "No variants found for selected chromosome.";
      return;
    }

    const barWidth = zoomed ? ZOOM_BAR_WIDTH : BASE_BAR_WIDTH;
    const containerWidth = canvas.parentElement.clientWidth;

    // Decide rendering mode
    if (positions.length > LARGE_DATASET_THRESHOLD) {
      const maxBars = Math.floor(containerWidth / barWidth);
      displayBins = aggregateBins(rawBins, maxBars);
    } else {
      displayBins = rawBins;
    }

    // ✅ KEY FIX: canvas fills container OR scrolls if needed
    const requiredWidth = displayBins.length * barWidth;
    canvas.width = Math.max(containerWidth, requiredWidth);

    const maxVal = Math.max(...displayBins);
    const spacing = canvas.width / displayBins.length;

    displayBins.forEach((value, i) => {
      const height =
        (Math.log10(value + 1) / Math.log10(maxVal + 1)) * canvas.height;

      ctx.fillStyle = "#4f46e5";
      ctx.fillRect(
        i * spacing,
        canvas.height - height,
        spacing - 1,
        height
      );
    });
  }

  // -------------------------------
  // Click-to-zoom
  // -------------------------------
  canvas.addEventListener("click", () => {
    zoomed = !zoomed;
    render();
  });

  // -------------------------------
  // Tooltip (correct for all modes)
  // -------------------------------
  canvas.addEventListener("mousemove", (e) => {
    if (!displayBins.length) return;

    const rect = canvas.getBoundingClientRect();
    const index = Math.floor(
      (e.clientX - rect.left) / (canvas.width / displayBins.length)
    );

    if (index >= 0 && index < displayBins.length) {
      tooltip.style.display = "block";
      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY + 10 + "px";
      tooltip.textContent =
        positions.length > LARGE_DATASET_THRESHOLD
          ? `Variants (aggregated): ${displayBins[index]}`
          : `Variants: ${displayBins[index]}`;
    }
  });

  canvas.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}

run();
