export default function generateMaze(
  matrix: number[][],
  startX: number,
  startY: number,
  width: number,
  height: number
) {
  if (width < 2 || height < 2) {
    return;
  }

  let wall_x: number = 0;
  let wall_y: number = 0;

  if (width > height) {
    wall_x = Math.floor(Math.random() * (width - 1));
    for (let y = 0; y < height; y++) {
      matrix[wall_x][y] = 1;
    }
    const passage_y = Math.floor(Math.random() * height);
    matrix[wall_x][passage_y] = 0;
  } else {
    wall_y = Math.floor(Math.random() * (height - 1));
    for (let x = 0; x < width; x++) {
      matrix[x][wall_y] = 1;
    }
    const passage_x = Math.floor(Math.random() * width);
    matrix[passage_x][wall_y] = 0;
  }

  generateMaze(matrix, startX, startY, wall_x, wall_y);
  generateMaze(matrix, wall_x, startY, width - wall_x, wall_y);
  generateMaze(matrix, startX, wall_y, wall_x, height - wall_y);
  generateMaze(matrix, wall_x, wall_y, width - wall_x, height - wall_y);
}