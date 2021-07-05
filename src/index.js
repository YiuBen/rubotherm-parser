import { getMatrixFromXLSX } from './getMatrixFromXLSX';
import { parseHeader } from './parseHeader';
import { parseTable } from './parseTable';

/**
 * Parses the whole excel file
 * @param {array} data Matrix to parse
 * @returns {object} Object with meta object and variables array
 */
export function parse(path) {
  let data = getMatrixFromXLSX(path);
  let header = parseHeader(data);
  let table = parseTable(data, header.i);
  return { meta: header.meta, variables: table.variables };
}
