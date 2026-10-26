Tic Tac Toe is a classic two-player game played on a 3x3 grid. Players take turns marking empty cells with their respective symbols: **X** or **O**.

The goal is to be the first to place three of your symbols in a row, either horizontally, vertically, or diagonally. At the same time, you must try to prevent your opponent from achieving the same. If all cells are filled and no player wins, the game ends in a draw.

### **1.Clarifying the Requirements**

Asks the questions - to clarify the requirements

Functional Requirements

1. Game is on 3X3 grid.
2. Two players make alternative turns, identified by the mark X and O.
3. Game should detect and announce the winner
4. Game should reject and inform user about invalid moves 
5. Game should declare a draw if all cells are filled and no player has won.
6. Sequences can be hardcoded for now .

Non Functional Requirements

1. The system should be **modular and extensible** to support future features like larger boards, AI opponent, move history, etc.
2.The game logic should be **testable** and **easy to maintain**.
3.The system should provide **clear console output** that reflects the current state of the game board.

### 2. Identify the Core Entities

1.3X3 Grid → Board
2.Board is made of cells → Cell
3.Each Cell contains a SYMBOL → ENUM (’X’,’O’)
4.Players place SYMBOL → User
5.An orchestrator → Game
6.Game state → ENUM(DRAW,WINNER_X,WINNER_O,IN_PROGRESS)

Entity Overview

!image.png

### 3. Designing Classes and relationships

→ Enums

```tsx
//SYMBOL

enum Symbol {
	X = 'X';
	Y = 'Y';
	EMPTY = '';
}

enum GameStatus {
	IN_PROGRESS = 'IN_PROGRESS';
	WINNER_X = 'WINNER_X';
	WINNER_O = 'WINNER_Y';
	DRAW = 'DRAW';
}
```

!image.png

→ Data Classes

```tsx
//Cell

class Cell {
  //atributes
	private symbol:Symbol = Symbol.EMPTY;
	
	//methods
	public isEmpty():boolean;
}

//Player

class Player {
	private name:string;
	private symbol:Symbol;
}
```

→ Core Classes

```tsx
//Board 
//composes cell

class Board {
	private grid:Cell[][];
	private size:number;
	
	//methods
	Board(size:number);
	public placeSymbol(row:number,col:number,symbol:Symbol):void;
	public isCellEmpty(row:number,col:number):boolean;
	public isFull():boolean;
	public printBoard():void;
}
```

→ Orchestrator

```tsx
//Game
//composes board
//associates with Player
//abstracts with method
class Game{
	private players:Player[];
	private board:Board;
	private currentPlayerIndex:number;
	private status:GameStatus;
	
	//methods
	Game(player1:Player,player2:Player,boardSize:number);
	makeMove(row:number,col:number);
}
```

!image.png