import { Game } from "./entities/Game.js";
import { Player } from "./entities/Player.js";
import { GameStatus } from "./enums/GameStatus.js";
import { Symbol } from "./enums/Symbol.js";
import { GameObserver } from "./observers/GameObserver.js";
import { ScoreboardObserver } from "./observers/ScoreBoardObserver.js";
import { MoveStrategy, RandomMoveStrategy } from "./strategy/MoveStrategy.js";

function main(): void {
  const playerA = new Player("playerA", Symbol.X);
  const playerB = new Player("playerB", Symbol.O);
  const randomMoveStrategy: MoveStrategy = new RandomMoveStrategy();
  const scoreboard = new ScoreboardObserver();
  playerB.moveStrategy = randomMoveStrategy;
  playerA.moveStrategy = randomMoveStrategy;

  for (let i = 0; i < 3; i++) {
    const game = new Game(playerA, playerB, 3);
    game.addObserver(scoreboard);
    try {
      while (game.status === GameStatus.IN_PROGRESS) {
        game.playAIMove();
      }

      // game.printBoard();
      console.log("Game Status : ", game.status);

      const winner = game.getWinner();
      if (winner) {
        console.log("Winner : ", winner.toString());
      }
    } catch (error: any) {
      console.log(`Error : ${error.message}`);
    }
  }
  scoreboard.printScoreboard();
}

main();
