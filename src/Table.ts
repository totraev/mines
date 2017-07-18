import { Mine, Counter, Position } from './Cell';

type TableItem = Mine | Counter;

type Options = {
  mine: string;
  counter: string;
}

const defaultOptions: Options = {
  mine: 'x',
  counter: 'o'
}


/**
 * Table
 */
export class Table {
  private table: TableItem[][];
  private dimension: number;

  constructor(table: string[][], private options: Options = defaultOptions) {
    this.dimension = table.length;

    this.table = table.map((row, index) => {
      return row.map((value, column) => value === this.options.mine 
        ? new Mine(value, { row: index + 1, column: column + 1 })
        : new Counter(value, { row: index + 1, column: column + 1 })
      );
    });
  }

  /**
   * Find each mine and increment all sibling counters
   */
  private findMines(): void {
    this.table.forEach((row, index) => {
      row.forEach((cell, col) => {
        if(cell instanceof Mine) {
          this.incrementCounters(cell);
        }
      })
    });
  }

  /**
   * Increment count of each sibling
   * @param mine - mine cell
   */
  private incrementCounters(mine: Mine): void {
    const siblings = mine.getSiblings(this.dimension);
  
    siblings.forEach(({ row, column }) => {
      const cell = this.table[row - 1][column - 1];

      if(cell instanceof Counter) {
        cell.increment();
      }
    });
  }

  /**
   * Return 2D array of mines and counters
   */
  public calcCounters(): string[][] {
    this.findMines();

    const table = this.table.map((row) => 
      row.map((cell) => cell instanceof Mine ? cell.value : cell.counter.toString())
    );

    return table;
  }
}