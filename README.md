<img src="/.github/logo.png" alt="ALGO-VISUALIZER" width="600">

This project demonstrates a seamless integration between JavaScript and Rust - a visualization platform for pathfinding and graph algorithms. 

## Features

### Interactive Visualization
- Real-time algorithm execution with start, stop, and resume controls
- Dynamic wall drawing during algorithm execution
- Drag-and-drop positioning of start and end nodes
- Adjustable traversal speed for detailed analysis
- Responsive grid system that adapts to different screen sizes

### Technology
- **Rust + WebAssembly Integration**: Proof of concept WASM implemented in Rust
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
