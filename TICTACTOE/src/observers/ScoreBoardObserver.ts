import { Game } from "../entities/Game.js";
import { GameObserver } from "./GameObserver.js";

export class ScoreboardObserver implements GameObserver {
  private scores = new Map<string, number>();
  update(game: Game): void {
    const winner = game.getWinner();

    if (winner !== null) {
      this.scores.set(winner.name, (this.scores.get(winner.name) ?? 0) + 1);
    }
  }

  printScoreboard() {
    console.log("===== SCOREBOARD =====");
    for (const [name, wins] of this.scores) {
      console.log(`${name}: ${wins} wins`);
    }
  }
}
