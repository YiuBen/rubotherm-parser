import { getMatrixFromXLSX } from './getMatrixFromXLSX';
import { parseHeader } from './parseHeader';
import { parseTable } from './parseTable';

/**
 * Parses the whole excel file
 * @param {blob} blob Excel file to to parse
 * @returns {object} Object with meta object and variables array
 */
export function parse(blob) {
  let matrix = getMatrixFromXLSX(blob);
  let header = parseHeader(matrix);
  let table = parseTable(matrix, header.i);
  return { meta: header.meta, variables: table.variables };
}
