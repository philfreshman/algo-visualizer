// WASM loader utility for the Rust algorithms
let wasmModule: any = null;
let wasmInitialized = false;

export async function loadWasm() {
    if (wasmModule && wasmInitialized) {
        return wasmModule;
    }
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        throw new Error('WASM module can only be loaded in browser environment');
    }
    
    try {
        // Load WASM module from public directory at runtime
        const wasmModuleUrl = '/wasm/algo_visualizer_wasm.js';
        const wasm = await import(/* webpackIgnore: true */ wasmModuleUrl);
        
        // Initialize the WASM module
        if (!wasmInitialized) {
            await wasm.default('/wasm/algo_visualizer_wasm_bg.wasm');
            wasmInitialized = true;
        }
        
        // Debug: log available exports
        console.log('WASM module exports:', Object.keys(wasm));
        console.log('bfs_algorithm available:', typeof wasm.bfs_algorithm);
        
        wasmModule = wasm;
        return wasm;
    } catch (error) {
        console.error('Failed to load WASM module:', error);
        throw error;
    }
}

export interface WasmBfsResult {
    found: boolean;
    steps: Array<{
        position: {
            row: number;
            col: number;
        };
        step_type: 'Visited' | 'Found';
    }>;
    path?: Array<{
        row: number;
        col: number;
    }>;
}

export async function runBfsWasm(
    matrix: Matrix,
    start: Position,
    target: Position
): Promise<WasmBfsResult | null> {
    try {
        const wasm = await loadWasm();
        
        // Check if bfs_algorithm is available
        if (!wasm.bfs_algorithm) {
            console.error('bfs_algorithm function not found in WASM module');
            return null;
        }
        
        // Convert matrix to JS Array format expected by WASM
        const jsMatrix = matrix.map(row => row.slice());
        
        const result = wasm.bfs_algorithm(
            jsMatrix,
            start.row,
            start.col,
            target.row,
            target.col
        );
        
        return result as WasmBfsResult;
    } catch (error) {
        console.error('Error running WASM BFS:', error);
        return null;
    }
}
