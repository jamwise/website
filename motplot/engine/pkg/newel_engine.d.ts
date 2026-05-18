/* tslint:disable */
/* eslint-disable */

export class Newel {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * 0 = block, 1 = empty (hidden), 2 = clue (revealed at start), 3 = played (revealed during play)
     */
    cell_kind(r: number, c: number): number;
    /**
     * Returns the letter (a..z as u8 codepoint) at the cell, or 0 if empty/block.
     */
    cell_letter(r: number, c: number): number;
    /**
     * Returns true if the cell was a clue (initially revealed). Useful for debug overlays.
     */
    cell_was_clue(r: number, c: number): boolean;
    cols(): number;
    /**
     * Currently served letter, or 0 when game is over.
     */
    current_letter(): number;
    /**
     * Build a game from pre-generated plan data (loaded from a JSON puzzle file).
     * `solution_flat` is the rows*cols solution as bytes (b'#' for blocks).
     * `clues_flat` is the rows*cols clue mask as 0/1 bytes.
     * `serve_order` is the cell indices to serve, in order.
     */
    static from_data(rows: number, cols: number, solution_flat: Uint8Array, clues_flat: Uint8Array, serve_order: Uint32Array): Newel | undefined;
    /**
     * 5x5 grid with exactly 2 opposite-corner cells blocked.
     */
    static from_seed(seed: bigint): Newel | undefined;
    /**
     * 5x5 grid with exactly 2 opposite-corner cells blocked.
     */
    static from_seed_5x5(seed: bigint): Newel | undefined;
    is_lost(): boolean;
    /**
     * True if the cell is empty AND is the next-empty position of at least one of
     * its slots — i.e. a valid place to tap given the served letter.
     */
    is_tappable(r: number, c: number): boolean;
    is_won(): boolean;
    max_mistakes(): number;
    mistakes(): number;
    rows(): number;
    /**
     * Cell index (row * cols + col) that should be tapped at the given serve step,
     * or u32::MAX if the step is out of range.
     */
    serve_cell(step: number): number;
    /**
     * Letter served at the given step, or 0 if out of range.
     */
    serve_letter(step: number): number;
    served_count(): number;
    /**
     * Solution letter (a..z byte) at the cell, regardless of game state. 0 for blocks.
     */
    solution_letter(r: number, c: number): number;
    /**
     * 0 = correct, 1 = wrong, 2 = win, 3 = lose, 4 = ignored
     * Taps on cells that aren't the next-empty position of any slot are ignored
     * (they don't count as mistakes — the UI should prevent these from registering
     * as taps in the first place, but this guards against UI/engine drift).
     */
    tap(r: number, c: number): number;
    /**
     * Total cells the player must fill in a complete play (excludes clues + blocks).
     */
    total_to_serve(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_newel_free: (a: number, b: number) => void;
    readonly newel_cell_kind: (a: number, b: number, c: number) => number;
    readonly newel_cell_letter: (a: number, b: number, c: number) => number;
    readonly newel_cell_was_clue: (a: number, b: number, c: number) => number;
    readonly newel_cols: (a: number) => number;
    readonly newel_current_letter: (a: number) => number;
    readonly newel_from_data: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => number;
    readonly newel_from_seed: (a: bigint) => number;
    readonly newel_from_seed_5x5: (a: bigint) => number;
    readonly newel_is_lost: (a: number) => number;
    readonly newel_is_tappable: (a: number, b: number, c: number) => number;
    readonly newel_is_won: (a: number) => number;
    readonly newel_max_mistakes: (a: number) => number;
    readonly newel_mistakes: (a: number) => number;
    readonly newel_rows: (a: number) => number;
    readonly newel_serve_cell: (a: number, b: number) => number;
    readonly newel_serve_letter: (a: number, b: number) => number;
    readonly newel_served_count: (a: number) => number;
    readonly newel_solution_letter: (a: number, b: number, c: number) => number;
    readonly newel_tap: (a: number, b: number, c: number) => number;
    readonly newel_total_to_serve: (a: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
