export type Position = {
  row: number;
  column: number;
};

/**
 * Table cell
 */
export class Cell {
  constructor(protected _value: string, protected _position: Position) {}

  /**
   * Return cell position
   */
  public getPosition(): Position {
    return this._position;
  }

  /**
   * Return cell value
   */
  public get value(): string {
    return this._value;
  }
}


/**
 * Mine cell
 */
export class Mine extends Cell {

  /**
   * Return all sibling cells
   * @param dim - table dimension
   */
  public getSiblings(dim: number): Position[] {
    const { row, column: col } = this._position;
    const siblings = [
      [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
      [row, col - 1], [row, col + 1],
      [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]
    ];

    return siblings
      .map(([row, column]) => ({ row, column }))
      .filter(({ row, column }) => row >= 1 && row <= dim && column >= 1 && column <= dim);
  }
}


/**
 * Counter cell
 */
export class Counter extends Cell {
  private _counter: number = 0;

  /**
   * increment counter
   */
  public increment(): void {
    this._counter++;
  }

  /**
   * return counter
   */
  public get counter(): number {
    return this._counter;
  }
}