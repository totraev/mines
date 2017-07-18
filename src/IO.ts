import * as fs from 'fs';


export class IO {
  constructor(private rowDelimiter: string = '\n', private colDelimiter: string = ' ') {}

  /**
   * read data from file
   * @param path - file path
   */
  private readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => err ? reject(err) : resolve(data));
    });
  }

  /**
   * write data to file
   * @param path - file path
   * @param value - table string
   */
  private writeFile(path: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, value, 'utf8', (err) => err ? reject(err) : resolve());
    });
  }

  /**
   * read table from file
   * @param path - file path
   */
  public async readTable(path: string): Promise<string[][]> {
    const fileStr = await this.readFile(path);

    return fileStr
      .split(this.rowDelimiter)
      .map((row) => row.split(this.colDelimiter));
  }

  /**
   * Write table to file
   * @param path - file path
   * @param table - table array
   */
  public async writeTable(path: string, table: string[][]): Promise<void> {
    const tableStr = table.reduce((acc, row) => `${acc}${row.join(this.colDelimiter)}${this.rowDelimiter}`, '');

    console.log(tableStr);
    return await this.writeFile(path, tableStr);
  }
}

export default new IO()