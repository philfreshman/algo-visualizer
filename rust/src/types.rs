use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Position {
    pub row: usize,
    pub col: usize,
}

impl Position {
    pub fn new(row: usize, col: usize) -> Position {
        Position { row, col }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum StepType {
    Visited,
    Found,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AlgorithmStep {
    pub position: Position,
    pub step_type: StepType,
}

impl AlgorithmStep {
    pub fn new(position: Position, step_type: StepType) -> AlgorithmStep {
        AlgorithmStep { position, step_type }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AlgorithmResult {
    pub steps: Vec<AlgorithmStep>,
    pub path: Option<Vec<Position>>,
    pub found: bool,
}

impl AlgorithmResult {
    pub fn new(steps: Vec<AlgorithmStep>, path: Option<Vec<Position>>, found: bool) -> AlgorithmResult {
        AlgorithmResult { steps, path, found }
    }
}
