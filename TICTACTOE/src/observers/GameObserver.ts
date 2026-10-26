import { Game } from "../entities/Game.js";

export interface GameObserver{
    update(game:Game):void;
}