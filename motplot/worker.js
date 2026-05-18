import init, { Newel } from "./engine/pkg/newel_engine.js";

const ready = init();

self.onmessage = async (e) => {
    await ready;
    const { id, seed } = e.data;

    let g = null;
    let attempt = BigInt(seed);
    let usedSeed = null;
    for (let i = 0; i < 6 && !g; i++) {
        g = Newel.from_seed_5x5(attempt);
        if (g) usedSeed = attempt;
        attempt = attempt + 1n;
    }
    if (!g) {
        self.postMessage({ id, error: "generation failed" });
        return;
    }

    const rows = g.rows();
    const cols = g.cols();
    const total = rows * cols;
    const solution = new Uint8Array(total);
    const clues = new Uint8Array(total);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const kind = g.cell_kind(r, c);
            if (kind === 0) {
                solution[idx] = "#".charCodeAt(0);
            } else {
                solution[idx] = g.solution_letter(r, c);
                if (kind === 2) clues[idx] = 1;
            }
        }
    }
    const serveTotal = g.total_to_serve();
    const serve_order = new Uint32Array(serveTotal);
    for (let s = 0; s < serveTotal; s++) {
        serve_order[s] = g.serve_cell(s);
    }
    g.free?.();

    self.postMessage({
        id,
        seed: usedSeed.toString(),
        rows,
        cols,
        solution,
        clues,
        serve_order,
    });
};
