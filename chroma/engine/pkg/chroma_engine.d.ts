/* tslint:disable */
/* eslint-disable */

export class ChromaGame {
    free(): void;
    [Symbol.dispose](): void;
    cell(r: number, c: number): number;
    chain_adjacent(a: number, b: number): boolean;
    /**
     * -1 = split, 0 = not placed, 1 = connected
     */
    connectivity(color: number): number;
    /**
     * Create a game from a level number (1-6).
     */
    static from_level(level: number): ChromaGame;
    /**
     * Generate a new puzzle.
     * `difficulty`: 0 = Easy, 1 = Medium, 2 = Hard.
     * Returns true on success.
     */
    generate(seed: number, difficulty: number): boolean;
    height(): number;
    is_clue(r: number, c: number): boolean;
    is_error(r: number, c: number): boolean;
    is_solved(): boolean;
    static level_count(): number;
    static level_info(level: number): number;
    /**
     * Create a game with custom dimensions.
     */
    constructor(width: number, height: number);
    num_colors(): number;
    place(r: number, c: number, color: number): void;
    solution_cell(r: number, c: number): number;
    undo(): boolean;
    width(): number;
}

/**
 * Level configuration: board dimensions and color count.
 */
export class LevelConfig {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    height: number;
    num_colors: number;
    width: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_chromagame_free: (a: number, b: number) => void;
    readonly __wbg_get_levelconfig_height: (a: number) => number;
    readonly __wbg_get_levelconfig_num_colors: (a: number) => number;
    readonly __wbg_get_levelconfig_width: (a: number) => number;
    readonly __wbg_levelconfig_free: (a: number, b: number) => void;
    readonly __wbg_set_levelconfig_height: (a: number, b: number) => void;
    readonly __wbg_set_levelconfig_num_colors: (a: number, b: number) => void;
    readonly __wbg_set_levelconfig_width: (a: number, b: number) => void;
    readonly chromagame_cell: (a: number, b: number, c: number) => number;
    readonly chromagame_chain_adjacent: (a: number, b: number, c: number) => number;
    readonly chromagame_connectivity: (a: number, b: number) => number;
    readonly chromagame_from_level: (a: number) => number;
    readonly chromagame_generate: (a: number, b: number, c: number) => number;
    readonly chromagame_height: (a: number) => number;
    readonly chromagame_is_clue: (a: number, b: number, c: number) => number;
    readonly chromagame_is_error: (a: number, b: number, c: number) => number;
    readonly chromagame_is_solved: (a: number) => number;
    readonly chromagame_level_count: () => number;
    readonly chromagame_level_info: (a: number) => number;
    readonly chromagame_new: (a: number, b: number) => number;
    readonly chromagame_num_colors: (a: number) => number;
    readonly chromagame_place: (a: number, b: number, c: number, d: number) => void;
    readonly chromagame_solution_cell: (a: number, b: number, c: number) => number;
    readonly chromagame_undo: (a: number) => number;
    readonly chromagame_width: (a: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
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
