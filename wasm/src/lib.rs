use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bin_variants_by_chromosome(
    chromosomes: Vec<String>,
    positions: Vec<u32>,
    selected_chr: String,
    bin_size: u32,
) -> Vec<u32> {
    let mut filtered_positions = Vec::new();

    for i in 0..positions.len() {
        if chromosomes[i] == selected_chr {
            filtered_positions.push(positions[i]);
        }
    }

    if filtered_positions.is_empty() {
        return vec![];
    }

    let max_pos = *filtered_positions.iter().max().unwrap();
    let num_bins = (max_pos / bin_size) + 1;

    let mut bins = vec![0; num_bins as usize];

    for pos in filtered_positions {
        let index = (pos / bin_size) as usize;
        bins[index] += 1;
    }

    bins
}
