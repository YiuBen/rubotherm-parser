import { join } from 'path';

import { parseTable } from '../parseTable';

let xlsx = require('xlsx');

const workbook = xlsx.readFile(
  join(
    __dirname,
    '../../testFiles/8_Rubotherm gravimetric _(Single gas_high pressure).xls',
  ),
);
const csv = xlsx.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
const lines = csv.split(/\r?\n/);
const matrix = [];
for (let i = 0; i < lines.length; i++) {
  matrix[i] = lines[i].split(',');
}

test('parseTable', () => {
  expect(parseTable(matrix, { i: 0 })[0].label).toStrictEqual('Temperature');
  expect(parseTable(matrix, { i: 0 })[0].data[9]).toStrictEqual(35);
  expect(parseTable(matrix, { i: 11 })).toStrictEqual([]);
  expect(parseTable(matrix, { i: 9 })[3].data[9]).toStrictEqual(11.84);
  expect(parseTable(matrix, { i: 9 })[5].data[9]).toStrictEqual(11.9);
  expect(parseTable(matrix, { i: 9 })[7].data[9]).toStrictEqual(26.749192);
});
