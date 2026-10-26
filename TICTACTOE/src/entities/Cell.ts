import { Symbol } from "../enums/Symbol.js";

export class Cell {
  private _symbol: Symbol;

  constructor() {
    this._symbol = Symbol.EMPTY;
  }

  get symbol(): Symbol {
    return this._symbol;
  }

  set symbol(symbol: Symbol) {
    this._symbol = symbol;
  }

  isEmpty(): boolean {
    return this._symbol === Symbol.EMPTY;
  }
}
