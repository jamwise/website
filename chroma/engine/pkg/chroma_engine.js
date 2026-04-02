/* @ts-self-types="./chroma_engine.d.ts" */

export class ChromaGame {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ChromaGame.prototype);
        obj.__wbg_ptr = ptr;
        ChromaGameFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChromaGameFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_chromagame_free(ptr, 0);
    }
    /**
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    cell(r, c) {
        const ret = wasm.chromagame_cell(this.__wbg_ptr, r, c);
        return ret;
    }
    /**
     * @param {number} a
     * @param {number} b
     * @returns {boolean}
     */
    chain_adjacent(a, b) {
        const ret = wasm.chromagame_chain_adjacent(this.__wbg_ptr, a, b);
        return ret !== 0;
    }
    /**
     * -1 = split, 0 = not placed, 1 = connected
     * @param {number} color
     * @returns {number}
     */
    connectivity(color) {
        const ret = wasm.chromagame_connectivity(this.__wbg_ptr, color);
        return ret;
    }
    /**
     * Create a game from a level number (1-6).
     * @param {number} level
     * @returns {ChromaGame}
     */
    static from_level(level) {
        const ret = wasm.chromagame_from_level(level);
        return ChromaGame.__wrap(ret);
    }
    /**
     * Generate a new puzzle.
     * `difficulty`: 0 = Easy, 1 = Medium, 2 = Hard.
     * Returns true on success.
     * @param {number} seed
     * @param {number} difficulty
     * @returns {boolean}
     */
    generate(seed, difficulty) {
        const ret = wasm.chromagame_generate(this.__wbg_ptr, seed, difficulty);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    height() {
        const ret = wasm.chromagame_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} r
     * @param {number} c
     * @returns {boolean}
     */
    is_clue(r, c) {
        const ret = wasm.chromagame_is_clue(this.__wbg_ptr, r, c);
        return ret !== 0;
    }
    /**
     * @param {number} r
     * @param {number} c
     * @returns {boolean}
     */
    is_error(r, c) {
        const ret = wasm.chromagame_is_error(this.__wbg_ptr, r, c);
        return ret !== 0;
    }
    /**
     * @returns {boolean}
     */
    is_solved() {
        const ret = wasm.chromagame_is_solved(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    static level_count() {
        const ret = wasm.chromagame_level_count();
        return ret >>> 0;
    }
    /**
     * @param {number} level
     * @returns {number}
     */
    static level_info(level) {
        const ret = wasm.chromagame_level_info(level);
        return ret >>> 0;
    }
    /**
     * Create a game with custom dimensions.
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        const ret = wasm.chromagame_new(width, height);
        this.__wbg_ptr = ret >>> 0;
        ChromaGameFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    num_colors() {
        const ret = wasm.chromagame_num_colors(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} r
     * @param {number} c
     * @param {number} color
     */
    place(r, c, color) {
        wasm.chromagame_place(this.__wbg_ptr, r, c, color);
    }
    /**
     * @param {number} r
     * @param {number} c
     * @returns {number}
     */
    solution_cell(r, c) {
        const ret = wasm.chromagame_solution_cell(this.__wbg_ptr, r, c);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    undo() {
        const ret = wasm.chromagame_undo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    width() {
        const ret = wasm.chromagame_width(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) ChromaGame.prototype[Symbol.dispose] = ChromaGame.prototype.free;

/**
 * Level configuration: board dimensions and color count.
 */
export class LevelConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LevelConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_levelconfig_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_levelconfig_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get num_colors() {
        const ret = wasm.__wbg_get_levelconfig_num_colors(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get width() {
        const ret = wasm.__wbg_get_levelconfig_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_levelconfig_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set num_colors(arg0) {
        wasm.__wbg_set_levelconfig_num_colors(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set width(arg0) {
        wasm.__wbg_set_levelconfig_width(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) LevelConfig.prototype[Symbol.dispose] = LevelConfig.prototype.free;

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_bd5a70920abf0236: function(arg0, arg1) {
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
        "./chroma_engine_bg.js": import0,
    };
}

const ChromaGameFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_chromagame_free(ptr >>> 0, 1));
const LevelConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_levelconfig_free(ptr >>> 0, 1));

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
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

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
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
        module_or_path = new URL('chroma_engine_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
