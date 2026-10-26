import { Symbol } from "../enums/Symbol.js";
import { MoveStrategy } from "../strategy/MoveStrategy.js";

export class Player {
  private _name: string;
  private _symbol: Symbol;
  private _moveStrategy: MoveStrategy | null = null;

  constructor(name: string, symbol: Symbol) {
    if (symbol === Symbol.EMPTY) {
      throw new Error(`Player cannot have EMPTY symbol`);
    }
    this._name = name;
    this._symbol = symbol;
  }

  set moveStrategy(strategy: MoveStrategy) {
    this._moveStrategy = strategy;
  }

  get name(): string {
    return this._name;
  }

  get symbol(): Symbol {
    return this._symbol;
  }

  get moveStrategy(): MoveStrategy | null {
    return this._moveStrategy;
  }

  toString() {
    return `${this.name} (${this._symbol})`;
  }
}
