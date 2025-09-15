use crate::types::{Position, AlgorithmStep, AlgorithmResult, StepType};
use std::collections::{VecDeque, HashSet};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bfs_algorithm(
    matrix: &js_sys::Array,
    start_row: usize,
    start_col: usize,
    target_row: usize,
    target_col: usize,
) -> JsValue {
    // Convert JS array to Rust matrix
    let rows = matrix.length() as usize;
    let mut rust_matrix: Vec<Vec<i32>> = Vec::with_capacity(rows);
    
    for i in 0..rows {
        let row = matrix.get(i as u32);
        let row_array = js_sys::Array::from(&row);
        let cols = row_array.length() as usize;
        let mut rust_row: Vec<i32> = Vec::with_capacity(cols);
        
        for j in 0..cols {
            let cell = row_array.get(j as u32);
            rust_row.push(cell.as_f64().unwrap_or(0.0) as i32);
        }
        rust_matrix.push(rust_row);
    }

    let start = Position::new(start_row, start_col);
    let target = Position::new(target_row, target_col);
    
    let result = bfs_internal(&rust_matrix, start, target);
    serde_wasm_bindgen::to_value(&result).unwrap()
}

fn bfs_internal(matrix: &[Vec<i32>], start: Position, target: Position) -> AlgorithmResult {
    let mut queue = VecDeque::new();
    let mut visited = HashSet::new();
    let mut parent_map = std::collections::HashMap::new();
    let mut steps = Vec::new();
    
    queue.push_back(start);
    visited.insert((start.row, start.col));
    
    let rows = matrix.len();
    let cols = if rows > 0 { matrix[0].len() } else { 0 };
    
    while let Some(current) = queue.pop_front() {
        // Add step for visualization
        if current.row != start.row || current.col != start.col {
            steps.push(AlgorithmStep::new(current, StepType::Visited));
        }
        
        // Check if we reached the target
        if current.row == target.row && current.col == target.col {
            steps.push(AlgorithmStep::new(current, StepType::Found));
            
            // Reconstruct path
            let path = reconstruct_path(&parent_map, start, target);
            return AlgorithmResult::new(steps, Some(path), true);
        }
        
        // Explore neighbors (right, down, left, up)
        let neighbors = [
            (current.row, current.col + 1), // right
            (current.row + 1, current.col), // down
            (current.row, current.col.saturating_sub(1)), // left
            (current.row.saturating_sub(1), current.col), // up
        ];
        
        for (next_row, next_col) in neighbors {
            // Check bounds
            if next_row >= rows || next_col >= cols {
                continue;
            }
            
            // Check if already visited
            if visited.contains(&(next_row, next_col)) {
                continue;
            }
            
            // Check if it's a wall
            if matrix[next_row][next_col] == 1 {
                continue;
            }
            
            // Add to queue and mark as visited
            let next_pos = Position::new(next_row, next_col);
            queue.push_back(next_pos);
            visited.insert((next_row, next_col));
            parent_map.insert((next_row, next_col), (current.row, current.col));
        }
    }
    
    // Target not found
    AlgorithmResult::new(steps, None, false)
}

fn reconstruct_path(
    parent_map: &std::collections::HashMap<(usize, usize), (usize, usize)>,
    start: Position,
    target: Position,
) -> Vec<Position> {
    let mut path = Vec::new();
    let mut current = (target.row, target.col);
    
    // Build path backwards from target to start
    while current != (start.row, start.col) {
        path.push(Position::new(current.0, current.1));
        if let Some(&parent) = parent_map.get(&current) {
            current = parent;
        } else {
            break;
        }
    }
    
    path.push(start);
    path.reverse();
    path
}
