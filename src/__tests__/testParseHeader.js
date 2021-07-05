import { join } from 'path';

import { parseHeader } from '../parseHeader';

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
const parsed = parseHeader(matrix).meta;
test('parseHeader', () => {
  expect(parsed['ZP Tem:']).toStrictEqual(0);
  expect(parsed['zero point']).toStrictEqual(-0.000035);
  expect(
    parsed['masse of system with Virgin adsorbent 9 corrected'],
  ).toStrictEqual(6.745413);
  expect(parsed['Volume adsorbed phase cc/g']).toStrictEqual(0.065509);
  expect(parsed['masse of all system (sinker) uncorrected']).toStrictEqual(
    26.793937,
  );
  expect(parsed.Date).toStrictEqual('30/08/2011');
  expect(parsed['Avogadro number']).toStrictEqual(6.02e23);
});
