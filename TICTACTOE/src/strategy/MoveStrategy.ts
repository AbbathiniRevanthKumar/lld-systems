import { Board } from "../entities/Board.js";
import { Symbol } from "../enums/Symbol.js";

export interface MoveStrategy {
  selectMove(board: Board, symbol: Symbol): [number, number];
}

export class RandomMoveStrategy implements MoveStrategy {
  selectMove(board: Board, symbol: Symbol): [number, number] {
    const emptyCells: [number, number][] = [];

    for (let i = 0; i < board.size; i++) {
      for (let j = 0; j < board.size; j++) {
        if (board.isCellEmpty(i, j)) {
          emptyCells.push([i, j]);
        }
      }
    }

    if(emptyCells.length == 0){
        throw new Error("No empty cells");
    }

    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    return randomCell;
  }
}
