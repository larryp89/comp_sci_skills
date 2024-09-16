function knightMoves(start, end) {
  // Moves that a knight can make
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  function isValidMove(x, y) {
    // All valid moves within the coordinates of a chess board
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function getValidMoves(position) {
    return (
      moves
        // For each move, add the  move to the current position to get a final position
        .map(([dx, dy]) => [position[0] + dx, position[1] + dy])
        // Filter so only valid moves are included in the array
        .filter(([x, y]) => isValidMove(x, y))
    );
  }

  // Breadth first search
  function bfs() {
    // Add the starting position to the queue
    const queue = [[start]];
    // Set to track visited positions
    const visited = new Set([start.toString()]);

    while (queue.length > 0) {
      // Take the next path from the queue
      const path = queue.shift();
      // Get the last position in the path
      const current = path[path.length - 1];

      if (current[0] === end[0] && current[1] === end[1]) {
        return path;
      }

      // USe valid moves to get next set of valid moves based on current position
      for (const next of getValidMoves(current)) {
        // If it isn't in the set, i.e. it hasn't been visited
        if (!visited.has(next.toString())) {
          // Mark it as visited
          visited.add(next.toString());
          // Add next to the current path and push it to the queue
          queue.push([...path, next]);
        }
      }
    }
  }

  const path = bfs();
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((position) => console.log(position));
  return path;
}

// Test the function
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
