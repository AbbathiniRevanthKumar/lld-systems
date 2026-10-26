import { GameStatus } from "../enums/GameStatus.js";
import { Symbol } from "../enums/Symbol.js";
import { GameObserver } from "../observers/GameObserver.js";
import { Board } from "./Board.js";
import { Player } from "./Player.js";

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;
  private _status: GameStatus;
  private observers: GameObserver[] = [];

  constructor(playerA: Player, playerB: Player, boardSize: number) {
    this.board = new Board(boardSize);
    this.players = [playerA, playerB];
    this.currentPlayerIndex = 0;
    this._status = GameStatus.IN_PROGRESS;
  }

  makeMove(row: number, col: number) {
    if (this._status !== GameStatus.IN_PROGRESS) {
      throw new Error(`Game is completed!!!`);
    }
    if (!this.board.isCellEmpty(row, col)) {
      throw new Error(`Cell (${row},${col}) is already occupied`);
    }

    const currentPlayer = this.players[this.currentPlayerIndex];

    //place symbol of current player
    this.board.placeSymbol(row, col, currentPlayer.symbol);

    //check win after placing symbol
    if (this.checkWin(row, col, currentPlayer.symbol)) {
      this._status =
        currentPlayer.symbol === Symbol.X
          ? GameStatus.WINNER_X
          : GameStatus.WINNER_O;
      this.notifyObservers();
      return;
    }

    if (this.board.isFull()) {
      this._status = GameStatus.DRAW;
      this.notifyObservers();
      return;
    }

    //switch to next player
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  }

  checkWin(row: number, col: number, symbol: Symbol) {
    const board = this.board;
    const size = board.size;

    let win = true;
    //check the row of last move
    for (let c = 0; c < size; c++) {
      if (board.getCell(row, c).symbol !== symbol) {
        win = false;
        break;
      }
    }

    if (win) return true;

    //check for the column of last move
    win = true;
    for (let r = 0; r < size; r++) {
      if (board.getCell(r, col).symbol !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;

    //check for main diagonal
    win = true;
    for (let i = 0; i < size; i++) {
      if (board.getCell(i, i).symbol !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;

    //check for anti-diagonal
    win = true;
    for (let i = 0; i < size; i++) {
      if (board.getCell(i, size - i - 1).symbol !== symbol) {
        win = false;
        break;
      }
    }
    if (win) return true;

    return false;
  }

  printBoard(): void {
    this.board.printBoard();
  }

  getWinner(): Player | null {
    if (this._status === GameStatus.WINNER_X) {
      return this.players[0].symbol === Symbol.X
        ? this.players[0]
        : this.players[1];
    }
    if (this._status === GameStatus.WINNER_O) {
      return this.players[0].symbol === Symbol.O
        ? this.players[0]
        : this.players[1];
    }
    return null;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  playAIMove() {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.moveStrategy !== null) {
      const [row, col] = currentPlayer.moveStrategy!.selectMove(
        this.board,
        currentPlayer.symbol,
      );
      this.makeMove(row, col);
    }
  }

  get status(): GameStatus {
    return this._status;
  }

  addObserver(observer: GameObserver) {
    this.observers.push(observer);
  }

  private notifyObservers() {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
