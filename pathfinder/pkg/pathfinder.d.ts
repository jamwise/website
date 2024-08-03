/* tslint:disable */
/* eslint-disable */
/**
*/
export class Pathfinder {
  free(): void;
/**
* @param {Uint8Array} pbf_contents
*/
  constructor(pbf_contents: Uint8Array);
/**
* @param {number} start_lon
* @param {number} start_lat
* @param {number} end_lon
* @param {number} end_lat
* @returns {any}
*/
  get_directions(start_lon: number, start_lat: number, end_lon: number, end_lat: number): any;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_pathfinder_free: (a: number) => void;
  readonly pathfinder_new: (a: number, b: number) => number;
  readonly pathfinder_get_directions: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
