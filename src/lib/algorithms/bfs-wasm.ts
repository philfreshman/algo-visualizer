import { delay, exe } from '@/lib/helpers/exe'
import { local, session } from '@/lib/helpers/storage'
import { ui } from '@/lib/helpers/ui'
import { runBfsWasm } from '@/lib/wasm-loader'

// BREADTH FIRST SEARCH - WASM Implementation
export const bfsWasm = async (matrix: Matrix, visited: Position[], start: Position, target: Position): Promise<Position[] | null> => {
    try {
        // Run the Rust WASM BFS algorithm
        const wasmResult = await runBfsWasm(matrix, start, target);
        
        if (!wasmResult) {
            console.error('WASM BFS failed to execute');
            return null;
        }
        
        // Process the steps for visualization
        for (const step of wasmResult.steps) {
            if (exe.shouldTerminate()) {
                return null;
            }
            
            const position = { row: step.position.row, col: step.position.col };
            
            // Check if we should terminate early
            if (exe.shouldTerminate()) {
                return null;
            }
            
            // Skip if already visited (for visualization consistency)
            if (visited.some((v) => v.row === position.row && v.col === position.col)) {
                continue;
            }
            
            // Check for custom walls (toggled cells)
            if (matrix[position.row][position.col] === 1 || 
                document.querySelector(`#B${position.row}\\:${position.col}`)?.classList.contains('toggled')) {
                continue;
            }
            
            // Add to visited array
            visited.push(position);
            
            // Update the UI
            const box = document.querySelector(`#B${position.row}\\:${position.col}`);
            if (box && !box.classList.contains('wall')) {
                if (step.step_type === 'Found') {
                    // Mark as found (target reached)
                    session.setItem('isCompleted', 'true');
                    ui.markEndAsVisited();
                } else {
                    // Mark as visited
                    box.classList.toggle('visited');
                }
            }
            
            // Handle pause/resume/terminate
            if ((await exe.pauseResumeOrTerminate()) === null) {
                return null;
            }
            
            // Apply delay for visualization
            await delay(Number(local.getItem('delay')));
            
            // If we found the target, return the visited path
            if (step.step_type === 'Found') {
                return visited;
            }
        }
        
        // If we get here, no path was found
        return null;
        
    } catch (error) {
        console.error('Error in WASM BFS:', error);
        // Fallback to original implementation if WASM fails
        return null;
    }
}
