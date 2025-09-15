<img src="/.github/logo.png" alt="ALGO-VISUALIZER" width="600">

A interactive visualization platform for pathfinding and graph algorithms, built with Next.js and 🦀 Rust WebAssembly.

## Features

### Interactive Visualization
- Real-time algorithm execution with start, stop, and resume controls
- Dynamic wall drawing during algorithm execution
- Drag-and-drop positioning of start and end nodes
- Adjustable traversal speed for detailed analysis
- Responsive grid system that adapts to different screen sizes

### Performance & Technology
- **Rust + WebAssembly Integration**: Critical algorithms implemented in Rust for maximum performance
- **Hybrid Execution**: WASM-first with TypeScript fallback for compatibility
- **Modern UI**: Built with Next.js, Tailwind CSS, and Radix UI components
- **Theme Support**: Light, dark, and system theme modes
- **Mobile Responsive**: Optimized for desktop and mobile devices

### Algorithm Support
- **A* (A-Star)**: Optimal pathfinding with heuristic search
- **Breadth-First Search (BFS)**: Guaranteed shortest path in unweighted graphs
- **Depth-First Search (DFS)**: Explores as far as possible along each branch
- **Dijkstra's Algorithm**: Shortest path in weighted graphs

## Architecture

This project showcases a modern web application architecture combining:

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Rust Layer**: Rust compiled to WebAssembly for compute-intensive algorithms
- **Build System**: Integrated WASM compilation with Next.js static export
- **Deployment**: GitHub Pages with automated CI/CD

### Rust WASM Integration

The project demonstrates seamless integration between JavaScript and Rust:

```rust
// Rust implementation (src/algorithms/bfs.rs)
#[wasm_bindgen]
pub fn bfs_algorithm(grid: &JsValue, start: &JsValue, end: &JsValue) -> JsValue {
    // High-performance BFS implementation
}
```

```typescript
// TypeScript integration (src/lib/algorithms/bfs-wasm.ts)
const wasmBfs = await import('../../rust/pkg/algo_visualizer_wasm');
const result = wasmBfs.bfs_algorithm(grid, start, end);
```

## Development

### Prerequisites
- Node.js 20+
- Rust toolchain
- wasm-pack

### Setup
```bash
# Clone the repository
git clone https://github.com/philfreshman/algo-visualizer.git
cd algo-visualizer

# Install dependencies
npm install

# Build WASM modules
npm run build:wasm

# Start development server
npm run dev
```

### Build Commands
```bash
npm run build:wasm    # Compile Rust to WebAssembly
npm run build         # Build WASM + Next.js static export
npm run dev           # Development server with hot reload
```

## Deployment

The project is configured for automatic deployment to GitHub Pages:

1. **Automated CI/CD**: GitHub Actions workflow builds and deploys on every push
2. **Static Export**: Next.js generates static files optimized for GitHub Pages
3. **WASM Support**: Rust modules are compiled and included in the build

**Live Demo**: [https://philfreshman.github.io/algo-visualizer/](https://philfreshman.github.io/algo-visualizer/)
