import { session } from "@/lib/utils/session"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Check if the algorithm should terminate
const shouldTerminate = (): boolean => {
  return session.getItem("shouldTerminate") === "true"
}

// Check if a position is valid
const isValidPosition = (matrix: Matrix, position: Position): boolean =>{
  return position.row >= 0 && position.row < matrix.length && position.col >= 0 && position.col < matrix[0].length;
}

// Check if a position is already visited
const isVisited = (visited: Position[], position: Position): boolean =>{
  return visited.some((v) => v.row === position.row && v.col === position.col);
}

// Mark a position as visited
const markAsVisited = (visited: Position[], position: Position): void =>{
  visited.push(position);
  let box = document.querySelector(`#B${position.row}\\:${position.col}`);
  if (box && !box.classList.contains("wall")) {
    box.classList.toggle("visited");
  }
}


export { delay, shouldTerminate, isValidPosition, isVisited, markAsVisited }
