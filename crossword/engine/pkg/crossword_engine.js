/* @ts-self-types="./crossword_engine.d.ts" */

export class CrosswordGame {
    static __wrap(ptr) {
        const obj = Object.create(CrosswordGame.prototype);
        obj.__wbg_ptr = ptr;
        CrosswordGameFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CrosswordGameFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_crosswordgame_free(ptr, 0);
    }
    /**
     * 0 = block, 1 = empty (hidden), 2 = clue (revealed at start), 3 = played (revealed during play)
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    cell_kind(r, c) {
        const ret = wasm.crosswordgame_cell_kind(this.__wbg_ptr, r, c);
        return ret >>> 0;
    }
    /**
     * Returns the letter (a..z as u8 codepoint) at the cell, or 0 if empty/block.
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    cell_letter(r, c) {
        const ret = wasm.crosswordgame_cell_letter(this.__wbg_ptr, r, c);
        return ret >>> 0;
    }
    /**
     * Returns true if the cell was a clue (initially revealed). Useful for debug overlays.
     * @param {number} r
     * @param {number} c
     * @returns {boolean}
     */
    cell_was_clue(r, c) {
        const ret = wasm.crosswordgame_cell_was_clue(this.__wbg_ptr, r, c);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    cols() {
        const ret = wasm.crosswordgame_cols(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Currently served letter, or 0 when game is over.
     * @returns {number}
     */
    current_letter() {
        const ret = wasm.crosswordgame_current_letter(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Build a game from pre-generated plan data (loaded from a JSON puzzle file).
     * `solution_flat` is the rows*cols solution as bytes (b'#' for blocks).
     * `clues_flat` is the rows*cols clue mask as 0/1 bytes.
     * `serve_order` is the cell indices to serve, in order.
     * @param {number} rows
     * @param {number} cols
     * @param {Uint8Array} solution_flat
     * @param {Uint8Array} clues_flat
     * @param {Uint32Array} serve_order
     * @returns {CrosswordGame | undefined}
     */
    static from_data(rows, cols, solution_flat, clues_flat, serve_order) {
        const ptr0 = passArray8ToWasm0(solution_flat, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(clues_flat, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray32ToWasm0(serve_order, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.crosswordgame_from_data(rows, cols, ptr0, len0, ptr1, len1, ptr2, len2);
        return ret === 0 ? undefined : CrosswordGame.__wrap(ret);
    }
    /**
     * Create a new game from a seed using a fully-open 4x4 grid (no blocks).
     * @param {bigint} seed
     * @returns {CrosswordGame | undefined}
     */
    static from_seed(seed) {
        const ret = wasm.crosswordgame_from_seed(seed);
        return ret === 0 ? undefined : CrosswordGame.__wrap(ret);
    }
    /**
     * 4x4 fully-open grid, no blocks. 16 cells, 4 across + 4 down length-4.
     * @param {bigint} seed
     * @returns {CrosswordGame | undefined}
     */
    static from_seed_4x4(seed) {
        const ret = wasm.crosswordgame_from_seed_4x4(seed);
        return ret === 0 ? undefined : CrosswordGame.__wrap(ret);
    }
    /**
     * 5x5 grid with exactly 2 opposite-corner cells blocked.
     * @param {bigint} seed
     * @returns {CrosswordGame | undefined}
     */
    static from_seed_5x5(seed) {
        const ret = wasm.crosswordgame_from_seed_5x5(seed);
        return ret === 0 ? undefined : CrosswordGame.__wrap(ret);
    }
    /**
     * 6x6 grid with 0–4 corner cells blocked.
     * @param {bigint} seed
     * @returns {CrosswordGame | undefined}
     */
    static from_seed_6x6(seed) {
        const ret = wasm.crosswordgame_from_seed_6x6(seed);
        return ret === 0 ? undefined : CrosswordGame.__wrap(ret);
    }
    /**
     * @returns {boolean}
     */
    is_lost() {
        const ret = wasm.crosswordgame_is_lost(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * True if the cell is empty AND is the next-empty position of at least one of
     * its slots — i.e. a valid place to tap given the served letter.
     * @param {number} r
     * @param {number} c
     * @returns {boolean}
     */
    is_tappable(r, c) {
        const ret = wasm.crosswordgame_is_tappable(this.__wbg_ptr, r, c);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_won() {
        const ret = wasm.crosswordgame_is_won(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    max_mistakes() {
        const ret = wasm.crosswordgame_max_mistakes(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    mistakes() {
        const ret = wasm.crosswordgame_mistakes(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    rows() {
        const ret = wasm.crosswordgame_rows(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Cell index (row * cols + col) that should be tapped at the given serve step,
     * or u32::MAX if the step is out of range.
     * @param {number} step
     * @returns {number}
     */
    serve_cell(step) {
        const ret = wasm.crosswordgame_serve_cell(this.__wbg_ptr, step);
        return ret >>> 0;
    }
    /**
     * Letter served at the given step, or 0 if out of range.
     * @param {number} step
     * @returns {number}
     */
    serve_letter(step) {
        const ret = wasm.crosswordgame_serve_letter(this.__wbg_ptr, step);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    served_count() {
        const ret = wasm.crosswordgame_served_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Solution letter (a..z byte) at the cell, regardless of game state. 0 for blocks.
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    solution_letter(r, c) {
        const ret = wasm.crosswordgame_solution_letter(this.__wbg_ptr, r, c);
        return ret >>> 0;
    }
    /**
     * 0 = correct, 1 = wrong, 2 = win, 3 = lose, 4 = ignored
     * Taps on cells that aren't the next-empty position of any slot are ignored
     * (they don't count as mistakes — the UI should prevent these from registering
     * as taps in the first place, but this guards against UI/engine drift).
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    tap(r, c) {
        const ret = wasm.crosswordgame_tap(this.__wbg_ptr, r, c);
        return ret >>> 0;
    }
    /**
     * Total cells the player must fill in a complete play (excludes clues + blocks).
     * @returns {number}
     */
    total_to_serve() {
        const ret = wasm.crosswordgame_total_to_serve(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) CrosswordGame.prototype[Symbol.dispose] = CrosswordGame.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_9c75d47bf9e7731e: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./crossword_engine_bg.js": import0,
    };
}

const CrosswordGameFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_crosswordgame_free(ptr, 1));

function getStringFromWasm0(ptr, len) {
    return decodeText(ptr >>> 0, len);
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('crossword_engine_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
