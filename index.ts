import io from './src/IO';
import { Table } from './src/Table';

(async () => {
  const table = await io.readTable('./io/in');

  const tableObj = new Table(table);
  const newTable = tableObj.calcCounters();

  await io.writeTable('./io/out', newTable);
})();